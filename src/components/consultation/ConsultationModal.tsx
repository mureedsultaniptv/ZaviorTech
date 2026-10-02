"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "@/lib/light-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  consultationServices,
  getConsultationService,
  otherServiceValue,
  type ConsultationQuestion,
} from "@/lib/consultation";

type ConsultationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Details = {
  name: string;
  email: string;
  phone: string;
  service: string;
  otherService: string;
  projectDescription: string;
};

const emptyDetails: Details = {
  name: "",
  email: "",
  phone: "",
  service: "",
  otherService: "",
  projectDescription: "",
};

const focusableSelector = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
].join(", ");

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const service = getConsultationService(details.service);
  const visibleQuestions = (service?.questions || []).filter(
    (question) => !question.showWhen || answers[question.showWhen.questionId] === question.showWhen.equals,
  );

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      modalRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) openerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && open && status !== "submitting") onOpenChange(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onOpenChange, open, status]);

  function updateDetail(field: keyof Details, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function chooseService(value: string) {
    setDetails((current) => ({ ...current, service: value, otherService: value === otherServiceValue ? current.otherService : "" }));
    setAnswers({});
    setErrors({});
  }

  function updateAnswer(question: ConsultationQuestion, value: string) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setErrors((current) => ({ ...current, [question.id]: "" }));
  }

  function validateStepOne() {
    const nextErrors: Record<string, string> = {};
    if (!details.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!details.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!details.service) nextErrors.service = "Please select a service.";
    if (details.service === otherServiceValue && !details.otherService.trim()) nextErrors.otherService = "Please specify the service you need.";
    if (!details.projectDescription.trim()) nextErrors.projectDescription = "Please share a few details about your project.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStepTwo() {
    const nextErrors: Record<string, string> = {};
    visibleQuestions.forEach((question) => {
      if (question.required && !answers[question.id]?.trim()) nextErrors[question.id] = "This answer is required.";
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function continueToQuestions(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.checkValidity() || !validateStepOne()) {
      formRef.current?.reportValidity();
      return;
    }
    setStep(2);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !validateStepTwo()) return;
    setStatus("submitting");
    setMessage("");
    try {
      const [firstName, ...lastNameParts] = details.name.trim().split(/\s+/);
      const lastName = lastNameParts.join(" ") || "-";
      const response = await fetch("/zavior/formsubmit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-zavior-form": "leadform" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: details.email,
          phone: details.phone,
          company: "",
          service: "Consultation",
          message: [
            `Requested service: ${details.service}${details.service === "other" && details.otherService ? ` (${details.otherService})` : ""}`,
            `Source page: ${window.location.pathname}`,
            "",
            "Project details:",
            details.projectDescription,
            ...(Object.keys(answers).length
              ? ["", "Consultation answers:", ...Object.entries(answers).map(([key, value]) => `${key}: ${value}`)]
              : []),
          ].join("\n").slice(0, 2_000),
          source: "Website",
          utm_medium: "consultation",
          website: "",
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "We couldn't submit your request right now. Please try again in a moment.");
      setStatus("success");
      window.dataLayer?.push({ event: "consultation_submitted", service: details.service });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't submit your request right now. Please try again in a moment.");
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) || []);
    const first = focusable.at(0);
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeModal() {
    if (status !== "submitting") onOpenChange(false);
  }

  function resetAndClose() {
    setDetails(emptyDetails);
    setAnswers({});
    setErrors({});
    setStatus("idle");
    setStep(1);
    onOpenChange(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event: MouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) closeModal(); }}>
          <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="consultation-title" aria-describedby="consultation-description" onKeyDown={handleKeyDown} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.2 }} className="flex max-h-[min(760px,100dvh)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-2xl">
            <header className="flex items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{status === "success" ? "Consultation request" : `Step ${step} of 2`}</p>
                <h2 id="consultation-title" className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{status === "success" ? `Thank you, ${details.name.split(" ")[0] || "there"}!` : "Book a consultation"}</h2>
                <p id="consultation-description" className="mt-1 text-sm text-muted-foreground">{status === "success" ? "Your request has been received. Our team will review your requirements and get back to you shortly." : step === 1 ? "Tell us a little about your project." : `A few questions about ${service?.label || "your project"}.`}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={closeModal} disabled={status === "submitting"} aria-label="Close consultation popup"><X className="size-5" /></Button>
            </header>

            {status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">We’ll use the information you shared to prepare for a more useful conversation.</p>
                <Button type="button" className="mt-7" onClick={resetAndClose}>Close</Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={step === 1 ? continueToQuestions : submit} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
                {step === 1 ? (
                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Person name" error={errors.name}><Input value={details.name} onChange={(event) => updateDetail("name", event.target.value)} autoComplete="name" maxLength={120} required aria-invalid={Boolean(errors.name)} /></Field>
                      <Field label="Email" error={errors.email}><Input type="email" value={details.email} onChange={(event) => updateDetail("email", event.target.value)} autoComplete="email" maxLength={160} required aria-invalid={Boolean(errors.email)} /></Field>
                    </div>
                    <Field label="Phone" error={errors.phone}><Input type="tel" value={details.phone} onChange={(event) => updateDetail("phone", event.target.value)} autoComplete="tel" inputMode="tel" maxLength={30} required aria-invalid={Boolean(errors.phone)} placeholder="+971 50 000 0000" /></Field>
                    <Field label="Service needed" error={errors.service}><select value={details.service} onChange={(event) => chooseService(event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50" required aria-invalid={Boolean(errors.service)}><option value="">Select a service</option>{consultationServices.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}<option value={otherServiceValue}>Other Services</option></select></Field>
                    {details.service === otherServiceValue ? <Field label="Please specify the service" error={errors.otherService}><Input value={details.otherService} onChange={(event) => updateDetail("otherService", event.target.value)} maxLength={160} required aria-invalid={Boolean(errors.otherService)} /></Field> : null}
                    <Field label="Tell us about your project" helper="Share your requirements, goals, or anything else that will help our consultant understand your project." error={errors.projectDescription}><Textarea value={details.projectDescription} onChange={(event) => updateDetail("projectDescription", event.target.value)} rows={5} maxLength={2000} required aria-invalid={Boolean(errors.projectDescription)} placeholder="What are you hoping to achieve?" /></Field>
                    <div className="hidden" aria-hidden="true"><Input name="website" tabIndex={-1} autoComplete="off" /></div>
                  </div>
                ) : (
                  <div className="space-y-5">{visibleQuestions.map((question) => <QuestionField key={question.id} question={question} value={answers[question.id] || ""} error={errors[question.id]} onChange={(value) => updateAnswer(question, value)} />)}{status === "error" ? <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</p> : null}</div>
                )}
                <footer className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
                  {step === 1 ? <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button> : <Button type="button" variant="outline" onClick={() => { setStep(1); setErrors({}); }} disabled={status === "submitting"}><ArrowLeft /> Back</Button>}
                  <Button type="submit" disabled={status === "submitting"}>{status === "submitting" ? <><Loader2 className="animate-spin" /> Submitting…</> : step === 1 ? <>Continue <ArrowRight /></> : "Submit consultation"}</Button>
                </footer>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({ label, helper, error, children }: { label: string; helper?: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}{helper ? <p className="text-xs leading-5 text-muted-foreground">{helper}</p> : null}{error ? <p className="text-xs text-destructive" role="alert">{error}</p> : null}</div>;
}

function QuestionField({ question, value, error, onChange }: { question: ConsultationQuestion; value: string; error?: string; onChange: (value: string) => void }) {
  if (question.type === "radio") return <Field label={question.label} error={error}><div className="flex flex-wrap gap-3">{question.options?.map((option) => <Button key={option.value} type="button" variant={value === option.value ? "default" : "outline"} onClick={() => onChange(option.value)} aria-pressed={value === option.value}>{option.label}</Button>)}</div></Field>;
  if (question.type === "select") return <Field label={question.label} error={error}><select value={value} onChange={(event) => onChange(event.target.value)} className={cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", error && "border-destructive")} required={question.required}><option value="">Select an option</option>{question.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>;
  if (question.type === "textarea") return <Field label={question.label} error={error}><Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} maxLength={2000} required={question.required} placeholder={question.placeholder} aria-invalid={Boolean(error)} /></Field>;
  return <Field label={question.label} error={error}><Input type={question.type} value={value} onChange={(event) => onChange(event.target.value)} maxLength={300} required={question.required} placeholder={question.placeholder} aria-invalid={Boolean(error)} /></Field>;
}
