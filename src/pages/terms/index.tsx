"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Users,
  ShieldCheck,
  Scale,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `By accessing and using Zavior's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update or modify these terms at any time without prior notice.`,
  },
  {
    icon: Users,
    title: "2. Use of Services",
    content: `You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:

- Use the services in any way that violates applicable laws or regulations
- Attempt to gain unauthorized access to any systems or networks
- Interfere with or disrupt the integrity or performance of the services
- Transmit any malicious code, viruses, or harmful components
- Collect or harvest any information from the services without permission`,
  },
  {
    icon: ShieldCheck,
    title: "3. Intellectual Property",
    content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Zavior and its licensors. The Service is protected by copyright, trademark, and other laws.

You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor may you reverse engineer or attempt to extract the source code of that software.`,
  },
  {
    icon: Scale,
    title: "4. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Zavior shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.

In no event shall our total liability exceed the amount paid by you, if any, for accessing our services during the twelve (12) months preceding the claim.`,
  },
  {
    icon: AlertTriangle,
    title: "5. Disclaimer of Warranties",
    content: `Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to:

- Merchantability or fitness for a particular purpose
- Non-infringement of third-party rights
- Accuracy, reliability, or completeness of content
- Uninterrupted or error-free service availability
- Security of data transmission`,
  },
  {
    icon: RefreshCcw,
    title: "6. Termination",
    content: `We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination.`,
  },
];

export default function TermsPage() {
  const { t, dir } = useLanguage();

  return (
    <main className="min-h-screen bg-background" dir={dir ? "ltr":"rtl"}>
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
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Please read these terms carefully before using our services.
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

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>
          </motion.div>

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
                  Questions?
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: legal@zavior.com</p>
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
