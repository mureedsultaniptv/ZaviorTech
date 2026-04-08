import { ApiError } from "@/lib/server/api-errors";
import { validateLeadPayload } from "@/lib/server/form-validation";
import {
  applyRateLimit,
  requireTrustedFormRequest,
} from "@/lib/server/request-security";
import { queueLeadSubmission } from "@/lib/server/submission-processors";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    if (!requireTrustedFormRequest(req, res, "leadform")) {
      return;
    }

    if (!applyRateLimit(req, res, "leadform", { max: 5, windowMs: 10 * 60 * 1000 })) {
      return;
    }

    const data = validateLeadPayload(req.body || {});
    const submission = await queueLeadSubmission({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return res.status(202).json({
      success: true,
      submissionId: submission.id,
      message: "Message received. We are processing it now.",
    });
  } catch (error) {
    const statusCode =
      error instanceof ApiError ? error.statusCode : 500;

    if (statusCode >= 500) {
      console.error("Lead form submission failed:", error);
    }

    return res.status(statusCode).json({
      message:
        statusCode >= 500
          ? "We could not save your message right now. Please try again later."
          : error.message,
    });
  }
}
