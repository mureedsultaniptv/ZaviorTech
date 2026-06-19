import demoData from "@/lib/demo-data.json";

export const site = demoData.site;
export const companies = demoData.companies;
export const services = demoData.services;
export const projects = demoData.projects;
export const blogs = demoData.blogs;
export const sortedBlogs = [...demoData.blogs].sort(
  (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
);
export const team = demoData.team;
export const testimonials = demoData.testimonials;
export const faqs = demoData.faqs;
export const careers = demoData.careers;
export const stats = demoData.stats;
export const milestones = demoData.milestones;

// Aliases for backward compatibility with existing page imports.
export const jobOpenings = demoData.careers.map((job) => ({
  ...job,
  skills: job.requirements.slice(0, 4),
  salary: "Competitive",
}));

export const teamMembers = demoData.team.map((member) => ({
  ...member,
  linkedin: member.social?.linkedin || "#",
  twitter: member.social?.twitter || "#",
  email: `${member.id}@zavior.com`,
}));

export default demoData;
