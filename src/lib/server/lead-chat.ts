import { randomUUID } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { ApiError } from "@/lib/server/api-errors";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_PHONE_LENGTH = 40;
const MAX_SERVICE_LENGTH = 160;
const MAX_SOURCE_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 500;
const MAX_STORED_TRANSCRIPT_ITEMS = 80;
const DEFAULT_DAILY_LIMIT = 30;
const DEFAULT_SESSION_MESSAGE_LIMIT = 12;
const DEFAULT_COOLDOWN_SECONDS = 10;
const GEMINI_TIMEOUT_MS = 12000;
const DEFAULT_GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.5-flash",
];

export const CHAT_LIMIT_REPLY =
  "Thanks for your interest. Our team has received your request and will contact you shortly. Please share any urgent details on WhatsApp.";

const SYSTEM_PROMPT =
  "You are a professional software sales consultant. Use conversation history. Do not repeat the same answer. Do not call the customer by service name, budget, category, or fake name. Ask the next useful question based on what the customer already said. Keep replies short and natural. Your goal is to qualify the lead and move them toward consultation. Ask only one question at a time.";

export type QualificationStage =
  | "service_identified"
  | "business_type_needed"
  | "modules_needed"
  | "budget_needed"
  | "timeline_needed"
  | "ready_for_consultation";

export type LeadQualification = {
  stage: QualificationStage;
  service: string;
  businessType: string;
  modules: string[];
  userCount: string;
  budget: string;
  timeline: string;
  updatedAt: string;
};

const FAKE_NAME_VALUES = new Set([
  "test",
  "demo",
  "admin",
  "user",
  "abc",
  "xyz",
  "qwerty",
  "asdf",
  "name",
  "null",
  "none",
  "na",
]);

const RESERVED_NAME_VALUES = new Set([
  ...FAKE_NAME_VALUES,
  "budget",
  "category",
  "service",
  "services",
  "help",
  "support",
  "price",
  "pricing",
  "quote",
  "demo",
  "consultation",
  "odoo",
  "erp",
  "crm",
  "website",
  "websitedevelopment",
  "webdevelopment",
  "ecommerce",
  "mobile",
  "mobileapp",
  "app",
  "chatbot",
  "automation",
  "software",
  "customsoftware",
  "module",
  "modules",
  "sales",
  "inventory",
  "accounting",
  "other",
]);

const FAKE_EMAIL_VALUES = new Set([
  "test@test.com",
  "demo@demo.com",
  "abc@gmail.com",
  "a@a.com",
]);

const FAKE_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODULE_KEYWORDS: Array<[string, RegExp]> = [
  ["sales", /\b(sales?|quotation|quote|orders?)\b/i],
  ["inventory", /\b(inventory|stock|warehouse|warehouses)\b/i],
  ["purchases", /\b(purchase|purchases|procurement|vendors?|suppliers?)\b/i],
  ["accounting", /\b(accounting|finance|invoicing|invoice|billing)\b/i],
  ["CRM", /\bcrm|leads?|pipeline|customers?\b/i],
  ["manufacturing", /\b(manufacturing|production|mrp|bom)\b/i],
  ["POS", /\bpos|point of sale|retail counter\b/i],
  ["ecommerce", /\becommerce|e-commerce|online store|shopify|woocommerce\b/i],
  ["delivery", /\b(delivery|deliveries|fleet|dispatch|logistics)\b/i],
  ["HR", /\bhr|payroll|attendance|employees?\b/i],
  ["projects", /\b(projects?|tasks?|timesheet)\b/i],
];

const BUSINESS_TYPES = [
  "furniture",
  "manufacturing",
  "retail",
  "ecommerce",
  "trading",
  "distribution",
  "logistics",
  "real estate",
  "construction",
  "restaurant",
  "cafe",
  "clinic",
  "pharmacy",
  "salon",
  "beauty",
  "education",
  "school",
  "hospital",
  "automotive",
  "workshop",
  "wholesale",
  "software",
  "services",
];

export type LeadInfo = {
  name: string;
  email: string;
  phone: string;
  serviceRequired: string;
  sourcePage: string;
};

export type StoredChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type LeadSession = {
  sessionId: string;
  lead: LeadInfo;
  ipAddress: string;
  userAgent: string;
  sourcePage: string;
  createdAt: string;
  qualification: LeadQualification;
  messages: StoredChatMessage[];
  messageCount: number;
  lastMessageAt: number;
};

type DailyRateRecord = {
  count: number;
  resetAt: number;
};

type RequestMeta = {
  ipAddress: string;
  userAgent: string;
};

type GeminiRequestResult =
  | {
      reply: string;
      modelNotFound?: false;
    }
  | {
      reply: "";
      modelNotFound: boolean;
    };

type GlobalChatState = typeof globalThis & {
  __zaviorLeadSessions?: Map<string, LeadSession>;
  __zaviorDailyChatLimits?: Map<string, DailyRateRecord>;
};

const globalChatState = globalThis as GlobalChatState;
const leadSessions =
  globalChatState.__zaviorLeadSessions ?? new Map<string, LeadSession>();
const dailyChatLimits =
  globalChatState.__zaviorDailyChatLimits ?? new Map<string, DailyRateRecord>();

globalChatState.__zaviorLeadSessions = leadSessions;
globalChatState.__zaviorDailyChatLimits = dailyChatLimits;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getEnvNumber(
  name: string,
  fallback: number,
  options: { min: number; max: number },
) {
  const parsed = Number.parseInt(process.env[name] ?? "", 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(options.max, Math.max(options.min, parsed));
}

function removeControlCharacters(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ");
}

function sanitizeText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readRequiredText(value: unknown, label: string, maxLength: number) {
  const normalized = sanitizeText(removeControlCharacters(String(value ?? "")));

  if (!normalized) {
    throw new ApiError(400, `${label} is required.`);
  }

  if (normalized.length > maxLength) {
    throw new ApiError(400, `${label} is too long.`);
  }

  return normalized;
}

function readOptionalText(value: unknown, maxLength: number) {
  const normalized = sanitizeText(removeControlCharacters(String(value ?? "")));
  return normalized.slice(0, maxLength);
}

function normalizeFakeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getNameValidationError(name: string, serviceRequired = "") {
  const normalized = normalizeFakeValue(name);
  const words = name
    .split(/\s+/)
    .map((word) => normalizeFakeValue(word))
    .filter(Boolean);
  const meaningful = name.replace(/[^\p{L}\p{N}]/gu, "");
  const letterCount = name.match(/\p{L}/gu)?.length ?? 0;
  const normalizedService = normalizeFakeValue(serviceRequired);

  if (
    RESERVED_NAME_VALUES.has(normalized) ||
    Boolean(normalizedService && normalized === normalizedService) ||
    RESERVED_NAME_VALUES.has(words[0] ?? "") ||
    words.every((word) => RESERVED_NAME_VALUES.has(word))
  ) {
    return "Please enter a real name.";
  }

  if (letterCount < 2 || meaningful.length < 3) {
    return "Please enter a real name.";
  }

  if (/^(.)\1{2,}$/iu.test(meaningful)) {
    return "Please enter a real name.";
  }

  return "";
}

function validateRealisticName(name: string, serviceRequired = "") {
  const error = getNameValidationError(name, serviceRequired);

  if (error) {
    throw new ApiError(400, error);
  }
}

export function getSafeCustomerName(lead: Pick<LeadInfo, "name" | "serviceRequired">) {
  const name = sanitizeText(lead.name || "");

  if (!name || getNameValidationError(name, lead.serviceRequired)) {
    return "";
  }

  return name.split(/\s+/)[0] || "";
}

function validateEmail(email: string) {
  const normalized = email.toLowerCase();
  const [localPart = "", domain = ""] = normalized.split("@");

  if (!EMAIL_PATTERN.test(normalized)) {
    throw new ApiError(400, "Email is invalid.");
  }

  if (
    FAKE_EMAIL_VALUES.has(normalized) ||
    FAKE_EMAIL_DOMAINS.has(domain) ||
    (localPart === domain.split(".")[0] && FAKE_NAME_VALUES.has(localPart))
  ) {
    throw new ApiError(400, "Please enter a real business email address.");
  }
}

function validatePhone(phone: string) {
  const compact = phone.replace(/[\s().-]/g, "");
  const digits = phone.replace(/\D/g, "");
  const isInternational = /^\+[1-9]\d{7,14}$/.test(compact);
  const isPakistanMobile = /^(?:0092|92|0)?3\d{9}$/.test(digits);
  const isUaeMobile = /^(?:00971|971|0)?5\d{8}$/.test(digits);
  const hasRepeatedDigits = /^(\d)\1{6,}$/.test(digits);

  if (
    hasRepeatedDigits ||
    (!isInternational && !isPakistanMobile && !isUaeMobile)
  ) {
    throw new ApiError(
      400,
      "Phone number must be a valid international, Pakistan, or UAE number.",
    );
  }
}

function normalizeSessionId(value: unknown) {
  const sessionId = readOptionalText(value, 80);
  if (/^[a-zA-Z0-9-]{12,80}$/.test(sessionId)) {
    return sessionId;
  }

  return randomUUID();
}

function getNextUtcMidnight(now: number) {
  const current = new Date(now);
  return Date.UTC(
    current.getUTCFullYear(),
    current.getUTCMonth(),
    current.getUTCDate() + 1,
  );
}

function cleanupExpiredState() {
  const now = Date.now();
  const sessionTtlMs = 24 * 60 * 60 * 1000;

  for (const [sessionId, session] of leadSessions.entries()) {
    if (Date.parse(session.createdAt) + sessionTtlMs <= now) {
      leadSessions.delete(sessionId);
    }
  }

  for (const [key, record] of dailyChatLimits.entries()) {
    if (record.resetAt <= now) {
      dailyChatLimits.delete(key);
    }
  }
}

export function getRequestMeta(request: Request): RequestMeta {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    vercelIp?.split(",")[0]?.trim() ||
    realIp ||
    "unknown";

  return {
    ipAddress: ipAddress === "::1" ? "127.0.0.1" : ipAddress,
    userAgent: readOptionalText(request.headers.get("user-agent"), 300),
  };
}

export function validateLeadChatPayload(input: Record<string, unknown>) {
  if (readOptionalText(input.website, 200)) {
    throw new ApiError(400, "Invalid form submission.");
  }

  const name = readRequiredText(input.name, "Full name", MAX_NAME_LENGTH);
  const email = readRequiredText(input.email, "Email", MAX_EMAIL_LENGTH)
    .toLowerCase()
    .trim();
  const phone = readRequiredText(input.phone, "Phone number", MAX_PHONE_LENGTH);
  const serviceRequired = readRequiredText(
    input.serviceRequired,
    "Service/help required",
    MAX_SERVICE_LENGTH,
  );
  const sourcePage = readOptionalText(input.sourcePage, MAX_SOURCE_LENGTH);

  validateRealisticName(name, serviceRequired);
  validateEmail(email);
  validatePhone(phone);

  return {
    name,
    email,
    phone,
    serviceRequired,
    sourcePage,
  };
}

export function validateChatMessage(input: Record<string, unknown>) {
  const message = readRequiredText(input.message, "Message", MAX_MESSAGE_LENGTH);
  return message;
}

function isUsefulServiceValue(value: string) {
  const normalized = normalizeFakeValue(value);
  return Boolean(
    value &&
      ![
        "budget",
        "category",
        "test",
        "demo",
        "help",
        "support",
        "service",
        "services",
        "other",
      ].includes(normalized),
  );
}

function detectService(text: string, serviceRequired: string) {
  if (/\bodoo\b|\berp\b/i.test(text)) {
    return "Odoo ERP";
  }

  if (/\bcrm\b/i.test(text)) {
    return "CRM";
  }

  if (/\be-?commerce|online store|shopify|woocommerce\b/i.test(text)) {
    return "ecommerce";
  }

  if (/\bmobile app|android|ios\b/i.test(text)) {
    return "mobile app";
  }

  if (/\bwebsite|web app|web development\b/i.test(text)) {
    return "website";
  }

  if (/\bchatbot|ai bot|ai assistant\b/i.test(text)) {
    return "AI chatbot";
  }

  if (/\bautomation|workflow|n8n|zapier\b/i.test(text)) {
    return "automation";
  }

  if (/\bdashboard|analytics|reporting\b/i.test(text)) {
    return "dashboard";
  }

  if (/\bcustom software|software system|portal\b/i.test(text)) {
    return "custom software";
  }

  return isUsefulServiceValue(serviceRequired) ? serviceRequired : "";
}

function cleanBusinessType(value: string) {
  return value
    .replace(/\b(a|an|the|my|our)\b/gi, " ")
    .replace(/\b(business|company|store|shop|factory|firm|agency)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function detectBusinessType(text: string) {
  const lowerText = text.toLowerCase();

  for (const businessType of BUSINESS_TYPES) {
    if (new RegExp(`\\b${businessType.replace(/\s+/g, "\\s+")}\\b`, "i").test(lowerText)) {
      return `${businessType} business`;
    }
  }

  const match = text.match(
    /\b(?:i|we)\s+(?:have|run|own|operate|are in|work in)\s+(?:a|an|the)?\s*([a-z][a-z\s&-]{2,45}?)(?:\s+business|\s+company|\s+store|\s+shop|\s+factory|\s+firm|\s+agency|[.!?]|$)/i,
  );
  const businessType = match?.[1] ? cleanBusinessType(match[1]) : "";

  return businessType ? `${businessType} business` : "";
}

function detectModules(text: string) {
  return MODULE_KEYWORDS.filter(([, pattern]) => pattern.test(text)).map(
    ([module]) => module,
  );
}

function detectUserCount(text: string) {
  const directMatch =
    text.match(
      /\b(?:around|about|approx(?:imately)?|nearly)?\s*(\d{1,4})\s*(?:users?|employees?|staff|people|members|logins?|seats?)\b/i,
    ) ||
    text.match(
      /\b(?:users?|employees?|staff|people|members|logins?|seats?)\s*(?:are|is|:)?\s*(\d{1,4})\b/i,
    );

  return directMatch?.[1] ? `${directMatch[1]} users` : "";
}

function detectBudget(text: string) {
  if (/\bbudget\b/i.test(text) && /\b(not sure|no idea|don't know|dont know|open)\b/i.test(text)) {
    return "not sure yet";
  }

  const budgetMatch =
    text.match(
      /\b(?:budget|investment|range)\s*(?:is|around|about|of|:)?\s*((?:\$|usd|aed|pkr|rs\.?|sar|gbp|eur)?\s*[\d,.]+(?:\s*(?:k|m|million|thousand))?)/i,
    ) ||
    text.match(
      /\b(?:\$|usd|aed|pkr|rs\.?|sar|gbp|eur)\s*[\d,.]+(?:\s*(?:k|m|million|thousand))?\b/i,
    );

  return budgetMatch?.[0]?.trim() ?? "";
}

function detectTimeline(text: string) {
  const timelineMatch =
    text.match(/\b(asap|urgent|immediately)\b/i) ||
    text.match(/\b(?:this|next)\s+(?:week|month|quarter)\b/i) ||
    text.match(/\b(?:in|within)\s+\d+\s+(?:days?|weeks?|months?)\b/i) ||
    text.match(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i);

  return timelineMatch?.[0]?.trim() ?? "";
}

function createInitialQualification(lead: LeadInfo): LeadQualification {
  const service = detectService("", lead.serviceRequired);

  return {
    stage: service ? "service_identified" : "business_type_needed",
    service,
    businessType: "",
    modules: [],
    userCount: "",
    budget: "",
    timeline: "",
    updatedAt: new Date().toISOString(),
  };
}

function getSessionQualification(session: LeadSession) {
  if (!session.qualification) {
    session.qualification = createInitialQualification(session.lead);
    leadSessions.set(session.sessionId, session);
  }

  return session.qualification;
}

function getUserConversationText(session: LeadSession, latestMessage = "") {
  return [
    ...session.messages
      .filter((entry) => entry.role === "user")
      .map((entry) => entry.content),
    latestMessage,
  ]
    .filter(Boolean)
    .join("\n");
}

function getQualificationStage(
  qualification: LeadQualification,
  hasCustomerMessage: boolean,
): QualificationStage {
  if (!qualification.service) {
    return "service_identified";
  }

  if (!qualification.businessType) {
    return hasCustomerMessage ? "business_type_needed" : "service_identified";
  }

  if (qualification.modules.length === 0) {
    return "modules_needed";
  }

  if (!qualification.budget) {
    return "budget_needed";
  }

  if (!qualification.timeline) {
    return "timeline_needed";
  }

  return "ready_for_consultation";
}

export function updateLeadQualification(
  session: LeadSession,
  latestMessage = "",
) {
  const conversationText = getUserConversationText(session, latestMessage);
  const previous = getSessionQualification(session);
  const detectedModules = detectModules(conversationText);
  const modules = [...new Set([...previous.modules, ...detectedModules])];
  const next: LeadQualification = {
    stage: previous.stage,
    service:
      detectService(conversationText, session.lead.serviceRequired) ||
      previous.service,
    businessType: detectBusinessType(conversationText) || previous.businessType,
    modules,
    userCount: detectUserCount(conversationText) || previous.userCount,
    budget: detectBudget(conversationText) || previous.budget,
    timeline: detectTimeline(conversationText) || previous.timeline,
    updatedAt: new Date().toISOString(),
  };

  next.stage = getQualificationStage(next, Boolean(conversationText.trim()));
  session.qualification = next;
  leadSessions.set(session.sessionId, session);

  return next;
}

function getNextQuestionFocus(qualification: LeadQualification) {
  if (!qualification.service) {
    return "service";
  }

  if (!qualification.businessType) {
    return "business_type";
  }

  if (qualification.modules.length === 0) {
    return "modules";
  }

  if (!qualification.userCount) {
    return "user_count";
  }

  if (!qualification.budget) {
    return "budget";
  }

  if (!qualification.timeline) {
    return "timeline";
  }

  return "consultation";
}

function getServiceLabel(qualification: LeadQualification, lead: LeadInfo) {
  return qualification.service || detectService("", lead.serviceRequired) || "your project";
}

function isOdooService(service: string) {
  return /\bodoo\b|\berp\b/i.test(service);
}

export function createLeadSession(
  lead: LeadInfo,
  meta: RequestMeta,
  requestedSessionId?: unknown,
) {
  cleanupExpiredState();

  const sessionId = requestedSessionId
    ? normalizeSessionId(requestedSessionId)
    : randomUUID();
  const session: LeadSession = {
    sessionId,
    lead,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    sourcePage: lead.sourcePage,
    createdAt: new Date().toISOString(),
    qualification: createInitialQualification(lead),
    messages: [],
    messageCount: 0,
    lastMessageAt: 0,
  };

  leadSessions.set(sessionId, session);
  return session;
}

export function getLeadSession(sessionId: unknown) {
  const normalized = readOptionalText(sessionId, 80);
  if (!normalized) {
    return null;
  }

  cleanupExpiredState();
  return leadSessions.get(normalized) ?? null;
}

export function consumeChatAllowance(session: LeadSession, ipAddress: string) {
  const now = Date.now();
  const dailyLimit = getEnvNumber("CHAT_DAILY_LIMIT_PER_IP", DEFAULT_DAILY_LIMIT, {
    min: 1,
    max: 1000,
  });
  const sessionLimit = getEnvNumber(
    "CHAT_MAX_MESSAGES_PER_SESSION",
    DEFAULT_SESSION_MESSAGE_LIMIT,
    { min: 1, max: 100 },
  );
  const cooldownMs =
    getEnvNumber("CHAT_COOLDOWN_SECONDS", DEFAULT_COOLDOWN_SECONDS, {
      min: 0,
      max: 3600,
    }) * 1000;
  const dailyKey = `${new Date(now).toISOString().slice(0, 10)}:${ipAddress}`;
  const dailyRecord =
    dailyChatLimits.get(dailyKey) ?? {
      count: 0,
      resetAt: getNextUtcMidnight(now),
    };

  cleanupExpiredState();

  if (dailyRecord.count >= dailyLimit) {
    return { allowed: false, reason: "daily_limit" };
  }

  if (session.messageCount >= sessionLimit) {
    return { allowed: false, reason: "session_limit" };
  }

  if (session.lastMessageAt && now - session.lastMessageAt < cooldownMs) {
    return { allowed: false, reason: "cooldown" };
  }

  dailyRecord.count += 1;
  dailyChatLimits.set(dailyKey, dailyRecord);
  session.messageCount += 1;
  session.lastMessageAt = now;
  leadSessions.set(session.sessionId, session);

  return { allowed: true, reason: "allowed" };
}

export function appendChatExchange(
  session: LeadSession,
  customerMessage: string,
  botReply: string,
) {
  const now = new Date().toISOString();

  session.messages.push(
    {
      role: "user",
      content: customerMessage,
      timestamp: now,
    },
    {
      role: "assistant",
      content: botReply,
      timestamp: new Date().toISOString(),
    },
  );

  if (session.messages.length > MAX_STORED_TRANSCRIPT_ITEMS) {
    session.messages.splice(
      0,
      session.messages.length - MAX_STORED_TRANSCRIPT_ITEMS,
    );
  }

  leadSessions.set(session.sessionId, session);
}

function cleanGeminiKey(key: unknown) {
  return String(key ?? "")
    .trim()
    .replace(/^[\s"'`[]+|[\s"'`\]]+$/g, "")
    .trim();
}

function parseGeminiKeys(configured: string) {
  const trimmed = configured.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(cleanGeminiKey);
      }
    } catch {
      // Fall through to comma parsing for malformed env values.
    }
  }

  return trimmed.split(",").map(cleanGeminiKey);
}

function getGeminiKeys() {
  const configured = process.env.GEMINI_API_KEYS || "";
  return parseGeminiKeys(configured).filter(
    (key) => key && !isPlaceholderGeminiKey(key),
  );
}

function isPlaceholderGeminiKey(key: string) {
  return /^(key\d*|your[_-]?gemini[_-]?api[_-]?key|your[_-]?api[_-]?key|replace[_-]?me)$/i.test(
    key.trim(),
  );
}

function getGeminiModels() {
  const configured = process.env.GEMINI_MODELS || process.env.GEMINI_MODEL || "";
  const models = configured
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);

  return models.length ? models : DEFAULT_GEMINI_MODELS;
}

function buildGeminiUserPrompt(session: LeadSession, message: string) {
  const recentTranscript = session.messages
    .slice(-10)
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join("\n");
  const safeCustomerName = getSafeCustomerName(session.lead);
  const qualification = getSessionQualification(session);
  const nextQuestionFocus = getNextQuestionFocus(qualification);

  return [
    safeCustomerName
      ? `Safe customer display name: ${safeCustomerName}`
      : "Safe customer display name: not available. Use a neutral opener like Great or Thanks.",
    `Lead email: ${session.lead.email}`,
    `Lead phone: ${session.lead.phone}`,
    `Requested service/help: ${session.lead.serviceRequired}`,
    `Source page: ${session.sourcePage || "unknown"}`,
    `Qualification stage: ${qualification.stage}`,
    `Known service: ${qualification.service || "unknown"}`,
    `Known business type: ${qualification.businessType || "unknown"}`,
    `Known modules/areas: ${
      qualification.modules.length ? qualification.modules.join(", ") : "unknown"
    }`,
    `Known user count: ${qualification.userCount || "unknown"}`,
    `Known budget: ${qualification.budget || "unknown"}`,
    `Known timeline: ${qualification.timeline || "unknown"}`,
    `Next missing item to ask about: ${nextQuestionFocus}`,
    recentTranscript ? `Recent conversation:\n${recentTranscript}` : "",
    `Latest customer message: ${message}`,
    "Do not ask about a known item again. Reply in 1-3 short sentences and ask exactly one useful next question unless the lead is ready for consultation.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function readGeminiText(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.candidates)) {
    return "";
  }

  const candidate = data.candidates.find(isRecord);
  const content = isRecord(candidate?.content) ? candidate.content : null;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  const text = parts
    .filter(isRecord)
    .map((part) => (typeof part.text === "string" ? part.text : ""))
    .join(" ")
    .trim();

  return sanitizeText(text);
}

async function readGeminiErrorReason(response: Response) {
  try {
    const data: unknown = await response.json();
    if (!isRecord(data) || !isRecord(data.error)) {
      return response.status;
    }

    const details = Array.isArray(data.error.details) ? data.error.details : [];
    const reason = details
      .filter(isRecord)
      .map((detail) => detail.reason)
      .find((value): value is string => typeof value === "string");

    return reason || data.error.status || response.status;
  } catch {
    return response.status;
  }
}

function normalizeReplyForComparison(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isUnsafeGeneratedReply(session: LeadSession, reply: string) {
  const normalizedReply = normalizeReplyForComparison(reply);
  const rawFirstName = session.lead.name.split(/\s+/)[0] || "";
  const unsafeRawFirstName =
    rawFirstName && getNameValidationError(rawFirstName, session.lead.serviceRequired);

  if (
    unsafeRawFirstName &&
    new RegExp(`\\b${rawFirstName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(reply)
  ) {
    return true;
  }

  return session.messages
    .filter((entry) => entry.role === "assistant")
    .some((entry) => {
      const previous = normalizeReplyForComparison(entry.content);
      return (
        previous &&
        (previous === normalizedReply ||
          previous.slice(0, 90) === normalizedReply.slice(0, 90))
      );
    });
}

async function requestGeminiReply(
  key: string,
  keyIndex: number,
  model: string,
  session: LeadSession,
  message: string,
  promptOverride?: string,
): Promise<GeminiRequestResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: promptOverride || buildGeminiUserPrompt(session, message) }],
          },
        ],
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: promptOverride ? 800 : 320,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const status = await readGeminiErrorReason(response);
      console.warn("Gemini request failed", {
        keyIndex,
        model,
        status,
      });
      return {
        reply: "",
        modelNotFound: response.status === 404,
      };
    }

    const data: unknown = await response.json();
    const reply = readGeminiText(data);

    if (!reply || isUnsafeGeneratedReply(session, reply)) {
      console.warn("Gemini request failed", {
        keyIndex,
        model,
        status: reply ? "unsafe_or_repetitive_reply" : "empty_reply",
      });
      return {
        reply: "",
        modelNotFound: false,
      };
    }

    return {
      reply,
    };
  } catch (error) {
    console.warn("Gemini request failed", {
      keyIndex,
      model,
      status: error instanceof Error ? error.name : "request_error",
    });
    return {
      reply: "",
      modelNotFound: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getGeminiSalesReply(
  session: LeadSession,
  message: string,
  promptOverride?: string,
) {
  const keys = getGeminiKeys();
  const models = getGeminiModels();

  if (!keys.length) {
    console.warn("Gemini API keys are not configured. Using fallback reply.");
    return "";
  }

  for (const model of models) {
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const result = await requestGeminiReply(
        key,
        index + 1,
        model,
        session,
        message,
        promptOverride,
      );

      if (result.reply) {
        return result.reply;
      }

      if (result.modelNotFound) {
        break;
      }
    }
  }

  return "";
}

export function getSalesFallbackReply(session: LeadSession, message: string) {
  const qualification = updateLeadQualification(session, message);
  const safeCustomerName = getSafeCustomerName(session.lead);
  const service = getServiceLabel(qualification, session.lead);
  const nextQuestionFocus = getNextQuestionFocus(qualification);
  const thanksPrefix = safeCustomerName ? `Thanks, ${safeCustomerName}.` : "Thanks.";
  const greatPrefix = safeCustomerName ? `Great, ${safeCustomerName}.` : "Great.";
  const lowerMessage = message.toLowerCase();

  if (/\b(price|pricing|cost|quote|charges)\b/.test(lowerMessage) && !qualification.budget) {
    return "Exact pricing depends on scope, users, integrations, and timeline. What budget range should we plan around?";
  }

  if (nextQuestionFocus === "service") {
    return `${greatPrefix} What software or business process do you want help with?`;
  }

  if (nextQuestionFocus === "business_type") {
    if (isOdooService(service)) {
      return "Great, we can help you implement Odoo ERP. What type of business do you run?";
    }

    return `${greatPrefix} We can help with ${service}. What type of business do you run?`;
  }

  if (nextQuestionFocus === "modules") {
    if (isOdooService(service) && /furniture/i.test(qualification.businessType)) {
      return "Perfect. For a furniture business, Odoo can manage sales, inventory, purchases, accounting, CRM, and delivery. Which area do you want to start with first?";
    }

    if (isOdooService(service)) {
      return `Perfect. For a ${qualification.businessType}, which Odoo area should we start with first: sales, inventory, accounting, CRM, or operations?`;
    }

    return `Perfect. For a ${qualification.businessType}, which part should we scope first?`;
  }

  if (nextQuestionFocus === "user_count") {
    return `${thanksPrefix} Around how many users will use the system?`;
  }

  if (nextQuestionFocus === "budget") {
    return `${thanksPrefix} What budget range should we plan around?`;
  }

  if (nextQuestionFocus === "timeline") {
    return `${thanksPrefix} What timeline are you aiming for?`;
  }

  return "Great, we have enough to guide the next step. Would you like our team to schedule a quick consultation or demo?";
}
