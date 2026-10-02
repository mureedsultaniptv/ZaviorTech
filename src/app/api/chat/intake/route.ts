import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/server/api-errors";
import {
  getOrCreateChatConversation,
  getChatWhatsappUrl,
  getRequestMeta,
  isAiProviderAvailable,
  submitChatIntake,
} from "@/lib/server/chat-service";
import { submitConsultationToOdoo } from "@/lib/server/odoo-form";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new ApiError(400, "Invalid customer details.");
    }

    const payload = body as Record<string, unknown>;
    if (typeof payload.website === "string" && payload.website.trim()) {
      throw new ApiError(400, "Invalid form submission.");
    }

    const meta = getRequestMeta(request);
    const conversation = await getOrCreateChatConversation(
      payload.sessionId,
      meta,
      payload.sourcePage,
    );
    const result = await submitChatIntake(conversation, payload);
    const submission = await submitConsultationToOdoo({
      name: result.customer.name,
      email: result.customer.email,
      phone: result.customer.phone,
      service: result.customer.serviceRequired,
      otherService: "",
      projectDescription: result.customer.description,
      serviceQuestions: {},
      source: "website_chat_intake",
      sourcePage: conversation.sourcePage,
    });
    const aiAvailable = await isAiProviderAvailable();
    const whatsappUrl = aiAvailable ? null : getChatWhatsappUrl(conversation);

    return response({
      success: true,
      ...result,
      submissionId: submission.id,
      delivery: submission.delivery,
      route: aiAvailable ? "ai" : "whatsapp",
      whatsappUrl,
    }, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return response({ success: false, message: error.message }, error.statusCode);
    }

    console.error("Chat intake error", {
      message: error instanceof Error ? error.message : "unknown_error",
    });
    return response(
      {
        success: false,
        message: "We couldn’t start the chat right now. Please try again.",
      },
      503,
    );
  }
}
