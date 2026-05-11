import { blogs, careers, projects, services } from "@/lib/data/demo-data";

const STATIC_LASTMOD = "2026-05-11";

export type SitemapEntry = {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod: string;
  image?: string;
};

export const staticSiteRoutes = [
  "/",
  "/about",
  "/services",
  "/companies",
  "/portfolio",
  "/blog",
  "/careers",
  "/contact",
  "/faq",
  "/cookies",
  "/privacy",
  "/terms",
];

export function getAllSiteRoutes() {
  return [
    ...staticSiteRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/portfolio/${project.slug}`),
    ...blogs.map((blog) => `/blog/${blog.slug}`),
    ...careers.map((career) => `/careers/${career.id}`),
  ];
}

export function getSitemapEntries(): SitemapEntry[] {
  return [
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
    })),
    ...projects.map((project) => ({
      path: `/portfolio/${project.slug}`,
      priority: 0.9,
      changefreq: "monthly" as const,
      lastmod: STATIC_LASTMOD,
      image: project.image,
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
    })),
    ...careers.map((career) => ({
      path: `/careers/${career.id}`,
      priority: 0.7,
      changefreq: "weekly" as const,
      lastmod: career.postedAt || STATIC_LASTMOD,
    })),
  ];
}
