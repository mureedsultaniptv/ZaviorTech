"use client";

import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SeoHead } from "@/components/seo/seo-head";
import { Analytics } from "@vercel/analytics/next";
import { cleanPath, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import "@/styles/globals.css";
import Clarity from "@microsoft/clarity";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID;
    if (!projectId) {
      return;
    }

    Clarity.init(projectId);
  }, []);

  return (
    <>
      <SeoHead
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        path={cleanPath(router.asPath || "/")}
      />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LanguageProvider>
          <Navigation />
          <main
            className={`min-h-screen font-sans antialiased ${inter.className}`}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </ThemeProvider>
    </>
  );
}
