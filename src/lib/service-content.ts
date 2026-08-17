export type ServiceContentItem = {
  title: string;
  description: string;
};

export type ServiceContentSection = {
  title: string;
  introduction: string;
  items: ServiceContentItem[];
};

const entityMap: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  ndash: "–",
  mdash: "—",
};

function decodeEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (entity, name) => entityMap[name.toLowerCase()] ?? entity);
}

function plainText(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function parseServiceContent(html: string): ServiceContentSection[] {
  const blocks = [...html.matchAll(/<(h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi)];
  const sections: ServiceContentSection[] = [];
  let section: ServiceContentSection | null = null;
  let item: ServiceContentItem | null = null;

  for (const block of blocks) {
    const tag = block[1].toLowerCase();
    const text = plainText(block[2]);
    if (!text) continue;

    if (tag === "h2") {
      section = { title: text, introduction: "", items: [] };
      sections.push(section);
      item = null;
      continue;
    }

    if (!section) continue;

    if (tag === "h3") {
      item = { title: text, description: "" };
      section.items.push(item);
      continue;
    }

    if (item) {
      item.description = item.description ? `${item.description} ${text}` : text;
    } else {
      section.introduction = section.introduction
        ? `${section.introduction} ${text}`
        : text;
    }
  }

  return sections;
}

export function findServiceSection(
  sections: ServiceContentSection[],
  patterns: RegExp[],
) {
  return sections.find((section) => patterns.some((pattern) => pattern.test(section.title)));
}

export function shortServiceTitle(title: string) {
  return title
    .replace(/\s+(?:Services?|Solutions?)\s+(?:for\s+Businesses\s+)?in\s+(?:Dubai|Sharjah|Abu Dhabi)(?:,?\s*UAE)?/gi, "")
    .replace(/\s+for\s+(?:Smarter\s+)?Businesses?\s+in\s+Dubai,?\s*UAE/gi, "")
    .replace(/\s+for\s+Businesses\s+in\s+(?:Sharjah|Abu Dhabi)/gi, "")
    .replace(/\s+Dubai\s+for\s+.+$/i, "")
    .replace(/\s+in\s+Dubai,?\s*UAE/gi, "")
    .replace(/\s+Dubai$/i, "")
    .trim();
}
