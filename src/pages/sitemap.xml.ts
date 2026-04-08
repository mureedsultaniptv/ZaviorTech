import type { GetServerSideProps } from "next";
import { getSitemapEntries } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = getSitemapEntries();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${absoluteUrl(entry.path)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
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
