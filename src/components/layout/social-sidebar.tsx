"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Linkedin, Youtube, Instagram, Facebook, MessageSquare, Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SocialSidebar() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isRtl = language === "ar";

const socials = [
  {
    name: isRtl ? "لينكدإن" : "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/zavior-tech",
    color:
      "hover:text-[#0077b5] hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20",
  },
  {
    name: isRtl ? "جيت هب" : "GitHub",
    icon: Github,
    url: "https://github.com/ZaviorTechnologies",
    color:
      "hover:text-[#333] hover:bg-[#333]/10 dark:hover:bg-[#333]/20",
  },
  {
    name: isRtl ? "إنستغرام" : "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/zaviortechnologies",
    color:
      "hover:text-[#e1306c] hover:bg-[#e1306c]/10 dark:hover:bg-[#e1306c]/20",
  },
  {
    name: isRtl ? "فيسبوك" : "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/zaviortechnologies",
    color:
      "hover:text-[#1877f2] hover:bg-[#1877f2]/10 dark:hover:bg-[#1877f2]/20",
  },
];
  return (
    <motion.div
      initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
      className={cn(
        "fixed z-50 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 p-3 rounded-2xl border bg-card/85 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-border/80 transition-all duration-300",
        isRtl ? "right-5" : "left-5"
      )}
    >
      {/* Social Links */}
      <div className="flex flex-col gap-2.5">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground transition-all duration-200",
                social.color
              )}
              aria-label={social.name}
            >
              <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

              {/* Tooltip */}
              <span
                className={cn(
                  "absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-popover text-popover-foreground text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-border shadow-lg",
                  isRtl ? "right-14" : "left-14"
                )}
              >
                {social.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-8 h-[1px] bg-border/80" />

      {/* Contact Button */}
      <Link
        href="/contact"
        className={cn(
          "group relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary/90",
          "hover:shadow-[0_4px_12px_rgba(var(--primary),0.2)]"
        )}
        aria-label={isRtl ? "اتصل بنا" : "Contact Us"}
      >
        <MessageSquare className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

        {/* Tooltip */}
        <span
          className={cn(
            "absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-lg",
            isRtl ? "right-14" : "left-14"
          )}
        >
          {isRtl ? "اتصل بنا" : "Contact Us"}
        </span>
      </Link>
    </motion.div>
  );
}
