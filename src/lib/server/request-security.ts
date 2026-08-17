import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { SITE_URL } from "@/lib/site";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_STORE = new Map<string, RateLimitRecord>();
const DEFAULT_LOCAL_ORIGINS = new Set([
  "http://localhost:3000",
  "https://www.zavior.org",
  "https://zavior.org",
]);

function getRequestOrigin(req: NextApiRequest) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol =
    (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) ??
    (process.env.NODE_ENV === "production" ? "https" : "http");
  const forwardedHost = req.headers["x-forwarded-host"];
  const host =
    (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) ??
    req.headers.host;

  return host ? `${protocol}://${host}` : SITE_URL;
}

function normalizeIp(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) {
    return "unknown";
  }

  const ip = rawValue.split(",")[0]?.trim() ?? "unknown";
  return ip === "::1" ? "127.0.0.1" : ip;
}

export function requireTrustedFormRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  expectedForm: string,
) {
  const formHeader = req.headers["x-zavior-form"];
  const submittedForm = Array.isArray(formHeader) ? formHeader[0] : formHeader;

  if (submittedForm !== expectedForm) {
    res.status(400).json({ message: "Invalid form submission." });
    return false;
  }

  const runtimeOrigin = getRequestOrigin(req);
  const allowedOrigins = new Set([SITE_URL, runtimeOrigin, ...DEFAULT_LOCAL_ORIGINS]);
  const originHeader = req.headers.origin;
  const refererHeader = req.headers.referer;
  const submittedOrigin = originHeader || refererHeader;

  if (!submittedOrigin) {
    if (process.env.NODE_ENV !== "production") {
      return true;
    }

    res.status(403).json({ message: "Invalid request origin." });
    return false;
  }

  try {
    const origin = new URL(submittedOrigin).origin;
    if (!allowedOrigins.has(origin)) {
      res.status(403).json({ message: "Invalid request origin." });
      return false;
    }
  } catch {
    res.status(403).json({ message: "Invalid request origin." });
    return false;
  }

  return true;
}

export function consumeRateLimit(
  key: string,
  max: number,
  windowMs: number,
) {
  const now = Date.now();
  const record = RATE_LIMIT_STORE.get(key);

  if (!record || record.resetAt <= now) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (record.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  RATE_LIMIT_STORE.set(key, record);

  return { allowed: true, remaining: Math.max(0, max - record.count) };
}

export function applyRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  scope: string,
  options: { max: number; windowMs: number },
) {
  const ip = normalizeIp(req.headers["x-forwarded-for"]) ||
    normalizeIp(req.socket.remoteAddress) ||
    "unknown";
  const result = consumeRateLimit(`${scope}:${ip}`, options.max, options.windowMs);

  if (!result.allowed) {
    res.status(429).json({
      message: "Too many submissions received. Please wait and try again.",
    });
    return false;
  }

  return true;
}

export function sanitizeFilename(filename: string) {
  const baseName = path.basename(filename || "file");
  const cleaned = baseName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 120) || "file";
}
