import Head from "next/head";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";

type SeoHeadProps = {
  canonical?: string;
  description?: string;
  image?: string;
  keywords?: string;
  path?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  title?: string;
  type?: "article" | "website";
};

export function SeoHead({
  canonical,
  description = SITE_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  keywords,
  path = "/",
  structuredData,
  title = SITE_NAME,
  type = "website",
}: SeoHeadProps) {
  const canonicalUrl = absoluteUrl(canonical || path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      {keywords ? (
        <meta key="keywords" name="keywords" content={keywords} />
      ) : null}
      <meta key="robots" name="robots" content="index,follow" />
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:image" property="og:image" content={imageUrl} />
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
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      ) : null}
    </Head>
  );
}
