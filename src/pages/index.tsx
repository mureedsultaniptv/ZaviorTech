"use client";

import { HomeV2, homeFaqs } from "@/components/sections/home-v2";
import { SeoHead } from "@/components/seo/seo-head";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Odoo ERP, AI Automation & Web Development Dubai | Zavior"
        description="Zavior Technologies helps Dubai and UAE companies implement Odoo ERP, AI automation, custom websites, mobile apps, IT solutions, and core infrastructure."
        keywords="Odoo ERP Services Dubai, AI Automation Services UAE, Custom Software Development Dubai, Web Development Company UAE, Digital Transformation Services UAE"
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
