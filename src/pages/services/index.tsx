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
    faqPageJsonLd(faqs.slice(0, 6), "/services#faq"),
  ]);

  return (
    <>
      <SeoHead
        title="Complete IT, ERP & AI Services for Business Growth"
        description="Explore Dubai-focused Odoo ERP implementation, AI automation, web development, mobile apps, IT solutions, cybersecurity, and core infrastructure services."
        path="/services"
        structuredData={structuredData}
        structuredDataId="services-index-structured-data"
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
          <div className="space-y-16">
            {services.map((service, index) => {
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
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{serviceTitle}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild>
                        <Link href={`/services/${service.slug}`}>
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <Card className="bg-card border-border/50 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            {service.image ? (
                              <Image
                                src={service.image}
                                alt={serviceTitle}
                                className="w-full h-full object-cover"
                                width={640}
                                height={360}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                loading="lazy"
                              />
                            ) : (
                              <Icon className="h-24 w-24 text-primary/30" />
                            )}
                            {/* <Icon className="h-24 w-24 text-primary/30" /> */}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
