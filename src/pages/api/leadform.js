import { ApiError } from "@/lib/server/api-errors";
import { validateLeadPayload } from "@/lib/server/form-validation";
import {
  applyRateLimit,
  requireTrustedFormRequest,
} from "@/lib/server/request-security";
import { submitLeadFormToOdoo } from "@/lib/server/odoo-form";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    res.setHeader("Cache-Control", "no-store");

    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("application/json")) {
      return res.status(415).json({ message: "Content type must be application/json." });
    }

    if (!requireTrustedFormRequest(req, res, "leadform")) {
      return;
    }

    if (!applyRateLimit(req, res, "leadform", { max: 5, windowMs: 10 * 60 * 1000 })) {
      return;
    }

    const data = validateLeadPayload(req.body || {});
    const submission = await submitLeadFormToOdoo(data);

    return res.status(200).json({
      success: true,
      submissionId: submission.id,
      message: submission.message || "Message received successfully.",
      delivery: submission.delivery,
    });
  } catch (error) {
    const statusCode =
      error instanceof ApiError ? error.statusCode : 500;

    if (statusCode >= 500) {
      console.error("Lead form submission failed:", error);
    }

    const isProduction = process.env.NODE_ENV === "production";
    const debugMessage =
      !isProduction && error instanceof Error ? error.message : undefined;

    return res.status(statusCode).json({
      message:
        statusCode >= 500
          ? "We could not save your message right now. Please try again later."
          : error.message,
      ...(debugMessage ? { debug: debugMessage } : {}),
    });
  }
}
