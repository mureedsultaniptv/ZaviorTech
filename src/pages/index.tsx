"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";
import { HomepageSeoContent } from "@/components/sections/homepage-seo-content";
import { SeoHead } from "@/components/seo/seo-head";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";
import { MessageCircle } from "lucide-react";
import { faqs } from "@/lib/data/demo-data";


export default function HomePage() {
  const whatsappNumber = "971508185948";
  const message = encodeURIComponent("Tell me more about your services");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <SeoHead
        title="Odoo ERP, AI Automation & Web Development Dubai | Zavior"
        description="Zavior Technologies helps Dubai and UAE companies implement Odoo ERP, AI automation, custom websites, mobile apps, IT solutions, and core infrastructure."
        path="/"
        structuredData={jsonLdGraph([
          webPageJsonLd({
            path: "/",
            name: "Odoo ERP, AI Automation and Web Development Dubai",
            description:
              "Zavior Technologies helps Dubai and UAE companies implement Odoo ERP, AI automation, custom websites, mobile apps, IT solutions, and core infrastructure.",
            speakableSelectors: ["h1", "main p:first-of-type"],
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqPageJsonLd(faqs.slice(0, 10), "/#faq"),
        ])}
        structuredDataId="home-structured-data"
      />
      <HeroSection />
      <ServicesSection />
      <HomepageSeoContent />
      <CompaniesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      <section id="faq" className="py-20 lg:py-28 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Quick Answers
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Common Questions About Working With Zavior
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.slice(0, 10).map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />

      <div
        className="group fixed w-min bottom-6 right-6 z-50 flex flex-col items-end animate-float"
      >
        <div
          className="pointer-events-none absolute -top-10 mb-2 w-max rounded-lg bg-green-600 px-3 py-1 text-center text-sm text-white opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          What help do you need?
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}
