import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/server/api-errors";
import { submitLeadFormToOdoo } from "@/lib/server/odoo-form";
import {
  createLeadSession,
  getRequestMeta,
  isRecord,
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
    const [firstName, ...lastNameParts] = session.lead.name.trim().split(/\s+/);
    const submission = await submitLeadFormToOdoo({
      firstName,
      lastName: lastNameParts.join(" ") || "-",
      email: session.lead.email,
      phone: session.lead.phone,
      company: "",
      service: session.lead.serviceRequired,
      message: [
        `Chat session: ${session.sessionId}`,
        `Page: ${session.sourcePage}`,
        "",
        "Conversation:",
        ...session.messages.map((message) => `[${message.role}] ${message.content}`),
      ].join("\n"),
      utmSource: "Website",
      utmMedium: "chat",
      utmCampaign: "",
    });

    return jsonResponse({
      success: true,
      id: submission.id,
      submissionId: submission.submissionId || submission.id,
      sessionId: session.sessionId,
      lead: session.lead,
      delivery: submission.delivery,
    }, 201);
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
