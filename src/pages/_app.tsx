"use client";

import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SeoHead } from "@/components/seo/seo-head";
import { Analytics } from "@vercel/analytics/next";
import { cleanPath, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import {
  jsonLdGraph,
  organizationJsonLd,
  technologyServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "@/styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID;
    if (!projectId) {
      return;
    }

    const startClarity = () => {
      void import("@microsoft/clarity").then(({ default: Clarity }) => {
        Clarity.init(projectId);
      });
    };

    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(startClarity, {
        timeout: 5000,
      });
      return () => idleWindow.cancelIdleCallback?.(id);
    }

    const timeoutId = globalThis.setTimeout(startClarity, 3500);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <SeoHead
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        path={cleanPath(router.asPath || "/")}
        structuredData={jsonLdGraph([
          organizationJsonLd(),
          websiteJsonLd(),
          technologyServiceJsonLd(),
        ])}
        structuredDataId="site-identity-structured-data"
      />
      <Head>
           <meta
          name="google-site-verification"
          content="DgJZYmiKANOgaq-k-_MY-dExp-x0YgIV_DM6YG4pKW8"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen font-sans antialiased">
            <Component {...pageProps} />
          </main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </ThemeProvider>
    </>
  );
}
