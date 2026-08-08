import { randomUUID } from "crypto";
import { ApiError } from "@/lib/server/api-errors";

type LeadFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  createdAt: string;
};

type OdooFormResponse = {
  success?: boolean;
  id?: string | number;
  submissionId?: string;
  message?: string;
};

const LOCAL_ODOO_FORM_ENDPOINT = "http://localhost:8069/zavior/form";
const ODOO_FORM_TIMEOUT_MS = 8_000;

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

  if (!usesSecureTransport && !isLocalDevelopmentEndpoint) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  return endpoint.toString();
}

function getOdooFormToken() {
  const token = process.env.ODOO_FORM_API_TOKEN?.trim()
    || process.env.ODOO_LEAD_API_TOKEN?.trim();

  if (process.env.NODE_ENV === "production" && !token) {
    throw new ApiError(503, "The form delivery service is not configured.");
  }

  return token;
}

async function parseOdooResponse(response: Response): Promise<OdooFormResponse> {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return {};
  }

  try {
    const body = await response.json();
    return body && typeof body === "object" ? body as OdooFormResponse : {};
  } catch {
    return {};
  }
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
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...payload,
        source: "website",
      }),
      signal: controller.signal,
    });
    const result = await parseOdooResponse(response);

    if (!response.ok || result.success === false) {
      console.error("Odoo form submission failed", {
        status: response.status,
        success: result.success,
      });
      throw new ApiError(502, "We could not submit your message right now. Please try again later.");
    }

    return {
      id: String(result.submissionId || result.id || randomUUID()),
      message: typeof result.message === "string" ? result.message : undefined,
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
