"use client";

import { useState } from "react";
import { Project } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

interface ProjectListProps {
  allProjects: Project[];
  featuredProjects: Project[];
}

export function ProjectList({ allProjects, featuredProjects }: ProjectListProps) {
  const [view, setView] = useState<"selected" | "all">("selected");
  const displayedProjects = view === "selected" ? featuredProjects : allProjects;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
            PORTFOLIO
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Projects & Architecture
          </h1>
        </div>
        
        <div className="flex bg-surface p-1 rounded-lg border border-border-subtle shrink-0">
          <button
            onClick={() => setView("selected")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              view === "selected" 
                ? "bg-bg-primary text-text-primary shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Selected
          </button>
          <button
            onClick={() => setView("all")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              view === "all" 
                ? "bg-bg-primary text-text-primary shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
        <ProjectGrid projects={displayedProjects} />
      </div>
    </div>
  );
}
