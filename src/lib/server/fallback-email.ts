import nodemailer from "nodemailer";

const FALLBACK_RECIPIENTS = [
  "mureedsultangeni@gmail.com",
  "istallena@gmail.com",
  "mubeenbahoo11@gmail.com",
];

type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export async function sendFallbackSubmissionEmail(input: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  const host = process.env.EMAIL_SERVER_HOST?.trim();
  const port = Number(process.env.EMAIL_SERVER_PORT || 587);
  const user = process.env.EMAIL_SERVER_USER?.trim();
  const password = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM?.trim() || user;

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password || !from) {
    throw new Error("SMTP fallback email is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: 7_000,
    greetingTimeout: 7_000,
    socketTimeout: 12_000,
  });

  await transporter.sendMail({
    from,
    to: FALLBACK_RECIPIENTS,
    replyTo: input.replyTo || process.env.EMAIL_REPLY_TO?.trim() || undefined,
    subject: input.subject,
    text: input.text,
    attachments: input.attachments,
  });
}

export async function withEmailFallback<T>(input: {
  type: string;
  email: string;
  text: string;
  attachments?: EmailAttachment[];
  submitToOdoo: () => Promise<T>;
}) {
  try {
    const result = await input.submitToOdoo();
    return { result, delivery: "odoo" as const };
  } catch (odooError) {
    console.warn("Odoo submission failed; sending email fallback", {
      type: input.type,
      reason: odooError instanceof Error ? odooError.name : "submission_error",
    });
    try {
      await sendFallbackSubmissionEmail({
        subject: `Website ${input.type} submission (Odoo fallback)`,
        text: [
          `The website could not confirm the ${input.type} in Odoo.`,
          "",
          input.text,
        ].join("\n"),
        replyTo: input.email,
        attachments: input.attachments,
      });
      return { result: null, delivery: "email" as const };
    } catch (emailError) {
      console.error("Odoo and email fallback delivery failed", {
        type: input.type,
        reason: emailError instanceof Error ? emailError.name : "email_error",
      });
      throw new Error("We could not submit your request. Please try again later.");
    }
  }
}
