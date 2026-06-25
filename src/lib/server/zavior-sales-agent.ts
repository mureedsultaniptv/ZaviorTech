import { isRecord, type LeadInfo, type StoredChatMessage } from "@/lib/server/lead-chat";

export type RecommendedLink = {
  title: string;
  url: string;
  type: "service" | "project" | "company" | "product";
};

export type SalesAgentResponse = {
  message: string;
  recommendedLinks: RecommendedLink[];
  whatsappUrl: string;
  leadIntent: boolean;
};

type SearchItem = RecommendedLink & {
  score: number;
  text: string;
  description: string;
  features: string[];
};

type RelevantSolutions = {
  services: SearchItem[];
  projects: SearchItem[];
  companies: SearchItem[];
  products: SearchItem[];
  recommendedLinks: RecommendedLink[];
};

type SalesPromptOptions = {
  lead: LeadInfo;
  latestMessage: string;
  whatsappUrl: string;
};

const DEFAULT_WHATSAPP_NUMBER = "971508185948";
const WHATSAPP_TEXT =
  "Hi Zavior, I need software for my business";
const KEYWORD_STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "need",
  "want",
  "software",
  "system",
  "business",
  "company",
  "please",
  "have",
  "from",
  "that",
  "this",
  "your",
  "our",
  "can",
  "you",
]);

const BUSINESS_EXPANSIONS: Array<[RegExp, string[]]> = [
  [
    /\b(bike|bikes|motorcycle|motorcycles|vehicle|vehicles|car|cars|automobile|auto|showroom|exchange|dealer|dealership)\b/i,
    [
      "erp",
      "odoo",
      "inventory",
      "stock",
      "crm",
      "sales",
      "purchase",
      "receipt",
      "customer",
      "automobile",
      "dashboard",
    ],
  ],
  [
    /\b(receipt|receipts|invoice|invoices|payments?|profit|accounting|records?)\b/i,
    ["erp", "odoo", "accounting", "sales", "reports", "dashboard"],
  ],
  [
    /\b(customer|customers|lead|leads|crm|follow.?up)\b/i,
    ["crm", "sales", "dashboard", "erp", "odoo"],
  ],
  [
    /\b(stock|inventory|warehouse|product|products|items?)\b/i,
    ["inventory", "erp", "odoo", "warehouse", "stock"],
  ],
  [
    /\b(website|site|landing|seo|online presence)\b/i,
    ["website", "web", "development", "seo"],
  ],
  [
    /\b(app|mobile|android|ios|booking)\b/i,
    ["mobile", "application", "app"],
  ],
  [
    /\b(automation|automate|manual|workflow|ai|chatbot|bot)\b/i,
    ["automation", "ai", "workflow", "chatbot"],
  ],
];

function stripHtml(value: unknown) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getKeywords(message: string, history: StoredChatMessage[] = []) {
  const baseText = normalizeText(
    [
      ...history
        .filter((entry) => entry.role === "user")
        .slice(-6)
        .map((entry) => entry.content),
      message,
    ].join(" "),
  );
  const keywords = new Set(
    baseText
      .split(/\s+/)
      .filter((word) => word.length > 2 && !KEYWORD_STOPWORDS.has(word)),
  );

  for (const [pattern, expansions] of BUSINESS_EXPANSIONS) {
    if (pattern.test(baseText)) {
      expansions.forEach((word) => keywords.add(word));
    }
  }

  return [...keywords];
}

function getServiceUrl(slug: string) {
  return `/services/${slug}`;
}

function getProjectUrl(slug: string) {
  return `/portfolio/${slug}`;
}

function createSearchText(values: unknown[]) {
  return normalizeText(values.map(stripHtml).join(" "));
}

function toServiceItems(demoData: unknown): SearchItem[] {
  if (!isRecord(demoData) || !Array.isArray(demoData.services)) {
    return [];
  }

  return demoData.services.filter(isRecord).map((service) => {
    const slug = readString(service.slug);
    const title = readString(service.title);
    const features = readStringArray(service.features);
    const description = readString(service.description);

    return {
      title,
      url: getServiceUrl(slug),
      type: "service",
      score: 0,
      description,
      features,
      text: createSearchText([
        service.id,
        slug,
        title,
        description,
        service.longDescription,
        service.metaTitle,
        service.metaDescription,
        service.metaKeywords,
        features.join(" "),
      ]),
    };
  });
}

function toProjectItems(demoData: unknown): SearchItem[] {
  if (!isRecord(demoData) || !Array.isArray(demoData.projects)) {
    return [];
  }

  return demoData.projects.filter(isRecord).map((project) => {
    const slug = readString(project.slug);
    const title = readString(project.title);
    const technologies = readStringArray(project.technologies);
    const description = readString(project.description);

    return {
      title,
      url: getProjectUrl(slug),
      type: "project",
      score: 0,
      description,
      features: technologies,
      text: createSearchText([
        project.id,
        slug,
        title,
        project.category,
        project.client,
        description,
        project.projectOverview,
        project.metaTitle,
        project.metaDescription,
        project.metaKeywords,
        technologies.join(" "),
      ]),
    };
  });
}

function toCompanyItems(demoData: unknown): SearchItem[] {
  if (!isRecord(demoData) || !Array.isArray(demoData.companies)) {
    return [];
  }

  return demoData.companies.filter(isRecord).map((company) => {
    const title = readString(company.name);
    const services = readStringArray(company.services);
    const href = readString(company.href) || readString(company.website) || "/services";

    return {
      title,
      url: href,
      type: "company",
      score: 0,
      description: readString(company.description),
      features: services,
      text: createSearchText([
        company.id,
        company.slug,
        title,
        company.sector,
        company.description,
        company.shortDescription,
        company.overview,
        services.join(" "),
      ]),
    };
  });
}

function toProductItems(demoData: unknown): SearchItem[] {
  if (!isRecord(demoData) || !Array.isArray(demoData.products)) {
    return [];
  }

  return demoData.products.filter(isRecord).map((product) => {
    const slug = readString(product.slug);
    const title = readString(product.title) || readString(product.name);

    return {
      title,
      url: slug ? `/products/${slug}` : "/services",
      type: "product",
      score: 0,
      description: readString(product.description),
      features: readStringArray(product.features),
      text: createSearchText([
        product.id,
        slug,
        title,
        product.category,
        product.description,
        product.tags,
        product.features,
      ]),
    };
  });
}

function scoreItem(item: SearchItem, keywords: string[]) {
  let score = 0;
  const title = normalizeText(item.title);

  for (const keyword of keywords) {
    if (title.includes(keyword)) {
      score += 8;
    }

    if (item.text.includes(keyword)) {
      score += 2;
    }
  }

  if (/\b(erp|odoo|inventory|crm|receipt|records?|stock|showroom|exchange|automobile|bike|vehicle)\b/i.test(keywords.join(" "))) {
    if (/odoo|erp/i.test(item.title)) {
      score += 15;
    }

    if (/automobile|manufacturing|inventory|sales|crm|accounting/i.test(item.text)) {
      score += 8;
    }
  }

  if (
    keywords.some((keyword) =>
      ["bike", "vehicle", "automobile", "car", "showroom", "exchange", "dealer"].includes(keyword),
    ) &&
    /\b(automobile|vehicle|car|dealer|distributor|showroom)\b/i.test(item.text)
  ) {
    score += 35;
  }

  return score;
}

function sortAndLimit(items: SearchItem[], keywords: string[], limit: number) {
  return items
    .map((item) => ({
      ...item,
      score: scoreItem(item, keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function ensureDefaultService(
  relevantServices: SearchItem[],
  allServices: SearchItem[],
  message: string,
) {
  if (relevantServices.length) {
    return relevantServices;
  }

  const normalized = normalizeText(message);
  const preferred =
    allServices.find((service) => /odoo erp implementation/i.test(service.title)) ||
    allServices.find((service) => /erp|odoo/i.test(service.title)) ||
    allServices.find((service) => /web development/i.test(service.title)) ||
    allServices.find((service) => /mobile/i.test(service.title)) ||
    allServices.find((service) => /automation/i.test(service.title)) ||
    allServices[0];

  if (!preferred) {
    return relevantServices;
  }

  return [
    {
      ...preferred,
      score: normalized ? 1 : 0,
    },
  ];
}

function uniqueLinks(links: RecommendedLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.type}:${link.url}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return Boolean(link.title && link.url);
  });
}

export function findRelevantBusinessSolutions(
  userMessage: string,
  demoData: unknown,
  conversationHistory: StoredChatMessage[] = [],
): RelevantSolutions {
  const keywords = getKeywords(userMessage, conversationHistory);
  const allServices = toServiceItems(demoData);
  const services = ensureDefaultService(
    sortAndLimit(allServices, keywords, 4),
    allServices,
    userMessage,
  );
  const projects = sortAndLimit(toProjectItems(demoData), keywords, 4);
  const companies = sortAndLimit(toCompanyItems(demoData), keywords, 2);
  const products = sortAndLimit(toProductItems(demoData), keywords, 2);
  const recommendedLinks = uniqueLinks([
    ...services.slice(0, 2),
    ...projects.slice(0, 2),
    ...products.slice(0, 1),
    ...companies.slice(0, 1),
  ]).slice(0, 3).map(({ title, url, type }) => ({ title, url, type }));

  return {
    services,
    projects,
    companies,
    products,
    recommendedLinks,
  };
}

function summarizeItems(items: SearchItem[]) {
  return items.map((item) => ({
    title: item.title,
    type: item.type,
    url: item.url,
    description: item.description,
    features: item.features.slice(0, 8),
  }));
}

export function getSalesWhatsappUrl() {
  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.WHATSAPP_NUMBER ||
    DEFAULT_WHATSAPP_NUMBER;
  const number = rawNumber.replace(/[^\d]/g, "") || DEFAULT_WHATSAPP_NUMBER;

  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
}

export function buildSalesAgentPrompt(
  demoData: unknown,
  relevantItems: RelevantSolutions,
  conversationHistory: StoredChatMessage[],
  options: SalesPromptOptions,
) {
  const site = isRecord(demoData) && isRecord(demoData.site) ? demoData.site : {};
  const compactServices = toServiceItems(demoData).map((service) => ({
    title: service.title,
    url: service.url,
    description: service.description,
    features: service.features.slice(0, 8),
  }));
  const history = conversationHistory
    .slice(-10)
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join("\n");

  return [
    "You are the professional Zavior Technologies sales assistant.",
    "Use ONLY the supplied JSON-derived company, service, project, product, and link data. Do not invent services, projects, URLs, prices, guarantees, or case studies.",
    "Always identify the customer's business problem first, then recommend the most relevant Zavior service from the allowed services.",
    "Always include 1 to 3 relevant service/project links using only the allowed recommendedLinks values.",
    "Always include this WhatsApp CTA in the message: Talk to our customer care on WhatsApp: " +
      options.whatsappUrl,
    "Ask only one question at a time. Do not repeat the same intro. Keep the answer short, natural, persuasive, and sales-focused.",
    "Collect lead details naturally when missing: name, business type, required service, phone or WhatsApp number, budget, and timeline.",
    "If the customer is confused, guide them with business-specific suggestions. For showrooms, vehicle, bike, exchange, dealer, stock, receipts, records, or customers, suggest an ERP/Odoo or custom business management workflow using only the allowed Zavior service links.",
    "Return ONLY valid JSON with this exact shape: {\"message\":\"string\",\"recommendedLinks\":[{\"title\":\"string\",\"url\":\"string\",\"type\":\"service|project|company|product\"}],\"whatsappUrl\":\"string\",\"leadIntent\":true}.",
    `Company data: ${JSON.stringify({
      name: site.name,
      description: site.description,
      email: site.email,
      telephone: site.telephone,
      headquarters: site.headquarters,
      service: site.service,
      keywords: Array.isArray(site.keywords) ? site.keywords : [],
    })}`,
    `Allowed services: ${JSON.stringify(compactServices)}`,
    `Relevant matched items: ${JSON.stringify({
      services: summarizeItems(relevantItems.services),
      projects: summarizeItems(relevantItems.projects),
      products: summarizeItems(relevantItems.products),
      companies: summarizeItems(relevantItems.companies),
      recommendedLinks: relevantItems.recommendedLinks,
    })}`,
    `Current lead: ${JSON.stringify(options.lead)}`,
    history ? `Conversation history:\n${history}` : "Conversation history: none yet",
    `Latest user message: ${options.latestMessage}`,
  ].join("\n\n");
}

function parseJsonObject(rawText: string) {
  const trimmed = rawText.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)?.[1];
  const candidate = fenced || trimmed;
  const objectText =
    candidate.match(/\{[\s\S]*\}/)?.[0] ||
    candidate;

  try {
    const parsed: unknown = JSON.parse(objectText);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function coerceRecommendedLinks(
  value: unknown,
  allowedLinks: RecommendedLink[],
) {
  if (!Array.isArray(value)) {
    return allowedLinks.slice(0, 3);
  }

  const allowedByUrl = new Map(allowedLinks.map((link) => [link.url, link]));
  const links = value
    .filter(isRecord)
    .map((item) => {
      const url = readString(item.url);
      return allowedByUrl.get(url);
    })
    .filter((item): item is RecommendedLink => Boolean(item));

  return uniqueLinks(links).slice(0, 3);
}

export function normalizeSalesAgentResponse(
  rawText: string,
  fallback: SalesAgentResponse,
  relevantItems: RelevantSolutions,
  whatsappUrl: string,
): SalesAgentResponse {
  const parsed = parseJsonObject(rawText);
  if (!parsed) {
    return fallback;
  }

  const message = stripHtml(parsed.message).slice(0, 1600);

  if (!message) {
    return fallback;
  }

  const cta = `Talk to our customer care on WhatsApp: ${whatsappUrl}`;
  const messageWithCta = message.includes(whatsappUrl)
    ? message
    : `${message}\n\n${cta}`;

  return {
    message: messageWithCta,
    recommendedLinks: coerceRecommendedLinks(
      parsed.recommendedLinks,
      relevantItems.recommendedLinks,
    ),
    whatsappUrl,
    leadIntent:
      typeof parsed.leadIntent === "boolean"
        ? parsed.leadIntent
        : fallback.leadIntent,
  };
}

function inferBusinessPhrase(message: string) {
  const normalized = normalizeText(message);
  if (/\b(bike|motorcycle|vehicle|automobile|car|showroom|exchange|dealer)\b/.test(normalized)) {
    return "bike exchange showroom";
  }

  if (/\bfurniture\b/.test(normalized)) {
    return "furniture business";
  }

  if (/\bmanufacturing|factory|production\b/.test(normalized)) {
    return "manufacturing business";
  }

  if (/\brestaurant|cafe\b/.test(normalized)) {
    return "restaurant business";
  }

  return "business";
}

function getPrimaryService(relevantItems: RelevantSolutions) {
  return (
    relevantItems.services[0]?.title ||
    "ERP & Odoo Solutions"
  );
}

export function buildSalesFallbackResponse(
  userMessage: string,
  relevantItems: RelevantSolutions,
  conversationHistory: StoredChatMessage[],
  whatsappUrl: string,
): SalesAgentResponse {
  const primaryService = getPrimaryService(relevantItems);
  const businessPhrase = inferBusinessPhrase(
    [
      ...conversationHistory
        .filter((entry) => entry.role === "user")
        .slice(-4)
        .map((entry) => entry.content),
      userMessage,
    ].join(" "),
  );
  const isVehicleShowroom = businessPhrase === "bike exchange showroom";
  const suggestion = isVehicleShowroom
    ? "It can manage bike inventory, purchase and sale records, exchange history, customer profiles, receipt printing, payment history, profit reports, and staff access."
    : "It can organize operations, customer records, sales, inventory, reporting, and approvals in one system.";
  const question = isVehicleShowroom
    ? "May I know how many bikes you normally manage in your showroom?"
    : "What is the main workflow you want to manage first?";

  return {
    message: `Perfect, for a ${businessPhrase} we recommend ${primaryService}. ${suggestion} Talk to our customer care on WhatsApp: ${whatsappUrl}\n\n${question}`,
    recommendedLinks: relevantItems.recommendedLinks.slice(0, 3),
    whatsappUrl,
    leadIntent: true,
  };
}
