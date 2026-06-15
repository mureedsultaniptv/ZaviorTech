"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, MessageCircle, Send, Sparkles } from "lucide-react";
import { ChatMessage, type ChatMessageData } from "@/components/chatbot/ChatMessage";
import { cn } from "@/lib/utils";

const FALLBACK_REPLY =
  "I can only answer questions related to our services, blogs, and company information. Please contact our team for further assistance.";

const WHATSAPP_NUMBER = "971508185948";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Zavior Technologies, I need more assistance with your services.",
);

export const ZAVIOR_CONTACT_URL = "/contact";
export const ZAVIOR_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const INITIAL_MESSAGE: ChatMessageData = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I am the Zavior assistant. Ask me about our services, blogs, or company information. For direct help, use the contact form or WhatsApp buttons below.",
};

type ChatApiResponse = {
  success?: boolean;
  reply?: string;
};

type ChatPanelProps = {
  className?: string;
  headerActions?: ReactNode;
  variant?: "floating" | "page";
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

export function ChatPanel({
  className,
  headerActions,
  variant = "floating",
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animatedMessageId, setAnimatedMessageId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessageData[]>([
    INITIAL_MESSAGE,
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    const focusTimeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(focusTimeout);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = cleanClientMessage(input);

    if (!message || isLoading) {
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
        body: JSON.stringify({ message }),
      });

      const data = (await response.json()) as ChatApiResponse;
      const reply =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : FALLBACK_REPLY;

      setMessages((current) =>
        current.map((item) =>
          item.id === loadingId
            ? {
                id: loadingId,
                role: "assistant",
                content: reply,
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
                content: "Sorry, something went wrong. Please try again.",
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
      aria-label="Zavior assistant chat"
    >
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">
              Zavior Assistant
            </h2>
            <p className="truncate text-xs text-muted-foreground">
              Services, blogs, company info
            </p>
          </div>
        </div>
        {headerActions}
      </header>

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
            <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Contact form</span>
          </Link>
          <a
            href={ZAVIOR_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-[8px] bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
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
          maxLength={500}
          autoComplete="off"
          placeholder="Ask Zavior..."
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
    </section>
  );
}
