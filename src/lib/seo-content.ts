import { blogs, services } from "@/lib/data/demo-data";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  metaDescription?: string;
  metaKeywords?: string | string[];
  image?: string;
  faqs?: SeoFaq[];
};

export type BlogContent = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  tags?: string[];
  image?: string;
  faqs?: SeoFaq[];
};

function asTextList(value?: string | string[]) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : value.split(",");
}

export function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength = 155) {
  const clean = stripHtml(value);
  if (clean.length <= maxLength) {
    return clean;
  }

  const clipped = clean.slice(0, maxLength - 1);
  return `${clipped.slice(0, Math.max(0, clipped.lastIndexOf(" ")))}...`;
}

function keywordsForService(service: ServiceContent) {
  return [
    service.title,
    service.description,
    service.longDescription,
    ...(service.features || []),
    ...asTextList(service.metaKeywords),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function keywordsForBlog(blog: BlogContent) {
  return [blog.title, blog.excerpt, blog.category, ...(blog.tags || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreAgainst(source: string, candidate: string) {
  const sourceTokens = new Set(
    source
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2),
  );
  const candidateTokens = candidate
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);

  return candidateTokens.reduce(
    (score, token) => score + (sourceTokens.has(token) ? 1 : 0),
    0,
  );
}

export function getPriorityServices(limit = 6) {
  const prioritySlugs = [
    "odoo-services-dubai",
    "odoo-erp-implementation-dubai",
    "erp-software-dubai",
    "ai-automation-dubai",
    "web-development-dubai",
    "it-solutions-dubai",
    "core-it-infrastructure-dubai",
  ];

  const bySlug = new Map(services.map((service) => [service.slug, service]));
  return prioritySlugs
    .map((slug) => bySlug.get(slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))
    .slice(0, limit);
}

export function getServiceDirectAnswer(service: ServiceContent) {
  const features = (service.features || []).slice(0, 4).join(", ");
  const scope = features ? ` Core capabilities include ${features}.` : "";

  return `${service.title} from Zavior Technologies helps Dubai and UAE businesses ${service.description.toLowerCase()}${scope}`;
}

export function getBlogDirectAnswer(blog: BlogContent) {
  return truncateText(blog.excerpt, 220);
}

export function getServiceFaqs(service: ServiceContent): SeoFaq[] {
  if (service.faqs?.length) {
    return service.faqs;
  }

  const featureAnswer = (service.features || []).length
    ? `Zavior Technologies can support ${service.features
        ?.slice(0, 5)
        .join(", ")} as part of ${service.title} delivery.`
    : service.description;

  return [
    {
      question: `What is ${service.title}?`,
      answer: service.description,
    },
    {
      question: `What does Zavior include in ${service.title}?`,
      answer: featureAnswer,
    },
    {
      question: `Who is ${service.title} for?`,
      answer: `${service.title} is for Dubai and UAE teams that want practical technology delivery, cleaner operations, and reliable implementation support.`,
    },
  ];
}

export function getBlogFaqs(blog: BlogContent): SeoFaq[] {
  if (blog.faqs?.length) {
    return blog.faqs;
  }

  const related = getRelevantServicesForBlog(blog, 2)
    .map((service) => service.title)
    .join(" and ");

  return [
    {
      question: `What is the main takeaway from ${blog.title}?`,
      answer: blog.excerpt,
    },
    {
      question: "How can Zavior Technologies help with this topic?",
      answer: related
        ? `Zavior Technologies can help through ${related}, with discovery, implementation, integration, and ongoing support for Dubai and UAE businesses.`
        : "Zavior Technologies can help Dubai and UAE businesses assess the workflow, choose the right technical approach, and implement a practical solution.",
    },
  ];
}

export function getRelatedServices(service: ServiceContent, limit = 3) {
  const source = keywordsForService(service);

  return services
    .filter((candidate) => candidate.slug !== service.slug)
    .map((candidate) => ({
      service: candidate,
      score: scoreAgainst(source, keywordsForService(candidate)),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ service: candidate }) => candidate)
    .slice(0, limit);
}

export function getRelatedBlogsForService(service: ServiceContent, limit = 3) {
  const source = keywordsForService(service);

  return blogs
    .map((blog) => ({
      blog,
      score: scoreAgainst(source, keywordsForBlog(blog)),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ blog }) => blog)
    .slice(0, limit);
}

export function getRelevantServicesForBlog(blog: BlogContent, limit = 3) {
  const source = keywordsForBlog(blog);

  return services
    .map((service) => ({
      service,
      score: scoreAgainst(source, keywordsForService(service)),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ service }) => service)
    .slice(0, limit);
}

export function getRelatedBlogs(blog: BlogContent, limit = 2) {
  const source = keywordsForBlog(blog);

  return blogs
    .filter((candidate) => candidate.slug !== blog.slug)
    .map((candidate) => ({
      blog: candidate,
      score:
        candidate.category === blog.category
          ? scoreAgainst(source, keywordsForBlog(candidate)) + 3
          : scoreAgainst(source, keywordsForBlog(candidate)),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ blog: candidate }) => candidate)
    .slice(0, limit);
}
