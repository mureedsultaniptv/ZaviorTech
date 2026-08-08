"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

type IntakeResponse = {
  success?: boolean;
  message?: string;
  sessionId?: string;
  route?: "ai" | "whatsapp";
  whatsappUrl?: string | null;
};

type ChatIntakeFormProps = {
  className?: string;
  compact?: boolean;
  headerActions?: ReactNode;
  onAiReady: (sessionId: string) => void;
};

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatIntakeForm({
  className,
  compact = false,
  headerActions,
  onAiReady,
}: ChatIntakeFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/chat/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sessionId: createSessionId(),
          sourcePage: window.location.pathname,
        }),
      });
      const result = (await response.json()) as IntakeResponse;
      if (!response.ok || !result.success) {
        throw new Error(result.message || "We couldn’t start your consultation.");
      }

      window.dataLayer?.push({
        event: "chat_intake_submitted",
        chat_route: result.route,
      });

      if (result.route === "whatsapp") {
        if (!result.whatsappUrl) {
          throw new Error("WhatsApp is unavailable right now. Please use the contact form.");
        }
        window.location.assign(result.whatsappUrl);
        return;
      }

      if (!result.sessionId) {
        throw new Error("We couldn’t create your chat session.");
      }
      onAiReady(result.sessionId);
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t start your consultation. Please try again.",
      );
      return;
    }

    setStatus("idle");
  }

  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-background text-foreground shadow-2xl shadow-black/20",
        compact ? "rounded-[8px]" : "rounded-xl",
        className,
      )}
      aria-label="Start a Zavior consultation"
    >
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <MessageSquareText className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">Zavior Consultant</h2>
            <p className="truncate text-xs text-muted-foreground">Tell us what you want to discuss</p>
          </div>
        </div>
        {headerActions}
      </header>

      <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Complete these details before starting. If our AI consultant is unavailable,
          we’ll continue your enquiry directly on WhatsApp.
        </p>

        <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
          <div className="space-y-1.5">
            <Label htmlFor={compact ? "widget-chat-name" : "page-chat-name"}>Full name</Label>
            <Input id={compact ? "widget-chat-name" : "page-chat-name"} name="name" autoComplete="name" maxLength={120} required placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={compact ? "widget-chat-email" : "page-chat-email"}>Email address</Label>
            <Input id={compact ? "widget-chat-email" : "page-chat-email"} name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@company.com" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={compact ? "widget-chat-phone" : "page-chat-phone"}>Phone number</Label>
          <Input id={compact ? "widget-chat-phone" : "page-chat-phone"} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required placeholder="+971 50 000 0000" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={compact ? "widget-chat-subject" : "page-chat-subject"}>Subject</Label>
          <Input id={compact ? "widget-chat-subject" : "page-chat-subject"} name="subject" maxLength={180} required placeholder="Website, ERP, AI automation…" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={compact ? "widget-chat-description" : "page-chat-description"}>Project description</Label>
          <Textarea id={compact ? "widget-chat-description" : "page-chat-description"} name="description" rows={compact ? 3 : 4} maxLength={1000} required placeholder="Describe what you need, the current problem, and your expected outcome" />
        </div>

        <div className="hidden" aria-hidden="true">
          <Label htmlFor={compact ? "widget-chat-website" : "page-chat-website"}>Website</Label>
          <Input id={compact ? "widget-chat-website" : "page-chat-website"} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button asChild className="w-full bg-green-600 text-white hover:bg-green-700">
          <a
            href={whatsappUrl("Hi Zavior, I would like to start a consultation with your team.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.dataLayer?.push({ event: "whatsapp_clicked", source: compact ? "consultant_widget" : "chat_page" })}
          >
            <WhatsAppIcon className="size-5" /> Contact on WhatsApp
          </a>
        </Button>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground" aria-hidden="true">
          <span className="h-px flex-1 bg-border" /> or start AI chat <span className="h-px flex-1 bg-border" />
        </div>

        <Button type="submit" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <><Loader2 className="animate-spin" aria-hidden="true" /> Checking consultant availability…</>
          ) : (
            <>Start consultation <ArrowRight aria-hidden="true" /></>
          )}
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <LockKeyhole className="size-3" aria-hidden="true" /> Your details are submitted securely.
        </p>
      </form>
    </section>
  );
}
