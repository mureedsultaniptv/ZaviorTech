"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ExternalLink, Loader2, MessageCircle, RotateCcw, Send, Sparkles } from "lucide-react";
import { ChatMessage, type ChatMessageData } from "@/components/chatbot/ChatMessage";
import { cn } from "@/lib/utils";

const SESSION_STORAGE_KEY = "zavior-chat-session-id";
const MAX_MESSAGE_LENGTH = 1000;
const DEFAULT_SESSION_LIMIT = 12;

type ChatPanelProps = {
  className?: string;
  headerActions?: ReactNode;
  variant?: "floating" | "page";
  initialSessionId?: string;
  onReset?: () => void;
};

type ChatApiResponse = {
  success?: boolean;
  message?: string;
  reply?: string;
  sessionId?: string | null;
  messages?: Array<{ role: "user" | "assistant"; content: string; timestamp?: string }>;
  remainingMessages?: number;
  showWhatsApp?: boolean;
  whatsappUrl?: string | null;
  cooldownSeconds?: number;
  limits?: { session?: number; cooldown?: number };
  actions?: ChatMessageData["actions"];
};

const quickStarts = [
  "I need an ERP or Odoo solution",
  "I need a website or web app",
  "I need AI automation",
  "I need a mobile app",
  "I want to discuss a project",
];

const welcomeMessage: ChatMessageData = {
  id: "welcome",
  role: "assistant",
  content: "Hi — welcome to Zavior. What are you looking to improve or build?",
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  try {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const next = createId();
    window.localStorage.setItem(SESSION_STORAGE_KEY, next);
    return next;
  } catch {
    return createId();
  }
}

function saveSessionId(sessionId: string) {
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch {
    // The server remains authoritative when storage is unavailable.
  }
}

function cleanMessage(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function fromApiMessages(messages: ChatApiResponse["messages"]): ChatMessageData[] {
  return (messages || []).map((message, index) => ({
    id: `${message.timestamp || "message"}-${index}`,
    role: message.role,
    content: message.content,
  }));
}

export function ChatPanel({
  className,
  headerActions,
  variant = "floating",
  initialSessionId,
  onReset,
}: ChatPanelProps) {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [animatedMessageId, setAnimatedMessageId] = useState<string | null>(null);
  const [remainingMessages, setRemainingMessages] = useState(DEFAULT_SESSION_LIMIT);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const cooldownRemaining = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));

  useEffect(() => {
    const id = initialSessionId || getSessionId();
    if (initialSessionId) saveSessionId(initialSessionId);
    setSessionId(id);
    fetch(`/api/chat?sessionId=${encodeURIComponent(id)}`, { cache: "no-store" })
      .then((response) => response.json() as Promise<ChatApiResponse>)
      .then((data) => {
        if (data.sessionId && data.sessionId !== id) {
          saveSessionId(data.sessionId);
          setSessionId(data.sessionId);
        }
        const restored = fromApiMessages(data.messages);
        if (restored.length) setMessages(restored);
        if (typeof data.remainingMessages === "number") setRemainingMessages(data.remainingMessages);
        setShowWhatsApp(Boolean(data.showWhatsApp));
        setWhatsappUrl(data.whatsappUrl || null);
      })
      .catch(() => undefined)
      .finally(() => setIsReady(true));
  }, [initialSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  useEffect(() => {
    if (isReady && !isLoading) inputRef.current?.focus();
  }, [isReady, isLoading]);

  function addAssistantMessage(content: string, actions?: Partial<ChatMessageData>) {
    const id = createId();
    setMessages((current) => [...current, { id, role: "assistant", content, ...actions }]);
    setAnimatedMessageId(id);
  }

  function resetConversation() {
    if (onReset) {
      try {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // The parent still resets the gated page experience.
      }
      onReset();
      return;
    }
    const nextSessionId = createId();
    saveSessionId(nextSessionId);
    setSessionId(nextSessionId);
    setMessages([welcomeMessage]);
    setInput("");
    setRemainingMessages(DEFAULT_SESSION_LIMIT);
    setShowWhatsApp(false);
    setWhatsappUrl(null);
    setCooldownUntil(0);
    setAnimatedMessageId(null);
    window.dataLayer?.push({ event: "chat_reset" });
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function sendMessage(rawMessage: string) {
    const message = cleanMessage(rawMessage);
    if (!message || !sessionId || isLoading || cooldownRemaining > 0 || remainingMessages <= 0) return;

    setInput("");
    setIsLoading(true);
    setAnimatedMessageId(null);
    const loadingId = createId();
    setMessages((current) => [
      ...current,
      { id: createId(), role: "user", content: message },
      { id: loadingId, role: "assistant", content: "", loading: true },
    ]);

    try {
      window.dataLayer?.push({ event: "chat_message_sent" });
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message, sourcePage: window.location.pathname }),
      });
      const data = (await response.json()) as ChatApiResponse;
      const reply = cleanMessage(data.message || data.reply || "");
      setMessages((current) => current.filter((item) => item.id !== loadingId));
      if (reply) {
        addAssistantMessage(reply, {
          actions: data.actions,
        });
      }
      if (!response.ok) {
        if (!reply) addAssistantMessage("I’m sorry, I couldn’t process that just now. You can continue with our team through the contact page.");
        if (response.status === 429 && typeof data.cooldownSeconds === "number") {
          setCooldownUntil(Date.now() + data.cooldownSeconds * 1000);
        }
        return;
      }
      if (data.sessionId) {
        setSessionId(data.sessionId);
        saveSessionId(data.sessionId);
      }
      if (typeof data.remainingMessages === "number") setRemainingMessages(data.remainingMessages);
      setShowWhatsApp(Boolean(data.showWhatsApp));
      setWhatsappUrl(data.whatsappUrl || null);
      setCooldownUntil(Date.now() + (data.cooldownSeconds || 10) * 1000);
    } catch {
      setMessages((current) => current.filter((item) => item.id !== loadingId));
      addAssistantMessage("Sorry, I’m having a little trouble responding right now. You can continue with our team through the contact page.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  const isAtLimit = remainingMessages <= 0;
  const showQuickStarts = messages.length <= 1 && isReady;

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
            <h2 className="truncate text-sm font-semibold">Zavior Consultant</h2>
            <p className="truncate text-xs text-muted-foreground">A practical starting point for your project</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={resetConversation}
            disabled={isLoading}
            className="inline-flex size-9 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            title="Start a new conversation"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="sr-only">Start a new conversation</span>
          </button>
          {headerActions}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} animate={animatedMessageId === message.id} />
        ))}
        {showQuickStarts ? (
          <div className="grid gap-2 pt-1 sm:grid-cols-2">
            {quickStarts.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => void sendMessage(option)}
                className="rounded-[8px] border border-border bg-card px-3 py-2 text-left text-xs text-foreground transition hover:border-primary/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      {showWhatsApp && whatsappUrl ? (
        <div className="border-t border-border bg-card px-3 pt-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.dataLayer?.push({ event: "whatsapp_clicked" })}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Continue on WhatsApp
          </a>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-border bg-card px-3 pt-3 text-[11px] text-muted-foreground">
        <Link
          href="/contact?chatbot=true"
          onClick={() => window.dataLayer?.push({ event: "contact_form_clicked" })}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ExternalLink className="size-3" aria-hidden="true" /> Contact form
        </Link>
        <span>{isAtLimit ? "Continue with our project team" : "Concise project guidance"}</span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2 bg-card p-3">
        <label className="sr-only" htmlFor="zavior-chat-message">Message</label>
        <textarea
          ref={inputRef}
          id="zavior-chat-message"
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          onKeyDown={handleKeyDown}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={1}
          autoComplete="off"
          placeholder={cooldownRemaining ? `Please wait ${cooldownRemaining}s...` : "Tell me what you need..."}
          className="max-h-28 min-h-10 min-w-0 flex-1 resize-none rounded-[8px] border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!isReady || isLoading || isAtLimit || cooldownRemaining > 0}
        />
        <button
          type="submit"
          disabled={!isReady || isLoading || isAtLimit || cooldownRemaining > 0 || !input.trim()}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Send message"
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          <span className="sr-only">Send message</span>
        </button>
      </form>
    </section>
  );
}
