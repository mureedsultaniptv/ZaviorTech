import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CircleCheck,
  Handshake,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Business-first discovery",
    text: "We begin with the process, data and outcomes that matter to your teams—not a preselected tool or template.",
  },
  {
    icon: Workflow,
    title: "Connected delivery",
    text: "ERP, CRM, automation and custom software are planned as one operating system with clear ownership at every handoff.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable implementation",
    text: "Structured scoping, migration, testing, training and go-live support reduce risk and make adoption practical.",
  },
  {
    icon: Handshake,
    title: "Support beyond launch",
    text: "We stay accountable after deployment, improving workflows, reporting and user confidence as your business changes.",
  },
];

const deliverySteps = [
  ["01", "Discover", "Understand your current operating model, constraints and success criteria."],
  ["02", "Design", "Turn requirements into a clear, phased implementation plan with shared priorities."],
  ["03", "Deliver", "Configure, build, migrate and test the solution with your team involved throughout."],
  ["04", "Improve", "Support adoption and continuously refine the workflows that create business value."],
] as const;

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
    <div className="why-zavior-page">
      <SeoHead
        title="Why Choose Zavior | Odoo, Zoho & Automation Partner UAE"
        description="Learn how Zavior combines business discovery, Odoo and Zoho expertise, delivery discipline and long-term support for UAE businesses."
        path="/why-zavior"
        structuredData={structuredData}
        structuredDataId="why-zavior-structured-data"
      />

      <section className="why-hero">
        <div className="why-page-container why-hero-grid">
          <div>
            <span className="why-eyebrow"><CircleCheck /> Why Zavior</span>
            <h1>Technology delivery that stays focused on the <em>business result.</em></h1>
            <p>
              Zavior helps teams replace disconnected tools and manual work with practical systems that people can adopt, operate and improve.
            </p>
            <div className="why-hero-actions">
              <Button asChild size="lg"><Link href="/contact">Book a consultation <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/services">Explore services</Link></Button>
            </div>
          </div>

          <aside className="why-hero-panel" aria-label="Zavior delivery commitment">
            <span className="why-panel-icon"><Rocket /></span>
            <p className="why-panel-overline">One accountable team</p>
            <h2>From first conversation to measurable adoption.</h2>
            <ul>
              <li><Check /> Clear scope and delivery ownership</li>
              <li><Check /> Odoo, Zoho and custom engineering expertise</li>
              <li><Check /> Practical support after go-live</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="why-proof-strip" aria-label="Zavior outcomes">
        <div className="why-page-container">
          <div><strong>Business-first</strong><span>Decisions linked to operational goals</span></div>
          <div><strong>Connected</strong><span>Platforms and teams working together</span></div>
          <div><strong>Accountable</strong><span>One partner through launch and beyond</span></div>
        </div>
      </section>

      <section className="why-reasons-section">
        <div className="why-page-container">
          <div className="why-section-heading">
            <span className="why-eyebrow">What makes the difference</span>
            <h2>Built for business change—not just software delivery.</h2>
            <p>Every engagement is designed to give decision-makers clarity, delivery teams confidence and users a system they can rely on every day.</p>
          </div>
          <div className="why-reason-grid">
            {reasons.map(({ icon: Icon, title, text }) => (
              <article key={title} className="why-reason-card">
                <span><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-delivery-section">
        <div className="why-page-container why-delivery-grid">
          <div className="why-delivery-copy">
            <span className="why-eyebrow"><BarChart3 /> A disciplined delivery model</span>
            <h2>A clear path from complexity to a system your team can use.</h2>
            <p>We bring the right people into the conversation early, make trade-offs visible and deliver in manageable stages—so progress never becomes a black box.</p>
            <Link href="/services" className="why-text-link">Explore our implementation services <ArrowRight /></Link>
          </div>
          <ol className="why-delivery-steps">
            {deliverySteps.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="why-cta-section">
        <div className="why-page-container why-cta-panel">
          <div>
            <span className="why-eyebrow">A practical first step</span>
            <h2>Start with a focused conversation, not a sales pitch.</h2>
            <p>Tell us what needs to work better. We will help define the most practical next step for your team.</p>
          </div>
          <Button asChild size="lg"><Link href="/contact">Talk to Zavior <ArrowRight /></Link></Button>
        </div>
      </section>
    </div>
  );
}
