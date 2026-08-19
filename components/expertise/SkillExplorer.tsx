"use client";

import { useMemo, useState } from "react";
import {
  SKILLS,
  SKILL_CATEGORIES,
  CATEGORY_LABELS,
  getSkillsByCategory,
} from "@/lib/skills";
import { Project } from "@/lib/projects";
import { SkillGroup } from "./SkillGroup";
import { SkillProjectLinks } from "./SkillProjectLinks";

/**
 * Owns the one piece of state the expertise page needs: which skill is being
 * inspected. Filtering the projects for it is pure derivation (§8.6).
 */
export function SkillExplorer({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeSkill = useMemo(
    () => SKILLS.find((skill) => skill.slug === activeSlug) ?? null,
    [activeSlug]
  );

  const linkedProjects = useMemo(() => {
    if (!activeSkill) return [];
    return projects.filter((project) =>
      activeSkill.projectSlugs.includes(project.slug)
    );
  }, [activeSkill, projects]);

  // Selecting the active skill again clears the panel.
  const select = (slug: string) =>
    setActiveSlug((current) => (current === slug ? null : slug));

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col gap-14 lg:col-span-7">
        {SKILL_CATEGORIES.map((category, i) => (
          <SkillGroup
            key={category}
            index={String(i + 1).padStart(2, "0")}
            label={CATEGORY_LABELS[category]}
            skills={getSkillsByCategory(category)}
            activeSlug={activeSlug}
            onSelect={select}
          />
        ))}
      </div>

      <div className="lg:col-span-5">
        <SkillProjectLinks skill={activeSkill} projects={linkedProjects} />
      </div>
    </div>
  );
}
