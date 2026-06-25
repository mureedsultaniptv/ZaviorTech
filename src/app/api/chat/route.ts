import { NextRequest, NextResponse } from "next/server";
import demoData from "@/lib/demo-data.json";
import { ApiError } from "@/lib/server/api-errors";
import {
  appendChatExchange,
  CHAT_LIMIT_REPLY,
  consumeChatAllowance,
  createChatMessagePayload,
  createLeadCreatedPayload,
  createLeadSession,
  getGeminiSalesReply,
  getLeadSession,
  getRequestMeta,
  getSalesFallbackReply,
  isRecord,
  sendToOdoo,
  updateLeadQualification,
  validateChatMessage,
  validateLeadChatPayload,
} from "@/lib/server/lead-chat";
import {
  buildSalesAgentPrompt,
  buildSalesFallbackResponse,
  findRelevantBusinessSolutions,
  getSalesWhatsappUrl,
  normalizeSalesAgentResponse,
} from "@/lib/server/zavior-sales-agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function resolveSession(
  body: Record<string, unknown>,
  request: NextRequest,
) {
  const existingSession = getLeadSession(body.sessionId);
  if (existingSession) {
    return existingSession;
  }

  const leadCandidate = isRecord(body.lead) ? body.lead : body;

  try {
    const lead = validateLeadChatPayload(leadCandidate);
    const session = createLeadSession(
      lead,
      getRequestMeta(request),
      body.sessionId,
    );

    await sendToOdoo(
      createLeadCreatedPayload(session, {
        restoredFromChatRequest: true,
      }),
    );

    return session;
  } catch {
    throw new ApiError(403, "Please complete the lead form before chatting.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!isRecord(body)) {
      throw new ApiError(400, "Invalid chat request.");
    }

    const message = validateChatMessage(body);
    const requestMeta = getRequestMeta(request);
    const session = await resolveSession(body, request);
    const allowance = consumeChatAllowance(session, requestMeta.ipAddress);

    if (!allowance.allowed) {
      appendChatExchange(session, message, CHAT_LIMIT_REPLY);
      await sendToOdoo(
        createChatMessagePayload(session, message, CHAT_LIMIT_REPLY, {
          rateLimited: true,
          limitReason: allowance.reason,
        }),
      );

      return jsonResponse({
        success: true,
        reply: CHAT_LIMIT_REPLY,
        limited: true,
      });
    }

    updateLeadQualification(session, message);

    const conversationHistory = session.messages.slice(-12);
    const relevantItems = findRelevantBusinessSolutions(
      message,
      demoData,
      conversationHistory,
    );
    const whatsappUrl = getSalesWhatsappUrl();
    const fallbackResponse = buildSalesFallbackResponse(
      message,
      relevantItems,
      conversationHistory,
      whatsappUrl,
    );
    const prompt = buildSalesAgentPrompt(
      demoData,
      relevantItems,
      conversationHistory,
      {
        lead: session.lead,
        latestMessage: message,
        whatsappUrl,
      },
    );
    const geminiReply = await getGeminiSalesReply(session, message, prompt);
    const salesResponse = geminiReply
      ? normalizeSalesAgentResponse(
          geminiReply,
          fallbackResponse,
          relevantItems,
          whatsappUrl,
        )
      : fallbackResponse;
    const reply = salesResponse.message || getSalesFallbackReply(session, message);

    appendChatExchange(session, message, reply);
    await sendToOdoo(
      createChatMessagePayload(session, message, reply, {
        responseSource: geminiReply ? "gemini" : "fallback",
        recommendedLinks: salesResponse.recommendedLinks,
        whatsappUrl: salesResponse.whatsappUrl,
        leadIntent: salesResponse.leadIntent,
      }),
    );

    return jsonResponse({
      success: true,
      reply,
      message: reply,
      recommendedLinks: salesResponse.recommendedLinks,
      whatsappUrl: salesResponse.whatsappUrl,
      leadIntent: salesResponse.leadIntent,
      sessionId: session.sessionId,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse(
        {
          success: false,
          reply: error.message,
        },
        error.statusCode,
      );
    }

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
