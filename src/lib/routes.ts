import { blogs, careers, projects, services, team } from "@/lib/data/demo-data";
import { isIndexablePath } from "@/lib/route-indexing";

export { isIndexablePath } from "@/lib/route-indexing";

const STATIC_LASTMOD = "2026-06-18";

export type SitemapEntry = {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod: string;
  image?: string;
  imageTitle?: string;
};

export const staticSiteRoutes = [
  "/",
  "/about",
  "/why-zavior",
  "/services",
  "/companies",
  "/portfolio",
  "/blog",
  "/careers",
  "/team",
  "/contact",
  "/faq",
  "/cookies",
  "/privacy",
  "/terms",
];

function uniqueIndexableEntries(entries: SitemapEntry[]) {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (!isIndexablePath(entry.path) || seen.has(entry.path)) {
      return false;
    }

    seen.add(entry.path);
    return true;
  });
}

export function getAllSiteRoutes() {
  return [
    ...staticSiteRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/portfolio/${project.slug}`),
    ...blogs.map((blog) => `/blog/${blog.slug}`),
    ...careers.map((career) => `/careers/${career.id}`),
    ...team.map((member) => `/team/${member.slug}`),
  ].filter(isIndexablePath);
}

export function getSitemapEntries(): SitemapEntry[] {
  return uniqueIndexableEntries([
    ...staticSiteRoutes.map((path) => ({
      path,
      priority: path === "/" ? 1 : 0.8,
      changefreq: "monthly" as const,
      lastmod: STATIC_LASTMOD,
    })),
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.9,
      changefreq: "monthly" as const,
      lastmod: STATIC_LASTMOD,
      image: service.image,
      imageTitle: service.title,
    })),
    ...projects.map((project) => ({
      path: `/portfolio/${project.slug}`,
      priority: 0.9,
      changefreq: "monthly" as const,
      lastmod: STATIC_LASTMOD,
      image: project.image,
      imageTitle: project.title,
    })),
    ...blogs.map((blog) => ({
      path: `/blog/${blog.slug}`,
      priority: 0.9,
      changefreq: "monthly" as const,
      lastmod:
        "updatedAt" in blog && blog.updatedAt
          ? blog.updatedAt
          : blog.publishedAt,
      image: blog.image,
      imageTitle: blog.title,
    })),
    ...careers.map((career) => ({
      path: `/careers/${career.id}`,
      priority: 0.7,
      changefreq: "weekly" as const,
      lastmod: career.postedAt || STATIC_LASTMOD,
    })),
    ...team.map((member) => ({
      path: `/team/${member.slug}`,
      priority: 0.5,
      changefreq: "yearly" as const,
      lastmod: STATIC_LASTMOD,
      image: member.image,
      imageTitle: member.name,
    })),
  ]);
}
