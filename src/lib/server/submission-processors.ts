import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";
import { escapeHtml } from "@/lib/server/form-validation";
import type {
  JobApplicationSubmissionPayload,
  LeadSubmissionPayload,
} from "@/lib/server/submission-queue";

function getSanityConfig() {
  const projectId =
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset =
    process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion =
    process.env.SANITY_API_VERSION ||
    process.env.NEXT_PUBLIC_SANITY_API_VERSION;
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !dataset || !apiVersion || !token) {
    throw new Error("Sanity configuration is incomplete.");
  }

  return {
    projectId,
    dataset,
    apiVersion,
    token,
  };
}

function getSanityClient() {
  const config = getSanityConfig();

  return createClient({
    ...config,
    useCdn: false,
  });
}

function getEmailConfig() {
  const host = process.env.EMAIL_SERVER_HOST;
  const port = Number(process.env.EMAIL_SERVER_PORT);
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    throw new Error("Email configuration is incomplete.");
  }

  return {
    host,
    port,
    user,
    pass,
    from,
  };
}

function getTransporter() {
  const config = getEmailConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function formatServiceLabel(service: string) {
  const normalized = service.trim().toLowerCase();

  if (!normalized) {
    return "Not specified";
  }

  const serviceLabels: Record<string, string> = {
    ai: "AI Automation",
    erp: "ERP / Odoo Solutions",
    web: "Website Development",
    mobile: "Mobile Applications",
    it: "IT Solutions",
    other: "Other",
  };

  return serviceLabels[normalized] || service;
}

function createEmailTemplate(type: "admin" | "user", data: LeadSubmissionPayload) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const serviceLabel = formatServiceLabel(data.service);
  const year = new Date().getFullYear();
  const replyToAddress = process.env.EMAIL_REPLY_TO || "info@zavior.org";
  const whatsappNumber = (process.env.WHATSAPP_NUMBER || "971508185948").replace(
    /[^\d]/g,
    "",
  );
  const whatsappMessage = encodeURIComponent(
    `Hello Zavior Team, my name is ${fullName || data.firstName}. I need help with ${serviceLabel}. Please advise on next steps. Thank you.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const fullNameValue = fullName || "Not provided";
  const emailValue = data.email?.trim() ? data.email.trim() : "Not provided";
  const phoneValue = data.phone?.trim() ? data.phone.trim() : "Not provided";
  const companyValue = data.company?.trim()
    ? data.company.trim()
    : "Not provided";
  const serviceValue = serviceLabel || "Not specified";
  const messageValue = data.message?.trim()
    ? escapeHtml(data.message).replace(/\r?\n/g, "<br />")
    : "Not provided";

  const ctaEmail =
    type === "admin"
      ? (data.email?.trim() ? data.email.trim() : replyToAddress)
      : replyToAddress;

  if (type === "admin") {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Inquiry - Zavior Group</title>
        </head>
        <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 30px 0;">
            <tr>
              <td align="center">
                <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                  <tr>
                    <td style="background:#0a1f44; color:#ffffff; padding:20px 30px;">
                      <h2 style="margin:0; font-size:20px;">Zavior Group</h2>
                      <p style="margin:5px 0 0; font-size:13px; opacity:0.8;">
                        Global Business Solutions | ERP | Furniture | Maintenance | Technology
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:25px 30px 10px;">
                      <h3 style="margin:0; color:#0a1f44;">New Inquiry Received</h3>
                      <p style="margin:5px 0 0; color:#555; font-size:14px;">
                        A new client inquiry has been submitted through your website.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px 30px;">
                      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px;">
                        <tr>
                          <td style="background:#f1f3f6; width:35%;"><strong>Full Name</strong></td>
                          <td>${escapeHtml(fullNameValue)}</td>
                        </tr>
                        <tr>
                          <td style="background:#f1f3f6;"><strong>Email Address</strong></td>
                          <td>${escapeHtml(emailValue)}</td>
                        </tr>
                        <tr>
                          <td style="background:#f1f3f6;"><strong>Phone Number</strong></td>
                          <td>${escapeHtml(phoneValue)}</td>
                        </tr>
                        <tr>
                          <td style="background:#f1f3f6;"><strong>Company Name</strong></td>
                          <td>${escapeHtml(companyValue)}</td>
                        </tr>
                        <tr>
                          <td style="background:#f1f3f6;"><strong>Service Interest</strong></td>
                          <td>${escapeHtml(serviceValue)}</td>
                        </tr>
                        <tr>
                          <td style="background:#f1f3f6; vertical-align:top;"><strong>Message</strong></td>
                          <td style="line-height:1.6;">${messageValue}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 30px;">
                      <hr style="border:none; border-top:1px solid #e5e7eb;" />
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px 30px;">
                      <p style="font-size:14px; color:#333;">
                        Please respond to this inquiry promptly to maintain our high service standards.
                      </p>
                      <a
                        href="mailto:${escapeHtml(ctaEmail)}"
                        style="display:inline-block; padding:10px 18px; background:#0a1f44; color:#ffffff; text-decoration:none; border-radius:4px; font-size:13px;"
                      >
                        Reply to Client
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="background:#f9fafb; padding:20px 30px; font-size:12px; color:#777; text-align:center;">
                      <p style="margin:0;">© ${year} Zavior Group. All rights reserved.</p>
                      <p style="margin:5px 0 0;">Operating Globally: UK | UAE | Australia | International Markets</p>
                      <p style="margin:5px 0 0;">This is an automated notification. Please do not reply directly to this email.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Inquiry - Zavior Group</title>
      </head>
      <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 30px 0;">
          <tr>
            <td align="center">

              <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                <tr>
                  <td style="background:#0a1f44; color:#ffffff; padding:20px 30px;">
                    <h2 style="margin:0; font-size:20px;">Zavior Group</h2>
                    <p style="margin:5px 0 0; font-size:13px; opacity:0.8;">
                      Global Business Solutions | ERP | Furniture | Maintenance | Technology
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:25px 30px 10px;">
                    <h3 style="margin:0; color:#0a1f44;">New Inquiry Received</h3>
                    <p style="margin:5px 0 0; color:#555; font-size:14px;">
                      A new client inquiry has been submitted through your website.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 30px;">
                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px;">

                      <tr>
                        <td style="background:#f1f3f6; width:35%;"><strong>Full Name</strong></td>
                        <td>${escapeHtml(fullNameValue)}</td>
                      </tr>

                      <tr>
                        <td style="background:#f1f3f6;"><strong>Email Address</strong></td>
                        <td>${escapeHtml(emailValue)}</td>
                      </tr>

                      <tr>
                        <td style="background:#f1f3f6;"><strong>Phone Number</strong></td>
                        <td>${escapeHtml(phoneValue)}</td>
                      </tr>

                      <tr>
                        <td style="background:#f1f3f6;"><strong>Company Name</strong></td>
                        <td>${escapeHtml(companyValue)}</td>
                      </tr>

                      <tr>
                        <td style="background:#f1f3f6;"><strong>Service Interest</strong></td>
                        <td>${escapeHtml(serviceValue)}</td>
                      </tr>

                      <tr>
                        <td style="background:#f1f3f6; vertical-align:top;"><strong>Message</strong></td>
                        <td style="line-height:1.6;">${messageValue}</td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 30px;">
                    <hr style="border:none; border-top:1px solid #e5e7eb;">
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 30px;">
                    <p style="font-size:14px; color:#333;">
                      Please respond to this inquiry promptly to maintain our high service standards.
                    </p>

                    <a
                      href="mailto:${escapeHtml(ctaEmail)}"
                      style="display:inline-block; padding:10px 18px; background:#0a1f44; color:#ffffff; text-decoration:none; border-radius:4px; font-size:13px;"
                    >
                      Reply via Email
                    </a>
                    <a
                      href="${whatsappUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-text="WhatsApp Consultation"
                      style="display:inline-block; margin-left:10px; padding:10px 18px; background:#25D366; color:#ffffff; text-decoration:none; border-radius:4px; font-size:13px;"
                    >
                      WhatsApp Consultation
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="background:#f9fafb; padding:20px 30px; font-size:12px; color:#777; text-align:center;">
                    <p style="margin:0;">
                      © ${year} Zavior Group. All rights reserved.
                    </p>
                    <p style="margin:5px 0 0;">
                      Operating Globally: UK | UAE | Australia | International Markets
                    </p>
                    <p style="margin:5px 0 0;">
                      This is an automated notification. Please do not reply directly to this email.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
}

function formatSubject(firstName: string, lastName: string) {
  return `New website lead from ${firstName} ${lastName}`.replace(
    /[\r\n]+/g,
    " ",
  );
}

async function processLeadSubmission(data: LeadSubmissionPayload) {
  const sanity = getSanityClient();
  const transporter = getTransporter();
  try {
    await sanity.create({
      _type: "leadzaviorForm",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
      createdAt: data.createdAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Sanity save failed: ${message}`);
  }

  const emailFrom = process.env.EMAIL_FROM!;
  const adminRecipient = "mureedsultangeni@gmail.com";
  const replyToAddress = process.env.EMAIL_REPLY_TO || "info@zavior.org";

  try {
    await transporter.sendMail({
      from: `"Zavior Website" <${emailFrom}>`,
      to: adminRecipient,
      replyTo: data.email,
      subject: formatSubject(data.firstName, data.lastName),
      html: createEmailTemplate("admin", data),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Admin email failed to send: ${message}`);
  }

  try {
    await transporter.sendMail({
      from: `"Zavior Group" <${emailFrom}>`,
      to: data.email,
      replyTo: replyToAddress,
      subject: "Thank you for contacting Zavior Group",
      html: createEmailTemplate("user", data),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Customer email failed to send: ${message}`);
  }
}

async function processJobApplicationSubmission(
  data: JobApplicationSubmissionPayload,
) {
  const sanity = getSanityClient();
  const uploadedResume = await sanity.assets.upload(
    "file",
    Buffer.from(data.resume.contentBase64, "base64"),
    {
      filename: data.resume.filename,
      contentType: data.resume.mimeType,
    },
  );

  await sanity.create({
    _type: "jobApplication",
    jobId: data.jobId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    linkedin: data.linkedin,
    portfolio: data.portfolio,
    coverLetter: data.coverLetter,
    resume: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: uploadedResume._id,
      },
    },
    submittedAt: data.submittedAt,
    ip: data.ip,
    submissionSource: "website",
  });
}

export async function queueLeadSubmission(payload: LeadSubmissionPayload) {
  const submission = {
    id: randomUUID(),
  };
  // Serverless runtimes end after the response, so submission work must
  // complete within the request instead of relying on in-process queues.
  await processLeadSubmission(payload);
  return submission;
}

export async function queueJobApplicationSubmission(
  payload: JobApplicationSubmissionPayload,
) {
  const submission = {
    id: randomUUID(),
  };
  await processJobApplicationSubmission(payload);
  return submission;
}
