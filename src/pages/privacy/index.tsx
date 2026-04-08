"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, make a purchase, request support, or communicate with us. This may include:
    
    - Name and contact information
    - Payment information
    - Company information
    - Communication preferences
    - Any other information you choose to provide`,
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    
    - Provide, maintain, and improve our services
    - Process transactions and send related information
    - Send technical notices and support messages
    - Respond to your comments and questions
    - Analyze usage patterns and trends
    - Protect against fraudulent or illegal activity`,
  },
  {
    icon: Lock,
    title: "Information Security",
    content: `We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use industry-standard encryption to protect sensitive data transmitted online.
    
    However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights and Choices",
    content: `You have certain rights regarding your personal information:
    
    - Access and update your account information
    - Request deletion of your personal data
    - Opt-out of marketing communications
    - Request a copy of your data
    - Lodge a complaint with a supervisory authority`,
  },
  {
    icon: Bell,
    title: "Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
    
    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.`,
  },
  {
    icon: Shield,
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
    
    We encourage you to review this privacy policy periodically for any changes. Changes are effective when they are posted on this page.`,
  },
];

export default function PrivacyPage() {
  const { dir } = useLanguage();

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <SeoHead
        title="Privacy Policy | Zavior Group"
        description="Read the Zavior Group privacy policy covering data collection, security practices, and user rights."
        path="/privacy"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: January 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>
                        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@zavior.com</p>
                  <p>Phone: +971 4 123 4567</p>
                  <p>Address: 123 Innovation Drive, Tech Hub, Dubai, UAE</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
