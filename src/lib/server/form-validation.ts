import { fileTypeFromBuffer } from "file-type";
import { careers } from "@/lib/data/demo-data";
import { ApiError } from "@/lib/server/api-errors";
import { getConsultationService, otherServiceValue } from "@/lib/consultation";

export const FORM_HONEYPOT_FIELD = "website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,30}$/;
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_RESUME_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const ALLOWED_RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.ms-word",
  "application/vnd.ms-office",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function removeControlCharacters(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function readRequiredText(value: unknown, label: string, maxLength: number) {
  const normalized = removeControlCharacters(String(value ?? "")).trim();

  if (!normalized) {
    throw new ApiError(400, `${label} is required.`);
  }

  if (normalized.length > maxLength) {
    throw new ApiError(400, `${label} is too long.`);
  }

  return normalized;
}

function readOptionalText(value: unknown, maxLength: number) {
  const normalized = removeControlCharacters(String(value ?? "")).trim();
  return normalized.slice(0, maxLength);
}

function normalizeExternalUrl(value: unknown, label: string) {
  const normalized = readOptionalText(value, 300);
  if (!normalized) {
    return "";
  }

  const withProtocol = /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    const url = new URL(withProtocol);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid protocol");
    }

    return url.toString();
  } catch {
    throw new ApiError(400, `${label} is invalid.`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateLeadPayload(input: Record<string, unknown>) {
  if (readOptionalText(input[FORM_HONEYPOT_FIELD], 200)) {
    throw new ApiError(400, "Invalid form submission.");
  }

  const firstName = readRequiredText(input.firstName, "First name", 80);
  const lastName = readRequiredText(input.lastName, "Last name", 80);
  const email = readRequiredText(input.email, "Email", 160).toLowerCase();
  const phone = readOptionalText(input.phone, 30);
  const company = readOptionalText(input.company, 120);
  const service = readOptionalText(input.service, 80);
  const message = readRequiredText(input.message, "Message", 2000);

  if (!EMAIL_PATTERN.test(email)) {
    throw new ApiError(400, "Email is invalid.");
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    throw new ApiError(400, "Phone number is invalid.");
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    company,
    service,
    message,
  };
}

export function validateConsultationPayload(input: Record<string, unknown>) {
  if (readOptionalText(input[FORM_HONEYPOT_FIELD], 200)) {
    throw new ApiError(400, "Invalid form submission.");
  }

  const name = readRequiredText(input.name, "Name", 120);
  const email = readRequiredText(input.email, "Email", 160).toLowerCase();
  const phone = readRequiredText(input.phone, "Phone number", 30);
  const service = readRequiredText(input.service, "Service needed", 80);
  const otherService = readOptionalText(input.otherService, 160);
  const projectDescription = readRequiredText(
    input.projectDescription,
    "Tell us about your project",
    2000,
  );
  const source = readOptionalText(input.source, 120) || "website_consultation";
  const sourcePage = readOptionalText(input.sourcePage, 240) || "/contact";

  if (!EMAIL_PATTERN.test(email)) {
    throw new ApiError(400, "Email is invalid.");
  }
  if (!PHONE_PATTERN.test(phone)) {
    throw new ApiError(400, "Phone number is invalid.");
  }
  const selectedService = getConsultationService(service);
  if (service !== otherServiceValue && !selectedService) {
    throw new ApiError(400, "Selected service is invalid.");
  }
  if (service === otherServiceValue && !otherService) {
    throw new ApiError(400, "Please specify the service you need.");
  }

  const rawAnswers = input.serviceQuestions;
  if (rawAnswers !== undefined && (typeof rawAnswers !== "object" || rawAnswers === null || Array.isArray(rawAnswers))) {
    throw new ApiError(400, "Service questions are invalid.");
  }
  const serviceQuestions = Object.fromEntries(
    Object.entries((rawAnswers || {}) as Record<string, unknown>)
      .slice(0, 5)
      .map(([key, value]) => [readOptionalText(key, 80), readOptionalText(value, 2000)])
      .filter(([key]) => key),
  );

  if (source === "website_consultation") selectedService?.questions.forEach((question) => {
    const isVisible = !question.showWhen || serviceQuestions[question.showWhen.questionId] === question.showWhen.equals;
    if (isVisible && question.required && !serviceQuestions[question.id]) {
      throw new ApiError(400, `${question.label} is required.`);
    }
    if (isVisible && question.type === "url" && serviceQuestions[question.id]) {
      try {
        const url = new URL(serviceQuestions[question.id]);
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Unsupported protocol");
      } catch {
        throw new ApiError(400, `${question.label} is invalid.`);
      }
    }
  });

  return {
    name,
    email,
    phone,
    service,
    otherService,
    projectDescription,
    serviceQuestions,
    source,
    sourcePage,
  };
}

export function validateJobApplicationPayload(input: Record<string, unknown>) {
  if (readOptionalText(input[FORM_HONEYPOT_FIELD], 200)) {
    throw new ApiError(400, "Invalid form submission.");
  }

  const name = readRequiredText(input.name, "Full name", 120);
  const email = readRequiredText(input.email, "Email", 160).toLowerCase();
  const phone = readOptionalText(input.phone, 30);
  const linkedin = normalizeExternalUrl(input.linkedin, "LinkedIn URL");
  const portfolio = normalizeExternalUrl(input.portfolio, "Portfolio URL");
  const coverLetter = readOptionalText(input.cover, 2000);
  const jobId = readRequiredText(input.jobId, "Job", 120);

  if (!EMAIL_PATTERN.test(email)) {
    throw new ApiError(400, "Email is invalid.");
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    throw new ApiError(400, "Phone number is invalid.");
  }

  if (!careers.some((career) => career.id === jobId)) {
    throw new ApiError(400, "Selected job is invalid.");
  }

  return {
    name,
    email,
    phone,
    linkedin,
    portfolio,
    coverLetter,
    jobId,
  };
}

export async function validateResumeFile(file: {
  filename?: string;
  content?: Buffer;
  mimeType?: string;
}) {
  if (!file?.content || !file.filename) {
    throw new ApiError(400, "Resume file is required.");
  }

  if (file.content.length > MAX_RESUME_BYTES) {
    throw new ApiError(413, "Resume file must be 4 MB or smaller.");
  }

  const extension = file.filename.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_RESUME_EXTENSIONS.has(extension)) {
    throw new ApiError(400, "Resume must be a PDF or Word document.");
  }

  const detectedType = await fileTypeFromBuffer(file.content);
  const providedType = file.mimeType?.toLowerCase();

  if (detectedType && !ALLOWED_RESUME_MIME_TYPES.has(detectedType.mime)) {
    throw new ApiError(400, "Resume file type is not allowed.");
  }

  if (
    !detectedType &&
    providedType &&
    !ALLOWED_RESUME_MIME_TYPES.has(providedType)
  ) {
    throw new ApiError(400, "Resume file type is not allowed.");
  }

  return {
    ...file,
    mimeType: detectedType?.mime || providedType || "application/octet-stream",
  };
}
