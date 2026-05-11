const FALLBACK_SITE_URL = "https://zavior.org";

export const SITE_NAME = "Zavior Technologies";
export const SITE_TITLE =
  "Zavior Technologies | Odoo ERP, AI Automation & Web Development Dubai";
export const SITE_DESCRIPTION =
  "Dubai and UAE technology partner for Odoo ERP implementation, AI automation, web development, mobile apps, IT solutions, and digital transformation.";
export const DEFAULT_OG_IMAGE = "/zaviorlogo-dark.png";
export const LEGACY_SITE_HOSTS = new Set(["zaviortech.vercel.app"]);

function normalizeSiteUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
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
