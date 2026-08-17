"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ChatWidget = dynamic(
  () => import("@/components/chatbot/ChatWidget").then((module) => module.ChatWidget),
  { ssr: false },
);

export function DeferredChatWidget() {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return <ChatWidget defaultOpen />;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex items-end sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => setActivated(true)}
        className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        title="Open chat"
        aria-label="Open chat"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>
    </div>
  );
}
