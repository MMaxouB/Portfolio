import { Metadata } from "next";
import { getProjects, getFeaturedProjects } from "@/lib/projects";
import { ProjectList } from "@/components/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of open source, public, and private projects showcasing software engineering and security architecture.",
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto min-h-screen max-w-6xl px-6 py-28">
      <ProjectList
        allProjects={getProjects()}
        featuredProjects={getFeaturedProjects()}
      />
    </div>
  );
}
