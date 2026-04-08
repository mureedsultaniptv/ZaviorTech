import Busboy from "busboy";
import { ApiError } from "@/lib/server/api-errors";
import {
  validateJobApplicationPayload,
  validateResumeFile,
} from "@/lib/server/form-validation";
import {
  applyRateLimit,
  getClientIp,
  requireTrustedFormRequest,
  sanitizeFilename,
} from "@/lib/server/request-security";
import { queueJobApplicationSubmission } from "@/lib/server/submission-processors";

const MAX_REQUEST_BYTES = 4.5 * 1024 * 1024;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req) {
  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("multipart/form-data")) {
    throw new ApiError(400, "Invalid content type.");
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength && contentLength > MAX_REQUEST_BYTES) {
    throw new ApiError(413, "Resume file must be 4 MB or smaller.");
  }

  return new Promise((resolve, reject) => {
    const fields = {};
    let resumeFile = null;
    let uploadError = null;
    let completed = false;

    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fields: 12,
        files: 1,
        fileSize: MAX_REQUEST_BYTES,
        parts: 20,
      },
    });

    const finish = (error, result) => {
      if (completed) {
        return;
      }

      completed = true;
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    };

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, fileStream, info) => {
      const chunks = [];

      fileStream.on("limit", () => {
        uploadError = new ApiError(413, "Resume file must be 4 MB or smaller.");
      });

      fileStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      fileStream.on("end", () => {
        if (name !== "resume") {
          return;
        }

        resumeFile = {
          filename: sanitizeFilename(info.filename || "resume"),
          mimeType: info.mimeType,
          content: Buffer.concat(chunks),
        };
      });
    });

    busboy.on("filesLimit", () => {
      uploadError = new ApiError(400, "Only one resume file is allowed.");
    });

    busboy.on("partsLimit", () => {
      uploadError = new ApiError(400, "Invalid multipart request.");
    });

    busboy.on("error", (error) => finish(error));
    busboy.on("finish", () => {
      if (uploadError) {
        finish(uploadError);
        return;
      }

      finish(null, { fields, resumeFile });
    });

    req.pipe(busboy);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    if (!requireTrustedFormRequest(req, res, "job-application")) {
      return;
    }

    if (
      !applyRateLimit(req, res, "job-application", {
        max: 3,
        windowMs: 30 * 60 * 1000,
      })
    ) {
      return;
    }

    const { fields, resumeFile } = await parseMultipartForm(req);
    const data = validateJobApplicationPayload(fields);
    const validatedResume = await validateResumeFile(resumeFile);
    const submission = await queueJobApplicationSubmission({
      ...data,
      resume: {
        filename: validatedResume.filename,
        mimeType: validatedResume.mimeType,
        contentBase64: validatedResume.content.toString("base64"),
      },
      submittedAt: new Date().toISOString(),
      ip: getClientIp(req),
    });

    return res.status(202).json({
      success: true,
      submissionId: submission.id,
      message: "Application received. We are processing it now.",
    });
  } catch (error) {
    const statusCode =
      error instanceof ApiError ? error.statusCode : 500;

    if (statusCode >= 500) {
      console.error("Job application submission failed:", error);
    }

    return res.status(statusCode).json({
      message:
        statusCode >= 500
          ? "We could not save your application right now. Please try again later."
          : error.message,
    });
  }
}
