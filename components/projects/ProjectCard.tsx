import { ViewTransition } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { Plate } from "@/components/ui/Plate";
import { ProjectFigure } from "./visuals/figures";
import { cn } from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  /** Enumerated position in the grid, rendered in the plate's title block */
  index: number;
  /** Full-width lead card: figure on the left, content on the right */
  featuredMode?: boolean;
}

const TYPE_LABEL: Record<Project["type"], string> = {
  "open-source": "Open Source",
  public: "Public",
  private: "Private",
  nda: "NDA",
};

export function ProjectCard({
  project,
  index,
  featuredMode = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-plate outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
    >
      <Plate
        interactive
        index={String(index).padStart(2, "0")}
        className={cn(
          "flex h-full flex-col overflow-hidden",
          featuredMode && "md:flex-row"
        )}
      >
        {/* Figure — the drawing, not a placeholder block */}
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center border-border-subtle bg-bg-primary/60 p-4",
            featuredMode
              ? "border-b md:w-[55%] md:border-b-0 md:border-r"
              : "border-b"
          )}
        >
          {/* Faint ruled backing, so the figure sits on paper */}
          <div
            aria-hidden="true"
            className="paper-rules absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]"
          />
          <ViewTransition name={`figure-${project.slug}`}>
            <div className="relative w-full">
              <ProjectFigure
                slug={project.slug}
                className={cn(
                  "w-full transition-opacity duration-500 [&_text]:transition-colors",
                  featuredMode ? "max-h-[280px]" : "max-h-[190px]"
                )}
              />
            </div>
          </ViewTransition>
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex flex-1 flex-col p-6",
            featuredMode && "md:w-[45%] md:justify-center md:p-8"
          )}
        >
          {/* Title block strip */}
          <div className="mb-5 flex items-center gap-3">
            <span className="title-block text-accent">
              {TYPE_LABEL[project.type]}
            </span>
            <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
            <span className="title-block tabular-nums">{project.year}</span>
          </div>

          <h3
            className={cn(
              "font-semibold tracking-[-0.02em] text-text-primary",
              featuredMode ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
            {project.shortDescription}
          </p>

          {/* Tags — nature of the project only (§5.6) */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {project.category.map((tag) => (
              <span key={tag} className="title-block text-text-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: role, and a CTA that draws itself in on hover (§5.5) */}
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-border-subtle pt-4">
            <span className="title-block">{project.role}</span>
            <span className="flex items-center gap-2 overflow-hidden">
              <span className="title-block text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View project
              </span>
              <span
                aria-hidden="true"
                className="h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-6"
              />
            </span>
          </div>
        </div>
      </Plate>
    </Link>
  );
}
