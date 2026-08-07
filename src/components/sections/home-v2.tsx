"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code2,
  Construction,
  Factory,
  GraduationCap,
  HeartPulse,
  Headphones,
  Hotel,
  Lightbulb,
  PackageCheck,
  Play,
  Rocket,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Workflow,
} from "lucide-react";

const services = [
  { icon: Boxes, title: "Odoo ERP Implementation", text: "End-to-end Odoo ERP implementation tailored to your operations.", href: "/services/erp-odoo-dubai" },
  { icon: Users, title: "Odoo CRM", text: "Connect sales, marketing and customer follow-up in one system.", href: "/services/erp-odoo-dubai", secondary: true },
  { icon: Code2, title: "Custom Odoo Modules", text: "Purpose-built modules that match your workflows and controls.", href: "/services/odoo-services-dubai" },
  { icon: Lightbulb, title: "Odoo Consultation & Discovery", text: "Clarify requirements, scope and the right Odoo rollout plan.", href: "/services/odoo-erp-implementation-dubai" },
  { icon: Workflow, title: "Odoo Integration Services", text: "Connect Odoo with commerce, payments and business systems.", href: "/services/odoo-services-dubai" },
  { icon: BarChart3, title: "Zoho CRM", text: "Build a clearer sales pipeline and more consistent customer engagement.", href: "/services/zoho-solutions-dubai" },
  { icon: PackageCheck, title: "Zoho One Setup & Deployment", text: "Deploy the right Zoho applications through a phased plan.", href: "/services/zoho-solutions-dubai" },
  { icon: Settings2, title: "Zoho Books Automation", text: "Streamline finance workflows, approvals and recurring processes.", href: "/services/zoho-solutions-dubai" },
  { icon: Settings2, title: "Zoho Consultation & Optimization", text: "Improve adoption, reporting and performance across your Zoho setup.", href: "/services/zoho-solutions-dubai", secondary: true },
  { icon: Workflow, title: "Zoho Workflow Automation", text: "Create blueprints, custom functions and reliable API connections.", href: "/services/zoho-solutions-dubai" },
  { icon: Bot, title: "AI Automation", text: "Automate repetitive processes and accelerate decision-making.", href: "/services/ai-automation-dubai", secondary: true },
  { icon: Code2, title: "Custom Software Development", text: "Secure software designed around your operating model.", href: "/services", secondary: true },
  { icon: Code2, title: "Web Applications", text: "Modern, scalable web platforms built for real business use.", href: "/services/web-development-dubai", secondary: true },
  { icon: Code2, title: "Mobile Apps", text: "Native and cross-platform experiences for teams and customers.", href: "/services/mobile-apps-dubai", secondary: true },
  { icon: Workflow, title: "API Development", text: "Move data safely between ERP, CRM and third-party platforms.", href: "/services", secondary: true },
];

const industries = [
  [Factory, "Manufacturing"],
  [ShoppingCart, "Retail"],
  [HeartPulse, "Healthcare"],
  [Construction, "Construction"],
  [GraduationCap, "Education"],
  [Hotel, "Hospitality"],
  [Truck, "Logistics"],
  [Car, "Automotive"],
  [BriefcaseBusiness, "Professional Services"],
];

const benefits = [
  [CircleCheck, "Official Partnerships", "Official Odoo and Zoho partner delivery."],
  [ShieldCheck, "Business First", "We solve business problems—not just software."],
  [Code2, "Custom Development", "Business-specific modules and integrations."],
  [Headphones, "Dedicated Support", "Implementation, training and maintenance."],
  [Rocket, "Faster Delivery", "Agile implementation with measurable outcomes."],
  [Sparkles, "AI Automation", "Modern workflows powered by practical AI."],
];

const solutions = {
  odoo: {
    label: "Odoo ERP",
    logo: "/brands/odoo-logo.svg",
    eyebrow: "Odoo ERP solutions",
    title: "Odoo ERP Implementation Services",
    image: "/services/odoo-erp.webp",
    copy: [
      "Zavior plans and delivers Odoo ERP Implementation around the way your teams actually work. We begin with Odoo Consultation & Discovery, map the processes that affect revenue, cost and service, then configure the right applications before introducing custom development.",
      "Our delivery covers Odoo CRM, finance, inventory, purchasing, manufacturing and reporting. Where standard workflows stop short, we build Custom Odoo Modules and Odoo Integration Services that connect commerce, payments, logistics and existing business systems. Migration, testing, user training and post-launch support are part of the same accountable rollout.",
    ],
    items: ["Odoo ERP Implementation", "Odoo CRM", "Custom Odoo Modules", "Odoo Consultation & Discovery", "Odoo Integration Services"],
    href: "/services/erp-odoo-dubai",
  },
  zoho: {
    label: "Zoho",
    logo: "/brands/zoho-logo.svg",
    eyebrow: "Zoho solutions",
    title: "Zoho CRM & Zoho One Experts",
    image: "/images/enterprise-transformation-hero-v2.webp",
    copy: [
      "As an official Zoho partner, Zavior helps businesses turn Zoho CRM into a dependable system for lead capture, qualification, pipeline management, forecasting and customer follow-up. We also plan Zoho One Setup & Deployment so each application supports a clear operating need.",
      "Our consultants configure Zoho Books & Financial Automation, blueprints, approval rules, dashboards and custom functions. Through Zoho Consultation & Optimization and Zoho Custom Workflows & API Integration, we connect Zoho with Odoo, websites, payment services and existing databases—then train users and improve the system after go-live.",
    ],
    items: ["Zoho CRM", "Zoho One Setup & Deployment", "Zoho Books & Financial Automation", "Zoho Consultation & Optimization", "Zoho Custom Workflows & API Integration"],
    href: "/services/zoho-solutions-dubai",
  },
};

const process = [
  ["Discover", "Understand your goals"],
  ["Consult", "Define scope and priorities"],
  ["Design", "Map the right solution"],
  ["Develop", "Configure and integrate"],
  ["Deploy", "Test, train and launch"],
  ["Support", "Continuously improve"],
];

const caseStudies = [
  {
    category: "Dubai · Odoo ERP",
    title: "Multi-Branch Beauty Salon ERP",
    description: "Connected appointments, POS, inventory, staff scheduling and customer loyalty across eight branches.",
    image: "/projects/odoo-nbeauty-erp.webp",
    href: "/portfolio/odoo-beauty-salon-erp",
    results: [["40%", "Faster bookings"], ["25%", "Fewer no-shows"]],
  },
  {
    category: "Manufacturing · Odoo ERP",
    title: "Manufacturing ERP & CRM Platform",
    description: "Unified sales, production and inventory with real-time reporting and controlled approvals.",
    image: "/projects/manuf-erp.webp",
    href: "/portfolio/manufacturing-erp-crm",
    results: [["30%", "Faster order cycle"], ["18%", "Lower holding cost"]],
  },
  {
    category: "Finance · Automation",
    title: "Finance & Accounting Automation",
    description: "Consolidated multi-company reporting, reconciliation and repeatable month-end workflows.",
    image: "/projects/finance-automation.webp",
    href: "/portfolio/finance-automation-system",
    results: [["15 → 3", "Days to close"], ["One view", "Group reporting"]],
  },
  {
    category: "UAE · AI Automation",
    title: "AI Lead Management & CRM",
    description: "Connected lead capture, prioritization, follow-up and pipeline reporting for a B2B sales team.",
    image: "/projects/ai-lead-management-crm-automation-platform.svg",
    href: "/portfolio/ai-lead-management-crm-automation-platform",
    results: [["AI", "Lead scoring"], ["Always-on", "Follow-up"]],
  },
];

const technologies = [
  { name: "Odoo", logo: "/brands/odoo-logo.svg" },
  { name: "Zoho", logo: "/brands/zoho-logo.svg" },
  { name: "React", logo: "/brands/tech/react.svg" },
  { name: "Laravel", logo: "/brands/tech/laravel.svg" },
  { name: "Flutter", logo: "/brands/tech/flutter.svg" },
  { name: "Python", logo: "/brands/tech/python.svg" },
  { name: "Node.js", logo: "/brands/tech/nodejs.svg" },
  { name: "Docker", logo: "/brands/tech/docker.svg" },
  { name: "AWS", logo: "/brands/tech/aws.svg" },
  { name: "OpenAI", logo: "/brands/tech/openai.svg" },
];

const homepageTestimonials = [
  {
    id: "operations-manager",
    quote: "Zavior implemented our Odoo ERP seamlessly. Their expertise and support made the process smooth and efficient.",
    author: "Operations Manager",
    role: "Operations",
    company: "Manufacturing Company, UAE",
  },
  {
    id: "trading-ceo",
    quote: "The Zoho CRM implementation improved pipeline visibility and customer engagement significantly.",
    author: "Chief Executive Officer",
    role: "Executive Leadership",
    company: "Trading Company, Dubai",
  },
  {
    id: "finance-manager",
    quote: "Their custom modules and integration services perfectly fit our business requirements.",
    author: "Finance Manager",
    role: "Finance",
    company: "Retail Company, UAE",
  },
];

const faqItems = [
  ["What is Odoo ERP Implementation?", "Odoo ERP Implementation is the process of mapping requirements, configuring applications, migrating data, integrating systems, testing workflows and training users around one operating model."],
  ["Why choose Odoo ERP?", "Odoo brings CRM, sales, accounting, inventory, manufacturing, projects and other core operations into one flexible platform that can expand in phases."],
  ["How long does Odoo implementation take?", "A focused rollout can take several weeks. Larger multi-team implementations are delivered in phases based on modules, migration, integrations, testing and training."],
  ["Can Odoo integrate with Shopify?", "Yes. Odoo can connect with Shopify and other commerce, payment, logistics and business platforms through appropriate connectors or custom APIs."],
  ["What is Zoho CRM?", "Zoho CRM is a customer relationship platform for managing leads, deals, communications, follow-up, forecasts and sales reporting."],
  ["Why use Zoho One?", "Zoho One combines applications for sales, finance, marketing, service, HR and operations with shared data and cross-team automation."],
  ["Can Zoho integrate with ERP?", "Yes. Zoho Custom Workflows & API Integration can connect Zoho with Odoo and other ERP systems through controlled data flows."],
  ["How much does ERP implementation cost?", "Cost depends on users, applications, customization, data migration, integrations, training and support. A discovery session is the right first step for an accurate scope."],
];

export const homeFaqs = faqItems.map(([question, answer]) => ({ question, answer }));

export function HomeV2() {
  const [activeSolution, setActiveSolution] = useState<keyof typeof solutions>("odoo");
  const [showAllServices, setShowAllServices] = useState(false);
  const caseTrackRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const solution = solutions[activeSolution];
  const visibleServices = showAllServices ? services : services.filter((service) => !service.secondary);

  const moveCases = (direction: -1 | 1) => {
    caseTrackRef.current?.scrollBy({
      left: direction * caseTrackRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  const moveTestimonials = (direction: -1 | 1) => {
    testimonialTrackRef.current?.scrollBy({
      left: direction * testimonialTrackRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div className="home-v2">
      <section className="v2-hero" aria-labelledby="v2-hero-title">
        <div className="v2-container v2-hero-grid">
          <div className="v2-hero-copy">
            <div className="v2-pill"><span /> Official Odoo &amp; Zoho Partner · Dubai, UAE</div>
            <h1 id="v2-hero-title"><span>Odoo ERP, Zoho CRM &amp;</span><em>AI Automation Solutions</em><span>for Growing Businesses</span></h1>
            <p>Helping businesses across Dubai, UAE and the GCC streamline operations with Odoo ERP Implementation, Zoho CRM, Custom Software Development, AI Automation and Business Process Optimization.</p>
            <div className="v2-actions">
              <Link className="v2-button" href="/contact">Book Free Consultation <ArrowRight /></Link>
              <Link className="v2-button secondary" href="/portfolio"><Play /> View Case Studies</Link>
            </div>
            <div className="v2-mini-stats">
              <div><strong>120+</strong><span>Successful Projects</span></div>
              <div><strong>5+</strong><span>Years of Excellence</span></div>
              <div><strong>50+</strong><span>Happy Clients</span></div>
              <div><strong>UAE · GCC</strong><span>Regional Delivery</span></div>
            </div>
          </div>

          <div className="v2-dashboard v2-product-showcase" role="group" aria-label="Authentic Odoo and Zoho CRM product screens">
            <figure className="v2-product-screen odoo">
              <figcaption>
                <Image src="/brands/odoo-logo.svg" alt="Odoo" width={92} height={50} />
                <span><strong>Odoo 19</strong> ERP dashboard</span>
                <i>Official product UI</i>
              </figcaption>
              <Image
                className="v2-product-shot"
                src="/images/odoo-19-leads-dashboard.png"
                alt="Odoo 19 dashboard showing lead KPIs, monthly trends, countries and tags"
                width={1449}
                height={1066}
                sizes="(max-width: 960px) calc(100vw - 40px), (max-width: 1200px) 47vw, 590px"
                priority
              />
            </figure>
            <figure className="v2-product-screen zoho">
              <figcaption>
                <Image src="/brands/zoho-logo.svg" alt="Zoho" width={88} height={39} />
                <span><strong>Zoho CRM</strong> Kanban pipeline</span>
                <i>Official product UI</i>
              </figcaption>
              <Image
                className="v2-product-shot"
                src="/images/zoho-crm-kanban-pipeline.png"
                alt="Zoho CRM Kanban pipeline with deals organized by sales stage"
                width={1834}
                height={827}
                sizes="(max-width: 520px) 86vw, (max-width: 960px) 560px, 440px"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="v2-partner-strip" aria-labelledby="partner-strip-title">
        <div className="v2-container">
          <div><span>Official partnerships</span><p id="partner-strip-title">Two leading platforms. One accountable implementation team.</p></div>
          <div className="v2-partner-logos">
            <article><Image src="/brands/odoo-logo.svg" alt="Odoo" width={112} height={60} /><span><CircleCheck /> Official Partner</span></article>
            <article><Image src="/brands/zoho-logo.svg" alt="Zoho" width={112} height={49} /><span><CircleCheck /> Official Partner</span></article>
          </div>
        </div>
      </section>

      <section className="v2-section" id="services">
        <Header eyebrow="Our services" title="Comprehensive Solutions for Your Business Growth" text="One experienced team for ERP, CRM, automation and custom product delivery." />
        <div className="v2-service-grid" id="homepage-services-grid">
          {visibleServices.map(({ icon: Icon, title, text, href }) => (
            <Link href={href} className="v2-service-card" key={title}>
              <span className="v2-icon"><Icon /></span><h3>{title}</h3><p>{text}</p><span className="learn">Learn more <ArrowRight /></span>
            </Link>
          ))}
        </div>
        <div className="v2-service-toggle">
          <button
            type="button"
            aria-expanded={showAllServices}
            aria-controls="homepage-services-grid"
            onClick={() => setShowAllServices((current) => !current)}
          >
            {showAllServices ? "Show fewer services" : "Show 7 more services"}
            <ChevronDown className={showAllServices ? "open" : ""} />
          </button>
        </div>
      </section>

      <section className="v2-section v2-industries-section">
        <Header eyebrow="Industries we serve" title="Solutions for Every Industry" text="Focused business systems for the operating realities of each sector." />
        <div className="v2-industry-grid">{industries.map(([Icon, label]) => <div key={label as string}><Icon /><span>{label as string}</span></div>)}</div>
      </section>

      <section className="v2-why-section">
        <div className="v2-container">
          <Header eyebrow="Why choose Zavior" title="Your Success is Our Mission" text="Official partnerships, accountable delivery and support beyond go-live." />
          <div className="v2-benefit-grid">{benefits.map(([Icon, title, text]) => <div key={title as string}><Icon /><span><b>{title as string}</b><small>{text as string}</small></span></div>)}</div>
        </div>
      </section>

      <section className="v2-section v2-solution-section" aria-labelledby="solution-tabs-title">
        <Header eyebrow="Platform expertise" title="Official Partner Delivery Across Odoo and Zoho" text="Choose a platform to explore the implementation scope." />
        <div className="v2-solution-tabs" role="tablist" aria-label="Platform solutions" id="solution-tabs-title">
          {(Object.keys(solutions) as Array<keyof typeof solutions>).map((key) => (
            <button key={key} role="tab" aria-selected={activeSolution === key} aria-controls="v2-solution-panel" onClick={() => setActiveSolution(key)}>
              <Image src={solutions[key].logo} alt="" width={88} height={42} />{solutions[key].label}
            </button>
          ))}
        </div>
        <article className={`v2-solution ${activeSolution}`} id="v2-solution-panel" role="tabpanel">
          <Image src={solution.image} alt={solution.title} width={760} height={520} />
          <div><span>{solution.eyebrow}</span><h2>{solution.title}</h2><div className="v2-solution-copy">{solution.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><ul>{solution.items.map((item) => <li key={item}><Check /> {item}</li>)}</ul><Link className="v2-button small" href={solution.href}>Explore {solution.label} Services <ArrowRight /></Link></div>
        </article>
      </section>

      <section className="v2-section v2-process"><Header eyebrow="Our process" title="A Proven Implementation Process" /><div className="v2-timeline">{process.map(([step, description], index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b><small>{description}</small></div>)}</div></section>

      <section className="v2-section v2-cases" aria-labelledby="case-study-title">
        <div className="v2-case-heading"><Header eyebrow="Case studies" title="Real Results for Real Businesses" text="Challenge, solution and measurable outcomes from focused delivery." align="left" /><div><button onClick={() => moveCases(-1)} aria-label="Previous case studies"><ChevronLeft /></button><button onClick={() => moveCases(1)} aria-label="Next case studies"><ChevronRight /></button></div></div>
        <div className="v2-case-grid" ref={caseTrackRef} id="case-study-title">
          {caseStudies.map((study) => (
            <Link href={study.href} className="v2-case-card" key={study.title}>
              <Image src={study.image} alt="" width={620} height={350} />
              <div className="v2-case-copy"><span>{study.category}</span><h3>{study.title}</h3><p>{study.description}</p><div>{study.results.map(([value, label]) => <strong key={label}>{value}<small>{label}</small></strong>)}</div></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="v2-stats"><div className="v2-container">{[["120+", "Projects"], ["98%", "Client Satisfaction"], ["20+", "Industries"], ["5+", "Countries"], ["10+", "Experts"]].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div></section>

      <section className="v2-section v2-tech"><Header eyebrow="Technology stack" title="Technologies We Work With" /><div>{technologies.map(({ name, logo }) => <span key={name} title={name}><Image src={logo} alt={name} width={86} height={38} /><b className="sr-only">{name}</b></span>)}</div></section>

      <section className="v2-section v2-testimonial-section">
        <div className="v2-testimonial-heading"><Header eyebrow="Testimonials" title="What Our Clients Say" text="Perspectives from teams we have helped transform." /><div><button onClick={() => moveTestimonials(-1)} aria-label="Previous testimonials"><ChevronLeft /></button><button onClick={() => moveTestimonials(1)} aria-label="Next testimonials"><ChevronRight /></button></div></div>
        <div className="v2-testimonials" ref={testimonialTrackRef}>
          {homepageTestimonials.map((testimonial) => (
            <blockquote key={testimonial.id}>
              <div className="v2-quote-mark" aria-hidden="true">“</div>
              <p>{testimonial.quote}</p>
              <cite className="v2-testimonial-author">
                <span aria-hidden="true">{getInitials(testimonial.author)}</span>
                <span className="v2-testimonial-author-copy"><b>{testimonial.author}</b><small>{testimonial.role} · {testimonial.company}</small></span>
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="v2-section v2-faq" id="faq"><Header eyebrow="FAQ" title="Frequently Asked Questions" text="Clear answers for teams planning Odoo, Zoho and connected automation." /><div className="v2-faq-list">{faqItems.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div></section>

      <section className="v2-final-cta"><div className="v2-container"><div><span>Ready to transform your business?</span><h2>Let’s Build Something Amazing Together</h2><p>Whether you’re implementing Odoo ERP, optimizing Zoho CRM or building custom business software, our consultants are ready to help.</p></div><div><div className="v2-actions"><Link className="v2-button light" href="/contact">Book Free Consultation <ArrowRight /></Link><a className="v2-button outline-light" href="https://wa.me/971508185948">WhatsApp</a><a className="v2-button outline-light" href="tel:+971508185948">Call Now</a></div><div className="v2-promises"><span><Check /> No commitment</span><span><Check /> Expert consultation</span><span><Check /> Quick response</span></div></div></div></section>
    </div>
  );
}

function Header({ eyebrow, title, text, align = "center" }: { eyebrow: string; title: string; text?: string; align?: "left" | "center" }) {
  return <div className={`v2-header ${align}`}><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
