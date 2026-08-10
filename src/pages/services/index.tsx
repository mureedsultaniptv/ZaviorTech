"use client";

import React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { SeoHead } from "@/components/seo/seo-head";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { faqs, services } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { Brain, Building, Globe, Smartphone, Server, Shield, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { getPriorityServices } from "@/lib/seo-content";

const coreServiceSlugs = [
  "erp-odoo-dubai",
  "zoho-solutions-dubai",
  "ai-automation-dubai",
  "web-development-dubai",
  "mobile-apps-dubai",
  "it-solutions-dubai",
  "core-it-infrastructure-dubai",
];

const zohoServiceSlugs = [
  "zoho-crm-implementation-dubai",
  "zoho-one-implementation-dubai",
  "zoho-books-automation-dubai",
  "zoho-integration-dubai",
];

const zohoCapabilities = [
  "Zoho CRM setup, migration and pipeline design",
  "Zoho One discovery and phased deployment",
  "Zoho Books finance workflows and approvals",
  "Zoho Creator custom applications and portals",
  "Deluge custom functions, blueprints and automations",
  "Zoho Analytics dashboards and reporting",
  "API, website, payment gateway and Odoo integrations",
  "Training, governance and continuous optimization",
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Building,
  Globe,
  Smartphone,
  Server,
  Shield,
};
export default function ServicesPage() {
  const { t, language } = useLanguage();
  const priorityServices = getPriorityServices(6);
  const coreServices = services.filter((service) => coreServiceSlugs.includes(service.slug));
  const zohoServices = services.filter((service) => zohoServiceSlugs.includes(service.slug));
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/services",
      name: "Complete IT, ERP & AI Services for Business Growth",
      description:
        "Explore Dubai-focused Odoo ERP implementation, AI automation, web development, mobile apps, IT solutions, cybersecurity, and core infrastructure services.",
      speakableSelectors: ["h1", "#services-answer p"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    itemListJsonLd(
      "Zavior Technologies services for Dubai and UAE businesses",
      services.map((service) => ({
        name: service.title,
        path: `/services/${service.slug}`,
      })),
    ),
    ...services.map((service) => serviceJsonLd(service)),
  ]);

  return (
    <>
      <SeoHead
        title="Complete IT, ERP & AI Services for Business Growth"
        description="Explore Dubai-focused Odoo ERP implementation, AI automation, web development, mobile apps, IT solutions, cybersecurity, and core infrastructure services."
        path="/services"
        structuredData={structuredData}
        structuredDataId="services-index-structured-data"
        additionalStructuredData={[
          {
            data: {
              "@context": "https://schema.org",
              ...faqPageJsonLd(faqs.slice(0, 6), "/services#faq"),
            },
            id: "services-faq-structured-data",
          },
        ]}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="text-sm font-medium text-primary">What We Do</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl min-[360px]:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance break-words"
            >
              {t.services.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground text-pretty"
            >
              {t.services.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      <section id="services-answer" className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Short Answer
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What can Zavior Technologies deliver?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Zavior Technologies helps Dubai and UAE businesses implement Odoo
              ERP, automate workflows with AI, build fast websites and mobile
              apps, improve IT operations, and modernize core infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {coreServices.map((service) => {
              const Icon = iconMap[service.icon] || Globe;
              const serviceTitle = getLocalizedTitle(service, language);
              return (
                <motion.div
                  key={service.id}
                  id={service.id.split("-")[0]}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="scroll-mt-32"
                >
                  <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-card">
                    <div className="aspect-[16/8] bg-gradient-to-br from-primary/20 to-accent/20">
                      {service.image ? (
                        <Image src={service.image} alt={serviceTitle} className="h-full w-full object-cover" width={640} height={320} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" loading="lazy" />
                      ) : (
                        <div className="grid h-full place-items-center"><Icon className="h-16 w-16 text-primary/30" /></div>
                      )}
                    </div>
                    <CardContent className="flex flex-1 flex-col p-6">
                      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                      <h2 className="mb-3 text-2xl font-bold">{serviceTitle}</h2>
                      <p className="mb-5 line-clamp-3 leading-relaxed text-muted-foreground">{service.description}</p>
                      <ul className="mb-6 space-y-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" />{feature}</li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="mt-auto w-full justify-between"><Link href={`/services/${service.slug}`}>View service <ArrowRight className="size-4" /></Link></Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="zoho-services" className="bg-sky-50/70 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Image src="/brands/zoho-logo.svg" alt="Zoho" width={132} height={56} className="mb-5 h-10 w-auto" />
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Zoho services</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Build, customize and connect the Zoho tools your business needs.</h2>
              <p className="max-w-xl leading-relaxed text-muted-foreground">
                From a focused CRM rollout to a connected Zoho One environment, we configure the standard products and build the custom workflows, apps and integrations around them.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild><Link href="/services/zoho-solutions-dubai">Explore Zoho solutions <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline"><Link href="/contact">Discuss your Zoho project</Link></Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {zohoServices.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">{getLocalizedTitle(service, language)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">Explore service <ArrowRight className="ml-1.5 h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-sky-100 bg-white/80 p-6 dark:border-slate-800 dark:bg-card lg:p-8">
            <h3 className="text-xl font-semibold">Custom Zoho capability</h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">Need more than standard configuration? We can extend Zoho safely around your actual process while keeping the platform maintainable for your team.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {zohoCapabilities.map((capability) => (
                <li key={capability} className="flex gap-2 text-sm leading-relaxed text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{capability}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Service Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.slice(0, 6).map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {priorityServices.length > 0 ? (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">
                Priority Service Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {priorityServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    <h3 className="font-semibold mb-2">
                      {getLocalizedTitle(service, language)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Process Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Our Process"
            subtitle="A proven methodology that ensures project success from start to finish."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", description: "Understanding your needs, goals, and challenges through in-depth consultation." },
              { step: "02", title: "Strategy", description: "Developing a comprehensive roadmap tailored to your specific requirements." },
              { step: "03", title: "Execution", description: "Implementing solutions with agile methodology and regular client reviews." },
              { step: "04", title: "Support", description: "Providing ongoing maintenance, optimization, and continuous improvement." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                    <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
