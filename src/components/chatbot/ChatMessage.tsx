"use client";

import { useEffect, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatRecommendedLink = {
  title: string;
  url: string;
  type: "service" | "project" | "company" | "product";
};

export type ChatMessageData = {
  id: string;
  role: "assistant" | "user";
  content: string;
  loading?: boolean;
  recommendedLinks?: ChatRecommendedLink[];
  whatsappUrl?: string;
  leadIntent?: boolean;
};

type ChatMessageProps = {
  message: ChatMessageData;
  animate?: boolean;
};

function TypingDots() {
  return (
    <span
      className="flex items-center gap-1 py-1"
      aria-label="Assistant is typing"
      role="status"
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1.5 rounded-full bg-current opacity-70 motion-safe:animate-bounce"
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
    </span>
  );
}

export function ChatMessage({ message, animate = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const shouldAnimate = animate && !isUser && !message.loading;
  const [animatedText, setAnimatedText] = useState("");
  const visibleText = shouldAnimate ? animatedText : message.content;
  const showActions =
    !isUser &&
    !message.loading &&
    (Boolean(message.recommendedLinks?.length) || Boolean(message.whatsappUrl));

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const timeoutId = window.setTimeout(() => {
        setAnimatedText(message.content);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    let index = 0;

    const intervalId = window.setInterval(() => {
      index = Math.min(index + 4, message.content.length);
      setAnimatedText(message.content.slice(0, index));

      if (index >= message.content.length) {
        window.clearInterval(intervalId);
      }
    }, 14);

    return () => window.clearInterval(intervalId);
  }, [message.content, message.id, shouldAnimate]);

  return (
    <article className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex max-w-[86%] flex-col gap-2",
          isUser && "items-end",
        )}
      >
        <div
          className={cn(
            "rounded-[8px] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
            "break-words [overflow-wrap:anywhere]",
            isUser
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-card-foreground",
          )}
        >
          {message.loading ? (
            <TypingDots />
          ) : (
            <p className="whitespace-pre-wrap">{visibleText}</p>
          )}
        </div>

        {showActions ? (
          <div className="w-full space-y-2">
            {message.recommendedLinks?.length ? (
              <div className="grid gap-2">
                {message.recommendedLinks.map((link) => (
                  <a
                    key={`${link.type}-${link.url}`}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-3 rounded-[8px] border border-border bg-background px-3 py-2 text-xs text-foreground transition hover:border-primary/50 hover:bg-muted"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {link.title}
                      </span>
                      <span className="text-muted-foreground capitalize">
                        {link.type}
                      </span>
                    </span>
                    <ExternalLink
                      className="size-3.5 shrink-0 text-muted-foreground transition group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            ) : null}

            {message.whatsappUrl ? (
              <a
                href={message.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <MessageCircle className="size-3.5" aria-hidden="true" />
                Talk to customer care on WhatsApp
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
