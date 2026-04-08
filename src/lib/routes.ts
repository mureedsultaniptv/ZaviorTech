import { blogs, careers, projects, services } from "@/lib/data/demo-data";

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

export function getSitemapEntries() {
  return [
    ...staticSiteRoutes.map((path) => ({
      path,
      priority: path === "/" ? 1 : 0.8,
      changefreq: "monthly",
    })),
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.9,
      changefreq: "monthly",
    })),
    ...projects.map((project) => ({
      path: `/portfolio/${project.slug}`,
      priority: 0.9,
      changefreq: "monthly",
    })),
    ...blogs.map((blog) => ({
      path: `/blog/${blog.slug}`,
      priority: 0.9,
      changefreq: "monthly",
    })),
    ...careers.map((career) => ({
      path: `/careers/${career.id}`,
      priority: 0.7,
      changefreq: "weekly",
    })),
  ];
}
