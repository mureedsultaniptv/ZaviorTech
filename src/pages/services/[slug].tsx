// /src/pages/services/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import { services } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import {
  getRelatedBlogsForService,
  getRelatedServices,
  getServiceDirectAnswer,
  getServiceFaqs,
} from "@/lib/seo-content";

// Define the shape of a service (adjust based on your actual data)
interface Service {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string | string[];
  image: string;
  features: string[];
  longDescription: string;
  faqs?: Array<{ question: string; answer: string }>;
}

interface Props {
  service: Service;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function ServiceDetailPage({ service }: Props) {
  // If service is null (should be handled by getStaticProps notFound), but just in case:
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The service you are looking for does not exist.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Build meta keywords string
  const metaKeywords = Array.isArray(service.metaKeywords)
    ? service.metaKeywords.join(", ")
    : service.metaKeywords || "";
  const serviceFaqs = getServiceFaqs(service);
  const relatedServices = getRelatedServices(service, 3);
  const relatedBlogs = getRelatedBlogsForService(service, 3);
  const directAnswer = getServiceDirectAnswer(service);
  const pageTitle = service.metaTitle || `${service.title} | Zavior Technologies`;
  const pageDescription = service.metaDescription || service.description;

  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd({
      path: `/services/${service.slug}`,
      name: pageTitle,
      description: pageDescription,
      speakableSelectors: ["h1", "#direct-answer p", "#faq"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
    serviceJsonLd(service),
    faqPageJsonLd(serviceFaqs, `/services/${service.slug}#faq`),
  ]);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        image={service.image}
        path={`/services/${service.slug}`}
        keywords={metaKeywords}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {service.description}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Book Consultancy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="direct-answer" className="py-12 border-y border-border/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Short Answer
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What does {service.title} solve?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {directAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Key Features of {service.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-card rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <Check className="h-6 w-6 text-primary mt-1" />
                <p className="text-muted-foreground font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">About This Service</h2>
            <SafeRichText
              className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed"
              html={service.longDescription}
            />
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={500}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {serviceFaqs.map((faq) => (
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
                  Talk to a Zavior Consultant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {(relatedServices.length > 0 || relatedBlogs.length > 0) && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {relatedServices.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Related Services</h2>
                  <div className="space-y-4">
                    {relatedServices.map((relatedService) => (
                      <Link
                        key={relatedService.slug}
                        href={`/services/${relatedService.slug}`}
                        className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
                      >
                        <h3 className="font-semibold mb-2">
                          {relatedService.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {relatedService.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedBlogs.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Helpful Articles</h2>
                  <div className="space-y-4">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog.slug}
                        href={`/blog/${blog.slug}`}
                        className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
                      >
                        <h3 className="font-semibold mb-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {blog.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Book Consultancy CTA */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Book Your Consultancy Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Speak with our experts and discover how{" "}
            <strong>{service.title}</strong> can help grow your business in
            Dubai.
          </motion.p>
          <Button asChild size="lg">
            <Link href="/contact">
              Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate on-demand for new services
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const service = services.find((s) => s.slug === params?.slug);

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
  };
};
