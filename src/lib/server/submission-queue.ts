import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export type SubmissionType = "leadform" | "job-application";
export type SubmissionStatus = "queued" | "processing" | "completed" | "failed";

export type LeadSubmissionPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  createdAt: string;
};

export type JobApplicationSubmissionPayload = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  jobId: string;
  submittedAt: string;
  ip: string;
  resume: {
    filename: string;
    mimeType: string;
    contentBase64: string;
  };
};

export type SubmissionPayload =
  | LeadSubmissionPayload
  | JobApplicationSubmissionPayload;

export type SubmissionProgress = {
  sanityDocumentId?: string;
  sanityAssetId?: string;
  adminEmailSentAt?: string;
  userEmailSentAt?: string;
};

export type SubmissionEntry = {
  id: string;
  formType: SubmissionType;
  status: SubmissionStatus;
  attempts: number;
  queuedAt: string;
  updatedAt: string;
  processingStartedAt?: string;
  completedAt?: string;
  nextRetryAt?: string;
  lastError?: string;
  progress: SubmissionProgress;
  payload: SubmissionPayload;
};

type SubmissionProcessor = (submission: SubmissionEntry) => Promise<void>;

const SUBMISSION_FILE_PATH = path.join(process.cwd(), "submission.json");
const MAX_PROCESS_ATTEMPTS = 5;
const STALE_PROCESSING_MS = 15 * 60 * 1000;
const RETRY_DELAYS_MS = [30_000, 120_000, 300_000, 900_000];

let fileOperationQueue = Promise.resolve();
let activeProcessor: SubmissionProcessor | null = null;
let isProcessing = false;
let scheduledTimer: NodeJS.Timeout | null = null;
let scheduledRunAt: number | null = null;

function serializeError(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unknown processing error.";
}

function getRetryDelayMs(attempts: number) {
  return RETRY_DELAYS_MS[Math.max(0, attempts - 1)] ?? 30 * 60 * 1000;
}

async function ensureSubmissionFile() {
  try {
    await fs.access(SUBMISSION_FILE_PATH);
  } catch (error) {
    const errno = error as NodeJS.ErrnoException;
    if (errno.code !== "ENOENT") {
      throw error;
    }

    await fs.writeFile(SUBMISSION_FILE_PATH, "[]\n", "utf8");
  }
}

async function readSubmissionFile() {
  await ensureSubmissionFile();
  const raw = await fs.readFile(SUBMISSION_FILE_PATH, "utf8");
  const parsed = raw.trim() ? JSON.parse(raw) : [];

  if (!Array.isArray(parsed)) {
    throw new Error("submission.json must contain a JSON array.");
  }

  return parsed as SubmissionEntry[];
}

async function writeSubmissionFile(submissions: SubmissionEntry[]) {
  const tempPath = `${SUBMISSION_FILE_PATH}.tmp`;
  await fs.writeFile(
    tempPath,
    `${JSON.stringify(submissions, null, 2)}\n`,
    "utf8",
  );
  await fs.rename(tempPath, SUBMISSION_FILE_PATH);
}

function withFileLock<T>(task: () => Promise<T>) {
  const run = fileOperationQueue.then(task, task);
  fileOperationQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function isStaleProcessing(submission: SubmissionEntry, now: number) {
  if (submission.status !== "processing" || !submission.processingStartedAt) {
    return false;
  }

  const startedAt = Date.parse(submission.processingStartedAt);
  if (Number.isNaN(startedAt)) {
    return true;
  }

  return now - startedAt >= STALE_PROCESSING_MS;
}

function canRetry(submission: SubmissionEntry) {
  return submission.attempts < MAX_PROCESS_ATTEMPTS;
}

function shouldProcess(submission: SubmissionEntry, now: number) {
  if (submission.status === "queued") {
    return true;
  }

  if (submission.status !== "failed" || !canRetry(submission)) {
    return false;
  }

  if (!submission.nextRetryAt) {
    return true;
  }

  const retryAt = Date.parse(submission.nextRetryAt);
  return Number.isNaN(retryAt) || retryAt <= now;
}

async function claimNextSubmission() {
  return withFileLock(async () => {
    const submissions = await readSubmissionFile();
    const now = Date.now();
    let changed = false;

    const normalized: SubmissionEntry[] = submissions.map((submission) => {
      if (!isStaleProcessing(submission, now)) {
        return submission;
      }

      changed = true;
      return {
        ...submission,
        status: "failed" as const,
        updatedAt: new Date(now).toISOString(),
        lastError: "Processing restarted after an incomplete attempt.",
        nextRetryAt: new Date(now).toISOString(),
      };
    });

    const nextIndex = normalized.findIndex((submission) =>
      shouldProcess(submission, now),
    );

    if (nextIndex === -1) {
      if (changed) {
        await writeSubmissionFile(normalized);
      }

      return null;
    }

    const claimedAt = new Date(now).toISOString();
    const nextSubmission = {
      ...normalized[nextIndex],
      status: "processing" as const,
      attempts: normalized[nextIndex].attempts + 1,
      processingStartedAt: claimedAt,
      updatedAt: claimedAt,
      lastError: undefined,
      nextRetryAt: undefined,
    };

    normalized[nextIndex] = nextSubmission;
    await writeSubmissionFile(normalized);

    return nextSubmission;
  });
}

async function markSubmissionCompleted(id: string) {
  await updateSubmissionEntry(id, (submission) => {
    const completedAt = new Date().toISOString();
    return {
      ...submission,
      status: "completed",
      completedAt,
      updatedAt: completedAt,
      lastError: undefined,
      nextRetryAt: undefined,
    };
  });
}

async function markSubmissionFailed(id: string, error: unknown) {
  await updateSubmissionEntry(id, (submission) => {
    const failedAt = new Date().toISOString();
    const shouldRetry = canRetry(submission);

    return {
      ...submission,
      status: "failed",
      updatedAt: failedAt,
      lastError: serializeError(error),
      nextRetryAt: shouldRetry
        ? new Date(Date.now() + getRetryDelayMs(submission.attempts)).toISOString()
        : undefined,
    };
  });
}

async function scheduleNextRetry() {
  if (!activeProcessor) {
    return;
  }

  const nextDelay = await withFileLock(async () => {
    const submissions = await readSubmissionFile();
    const retryTimes = submissions
      .filter(
        (submission) =>
          submission.status === "failed" &&
          canRetry(submission) &&
          submission.nextRetryAt,
      )
      .map((submission) => Date.parse(submission.nextRetryAt!))
      .filter((value) => !Number.isNaN(value));

    if (!retryTimes.length) {
      return null;
    }

    return Math.max(0, Math.min(...retryTimes) - Date.now());
  });

  if (nextDelay === null) {
    return;
  }

  scheduleSubmissionProcessing(activeProcessor, nextDelay);
}

async function processQueuedSubmissions() {
  if (!activeProcessor || isProcessing) {
    return;
  }

  isProcessing = true;

  try {
    while (true) {
      const submission = await claimNextSubmission();
      if (!submission) {
        break;
      }

      try {
        await activeProcessor(submission);
        await markSubmissionCompleted(submission.id);
      } catch (error) {
        console.error(
          `Failed processing queued ${submission.formType} submission ${submission.id}:`,
          error,
        );
        await markSubmissionFailed(submission.id, error);
      }
    }
  } finally {
    isProcessing = false;
    await scheduleNextRetry();
  }
}

export async function enqueueSubmission(
  formType: SubmissionType,
  payload: SubmissionPayload,
) {
  const submittedAt = new Date().toISOString();
  const submission: SubmissionEntry = {
    id: randomUUID(),
    formType,
    status: "queued",
    attempts: 0,
    queuedAt: submittedAt,
    updatedAt: submittedAt,
    progress: {},
    payload,
  };

  await withFileLock(async () => {
    const submissions = await readSubmissionFile();
    submissions.push(submission);
    await writeSubmissionFile(submissions);
  });

  return submission;
}

export async function updateSubmissionEntry(
  id: string,
  updater: (submission: SubmissionEntry) => SubmissionEntry,
) {
  return withFileLock(async () => {
    const submissions = await readSubmissionFile();
    const index = submissions.findIndex((submission) => submission.id === id);

    if (index === -1) {
      throw new Error(`Queued submission ${id} was not found.`);
    }

    const updated = updater(submissions[index]);
    submissions[index] = {
      ...updated,
      updatedAt: updated.updatedAt || new Date().toISOString(),
    };
    await writeSubmissionFile(submissions);

    return submissions[index];
  });
}

export function scheduleSubmissionProcessing(
  processor: SubmissionProcessor,
  delayMs = 0,
) {
  activeProcessor = processor;

  const nextRunAt = Date.now() + Math.max(0, delayMs);
  if (scheduledTimer && scheduledRunAt !== null && scheduledRunAt <= nextRunAt) {
    return;
  }

  if (scheduledTimer) {
    clearTimeout(scheduledTimer);
  }

  scheduledRunAt = nextRunAt;
  scheduledTimer = setTimeout(() => {
    scheduledTimer = null;
    scheduledRunAt = null;
    void processQueuedSubmissions();
  }, Math.max(0, delayMs));
}
