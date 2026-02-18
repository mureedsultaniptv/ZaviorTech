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
import Head from "next/head";


export default function HomePage() {

    const [hovered, setHovered] = useState(false);

  const whatsappNumber = "+971508185948";
  const message = encodeURIComponent("Tell me more about your services");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };
  return (
    <>
       <Head>
        <title>Zavior Tech | Odoo ERP & Business Automation Solutions</title>
        <meta
          name="description"
          content="Zavior Tech is a Dubai-based Odoo Partner providing ERP solutions, digital transformation, and business process automation for global enterprises."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Zavior Tech | Odoo ERP & Automation" />
        <meta
          property="og:description"
          content="Simplify your global operations with Zavior Tech's Odoo ERP implementation, integration, and digital transformation services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zaviortech.vercel.app" />
        <meta property="og:image" content="https://zaviortech.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zavior Tech | Odoo ERP & Automation" />
        <meta
          name="twitter:description"
          content="Simplify your global operations with Zavior Tech's Odoo ERP solutions."
        />
        <meta name="twitter:image" content="https://zaviortech.vercel.app/og-image.png" />
      </Head>
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
