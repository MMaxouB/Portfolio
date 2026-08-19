"use client";

import { Skill } from "@/lib/skills";
import { SkillBar } from "./SkillBar";

interface SkillGroupProps {
  index: string;
  label: string;
  skills: Skill[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}

export function SkillGroup({
  index,
  label,
  skills,
  activeSlug,
  onSelect,
}: SkillGroupProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="title-block text-accent tabular-nums">{index}</span>
        <span className="title-block">{label}</span>
        <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
        <span className="title-block tabular-nums">
          {String(skills.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {skills.map((skill) => (
          <SkillBar
            key={skill.slug}
            skill={skill}
            isActive={activeSlug === skill.slug}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
