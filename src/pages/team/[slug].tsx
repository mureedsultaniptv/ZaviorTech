"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { team } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { Linkedin, Twitter, Github, Globe, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function TeamMemberDetailPage() {
  const params = useParams();
  const member = team.find((m) => m.slug === params?.slug);

  if (!member) {
    return(<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Team Member Not Found</h1>
        <p className="text-muted-foreground mb-6">The team member you are looking for does not exist.</p>
        <Link href="/team" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          ← Back to Team
        </Link>
      </div>
    </div>);
  }

  const relatedMembers = team
    .filter((m) => m.id !== member.id)
    .slice(0, 3); // show 3 related team members

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    facebook: Facebook,
    instagram: Instagram,
    website: Globe,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              ← Back to Team
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left: Member Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="overflow-hidden bg-card border-border/50">
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Card>

              {/* Social Links */}
              <div className="flex gap-4 mt-4">
                {member.social &&
                  Object.entries(member.social).map(([key, url]) => {
                    if (!url) return null;
                    const Icon = socialIcons[key as keyof typeof socialIcons] || Globe;
                    return (
                      <Link key={key} href={url} target="_blank">
                        <Icon className="h-6 w-6 text-primary hover:text-accent" />
                      </Link>
                    );
                  })}
              </div>
            </motion.div>

            {/* Right: Member Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
              <p className="text-primary font-medium mb-6">{member.role}</p>

              <div className="space-y-6 text-muted-foreground">
                <p>{member.bio}</p>
                <div className="flex gap-8">
                  <div>
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <p className="font-medium">{member.experience}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Education</span>
                    <p className="font-medium">{member.education}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed HTML Section */}
      {member.details && (
        <section className="py-20 bg-muted/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div
              className="prose prose-lg dark:prose-invert text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: member.details }}
            />
          </div>
        </section>
      )}

      {/* Related Team Members */}
      {relatedMembers.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMembers.map((relatedMember) => (
                <motion.div
                  key={relatedMember.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/team/${relatedMember.slug}`}>
                    <Card className="group h-full overflow-hidden bg-card hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                      <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <Image
                          src={relatedMember.image}
                          alt={relatedMember.name}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {relatedMember.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{relatedMember.role}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
