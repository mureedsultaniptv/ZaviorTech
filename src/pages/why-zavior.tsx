import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, Handshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Business-first discovery",
    text: "We start with the process, data and outcomes that matter to your teams—not a preselected tool or template.",
  },
  {
    icon: BarChart3,
    title: "Connected delivery",
    text: "ERP, CRM, automation and custom software are planned as one operating system, with clear ownership at every handoff.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable implementation",
    text: "Structured scoping, migration, testing, training and go-live support reduce risk and make adoption practical.",
  },
  {
    icon: Handshake,
    title: "Support beyond launch",
    text: "We remain accountable after deployment, improving workflows, reporting and user confidence as your business changes.",
  },
];

export default function WhyZaviorPage() {
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/why-zavior",
      name: "Why Choose Zavior Technologies",
      description: "Learn how Zavior combines business discovery, Odoo and Zoho expertise, delivery discipline and long-term support for UAE businesses.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Why Zavior", path: "/why-zavior" },
    ]),
  ]);

  return (
    <>
      <SeoHead
        title="Why Choose Zavior | Odoo, Zoho & Automation Partner UAE"
        description="Learn how Zavior combines business discovery, Odoo and Zoho expertise, delivery discipline and long-term support for UAE businesses."
        path="/why-zavior"
        structuredData={structuredData}
        structuredDataId="why-zavior-structured-data"
      />

      <section>
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Zavior</p>
            <h1 className="mb-5 text-balance font-bold tracking-tight">Technology delivery that stays focused on the business result.</h1>
            <p className="text-lg text-muted-foreground">
              Zavior helps teams replace disconnected tools and manual work with practical systems that people can adopt, operate and improve.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="mb-5 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></span>
                <h2 className="mb-3 text-xl font-semibold">{title}</h2>
                <p className="leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-7 lg:grid-cols-[1.1fr_.9fr] lg:p-10">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">A clear way to start</p>
              <h2 className="mb-4 text-2xl font-bold">Start with a focused conversation, not a sales pitch.</h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">We will understand your current workflow, the outcomes you need and the practical next step—whether that is Odoo, Zoho, AI automation or custom software.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg"><Link href="/contact">Book a consultation <ArrowRight className="ml-2 size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/services">Explore services</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
