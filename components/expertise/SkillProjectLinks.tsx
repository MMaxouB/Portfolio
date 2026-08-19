"use client";

import Link from "next/link";
import { Skill } from "@/lib/skills";
import { Project } from "@/lib/projects";
import { Plate } from "@/components/ui/Plate";

/**
 * The evidence panel (PORTFOLIO_SPEC §8.5 / §8.6).
 *
 * Selecting a skill turns a claim into proof: the description, and every
 * project that actually uses it. Empty state is honest — a skill with no
 * shipped project says so rather than hiding.
 */
export function SkillProjectLinks({
  skill,
  projects,
}: {
  skill: Skill | null;
  projects: Project[];
}) {
  return (
    <Plate className="p-7 lg:sticky lg:top-24">
      <div aria-live="polite" className="flex min-h-[280px] flex-col">
        {!skill ? (
          <div className="flex flex-1 flex-col justify-center">
            <span className="title-block text-accent">Evidence</span>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Select a skill to see the projects it is grounded in. Every level
              on the left is backed by something you can open and read.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="title-block text-accent">Evidence</span>
              <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
              <span className="title-block tabular-nums">
                {String(projects.length).padStart(2, "0")} projects
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-text-primary">
              {skill.name}
            </h2>

            {skill.description && (
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {skill.description}
              </p>
            )}

            <div className="mt-7 flex flex-col">
              {projects.length === 0 ? (
                <p className="title-block normal-case tracking-[0.06em]">
                  No shipped project references this skill yet.
                </p>
              ) : (
                projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex items-baseline gap-4 border-b border-border-subtle py-3 first:border-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="title-block shrink-0 tabular-nums">
                      {project.year}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-text-primary">
                      {project.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-4 shrink-0 bg-accent-dim transition-all duration-500 ease-out group-hover:w-8 group-hover:bg-accent"
                    />
                  </Link>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </Plate>
  );
}
