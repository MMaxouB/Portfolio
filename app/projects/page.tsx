import { Metadata } from "next";
import { getProjects, getFeaturedProjects } from "@/lib/projects";
import { ProjectList } from "@/components/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of open source, public, and private projects showcasing software engineering and security architecture.",
};

export default function ProjectsPage() {
  const allProjects = getProjects();
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="container mx-auto max-w-5xl px-6 py-24 min-h-screen">
      <ProjectList allProjects={allProjects} featuredProjects={featuredProjects} />
    </div>
  );
}
