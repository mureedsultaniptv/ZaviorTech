import { site } from "@/lib/data/demo-data";

const CANONICAL_HOST = "www.zavior.org";
const FALLBACK_SITE_URL = `https://${CANONICAL_HOST}`;

export const SITE_NAME = site.name;
export const SITE_TITLE = site.title;
export const SITE_DESCRIPTION = site.description;
export const DEFAULT_OG_IMAGE = "/zaviorlogo-dark.webp";
export const SITE_EMAIL = site.email;
export const SITE_TELEPHONE = site.telephone;
export const SITE_HEADQUARTERS = site.headquarters;
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
