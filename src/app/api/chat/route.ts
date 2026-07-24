import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/server/api-errors";
import {
  getChatLimits,
  getOrCreateChatConversation,
  getRequestMeta,
  loadChatConversation,
  sendChatMessage,
  serializeConversation,
} from "@/lib/server/chat-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return jsonResponse(
      { success: false, message: error.message, reply: error.message },
      error.statusCode,
      error.statusCode === 429 ? { "Retry-After": "10" } : undefined,
    );
  }

  console.error("Chat API error", {
    message: error instanceof Error ? error.message : "unknown_error",
  });
  return jsonResponse(
    {
      success: false,
      message: "Sorry, I’m having a little trouble responding right now. You can continue directly with our team on WhatsApp.",
      reply: "Sorry, I’m having a little trouble responding right now. You can continue directly with our team on WhatsApp.",
    },
    503,
  );
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    const conversation = sessionId ? await loadChatConversation(sessionId) : null;
    return jsonResponse({ ...serializeConversation(conversation), limits: getChatLimits() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new ApiError(400, "Invalid chat request.");
    }

    const payload = body as Record<string, unknown>;
    const message = typeof payload.message === "string" ? payload.message : "";
    if (!message.trim()) throw new ApiError(400, "Please enter a message.");
    if (message.length > 1000) throw new ApiError(400, "That message is a little too long. Please keep it under 1,000 characters.");

    const meta = getRequestMeta(request);
    const conversation = await getOrCreateChatConversation(payload.sessionId, meta, payload.sourcePage);
    const result = await sendChatMessage(conversation, message, meta);
    return jsonResponse({
      success: true,
      message: result.message,
      reply: result.message,
      sessionId: result.sessionId,
      remainingMessages: result.remainingMessages,
      showWhatsApp: result.showWhatsApp,
      whatsappUrl: result.whatsappUrl,
      cooldownSeconds: result.cooldownSeconds,
      actions: result.actions,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
