"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { Linkedin, Youtube, Github, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { href: "/about", label: t.nav.about },
      { href: "/services", label: t.nav.services },
      { href: "/companies", label: t.nav.companies },
      { href: "/portfolio", label: t.nav.portfolio },
      { href: "/blog", label: t.nav.blog },
    ],
    services: [
      { href: "/services/ai-automation-dubai", label: t.services.ai.title },
      { href: "/services/erp-odoo-dubai", label: t.services.erp.title },
      { href: "/services/web-development-dubai", label: t.services.web.title },
      { href: "/services/mobile-apps-dubai", label: t.services.mobile.title },
      { href: "/services/it-solutions-dubai", label: t.services.it.title },
    ],
    legal: [
      { href: "/privacy", label: t.footer.privacy },
      { href: "/terms", label: t.footer.terms },
      { href: "/cookies", label: t.footer.cookies },
      { href: "/faq", label: t.nav.faq },
    ],
  };

  const socialLinks = [
    { href: "https://www.linkedin.com/company/zavior-tech", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.youtube.com/@ZaviorTechnologiess", icon: Youtube, label: "YouTube" },
    { href: "https://github.com/Zavior-Technologies", icon: Github, label: "GitHub" },
    // { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-primary">Zavior</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Sharjah, UAE - Serving Dubai</span>
              </div>
              <a
                href="tel:+971508185948"
                className="flex items-center gap-3 text-muted-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+971 50 818 5948</span>
              </a>
              <a
                href="mailto:support@zaviortech.org"
                className="flex items-center gap-3 text-muted-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">support@zaviortech.org</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold mb-4">{t.footer.quickLinks}</h2>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-semibold mb-4">{t.footer.services}</h2>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="font-semibold mb-4">{t.footer.legal}</h2>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Zavior. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
