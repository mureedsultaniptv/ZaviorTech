"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { milestones, stats } from "@/lib/data/demo-data";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CTASection } from "@/components/sections/cta-section";
import { Target, Eye, Heart, Globe, Award, Users } from "lucide-react";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
    { icon: Heart, title: "Integrity", description: "Building trust through transparency and honesty" },
    { icon: Award, title: "Excellence", description: "Delivering nothing less than the best" },
    { icon: Users, title: "Collaboration", description: "Working together to achieve greatness" },
    { icon: Globe, title: "Global Impact", description: "Creating solutions that transcend borders" },
    { icon: Eye, title: "Vision", description: "Looking ahead to shape the future" },
  ];
  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd({
      path: "/about",
      name: "About Zavior Group",
      description:
        "Learn about Zavior Group, its mission, values, milestones, and the companies driving its growth.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);

  return (
    <>
      <SeoHead
        title="About Zavior Technologies | ERP & AI Experts UAE"
        description="Explore Zavior Group, its mission, values, milestones, and the companies powering innovation, digital transformation, business excellence, and growth."
        path="/about"
        structuredData={structuredData}
        structuredDataId="about-structured-data"
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
              <span className="text-sm font-medium text-primary">About Us</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            >
              {t.about.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground text-pretty"
            >
              {t.about.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-card border-border/50">
                <CardContent className="p-8 lg:p-12">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{t.about.mission}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.about.missionText}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-card border-border/50">
                <CardContent className="p-8 lg:p-12">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{t.about.vision}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.about.visionText}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: stats.projects, label: t.stats.projects, suffix: "+" },
              { value: stats.clients, label: t.stats.clients, suffix: "+" },
              { value: stats.countries, label: t.stats.countries, suffix: "" },
              { value: stats.team, label: t.stats.team, suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title={t.about.values} subtitle={t.about.valuesText} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card hover:bg-card/80 transition-colors border-border/50 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title={t.about.history} subtitle="Key moments that shaped who we are today." />
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-primary" />
                <div className="text-sm font-semibold text-primary mb-1">{milestone.year}</div>
                <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground text-sm">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
