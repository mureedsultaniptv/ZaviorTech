import Head from "next/head";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";
import { SEO_LANGUAGE, SEO_LOCALE } from "@/lib/seo";

type SeoHeadProps = {
  canonical?: string;
  description?: string;
  image?: string;
  keywords?: string;
  path?: string;
  robots?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  structuredDataId?: string;
  title?: string;
  type?: "article" | "website";
};

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function SeoHead(props: SeoHeadProps) {
  const {
    canonical,
    description = SITE_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    keywords,
    path = "/",
    robots = "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    structuredData,
    structuredDataId = "structured-data",
    title = SITE_NAME,
    type = "website",
  } = props;
  const canonicalUrl = absoluteUrl(canonical || path);
  const imageUrl = absoluteUrl(image);
  const logoUrl =
    "https://www.zavior.org/_next/image?url=%2Fzaviorlogo-light.png&w=1080&q=75";

  return (
    <Head>
      <title>{title}</title>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta key="description" name="description" content={description} />
      {keywords ? (
        <meta key="keywords" name="keywords" content={keywords} />
      ) : null}
      <meta key="robots" name="robots" content={robots} />
      <meta key="format-detection" name="format-detection" content="telephone=no" />
      <meta key="geo.region" name="geo.region" content="AE-DU" />
      <meta key="geo.placename" name="geo.placename" content="Dubai" />
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      <link key="alternate-en-ae" rel="alternate" hrefLang={SEO_LANGUAGE} href={canonicalUrl} />
      <link key="alternate-default" rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:locale" property="og:locale" content={SEO_LOCALE} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="og:logo" property="og:logo" content={logoUrl} />
      <meta key="og:image:alt" property="og:image:alt" content={`${title} - ${SITE_NAME}`} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      {structuredData ? (
        <script
          key={structuredDataId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(structuredData),
          }}
        />
      ) : null}
    </Head>
  );
}
