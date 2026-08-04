"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { ChatIntakeForm } from "@/components/chatbot/ChatIntakeForm";
import { cn } from "@/lib/utils";

type ChatWidgetProps = {
  avoidWhatsApp?: boolean;
  defaultOpen?: boolean;
};

export function ChatWidget({
  avoidWhatsApp = false,
  defaultOpen = false,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [sessionId, setSessionId] = useState<string | null>(null);

  function toggleChat() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) window.dataLayer?.push({ event: "chat_opened" });
  }

  return (
    <div
      className={cn(
        "fixed right-4 z-[70] flex items-end sm:right-6",
        avoidWhatsApp ? "bottom-24 sm:bottom-24" : "bottom-4 sm:bottom-6",
      )}
    >
      <div className="flex flex-col items-end gap-3">
        {isOpen ? (
          sessionId ? (
            <ChatPanel
              initialSessionId={sessionId}
              onReset={() => setSessionId(null)}
              className={cn(
                "h-[min(620px,calc(100dvh-8rem))] w-[calc(100vw-2rem)]",
                "sm:w-[390px]",
              )}
              headerActions={
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  title="Close chat"
                >
                  <X className="size-4" aria-hidden="true" />
                  <span className="sr-only">Close chat</span>
                </button>
              }
            />
          ) : (
            <ChatIntakeForm
              compact
              onAiReady={setSessionId}
              className={cn(
                "h-[min(650px,calc(100dvh-8rem))] w-[calc(100vw-2rem)]",
                "sm:w-[390px]",
              )}
              headerActions={
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                title="Close chat"
              >
                <X className="size-4" aria-hidden="true" />
                <span className="sr-only">Close chat</span>
              </button>
              }
            />
          )
        ) : null}

        <button
          type="button"
          onClick={toggleChat}
          className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          title={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <MessageCircle className="size-6" aria-hidden="true" />
          )}
          <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
        </button>
      </div>
    </div>
  );
}
