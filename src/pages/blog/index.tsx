"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { SeoHead } from "@/components/seo/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sortedBlogs } from "@/lib/data/demo-data";
import {
  BarChart3,
  Calendar,
  Clock,
  Factory,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const categories = ["all", ...new Set(sortedBlogs.map((b) => b.category))].sort(
    (a, b) => (a === "all" ? -1 : b === "all" ? 1 : a.localeCompare(b)),
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBlogs = sortedBlogs.filter((blog) => {
    const categoryMatches = filter === "all" || blog.category === filter;
    const queryMatches =
      !normalizedQuery ||
      [blog.title, blog.excerpt, blog.category, ...blog.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    return categoryMatches && queryMatches;
  });

  const featuredBlog =
    filteredBlogs.find((blog) => blog.featured) || filteredBlogs[0] || null;
  const otherBlogs = featuredBlog
    ? filteredBlogs.filter((blog) => blog.id !== featuredBlog.id)
    : [];
  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd({
      path: "/blog",
      name: "Dubai ERP, AI Automation and Web Development Blog",
      description:
        "Read practical Dubai and UAE technology insights on Odoo ERP, AI automation, web development, cybersecurity, CRM, e-commerce, and digital transformation.",
      pageType: "Blog",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    {
      "@type": "Blog",
      "@id": absoluteUrl("/blog#blog"),
      name: "Dubai Technology, ERP and AI Automation Insights",
      description:
        "Practical articles for Dubai and UAE businesses evaluating Odoo ERP, AI automation, web development, cybersecurity, and digital transformation.",
      url: absoluteUrl("/blog"),
      publisher: { "@id": absoluteUrl("/#organization") },
      blogPost: sortedBlogs.slice(0, 12).map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        url: absoluteUrl(`/blog/${blog.slug}`),
        datePublished: blog.publishedAt,
        articleSection: blog.category,
      })),
    },
    itemListJsonLd(
      "Latest Dubai ERP, AI and web development articles",
      sortedBlogs.slice(0, 12).map((blog) => ({
        name: blog.title,
        path: `/blog/${blog.slug}`,
      })),
    ),
  ]);

  return (
    <>
      <SeoHead
        title="Dubai ERP, AI Automation & Web Development Blog | Zavior Technologies"
        description="Read practical Dubai and UAE technology insights on Odoo ERP, AI automation, web development, cybersecurity, CRM, e-commerce, and digital transformation."
        path="/blog"
        structuredData={structuredData}
        structuredDataId="blog-index-structured-data"
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
              <span className="text-sm font-medium text-primary">Insights & Articles</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            >
              {t.blog.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground text-pretty"
            >
              Practical guidance for Dubai and UAE teams choosing ERP,
              automation, websites, CRM, cybersecurity, and scalable digital
              operations.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: Workflow,
                label: "Odoo ERP",
                detail: "Implementation, migration, modules, and reporting.",
              },
              {
                icon: BarChart3,
                label: "AI Automation",
                detail: "Lead routing, documents, support, and insights.",
              },
              {
                icon: Factory,
                label: "UAE Operations",
                detail: "Retail, manufacturing, logistics, and services.",
              },
              {
                icon: ShieldCheck,
                label: "Technical SEO",
                detail: "Fast Next.js pages, schema, and crawl clarity.",
              },
            ].map((signal) => (
              <Card key={signal.label} className="bg-card/70 border-border/50">
                <CardContent className="p-5">
                  <signal.icon className="h-5 w-5 text-primary mb-4" />
                  <h2 className="text-base font-semibold mb-2">{signal.label}</h2>
                  <p className="text-sm text-muted-foreground">{signal.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredBlog ? (
        <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/blog/${featuredBlog.slug}`}>
              <Card className="group overflow-hidden bg-card hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image
                      src={featuredBlog.image}
                      alt={getLocalizedTitle(featuredBlog, language)}
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-4 w-fit">
                      Featured
                    </span>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredBlog.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {getLocalizedTitle(featuredBlog, language)}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {featuredBlog.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{featuredBlog.author.name}</div>
                        <div className="text-sm text-muted-foreground">{featuredBlog.author.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
        </section>
      ) : null}

      {/* Category Filters & Blog Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Dubai ERP, AI automation, CRM, SEO, cybersecurity..."
                className="h-11 pl-10"
                aria-label="Search articles"
              />
            </div>
          </div>

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
                {category === "all" ? "All Articles" : category}
              </Button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {otherBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <Card className="group h-full overflow-hidden bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={getLocalizedTitle(blog, language)}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.readTime}
                          </span>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3">
                          {blog.category}
                        </span>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {getLocalizedTitle(blog, language)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                            {blog.author.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{blog.author.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-semibold mb-3">No articles found</h2>
              <p className="text-muted-foreground mb-6">
                Try a broader term like Odoo, ERP, AI automation, CRM, web
                development, or Dubai.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
