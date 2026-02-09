"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowRight, Users, Calendar, ExternalLink } from "lucide-react";

export default function CompaniesPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="text-sm font-medium text-primary">Our Network</span>
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
              {t.companies.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-20 bg-muted/30">
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
                <Link href={`/companies/${company.slug}`}>
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
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {company.name}
                      </h2>
                      <p className="text-sm text-primary/80 mb-4">{company.shortDescription}</p>
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
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Est. {company.founded}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{company.employees}+ employees</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{companies.length}</div>
              <p className="text-primary-foreground/80 text-sm">Subsidiary Companies</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {companies.reduce((sum, c) => sum + c.employees, 0)}+
              </div>
              <p className="text-primary-foreground/80 text-sm">Combined Team</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Math.min(...companies.map((c) => c.founded))}
              </div>
              <p className="text-primary-foreground/80 text-sm">Earliest Founded</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {new Set(companies.flatMap((c) => c.services)).size}+
              </div>
              <p className="text-primary-foreground/80 text-sm">Service Areas</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
