"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";
import { SeoHead } from "@/components/seo/seo-head";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  technologyServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { MessageCircle } from "lucide-react";


export default function HomePage() {
  const whatsappNumber = "971508185948";
  const message = encodeURIComponent("Tell me more about your services");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <SeoHead
        title="Odoo ERP, AI Automation & Web Development Dubai | Zavior Technologies"
        description="Zavior Technologies helps Dubai and UAE companies implement Odoo ERP, AI automation, custom websites, mobile apps, IT solutions, and core infrastructure."
        path="/"
        structuredData={jsonLdGraph([
          organizationJsonLd(),
          websiteJsonLd(),
          technologyServiceJsonLd(),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ])}
        structuredDataId="home-structured-data"
      />
      <HeroSection />
      <ServicesSection />
      <CompaniesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
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
