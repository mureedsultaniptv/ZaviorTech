/**
 * Portable Sanity schema definitions for the chat records written by the
 * server. The repository does not contain a Sanity Studio, so these can be
 * imported by the Studio's schema index when it lives in a separate project.
 */
export const chatMessageSchema = {
  name: "chatMessage",
  type: "object",
  fields: [
    { name: "role", type: "string", options: { list: ["user", "assistant"] } },
    { name: "content", type: "text" },
    { name: "timestamp", type: "datetime" },
  ],
} as const;

export const chatConversationSchema = {
  name: "chatConversation",
  type: "document",
  fields: [
    { name: "sessionId", type: "string" },
    { name: "visitorId", type: "string" },
    { name: "ipHash", type: "string" },
    { name: "startedAt", type: "datetime" },
    { name: "lastMessageAt", type: "datetime" },
    { name: "lastUserMessageAt", type: "datetime" },
    { name: "status", type: "string", options: { list: ["active", "qualified", "converted", "limit_reached", "abandoned"] } },
    { name: "sourcePage", type: "string" },
    { name: "serviceInterest", type: "string" },
    { name: "leadScore", type: "number" },
    { name: "leadSummary", type: "text" },
    { name: "whatsappRedirected", type: "boolean" },
    { name: "messageCount", type: "number" },
    { name: "contact", type: "object", fields: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "phone", type: "string" },
    ] },
    { name: "subject", type: "string" },
    { name: "description", type: "text" },
    { name: "qualification", type: "object", fields: [
      { name: "serviceInterest", type: "string" },
      { name: "company", type: "string" },
      { name: "companyType", type: "string" },
      { name: "requirement", type: "text" },
      { name: "budget", type: "string" },
      { name: "timeline", type: "string" },
      { name: "location", type: "string" },
      { name: "userCount", type: "string" },
      { name: "leadScore", type: "number" },
      { name: "wantsConsultation", type: "boolean" },
      { name: "wantsQuote", type: "boolean" },
      { name: "updatedAt", type: "datetime" },
    ] },
    { name: "messages", type: "array", of: [{ type: "chatMessage" }] },
  ],
} as const;

export const chatLeadSchema = {
  name: "chatLead",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "email", type: "string" },
    { name: "phone", type: "string" },
    { name: "company", type: "string" },
    { name: "serviceInterest", type: "string" },
    { name: "requirement", type: "text" },
    { name: "budget", type: "string" },
    { name: "timeline", type: "string" },
    { name: "location", type: "string" },
    { name: "leadScore", type: "number" },
    { name: "leadSummary", type: "text" },
    { name: "conversationReference", type: "reference", to: [{ type: "chatConversation" }] },
    { name: "sourcePage", type: "string" },
    { name: "createdAt", type: "datetime" },
    { name: "status", type: "string", options: { list: ["active", "qualified", "converted", "abandoned"] } },
  ],
} as const;

export const chatRateLimitSchema = {
  name: "chatRateLimit",
  type: "document",
  fields: [
    { name: "ipHash", type: "string" },
    { name: "date", type: "date" },
    { name: "count", type: "number" },
    { name: "resetAt", type: "datetime" },
  ],
} as const;

export const chatbotSchemas = [chatMessageSchema, chatConversationSchema, chatLeadSchema, chatRateLimitSchema];
