"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogSection } from "@/components/sections/blog-section";
import { TeamSection } from "@/components/sections/team-section";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CompaniesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      {/* <TeamSection /> */}
      <CTASection />
    </>
  );
}
