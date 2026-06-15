import Fuse, { type FuseOptionKey, type FuseResult } from "fuse.js";
import demoData from "@/lib/demo-data.json";

export const CHATBOT_FALLBACK_REPLY =
  "I can only answer questions related to our services, blogs, and company information. Please contact our team for further assistance.";

const SEARCH_KEYS: FuseOptionKey<SearchRecord>[] = [
  { name: "title", weight: 0.22 },
  { name: "name", weight: 0.18 },
  { name: "service", weight: 0.18 },
  { name: "category", weight: 0.12 },
  { name: "keywords", weight: 0.14 },
  { name: "description", weight: 0.1 },
  { name: "answer", weight: 0.04 },
  { name: "content", weight: 0.02 },
];

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "am",
  "an",
  "and",
  "are",
  "be",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "have",
  "how",
  "into",
  "is",
  "our",
  "please",
  "provide",
  "show",
  "tell",
  "that",
  "the",
  "their",
  "there",
  "this",
  "today",
  "what",
  "when",
  "where",
  "which",
  "with",
  "you",
  "your",
]);

const TOKEN_SYNONYMS: Record<string, string[]> = {
  app: ["application", "applications"],
  application: ["app", "apps"],
  apps: ["app", "application", "applications"],
  artificial: ["ai"],
  automation: ["automate"],
  build: ["built", "create", "development", "develop"],
  company: ["information", "zavior"],
  develop: ["development", "build", "create"],
  digital: ["transformation", "online"],
  info: ["information", "company"],
  mobile: ["android", "ios", "application", "app"],
  site: ["website", "web"],
  support: ["maintenance"],
  website: ["web", "site"],
};

type JsonRecord = Record<string, unknown>;

type KnowledgeSource = {
  site?: JsonRecord;
  companies?: JsonRecord[];
  services?: JsonRecord[];
  projects?: JsonRecord[];
  blogs?: JsonRecord[];
  team?: JsonRecord[];
  testimonials?: JsonRecord[];
  careers?: JsonRecord[];
  faqs?: JsonRecord[];
  stats?: JsonRecord;
  milestones?: JsonRecord[];
};

type SearchRecordType =
  | "site"
  | "company"
  | "service"
  | "project"
  | "blog"
  | "faq"
  | "team"
  | "testimonial"
  | "career"
  | "stats"
  | "milestone";

type SearchRecord = {
  id: string;
  type: SearchRecordType;
  title?: string;
  name?: string;
  service?: string;
  category?: string;
  keywords?: string[];
  description?: string;
  content?: string;
  answer?: string;
  details?: string[];
  tokens: Set<string>;
};

export type ChatSearchMatch = {
  id: string;
  type: SearchRecordType;
  title: string;
  score: number;
  reply: string;
};

let cachedRecords: SearchRecord[] | null = null;
let cachedFuse: Fuse<SearchRecord> | null = null;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readRecordArray(value: unknown): JsonRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function readStringArray(value: unknown): string[] {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => normalizeWhitespace(item))
      .filter(Boolean);
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? normalizeWhitespace(item) : ""))
    .filter(Boolean);
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function htmlToText(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const text = value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&mdash;/gi, "-")
    .replace(/&ndash;/gi, "-");

  return normalizeWhitespace(text);
}

function keywordValues(...values: unknown[]): string[] {
  return values.flatMap(readStringArray);
}

function tokenize(value: string): string[] {
  const tokens = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .map(normalizeToken)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));

  return [...new Set(tokens)];
}

function normalizeToken(token: string): string {
  if (token.length > 4 && token.endsWith("ies")) {
    return `${token.slice(0, -3)}y`;
  }

  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
    return token.slice(0, -1);
  }

  return token;
}

function expandedTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens);

  for (const token of tokens) {
    for (const synonym of TOKEN_SYNONYMS[token] ?? []) {
      expanded.add(normalizeToken(synonym));
    }
  }

  return [...expanded];
}

function searchTextFor(record: Omit<SearchRecord, "tokens">): string {
  return [
    record.title,
    record.name,
    record.service,
    record.category,
    ...(record.keywords ?? []),
    record.description,
    record.content,
    record.answer,
  ]
    .filter(Boolean)
    .join(" ");
}

function pushRecord(
  records: SearchRecord[],
  record: Omit<SearchRecord, "tokens">,
) {
  const searchText = searchTextFor(record);

  if (!searchText.trim()) {
    return;
  }

  records.push({
    ...record,
    tokens: new Set(tokenize(searchText)),
  });
}

function buildRecords(): SearchRecord[] {
  const source = demoData as KnowledgeSource;
  const records: SearchRecord[] = [];

  if (source.site) {
    const site = source.site;
    pushRecord(records, {
      id: "site",
      type: "site",
      title: readString(site.title),
      name: readString(site.name),
      service: readString(site.service),
      category: readString(site.category),
      keywords: [
        ...keywordValues(site.keywords),
        "contact",
        "email",
        "phone",
        "company information",
      ],
      description: readString(site.description),
      content: [
        readString(site.url),
        readString(site.email),
        readString(site.telephone),
        readString(site.headquarters),
      ]
        .filter(Boolean)
        .join(" "),
      details: [
        readString(site.email),
        readString(site.telephone),
        readString(site.headquarters),
      ].filter((item): item is string => Boolean(item)),
    });
  }

  for (const company of source.companies ?? []) {
    const name = readString(company.name);
    const services = readStringArray(company.services);
    pushRecord(records, {
      id: `company-${readString(company.id) ?? name ?? records.length}`,
      type: "company",
      title: name,
      name,
      service: services.join(", "),
      category: readString(company.sector) ?? "Company Information",
      keywords: keywordValues(company.sector, company.headquarters, services),
      description: readString(company.description),
      content: readString(company.overview),
      details: [
        readString(company.shortDescription),
        readString(company.headquarters),
        ...services,
      ].filter(Boolean) as string[],
    });
  }

  for (const service of source.services ?? []) {
    const title = readString(service.title);
    const content = htmlToText(readString(service.longDescription));
    const features = readStringArray(service.features);
    const faqs = readRecordArray(service.faqs);
    const keywords = keywordValues(
      service.keywords,
      service.metaKeywords,
      service.metaTitle,
      features,
      title,
    );

    pushRecord(records, {
      id: `service-${readString(service.id) ?? title ?? records.length}`,
      type: "service",
      title,
      service: title,
      category: readString(service.category) ?? "Service",
      keywords,
      description: readString(service.description),
      content,
      details: features,
    });

    for (const faq of faqs) {
      const question = readString(faq.question);
      pushRecord(records, {
        id: `service-faq-${readString(service.id) ?? title ?? records.length}-${question ?? records.length}`,
        type: "faq",
        title: question,
        service: title,
        category: title,
        keywords,
        description: readString(service.description),
        content,
        answer: readString(faq.answer),
      });
    }
  }

  for (const project of source.projects ?? []) {
    const title = readString(project.title);
    const technologies = readStringArray(project.technologies);
    pushRecord(records, {
      id: `project-${readString(project.id) ?? title ?? records.length}`,
      type: "project",
      title,
      name: readString(project.client),
      service: readString(project.category),
      category: readString(project.category),
      keywords: keywordValues(project.metaKeywords, technologies),
      description: readString(project.description),
      content: htmlToText(readString(project.projectOverview)),
      details: technologies,
    });
  }

  for (const blog of source.blogs ?? []) {
    const title = readString(blog.title);
    const tags = readStringArray(blog.tags);
    const faqs = readRecordArray(blog.faqs);
    const keywords = keywordValues(blog.keywords, tags, blog.metaKeywords, title);

    pushRecord(records, {
      id: `blog-${readString(blog.id) ?? title ?? records.length}`,
      type: "blog",
      title,
      category: readString(blog.category),
      keywords,
      description: readString(blog.excerpt) ?? readString(blog.metaDescription),
      content: htmlToText(readString(blog.content)),
      details: [
        readString(blog.readTime),
        readString(blog.publishedAt),
      ].filter(Boolean) as string[],
    });

    for (const faq of faqs) {
      const question = readString(faq.question);
      pushRecord(records, {
        id: `blog-faq-${readString(blog.id) ?? title ?? records.length}-${question ?? records.length}`,
        type: "faq",
        title: question,
        category: readString(blog.category),
        keywords,
        description: readString(blog.excerpt),
        content: htmlToText(readString(blog.content)),
        answer: readString(faq.answer),
      });
    }
  }

  for (const member of source.team ?? []) {
    const name = readString(member.name);
    const role = readString(member.role);
    pushRecord(records, {
      id: `team-${readString(member.id) ?? name ?? records.length}`,
      type: "team",
      title: role,
      name,
      category: "Team",
      keywords: keywordValues(role, member.experience, member.education),
      description: readString(member.bio),
      content: htmlToText(readString(member.details)),
      details: [
        role,
        readString(member.experience),
        readString(member.education),
      ].filter(Boolean) as string[],
    });
  }

  for (const testimonial of source.testimonials ?? []) {
    const author = readString(testimonial.author);
    pushRecord(records, {
      id: `testimonial-${readString(testimonial.id) ?? author ?? records.length}`,
      type: "testimonial",
      title: readString(testimonial.company),
      name: author,
      category: "Testimonials",
      keywords: keywordValues(testimonial.role, testimonial.company),
      description: readString(testimonial.quote),
      details: [
        readString(testimonial.role),
        readString(testimonial.company),
      ].filter(Boolean) as string[],
    });
  }

  for (const career of source.careers ?? []) {
    const title = readString(career.title);
    const requirements = readStringArray(career.requirements);
    const benefits = readStringArray(career.benefits);
    pushRecord(records, {
      id: `career-${readString(career.id) ?? title ?? records.length}`,
      type: "career",
      title,
      service: title,
      category: readString(career.department) ?? "Careers",
      keywords: keywordValues(
        career.department,
        career.location,
        career.type,
        career.experience,
        requirements,
      ),
      description: readString(career.description),
      content: [...requirements, ...benefits].join(" "),
      details: [
        readString(career.location),
        readString(career.type),
        readString(career.experience),
        ...requirements.slice(0, 4),
      ].filter(Boolean) as string[],
    });
  }

  for (const faq of source.faqs ?? []) {
    const question = readString(faq.question);
    pushRecord(records, {
      id: `faq-${question ?? records.length}`,
      type: "faq",
      title: question,
      category: "FAQ",
      keywords: keywordValues(question),
      answer: readString(faq.answer),
    });
  }

  if (source.stats) {
    const projects = readNumber(source.stats.projects);
    const clients = readNumber(source.stats.clients);
    const countries = readNumber(source.stats.countries);
    const team = readNumber(source.stats.team);
    pushRecord(records, {
      id: "stats",
      type: "stats",
      title: "Company statistics",
      category: "Company Information",
      keywords: ["projects", "clients", "countries", "team", "stats"],
      description: [
        projects !== undefined ? `${projects}+ projects` : undefined,
        clients !== undefined ? `${clients}+ clients` : undefined,
        countries !== undefined ? `${countries} countries` : undefined,
        team !== undefined ? `${team}+ team members` : undefined,
      ]
        .filter(Boolean)
        .join(", "),
    });
  }

  for (const milestone of source.milestones ?? []) {
    const title = readString(milestone.title);
    const year = readNumber(milestone.year);
    pushRecord(records, {
      id: `milestone-${year ?? title ?? records.length}`,
      type: "milestone",
      title,
      category: "Company Information",
      keywords: keywordValues(year?.toString(), title),
      description: readString(milestone.description),
      details: year !== undefined ? [year.toString()] : [],
    });
  }

  return records;
}

function getRecords(): SearchRecord[] {
  cachedRecords ??= buildRecords();
  return cachedRecords;
}

function getFuse(): Fuse<SearchRecord> {
  cachedFuse ??= new Fuse(getRecords(), {
    keys: SEARCH_KEYS,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.42,
  });

  return cachedFuse;
}

function overlapScore(queryTokens: string[], record: SearchRecord): number {
  return expandedTokens(queryTokens).reduce((score, token) => {
    return record.tokens.has(token) ? score + 1 : score;
  }, 0);
}

function isAcceptableMatch(
  queryTokens: string[],
  result: FuseResult<SearchRecord>,
): boolean {
  const score = result.score ?? 1;
  const overlap = overlapScore(queryTokens, result.item);

  if (overlap === 0) {
    return false;
  }

  if (overlap >= 2) {
    return score <= 0.98;
  }

  return score <= 0.38;
}

function adjustedScore(
  queryTokens: string[],
  result: FuseResult<SearchRecord>,
): number {
  const baseScore = result.score ?? 1;
  const overlap = overlapScore(queryTokens, result.item);
  const serviceBoost = result.item.type === "service" ? 0.04 : 0;
  const answerBoost = result.item.answer ? 0.02 : 0;

  return baseScore - overlap * 0.035 - serviceBoost - answerBoost;
}

function trimToLength(value: string, maxLength: number): string {
  const text = normalizeWhitespace(value);

  if (text.length <= maxLength) {
    return text;
  }

  const trimmed = text.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");

  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : trimmed.length)}...`;
}

function excerpt(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return trimToLength(value, 520);
}

function titleFor(record: SearchRecord): string {
  return (
    record.title ??
    record.name ??
    record.service ??
    record.category ??
    "Zavior Technologies"
  );
}

function buildReply(record: SearchRecord): string {
  if (record.answer) {
    return trimToLength(record.answer, 900);
  }

  const lines = [
    titleFor(record),
    record.description,
    !record.description ? excerpt(record.content) : undefined,
    record.details?.length ? `Details: ${record.details.slice(0, 8).join(", ")}` : undefined,
  ]
    .filter((line): line is string => Boolean(line))
    .map((line) => trimToLength(line, 900));

  return lines.length ? lines.join("\n\n") : CHATBOT_FALLBACK_REPLY;
}

export function searchKnowledge(
  message: string,
  limit = 3,
): ChatSearchMatch[] {
  const query = normalizeWhitespace(message);
  const queryTokens = tokenize(query);

  if (!query || queryTokens.length === 0) {
    return [];
  }

  const fuseQuery = queryTokens.join(" ");

  return getFuse()
    .search(fuseQuery, { limit: Math.max(limit * 4, 8) })
    .filter((result) => isAcceptableMatch(queryTokens, result))
    .sort((a, b) => adjustedScore(queryTokens, a) - adjustedScore(queryTokens, b))
    .slice(0, limit)
    .map((result) => ({
      id: result.item.id,
      type: result.item.type,
      title: titleFor(result.item),
      score: Math.max(0, adjustedScore(queryTokens, result)),
      reply: buildReply(result.item),
    }));
}

export function getChatbotReply(message: string): string {
  return searchKnowledge(message, 1)[0]?.reply ?? CHATBOT_FALLBACK_REPLY;
}
