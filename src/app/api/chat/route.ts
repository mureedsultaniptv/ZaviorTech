import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { getChatbotReply } from "@/lib/chat-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeMessage(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous";

  return ip;
}

function checkRateLimit(clientKey: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

function jsonResponse(
  body: { success: boolean; reply: string },
  status = 200,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (!checkRateLimit(clientKey)) {
    return jsonResponse(
      {
        success: false,
        reply: "Too many requests. Please try again shortly.",
      },
      429,
    );
  }

  try {
    const body: unknown = await request.json();

    if (!isRecord(body) || typeof body.message !== "string") {
      return jsonResponse(
        {
          success: false,
          reply: "Please send a valid message.",
        },
        400,
      );
    }

    const message = sanitizeMessage(body.message);

    if (!message) {
      return jsonResponse(
        {
          success: false,
          reply: "Please enter a message.",
        },
        400,
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse(
        {
          success: false,
          reply: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
        },
        400,
      );
    }

    return jsonResponse({
      success: true,
      reply: getChatbotReply(message),
    });
  } catch (error) {
    console.error("Chat API error", error);

    return jsonResponse(
      {
        success: false,
        reply: "Sorry, something went wrong. Please try again.",
      },
      500,
    );
  }
}
