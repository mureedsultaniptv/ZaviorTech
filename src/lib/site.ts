const CANONICAL_HOST = "www.zavior.org";
const FALLBACK_SITE_URL = `https://${CANONICAL_HOST}`;

export const SITE_NAME = "Zavior Technologies";
export const SITE_TITLE = "Odoo ERP, AI Automation & Web Development Dubai | Zavior";
export const SITE_DESCRIPTION =
  "Zavior Technologies helps Dubai and UAE companies implement Odoo ERP, AI automation, custom websites, mobile apps, IT solutions, and core infrastructure.";
export const DEFAULT_OG_IMAGE = "/zavior-og-image.png";
export const SITE_EMAIL = "info@zavior.org";
export const SITE_TELEPHONE = "+971508185948";
export const SITE_HEADQUARTERS = "Sharjah, United Arab Emirates";
export const LEGACY_SITE_HOSTS = new Set(["zavior.org", "zaviortech.vercel.app"]);

function normalizeSiteUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    if (url.hostname === "zavior.org") {
      url.hostname = CANONICAL_HOST;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export const SITE_URL =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL) ??
  FALLBACK_SITE_URL;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      if (LEGACY_SITE_HOSTS.has(url.host)) {
        return absoluteUrl(`${url.pathname}${url.search}${url.hash}`);
      }

      return url.toString();
    } catch {
      return path;
    }
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${SITE_URL}/`).toString();
}

export function cleanPath(pathname: string) {
  const [pathWithoutHash] = pathname.split("#");
  const [pathWithoutQuery] = pathWithoutHash.split("?");
  return pathWithoutQuery || "/";
}

export function whatsappUrl(message = "Hi Zavior, I would like to discuss a project with your team.") {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_TELEPHONE;
  const number = rawNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
