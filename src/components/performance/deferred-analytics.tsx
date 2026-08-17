"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const ANALYTICS_FALLBACK_DELAY = 20_000;

export function DeferredAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const enable = useCallback(() => setEnabled(true), []);

  useEffect(() => {
    if (enabled) return;

    const options: AddEventListenerOptions = { once: true, passive: true };
    const timeoutId = window.setTimeout(enable, ANALYTICS_FALLBACK_DELAY);

    window.addEventListener("pointerdown", enable, options);
    window.addEventListener("touchstart", enable, options);
    window.addEventListener("keydown", enable, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("touchstart", enable);
      window.removeEventListener("keydown", enable);
    };
  }, [enable, enabled]);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID;
    if (!enabled || !projectId) return;

    void import("@microsoft/clarity").then(({ default: Clarity }) => {
      Clarity.init(projectId);
    });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TWLSP25R');
        `}
      </Script>
      <Analytics />
    </>
  );
}
