"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, ShieldCheck, Youtube } from "lucide-react";

const quick = [["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Companies", "/companies"], ["Case Studies", "/portfolio"], ["Blog", "/blog"], ["Careers", "/careers"], ["Contact Us", "/contact"]];
const services = [["Odoo ERP Implementation", "/services/erp-odoo-dubai"], ["Odoo CRM", "/services/erp-odoo-dubai"], ["Custom Odoo Modules", "/services/odoo-services-dubai"], ["Odoo Consultation & Discovery", "/services/erp-odoo-dubai"], ["Odoo Integration Services", "/services/odoo-services-dubai"], ["Zoho CRM & Zoho One", "/services"], ["AI Automation Solutions", "/services/ai-automation-dubai"], ["Custom Software Development", "/services"]];
const industries = ["Manufacturing", "Retail & eCommerce", "Healthcare", "Construction", "Logistics & Supply Chain", "Education", "Automotive", "Professional Services"];

export function Footer() {
  return <footer className="v2-footer">
    <div className="v2-footer-main">
      <div className="v2-footer-brand">
        <Image src="/zaviorlogo-dark.webp" alt="Zavior Technologies" width={1077} height={371} />
        <p>Zavior is an Odoo, Zoho and AI solutions partner serving Dubai and the UAE with ERP, CRM, automation and custom software that helps businesses grow smarter.</p>
        <a href="tel:+971508185948"><Phone /> +971 50 818 5948</a>
        <a href="mailto:support@zaviortech.org"><Mail /> support@zaviortech.org</a>
        <span><MapPin /> Dubai & Sharjah, UAE</span>
      </div>
      <FooterColumn title="Quick Links" links={quick} />
      <FooterColumn title="Our Services" links={services} />
      <div className="v2-footer-col"><h2>Industries We Serve</h2><ul>{industries.map(x => <li key={x}>{x}</li>)}</ul></div>
      <div className="v2-footer-news"><h2>Stay Updated</h2><p>Get the latest insights, updates and offers.</p><form><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Enter your email" /><button type="submit" aria-label="Subscribe"><Send /></button></form><h2>Follow Us</h2><div><a href="https://www.linkedin.com/company/zavior-tech" aria-label="LinkedIn"><Linkedin /></a><a href="#" aria-label="Facebook"><Facebook /></a><a href="https://www.youtube.com/@ZaviorTechnologiess" aria-label="YouTube"><Youtube /></a><a href="#" aria-label="Instagram"><Instagram /></a></div></div>
    </div>
    <div className="v2-footer-assurance"><div><ShieldCheck /><span><b>Business-first delivery</b><small>Solutions aligned to outcomes</small></span></div><div><ShieldCheck /><span><b>Data security</b><small>Industry best practices</small></span></div><div><ShieldCheck /><span><b>Dedicated support</b><small>Here beyond go-live</small></span></div></div>
    <div className="v2-footer-bottom"><span>© {new Date().getFullYear()} Zavior Technologies. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link><Link href="/sitemap.xml">Sitemap</Link></div><span>🇦🇪 Made with care in UAE</span></div>
  </footer>;
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return <div className="v2-footer-col"><h2>{title}</h2><ul>{links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></div>;
}
