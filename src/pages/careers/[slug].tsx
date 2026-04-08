"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { SeoHead } from "@/components/seo/seo-head";
import { jobOpenings } from "@/lib/data/demo-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export default function CareerDetailPage() {
  const router = useRouter();
  const slug =
    typeof router.query.slug === "string" ? router.query.slug : undefined;
  const { t, dir } = useLanguage();
  const job = jobOpenings.find((j) => j.id === slug);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    cover: "",
    resume: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFormData((prev) => ({ ...prev, resume: null }));
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const hasValidExtension = ["pdf", "doc", "docx"].includes(extension || "");
    const hasValidMime = !file.type || ALLOWED_RESUME_TYPES.has(file.type);

    if (
      !hasValidExtension ||
      !hasValidMime ||
      file.size > MAX_RESUME_BYTES
    ) {
      setMessage({
        type: "error",
        text: "Please upload a PDF, DOC, or DOCX file up to 4 MB.",
      });
      e.target.value = "";
      return;
    }

    setMessage(null);
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.name || !formData.email || !formData.resume) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (!val) {
          return;
        }

        if (val instanceof File) {
          fd.append(key, val);
          return;
        }

        fd.append(key, val);
      });
      fd.append("jobId", job?.id || "");

      const res = await fetch("/api/applyJob", {
        method: "POST",
        headers: {
          "x-zavior-form": "job-application",
        },
        body: fd,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Submission failed");

      setMessage({
        type: "success",
        text: "Application submitted successfully!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        cover: "",
        resume: null,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!router.isReady) {
    return null;
  }

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The job you are looking for does not exist.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <SeoHead
        title={`${job.title} | Careers at Zavior Group`}
        description={job.description}
        path={`/careers/${job.id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          employmentType: job.type,
          jobLocationType: job.location,
        }}
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/careers"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.careers.backToJobs}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/50 text-primary"
            >
              {job.department}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <MapPin className="w-4 h-4" />
                {job.location}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Clock className="w-4 h-4" />
                {job.type}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Briefcase className="w-4 h-4" />
                {job.experience}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t.careers.aboutRole}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t.careers.responsibilities}
                    </h2>
                    <ul className="space-y-3">
                      {[
                        "Design and develop high-quality software solutions",
                        "Collaborate with cross-functional teams",
                        "Participate in code reviews and maintain code quality",
                        "Mentor junior team members",
                        "Contribute to technical architecture decisions",
                        "Stay updated with latest technologies",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t.careers.requirements}
                    </h2>
                    <ul className="space-y-3">
                      {[
                        `${job.experience} of relevant experience`,
                        "Strong problem-solving skills",
                        "Excellent communication abilities",
                        "Bachelor's degree in related field or equivalent",
                        "Experience with agile methodologies",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t.careers.skills}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-4 py-2 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {t.careers.applyNow}
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.careers.fullName}</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={120}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.careers.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={160}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.careers.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="tel"
                        maxLength={30}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">{t.careers.linkedin}</Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/johndoe"
                        value={formData.linkedin}
                        onChange={handleChange}
                        maxLength={300}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio URL</Label>
                      <Input
                        id="portfolio"
                        placeholder="https://portfolio.com"
                        value={formData.portfolio}
                        onChange={handleChange}
                        maxLength={300}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">{t.careers.resume}</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {formData.resume
                            ? formData.resume.name
                            : t.careers.uploadResume}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cover">{t.careers.coverLetter}</Label>
                      <Textarea
                        id="cover"
                        placeholder={t.careers.coverPlaceholder}
                        rows={4}
                        value={formData.cover}
                        onChange={handleChange}
                        maxLength={2000}
                      />
                    </div>

                    {message && (
                      <div
                        className={`p-3 rounded ${
                          message.type === "success"
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        {message.type === "success" && (
                          <CheckCircle className="inline mr-2" />
                        )}
                        {message.text}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={submitting}
                    >
                      {submitting
                        ? "Submitting..."
                        : t.careers.submitApplication}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
