"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code2,
  Headphones,
  Lightbulb,
  PackageCheck,
  Play,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
  Users,
  Workflow,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useLanguage } from "@/lib/i18n/language-context";
import { getMarketingContent, marketingContent } from "@/lib/i18n/marketing-content";

const serviceDefinitions: Array<{
  icon: LucideIcon;
  href: string;
  secondary?: boolean;
}> = [
  { icon: Boxes, href: "/services/erp-odoo-dubai" },
  { icon: Users, href: "/services/erp-odoo-dubai", secondary: true },
  { icon: Code2, href: "/services/odoo-services-dubai" },
  { icon: Lightbulb, href: "/services/odoo-erp-implementation-dubai" },
  { icon: Workflow, href: "/services/odoo-services-dubai" },
  { icon: BarChart3, href: "/services/zoho-solutions-dubai" },
  { icon: PackageCheck, href: "/services/zoho-solutions-dubai" },
  { icon: Settings2, href: "/services/zoho-solutions-dubai" },
  { icon: Settings2, href: "/services/zoho-solutions-dubai", secondary: true },
  { icon: Workflow, href: "/services/zoho-solutions-dubai" },
  { icon: Bot, href: "/services/ai-automation-dubai", secondary: true },
  { icon: Code2, href: "/services", secondary: true },
  { icon: Code2, href: "/services/web-development-dubai", secondary: true },
  { icon: Code2, href: "/services/mobile-apps-dubai", secondary: true },
  { icon: Workflow, href: "/services", secondary: true },
];

const industryAssets = [
  "/icons/industries/industry-manufacturing.svg",
  "/icons/industries/industry-retail.svg",
  "/icons/industries/industry-healthcare.svg",
  "/icons/industries/industry-construction.svg",
  "/icons/industries/industry-education.svg",
  "/icons/industries/industry-hospitality.svg",
  "/icons/industries/industry-logistics.svg",
  "/icons/industries/industry-automotive.svg",
  "/icons/industries/industry-professional-services.svg",
] as const;

const benefitIcons = [
  CircleCheck,
  ShieldCheck,
  Code2,
  Headphones,
  Rocket,
  Sparkles,
] as const;

const solutionDefinitions = {
  odoo: {
    logo: "/brands/odoo-logo.svg",
    image: "/services/odoo-erp.webp",
    href: "/services/erp-odoo-dubai",
  },
  zoho: {
    logo: "/brands/zoho-logo.svg",
    image: "/images/enterprise-transformation-hero-v2.webp",
    href: "/services/zoho-solutions-dubai",
  },
} as const;

type SolutionKey = keyof typeof solutionDefinitions;

const caseStudyAssets = [
  { image: "/projects/odoo-nbeauty-erp.webp", href: "/portfolio/odoo-beauty-salon-erp" },
  { image: "/projects/manuf-erp.webp", href: "/portfolio/manufacturing-erp-crm" },
  { image: "/projects/finance-automation.webp", href: "/portfolio/finance-automation-system" },
  { image: "/projects/ai-lead-management-crm-automation-platform.svg", href: "/portfolio/ai-lead-management-crm-automation-platform" },
] as const;

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
] as const;

export const homeFaqs = [
  ...marketingContent.en.home.faq.odooItems,
  ...marketingContent.en.home.faq.zohoItems,
];

export function HomeV2() {
  const [activeSolution, setActiveSolution] = useState<SolutionKey>("odoo");
  const [showAllServices, setShowAllServices] = useState(false);
  const caseTrackRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { language, dir } = useLanguage();
  const content = getMarketingContent(language).home;
  const solution = content.platforms[activeSolution];
  const solutionDefinition = solutionDefinitions[activeSolution];
  const ArrowForward = dir === "rtl" ? ArrowLeft : ArrowRight;
  const PreviousArrow = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextArrow = dir === "rtl" ? ChevronLeft : ChevronRight;

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.13 },
        transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] as const },
      };
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const heroItemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 16 },
    visible: { y: 0 },
  };
  const staggerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.055,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };
  const serviceItems = content.services.items.map((item, index) => ({
    ...item,
    ...serviceDefinitions[index],
  }));
  const coreServices = serviceItems.filter((service) => !service.secondary);
  const additionalServices = serviceItems.filter((service) => service.secondary);
  const visibleServices = showAllServices
    ? [...coreServices, ...additionalServices]
    : coreServices;

  const getScrollOffset = (direction: -1 | 1, track: HTMLDivElement) =>
    (dir === "rtl" ? -direction : direction) * track.clientWidth * 0.82;

  const moveCases = (direction: -1 | 1) => {
    const track = caseTrackRef.current;
    if (!track) return;

    track.scrollBy({
      left: getScrollOffset(direction, track),
      behavior: "smooth",
    });
  };

  const moveTestimonials = (direction: -1 | 1) => {
    const track = testimonialTrackRef.current;
    if (!track) return;

    track.scrollBy({
      left: getScrollOffset(direction, track),
      behavior: "smooth",
    });
  };

  return (
    <div className="home-v2">
      <section className="v2-hero" aria-labelledby="v2-hero-title">
        <div className="v2-container v2-hero-grid">
          <motion.div
            className="v2-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: shouldReduceMotion ? 0 : 0.09 },
              },
            }}
          >
            <motion.div variants={heroItemVariants} transition={{ duration: 0.45 }} className="v2-pill">
              <span /> {content.hero.eyebrow}
            </motion.div>
            <motion.h1
              id="v2-hero-title"
              variants={heroItemVariants}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{content.hero.heading[0]}</span>
              <em>{content.hero.heading[1]}</em>
              <span>{content.hero.heading[2]}</span>
            </motion.h1>
            <motion.p variants={heroItemVariants} transition={{ duration: 0.56 }}>
              {content.hero.description}
            </motion.p>
            <motion.div variants={heroItemVariants} transition={{ duration: 0.5 }} className="v2-actions">
              <Link className="v2-button" href="/contact">
                {content.hero.primaryCta} <ArrowForward />
              </Link>
              <Link className="v2-button secondary" href="/portfolio">
                <Play /> {content.hero.secondaryCta}
              </Link>
            </motion.div>
            <motion.div variants={heroItemVariants} transition={{ duration: 0.5 }} className="v2-mini-stats">
              {content.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="v2-dashboard v2-product-showcase"
            role="group"
            aria-label={content.hero.productGroupLabel}
            initial={shouldReduceMotion ? false : { scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.72, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.figure
              className="v2-product-screen odoo"
              initial={shouldReduceMotion ? false : { x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.64, delay: shouldReduceMotion ? 0 : 0.28 }}
            >
              <figcaption>
                <Image src="/brands/odoo-logo.svg" alt="Odoo" width={92} height={50} />
                <span><strong>Odoo 19</strong> {content.hero.odooDashboardLabel}</span>
                <i>{content.hero.productUiLabel}</i>
              </figcaption>
              <Image
                className="v2-product-shot"
                src="/images/odoo-19-leads-dashboard.png"
                alt={`Odoo 19 ${content.hero.odooDashboardLabel}`}
                width={1449}
                height={1066}
                sizes="(max-width: 960px) calc(100vw - 40px), (max-width: 1200px) 47vw, 590px"
                priority
              />
            </motion.figure>
            <motion.figure
              className="v2-product-screen zoho"
              initial={shouldReduceMotion ? false : { y: 22, x: 14 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.62, delay: shouldReduceMotion ? 0 : 0.43 }}
            >
              <figcaption>
                <Image src="/brands/zoho-logo.svg" alt="Zoho" width={88} height={39} />
                <span><strong>Zoho CRM</strong> {content.hero.zohoPipelineLabel}</span>
                <i>{content.hero.productUiLabel}</i>
              </figcaption>
              <Image
                className="v2-product-shot"
                src="/images/zoho-crm-kanban-pipeline.png"
                alt={`Zoho CRM ${content.hero.zohoPipelineLabel}`}
                width={1834}
                height={827}
                sizes="(max-width: 520px) 86vw, (max-width: 960px) 560px, 440px"
                priority
              />
            </motion.figure>
          </motion.div>
        </div>
      </section>

      <motion.section {...revealProps} className="v2-partner-strip" aria-labelledby="partner-strip-title">
        <div className="v2-container">
          <div>
            <span>{content.partners.eyebrow}</span>
            <p id="partner-strip-title">{content.partners.statement}</p>
          </div>
          <div className="v2-partner-logos">
            <article>
              <Image src="/brands/odoo-logo.svg" alt="Odoo" width={112} height={60} />
              <span><CircleCheck /> {content.partners.officialPartner}</span>
            </article>
            <article>
              <Image src="/brands/zoho-logo.svg" alt="Zoho" width={112} height={49} />
              <span><CircleCheck /> {content.partners.officialPartner}</span>
            </article>
          </div>
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section" id="services">
        <Header
          eyebrow={content.services.eyebrow}
          title={content.services.title}
          text={content.services.description}
        />
        <motion.div
          className="v2-service-grid"
          id="homepage-services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerVariants}
        >
          {visibleServices.map(({ icon: Icon, href, title, text, secondary }) => (
            <motion.div
              key={title}
              layout="position"
              variants={secondary ? undefined : itemVariants}
              initial={secondary ? (shouldReduceMotion ? false : { opacity: 0, y: 18 }) : undefined}
              animate={secondary ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: shouldReduceMotion ? 0 : 0.42 }}
            >
              <Link href={href} className="v2-service-card">
                <span className="v2-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="learn">{content.services.learnMore} <ArrowForward /></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="v2-service-toggle">
          <button
            type="button"
            aria-expanded={showAllServices}
            aria-controls="homepage-services-grid"
            onClick={() => setShowAllServices((current) => !current)}
          >
            {showAllServices ? content.services.showFewer : content.services.showMore}
            <ChevronDown className={showAllServices ? "open" : ""} />
          </button>
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-industries-section">
        <Header
          eyebrow={content.industries.eyebrow}
          title={content.industries.title}
          text={content.industries.description}
        />
        <motion.div
          className="v2-industry-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerVariants}
        >
          {industryAssets.map((icon, index) => (
            <motion.div key={content.industries.items[index]} variants={itemVariants} transition={{ duration: 0.38 }}>
              <span className="v2-industry-art"><Image src={icon} alt="" width={52} height={52} /></span>
              <span>{content.industries.items[index]}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section {...revealProps} className="v2-why-section">
        <div className="v2-container">
          <Header
            eyebrow={content.benefits.eyebrow}
            title={content.benefits.title}
            text={content.benefits.description}
          />
          <motion.div
            className="v2-benefit-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerVariants}
          >
            {content.benefits.items.map((item, index) => {
              const Icon = benefitIcons[index];
              return (
                <motion.div key={item.title} variants={itemVariants} transition={{ duration: 0.4 }}>
                  <Icon />
                  <span><b>{item.title}</b><small>{item.text}</small></span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-solution-section" aria-labelledby="solution-tabs-title">
        <Header
          eyebrow={content.platforms.eyebrow}
          title={content.platforms.title}
          text={content.platforms.description}
        />
        <div className="v2-solution-tabs" role="tablist" aria-label={content.platforms.title} id="solution-tabs-title">
          {(Object.keys(solutionDefinitions) as SolutionKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`v2-solution-tab-${key}`}
              aria-selected={activeSolution === key}
              aria-controls="v2-solution-panel"
              tabIndex={activeSolution === key ? 0 : -1}
              onClick={() => setActiveSolution(key)}
            >
              <Image src={solutionDefinitions[key].logo} alt="" width={88} height={42} />
              {content.platforms[key].label}
            </button>
          ))}
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.article
            key={activeSolution}
            className={`v2-solution ${activeSolution}`}
            id="v2-solution-panel"
            role="tabpanel"
            aria-labelledby={`v2-solution-tab-${activeSolution}`}
            tabIndex={0}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={solutionDefinition.image} alt={solution.title} width={760} height={520} />
            <div>
              <span>{solution.eyebrow}</span>
              <h2>{solution.title}</h2>
              <div className="v2-solution-copy">
                {solution.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ul>{solution.items.map((item) => <li key={item}><Check /> {item}</li>)}</ul>
              <Link className="v2-button small" href={solutionDefinition.href}>
                {solution.explore} <ArrowForward />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-process">
        <Header eyebrow={content.process.eyebrow} title={content.process.title} />
        <motion.div
          className="v2-timeline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerVariants}
        >
          {content.process.items.map((item, index) => (
            <motion.div key={item.title} variants={itemVariants} transition={{ duration: 0.42 }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.title}</b>
              <small>{item.text}</small>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-cases" aria-labelledby="case-study-title">
        <div className="v2-case-heading">
          <Header
            eyebrow={content.cases.eyebrow}
            title={content.cases.title}
            text={content.cases.description}
            align="left"
          />
          <div>
            <button type="button" onClick={() => moveCases(-1)} aria-label={content.cases.previous}><PreviousArrow /></button>
            <button type="button" onClick={() => moveCases(1)} aria-label={content.cases.next}><NextArrow /></button>
          </div>
        </div>
        <div className="v2-case-grid" ref={caseTrackRef} id="case-study-title">
          {caseStudyAssets.map((asset, index) => {
            const study = content.cases.items[index];
            return (
              <Link href={asset.href} className="v2-case-card" key={study.title}>
                <Image src={asset.image} alt={study.title} width={620} height={350} />
                <div className="v2-case-copy">
                  <span>{study.category}</span>
                  <h3>{study.title}</h3>
                  <p>{study.description}</p>
                  <div>
                    {study.results.map((result) => (
                      <strong key={result.label}>{result.value}<small>{result.label}</small></strong>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-stats">
        <div className="v2-container">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-tech">
        <Header eyebrow={content.technologies.eyebrow} title={content.technologies.title} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerVariants}
        >
          {technologies.map(({ name, logo }) => (
            <motion.span key={name} title={name} variants={itemVariants} transition={{ duration: 0.35 }}>
              <Image src={logo} alt={name} width={86} height={38} />
              <b className="sr-only">{name}</b>
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-testimonial-section">
        <div className="v2-testimonial-heading">
          <Header
            eyebrow={content.testimonials.eyebrow}
            title={content.testimonials.title}
            text={content.testimonials.description}
          />
          <div>
            <button type="button" onClick={() => moveTestimonials(-1)} aria-label={content.testimonials.previous}><PreviousArrow /></button>
            <button type="button" onClick={() => moveTestimonials(1)} aria-label={content.testimonials.next}><NextArrow /></button>
          </div>
        </div>
        <motion.div
          className="v2-testimonials"
          ref={testimonialTrackRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerVariants}
        >
          {content.testimonials.items.map((testimonial) => (
            <motion.blockquote key={testimonial.author} variants={itemVariants} transition={{ duration: 0.46 }}>
              <div className="v2-quote-mark" aria-hidden="true">“</div>
              <p>{testimonial.quote}</p>
              <cite className="v2-testimonial-author">
                <span aria-hidden="true">{getInitials(testimonial.author)}</span>
                <span className="v2-testimonial-author-copy">
                  <b>{testimonial.author}</b>
                  <small>{testimonial.role} · {testimonial.company}</small>
                </span>
              </cite>
            </motion.blockquote>
          ))}
        </motion.div>
      </motion.section>

      <motion.section {...revealProps} className="v2-section v2-faq" id="faq">
        <Header eyebrow={content.faq.eyebrow} title={content.faq.title} text={content.faq.description} />
        <div className="v2-faq-two-col">
          <article className="v2-faq-panel v2-faq-panel--odoo" aria-labelledby="odoo-faq-title">
            <div className="v2-faq-panel-head">
              <Image src="/brands/odoo-logo.svg" alt="Odoo" width={88} height={38} />
              <h3 id="odoo-faq-title">{content.faq.odooTitle}</h3>
            </div>
            {content.faq.odooItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<ChevronDown /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </article>

          <div className="v2-faq-divider" aria-hidden="true" />

          <article className="v2-faq-panel v2-faq-panel--zoho" aria-labelledby="zoho-faq-title">
            <div className="v2-faq-panel-head">
              <Image src="/brands/zoho-logo.svg" alt="Zoho" width={88} height={38} />
              <h3 id="zoho-faq-title">{content.faq.zohoTitle}</h3>
            </div>
            {content.faq.zohoItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<ChevronDown /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </article>
        </div>
      </motion.section>

      <motion.section {...revealProps} className="v2-final-cta">
        <div className="v2-container">
          <div>
            <span>{content.cta.eyebrow}</span>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.description}</p>
          </div>
          <div>
            <div className="v2-actions">
              <Link className="v2-button light" href="/contact">{content.cta.primaryCta} <ArrowForward /></Link>
              <a className="v2-button outline-light" href="https://wa.me/971508185948">{content.cta.whatsapp}</a>
              <a className="v2-button outline-light" href="tel:+971508185948">{content.cta.call}</a>
            </div>
            <div className="v2-promises">
              {content.cta.promises.map((promise) => <span key={promise}><Check /> {promise}</span>)}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function Header({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`v2-header ${align}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
