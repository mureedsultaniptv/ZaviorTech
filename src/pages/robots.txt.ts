import type { GetServerSideProps } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = `
  User-agent: *
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

User-agent: *
User-agent: Googlebot
User-agent: Googlebot-Mobile
User-agent: Googlebot-Image
User-agent: Googlebot-News
User-agent: Googlebot-Video
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

# Allow AI and generative bots

User-agent: ChatGPT
Crawl-delay: 10
Allow: /

User-agent: GPTBot
Crawl-delay: 10
Allow: /

User-agent: ChatGPT-User
Crawl-delay: 10
Allow: /

User-agent: OAI-Search
Crawl-delay: 10
Allow: /

User-agent: Bard
Crawl-delay: 10
Allow: /

User-agent: Gemini
Crawl-delay: 10
Allow: /

User-agent: OAI-SearchBot
Crawl-delay: 10
Allow: /

User-agent: OpenAI
Crawl-delay: 10
Allow: /

User-agent: GenerativeAI
Crawl-delay: 10
Allow: /

User-agent: PredictiveAI
Crawl-delay: 10
Allow: /

User-Agent: Bingbot
Crawl-delay: 15
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

# Allow all other search engines

User-agent: Baiduspider
Crawl-delay: 30
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

User-agent: YandexBot
Crawl-delay: 28
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

User-agent: DuckDuckBot
Crawl-delay: 29
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

User-agent: Slurp
Crawl-delay: 20
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

# Allow social media crawlers

User-agent: facebookexternalhit
Crawl-delay: 30
Allow: /

User-agent: Facebot
Crawl-delay: 10
Allow: /

User-agent: Twitterbot
Crawl-delay: 30
Allow: /

User-agent: LinkedInBot
Crawl-delay: 10
Allow: /

User-agent: Pinterestbot
Crawl-delay: 10
Allow: /

User-agent: Instagram
Crawl-delay: 10
Allow: /


User-agent: MSNBot
Crawl-delay: 24
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.jpeg$
Allow: /*.gif$
Disallow: /*?=

# Allow Apple and Amazon bots

User-agent: Applebot
Crawl-delay: 17
Allow: /

User-agent: AlexaCrawler
Crawl-delay: 40
Allow: /

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
