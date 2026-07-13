"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Github, Instagram, Dribbble, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { team } from "@/lib/data/demo-data"; // ✅ Import your actual team data
import { SeoHead } from "@/components/seo/seo-head";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  personJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

type SocialLinkType =
  | "linkedin"
  | "twitter"
  | "github"
  | "facebook"
  | "instagram"
  | "dribbble";

export default function TeamPage() {
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  // Separate leadership from team
  const leadership = team.filter((m) =>
    ["Owner", "CEO", "CTO", "Head"].some((r) => m.role.includes(r))
  );
  const otherTeam = team.filter((m) => !leadership.includes(m));
  const structuredData = jsonLdGraph([
    organizationJsonLd(),
    webPageJsonLd({
      path: "/team",
      name: "Zavior Technologies Team",
      description:
        "Meet the people behind Zavior Technologies, including leadership and delivery team members.",
      speakableSelectors: ["h1", "main p:first-of-type"],
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Team", path: "/team" },
    ]),
    itemListJsonLd(
      "Zavior Technologies team members",
      team.map((member) => ({
        name: member.name,
        path: `/team/${member.slug}`,
      })),
    ),
    ...team.map((member) => personJsonLd(member)),
  ]);

  // Function to render social icons dynamically
  const renderSocialIcon = (type: SocialLinkType, url: string) => {
    if (!url) return null;
    const className = "w-5 h-5 text-muted-foreground hover:text-primary transition-colors";
    switch (type) {
      case "linkedin":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Linkedin className={className} /></Link>;
      case "twitter":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Twitter className={className} /></Link>;
      case "github":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Github className={className} /></Link>;
      case "facebook":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Facebook className={className} /></Link>;
      case "instagram":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Instagram className={className} /></Link>;
      case "dribbble":
        return <Link href={url} target="_blank" rel="noopener noreferrer"><Dribbble className={className} /></Link>;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <SeoHead
        title="Terms & Conditions | Zavior Technologies UAE"
        description="Read the Zavior Group terms of service to understand website usage, user responsibilities, service conditions, legal terms, and policy compliance."
        path="/team"
        structuredData={structuredData}
        structuredDataId="team-structured-data"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center max-w-3xl mx-auto ${isRTL ? "rtl" : ""}`}
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              Meet Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Talented People Behind Our Success
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Dedicated professionals leading innovation, sustainability, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Leadership"
            title="Executive Leadership Team"
            subtitle="Our leadership team brings vision, strategy, and inspiration to everything we do."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {leadership.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-6 relative -mt-16">
                    <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                      <Link
                        href={`/team/${member.slug}`}
                        className="mb-4 inline-flex text-sm font-medium text-primary hover:underline"
                      >
                        View profile
                      </Link>
                      <div className="flex gap-3">
                        {member.social &&
                          Object.entries(member.social).map(([key, url]) => {
                            if (!url) {
                              return null;
                            }

                            return renderSocialIcon(key as SocialLinkType, url);
                          })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Our Team"
            title="Creative & Dedicated People"
            subtitle="Meet the professionals who make our mission a reality every day."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {otherTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                    <Link
                      href={`/team/${member.slug}`}
                      className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                    >
                      View profile
                    </Link>
                    <div className="flex gap-3 mt-4">
                      {member.social &&
                        Object.entries(member.social).map(([key, url]) => {
                          if (!url) {
                            return null;
                          }

                          return renderSocialIcon(key as SocialLinkType, url);
                        })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Join Our Mission
            </h2>
            <p className="text-muted-foreground mb-8">
              We’re always looking for passionate, creative people to join our growing family.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              View Careers
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
