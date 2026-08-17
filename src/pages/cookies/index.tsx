"use client";

import { motion } from "@/lib/light-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SeoHead } from "@/components/seo/seo-head";
import { Cookie, Shield, Settings2, Trash2 } from "lucide-react";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

const sections = [
  {
    icon: Cookie,
    title: "What Cookies We Use",
    content:
      "Zavior Group may use essential cookies, analytics cookies, and service-improvement cookies to understand how visitors use the website and to improve reliability.",
  },
  {
    icon: Shield,
    title: "Why We Use Them",
    content:
      "Cookies help us keep the website functional, measure performance, and understand which pages and services are most useful to visitors.",
  },
  {
    icon: Settings2,
    title: "Your Choices",
    content:
      "You can manage or delete cookies through your browser settings. Disabling some cookies may affect how certain features work.",
  },
  {
    icon: Trash2,
    title: "How To Clear Cookies",
    content:
      "Most browsers let you clear stored cookies and site data from their privacy or security settings. Refer to your browser's help documentation for the exact steps.",
  },
];

export default function CookiesPage() {
  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: "/cookies",
      name: "Cookie Policy",
      description:
        "Read the Zavior Group cookie policy and learn how cookie-related choices affect your experience.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Cookie Policy", path: "/cookies" },
    ]),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <SeoHead
        title="Cookie Policy | Zavior Technologies UAE Official"
        description="Read the Zavior Group cookie policy and discover how cookies support website performance, personalize your experience, and manage your preferences."
        path="/cookies"
        structuredData={structuredData}
        structuredDataId="cookies-structured-data"
      />

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
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              This page explains how Zavior Group uses cookies and how you can
              manage cookie-related preferences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
