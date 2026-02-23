"use client";

import { useParams, notFound } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogs } from "@/lib/data/demo-data";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const blog = blogs.find((b) => b.slug === params?.slug);

  if (!blog) {
    return(<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    </div>);
  }

  const relatedBlogs = blogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 2);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.image,
    "author": {
      "@type": "Person",
      "name": blog.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Company",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": blog.publishedAt,
    "description": blog.excerpt,
    "url": `https://yourwebsite.com/blog/${blog.slug}`
  };

  function dangerouslySetInnerHTML(content: string): import("react").ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Head>
        <title>{blog.title} | Your Company</title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${blog.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-4">
                {blog.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                {blog.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {blog.readTime}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-between py-6 border-y border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {blog.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{blog.author.name}</div>
                  <div className="text-sm text-muted-foreground">{blog.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="bg-transparent" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent" aria-label="Share on Linkedin">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {blog.excerpt}
              </p>

                  <div  dangerouslySetInnerHTML={{__html:blog.content}}></div>
            {/* {dangerouslySetInnerHTML(blog.content)} */}
              {blog.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 my-6">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace(/^[\d]+\.\s\*\*|\*\*.*?\*\*\s-\s/, "").replace(/\*\*/g, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.article>
        </div>
      </section>

      {/* Tags */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 py-6 border-t border-border">
              <span className="text-sm font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {[blog.category, "Technology", "Innovation", "Digital"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Related Articles</h2>
                <Button asChild variant="outline" className="bg-transparent">
                  <Link href="/blog">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog, index) => (
                  <motion.div
                    key={relatedBlog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedBlog.slug}`}>
                      <Card className="group h-full overflow-hidden bg-card hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                        <div className="relative aspect-video overflow-hidden rounded-xl">
                          <Image
                            src={relatedBlog.image}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {relatedBlog.category}
                          </span>
                          <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedBlog.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
