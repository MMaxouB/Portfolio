import { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects.length) return null;

  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, index) => {
        // First project or specific indices can be featured large cards
        const isFeatured = index === 0;
        
        // If it's a featured large card, it spans the full width
        if (isFeatured) {
          return (
            <div key={project.slug} className="w-full">
              <ProjectCard project={project} featuredMode={true} />
            </div>
          );
        }
        
        // Wrap normal cards in a flex grid, but we need to group them properly.
        // For simplicity in React without complex chunking, we just rely on CSS Grid.
        // We close the previous flex and use a responsive grid for the rest.
        return null;
      })}
      
      {projects.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(1).map((project) => (
            <div key={project.slug}>
              <ProjectCard project={project} featuredMode={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
