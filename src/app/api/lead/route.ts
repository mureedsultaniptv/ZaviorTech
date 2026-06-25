import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/server/api-errors";
import {
  createLeadCreatedPayload,
  createLeadSession,
  getRequestMeta,
  isRecord,
  sendToOdoo,
  validateLeadChatPayload,
} from "@/lib/server/lead-chat";

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

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!isRecord(body)) {
      throw new ApiError(400, "Invalid lead details.");
    }

    const lead = validateLeadChatPayload(body);
    const session = createLeadSession(lead, getRequestMeta(request));

    await sendToOdoo(createLeadCreatedPayload(session));

    return jsonResponse({
      success: true,
      sessionId: session.sessionId,
      lead: session.lead,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse(
        {
          success: false,
          message: error.message,
        },
        error.statusCode,
      );
    }

    console.error("Lead API error", error);

    return jsonResponse(
      {
        success: false,
        message: "Sorry, we could not start the chat. Please try again.",
      },
      500,
    );
  }
}
