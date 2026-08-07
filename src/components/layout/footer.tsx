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

const companyLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Companies", "/companies"],
  ["Case Studies", "/portfolio"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const solutionLinks = [
  ["Odoo ERP Implementation", "/services/erp-odoo-dubai"],
  ["Odoo CRM & Modules", "/services/odoo-services-dubai"],
  ["Zoho CRM & Zoho One", "/services/zoho-solutions-dubai"],
  ["AI Automation", "/services/ai-automation-dubai"],
  ["Web Applications", "/services/web-development-dubai"],
  ["Mobile Apps", "/services/mobile-apps-dubai"],
];

const industryLinks = [
  ["Manufacturing", "/portfolio/manufacturing-erp-crm"],
  ["Retail & Commerce", "/portfolio/custom-erp-inventory-management-dubai-trading"],
  ["Healthcare", "/portfolio/pharma-erp-system"],
  ["Construction", "/services/erp-software-dubai"],
  ["Logistics", "/portfolio/logistics-it-strategy"],
  ["Professional Services", "/services"],
];

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-main">
        <div className="v2-footer-brand">
          <Image src="/zaviorlogo-dark.webp" alt="Zavior Technologies" width={612} height={408} />
          <p>
            Official Odoo and Zoho partner delivering connected ERP, CRM and
            automation solutions across the UAE and beyond.
          </p>
          <div className="v2-footer-partners" aria-label="Official platform partnerships">
            <span><Image src="/brands/odoo-logo.svg" alt="Odoo" width={82} height={38} /> Official Partner</span>
            <span><Image src="/brands/zoho-logo.svg" alt="Zoho" width={82} height={36} /> Official Partner</span>
          </div>
        </div>

        <FooterColumn title="Quick links" links={companyLinks} />
        <FooterColumn title="Our services" links={solutionLinks} />
        <FooterColumn title="Industries" links={industryLinks} />

        <div className="v2-footer-contact">
          <h2>Contact Zavior</h2>
          <p>Tell us what needs to work better. We’ll help define a practical next step.</p>
          <address>
            <a href={`tel:${SITE_TELEPHONE}`}><Phone /> +971 50 818 5948</a>
            <a href={`mailto:${SITE_EMAIL}`}><Mail /> {SITE_EMAIL}</a>
            <span><MapPin /> {SITE_HEADQUARTERS}</span>
          </address>
          <div className="v2-footer-socials">
            <a href="https://www.linkedin.com/company/zavior-tech" aria-label="Zavior on LinkedIn"><Linkedin /></a>
            <a href="https://www.youtube.com/@ZaviorTechnologiess" aria-label="Zavior on YouTube"><Youtube /></a>
          </div>
        </div>
      </div>

      <div className="v2-footer-proof" aria-label="Service commitments">
        <span><CircleCheck /><b>Business-first delivery</b><small>Solutions aligned to outcomes</small></span>
        <span><ShieldCheck /><b>Data security</b><small>Reliable systems and practices</small></span>
        <span><Headphones /><b>Dedicated support</b><small>Help beyond go-live</small></span>
      </div>

      <div className="v2-footer-bottom">
        <span>© {new Date().getFullYear()} Zavior Technologies</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
        <span>Made with care in the UAE</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div className="v2-footer-col">
      <h2>{title}</h2>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}><Link href={href}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
