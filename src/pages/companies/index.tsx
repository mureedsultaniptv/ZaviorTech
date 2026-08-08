"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { SeoHead } from "@/components/seo/seo-head";
import { absoluteUrl } from "@/lib/site";
import { ArrowRight, Building2, ExternalLink, Globe, Layers3, BriefcaseBusiness } from "lucide-react";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

export default function CompaniesPage() {
  const { t } = useLanguage();
  const sectors = new Set(companies.map((company) => company.sector)).size;
  const serviceAreas = new Set(companies.flatMap((company) => company.services)).size;
  const publishedDomains = new Set(companies.map((company) => company.website)).size;

  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/companies",
      name: "Zavior Group Companies",
      description:
        "Explore the three branches of Zavior Group: Zavior Technologies, Zavior Furniture, and Zavior Maintenance Services.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Companies", path: "/companies" },
    ]),
    {
      "@type": "Organization",
      "@id": absoluteUrl("/companies#group"),
      name: "Zavior Group",
      url: absoluteUrl("/companies"),
      subOrganization: companies.map((company) => ({
        "@type": "Organization",
        name: company.name,
        description: company.description,
        url: company.website,
      })),
    },
  ]);

  return (
    <>
      <SeoHead
        title="Zavior Group Companies in UAE | Explore Brands"
        description="Discover the three branches of Zavior Group: Zavior Technologies, Zavior Furniture, and Zavior Maintenance Services, offering trusted industry expertise."
        path="/companies"
        structuredData={structuredData}
      />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="text-sm font-medium text-primary">Group Overview</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            >
              {t.companies.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground text-pretty"
            >
              Zavior Group is organized around three focused branches: Zavior
              Technologies for digital services, Zavior Furniture for Dubai-based
              furnishing and fit-out supply, and Zavior Maintenance Services for
              dependable facilities support.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers3,
                title: "Three Focused Branches",
                description:
                  "Each branch has a clear operating focus while benefiting from shared standards, coordinated delivery, and cross-functional support across the group.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Built Around Client Needs",
                description:
                  "The group structure allows us to support clients with technology, operational services, and project supply requirements through the right specialist brand.",
              },
              {
                icon: Globe,
                title: "Aligned With The Right Domain",
                description:
                  "Zavior Technologies routes visitors into the services experience on zavior.org, while the furniture and maintenance branches connect directly to their dedicated domains.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-border/50">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {company.isExternal ? (
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="group h-full bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
                            style={{ backgroundColor: company.color }}
                          >
                            {company.name.charAt(0)}
                          </div>
                          <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs uppercase tracking-[0.16em] text-primary mb-3">
                          {company.sector}
                        </p>
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {company.name}
                        </h2>
                        <p className="text-sm text-primary/80 mb-4">
                          {company.shortDescription}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {company.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {company.services.map((service) => (
                            <span
                              key={service}
                              className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{company.headquarters}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{company.websiteLabel}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Link href={company?.href||"#"} className="block h-full">
                    <Card className="group h-full bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
                            style={{ backgroundColor: company.color }}
                          >
                            {company?.name?.charAt(0)}
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs uppercase tracking-[0.16em] text-primary mb-3">
                          {company.sector}
                        </p>
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {company.name}
                        </h2>
                        <p className="text-sm text-primary/80 mb-4">
                          {company.shortDescription}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {company.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {company?.services?.map((service) => (
                            <span
                              key={service}
                              className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{company.headquarters}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{company.websiteLabel}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{companies.length}</div>
              <p className="text-primary-foreground/80 text-sm">Group Companies</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{sectors}</div>
              <p className="text-primary-foreground/80 text-sm">Core Sectors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{publishedDomains}</div>
              <p className="text-primary-foreground/80 text-sm">Branch Domains</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{serviceAreas}+</div>
              <p className="text-primary-foreground/80 text-sm">Service Capabilities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Talk to Zavior Group
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}
