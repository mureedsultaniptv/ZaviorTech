"use client";

import { motion } from "@/lib/light-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats } from "@/lib/data/demo-data";

export function StatsSection() {
  const { t } = useLanguage();

  const statItems = [
    { value: stats.projects, label: t.stats.projects, suffix: "+" },
    { value: stats.clients, label: t.stats.clients, suffix: "+" },
    { value: stats.countries, label: t.stats.countries, suffix: "" },
    { value: stats.team, label: t.stats.team, suffix: "+" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t.stats.title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
