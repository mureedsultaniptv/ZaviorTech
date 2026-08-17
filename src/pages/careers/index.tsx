"use client";

import { motion } from "@/lib/light-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { SectionHeading } from "@/components/ui/section-heading";
import { jobOpenings } from "@/lib/data/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Briefcase,
  Users,
  Heart,
  Rocket,
  GraduationCap,
  Coffee,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jobPostingJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: Rocket,
    title: "Growth Opportunities",
    description: "Clear career paths and professional development",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and books",
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Remote-friendly with flexible working hours",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular team building and social activities",
  },
  {
    icon: Briefcase,
    title: "Competitive Pay",
    description: "Market-leading salaries with equity options",
  },
];

export default function CareersPage() {
  const { t, dir } = useLanguage();
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/careers",
      name: "Careers at Zavior Group",
      description:
        "Explore current opportunities at Zavior Group and join a team working across technology, operations, and creative delivery.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ]),
    itemListJsonLd(
      "Current Zavior job openings",
      jobOpenings.map((job) => ({
        name: job.title,
        path: `/careers/${job.id}`,
      })),
    ),
    ...jobOpenings.map((job) => jobPostingJsonLd(job)),
  ]);

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <SeoHead
        title="Careers at Zavior Technologies in Dubai & UAE"
        description="Explore current career opportunities at Zavior Group and join a team across technology, operations, creative delivery, innovation, and collaboration."
        path="/careers"
        structuredData={structuredData}
        structuredDataId="careers-structured-data"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              {t.careers.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {t.careers.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t.careers.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge={t.careers.benefits}
            title={t.careers.benefitsTitle}
            subtitle={t.careers.benefitsSubtitle}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge={t.careers.openings}
            title={t.careers.openingsTitle}
            subtitle={t.careers.openingsSubtitle}
          />
          <div className="space-y-4 mt-12 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </CardTitle>
                        <p className="text-primary font-medium mt-1">{job.department}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
                      <span className="text-lg font-semibold text-primary">{job.salary}</span>
                      <Link href={`/careers/${job.id}`}>
                        <Button variant="ghost" className="group/btn">
                          {t.careers.viewDetails}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge={t.careers.process}
            title={t.careers.processTitle}
            subtitle={t.careers.processSubtitle}
          />
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              { step: "01", title: "Apply", desc: "Submit your application and resume" },
              { step: "02", title: "Review", desc: "Our team reviews your application" },
              { step: "03", title: "Interview", desc: "Technical and cultural fit interviews" },
              { step: "04", title: "Offer", desc: "Receive and accept your offer" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t.careers.ctaTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.careers.ctaSubtitle}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                {t.careers.contactUs}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
