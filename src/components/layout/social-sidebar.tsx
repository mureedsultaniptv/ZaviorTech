"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Github, Instagram, Linkedin, MessageSquare, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function SocialSidebar() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(true);
  const isRtl = language === "ar";
  const socials = [
    { name: isRtl ? "لينكدإن" : "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/zavior-tech", color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20" },
    { name: isRtl ? "جيت هب" : "GitHub", icon: Github, url: "https://github.com/ZaviorTechnologies", color: "hover:text-[#333] hover:bg-[#333]/10 dark:hover:bg-[#333]/20" },
    { name: isRtl ? "إنستغرام" : "Instagram", icon: Instagram, url: "https://www.instagram.com/zaviortechnologies", color: "hover:text-[#e1306c] hover:bg-[#e1306c]/10 dark:hover:bg-[#e1306c]/20" },
    { name: isRtl ? "فيسبوك" : "Facebook", icon: Facebook, url: "https://www.facebook.com/zaviortechnologies", color: "hover:text-[#1877f2] hover:bg-[#1877f2]/10 dark:hover:bg-[#1877f2]/20" },
  ];

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRtl ? 20 : -20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "group fixed top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card/85 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md md:flex",
            isRtl ? "right-5" : "left-5",
          )}
          aria-label={isRtl ? "روابط زافيور الاجتماعية" : "Zavior social links"}
        >
          <button
            type="button"
            onClick={() => setVisible(false)}
            className={cn(
              "absolute -top-2 inline-flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-sm transition hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100",
              isRtl ? "-left-2" : "-right-2",
            )}
            aria-label={isRtl ? "إخفاء روابط التواصل الاجتماعي" : "Hide social links"}
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>

          <div className="flex flex-col gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={cn("group/link relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200", social.color)} aria-label={social.name}>
                  <Icon className="size-5 transition-transform duration-200 group-hover/link:scale-110" />
                  <span className={cn("pointer-events-none absolute whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs font-semibold text-popover-foreground opacity-0 shadow-lg transition-all duration-200 group-hover/link:scale-100 group-hover/link:opacity-100", isRtl ? "right-14 scale-95" : "left-14 scale-95")}>{social.name}</span>
                </a>
              );
            })}
          </div>

          <div className="h-px w-8 bg-border/80" />
          <Link href="/contact" className="group/contact relative flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary/90" aria-label={isRtl ? "اتصل بنا" : "Contact Us"}>
            <MessageSquare className="size-5 transition-transform duration-200 group-hover/contact:scale-110" />
          </Link>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
