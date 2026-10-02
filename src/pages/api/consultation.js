import { ApiError } from "@/lib/server/api-errors";
import { validateConsultationPayload } from "@/lib/server/form-validation";
import { applyRateLimit, requireTrustedFormRequest } from "@/lib/server/request-security";
import { submitConsultationToOdoo } from "@/lib/server/odoo-form";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    res.setHeader("Cache-Control", "no-store");
    if (!(req.headers["content-type"] || "").includes("application/json")) {
      return res.status(415).json({ message: "Content type must be application/json." });
    }
    if (!requireTrustedFormRequest(req, res, "consultation")) return;

    const consultation = validateConsultationPayload(req.body || {});
    // A shared office/mobile IP should not be locked out after a few invalid
    // attempts. Validate first, then apply a practical abuse limit only to a
    // valid request that is about to reach Odoo.
    if (!applyRateLimit(req, res, "consultation", { max: 20, windowMs: 10 * 60 * 1000 })) return;
    const submission = await submitConsultationToOdoo(consultation);

    return res.status(201).json({
      success: true,
      id: submission.id,
      submissionId: submission.submissionId || submission.id,
      message: submission.message || "Your consultation request has been received.",
      delivery: submission.delivery,
    });
  } catch (error) {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    if (statusCode >= 500) console.error("Consultation submission failed:", error);
    return res.status(statusCode).json({
      message: statusCode >= 500
        ? "We couldn't submit your request right now. Please try again in a moment."
        : error.message,
    });
  }
}
