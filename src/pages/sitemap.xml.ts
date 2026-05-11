import type { GetServerSideProps } from "next";
import { getSitemapEntries } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = getSitemapEntries();
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
${entry.image ? `    <image:image>
      <image:loc>${escapeXml(absoluteUrl(entry.image))}</image:loc>
    </image:image>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default function SitemapXml() {
  return null;
}
