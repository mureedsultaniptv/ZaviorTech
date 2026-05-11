import { Html, Head, Main, NextScript } from "next/document";
import { SEO_LANGUAGE } from "@/lib/seo";

export default function Document() {
  return (
    <Html lang={SEO_LANGUAGE}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
