import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";
import { absoluteUrl } from "@/lib/site";
import { ApiError } from "@/lib/server/api-errors";
import { escapeHtml, validateLeadPayload } from "@/lib/server/form-validation";
import {
  applyRateLimit,
  requireTrustedFormRequest,
} from "@/lib/server/request-security";

const sanity = createClient({
  projectId:
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:
    process.env.SANITY_API_VERSION ||
    process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

function ensureServerConfig() {
  const requiredValues = [
    process.env.SANITY_WRITE_TOKEN,
    process.env.EMAIL_SERVER_HOST,
    process.env.EMAIL_SERVER_PORT,
    process.env.EMAIL_SERVER_USER,
    process.env.EMAIL_SERVER_PASSWORD,
    process.env.EMAIL_FROM,
  ];

  if (requiredValues.some((value) => !value)) {
    throw new ApiError(500, "Server configuration is incomplete.");
  }
}

function createEmailTemplate(type, data) {
  const commonStyles = `
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
      .container { background: #fff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 3px 8px rgba(0,0,0,0.05); overflow: hidden; }
      .header { background: #0e4d92; color: #fff; text-align: center; padding: 20px 30px; }
      .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; }
      .content { padding: 25px 30px; color: #333; line-height: 1.6; font-size: 15px; }
      .content h2 { color: #0e4d92; font-size: 18px; margin-top: 0; }
      .info { background: #f3f6fa; padding: 15px; border-radius: 6px; margin: 15px 0; }
      .info p { margin: 5px 0; }
      .footer { text-align: center; padding: 15px; font-size: 13px; color: #777; background: #fafafa; border-top: 1px solid #eee; }
      a { color: #0e4d92; text-decoration: none; }
    </style>
  `;

  if (type === "admin") {
    return `
      ${commonStyles}
      <div class="container">
        <div class="header"><h1>New Lead Received</h1></div>
        <div class="content">
          <h2>Lead Details</h2>
          <div class="info">
            <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
            <p><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
            <p><strong>Service Interested:</strong> ${escapeHtml(data.service || "Not specified")}</p>
          </div>
          <h2>Message</h2>
          <p>${escapeHtml(data.message)}</p>
        </div>
        <div class="footer">
          <p>Zavior Group website inquiry notification</p>
        </div>
      </div>
    `;
  }

  return `
    ${commonStyles}
    <div class="container">
      <div class="header"><h1>Thank You, ${escapeHtml(data.firstName)}!</h1></div>
      <div class="content">
        <p>We have received your message and our team will get back to you shortly.</p>
        <div class="info">
          <p><strong>Service Interested:</strong> ${escapeHtml(data.service || "Not specified")}</p>
          <p><strong>Message:</strong> ${escapeHtml(data.message)}</p>
        </div>
        <p>Thank you for contacting <strong>Zavior Group</strong>.</p>
      </div>
      <div class="footer">
        <p><a href="${absoluteUrl("/")}">Visit our website</a></p>
      </div>
    </div>
  `;
}

function formatSubject(firstName, lastName) {
  return `New website lead from ${firstName} ${lastName}`.replace(/[\r\n]+/g, " ");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    ensureServerConfig();

    if (!requireTrustedFormRequest(req, res, "leadform")) {
      return;
    }

    if (!applyRateLimit(req, res, "leadform", { max: 5, windowMs: 10 * 60 * 1000 })) {
      return;
    }

    const data = validateLeadPayload(req.body || {});

    await sanity.create({
      _type: "leadzaviorForm",
      ...data,
      createdAt: new Date().toISOString(),
    });

    const adminRecipient = process.env.LEADS_INBOX || process.env.EMAIL_FROM;

    await Promise.all([
      transporter.sendMail({
        from: `"Zavior Website" <${process.env.EMAIL_FROM}>`,
        to: adminRecipient,
        subject: formatSubject(data.firstName, data.lastName),
        html: createEmailTemplate("admin", data),
      }),
      transporter.sendMail({
        from: `"Zavior Group" <${process.env.EMAIL_FROM}>`,
        to: data.email,
        subject: "Thank you for contacting Zavior Group",
        html: createEmailTemplate("user", data),
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully.",
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
          ? "We could not send your message right now. Please try again later."
          : error.message,
    });
  }
}
