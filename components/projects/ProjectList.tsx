"use client";

import { useState } from "react";
import { Project } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProjectListProps {
  allProjects: Project[];
  featuredProjects: Project[];
}

const VIEWS = [
  { id: "selected", label: "Selected" },
  { id: "all", label: "All" },
] as const;

type View = (typeof VIEWS)[number]["id"];

export function ProjectList({ allProjects, featuredProjects }: ProjectListProps) {
  const [view, setView] = useState<View>("selected");
  const displayed = view === "selected" ? featuredProjects : allProjects;

  return (
    <div>
      <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          as="h1"
          index="01"
          label="Portfolio"
          title="Systems, not screenshots."
          description="Every entry is a real system with a real constraint. The figure on each plate is its architecture, not a stock image."
          className="flex-1"
        />

        {/* Segmented control — mono labels over a shared rule, no pill chrome */}
        <div
          role="tablist"
          aria-label="Project view"
          className="flex shrink-0 items-stretch"
        >
          {VIEWS.map(({ id, label }) => {
            const isActive = view === id;
            const count = id === "selected" ? featuredProjects.length : allProjects.length;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setView(id)}
                className="group/tab flex flex-col gap-2 px-5 pb-2 text-left focus-visible:outline-none"
              >
                <span
                  className={`title-block transition-colors ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted group-hover/tab:text-text-secondary"
                  }`}
                >
                  {label} · {count}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px w-full origin-left transition-all duration-500 ease-out ${
                    isActive ? "scale-x-100 bg-accent" : "scale-x-100 bg-border-subtle"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* key forces the reveal animation to replay when the set changes */}
      <ProjectGrid key={view} projects={displayed} />
    </div>
  );
}
