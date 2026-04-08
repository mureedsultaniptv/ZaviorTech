"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { companies } from "@/lib/data/demo-data";

export function CompaniesSection() {
  const { t } = useLanguage();
  const featuredCompanies = companies;

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title={t.companies.title} subtitle={t.companies.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCompanies.map((company, index) => (
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
                  <Card className="group h-full bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/30 overflow-hidden">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: company.color }}
                        >
                          {company.name.charAt(0)}
                        </div>
                        <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-primary/80 mb-2">{company.shortDescription}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">
                        {company.sector}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {company.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {company.websiteLabel}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {company.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ) : (
                <Link href={company.href} className="block h-full">
                  <Card className="group h-full bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/30 overflow-hidden">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: company.color }}
                        >
                          {company.name.charAt(0)}
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-primary/80 mb-2">{company.shortDescription}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">
                        {company.sector}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {company.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {company.websiteLabel}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {company.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline" className="bg-transparent">
            <Link href="/companies">
              Explore All Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
