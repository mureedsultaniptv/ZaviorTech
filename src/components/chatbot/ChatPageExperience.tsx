"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, MessageSquareText } from "lucide-react";
import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappUrl } from "@/lib/site";
import { consultationServices, otherServiceValue } from "@/lib/consultation";
import { submitConsultantIntake } from "@/lib/consultant-intake";

type IntakeResponse = {
  success?: boolean;
  message?: string;
  sessionId?: string;
  route?: "ai" | "whatsapp";
  whatsappUrl?: string | null;
};

const INTAKE_SESSION_STORAGE_KEY = "zavior-chat-intake-session-id";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ChatPageExperience() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");

  useEffect(() => {
    try {
      setSessionId(window.localStorage.getItem(INTAKE_SESSION_STORAGE_KEY));
    } catch {
      // The form remains available when browser storage is disabled.
    } finally {
      setIsReady(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const proposedSessionId = createSessionId();

    try {
      const consultation = await submitConsultantIntake({
        name: data.name, email: data.email, phone: data.phone, service,
        otherService, description: data.description, website: data.website,
        sourcePage: window.location.pathname,
      });

      const response = await fetch("/api/chat/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          serviceRequired: service === otherServiceValue ? otherService : service,
          odooLeadId: consultation.submissionId,
          sessionId: proposedSessionId,
          sourcePage: window.location.pathname,
        }),
      });
      const result = (await response.json()) as IntakeResponse;
      if (!response.ok || !result.success || !result.sessionId) {
        throw new Error(result.message || "We couldn’t start the chat.");
      }

      if (result.route === "whatsapp") {
        if (!result.whatsappUrl) {
          throw new Error("WhatsApp is unavailable right now. Please use the contact form.");
        }
        window.location.assign(result.whatsappUrl);
        return;
      }

      setSessionId(result.sessionId);
      try {
        window.localStorage.setItem(INTAKE_SESSION_STORAGE_KEY, result.sessionId);
      } catch {
        // The active React state still keeps the current chat available.
      }
      window.dataLayer?.push({ event: "chat_intake_submitted" });
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t start the chat. Please try again.",
      );
      return;
    }

    setStatus("idle");
  }

  if (!isReady) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-border bg-card">
        <Loader2 className="size-5 animate-spin text-primary" aria-label="Loading chat" />
      </div>
    );
  }

  if (sessionId) {
    return (
      <ChatPanel
        variant="page"
        initialSessionId={sessionId}
        onReset={() => {
          try {
            window.localStorage.removeItem(INTAKE_SESSION_STORAGE_KEY);
          } catch {
            // React state still resets the experience.
          }
          setSessionId(null);
          setStatus("idle");
          setError("");
        }}
        className="h-[min(720px,calc(100dvh-13rem))] min-h-[420px] w-full sm:min-h-[520px]"
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground sm:p-8">
          <div>
            <span className="mb-5 inline-flex size-11 items-center justify-center rounded-lg bg-white/15">
              <MessageSquareText className="size-5" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">
              Start with a little context
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              Share your contact details and the topic you want to discuss. Your
              conversation will be stored with this enquiry so our team has the
              complete context if you choose to continue.
            </p>
          </div>
          <p className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/75">
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            Submitted securely through the Zavior server.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chat-customer-name">Full name</Label>
              <Input
                id="chat-customer-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chat-customer-email">Email address</Label>
              <Input
                id="chat-customer-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={160}
                required
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-customer-phone">Phone number</Label>
            <Input
              id="chat-customer-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              required
              placeholder="+971 50 000 0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-customer-service">Service needed</Label>
            <select id="chat-customer-service" value={service} onChange={(event) => setService(event.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <option value="">Select a service</option>
              {consultationServices.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              <option value={otherServiceValue}>Other Services</option>
            </select>
          </div>

          {service === otherServiceValue ? <div className="space-y-2"><Label htmlFor="chat-customer-other-service">Please specify the service</Label><Input id="chat-customer-other-service" value={otherService} onChange={(event) => setOtherService(event.target.value)} maxLength={160} required /></div> : null}

          <div className="space-y-2">
            <Label htmlFor="chat-customer-description">Project description</Label>
            <Textarea
              id="chat-customer-description"
              name="description"
              rows={4}
              maxLength={1000}
              required
              placeholder="Describe what you need, the current problem, and your expected outcome"
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <Label htmlFor="chat-customer-website">Website</Label>
            <Input
              id="chat-customer-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "error" ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Starting secure chat…
              </>
            ) : (
              <>
                Continue to chat
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full border-green-600/40 text-green-700 hover:bg-green-600 hover:text-white dark:text-green-400">
            <a
              href={whatsappUrl("Hi Zavior, I would like to start a consultation with your team.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.dataLayer?.push({ event: "whatsapp_clicked", source: "chat_page" })}
            >
              <WhatsAppIcon className="size-5" /> Contact on WhatsApp
            </a>
          </Button>
        </form>
      </div>
    </section>
  );
}
