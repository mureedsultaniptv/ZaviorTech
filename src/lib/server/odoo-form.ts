import { ApiError } from "@/lib/server/api-errors";
import { withEmailFallback } from "@/lib/server/fallback-email";

type LeadFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

type ConsultationPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  otherService: string;
  projectDescription: string;
  serviceQuestions: Record<string, string>;
  source: string;
  sourcePage: string;
};

type ChatTranscriptPayload = {
  leadId: string;
  sessionId: string;
  summary: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }>;
};

type JobApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  jobId: string;
  submittedAt: string;
  resume: {
    filename: string;
    mimeType: string;
    contentBase64: string;
  };
};

type OdooFormResponse = {
  success: boolean;
  id?: string | number;
  submissionId?: string | number;
  message?: string;
};

type ParsedOdooResponse = {
  result: OdooFormResponse | null;
  errorDetail: string;
};

const LOCAL_ODOO_FORM_ENDPOINT = "http://localhost:8019/zavior/formsubmit";
const ODOO_FORM_TIMEOUT_MS = 8_000;
const ODOO_FILE_UPLOAD_TIMEOUT_MS = 20_000;

function getAllowedInsecureHttpHosts() {
  return new Set(
    (process.env.ODOO_FORM_INSECURE_HTTP_HOSTS || "")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  );
}

function getOdooFormEndpoint(configuredEndpointOverride?: string) {
  const configuredEndpoint =
    configuredEndpointOverride?.trim() ||
    process.env.ODOO_FORM_API_URL?.trim() ||
    process.env.ODOO_LEAD_API_URL?.trim() ||
    (process.env.NODE_ENV !== "production" ? LOCAL_ODOO_FORM_ENDPOINT : "");

  if (!configuredEndpoint) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  let endpoint: URL;
  try {
    endpoint = new URL(configuredEndpoint);
  } catch {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  const database =
    process.env.ODOO_DATABASE?.trim() || endpoint.searchParams.get("db")?.trim();
  if (!database) {
    throw new ApiError(503, "The Odoo database is not configured.");
  }
  endpoint.searchParams.set("db", database);

  const usesSecureTransport = endpoint.protocol === "https:";
  const isLocalDevelopmentEndpoint =
    process.env.NODE_ENV !== "production" &&
    endpoint.protocol === "http:" &&
    ["localhost", "127.0.0.1", "::1"].includes(endpoint.hostname);
  const isExplicitlyAllowedHttpEndpoint =
    endpoint.protocol === "http:" &&
    getAllowedInsecureHttpHosts().has(endpoint.hostname.toLowerCase());

  if (
    !usesSecureTransport &&
    !isLocalDevelopmentEndpoint &&
    !isExplicitlyAllowedHttpEndpoint
  ) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  return endpoint.toString();
}

function getOdooFormToken() {
  const token =
    process.env.ODOO_LEAD_API_TOKEN?.trim() ||
    process.env.ODOO_FORM_API_TOKEN?.trim();

  if (!token) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  return token;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function parseOdooResponse(
  response: Response,
): Promise<ParsedOdooResponse> {
  let rawBody = "";

  try {
    rawBody = await response.text();
  } catch {
    return {
      result: null,
      errorDetail: "Odoo response body could not be read.",
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return {
      result: null,
      errorDetail: `Odoo returned a non-JSON response (${rawBody.slice(0, 240).replace(/\s+/g, " ")}).`,
    };
  }

  if (!isRecord(body) || ("error" in body && body.error)) {
    return {
      result: null,
      errorDetail:
        typeof body === "object" && body && "error" in body
          ? String(body.error).slice(0, 240)
          : "Odoo returned an invalid response.",
    };
  }

  const payload = isRecord(body.result) ? body.result : body;
  if (("error" in payload && payload.error) || payload.success !== true) {
    return {
      result: null,
      errorDetail:
        typeof payload.error === "string"
          ? payload.error.slice(0, 240)
          : typeof payload.message === "string"
            ? payload.message.slice(0, 240)
            : "Odoo did not confirm the request.",
    };
  }

  const id = payload.id;
  const submissionId = payload.submissionId;
  const message = payload.message;

  return {
    result: {
      success: true,
      ...(typeof id === "string" || typeof id === "number" ? { id } : {}),
      ...(typeof submissionId === "string" || typeof submissionId === "number"
        ? { submissionId }
        : {}),
      ...(typeof message === "string" ? { message } : {}),
    },
    errorDetail: "",
  };
}

function getSubmissionId(result: OdooFormResponse | null) {
  const id = result?.submissionId ?? result?.id;
  if (typeof id === "number" && Number.isFinite(id)) {
    return String(id);
  }

  if (typeof id === "string" && id.trim()) {
    return id;
  }

  return null;
}

async function submitToOdoo(
  body: Record<string, unknown>,
  options: {
    requireSubmissionId?: boolean;
    timeoutMs?: number;
    endpoint?: string;
  } = {},
) {
  const endpoint = getOdooFormEndpoint(options.endpoint);
  const token = getOdooFormToken();
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? ODOO_FORM_TIMEOUT_MS,
  );

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      redirect: "error",
      signal: controller.signal,
    });
    const parsed = await parseOdooResponse(response);
    const result = parsed.result;
    const submissionId = getSubmissionId(result);

    if (
      !response.ok ||
      !result?.success ||
      (options.requireSubmissionId !== false && !submissionId)
    ) {
      console.error("Odoo form submission failed", {
        status: response.status,
        success: result?.success,
        reason: parsed.errorDetail || "Odoo did not return a lead identifier.",
      });
      throw new ApiError(
        502,
        "We could not submit your message right now. Please try again later.",
      );
    }

    return {
      id: submissionId || "",
      message: result.message,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Odoo form submission request failed", {
      reason: error instanceof Error ? error.name : "request_error",
    });
    throw new ApiError(
      502,
      "We could not submit your message right now. Please try again later.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitLeadFormToOdoo(payload: LeadFormPayload) {
  const { result, delivery } = await withEmailFallback({
    type: "contact form",
    email: payload.email,
    text: [
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "Not provided"}`,
      `Company: ${payload.company || "Not provided"}`,
      `Service: ${payload.service || "Not provided"}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    submitToOdoo: () => submitToOdoo({
      company: payload.company,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      message: payload.message,
      phone: payload.phone,
      service: payload.service,
      source: "website",
      utm_source: "website",
      utm_medium: "contact_form",
    }),
  });

  return result
    ? { ...result, delivery }
    : { id: "email-fallback", message: "Your message was received by email.", delivery };
}

export async function submitConsultationToOdoo(payload: ConsultationPayload) {
  const [firstName, ...lastNameParts] = payload.name.trim().split(/\s+/);
  const lastName = lastNameParts.join(" ") || "-";
  const consultationPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service: payload.service,
    other_service: payload.otherService,
    project_description: payload.projectDescription,
    service_questions: payload.serviceQuestions,
    source: payload.source,
    page: payload.sourcePage,
    submitted_at: new Date().toISOString(),
  };

  const { result, delivery } = await withEmailFallback({
    type: "consultation",
    email: payload.email,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Service: ${payload.service}${payload.otherService ? ` (${payload.otherService})` : ""}`,
      `Source: ${payload.source}`,
      `Page: ${payload.sourcePage}`,
      "",
      "Project description:",
      payload.projectDescription,
      "",
      "Service answers:",
      ...Object.entries(payload.serviceQuestions).map(([key, value]) => `${key}: ${value}`),
    ].join("\n"),
    submitToOdoo: () => submitToOdoo({
      // Keep the existing lead-form shape while forwarding the full payload.
      firstName,
      lastName,
      company: "",
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.projectDescription,
      name: payload.name,
      other_service: payload.otherService,
      project_description: payload.projectDescription,
      service_questions: payload.serviceQuestions,
      source: payload.source,
      page: payload.sourcePage,
      submitted_at: consultationPayload.submitted_at,
      consultation_payload: consultationPayload,
    }),
  });

  return result
    ? { ...result, delivery }
    : { id: "email-fallback", message: "Your consultation request was received by email.", delivery };
}

export async function submitJobApplicationToOdoo(
  payload: JobApplicationPayload,
) {
  const [firstName, ...lastNameParts] = payload.name.trim().split(/\s+/);
  const lastName = lastNameParts.join(" ") || "-";
  const application = {
    job_id: payload.jobId,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    linkedin: payload.linkedin,
    portfolio: payload.portfolio,
    cover_letter: payload.coverLetter,
    submitted_at: payload.submittedAt,
    resume: {
      filename: payload.resume.filename,
      mime_type: payload.resume.mimeType,
      content_base64: payload.resume.contentBase64,
    },
  };

  const { result, delivery } = await withEmailFallback({
    type: "job application",
    email: payload.email,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "Not provided"}`,
      `Job ID: ${payload.jobId}`,
      `LinkedIn: ${payload.linkedin || "Not provided"}`,
      `Portfolio: ${payload.portfolio || "Not provided"}`,
      "",
      "Cover letter:",
      payload.coverLetter || "Not provided",
      "",
      `Resume attached: ${payload.resume.filename}`,
    ].join("\n"),
    attachments: [{
      filename: payload.resume.filename,
      content: Buffer.from(payload.resume.contentBase64, "base64"),
      contentType: payload.resume.mimeType,
    }],
    submitToOdoo: () => submitToOdoo(
      {
        operation: "job_application",
        form_type: "job_application",
        source: "website",
        firstName,
        lastName,
        name: payload.name,
        company: "",
        email: payload.email,
        phone: payload.phone,
        service: "Career Application",
        message: payload.coverLetter,
        job_id: payload.jobId,
        linkedin: payload.linkedin,
        portfolio: payload.portfolio,
        cover_letter: payload.coverLetter,
        submitted_at: payload.submittedAt,
        resume_filename: payload.resume.filename,
        resume_mime_type: payload.resume.mimeType,
        resume_content_base64: payload.resume.contentBase64,
        job_application_payload: application,
      },
      { timeoutMs: ODOO_FILE_UPLOAD_TIMEOUT_MS },
    ),
  });

  return result
    ? { ...result, delivery }
    : { id: "email-fallback", message: "Your application was received by email.", delivery };
}

export async function syncChatTranscriptToOdoo(payload: ChatTranscriptPayload) {
  if (!payload.leadId) return;

  const numericLeadId = Number(payload.leadId);
  const leadId = Number.isSafeInteger(numericLeadId) && numericLeadId > 0
    ? numericLeadId
    : payload.leadId;

  const recentTranscript = payload.messages.slice(-12).map((message) => ({
    role: message.role,
    content: message.content,
    timestamp: message.timestamp,
  }));
  return submitToOdoo(
    {
      // This is deliberately an update-only contract. It must never be treated
      // as a lead-creation request by the Odoo controller.
      operation: "update_chat_transcript",
      lead_id: leadId,
      chat_session_id: payload.sessionId,
      chat_summary: payload.summary,
      chat_transcript: recentTranscript,
    },
    {
      requireSubmissionId: false,
      endpoint: process.env.ODOO_CHAT_API_URL?.trim(),
    },
  );
}
