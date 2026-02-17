"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Building, Globe, Smartphone, Server, CircuitBoard } from "lucide-react";

const iconMap = {
  ai: Brain,
  erp: Building,
  web: Globe,
  mobile: Smartphone,
  it: Server,
  coreit: CircuitBoard,
};

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { key: "erp" as const, ...t.services.erp },
    { key: "web" as const, ...t.services.web },
    { key: "mobile" as const, ...t.services.mobile },
    { key: "it" as const, ...t.services.it },
    { key: "ai" as const, ...t.services.ai },
    { key: "coreit" as const, ...t.services.coreit },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.key];
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/30">
                  <CardContent className="p-6 lg:p-8">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href={`/services#${service.key}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline group"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline" className="bg-transparent">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
