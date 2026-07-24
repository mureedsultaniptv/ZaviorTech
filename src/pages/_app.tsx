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
import { isIndexablePath } from "@/lib/routes";
import Script from "next/script";
import {
  jsonLdGraph,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "@/styles/globals.css";
import Head from "next/head";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("@/components/chatbot/ChatWidget").then((module) => module.ChatWidget),
  { ssr: false },
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const rawPath = router.asPath || "/";
  const currentPath = cleanPath(rawPath);
  const isIndexable = isIndexablePath(currentPath) && !rawPath.includes("?");

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
      <Script
    id="google-tag-manager"
    strategy="lazyOnload"
  >
    {`
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TWLSP25R');
    `}
  </Script>
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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
          <main className="min-h-screen font-sans antialiased">
            <Component {...pageProps} />
          </main>
          <Footer />
          <ChatWidget />
        </LanguageProvider>
        <Analytics />
      </ThemeProvider>
      
    </>
  );
}
