"use client";

import { HomeV2 } from "@/components/sections/home-v2";
import { SeoHead } from "@/components/seo/seo-head";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/data/demo-data";

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Odoo ERP, Zoho CRM & AI Automation Dubai | Zavior"
        description="Odoo ERP implementation, Zoho CRM, AI automation and custom software solutions for growing businesses in Dubai, UAE and the GCC."
        keywords="Odoo ERP Implementation, Odoo CRM, Custom Odoo Modules, Odoo Integration Services, Zoho CRM, Zoho One, AI Automation Dubai"
        path="/"
        structuredData={jsonLdGraph([
          webPageJsonLd({
            path: "/",
            name: "Odoo ERP, Zoho CRM and AI Automation Solutions",
            description: "Business-first ERP, CRM, automation and custom software solutions for companies in Dubai, the UAE and GCC.",
            speakableSelectors: ["h1", "main p:first-of-type"],
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ])}
        structuredDataId="home-structured-data"
        additionalStructuredData={[{
          data: { "@context": "https://schema.org", ...faqPageJsonLd(faqs.slice(0, 8), "/#faq") },
          id: "home-faq-structured-data",
        }]}
      />
      <HomeV2 />
    </>
  );
}
