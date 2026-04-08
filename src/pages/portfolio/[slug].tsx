// /src/pages/portfolio/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/seo-head";
import { SafeRichText } from "@/components/ui/safe-rich-text";
import { projects } from "@/lib/data/demo-data";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowLeft, ArrowRight, Calendar, Building, Globe } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  client: string;
  technologies: string[];
  image: string;
  projectOverview: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string | string[];
}

interface Props {
  project: Project;
}

export default function PortfolioDetailPage({ project }: Props) {
  // If project is null (should be handled by getStaticProps notFound), but just in case:
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The project you are looking for does not exist.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  // Build meta keywords string
  const metaKeywords = Array.isArray(project.metaKeywords)
    ? project.metaKeywords.join(", ")
    : project.metaKeywords || "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.metaDescription || project.description,
    creator: {
      "@type": "Organization",
      name: "Zavior Technologies",
    },
    about: project.category,
  };

  return (
    <>
      <SeoHead
        title={project.metaTitle || `${project.title} | Zavior Technologies`}
        description={project.metaDescription || project.description}
        image={project.image}
        path={`/portfolio/${project.slug}`}
        keywords={metaKeywords}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {project.category}
                </span>
                <span className="text-muted-foreground">{project.year}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground">Client</span>
                    <p className="font-medium">{project.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground">Year</span>
                    <p className="font-medium">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground">Category</span>
                    <p className="font-medium">{project.category}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden bg-card border-border/50">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={`${project.title} project image`}
                    width={600}
                    height={600}
                    className="w-full h-full object-fit"
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <SafeRichText
              className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed"
              html={project.projectOverview}
            />
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Projects</h2>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/portfolio">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/portfolio/${relatedProject.slug}`}>
                    <Card className="group h-full overflow-hidden bg-card hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          width={750}
                          height={250}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {relatedProject.category}
                        </span>
                        <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedProject.description}
                        </p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate on-demand for new projects
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
};
