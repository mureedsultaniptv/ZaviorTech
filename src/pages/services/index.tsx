"use client";

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
import { shortServiceTitle } from "@/lib/service-content";
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
    id: "erp-odoo",
    name: "ERP & Odoo",
    eyebrow: "Connected business operations",
    description: "Bring finance, sales, inventory, purchasing, people, and reporting into one environment designed around the way your teams work.",
    image: "/images/odoo-19-leads-dashboard.png",
    brand: "/brands/odoo-logo.svg",
    icon: Blocks,
    primarySlug: "odoo-erp-implementation-dubai",
    match: (slug: string) => slug.includes("odoo") || slug.includes("erp"),
  },
  {
    id: "zoho",
    name: "Zoho Solutions",
    eyebrow: "Customers, finance, and teams",
    description: "Turn Zoho CRM, Zoho One, Books, Analytics, and automation into a connected platform your team can use confidently.",
    image: "/images/zoho-crm-kanban-pipeline.png",
    brand: "/brands/zoho-logo.svg",
    icon: CloudCog,
    primarySlug: "zoho-solutions-dubai",
    match: (slug: string) => slug.includes("zoho"),
  },
  {
    id: "automation",
    name: "AI & Automation",
    eyebrow: "Less repetitive work",
    description: "Connect systems and automate documents, customer conversations, approvals, data movement, and routine operational tasks.",
    image: "/services/ai-automation.webp",
    icon: Bot,
    primarySlug: "ai-automation-dubai",
    match: (slug: string) => slug.includes("ai-") || slug.includes("api-"),
  },
  {
    id: "digital-products",
    name: "Digital Products",
    eyebrow: "Software people enjoy using",
    description: "Create websites, web applications, mobile products, portals, and custom business systems shaped around real users and workflows.",
    image: "/services/website-dev.webp",
    icon: Code2,
    primarySlug: "web-development-dubai",
    match: (slug: string) => slug.includes("web-") || slug.includes("mobile-") || slug.includes("custom-software"),
  },
  {
    id: "infrastructure",
    name: "IT & Infrastructure",
    eyebrow: "Reliable technology foundations",
    description: "Strengthen everyday operations with secure networks, hardware, infrastructure, system integration, continuity, and responsive support.",
    image: "/services/core-it.webp",
    icon: Network,
    primarySlug: "it-solutions-dubai",
    match: (slug: string) => slug.includes("it-solutions") || slug.includes("core-it"),
  },
];

const process = [
  { number: "01", title: "Discover", text: "Understand the goals, people, workflows, systems, and constraints.", icon: Compass },
  { number: "02", title: "Design", text: "Turn findings into a focused solution and phased delivery roadmap.", icon: Layers3 },
  { number: "03", title: "Deliver", text: "Build visibly, validate frequently, and prepare users for launch.", icon: Rocket },
  { number: "04", title: "Improve", text: "Support adoption, measure performance, and refine what matters.", icon: Headphones },
];

const principles = [
  { title: "Business-first thinking", text: "Every recommendation starts with the operational result—not a preferred tool.", icon: Workflow },
  { title: "One connected team", text: "Strategy, design, engineering, integration, and support stay aligned.", icon: CheckCircle2 },
  { title: "Built responsibly", text: "Secure, maintainable solutions that avoid unnecessary complexity.", icon: ShieldCheck },
];

export default function ServicesPage() {
  const { language } = useLanguage();
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/services",
      name: "Complete IT, ERP & AI Services for Business Growth",
      description: "Explore Dubai-focused Odoo ERP, Zoho, AI automation, software development, digital products, and IT infrastructure services.",
      speakableSelectors: ["h1", "#service-categories p"],
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
    itemListJsonLd("Zavior Technologies services for Dubai and UAE businesses", services.map((service) => ({ name: service.title, path: `/services/${service.slug}` }))),
    ...services.map((service) => serviceJsonLd(service)),
  ]);

  return (
    <>
      <SeoHead
        title="Complete IT, ERP & AI Services for Business Growth"
        description="Explore Dubai-focused Odoo ERP, Zoho, AI automation, software development, digital products, and IT infrastructure services."
        path="/services"
        structuredData={structuredData}
        structuredDataId="services-index-structured-data"
        additionalStructuredData={[{ data: { "@context": "https://schema.org", ...faqPageJsonLd(faqs.slice(0, 6), "/services#faq") }, id: "services-faq-structured-data" }]}
      />

      <div className="services-index-page bg-background">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-red-50 via-white to-slate-50 pb-20 pt-28 dark:from-red-950/20 dark:via-background dark:to-slate-950/20 lg:pb-28 lg:pt-36">
          <div className="absolute -right-40 top-0 -z-10 size-[40rem] rounded-full border-[5rem] border-primary/[.035]" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight className="size-3.5" /><span className="font-medium text-foreground">Services</span></div>
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(28rem,1.1fr)] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary shadow-sm"><Sparkles className="size-4" />Technology partner · Dubai & UAE</div>
                <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">One team to transform how your business works.</h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">From ERP and CRM to AI automation, custom software, and core IT—we connect strategy and delivery so every part works together.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-12 rounded-full px-7 shadow-lg shadow-primary/15"><Link href="/contact">Tell us what you need <ArrowRight className="size-4" /></Link></Button><a href="#service-categories" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/80 px-7 text-sm font-semibold shadow-sm transition hover:border-primary/30 hover:text-primary">Explore capabilities</a></div>
                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-muted-foreground">{["Clear discovery", "Phased delivery", "Ongoing support"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-primary" />{item}</span>)}</div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 overflow-hidden rounded-[1.75rem] border border-border bg-card p-3 shadow-[0_26px_70px_-28px_rgba(25,29,38,.3)]">
                  <div className="mb-3 flex items-center gap-1.5 px-2"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 h-6 flex-1 rounded-md bg-muted" /></div>
                  <div className="relative aspect-[16/7] overflow-hidden rounded-2xl bg-muted"><Image src="/images/odoo-19-leads-dashboard.png" alt="Business technology dashboard" fill priority sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover object-top" /></div>
                </div>
                <div className="rounded-2xl bg-[#17191f] p-5 text-white shadow-lg"><Blocks className="size-6 text-red-400" /><p className="mt-8 text-xl font-semibold">ERP & business platforms</p><p className="mt-2 text-sm text-white/55">One source of operational truth.</p></div>
                <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary p-5 text-primary-foreground shadow-lg"><Bot className="size-6" /><p className="mt-8 text-xl font-semibold">AI & connected workflows</p><p className="mt-2 text-sm text-primary-foreground/70">Less manual work. Faster action.</p><div className="absolute -bottom-8 -right-8 size-28 rounded-full border-[1.6rem] border-white/10" /></div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="container mx-auto grid grid-cols-2 px-4 py-7 lg:grid-cols-4 lg:px-8">
            {[{ value: `${stats.projects}+`, label: "Projects delivered" }, { value: `${stats.clients}+`, label: "Clients supported" }, { value: `${stats.countries}`, label: "Countries served" }, { value: "5", label: "Service disciplines" }].map((item, index) => <div key={item.label} className={`px-4 py-3 text-center ${index % 2 ? "border-l border-border" : ""} ${index > 1 ? "lg:border-l" : ""}`}><p className="text-2xl font-bold sm:text-3xl">{item.value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p></div>)}
          </div>
        </section>

        <section id="service-categories" className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our capabilities</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Expertise that fits the problem—not the other way around.</h2></div><p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Choose one focused service or combine disciplines into a connected roadmap across operations, customer experience, data, and infrastructure.</p></div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {serviceGroups.map((group, groupIndex) => {
                const Icon = group.icon;
                const groupServices = services.filter((service) => group.match(service.slug));
                const featured = groupIndex === 0;
                return (
                  <motion.article key={group.id} id={group.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: groupIndex * 0.04 }} className={`group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_.95fr]" : ""}`}>
                    <div className={`relative overflow-hidden bg-muted ${featured ? "min-h-80" : "aspect-[16/8]"}`}>
                      <Image src={group.image} alt={group.name} fill sizes={featured ? "(min-width: 1024px) 52vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className="object-cover object-center transition duration-700 group-hover:scale-[1.025]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur"><Icon className="size-5" /><span className="text-sm font-bold">{group.name}</span></div>
                      {group.brand ? <div className="absolute bottom-5 left-5 rounded-xl bg-white px-4 py-2 shadow-lg"><Image src={group.brand} alt={group.name} width={100} height={34} className="h-7 w-auto" /></div> : null}
                    </div>
                    <div className="flex flex-col p-7 sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{group.eyebrow}</p><h3 className="mt-3 text-2xl font-bold sm:text-3xl">{group.name}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{group.description}</p>
                      <div className="mt-6 grid gap-2 sm:grid-cols-2">{groupServices.slice(0, featured ? 8 : 4).map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold transition hover:border-border hover:bg-muted hover:text-primary"><ArrowRight className="size-3.5 shrink-0 text-primary" />{shortServiceTitle(getLocalizedTitle(service, language))}</Link>)}</div>
                      <Button asChild variant="outline" className="mt-7 self-start rounded-full px-5"><Link href={`/services/${group.primarySlug}`}>Explore {group.name}<ArrowRight className="size-4" /></Link></Button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#15171c] py-20 text-white lg:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:px-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Why Zavior</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Technology should simplify the business.</h2><p className="mt-5 text-lg leading-relaxed text-white/60">We combine business understanding with technical depth, so the final solution is useful—not just impressive in a presentation.</p><Button asChild variant="outline" className="mt-7 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"><Link href="/why-zavior">Meet your technology partner <ArrowRight className="size-4" /></Link></Button></div>
            <div className="grid gap-4 sm:grid-cols-3">{principles.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[.055] p-6"><span className="grid size-11 place-items-center rounded-xl bg-red-500/15 text-red-400"><Icon className="size-5" /></span><h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{item.text}</p></article>; })}</div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A clear delivery model</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From uncertainty to a working solution.</h2><p className="mt-4 text-lg text-muted-foreground">Visible decisions, practical milestones, and a team that stays accountable after launch.</p></div>
            <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-border lg:block" />{process.map((step, index) => { const Icon = step.icon; return <motion.article key={step.number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }} className="relative rounded-2xl border border-border bg-card p-6"><div className="relative z-10 flex items-center justify-between"><span className="grid size-16 place-items-center rounded-2xl bg-[#17191f] text-white shadow-lg"><Icon className="size-6" /></span><span className="text-sm font-bold text-primary">{step.number}</span></div><h3 className="mt-6 text-xl font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></motion.article>; })}</div>
          </div>
        </section>

        <section id="faq" className="border-y border-border bg-muted/30 py-20 lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.58fr_1.42fr] lg:gap-16 lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Service questions</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A few things clients ask first.</h2><p className="mt-4 leading-relaxed text-muted-foreground">Your systems and priorities are unique. A short consultation can clarify the best starting point.</p></div><Accordion type="single" collapsible className="space-y-3">{faqs.slice(0, 6).map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/30"><AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-primary hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="pb-5 pr-8"><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></AccordionContent></AccordionItem>)}</Accordion></div>
        </section>

        <section className="px-4 py-20 lg:px-8 lg:py-28"><div className="container mx-auto overflow-hidden rounded-[2rem] bg-[#15171c] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Start with the problem</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Not sure which service you need?</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">Tell us what is slowing your business down. We’ll help you turn it into a clear, practical technology roadmap.</p></div><Button asChild size="lg" className="h-12 rounded-full px-7"><Link href="/contact"><MessageSquare className="size-4" />Book a free consultation</Link></Button></div></div></section>
      </div>
    </>
  );
}
