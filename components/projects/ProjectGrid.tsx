import { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Asymmetric editorial grid (PORTFOLIO_SPEC §5.3).
 *
 * A 12-column bed with hand-assigned spans on a five-project rhythm: one lead
 * band, then two uneven pairs whose emphasis flips (7+5, then 5+7). An even
 * `1fr 1fr` is exactly the "algorithmique ou répétitif" layout the spec
 * rejects; flipping the pair is what stops the page reading as a product list.
 */
const SPANS = [
  "md:col-span-12",
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
      {projects.map((project, index) => {
        const span = SPANS[index % SPANS.length];
        const isWide = span === "md:col-span-12";

        return (
          <Reveal
            key={project.slug}
            delay={(index % SPANS.length) * 0.07}
            className={span}
          >
            <ProjectCard
              project={project}
              index={index + 1}
              featuredMode={isWide}
            />
          </Reveal>
        );
      })}
    </div>
  );
}
