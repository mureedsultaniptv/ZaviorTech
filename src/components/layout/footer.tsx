"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CircleCheck,
  Headphones,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { SITE_EMAIL, SITE_HEADQUARTERS, SITE_TELEPHONE } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-context";
import { getMarketingContent } from "@/lib/i18n/marketing-content";

const companyLinkPaths = ["/", "/about", "/companies", "/portfolio", "/blog", "/contact"];

const solutionLinkPaths = [
  "/services/erp-odoo-dubai",
  "/services/zoho-solutions-dubai",
  "/services/ai-automation-dubai",
  "/services/web-development-dubai",
  "/services/mobile-apps-dubai",
  "/services/it-solutions-dubai",
  "/services/core-it-infrastructure-dubai",
];

const industryLinkPaths = [
  "/portfolio/manufacturing-erp-crm",
  "/portfolio/custom-erp-inventory-management-dubai-trading",
  "/portfolio/pharma-erp-system",
  "/services/erp-software-dubai",
  "/portfolio/logistics-it-strategy",
  "/services",
];

const footerProofIcons = [CircleCheck, ShieldCheck, Headphones] as const;

export function Footer() {
  const { language } = useLanguage();
  const { footer } = getMarketingContent(language);

  return (
    <footer className="v2-footer">
      <div className="v2-footer-main">
        <div className="v2-footer-brand">
          <Image src="/zaviorlogo-dark.webp" alt="Zavior Technologies" width={612} height={408} />
          <p>{footer.description}</p>
          <div className="v2-footer-partners" aria-label={footer.officialPartner}>
            <span><Image src="/brands/odoo-logo.svg" alt="Odoo" width={82} height={38} /> {footer.officialPartner}</span>
            <span><Image src="/brands/zoho-logo.svg" alt="Zoho" width={82} height={36} /> {footer.officialPartner}</span>
          </div>
        </div>

        <FooterColumn title={footer.quickLinksTitle} labels={footer.quickLinks} paths={companyLinkPaths} />
        <FooterColumn title={footer.serviceLinksTitle} labels={footer.serviceLinks} paths={solutionLinkPaths} />
        <FooterColumn title={footer.industryLinksTitle} labels={footer.industryLinks} paths={industryLinkPaths} />

        <div className="v2-footer-contact">
          <h2>{footer.contactTitle}</h2>
          <p>{footer.contactDescription}</p>
          <address>
            <a href={`tel:${SITE_TELEPHONE}`}><Phone /> +971 50 818 5948</a>
            <a href={`mailto:${SITE_EMAIL}`}><Mail /> {SITE_EMAIL}</a>
            <span><MapPin /> {SITE_HEADQUARTERS}</span>
          </address>
          <div className="v2-footer-socials">
            <a href="https://www.linkedin.com/company/zavior-tech" aria-label={language === "ar" ? "زافيور على لينكدإن" : "Zavior on LinkedIn"}><Linkedin /></a>
            <a href="https://www.youtube.com/@ZaviorTechnologiess" aria-label={language === "ar" ? "زافيور على يوتيوب" : "Zavior on YouTube"}><Youtube /></a>
          </div>
        </div>
      </div>

      <div className="v2-footer-proof" aria-label={language === "ar" ? "التزامات الخدمة" : "Service commitments"}>
        {footer.proof.map((item, index) => {
          const Icon = footerProofIcons[index];
          return <span key={item.title}><Icon /><b>{item.title}</b><small>{item.text}</small></span>;
        })}
      </div>

      <div className="v2-footer-bottom">
        <span>© {new Date().getFullYear()} Zavior Technologies</span>
        <div>
          <Link href="/privacy">{footer.privacy}</Link>
          <Link href="/terms">{footer.terms}</Link>
          <Link href="/sitemap.xml">{footer.sitemap}</Link>
        </div>
        <span>{footer.madeIn}</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  labels,
  paths,
}: {
  title: string;
  labels: string[];
  paths: readonly string[];
}) {
  return (
    <div className="v2-footer-col">
      <h2>{title}</h2>
      <ul>
        {labels.map((label, index) => (
          <li key={label}><Link href={paths[index] ?? "/"}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
