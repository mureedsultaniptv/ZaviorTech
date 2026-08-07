"use client";

import { HomeV2, homeFaqs } from "@/components/sections/home-v2";
import { SeoHead } from "@/components/seo/seo-head";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Official Odoo & Zoho Partner in Dubai | Zavior"
        description="Zavior is an official Odoo and Zoho partner delivering connected ERP, CRM, finance and automation solutions across Dubai, the UAE and GCC."
        keywords="Odoo ERP Implementation, Odoo CRM, Custom Odoo Modules, Odoo Integration Services, Zoho CRM, Zoho One, AI Automation Dubai"
        path="/"
        structuredData={jsonLdGraph([
          webPageJsonLd({
            path: "/",
            name: "Official Odoo and Zoho Partner in Dubai",
            description: "Business-first Odoo ERP, Zoho CRM, automation and custom software solutions for companies in Dubai, the UAE and GCC.",
            speakableSelectors: ["h1", "main p:first-of-type"],
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ])}
        structuredDataId="home-structured-data"
        additionalStructuredData={[{
          data: { "@context": "https://schema.org", ...faqPageJsonLd(homeFaqs, "/#faq") },
          id: "home-faq-structured-data",
        }]}
      />
      <HomeV2 />
    </>
  );
}
