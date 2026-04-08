"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogs } from "@/lib/data/demo-data";
import { Calendar, Clock } from "lucide-react";

export default function BlogPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(blogs.map((b) => b.category))];
  const filteredBlogs = filter === "all" ? blogs : blogs.filter((b) => b.category === filter);

  // Featured blog (first featured or first blog)
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const otherBlogs = filteredBlogs.filter((b) => b.id !== featuredBlog.id);

  return (
    <>
      <SeoHead
        title="Insights | Zavior Group"
        description="Read articles and practical insights from Zavior Group on ERP, software delivery, AI automation, and digital operations."
        path="/blog"
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
              {t.blog.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
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
                      alt={featuredBlog.title}
                      fill
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
                      {featuredBlog.title}
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

      {/* Category Filters & Blog Grid */}
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
                {category === "all" ? "All Articles" : category}
              </Button>
            ))}
          </motion.div>

          {/* Blog Grid */}
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
                          alt={blog.title}
                          fill
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
                          {blog.title}
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
        </div>
      </section>
    </>
  );
}
