"use client";

import React from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import Clarity from '@microsoft/clarity';


const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {

    const clarityId = process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID;
    Clarity.init(clarityId || "");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <LanguageProvider>
        <Navigation />
        <main className={`min-h-screen font-sans antialiased ${inter.className}`}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </LanguageProvider>
      <Analytics />
    </ThemeProvider>
  );
}
