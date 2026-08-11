// /src/pages/services/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/lib/data/demo-data";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { useLanguage } from "@/lib/i18n/language-context";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowLeft, ArrowRight, Check, MessageSquare } from "lucide-react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
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
  titleAr?: string;
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
  const { language } = useLanguage();

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
  const localizedTitle = getLocalizedTitle(service, language);

  const structuredData = jsonLdGraph([
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
        additionalStructuredData={[
          {
            data: {
              "@context": "https://schema.org",
              ...faqPageJsonLd(serviceFaqs, `/services/${service.slug}#faq`),
            },
            id: "service-faq-structured-data",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-neutral-950 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/95 via-neutral-950/80 to-primary/70" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Zavior Technologies · Dubai &amp; UAE
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-sm mb-5 text-balance">
              {localizedTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto drop-shadow-sm text-pretty">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Discuss your requirements <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="#service-details"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore the service
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="service-details" className="py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,48rem)_22rem] xl:justify-center xl:gap-16">
            <main className="min-w-0">
              <div id="direct-answer" className="mb-12 rounded-2xl border border-primary/15 bg-primary/[0.045] p-6 sm:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  How we help
                </p>
                <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  What does this service solve?
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {directAnswer}
                </p>
              </div>

              <div className="mb-12">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Capabilities
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                      What we deliver
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tailored to your processes and systems.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                    >
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <p className="font-medium leading-snug">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Service overview
                </p>
                <SafeRichText
                  className="service-rich-content"
                  html={service.longDescription}
                />
              </div>
            </main>

            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 20rem, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    Built for your operations
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-foreground">Plan your Odoo project</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Tell us about your workflows, modules, and connected systems. We’ll help you identify the practical next step.
                  </p>
                  <Button asChild className="mt-5 w-full">
                    <Link href="/contact">
                      <MessageSquare className="mr-2 size-4" />
                      Talk to a consultant
                    </Link>
                  </Button>
                </div>
              </div>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                Browse all services
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {serviceFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm transition-colors data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="py-5 text-base font-semibold hover:text-primary hover:no-underline sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
