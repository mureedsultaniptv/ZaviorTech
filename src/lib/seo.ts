import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_TELEPHONE,
  SITE_URL,
} from "@/lib/site";

export const SEO_LANGUAGE = "en-AE";
export const SEO_LOCALE = "en_AE";
export const UAE_MARKET_NAME = "Dubai and United Arab Emirates";
export const PRIMARY_BUSINESS_SCHEMA_ID = "https://www.zavior.org/#localbusiness";

type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function professionalServiceJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": PRIMARY_BUSINESS_SCHEMA_ID,
    name: "Zavior Technologies",
    url: "https://www.zavior.org/",
    image: "https://www.zavior.org/zaviorlogo-dark.webp",
    logo: "https://www.zavior.org/zaviorlogo-dark.webp",
    telephone: SITE_TELEPHONE,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    priceRange: "AED AED",
    currenciesAccepted: "AED",
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Bank Transfer",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "SPC Freezone, Sheikh Mohammed Bin Zayed Rd",
      addressLocality: "Sharjah",
      addressRegion: "Sharjah",
      postalCode: "00000",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/zavior-tech",
      "https://www.youtube.com/@ZaviorTechnologiess",
      "https://github.com/Zavior-Technologies",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Odoo ERP Services",
        },
        {
          "@type": "OfferCatalog",
          name: "Zoho CRM and Zoho One Services",
        },
        {
          "@type": "OfferCatalog",
          name: "AI Automation Solutions",
        },
        {
          "@type": "OfferCatalog",
          name: "Web Development",
        },
        {
          "@type": "OfferCatalog",
          name: "Custom Mobile App Development",
        },
        {
          "@type": "OfferCatalog",
          name: "IT Solutions",
        },
        {
          "@type": "OfferCatalog",
          name: "IT Infrastructure Services",
        },
      ],
    },
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
    publisher: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
  };
}

export function speakableJsonLd(selectors: string[] = ["h1", "main p:first-of-type"]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: selectors,
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  pageType = "WebPage",
  speakableSelectors,
}: {
  path: string;
  name: string;
  description: string;
  pageType?: string;
  speakableSelectors?: string[];
}): JsonLdNode {
  return {
    "@type": pageType,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: SEO_LANGUAGE,
    isPartOf: { "@id": absoluteUrl("/#website") },
    publisher: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    speakable: speakableJsonLd(speakableSelectors),
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

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  description: string;
  metaDescription?: string;
  image?: string;
  features?: string[];
}): JsonLdNode {
  const path = `/services/${service.slug}`;

  return {
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: service.title,
    description: service.metaDescription || service.description,
    serviceType: service.title,
    provider: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Sharjah" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    image: service.image ? absoluteUrl(service.image) : absoluteUrl(DEFAULT_OG_IMAGE),
    url: absoluteUrl(path),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: (service.features || []).map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
          areaServed: UAE_MARKET_NAME,
        },
      })),
    },
  };
}

export function articleJsonLd(blog: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: { name: string };
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  canonical?: string;
}): JsonLdNode {
  const articleUrl = absoluteUrl(blog.canonical || `/blog/${blog.slug}`);

  return {
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: articleUrl,
    headline: blog.title,
    image: absoluteUrl(blog.image),
    author: { "@type": "Person", name: blog.author.name },
    publisher: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    description: blog.excerpt,
    articleSection: blog.category,
    keywords: (blog.tags || []).join(", "),
    url: articleUrl,
    speakable: speakableJsonLd(["h1", "article p:first-of-type"]),
  };
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>,
  id: string,
): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(id),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function projectJsonLd(project: {
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: number;
  image?: string;
  metaDescription?: string;
}): JsonLdNode {
  const path = `/portfolio/${project.slug}`;

  return {
    "@type": "CreativeWork",
    "@id": absoluteUrl(`${path}#project`),
    name: project.title,
    description: project.metaDescription || project.description,
    url: absoluteUrl(path),
    image: project.image ? absoluteUrl(project.image) : undefined,
    creator: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    about: project.category,
    dateCreated: String(project.year),
    client: {
      "@type": "Organization",
      name: project.client,
    },
  };
}

export function personJsonLd(member: {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: Record<string, string | undefined>;
}): JsonLdNode {
  const sameAs = Object.values(member.social || {}).filter(Boolean);

  return {
    "@type": "Person",
    "@id": absoluteUrl(`/team/${member.slug}#person`),
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.image ? absoluteUrl(member.image) : undefined,
    worksFor: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    sameAs,
  };
}

export function jobPostingJsonLd(job: {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  postedAt?: string;
  validThrough?: string;
  salaryCurrency?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryUnit?: string;
}): JsonLdNode {
  const employmentTypeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACT",
    contractor: "CONTRACTOR",
    intern: "INTERN",
    internship: "INTERN",
    temporary: "TEMPORARY",
    volunteer: "VOLUNTEER",
    "per diem": "PER_DIEM",
    other: "OTHER",
  };
  const employmentType =
    employmentTypeMap[job.type.toLowerCase()] || job.type.toUpperCase().replace(/[\s-]+/g, "_");

  return {
    "@type": "JobPosting",
    "@id": absoluteUrl(`/careers/${job.id}#job`),
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    validThrough: job.validThrough,
    employmentType,
    hiringOrganization: { "@id": PRIMARY_BUSINESS_SCHEMA_ID },
    jobLocationType: job.location.toLowerCase().includes("remote")
      ? "TELECOMMUTE"
      : undefined,
    applicantLocationRequirements: job.location.toLowerCase().includes("remote")
      ? { "@type": "Country", name: "United Arab Emirates" }
      : undefined,
    baseSalary:
      job.salaryCurrency && job.salaryMin && job.salaryMax
        ? {
            "@type": "MonetaryAmount",
            currency: job.salaryCurrency,
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salaryMin,
              maxValue: job.salaryMax,
              unitText: job.salaryUnit || "MONTH",
            },
          }
        : undefined,
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
