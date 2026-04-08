import sanitizeHtml from "sanitize-html";
import { absoluteUrl, LEGACY_SITE_HOSTS, SITE_URL } from "@/lib/site";

type SafeRichTextProps = {
  className?: string;
  html: string;
};

function normalizeHref(href?: string) {
  if (!href) {
    return undefined;
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  if (/^(mailto:|tel:)/i.test(href)) {
    return href;
  }

  try {
    const url = new URL(href);
    if (LEGACY_SITE_HOSTS.has(url.host)) {
      return absoluteUrl(`${url.pathname}${url.search}${url.hash}`);
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function isExternalHref(href?: string) {
  if (!href || href.startsWith("/") || href.startsWith("#")) {
    return false;
  }

  if (/^(mailto:|tel:)/i.test(href)) {
    return true;
  }

  try {
    return new URL(href).origin !== SITE_URL;
  } catch {
    return false;
  }
}

export function SafeRichText({ className, html }: SafeRichTextProps) {
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: [
      "a",
      "blockquote",
      "br",
      "code",
      "em",
      "h2",
      "h3",
      "h4",
      "li",
      "ol",
      "p",
      "strong",
      "ul",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (_tagName, attribs) => {
        const href = normalizeHref(attribs.href);
        if (!href) {
          return {
            tagName: "span",
            attribs: {} as Record<string, string>,
          };
        }

        const external = isExternalHref(href);
        return {
          tagName: "a",
          attribs: external
            ? {
                href,
                target: "_blank",
                rel: "noopener noreferrer",
              } as Record<string, string>
            : {
                href,
              } as Record<string, string>,
        };
      },
    },
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
