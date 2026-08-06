"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, Boxes, Building2, Check, ChevronDown,
  CircleCheck, Code2, Construction, Factory, GraduationCap, HeartPulse,
  Headphones, Hotel, Lightbulb, PackageCheck, Play, Rocket, Settings2,
  ShieldCheck, ShoppingCart, Sparkles, Truck, Users, Workflow,
} from "lucide-react";

const services = [
  [Boxes, "Odoo ERP Implementation", "End-to-end Odoo ERP implementation tailored to your business.", "/services/erp-odoo-dubai"],
  [Users, "Odoo CRM", "Streamline sales, marketing and customer relationships with Odoo CRM.", "/services/erp-odoo-dubai"],
  [Code2, "Custom Odoo Modules", "Purpose-built modules that match your unique workflows.", "/services/erp-odoo-dubai"],
  [Lightbulb, "Odoo Consultation & Discovery", "Expert discovery to select the right Odoo solution.", "/services/erp-odoo-dubai"],
  [Workflow, "Odoo Integration Services", "Connect Odoo with third-party apps and business systems.", "/services/erp-odoo-dubai"],
  [BarChart3, "Zoho CRM", "Build stronger customer relationships and a healthier sales pipeline.", "/services"],
  [PackageCheck, "Zoho One Setup & Deployment", "Complete Zoho One deployment for seamless operations.", "/services"],
  [Settings2, "Zoho Books & Automation", "Automate accounting and financial workflows with Zoho Books.", "/services"],
  [Bot, "AI Automation", "Automate repetitive processes, predict trends and boost efficiency.", "/services/ai-automation-dubai"],
  [Code2, "Custom Software Development", "Secure, scalable software built around your business.", "/services"],
];

const industries = [
  [Factory, "Manufacturing"], [ShoppingCart, "Retail & eCommerce"], [HeartPulse, "Healthcare"],
  [Construction, "Construction"], [Truck, "Logistics"], [GraduationCap, "Education"],
  [Hotel, "Hospitality"], [Building2, "Professional Services"],
];

const benefits = [
  [CircleCheck, "Certified Experts", "Experienced Odoo and Zoho consultants."],
  [ShieldCheck, "Business First", "We solve business problems—not just software."],
  [Code2, "Custom Development", "Tailored ERP modules and integrations."],
  [Headphones, "Dedicated Support", "Implementation, training and maintenance."],
  [Rocket, "Faster Delivery", "Agile delivery with measurable outcomes."],
  [Sparkles, "AI Automation", "Modern workflows powered by AI."],
];

const process = ["Discover", "Consult", "Design", "Develop", "Deploy", "Support"];

const caseStudies = [
  ["Manufacturing", "Odoo ERP", "/projects/manuf-erp.webp", "70%", "Faster operations", "98%", "Inventory accuracy"],
  ["Trading", "Odoo CRM & Inventory", "/projects/crm_analytics.webp", "60%", "Increase in sales", "45%", "Time saved"],
  ["Retail", "Zoho One Automation", "/projects/finance-automation.webp", "50%", "Cost reduction", "99%", "Data accuracy"],
];

const tech = ["Odoo", "Zoho", "React", "Laravel", "Flutter", "Python", "Node.js", "Docker", "AWS", "OpenAI"];

const faqItems = [
  ["What is Odoo ERP Implementation?", "It is the process of configuring Odoo applications, migrating data, integrating systems and training teams around your business workflows."],
  ["Why choose Odoo ERP?", "Odoo unifies CRM, sales, accounting, inventory, manufacturing and operations in one flexible platform."],
  ["How long does Odoo implementation take?", "Timelines depend on scope and complexity. A focused rollout can take weeks, while larger multi-company projects are delivered in phases."],
  ["Can Odoo integrate with Shopify?", "Yes. We can connect Odoo with Shopify and other commerce, payment, logistics and business platforms."],
  ["What is Zoho CRM?", "Zoho CRM is a customer relationship platform for managing leads, sales pipelines, communications and reporting."],
  ["Why use Zoho One?", "Zoho One brings sales, finance, HR, marketing and operations apps together with shared data and automation."],
  ["Can Zoho integrate with ERP?", "Yes. Our Zoho custom workflows and API integration services connect Zoho with Odoo and other ERP systems."],
  ["How much does ERP implementation cost?", "Cost is based on users, modules, customizations, integrations and data migration. Book a discovery call for a tailored estimate."],
];

export function HomeV2() {
  return (
    <div className="home-v2">
      <section className="v2-hero">
        <div className="v2-container v2-hero-grid">
          <div className="v2-hero-copy">
            <div className="v2-pill"><span /> Odoo & Zoho Experts in Dubai, UAE</div>
            <h1>Odoo ERP, Zoho CRM & <em>AI Automation Solutions</em> for Growing Businesses</h1>
            <p>Helping businesses across Dubai, UAE and the GCC streamline operations with Odoo ERP Implementation, Zoho CRM, custom software development, AI automation and business process optimization.</p>
            <div className="v2-actions">
              <Link className="v2-button" href="/contact">Book Free Consultation <ArrowRight /></Link>
              <Link className="v2-button secondary" href="/portfolio"><Play /> View Case Studies</Link>
            </div>
            <div className="v2-mini-stats">
              <div><strong>100+</strong><span>Successful Projects</span></div>
              <div><strong>5+</strong><span>Years of Excellence</span></div>
              <div><strong>50+</strong><span>Happy Clients</span></div>
              <div><strong>UAE · GCC</strong><span>Global Presence</span></div>
            </div>
          </div>
          <div className="v2-dashboard" aria-label="Business analytics dashboard preview">
            <div className="v2-dashboard-top"><b>Business Overview</b><span>Live dashboard</span></div>
            <div className="v2-kpis"><div><small>Revenue</small><b>AED 8.64M</b><i>+12.5%</i></div><div><small>Orders</small><b>1,820</b><i>+8.3%</i></div><div><small>Customers</small><b>980</b><i>+6.1%</i></div></div>
            <Image src="/projects/crm_analytics.webp" alt="CRM and ERP analytics dashboard" width={900} height={560} priority />
            <div className="v2-float-card zoho"><b>Zoho CRM</b><span>Pipeline +25%</span></div>
            <div className="v2-float-card ai"><Bot /><b>AI Automation</b><span>Efficiency +22.6%</span></div>
          </div>
        </div>
      </section>

      <section className="v2-trust">
        <p>Trusted by 100+ businesses worldwide</p>
        <div>{["PERFETTI", "P&G", "TOSHIBA", "KAD", "KEC", "Transwilco", "Grab", "Dr. Reddy’s"].map(x => <strong key={x}>{x}</strong>)}</div>
      </section>

      <section className="v2-section" id="services">
        <Header eyebrow="Our services" title="Comprehensive Solutions for Business Growth" text="One experienced team for ERP, CRM, automation and custom product delivery." />
        <div className="v2-service-grid">{services.map(([Icon, title, text, href]) => <Link href={href as string} className="v2-service-card" key={title as string}><span className="v2-icon"><Icon /></span><h3>{title as string}</h3><p>{text as string}</p><span className="learn">Learn more <ArrowRight /></span></Link>)}</div>
      </section>

      <section className="v2-section v2-split">
        <div><Header eyebrow="Industries we serve" title="Solutions for Every Industry" align="left" /><div className="v2-industry-grid">{industries.map(([Icon, label]) => <div key={label as string}><Icon /><span>{label as string}</span></div>)}</div></div>
        <div><Header eyebrow="Why choose Zavior" title="Your Success is Our Mission" align="left" /><div className="v2-benefit-grid">{benefits.map(([Icon, title, text]) => <div key={title as string}><Icon /><span><b>{title as string}</b><small>{text as string}</small></span></div>)}</div></div>
      </section>

      <section className="v2-section v2-solutions">
        <SolutionPanel theme="odoo" eyebrow="Odoo ERP solutions" title="Odoo ERP Implementation That Transforms Businesses" image="/services/odoo-erp.webp" copy="From discovery and Odoo Consultation through customization, Odoo Integration and training, we deliver a complete Odoo ERP Implementation that simplifies operations and supports sustainable growth." items={["Odoo ERP Implementation", "Odoo CRM & Sales", "Custom Odoo Modules", "Odoo Integration Services", "Odoo Consultation & Discovery"]} href="/services/erp-odoo-dubai" />
        <SolutionPanel theme="zoho" eyebrow="Zoho solutions" title="Zoho CRM & Zoho One Experts" image="/projects/finance-automation.webp" copy="Unlock the potential of Zoho CRM and Zoho One Setup & Deployment. We improve customer engagement, automate Zoho Books & Financial Automation and build reliable Zoho custom workflows and API integration." items={["Zoho CRM", "Zoho One Setup & Deployment", "Zoho Books & Financial Automation", "Zoho Consultation & Optimization", "Zoho Custom Workflows & API Integration"]} href="/services" />
      </section>

      <section className="v2-section v2-process"><Header eyebrow="Our process" title="A Proven Implementation Process" /><div className="v2-timeline">{process.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b><small>{i === 0 ? "Understand your goals" : i === 5 ? "Continuously improve" : "Move with confidence"}</small></div>)}</div></section>

      <section className="v2-section"><Header eyebrow="Case studies" title="Real Results for Real Businesses" text="Business technology measured by outcomes—not feature lists." /><div className="v2-case-grid">{caseStudies.map(c => <article key={c[0]}><Image src={c[2]} alt={`${c[0]} case study`} width={620} height={350} /><div className="v2-case-copy"><span>{c[0]}</span><h3>{c[1]} implementation</h3><p>Integrated processes, reporting and workflows around a focused delivery plan.</p><div><strong>{c[3]}<small>{c[4]}</small></strong><strong>{c[5]}<small>{c[6]}</small></strong></div></div></article>)}</div></section>

      <section className="v2-stats"><div className="v2-container">{[["120+", "Projects"], ["98%", "Client Satisfaction"], ["20+", "Industries"], ["5+", "Countries"], ["10+", "Experts"]].map(s => <div key={s[1]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div></section>

      <section className="v2-section v2-tech"><Header eyebrow="Technology stack" title="Technologies We Work With" /><div>{tech.map(t => <span key={t}>{t}</span>)}</div></section>

      <section className="v2-section"><Header eyebrow="Testimonials" title="What Our Clients Say" /><div className="v2-testimonials">{[
        ["Zavior implemented our Odoo ERP seamlessly. Their expertise and support made the process smooth and efficient.", "Operations Manager", "Manufacturing Company, UAE"],
        ["The Zoho CRM implementation improved pipeline visibility and customer engagement significantly.", "CEO", "Trading Company, Dubai"],
        ["Their custom modules and integration services perfectly fit our business requirements.", "Finance Manager", "Retail Company, UAE"],
      ].map(t => <blockquote key={t[1]}><span>“</span><p>{t[0]}</p><b>{t[1]}</b><small>{t[2]}</small><i>★★★★★</i></blockquote>)}</div></section>

      <section className="v2-section v2-faq-wrap" id="faq"><div><Header eyebrow="FAQ" title="Frequently Asked Questions" align="left" />{faqItems.map((f, i) => <details key={f[0]} open={i === 0}><summary>{f[0]}<ChevronDown /></summary><p>{f[1]}</p></details>)}</div><div className="v2-final-cta"><span>Ready to transform your business?</span><h2>Let’s Build Something Amazing Together</h2><p>Whether you’re implementing Odoo ERP, optimizing Zoho CRM or building custom software, our consultants are ready to help.</p><div className="v2-actions"><Link className="v2-button light" href="/contact">Book Free Consultation <ArrowRight /></Link><a className="v2-button outline-light" href="https://wa.me/971508185948">WhatsApp</a></div><div className="v2-promises"><span><Check /> No commitment</span><span><Check /> Expert consultation</span><span><Check /> Quick response</span></div></div></section>
    </div>
  );
}

function Header({ eyebrow, title, text, align = "center" }: { eyebrow: string; title: string; text?: string; align?: "left" | "center" }) {
  return <div className={`v2-header ${align}`}><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function SolutionPanel({ eyebrow, title, image, copy, items, href, theme }: { eyebrow: string; title: string; image: string; copy: string; items: string[]; href: string; theme: string }) {
  return <article className={`v2-solution ${theme}`}><Image src={image} alt={title} width={700} height={500} /><div><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p><ul>{items.map(i => <li key={i}><Check /> {i}</li>)}</ul><Link className="v2-button small" href={href}>Explore {theme === "odoo" ? "Odoo" : "Zoho"} Services <ArrowRight /></Link></div></article>;
}
