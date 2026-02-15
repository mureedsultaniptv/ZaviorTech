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

import { FaWhatsapp } from "react-icons/fa"; // Make sure to install react-icons
import { useState } from "react";


export default function HomePage() {

    const [hovered, setHovered] = useState(false);

  const whatsappNumber = "+923004720937";
  const message = encodeURIComponent("Tell me more about your services");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };
  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* <CompaniesSection /> */}
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      {/* <TeamSection /> */}
      <CTASection />

      {/* Floating WhatsApp Button */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-float"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tooltip with animated state change */}
        <div
          className={`mb-2 px-3 py-1 rounded-lg shadow-lg text-sm text-white bg-green-600 text-center transition-all duration-300 ease-in-out transform ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          What help do you need?
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl flex items-center justify-enf transition-transform duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </button>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
