import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";
import { absoluteUrl } from "@/lib/site";
import { escapeHtml } from "@/lib/server/form-validation";
import {
  enqueueSubmission,
  scheduleSubmissionProcessing,
  updateSubmissionEntry,
  type JobApplicationSubmissionPayload,
  type LeadSubmissionPayload,
  type SubmissionEntry,
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

function renderEmailRows(rows: Array<{ label: string; value: string }>) {
  return rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6edf5; width: 180px; vertical-align: top; font-size: 13px; font-weight: 700; color: #5b6b80;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6edf5; font-size: 14px; line-height: 1.6; color: #162334;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");
}

function createEmailTemplate(type: "admin" | "user", data: LeadSubmissionPayload) {
  const logoUrl = absoluteUrl("/zaviorlogo-dark.png");
  const siteUrl = absoluteUrl("/");
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const serviceLabel = formatServiceLabel(data.service);
  const submittedAt = new Date(data.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const sharedStyles = `
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #eef3f8;
        font-family: Arial, 'Segoe UI', sans-serif;
        color: #162334;
      }
      table {
        border-collapse: collapse;
      }
      .email-shell {
        width: 100%;
        background: linear-gradient(180deg, #eef3f8 0%, #f7f9fc 100%);
        padding: 32px 12px;
      }
      .email-card {
        width: 100%;
        max-width: 640px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid #d9e3ef;
        box-shadow: 0 12px 36px rgba(15, 39, 69, 0.08);
      }
      .hero {
        background: linear-gradient(135deg, #0e3558 0%, #0e4d92 100%);
        padding: 28px 36px 34px;
      }
      .eyebrow {
        font-size: 12px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #a8d1ff;
        font-weight: 700;
      }
      .hero-title {
        margin: 14px 0 8px;
        font-size: 28px;
        line-height: 1.25;
        color: #ffffff;
        font-weight: 700;
      }
      .hero-copy {
        margin: 0;
        font-size: 15px;
        line-height: 1.7;
        color: #dcecff;
      }
      .section-title {
        margin: 0 0 14px;
        font-size: 16px;
        font-weight: 700;
        color: #0f2f52;
      }
      .body-copy {
        margin: 0;
        font-size: 15px;
        line-height: 1.8;
        color: #344255;
      }
      .panel {
        background: #f8fbff;
        border: 1px solid #dce8f5;
        border-radius: 16px;
      }
      .button {
        display: inline-block;
        padding: 13px 24px;
        border-radius: 999px;
        background: #0e4d92;
        color: #ffffff !important;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
      }
      .footer-copy {
        margin: 0;
        font-size: 12px;
        line-height: 1.8;
        color: #708196;
      }
      @media only screen and (max-width: 640px) {
        .hero,
        .content,
        .footer {
          padding-left: 22px !important;
          padding-right: 22px !important;
        }
        .hero-title {
          font-size: 24px !important;
        }
      }
    </style>
  `;

  if (type === "admin") {
    return `
      ${sharedStyles}
      <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
        New website lead received from ${escapeHtml(fullName)}.
      </div>
      <div class="email-shell">
        <table role="presentation" width="100%">
          <tr>
            <td align="center">
              <table role="presentation" class="email-card">
                <tr>
                  <td class="hero">
                    <table role="presentation" width="100%">
                      <tr>
                        <td align="left">
                          <img
                            src="${logoUrl}"
                            alt="Zavior Group"
                            width="160"
                            style="display:block; width:160px; max-width:100%; height:auto;"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 28px;">
                          <div class="eyebrow">Lead Notification</div>
                          <h1 class="hero-title">New Website Inquiry Received</h1>
                          <p class="hero-copy">
                            A new lead has been submitted through the Zavior Group website and is ready for follow-up.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="content" style="padding: 34px 36px 18px;">
                    <table role="presentation" width="100%" class="panel" style="padding: 22px 24px;">
                      <tr>
                        <td>
                          <h2 class="section-title">Lead Summary</h2>
                          <table role="presentation" width="100%">
                            ${renderEmailRows([
                              { label: "Full Name", value: fullName || "Not provided" },
                              { label: "Email Address", value: data.email || "Not provided" },
                              { label: "Phone Number", value: data.phone || "Not provided" },
                              { label: "Company", value: data.company || "Not provided" },
                              { label: "Service", value: serviceLabel },
                              { label: "Submitted At", value: submittedAt },
                            ])}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="content" style="padding: 0 36px 24px;">
                    <table role="presentation" width="100%" class="panel" style="padding: 22px 24px;">
                      <tr>
                        <td>
                          <h2 class="section-title">Message</h2>
                          <p class="body-copy">${escapeHtml(data.message)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="content" style="padding: 0 36px 34px;">
                    <a href="${siteUrl}" class="button">Visit Zavior Website</a>
                  </td>
                </tr>
                <tr>
                  <td class="footer" style="padding: 0 36px 32px;">
                    <p class="footer-copy">
                      This notification was automatically generated from the Zavior Group website contact form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  return `
    ${sharedStyles}
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      Thank you for contacting Zavior Group. Your inquiry has been received.
    </div>
    <div class="email-shell">
      <table role="presentation" width="100%">
        <tr>
          <td align="center">
            <table role="presentation" class="email-card">
              <tr>
                <td class="hero">
                  <table role="presentation" width="100%">
                    <tr>
                      <td align="left">
                        <img
                          src="${logoUrl}"
                          alt="Zavior Group"
                          width="160"
                          style="display:block; width:160px; max-width:100%; height:auto;"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 28px;">
                        <div class="eyebrow">Confirmation</div>
                        <h1 class="hero-title">Thank You for Reaching Out</h1>
                        <p class="hero-copy">
                          Dear ${escapeHtml(data.firstName)}, we appreciate your interest in Zavior Group. Your message has been received and will be reviewed by our team shortly.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 34px 36px 22px;">
                  <table role="presentation" width="100%" class="panel" style="padding: 22px 24px;">
                    <tr>
                      <td>
                        <h2 class="section-title">Your Submission</h2>
                        <table role="presentation" width="100%">
                          ${renderEmailRows([
                            { label: "Service Requested", value: serviceLabel },
                            { label: "Submitted At", value: submittedAt },
                            { label: "Email Address", value: data.email || "Not provided" },
                          ])}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 0 36px 22px;">
                  <table role="presentation" width="100%" class="panel" style="padding: 22px 24px;">
                    <tr>
                      <td>
                        <h2 class="section-title">Message Received</h2>
                        <p class="body-copy">${escapeHtml(data.message)}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 0 36px 18px;">
                  <p class="body-copy">
                    Our team will review your inquiry and get back to you as soon as possible. We appreciate the opportunity to assist you.
                  </p>
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 0 36px 34px;">
                  <a href="${siteUrl}" class="button">Visit Zavior Group</a>
                </td>
              </tr>
              <tr>
                <td class="footer" style="padding: 0 36px 32px;">
                  <p class="footer-copy">
                    Warm regards,<br />
                    Zavior Group Team
                  </p>
                  <p class="footer-copy" style="margin-top: 8px;">
                    This is an automated confirmation email. Please reply to your regular Zavior contact for urgent matters.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function formatSubject(firstName: string, lastName: string) {
  return `New website lead from ${firstName} ${lastName}`.replace(
    /[\r\n]+/g,
    " ",
  );
}

async function updateSubmissionProgress(
  submissionId: string,
  nextProgress: Record<string, string>,
) {
  await updateSubmissionEntry(submissionId, (submission) => ({
    ...submission,
    progress: {
      ...submission.progress,
      ...nextProgress,
    },
  }));
}

async function processLeadSubmission(submission: SubmissionEntry) {
  const data = submission.payload as LeadSubmissionPayload;
  const sanity = getSanityClient();
  const transporter = getTransporter();
  const progress = { ...submission.progress };

  if (!progress.sanityDocumentId) {
    const createdDocument = await sanity.create({
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

    progress.sanityDocumentId = createdDocument._id;
    await updateSubmissionProgress(submission.id, {
      sanityDocumentId: createdDocument._id,
    });
  }

  const emailFrom = process.env.EMAIL_FROM!;
  const adminRecipient = process.env.LEADS_INBOX || emailFrom;

  if (!progress.adminEmailSentAt) {
    await transporter.sendMail({
      from: `"Zavior Website" <${emailFrom}>`,
      to: adminRecipient,
      subject: formatSubject(data.firstName, data.lastName),
      html: createEmailTemplate("admin", data),
    });

    const sentAt = new Date().toISOString();
    progress.adminEmailSentAt = sentAt;
    await updateSubmissionProgress(submission.id, {
      adminEmailSentAt: sentAt,
    });
  }

  if (!progress.userEmailSentAt) {
    await transporter.sendMail({
      from: `"Zavior Group" <${emailFrom}>`,
      to: data.email,
      subject: "Thank you for contacting Zavior Group",
      html: createEmailTemplate("user", data),
    });

    const sentAt = new Date().toISOString();
    progress.userEmailSentAt = sentAt;
    await updateSubmissionProgress(submission.id, {
      userEmailSentAt: sentAt,
    });
  }
}

async function processJobApplicationSubmission(submission: SubmissionEntry) {
  const data = submission.payload as JobApplicationSubmissionPayload;
  const sanity = getSanityClient();
  const progress = { ...submission.progress };

  if (!progress.sanityAssetId) {
    const uploadedResume = await sanity.assets.upload(
      "file",
      Buffer.from(data.resume.contentBase64, "base64"),
      {
        filename: data.resume.filename,
        contentType: data.resume.mimeType,
      },
    );

    progress.sanityAssetId = uploadedResume._id;
    await updateSubmissionProgress(submission.id, {
      sanityAssetId: uploadedResume._id,
    });
  }

  if (!progress.sanityDocumentId) {
    const createdDocument = await sanity.create({
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
          _ref: progress.sanityAssetId,
        },
      },
      submittedAt: data.submittedAt,
      ip: data.ip,
      submissionSource: "website",
    });

    await updateSubmissionProgress(submission.id, {
      sanityDocumentId: createdDocument._id,
    });
  }
}

async function processSubmission(submission: SubmissionEntry) {
  switch (submission.formType) {
    case "leadform":
      await processLeadSubmission(submission);
      return;
    case "job-application":
      await processJobApplicationSubmission(submission);
      return;
    default:
      throw new Error(`Unsupported submission type: ${submission.formType}`);
  }
}

function kickOffQueueProcessing() {
  scheduleSubmissionProcessing(processSubmission);
}

export async function queueLeadSubmission(payload: LeadSubmissionPayload) {
  const submission = await enqueueSubmission("leadform", payload);
  kickOffQueueProcessing();
  return submission;
}

export async function queueJobApplicationSubmission(
  payload: JobApplicationSubmissionPayload,
) {
  const submission = await enqueueSubmission("job-application", payload);
  kickOffQueueProcessing();
  return submission;
}
