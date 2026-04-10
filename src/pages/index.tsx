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

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";


export default function HomePage() {

    const [hovered, setHovered] = useState(false);

  const whatsappNumber = "971508185948";
  const message = encodeURIComponent("Tell me more about your services");

  const handleClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <>
      <SeoHead
        title="Zavior Group | Technology, Furniture, and Maintenance Services"
        description="Zavior Group brings together Zavior Technologies, Zavior Furniture, and Zavior Maintenance Services to deliver practical business transformation, furnishing support, and maintenance operations."
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <CompaniesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />

      {/* Floating WhatsApp Button */}
      <div
        className="fixed w-min bottom-6 right-6 z-50 flex flex-col items-end animate-float"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tooltip with animated state change */}
        <div
          className={`mb-2 w-max absolute top-[-40] px-3 py-1 rounded-lg shadow-lg text-sm text-white bg-green-600 text-center transition-all duration-300 ease-in-out transform ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          What help do you need?
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </button>
      </div>

    </>
  );
}
