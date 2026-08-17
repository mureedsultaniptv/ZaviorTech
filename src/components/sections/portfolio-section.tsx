"use client";

import { motion } from "@/lib/light-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data/demo-data";

export function PortfolioSection() {
  const { t } = useLanguage();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title={t.portfolio.title} subtitle={t.portfolio.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        sizes="(min-width: 768px) 50vw, 100vw"
                        loading="lazy"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* <span className="text-4xl font-bold text-primary/30">
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
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
