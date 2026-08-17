import { GetStaticPaths, GetStaticProps } from "next";
import { motion } from "@/lib/light-motion";
import Link from "next/link";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Compass,
  Database,
  Headphones,
  Layers3,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, stats } from "@/lib/data/demo-data";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import {
  getRelatedServices,
  getServiceDirectAnswer,
  getServiceFaqs,
} from "@/lib/seo-content";

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

type ServiceProfile = {
  category: string;
  descriptor: string;
  capabilities: string[];
};

const sensibleFeatures = (features: string[]) =>
  features.filter(
    (feature) =>
      feature.length >= 4 &&
      feature.length <= 74 &&
      !feature.toLowerCase().includes("dubai, uae") &&
      !feature.toLowerCase().includes("book a free"),
  );

function getServiceProfile(service: Service): ServiceProfile {
  const slug = service.slug.toLowerCase();
  const cleanFeatures = sensibleFeatures(service.features);

  if (slug.includes("odoo") || slug.includes("erp")) {
    return {
      category: "ERP & Odoo",
      descriptor: "Connected operations. Cleaner data. Better decisions.",
      capabilities:
        cleanFeatures.length >= 4
          ? cleanFeatures
          : [
              "Process discovery and ERP roadmap",
              "Module setup and workflow configuration",
              "Secure data migration and validation",
              "Custom development and integrations",
              "Role-based training and go-live",
              "Ongoing optimization and support",
            ],
    };
  }

  if (slug.includes("zoho")) {
    return {
      category: "Zoho Solutions",
      descriptor: "One connected platform for customers, teams, and finance.",
      capabilities:
        cleanFeatures.length >= 4
          ? cleanFeatures
          : [
              "Zoho application and process assessment",
              "CRM and operational workflow design",
              "Blueprints, automations, and approvals",
              "Data migration and system integrations",
              "Dashboards and management reporting",
              "Training and continuous improvement",
            ],
    };
  }

  if (slug.includes("ai") || slug.includes("api")) {
    return {
      category: "AI & Automation",
      descriptor: "Remove repetitive work and connect the systems that matter.",
      capabilities:
        cleanFeatures.length >= 4
          ? cleanFeatures
          : [
              "Automation opportunity assessment",
              "Secure API and data architecture",
              "Workflow and agent development",
              "ERP, CRM, and platform integrations",
              "Testing, monitoring, and safeguards",
              "Optimization after launch",
            ],
    };
  }

  if (slug.includes("web") || slug.includes("mobile") || slug.includes("software")) {
    return {
      category: "Digital Products",
      descriptor: "Purpose-built digital experiences engineered for growth.",
      capabilities:
        cleanFeatures.length >= 4
          ? cleanFeatures
          : [
              "Product discovery and UX planning",
              "Solution architecture and prototyping",
              "Responsive application development",
              "APIs and business system integrations",
              "Quality, security, and performance testing",
              "Launch, analytics, and support",
            ],
    };
  }

  return {
    category: "IT & Infrastructure",
    descriptor: "Reliable technology foundations for day-to-day business.",
    capabilities:
      cleanFeatures.length >= 4
        ? cleanFeatures
        : [
            "Technology and infrastructure assessment",
            "Solution design and implementation",
            "Networks, hardware, and cloud services",
            "Security and business continuity",
            "Monitoring and technical support",
            "Scalable improvement roadmap",
          ],
  };
}

const deliverySteps = [
  {
    number: "01",
    title: "Discover",
    description: "We map goals, workflows, users, data, and constraints before recommending a solution.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Design",
    description: "You receive a practical scope, solution architecture, milestones, and delivery roadmap.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Deliver",
    description: "We build in clear stages, validate with your team, and keep progress visible throughout.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch & improve",
    description: "We deploy carefully, enable users, monitor performance, and support the next iteration.",
    icon: Rocket,
  },
];

const outcomeCards = [
  {
    title: "Business-first scope",
    description: "Technology decisions stay tied to the operational result you need.",
    icon: ClipboardCheck,
  },
  {
    title: "Connected by design",
    description: "Data, teams, and tools work together instead of creating new silos.",
    icon: Workflow,
  },
  {
    title: "Built to scale",
    description: "A secure, maintainable foundation that can evolve with your business.",
    icon: ShieldCheck,
  },
  {
    title: "Support that continues",
    description: "Clear handover, user enablement, and practical help after launch.",
    icon: Headphones,
  },
];

export default function ServiceDetailPage({ service }: Props) {
  const { language } = useLanguage();

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Service Not Found</h1>
          <p className="mb-6 text-muted-foreground">The service you are looking for does not exist.</p>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const metaKeywords = Array.isArray(service.metaKeywords)
    ? service.metaKeywords.join(", ")
    : service.metaKeywords || "";
  const serviceFaqs = getServiceFaqs(service);
  const relatedServices = getRelatedServices(service, 3);
  const directAnswer = getServiceDirectAnswer(service);
  const pageTitle = service.metaTitle || `${service.title} | Zavior Technologies`;
  const pageDescription = service.metaDescription || service.description;
  const localizedTitle = getLocalizedTitle(service, language);
  const profile = getServiceProfile(service);

  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: `/services/${service.slug}`,
      name: pageTitle,
      description: pageDescription,
      speakableSelectors: ["h1", "#service-summary p", "#faq"],
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

      <div className="service-detail-page">
        <section className="relative isolate overflow-hidden bg-[#111318] pb-18 pt-28 text-white lg:pb-24 lg:pt-36">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_24%,rgba(196,30,42,0.30),transparent_34rem),linear-gradient(125deg,#101217_42%,#251316_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <ChevronRight className="size-3.5" />
              <Link href="/services" className="transition hover:text-white">Services</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-white/80">{profile.category}</span>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,.78fr)] lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <Sparkles className="size-3.5 text-red-400" /> {profile.category} specialists in Dubai
                </div>
                <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {localizedTitle}
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/72 md:text-xl">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full bg-[#c91b26] px-7 text-white hover:bg-[#ad101a]">
                    <Link href="/contact">Book a free consultation <ArrowRight className="size-4" /></Link>
                  </Button>
                  <a href="#capabilities" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/10">
                    Explore our approach
                  </a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/65">
                  {["Business-led discovery", "Clear project roadmap", "Support after launch"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-red-400" />{item}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }} className="relative mx-auto w-full max-w-xl lg:mx-0">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
                  <Image src={service.image} alt={service.title} fill priority sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">What success looks like</p>
                    <p className="mt-2 max-w-sm text-xl font-semibold leading-snug text-white">{profile.descriptor}</p>
                  </div>
                </div>
                <div className="absolute -right-3 -top-6 rounded-2xl border border-black/5 bg-white p-4 text-[#14171d] shadow-xl sm:-right-7 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-red-50 text-[#c91b26]"><BarChart3 className="size-5" /></span>
                    <div><p className="text-xs text-slate-500">Delivery model</p><p className="font-bold">Plan · Build · Improve</p></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid grid-cols-2 px-4 py-7 lg:grid-cols-4 lg:px-8">
            {[
              { value: `${stats.projects}+`, label: "Projects delivered" },
              { value: `${stats.clients}+`, label: "Clients supported" },
              { value: `${stats.countries}`, label: "Countries served" },
              { value: "End-to-end", label: "Delivery & support" },
            ].map((item, index) => (
              <div key={item.label} className={`px-4 py-3 text-center ${index % 2 ? "border-l border-border" : ""} ${index === 2 ? "lg:border-l" : ""} ${index === 3 ? "lg:border-l" : ""}`}>
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="service-summary" className="py-20 lg:py-28">
          <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 lg:px-8">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The business case</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A solution shaped around how your business works.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{directAnswer}</p>
              <Button asChild variant="outline" className="mt-7 rounded-full px-6">
                <Link href="/contact">Discuss your requirements <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {outcomeCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="capabilities" className="bg-muted/35 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">What we deliver</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The expertise your project needs, in one team.</h2>
              </div>
              <p className="max-w-lg leading-relaxed text-muted-foreground">A focused scope based on your current systems, priorities, internal capability, and growth plans.</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {profile.capabilities.slice(0, 6).map((feature, index) => (
                <div key={feature} className="group flex min-h-32 gap-4 bg-card p-6 transition hover:bg-background">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary/5 text-primary"><Check className="size-4" strokeWidth={2.5} /></span>
                  <div><p className="text-xs font-bold text-primary/65">0{index + 1}</p><h3 className="mt-2 text-base font-semibold leading-snug sm:text-lg">{feature}</h3></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A clear delivery process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From first conversation to confident launch.</h2>
              <p className="mt-4 text-lg text-muted-foreground">Structured enough to stay predictable, flexible enough to fit your operation.</p>
            </div>
            <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-border lg:block" aria-hidden="true" />
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.article key={step.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }} className="relative rounded-2xl border border-border bg-card p-6">
                    <div className="relative z-10 flex items-center justify-between"><span className="grid size-16 place-items-center rounded-2xl bg-[#17191f] text-white shadow-lg"><Icon className="size-6" /></span><span className="text-sm font-bold text-primary">{step.number}</span></div>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Accordion type="single" collapsible className="mx-auto max-w-5xl">
              <AccordionItem value="full-scope" className="overflow-hidden rounded-2xl border border-border bg-background px-6 shadow-sm sm:px-8">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <span><span className="block text-xs font-bold uppercase tracking-[0.16em] text-primary">Detailed service scope</span><span className="mt-2 block text-xl font-semibold sm:text-2xl">Need the full technical overview?</span></span>
                </AccordionTrigger>
                <AccordionContent className="border-t border-border pb-8 pt-7">
                  <SafeRichText className="service-rich-content mx-auto max-w-4xl" html={service.longDescription} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="faq" className="bg-muted/25 py-20 lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.62fr_1.38fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Common questions</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Answers before you get started.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Still deciding what you need? A short discovery call can clarify the right scope and next step.</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Ask us a question <ArrowRight className="size-4" /></Link>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {serviceFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/30">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-primary hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="pb-5 pr-8"><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-end justify-between gap-5">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Explore next</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Related services</h2></div>
                <Link href="/services" className="hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex">View all services <ArrowRight className="size-4" /></Link>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedServices.map((relatedService) => (
                  <Link key={relatedService.slug} href={`/services/${relatedService.slug}`} className="group flex min-h-52 flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Database className="size-5" /></span>
                    <h3 className="mt-5 text-xl font-semibold transition group-hover:text-primary">{relatedService.title}</h3>
                    <span className="mt-auto pt-6 text-sm font-semibold text-primary">Explore service <ArrowRight className="ml-1 inline size-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 pb-20 lg:px-8 lg:pb-28">
          <div className="container mx-auto overflow-hidden rounded-[2rem] bg-[#15171c] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Start with clarity</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Let’s shape the right {profile.category.toLowerCase()} solution for your business.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">Tell us where your process is slowing down. We’ll help you define a practical scope, delivery path, and next step.</p>
              </div>
              <Button asChild size="lg" className="h-12 rounded-full bg-[#c91b26] px-7 text-white hover:bg-[#ad101a]">
                <Link href="/contact"><MessageSquare className="size-4" /> Book a free consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: services.map((service) => ({ params: { slug: service.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const service = services.find((item) => item.slug === params?.slug);
  return service ? { props: { service } } : { notFound: true };
};
