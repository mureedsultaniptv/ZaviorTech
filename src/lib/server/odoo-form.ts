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

type OdooFormResponse = {
  success: boolean;
  id?: string | number;
  submissionId?: string | number;
  message?: string;
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
): Promise<OdooFormResponse | null> {
  let body: unknown;

  try {
    body = JSON.parse(await response.text());
  } catch {
    return null;
  }

  if (!isRecord(body) || ("error" in body && body.error)) {
    return null;
  }

  const payload = isRecord(body.result) ? body.result : body;
  if (("error" in payload && payload.error) || payload.success !== true) {
    return null;
  }

  const id = payload.id;
  const submissionId = payload.submissionId;
  const message = payload.message;

  return {
    success: true,
    ...(typeof id === "string" || typeof id === "number" ? { id } : {}),
    ...(typeof submissionId === "string" || typeof submissionId === "number"
      ? { submissionId }
      : {}),
    ...(typeof message === "string" ? { message } : {}),
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

export async function submitLeadFormToOdoo(payload: LeadFormPayload) {
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
      body: JSON.stringify({
        company: payload.company,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        message: payload.message,
        phone: payload.phone,
        service: payload.service,
        source: "website",
      }),
      redirect: "error",
      signal: controller.signal,
    });
    const result = await parseOdooResponse(response);
    const submissionId = getSubmissionId(result);

    if (!response.ok || !result?.success || !submissionId) {
      console.error("Odoo form submission failed", {
        status: response.status,
        success: result?.success,
      });
      throw new ApiError(502, "We could not submit your message right now. Please try again later.");
    }

    return {
      id: submissionId,
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
