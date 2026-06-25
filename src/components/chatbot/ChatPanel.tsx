"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import {
  ChatMessage,
  type ChatMessageData,
  type ChatRecommendedLink,
} from "@/components/chatbot/ChatMessage";
import { cn } from "@/lib/utils";

const CHAT_STORAGE_KEY = "zavior-lead-chat-session";
const MAX_CHAT_MESSAGE_LENGTH = 500;
const FALLBACK_REPLY =
  "Thanks for your interest. Our team has received your request and will contact you shortly. Please share any urgent details on WhatsApp.";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971508185948";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Zavior, I need software for my business",
);

export const ZAVIOR_CONTACT_URL = "/contact";
export const ZAVIOR_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const SERVICE_OPTIONS = [
  "Odoo ERP",
  "ERP customization",
  "Mobile app",
  "Website",
  "Ecommerce",
  "AI chatbot",
  "Automation",
  "CRM",
  "Dashboard",
  "Custom software",
  "Other",
];

const FAKE_NAMES = new Set([
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
  "budget",
  "category",
  "service",
  "services",
  "price",
  "pricing",
  "quote",
  "odoo",
  "erp",
  "crm",
  "website",
  "ecommerce",
  "mobile",
  "app",
  "chatbot",
  "automation",
  "software",
  "sales",
  "inventory",
]);

const FAKE_EMAILS = new Set([
  "test@test.com",
  "demo@demo.com",
  "abc@gmail.com",
  "a@a.com",
]);

type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  serviceRequired: string;
  website: string;
};

type LeadSessionData = {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  serviceRequired: string;
  sourcePage: string;
};

type LeadErrors = Partial<Record<keyof LeadFormData | "form", string>>;

type LeadApiResponse = {
  success?: boolean;
  sessionId?: string;
  lead?: Partial<LeadSessionData>;
  message?: string;
};

type ChatApiResponse = {
  success?: boolean;
  reply?: string;
  message?: string;
  recommendedLinks?: ChatRecommendedLink[];
  whatsappUrl?: string;
  leadIntent?: boolean;
  sessionId?: string;
};

type ChatPanelProps = {
  className?: string;
  headerActions?: ReactNode;
  variant?: "floating" | "page";
};

const initialLeadForm: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  serviceRequired: "",
  website: "",
};

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function cleanClientMessage(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeFakeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getCurrentSourcePage() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.href;
}

function getSafeFirstName(name: string, serviceRequired: string) {
  const normalizedName = normalizeFakeValue(name);
  const normalizedService = normalizeFakeValue(serviceRequired);
  const words = name
    .split(/\s+/)
    .map((word) => normalizeFakeValue(word))
    .filter(Boolean);
  const meaningfulName = name.replace(/[^\p{L}\p{N}]/gu, "");

  if (
    !name ||
    normalizedName === normalizedService ||
    FAKE_NAMES.has(normalizedName) ||
    FAKE_NAMES.has(words[0] ?? "") ||
    words.every((word) => FAKE_NAMES.has(word)) ||
    meaningfulName.length < 3
  ) {
    return "";
  }

  return name.split(/\s+/)[0] || "";
}

function createWelcomeMessage(lead: LeadSessionData): ChatMessageData {
  const safeFirstName = getSafeFirstName(lead.name, lead.serviceRequired);

  return {
    id: "welcome",
    role: "assistant",
    content: safeFirstName
      ? `Hi ${safeFirstName}, thanks for reaching out about ${lead.serviceRequired}. What would you like to achieve first?`
      : `Hi, thanks for reaching out about ${lead.serviceRequired}. What would you like to achieve first?`,
  };
}

function getLeadHeaderLabel(lead: LeadSessionData) {
  const safeFirstName = getSafeFirstName(lead.name, lead.serviceRequired);
  return safeFirstName
    ? `${safeFirstName} - ${lead.serviceRequired}`
    : `Lead captured - ${lead.serviceRequired}`;
}

function isStoredLeadSession(value: unknown): value is LeadSessionData {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<LeadSessionData>;
  return Boolean(
    candidate.sessionId &&
      candidate.name &&
      candidate.email &&
      candidate.phone &&
      candidate.serviceRequired,
  );
}

function getLeadValidationErrors(form: LeadFormData) {
  const errors: LeadErrors = {};
  const name = cleanClientMessage(form.name);
  const email = cleanClientMessage(form.email).toLowerCase();
  const phone = cleanClientMessage(form.phone);
  const serviceRequired = cleanClientMessage(form.serviceRequired);
  const normalizedName = normalizeFakeValue(name);
  const normalizedService = normalizeFakeValue(serviceRequired);
  const words = name
    .split(/\s+/)
    .map((word) => normalizeFakeValue(word))
    .filter(Boolean);
  const meaningfulName = name.replace(/[^\p{L}\p{N}]/gu, "");
  const letterCount = name.match(/\p{L}/gu)?.length ?? 0;

  if (
    !name ||
    normalizedName === normalizedService ||
    FAKE_NAMES.has(normalizedName) ||
    FAKE_NAMES.has(words[0] ?? "") ||
    words.every((word) => FAKE_NAMES.has(word)) ||
    meaningfulName.length < 3 ||
    letterCount < 2 ||
    /^(.)\1{2,}$/iu.test(meaningfulName)
  ) {
    errors.name = "Enter a real full name or business name.";
  }

  const [localPart = "", domain = ""] = email.split("@");
  const isFakeEmail =
    FAKE_EMAILS.has(email) ||
    ["example.com", "example.org", "example.net"].includes(domain) ||
    (localPart === domain.split(".")[0] && FAKE_NAMES.has(localPart));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isFakeEmail) {
    errors.email = "Enter a valid business email address.";
  }

  const compactPhone = phone.replace(/[\s().-]/g, "");
  const phoneDigits = phone.replace(/\D/g, "");
  const isInternational = /^\+[1-9]\d{7,14}$/.test(compactPhone);
  const isPakistanMobile = /^(?:0092|92|0)?3\d{9}$/.test(phoneDigits);
  const isUaeMobile = /^(?:00971|971|0)?5\d{8}$/.test(phoneDigits);
  const repeatedDigits = /^(\d)\1{6,}$/.test(phoneDigits);

  if (
    !phone ||
    repeatedDigits ||
    (!isInternational && !isPakistanMobile && !isUaeMobile)
  ) {
    errors.phone = "Use an international, Pakistan, or UAE phone number.";
  }

  if (!serviceRequired) {
    errors.serviceRequired = "Tell us what service or help you need.";
  }

  return errors;
}

function storeLeadSession(lead: LeadSessionData) {
  try {
    window.sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // Session storage is a convenience only; the server session remains primary.
  }
}

function readStoredLeadSession() {
  try {
    const stored = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);
    return isStoredLeadSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function ChatPanel({
  className,
  headerActions,
  variant = "floating",
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [leadForm, setLeadForm] = useState<LeadFormData>(initialLeadForm);
  const [leadErrors, setLeadErrors] = useState<LeadErrors>({});
  const [leadSession, setLeadSession] = useState<LeadSessionData | null>(null);
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedMessageId, setAnimatedMessageId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedLead = readStoredLeadSession();

    if (storedLead) {
      setLeadSession(storedLead);
      setMessages([createWelcomeMessage(storedLead)]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    const focusTimeout = window.setTimeout(() => {
      if (leadSession) {
        inputRef.current?.focus();
      } else {
        nameRef.current?.focus();
      }
    }, 120);

    return () => window.clearTimeout(focusTimeout);
  }, [leadSession]);

  function handleLeadFieldChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setLeadForm((current) => ({
      ...current,
      [name]: value,
    }));
    setLeadErrors((current) => ({
      ...current,
      [name]: undefined,
      form: undefined,
    }));
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLeadSubmitting) {
      return;
    }

    const errors = getLeadValidationErrors(leadForm);
    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    setIsLeadSubmitting(true);
    setLeadErrors({});

    const payload = {
      name: cleanClientMessage(leadForm.name),
      email: cleanClientMessage(leadForm.email).toLowerCase(),
      phone: cleanClientMessage(leadForm.phone),
      serviceRequired: cleanClientMessage(leadForm.serviceRequired),
      sourcePage: getCurrentSourcePage(),
      website: leadForm.website,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as LeadApiResponse;

      if (!response.ok || !data.success || !data.sessionId) {
        setLeadErrors({
          form:
            data.message ||
            "Please check your details and try starting the chat again.",
        });
        return;
      }

      const nextLead: LeadSessionData = {
        sessionId: data.sessionId,
        name: data.lead?.name || payload.name,
        email: data.lead?.email || payload.email,
        phone: data.lead?.phone || payload.phone,
        serviceRequired:
          data.lead?.serviceRequired || payload.serviceRequired,
        sourcePage: data.lead?.sourcePage || payload.sourcePage,
      };

      setLeadSession(nextLead);
      setMessages([createWelcomeMessage(nextLead)]);
      storeLeadSession(nextLead);
    } catch {
      setLeadErrors({
        form: "We could not start the chat. Please try again.",
      });
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = cleanClientMessage(input);

    if (!message || isLoading || !leadSession) {
      return;
    }

    setInput("");
    setIsLoading(true);
    setAnimatedMessageId(null);

    const loadingId = createMessageId();
    const userMessage: ChatMessageData = {
      id: createMessageId(),
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: loadingId,
        role: "assistant",
        content: "",
        loading: true,
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: leadSession.sessionId,
          lead: {
            name: leadSession.name,
            email: leadSession.email,
            phone: leadSession.phone,
            serviceRequired: leadSession.serviceRequired,
            sourcePage: leadSession.sourcePage,
          },
          message,
        }),
      });

      const data = (await response.json()) as ChatApiResponse;
      const reply =
        typeof data.message === "string" && data.message.trim()
          ? data.message.trim()
          : typeof data.reply === "string" && data.reply.trim()
            ? data.reply.trim()
          : FALLBACK_REPLY;

      if (data.sessionId && data.sessionId !== leadSession.sessionId) {
        const nextLead = {
          ...leadSession,
          sessionId: data.sessionId,
        };
        setLeadSession(nextLead);
        storeLeadSession(nextLead);
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === loadingId
            ? {
                id: loadingId,
                role: "assistant",
                content: reply,
                recommendedLinks: Array.isArray(data.recommendedLinks)
                  ? data.recommendedLinks
                  : [],
                whatsappUrl:
                  typeof data.whatsappUrl === "string"
                    ? data.whatsappUrl
                    : undefined,
                leadIntent: Boolean(data.leadIntent),
              }
            : item,
        ),
      );
      setAnimatedMessageId(loadingId);
    } catch {
      setMessages((current) =>
        current.map((item) =>
          item.id === loadingId
            ? {
                id: loadingId,
                role: "assistant",
                content: FALLBACK_REPLY,
              }
            : item,
        ),
      );
      setAnimatedMessageId(loadingId);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-[8px] border border-border bg-background text-foreground shadow-2xl shadow-black/20",
        variant === "page" && "shadow-lg",
        className,
      )}
      aria-label="Zavior sales assistant chat"
    >
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">
              Zavior Sales Assistant
            </h2>
            <p className="truncate text-xs text-muted-foreground">
              {leadSession
                ? getLeadHeaderLabel(leadSession)
                : "Start with your contact details"}
            </p>
          </div>
        </div>
        {headerActions}
      </header>

      {!leadSession ? (
        <form
          onSubmit={handleLeadSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
        >
          <div className="rounded-[8px] border border-border bg-card p-4">
            <div className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-primary/10 text-primary">
                <CheckCircle2 className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">
                  Tell us how we can help
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Share your details so our team can route your request and keep
                  the conversation connected.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <div>
                <label
                  htmlFor="zavior-lead-name"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Full name
                </label>
                <input
                  ref={nameRef}
                  id="zavior-lead-name"
                  name="name"
                  value={leadForm.name}
                  onChange={handleLeadFieldChange}
                  autoComplete="name"
                  placeholder="Your name or business name"
                  aria-invalid={Boolean(leadErrors.name)}
                  aria-describedby={
                    leadErrors.name ? "zavior-lead-name-error" : undefined
                  }
                  className="h-10 w-full rounded-[8px] border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  disabled={isLeadSubmitting}
                />
                {leadErrors.name ? (
                  <p
                    id="zavior-lead-name-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {leadErrors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="zavior-lead-email"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Email address
                </label>
                <input
                  id="zavior-lead-email"
                  name="email"
                  type="email"
                  value={leadForm.email}
                  onChange={handleLeadFieldChange}
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(leadErrors.email)}
                  aria-describedby={
                    leadErrors.email ? "zavior-lead-email-error" : undefined
                  }
                  className="h-10 w-full rounded-[8px] border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  disabled={isLeadSubmitting}
                />
                {leadErrors.email ? (
                  <p
                    id="zavior-lead-email-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {leadErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="zavior-lead-phone"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Phone or WhatsApp
                </label>
                <input
                  id="zavior-lead-phone"
                  name="phone"
                  value={leadForm.phone}
                  onChange={handleLeadFieldChange}
                  autoComplete="tel"
                  placeholder="+971 50 123 4567"
                  aria-invalid={Boolean(leadErrors.phone)}
                  aria-describedby={
                    leadErrors.phone ? "zavior-lead-phone-error" : undefined
                  }
                  className="h-10 w-full rounded-[8px] border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  disabled={isLeadSubmitting}
                />
                {leadErrors.phone ? (
                  <p
                    id="zavior-lead-phone-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {leadErrors.phone}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="zavior-lead-service"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Service/help required
                </label>
                <input
                  id="zavior-lead-service"
                  name="serviceRequired"
                  value={leadForm.serviceRequired}
                  onChange={handleLeadFieldChange}
                  list="zavior-lead-services"
                  placeholder="Odoo, ERP, website, automation..."
                  aria-invalid={Boolean(leadErrors.serviceRequired)}
                  aria-describedby={
                    leadErrors.serviceRequired
                      ? "zavior-lead-service-error"
                      : undefined
                  }
                  className="h-10 w-full rounded-[8px] border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  disabled={isLeadSubmitting}
                />
                <datalist id="zavior-lead-services">
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service} />
                  ))}
                </datalist>
                {leadErrors.serviceRequired ? (
                  <p
                    id="zavior-lead-service-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {leadErrors.serviceRequired}
                  </p>
                ) : null}
              </div>

              <input
                type="text"
                name="website"
                value={leadForm.website}
                onChange={handleLeadFieldChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>

            {leadErrors.form ? (
              <p className="mt-3 rounded-[8px] border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {leadErrors.form}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLeadSubmitting}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60"
            >
              {isLeadSubmitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <MessageCircle className="size-4" aria-hidden="true" />
              )}
              Start chat
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                animate={animatedMessageId === message.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border bg-card px-3 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={ZAVIOR_CONTACT_URL}
                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-[8px] border border-border bg-background px-3 text-xs font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">Contact form</span>
              </Link>
              <a
                href={ZAVIOR_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-[8px] bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <MessageCircle
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-card p-3"
          >
            <label className="sr-only" htmlFor="zavior-chat-message">
              Message
            </label>
            <input
              ref={inputRef}
              id="zavior-chat-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_CHAT_MESSAGE_LENGTH}
              autoComplete="off"
              placeholder="Message Zavior..."
              className="h-10 min-w-0 flex-1 rounded-[8px] border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </>
      )}
    </section>
  );
}
