"use client";

import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { SeoHead } from "@/components/seo/seo-head";
import { cleanPath, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { isIndexablePath } from "@/lib/route-indexing";
import {
  jsonLdGraph,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "@/styles/globals.css";
import Head from "next/head";
import { DeferredAnalytics } from "@/components/performance/deferred-analytics";
import { DeferredChatWidget } from "@/components/performance/deferred-chat-widget";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const rawPath = router.asPath || "/";
  const currentPath = cleanPath(rawPath);
  const isIndexable = isIndexablePath(currentPath) && !rawPath.includes("?");

  return (
    <>
      <SeoHead
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        path={currentPath}
        robots={
          isIndexable
            ? undefined
            : "noindex,nofollow,noarchive,nosnippet,noimageindex"
        }
        structuredData={jsonLdGraph([
          professionalServiceJsonLd(),
          websiteJsonLd(),
        ])}
        structuredDataId="site-identity-structured-data"
      />
      <Head>
        <meta
          name="google-site-verification"
          content="DgJZYmiKANOgaq-k-_MY-dExp-x0YgIV_DM6YG4pKW8"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWLSP25R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>
          <Navigation />
          <main className="site-shell-v2 min-h-screen font-sans antialiased">
            <Component {...pageProps} />
          </main>
          <Footer />
          <DeferredChatWidget />
          <SocialSidebar />
        </LanguageProvider>
        <DeferredAnalytics />
      </ThemeProvider>
    </>
  );
}
