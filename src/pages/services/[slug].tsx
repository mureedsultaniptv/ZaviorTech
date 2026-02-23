"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Head from "next/head";

export default function ServiceDetailPage() {
  const params = useParams();
  const service = services.find((s) => s.slug === params?.slug);

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

  return (
    <>
      <Head>
        <title>{service.title} | Zavior Technologies Dubai</title>
        <meta name="description" content={service.description} />
        <meta
          name="keywords"
          content={
            Array.isArray(service.metaKeywords)
              ? service.metaKeywords.join(", ")
              : service.metaKeywords || ""
          }
        />
        <link
          rel="canonical"
          href={`https://zaviortech.vercel.app/services/${service.slug}`}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src={service.image}
            alt={service.title}
            fill
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
            <div
              className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.longDescription }}
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
                className="w-full h-full object-cover"
              />
            </Card>
          </motion.div>
        </div>
      </section>

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
