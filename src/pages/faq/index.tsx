"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { faqs } from "@/lib/data/demo-data";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const categoryOrder = ["Services", "Process", "Security", "Pricing"];

function getFaqCategory(question: string) {
  const text = question.toLowerCase();

  if (text.includes("pricing")) {
    return "Pricing";
  }

  if (
    text.includes("project") ||
    text.includes("timeline") ||
    text.includes("management") ||
    text.includes("training")
  ) {
    return "Process";
  }

  if (text.includes("security")) {
    return "Security";
  }

  return "Services";
}

const faqCategories = categoryOrder
  .map((category) => ({
    category,
    questions: faqs
      .filter((faq) => getFaqCategory(faq.question) === category)
      .map((faq) => ({ q: faq.question, a: faq.answer })),
  }))
  .filter((category) => category.questions.length > 0);

export default function FAQPage() {
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("query") || "";
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Filter based on search input
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(localSearchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);
  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd({
      path: "/faq",
      name: "Zavior Technologies FAQ",
      description:
        "Find answers about Zavior Technologies services for Dubai and UAE businesses, including Odoo ERP, AI automation, web development, IT support, process.",
      pageType: "FAQPage",
      speakableSelectors: ["h1", "#faq-content"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
    },
  ]);

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <SeoHead
        title="FAQ | Odoo ERP, AI Automation & Web Development Dubai | Zavior"
        description="Find answers about Zavior Technologies services for Dubai and UAE businesses, including Odoo ERP, AI automation, web development, IT support, process."
        path="/faq"
        structuredData={structuredData}
        structuredDataId="faq-structured-data"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-3xl mx-auto ${isRTL ? "rtl" : ""}`}
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {t.faq.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t.faq.subtitle}
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="pl-12 h-14 text-lg"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section id="faq-content" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.category}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse all categories above.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 p-12 md:p-16 text-center overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Our team is here to help you with more details about our services, process, or pricing.
              </p>
              <Link href="/contact">
                <Button size="lg" className="px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
