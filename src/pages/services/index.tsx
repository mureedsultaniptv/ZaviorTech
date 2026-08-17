"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  Compass,
  Headphones,
  Layers3,
  MessageSquare,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { motion } from "@/lib/light-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { SeoHead } from "@/components/seo/seo-head";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, services, stats } from "@/lib/data/demo-data";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const serviceGroups = [
  {
    name: "ERP & Odoo",
    kicker: "Run the business in one place",
    description: "Connect finance, sales, stock, operations, people, and reporting through an Odoo environment designed around your workflows.",
    image: "/services/odoo-erp.webp",
    icon: Blocks,
    primarySlug: "odoo-erp-implementation-dubai",
    match: (slug: string) => slug.includes("odoo") || slug.includes("erp"),
  },
  {
    name: "Zoho Solutions",
    kicker: "Unify customer-facing operations",
    description: "Configure Zoho CRM, Zoho One, finance, reporting, automation, and integrations as a maintainable operating platform.",
    image: "/images/zoho-crm-kanban-pipeline.png",
    icon: CloudCog,
    primarySlug: "zoho-solutions-dubai",
    match: (slug: string) => slug.includes("zoho"),
  },
  {
    name: "AI & Automation",
    kicker: "Move work without the busywork",
    description: "Use practical AI, connected APIs, and workflow automation to reduce repetitive effort and keep information moving accurately.",
    image: "/services/ai-automation.webp",
    icon: Bot,
    primarySlug: "ai-automation-dubai",
    match: (slug: string) => slug.includes("ai-") || slug.includes("api-"),
  },
  {
    name: "Digital Products",
    kicker: "Build experiences people want to use",
    description: "Design and engineer fast websites, business applications, mobile products, and custom platforms that support real operations.",
    image: "/services/website-dev.webp",
    icon: Code2,
    primarySlug: "web-development-dubai",
    match: (slug: string) => slug.includes("web-") || slug.includes("mobile-") || slug.includes("custom-software"),
  },
  {
    name: "IT & Infrastructure",
    kicker: "Create a dependable technology foundation",
    description: "Keep teams productive with secure networks, infrastructure, hardware, system integration, continuity planning, and ongoing support.",
    image: "/services/core-it.webp",
    icon: Network,
    primarySlug: "it-solutions-dubai",
    match: (slug: string) => slug.includes("it-solutions") || slug.includes("core-it"),
  },
];

const approach = [
  { number: "01", title: "Understand", description: "Goals, workflows, users, data, and friction points.", icon: Compass },
  { number: "02", title: "Shape", description: "The right scope, architecture, priorities, and roadmap.", icon: Layers3 },
  { number: "03", title: "Deliver", description: "Visible progress, practical testing, and careful launch.", icon: Rocket },
  { number: "04", title: "Improve", description: "Training, support, measurement, and continuous refinement.", icon: Headphones },
];

const reasons = [
  { title: "Business before technology", description: "We start with the operational result and select the technology that fits it.", icon: Workflow },
  { title: "One accountable team", description: "Strategy, engineering, integration, launch, and support stay connected.", icon: CheckCircle2 },
  { title: "Built for the long term", description: "Secure, maintainable solutions that can grow without unnecessary complexity.", icon: ShieldCheck },
];

export default function ServicesPage() {
  const { language } = useLanguage();
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/services",
      name: "Complete IT, ERP & AI Services for Business Growth",
      description: "Explore Dubai-focused Odoo ERP implementation, Zoho, AI automation, software development, digital products, and IT infrastructure services.",
      speakableSelectors: ["h1", "#services-overview p"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    itemListJsonLd(
      "Zavior Technologies services for Dubai and UAE businesses",
      services.map((service) => ({ name: service.title, path: `/services/${service.slug}` })),
    ),
    ...services.map((service) => serviceJsonLd(service)),
  ]);

  return (
    <>
      <SeoHead
        title="Complete IT, ERP & AI Services for Business Growth"
        description="Explore Dubai-focused Odoo ERP implementation, Zoho, AI automation, software development, digital products, and IT infrastructure services."
        path="/services"
        structuredData={structuredData}
        structuredDataId="services-index-structured-data"
        additionalStructuredData={[
          {
            data: { "@context": "https://schema.org", ...faqPageJsonLd(faqs.slice(0, 6), "/services#faq") },
            id: "services-faq-structured-data",
          },
        ]}
      />

      <div className="services-index-page">
        <section className="relative isolate overflow-hidden bg-[#111318] pb-20 pt-28 text-white lg:pb-28 lg:pt-36">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_77%_20%,rgba(197,30,42,.30),transparent_32rem),linear-gradient(120deg,#101217_44%,#251416_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(90deg,transparent_35%,black)]" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
              <Link href="/" className="transition hover:text-white">Home</Link><ChevronRight className="size-3.5" /><span className="text-white/80">Services</span>
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr] lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <Sparkles className="size-3.5 text-red-400" /> Technology services · Dubai & UAE
                </div>
                <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">Technology that makes your business work better.</h1>
                <p id="services-overview" className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/72 md:text-xl">We design, build, connect, and support the systems behind modern operations—from ERP and CRM to AI automation, custom software, and core IT.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full bg-[#c91b26] px-7 text-white hover:bg-[#ad101a]"><Link href="/contact">Discuss your project <ArrowRight className="size-4" /></Link></Button>
                  <a href="#service-categories" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/10">Explore services</a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/65">
                  {["Discovery before delivery", "Clear, phased roadmaps", "Local UAE support"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-red-400" />{item}</span>)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }} className="relative mx-auto w-full max-w-xl lg:mx-0">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40">
                  <Image src="/images/enterprise-transformation-hero-v2.webp" alt="Connected business technology services" fill priority sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">One connected partner</p><p className="mt-2 max-w-sm text-2xl font-semibold leading-snug">From operational challenge to working solution.</p></div>
                </div>
                <div className="absolute -right-3 -top-6 rounded-2xl bg-white p-4 text-[#14171d] shadow-xl sm:-right-7 sm:p-5"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-red-50 text-[#c91b26]"><Blocks className="size-5" /></span><div><p className="text-xs text-slate-500">Capabilities</p><p className="font-bold">Strategy · Build · Support</p></div></div></div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid grid-cols-2 px-4 py-7 lg:grid-cols-4 lg:px-8">
            {[
              { value: `${stats.projects}+`, label: "Projects delivered" },
              { value: `${stats.clients}+`, label: "Clients supported" },
              { value: `${stats.countries}`, label: "Countries served" },
              { value: "5", label: "Service disciplines" },
            ].map((item, index) => <div key={item.label} className={`px-4 py-3 text-center ${index % 2 ? "border-l border-border" : ""} ${index > 1 ? "lg:border-l" : ""}`}><p className="text-2xl font-bold tracking-tight sm:text-3xl">{item.value}</p><p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p></div>)}
          </div>
        </section>

        <section id="service-categories" className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our capabilities</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The right expertise for every stage of growth.</h2></div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Choose a focused engagement or bring our disciplines together for a connected transformation across systems, data, customer experience, and infrastructure.</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {serviceGroups.map((group, groupIndex) => {
                const Icon = group.icon;
                const groupServices = services.filter((service) => group.match(service.slug));
                return (
                  <motion.article key={group.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: groupIndex * 0.04 }} className={`group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl ${groupIndex === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[.8fr_1.2fr]" : ""}`}>
                    <div className={`relative overflow-hidden ${groupIndex === 0 ? "min-h-72" : "aspect-[16/8]"}`}>
                      <Image src={group.image} alt={group.name} fill sizes={groupIndex === 0 ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                      <span className="absolute left-6 top-6 grid size-12 place-items-center rounded-2xl border border-white/15 bg-black/35 text-white backdrop-blur"><Icon className="size-6" /></span>
                    </div>
                    <div className="flex flex-col p-7 sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{group.kicker}</p>
                      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{group.name}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{group.description}</p>
                      <div className="mt-6 grid gap-2 sm:grid-cols-2">
                        {groupServices.slice(0, groupIndex === 0 ? 8 : 4).map((service) => (
                          <Link key={service.slug} href={`/services/${service.slug}`} className="flex items-start gap-2 rounded-lg px-2 py-2 text-sm font-medium leading-snug transition hover:bg-muted hover:text-primary"><ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary" />{getLocalizedTitle(service, language)}</Link>
                        ))}
                      </div>
                      <Link href={`/services/${group.primarySlug}`} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-primary">Explore {group.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#15171c] py-20 text-white lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Why Zavior</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Less complexity. More useful outcomes.</h2>
                <p className="mt-5 text-lg leading-relaxed text-white/62">The best technology project is not the one with the most features. It is the one your team can use, trust, and build on.</p>
                <Button asChild variant="outline" className="mt-7 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"><Link href="/why-zavior">Why work with us <ArrowRight className="size-4" /></Link></Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {reasons.map((reason) => { const Icon = reason.icon; return <article key={reason.title} className="rounded-2xl border border-white/10 bg-white/[.055] p-6"><span className="grid size-11 place-items-center rounded-xl bg-red-500/15 text-red-400"><Icon className="size-5" /></span><h3 className="mt-6 text-xl font-semibold text-white">{reason.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/58">{reason.description}</p></article>; })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">How we work</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A clear path from problem to progress.</h2><p className="mt-4 text-lg text-muted-foreground">Every engagement has defined decisions, visible progress, and a practical next step.</p></div>
            <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-border lg:block" aria-hidden="true" />
              {approach.map((step, index) => { const Icon = step.icon; return <motion.article key={step.number} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }} className="relative rounded-2xl border border-border bg-card p-6"><div className="relative z-10 flex items-center justify-between"><span className="grid size-16 place-items-center rounded-2xl bg-[#17191f] text-white shadow-lg"><Icon className="size-6" /></span><span className="text-sm font-bold text-primary">{step.number}</span></div><h3 className="mt-6 text-xl font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p></motion.article>; })}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-muted/30 py-20 lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.62fr_1.38fr] lg:gap-16 lg:px-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Service questions</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A few things clients ask us first.</h2><p className="mt-4 leading-relaxed text-muted-foreground">If your question is specific to your systems or team, we can usually clarify it in a short consultation.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Ask your question <ArrowRight className="size-4" /></Link></div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.slice(0, 6).map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/30"><AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-primary hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="pb-5 pr-8"><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></AccordionContent></AccordionItem>)}
            </Accordion>
          </div>
        </section>

        <section className="px-4 py-20 lg:px-8 lg:py-28">
          <div className="container mx-auto overflow-hidden rounded-[2rem] bg-[#15171c] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Let’s solve the right problem</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Not sure which service fits? Start with a conversation.</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">Share the challenge, current systems, and desired outcome. We’ll help you turn it into a practical technology roadmap.</p></div>
              <Button asChild size="lg" className="h-12 rounded-full bg-[#c91b26] px-7 text-white hover:bg-[#ad101a]"><Link href="/contact"><MessageSquare className="size-4" /> Book a free consultation</Link></Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
