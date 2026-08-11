"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const mobileFocusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { language, dir, t } = useLanguage();

  const navCopy = language === "ar"
    ? {
        aboutZavior: "عن زافيور",
        aboutDescription: "مهمتنا وقيمنا وفريقنا.",
        whyZavior: "لماذا زافيور",
        whyDescription: "كيف نحقق نتائج قابلة للقياس.",
        companies: "شركاتنا",
        companiesDescription: "زافيور تكنولوجيز وفيرنتشر آند فيكس.",
        caseStudies: "دراسات الحالة",
        casesDescription: "أعمال مختارة ونتائج تنفيذ.",
        odoo: "Odoo ERP",
        odooDescription: "تنفيذ ووحدات مخصصة.",
        zoho: "حلول Zoho",
        zohoDescription: "CRM وZoho One وBooks والتكاملات.",
        ai: "الأتمتة بالذكاء الاصطناعي",
        aiDescription: "أتمتة عملية وموثوقة للإجراءات.",
        web: "تطوير الويب",
        webDescription: "مواقع أعمال مصممة للتحويل.",
        mobile: "تطبيقات الجوال",
        mobileDescription: "منتجات أصلية ومتعددة المنصات.",
        it: "حلول تقنية المعلومات",
        itDescription: "أنظمة ودعم موثوقان.",
        coreIt: "البنية التحتية الأساسية",
        coreItDescription: "شبكات وأجهزة وأمن.",
        consultation: "احجز استشارة",
        themeToDark: "التبديل إلى الوضع الداكن",
        themeToLight: "التبديل إلى الوضع الفاتح",
        language: "اللغة",
        mobileNavigation: "التنقل على الجوال",
        openNavigation: "فتح قائمة التنقل",
        closeNavigation: "إغلاق قائمة التنقل",
      }
    : {
        aboutZavior: "About Zavior",
        aboutDescription: "Our mission, values and team.",
        whyZavior: "Why Zavior",
        whyDescription: "How we deliver measurable outcomes.",
        companies: "Our Companies",
        companiesDescription: "Zavior Technologies, Furniture and Fix.",
        caseStudies: "Case Studies",
        casesDescription: "Selected work and delivery outcomes.",
        odoo: "Odoo ERP",
        odooDescription: "Implementation and custom modules.",
        zoho: "Zoho Solutions",
        zohoDescription: "CRM, Zoho One, Books and integrations.",
        ai: "AI Automation",
        aiDescription: "Practical workflow automation.",
        web: "Web Development",
        webDescription: "Conversion-focused business websites.",
        mobile: "Mobile Apps",
        mobileDescription: "Native and cross-platform products.",
        it: "IT Solutions",
        itDescription: "Reliable systems and support.",
        coreIt: "Core IT Infrastructure",
        coreItDescription: "Networks, hardware and security.",
        consultation: "Book a consultation",
        themeToDark: "Switch to dark mode",
        themeToLight: "Switch to light mode",
        language: "Language",
        mobileNavigation: "Mobile navigation",
        openNavigation: "Open navigation menu",
        closeNavigation: "Close navigation menu",
      };
  const isDark = mounted && resolvedTheme === "dark";
  const ArrowForward = dir === "rtl" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 20;
        setScrolled((current) =>
          current === nextScrolled ? current : nextScrolled,
        );
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>(mobileFocusableSelector)?.focus();
    });

    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>(mobileFocusableSelector) ?? [],
    );
    const first = focusable.at(0);
    const last = focusable.at(-1);

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const navLinks = [
    { href: "/", label: t.nav.home },
    {
      href: "/about",
      label: t.nav.about,
      children: [
        { href: "/about", label: navCopy.aboutZavior, description: navCopy.aboutDescription },
        { href: "/why-zavior", label: navCopy.whyZavior, description: navCopy.whyDescription },
        { href: "/companies", label: navCopy.companies, description: navCopy.companiesDescription },
        { href: "/portfolio", label: navCopy.caseStudies, description: navCopy.casesDescription },
      ],
    },
    {
      href: "/services",
      label: t.nav.services,
      children: [
        { href: "/services/erp-odoo-dubai", label: navCopy.odoo, description: navCopy.odooDescription },
        { href: "/services/zoho-solutions-dubai", label: navCopy.zoho, description: navCopy.zohoDescription },
        { href: "/services/ai-automation-dubai", label: navCopy.ai, description: navCopy.aiDescription },
        { href: "/services/web-development-dubai", label: navCopy.web, description: navCopy.webDescription },
        { href: "/services/mobile-apps-dubai", label: navCopy.mobile, description: navCopy.mobileDescription },
        { href: "/services/it-solutions-dubai", label: navCopy.it, description: navCopy.itDescription },
        { href: "/services/core-it-infrastructure-dubai", label: navCopy.coreIt, description: navCopy.coreItDescription },
      ],
    },
    { href: "/blog", label: t.nav.blog },
    // { href: "/careers", label: t.nav.careers },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "zavior-nav fixed top-0 left-0 right-0 z-[80] transition-all duration-300",
        scrolled
          ? "glass border-b border-border/50 shadow-lg"
          : "bg-background/95",
      )}
    >
      <nav className="container mx-auto max-w-full px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 shrink items-center gap-2">
            <Image
              src="/zaviorlogo-dark.webp"
              alt="Zavior Technologies logo"
              width={612}
              height={408}
              priority
              className="hidden h-auto w-[clamp(7.5rem,38vw,10.5rem)] dark:block"
            />
            <Image
              src="/zaviorlogo-light.webp"
              alt="Zavior Technologies logo"
              width={1077}
              height={371}
              priority
              className="h-auto w-[clamp(7.5rem,38vw,10.5rem)] dark:hidden"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href
                || (link.href === "/services" && router.pathname.startsWith("/services"))
                || link.children?.some((child) => router.pathname === child.href);
              const linkClassName = cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              );

              if (!link.children) {
                return <Link key={link.href} href={link.href} className={linkClassName}>{link.label}</Link>;
              }

              return (
                <div key={link.href} className="group relative">
                  <Link href={link.href} className={linkClassName} aria-haspopup="menu">
                    {link.label}<ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className={cn(
                    "invisible absolute start-0 top-full z-50 mt-2 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    link.href === "/services" ? "grid w-[36rem] grid-cols-2 gap-1" : "w-80",
                  )} role="menu">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-muted focus:bg-muted" role="menuitem">
                        <span className="block text-sm font-semibold text-foreground">{child.label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{child.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageSwitcher label={navCopy.language} className="hidden sm:inline-flex h-9" />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="relative"
              aria-label={isDark ? navCopy.themeToLight : navCopy.themeToDark}
              aria-pressed={isDark}
              title={isDark ? navCopy.themeToLight : navCopy.themeToDark}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{isDark ? navCopy.themeToLight : navCopy.themeToDark}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? navCopy.closeNavigation : navCopy.openNavigation}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">
                {isOpen ? navCopy.closeNavigation : navCopy.openNavigation}
              </span>
            </Button>

            {/* CTA Button */}
            <Button asChild className="nav-consult hidden lg:flex">
              <Link href="/contact?consultation=1">{navCopy.consultation} <ArrowForward className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              onKeyDown={handleMobileMenuKeyDown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100dvh-4rem)] overflow-y-auto bg-background lg:hidden"
              id="mobile-navigation"
              aria-label={navCopy.mobileNavigation}
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        router.pathname === link.href || (link.href === "/services" && router.pathname.startsWith("/services"))
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">{link.label}{link.children && <ChevronDown className="h-4 w-4" />}</span>
                    </Link>
                    {link.children ? (
                      <div className="ms-4 mt-1 space-y-1 border-s border-border ps-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4 px-4"
                >
                  <LanguageSwitcher
                    label={navCopy.language}
                    showLabel
                    className="w-full justify-between"
                    onLanguageChange={() => setIsOpen(false)}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
