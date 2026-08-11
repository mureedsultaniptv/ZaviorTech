import { ApiError } from "@/lib/server/api-errors";

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
  email: string;
  summary: string;
  messages: Array<{ role: "user" | "assistant"; content: string; timestamp: string }>;
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

function getAllowedInsecureHttpHosts() {
  return new Set(
    (process.env.ODOO_FORM_INSECURE_HTTP_HOSTS || "")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  );
}

function getOdooFormEndpoint() {
  const configuredEndpoint = process.env.ODOO_FORM_API_URL?.trim()
    || process.env.ODOO_LEAD_API_URL?.trim()
    || (process.env.NODE_ENV !== "production" ? LOCAL_ODOO_FORM_ENDPOINT : "");

  if (!configuredEndpoint) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  let endpoint: URL;
  try {
    endpoint = new URL(configuredEndpoint);
  } catch {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  const usesSecureTransport = endpoint.protocol === "https:";
  const isLocalDevelopmentEndpoint =
    process.env.NODE_ENV !== "production"
    && endpoint.protocol === "http:"
    && ["localhost", "127.0.0.1", "::1"].includes(endpoint.hostname);
  const isExplicitlyAllowedHttpEndpoint =
    endpoint.protocol === "http:"
    && getAllowedInsecureHttpHosts().has(endpoint.hostname.toLowerCase());

  if (
    !usesSecureTransport
    && !isLocalDevelopmentEndpoint
    && !isExplicitlyAllowedHttpEndpoint
  ) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  return endpoint.toString();
}

function getOdooFormToken() {
  const token = process.env.ODOO_FORM_API_TOKEN?.trim()
    || process.env.ODOO_LEAD_API_TOKEN?.trim();

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
    return { result: null, errorDetail: "Odoo response body could not be read." };
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
      errorDetail: typeof body === "object" && body && "error" in body
        ? String(body.error).slice(0, 240)
        : "Odoo returned an invalid response.",
    };
  }

  const payload = isRecord(body.result) ? body.result : body;
  if (("error" in payload && payload.error) || payload.success !== true) {
    return {
      result: null,
      errorDetail: typeof payload.error === "string"
        ? payload.error.slice(0, 240)
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
  options: { requireSubmissionId?: boolean } = {},
) {
  const endpoint = getOdooFormEndpoint();
  const token = getOdooFormToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ODOO_FORM_TIMEOUT_MS);

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
      throw new ApiError(502, "We could not submit your message right now. Please try again later.");
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
    throw new ApiError(502, "We could not submit your message right now. Please try again later.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitLeadFormToOdoo(payload: LeadFormPayload) {
  return submitToOdoo({
    company: payload.company,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    message: payload.message,
    phone: payload.phone,
    service: payload.service,
    source: "website",
  });
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

  return submitToOdoo({
    // The existing Odoo controller already accepts this lead-form shape.
    // Keep it for reliable lead creation while forwarding the full JSON below.
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
  });
}

export async function syncChatTranscriptToOdoo(payload: ChatTranscriptPayload) {
  if (!payload.leadId || !payload.email) return;

  const recentTranscript = payload.messages.slice(-12).map((message) => ({
    role: message.role,
    content: message.content,
    timestamp: message.timestamp,
  }));
  return submitToOdoo({
    // This is deliberately an update-only contract. It must never be treated
    // as a lead-creation request by the Odoo controller.
    operation: "update_chat_transcript",
    lead_id: payload.leadId,
    match_email: payload.email,
    chat_session_id: payload.sessionId,
    email: payload.email,
    chat_summary: payload.summary,
    chat_transcript: recentTranscript,
    chat_payload: {
      lead_id: payload.leadId,
      email: payload.email,
      session_id: payload.sessionId,
      summary: payload.summary,
      transcript: recentTranscript,
      updated_at: new Date().toISOString(),
    },
  }, { requireSubmissionId: false });
}
