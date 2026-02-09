"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogs } from "@/lib/data/demo-data";
import Image from "next/image";

export function BlogSection() {
  const { t } = useLanguage();
  const recentBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title={t.blog.title} subtitle={t.blog.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.slug}`}>
                <Card className="group h-full overflow-hidden bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={225}
                        className="object-cover object-center"
                      />
                      {/* <span className="text-4xl font-bold text-primary/30">
                        {blog.title.charAt(0)}
                      </span> */}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.readTime}
                      </span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3 inline-block">
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
                      <div className="text-sm">
                        <div className="font-medium">{blog.author.name}</div>
                        <div className="text-xs text-muted-foreground">{blog.author.role}</div>
                      </div>
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline" className="bg-transparent">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
