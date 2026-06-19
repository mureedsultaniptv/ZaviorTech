import type { GetServerSideProps } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = `User-agent: *
Allow: /
Allow: /services/
Allow: /blog/
Allow: /portfolio/
Allow: /companies
Allow: /careers/
Allow: /contact
Allow: /faq
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /chat
Disallow: /search
Disallow: /*?*
Disallow: /*?query=
Disallow: /*?s=

Host: ${SITE_URL}
Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default function RobotsTxt() {
  return null;
}
