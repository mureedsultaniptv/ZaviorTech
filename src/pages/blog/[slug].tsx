// /src/pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import { blogs, sortedBlogs } from "@/lib/data/demo-data";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter } from "lucide-react";
import { ParsedUrlQuery } from "querystring";
import { absoluteUrl } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";
import {
  getBlogDirectAnswer,
  getBlogFaqs,
  getRelatedBlogs,
  getRelevantServicesForBlog,
} from "@/lib/seo-content";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; role: string };
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt?: string;
  tags: string[];
  faqs?: Array<{ question: string; answer: string }>;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
}

interface Props {
  blog: BlogPost;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function BlogDetailPage({ blog }: Props) {
  const { language } = useLanguage();

  // If blog is null (should be handled by getStaticProps notFound), but just in case:
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you are looking for does not exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleUrl = absoluteUrl(blog.canonical || `/blog/${blog.slug}`);
  const shareTitle = encodeURIComponent(blog.title);
  const shareUrl = encodeURIComponent(articleUrl);
  const relatedBlogs = getRelatedBlogs(blog, 2);
  const relevantServices = getRelevantServicesForBlog(blog, 3);
  const blogFaqs = getBlogFaqs(blog);
  const directAnswer = getBlogDirectAnswer(blog);
  const pageTitle = blog.metaTitle || `${blog.title} | Zavior Technologies Blog`;
  const pageDescription = blog.metaDescription || blog.excerpt;
  const localizedTitle = getLocalizedTitle(blog, language);

  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: `/blog/${blog.slug}`,
      name: pageTitle,
      description: pageDescription,
      pageType: "Article",
      speakableSelectors: ["h1", "#direct-answer p", "article p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: blog.title, path: `/blog/${blog.slug}` },
    ]),
    articleJsonLd(blog),
    faqPageJsonLd(blogFaqs, `/blog/${blog.slug}#faq`),
  ]);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={blog.canonical}
        image={blog.image}
        path={`/blog/${blog.slug}`}
        keywords={blog.keywords}
        structuredData={structuredData}
        type="article"
      />
      <Head>
        <meta
          key="article:published_time"
          property="article:published_time"
          content={blog.publishedAt}
        />
        <meta
          key="article:modified_time"
          property="article:modified_time"
          content={blog.updatedAt || blog.publishedAt}
        />
        <meta
          key="article:author"
          property="article:author"
          content={blog.author.name}
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
                {localizedTitle}
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
                <Button asChild variant="outline" size="icon" className="bg-transparent">
                  <a
                    href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
                    aria-label="Share article by email"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="bg-transparent">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share article on X"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="bg-transparent">
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share article on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="direct-answer" className="pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Short Answer
            </p>
            <h2 className="text-2xl font-bold mb-3">
              What should readers know first?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {directAnswer}
            </p>
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
              alt={blog.imageAlt || blog.title}
              width={1200}
              height={600}
              sizes="(min-width: 1280px) 896px, (min-width: 768px) 100vw, 100vw"
              priority
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
              <SafeRichText html={blog.content} />
            </div>
          </motion.article>
        </div>
      </section>

      {relevantServices.length > 0 ? (
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Related Services
              </h2>
              <div className="grid gap-4">
                {relevantServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
                  >
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="faq" className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {blogFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Tags */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 py-6 border-t border-border">
              <span className="text-sm font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
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
                            alt={
                              "imageAlt" in relatedBlog && relatedBlog.imageAlt
                                ? relatedBlog.imageAlt
                                : relatedBlog.title
                            }
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sortedBlogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate on-demand for new posts
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const blog = blogs.find((b) => b.slug === params?.slug);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};
