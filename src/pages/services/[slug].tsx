import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  CloudCog,
  Code2,
  Compass,
  Headphones,
  MessageSquare,
  Network,
  ShieldCheck,
} from "lucide-react";

import { motion } from "@/lib/light-motion";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import { services, stats } from "@/lib/data/demo-data";
import { getLocalizedTitle } from "@/lib/i18n/localized-content";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  findServiceSection,
  parseServiceContent,
  shortServiceTitle,
  type ServiceContentItem,
} from "@/lib/service-content";
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

const categoryProfiles = {
  odoo: {
    category: "ERP & Odoo",
    promise: "One connected operating system for your business",
    icon: Blocks,
    brand: "/brands/odoo-logo.svg",
    heroImage: "/images/odoo-19-leads-dashboard.png",
  },
  zoho: {
    category: "Zoho Solutions",
    promise: "Connect customers, finance, teams, and workflows",
    icon: CloudCog,
    brand: "/brands/zoho-logo.svg",
    heroImage: "/images/zoho-crm-kanban-pipeline.png",
  },
  automation: {
    category: "AI & Automation",
    promise: "Move work faster with intelligent, connected workflows",
    icon: Bot,
    brand: undefined,
    heroImage: "/services/ai-automation.webp",
  },
  digital: {
    category: "Digital Products",
    promise: "Useful digital products, engineered around real users",
    icon: Code2,
    brand: undefined,
    heroImage: "/services/website-dev.webp",
  },
  infrastructure: {
    category: "IT & Infrastructure",
    promise: "A secure, dependable foundation for everyday operations",
    icon: Network,
    brand: undefined,
    heroImage: "/services/core-it.webp",
  },
};

function getProfile(service: Service) {
  const slug = service.slug.toLowerCase();
  if (slug.includes("zoho")) return categoryProfiles.zoho;
  if (slug.includes("odoo") || slug.includes("erp")) return categoryProfiles.odoo;
  if (slug.includes("ai") || slug.includes("api")) return categoryProfiles.automation;
  if (slug.includes("web") || slug.includes("mobile") || slug.includes("software")) return categoryProfiles.digital;
  return categoryProfiles.infrastructure;
}

const fallbackChallenges = [
  { title: "Disconnected workflows", description: "Teams lose time when systems, information, and responsibilities are not connected clearly." },
  { title: "Too much manual work", description: "Repeated entry, approvals, and follow-up make everyday operations slower and less reliable." },
  { title: "Limited visibility", description: "Scattered information makes reporting, planning, and confident decision-making difficult." },
];

const trustPoints = [
  { title: "Business-led discovery", icon: Compass },
  { title: "Secure delivery", icon: ShieldCheck },
  { title: "Support after launch", icon: Headphones },
];

function compactItems(items: ServiceContentItem[], fallback: string[]) {
  if (items.length) return items;
  return fallback.map((title) => ({ title, description: "Configured and delivered around your operational requirements." }));
}

export default function ServiceDetailPage({ service }: Props) {
  const { language } = useLanguage();

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Service Not Found</h1>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-primary"><ArrowLeft className="size-4" />Back to services</Link>
        </div>
      </div>
    );
  }

  const profile = getProfile(service);
  const ProfileIcon = profile.icon;
  const contentSections = parseServiceContent(service.longDescription);
  const challengeSection = findServiceSection(contentSections, [
    /business challenges we solve/i,
    /when does your business need/i,
  ]);
  const deliverySection = findServiceSection(contentSections, [
    /^our .+ services$/i,
    /^what we cover in our/i,
    /^our .+ development services$/i,
  ]);
  const processSection = findServiceSection(contentSections, [/\bprocess\b/i]);
  const challenges = challengeSection?.items.length ? challengeSection.items : fallbackChallenges;
  const capabilities = compactItems(deliverySection?.items ?? [], service.features);
  const process = compactItems(processSection?.items ?? [], ["Discovery", "Solution design", "Implementation", "Testing", "Launch", "Support"]);
  const serviceFaqs = getServiceFaqs(service);
  const relatedServices = getRelatedServices(service, 3);
  const directAnswer = getServiceDirectAnswer(service);
  const localizedTitle = getLocalizedTitle(service, language);
  const pageTitle = service.metaTitle || `${service.title} | Zavior Technologies`;
  const pageDescription = service.metaDescription || service.description;
  const metaKeywords = Array.isArray(service.metaKeywords) ? service.metaKeywords.join(", ") : service.metaKeywords || "";

  const structuredData = jsonLdGraph([
    webPageJsonLd({
      path: `/services/${service.slug}`,
      name: pageTitle,
      description: pageDescription,
      speakableSelectors: ["h1", "#overview p", "#faq"],
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
            data: { "@context": "https://schema.org", ...faqPageJsonLd(serviceFaqs, `/services/${service.slug}#faq`) },
            id: "service-faq-structured-data",
          },
        ]}
      />

      <div className="service-detail-page bg-background">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-red-50 via-white to-slate-50 pb-20 pt-28 dark:from-red-950/20 dark:via-background dark:to-slate-950/20 lg:pb-28 lg:pt-36">
          <div className="absolute -right-40 top-0 -z-10 size-[38rem] rounded-full border-[5rem] border-primary/[0.035]" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-9 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition hover:text-primary">Home</Link><ChevronRight className="size-3.5" />
              <Link href="/services" className="transition hover:text-primary">Services</Link><ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">{profile.category}</span>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,.95fr)_minmax(26rem,1.05fr)] lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary shadow-sm backdrop-blur">
                  <ProfileIcon className="size-4" /> {profile.category} · Dubai & UAE
                </div>
                <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">{localizedTitle}</h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">{service.description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full px-7 shadow-lg shadow-primary/15"><Link href="/contact">Book a free consultation <ArrowRight className="size-4" /></Link></Button>
                  <a href="#capabilities" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/70 px-7 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary">Explore the service</a>
                </div>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {trustPoints.map((point) => { const Icon = point.icon; return <div key={point.title} className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="size-4" /></span>{point.title}</div>; })}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="relative mx-auto w-full max-w-2xl">
                <div className="rounded-[1.75rem] border border-border/80 bg-card p-3 shadow-[0_28px_80px_-30px_rgba(25,29,38,.35)] sm:p-4">
                  <div className="mb-3 flex items-center gap-1.5 px-2"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 h-6 flex-1 rounded-md bg-muted" /></div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                    <Image src={profile.heroImage || service.image} alt={`${service.title} solution preview`} fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover object-center" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-5 pt-16 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-300">Designed for the way you work</p>
                      <p className="mt-2 text-xl font-semibold">{profile.promise}</p>
                    </div>
                  </div>
                </div>
                {profile.brand ? <div className="absolute -bottom-5 -left-3 rounded-2xl border border-border bg-white px-5 py-3 shadow-xl sm:-left-7"><Image src={profile.brand} alt={profile.category} width={112} height={38} className="h-8 w-auto" /></div> : null}
                <div className="absolute -right-3 -top-5 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold shadow-xl sm:-right-6"><CheckCircle2 className="size-5 text-primary" />End-to-end delivery</div>
              </motion.div>
            </div>
          </div>
        </section>

        <nav className="sticky top-[4.8rem] z-30 hidden border-y border-border bg-background/90 backdrop-blur-lg lg:block" aria-label="Service page sections">
          <div className="container mx-auto flex items-center justify-between overflow-x-auto px-4 lg:px-8">
            <div className="flex min-w-max items-center gap-6 text-sm font-semibold lg:gap-8">
              <a href="#overview" className="py-5 transition hover:text-primary">Overview</a>
              <a href="#challenges" className="py-5 transition hover:text-primary">Challenges</a>
              <a href="#capabilities" className="py-5 transition hover:text-primary">Capabilities</a>
              <a href="#process" className="py-5 transition hover:text-primary">Process</a>
              <a href="#faq" className="py-5 transition hover:text-primary">FAQs</a>
            </div>
            <Link href="/contact" className="hidden shrink-0 items-center gap-2 text-sm font-bold text-primary lg:inline-flex">Start a conversation <ArrowRight className="size-4" /></Link>
          </div>
        </nav>

        <section id="overview" className="py-20 lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-16 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Service overview</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built around your operation—not a generic template.</h2>
            </div>
            <div>
              <p className="text-xl leading-relaxed text-foreground/80">{directAnswer}</p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-7">
                {[{ value: `${stats.projects}+`, label: "Projects" }, { value: `${stats.clients}+`, label: "Clients" }, { value: `${stats.countries}`, label: "Countries" }].map((stat) => <div key={stat.label}><p className="text-2xl font-bold sm:text-3xl">{stat.value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</p></div>)}
              </div>
            </div>
          </div>
        </section>


        <section id="challenges" className="border-y border-border bg-muted/30 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{challengeSection?.title || "Problems we help solve"}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Turn operational friction into a clearer way of working.</h2>{challengeSection?.introduction ? <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{challengeSection.introduction}</p> : null}</div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {challenges.slice(0, 6).map((item, index) => (
                <motion.article key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.04 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><CircleDot className="size-5" /></span><span className="text-xs font-bold text-muted-foreground">0{index + 1}</span></div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  {item.description ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{deliverySection?.title || "What we deliver"}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Focused expertise from discovery through launch.</h2></div>
              {deliverySection?.introduction ? <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">{deliverySection.introduction}</p> : null}
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.slice(0, 8).map((item, index) => (
                <article key={item.title} className="group min-h-52 bg-card p-6 transition hover:bg-muted/50">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-[#17191f] text-white"><Check className="size-5" /></span><span className="text-xs font-bold text-primary">0{index + 1}</span></div>
                  <h3 className="mt-6 text-lg font-semibold leading-snug">{item.title}</h3>
                  {item.description ? <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{processSection?.title || "Our delivery process"}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A visible path from first workshop to confident launch.</h2></div>
            <div className="mx-auto mt-12 max-w-5xl">
              {process.slice(0, 6).map((item, index) => (
                <motion.article key={`${item.title}-${index}`} initial={{ opacity: 0, x: index % 2 ? 10 : -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="grid gap-4 border-t border-border py-6 sm:grid-cols-[5rem_16rem_1fr] sm:items-start sm:gap-6">
                  <span className="text-sm font-bold text-primary">0{index + 1}</span><h3 className="text-lg font-semibold">{item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="full-service-scope" className="border-y border-border bg-muted/25 py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SafeRichText className="service-rich-content service-rich-content--themed-document mx-auto max-w-4xl" html={service.longDescription} />
          </div>
        </section>

        <section id="faq" className="py-20 lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.58fr_1.42fr] lg:gap-16">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Frequently asked</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2><p className="mt-4 leading-relaxed text-muted-foreground">Clear answers about the service, delivery, and ongoing support.</p></div>
            <div className="space-y-5">
              {serviceFaqs.map((faq) => <article key={faq.question} className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"><h3 className="text-base font-semibold sm:text-lg">{faq.question}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p></article>)}
            </div>
          </div>
        </section>

        {relatedServices.length ? (
          <section className="border-t border-border bg-muted/25 py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Continue exploring</p><h2 className="mt-3 text-3xl font-bold">Related services</h2></div><Link href="/services" className="hidden items-center gap-2 text-sm font-bold text-primary sm:inline-flex">All services <ArrowRight className="size-4" /></Link></div>
              <div className="mt-8 grid gap-5 md:grid-cols-3">{relatedServices.map((related) => <Link key={related.slug} href={`/services/${related.slug}`} className="group flex min-h-48 flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"><span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{getProfile(related).category}</span><h3 className="mt-4 text-xl font-semibold">{shortServiceTitle(related.title)}</h3><span className="mt-auto pt-6 text-sm font-bold text-primary">View service <ArrowRight className="ml-1 inline size-4 transition group-hover:translate-x-1" /></span></Link>)}</div>
            </div>
          </section>
        ) : null}

        <section className="px-4 py-20 lg:px-8 lg:py-28">
          <div className="container mx-auto overflow-hidden rounded-[2rem] bg-[#15171c] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Start with clarity</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Let’s plan the right {profile.category.toLowerCase()} solution.</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">Tell us what needs to work better. We’ll help you define the scope, priorities, and practical next step.</p></div><Button asChild size="lg" className="h-12 rounded-full px-7"><Link href="/contact"><MessageSquare className="size-4" />Book a free consultation</Link></Button></div>
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
