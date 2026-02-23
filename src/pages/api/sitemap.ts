// src/pages/api/generate-sitemap.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { careers, projects, blogs, services } from "@/lib/data/demo-data"; 

const SITE_URL = "https://zaviortech.vercel.app"; // Your live site URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const staticPages = ["", "about", "contact", "careers", "faq", "privacy", "terms"];

    const urls = [
      ...staticPages.map((page) => ({
        loc: `${SITE_URL}${page ? `/${page}` : ""}`,
        priority: 0.8,
      })),
      ...careers.map((p) => ({ loc: `${SITE_URL}/careers/${p.id}`, priority: 0.9 })),
      ...projects.map((p) => ({ loc: `${SITE_URL}/portfolio/${p.slug}`, priority: 0.9 })),
      ...blogs.map((b) => ({ loc: `${SITE_URL}/blog/${b.slug}`, priority: 0.9 })),
      ...services.map((b) => ({ loc: `${SITE_URL}/services/${b.slug}`, priority: 0.9 })),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    // Write sitemap.xml to public folder
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(filePath, sitemap);

    res.status(200).json({ message: "sitemap.xml generated successfully", path: "/sitemap.xml" });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).json({ error: "Failed to generate sitemap.xml" });
  }
}
