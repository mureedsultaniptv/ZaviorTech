"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type ChatMessageData = {
  id: string;
  role: "assistant" | "user";
  content: string;
  loading?: boolean;
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
          "max-w-[84%] rounded-[8px] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
          "break-words [overflow-wrap:anywhere]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-card-foreground",
        )}
      >
        {message.loading ? (
          <TypingDots />
        ) : (
          <p className="whitespace-pre-wrap">
            {shouldAnimate ? animatedText : message.content}
          </p>
        )}
      </div>
    </article>
  );
}
