import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const SEO_LANGUAGE = "en-AE";
export const SEO_LOCALE = "en_AE";
export const UAE_MARKET_NAME = "Dubai and United Arab Emirates";

type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function organizationJsonLd(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_NAME,
    alternateName: ["Zavior Group", "Zavior Technologies"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/zaviorlogo-dark.png"),
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    email: "info@zavior.org",
    telephone: "+971508185948",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SPC Freezone, Sheikh Mohammed Bin Zayed Rd",
      addressLocality: "Sharjah",
      addressRegion: "Sharjah",
      addressCountry: "AE",
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "AdministrativeArea", name: "Sharjah" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    sameAs: [
      "https://www.linkedin.com/company/zavior-tech",
      "https://www.youtube.com/@ZaviorTechnologiess",
      "https://github.com/Zavior-Technologies",
    ],
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SEO_LANGUAGE,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function technologyServiceJsonLd(): JsonLdNode {
  return {
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#technology-service"),
    name: "Zavior Technologies",
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      "Odoo ERP implementation, AI automation, web development, mobile apps, IT solutions, and infrastructure services for Dubai and UAE businesses.",
    telephone: "+971508185948",
    email: "info@zavior.org",
    priceRange: "$$",
    parentOrganization: { "@id": absoluteUrl("/#organization") },
    address: {
      "@type": "PostalAddress",
      streetAddress: "SPC Freezone, Sheikh Mohammed Bin Zayed Rd",
      addressLocality: "Sharjah",
      addressRegion: "Sharjah",
      addressCountry: "AE",
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    makesOffer: [
      "Odoo ERP implementation",
      "AI automation",
      "Web development",
      "Mobile app development",
      "IT solutions",
      "Core IT infrastructure",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: UAE_MARKET_NAME,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  };
}
