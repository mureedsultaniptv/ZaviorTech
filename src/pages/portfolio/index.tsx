"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd({
      path: "/portfolio",
      name: "Zavior Technologies Portfolio",
      description:
        "Review recent ERP, software, infrastructure, and digital delivery projects completed by Zavior Group.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
    ]),
    itemListJsonLd(
      "Zavior Technologies project portfolio",
      projects.map((project) => ({
        name: project.title,
        path: `/portfolio/${project.slug}`,
      })),
    ),
  ]);

  return (
    <>
      <SeoHead
        title="Portfolio | Zavior Group"
        description="Review recent ERP, software, infrastructure, and digital delivery projects completed by Zavior Group."
        path="/portfolio"
        structuredData={structuredData}
        structuredDataId="portfolio-structured-data"
      />
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
              <span className="text-sm font-medium text-primary">Our Work</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            >
              {t.portfolio.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground text-pretty"
            >
              {t.portfolio.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={filter !== category ? "bg-transparent" : ""}
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/portfolio/${project.slug}`}>
                    <Card className="group h-full overflow-hidden bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={640}
                            height={360}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            loading="lazy"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        
                          {/* <span className="text-6xl font-bold text-primary/30">
                            {project.title.charAt(0)}
                          </span> */}
                        </div>
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-sm font-medium text-primary flex items-center gap-2">
                            {t.portfolio.viewProject}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {project.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
