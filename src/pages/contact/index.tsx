"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building,
  Globe,
} from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Innovation Drive", "Tech Hub, Dubai, UAE"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+971 4 123 4567", "+971 50 123 4567"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@zavior.com", "support@zavior.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Sun - Thu: 9AM - 6PM", "Fri - Sat: Closed"],
  },
];

const offices = [
  { city: "Dubai", country: "UAE", address: "123 Innovation Drive, Tech Hub" },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    address: "456 Digital Street, Tech Valley",
  },
  { city: "Cairo", country: "Egypt", address: "789 Smart Boulevard, Maadi" },
];

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("service", selectedService);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leadform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        // e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };
  const { t, dir } = useLanguage();

  return (
    <main className="min-h-screen bg-background" dir={dir}>
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
            <Badge
              variant="outline"
              className="mb-4 border-primary/50 text-primary"
            >
              {t.contact.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {t.contact.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {t.contact.formTitle}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {t.contact.formSubtitle}
                      </p>
                    </div>
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t.contact.firstName}</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t.contact.lastName}</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">{t.contact.company}</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">{t.contact.service}</Label>
                      <Select
                        name="service"
                        onValueChange={(val) => setSelectedService(val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t.contact.selectService} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai">AI Automation</SelectItem>
                          <SelectItem value="erp">
                            ERP / Odoo Solutions
                          </SelectItem>
                          <SelectItem value="web">
                            Website Development
                          </SelectItem>
                          <SelectItem value="mobile">
                            Mobile Applications
                          </SelectItem>
                          <SelectItem value="it">IT Solutions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.contact.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t.contact.messagePlaceholder}
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === "loading"}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {status === "loading" ? "Sending..." : t.contact.send}
                    </Button>

                    {status === "success" && (
                      <p className="text-green-500 text-center mt-2">
                        ✅ Your message has been sent successfully!
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-red-500 text-center mt-2">
                        ❌ Something went wrong. Please try again later.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Offices */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                <div className="h-80 bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t.contact.mapPlaceholder}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Office Locations */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t.contact.offices}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {offices.map((office, index) => (
                      <div
                        key={office.city}
                        className={`pb-4 ${index < offices.length - 1 ? "border-b border-border/50" : ""}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            {office.city}, {office.country}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm pl-6">
                          {office.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t.contact.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t.contact.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Phone className="w-4 h-4 mr-2" />
                {t.contact.callNow}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t.contact.emailUs}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
