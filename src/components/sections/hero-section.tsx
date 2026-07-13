import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-visual">
      <div className="absolute inset-0 hero-visual__grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/75 to-background z-10" />

      <div className="container relative z-20 mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 hero-reveal">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            <span className="block">{t.hero.headline1}</span>
            {" "}
            <span className="text-primary">{t.hero.headline2}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-reveal">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/portfolio">
                <Play className="mr-2 h-4 w-4" />
                {t.hero.secondaryCta}
              </Link>
            </Button>
          </div>

          <div className="mt-16 pt-16 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">
              {t.hero.sectorsLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              {t.hero.sectors.map((sector) => (
                <div key={sector} className="text-lg font-semibold text-muted-foreground">
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
