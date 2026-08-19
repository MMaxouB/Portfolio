"use client";

import { Skill } from "@/lib/skills";

interface SkillBarProps {
  skill: Skill;
  isActive: boolean;
  onSelect: (slug: string) => void;
}

/**
 * One row of the skills register.
 *
 * The earlier version was a hover accordion, which meant the evidence was
 * unreachable by keyboard and invisible on touch. Selection replaces it: the
 * row is a toggle, and the proof (description + projects) is rendered once, in
 * the panel beside the register. One selection model, no hidden tab stops.
 */
export function SkillBar({ skill, isActive, onSelect }: SkillBarProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(skill.slug)}
      aria-pressed={isActive}
      className="group flex w-full flex-col gap-2.5 rounded py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary"
    >
      <span className="flex items-baseline justify-between gap-4">
        <span
          className={`text-sm font-medium leading-none transition-colors ${
            isActive
              ? "text-accent"
              : "text-text-primary group-hover:text-text-primary"
          }`}
        >
          {skill.name}
        </span>
        <span className="title-block shrink-0 tabular-nums">
          {skill.levelLabel}
        </span>
      </span>

      {/* Score as rule length — the number is never shouted */}
      <span
        role="progressbar"
        aria-valuenow={skill.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${skill.levelLabel} — ${skill.score} out of 100`}
        aria-label={skill.name}
        className="relative block h-px w-full bg-border-subtle"
      >
        <span
          className={`absolute inset-y-0 left-0 block transition-colors duration-300 ${
            isActive ? "bg-accent" : "bg-accent-dim group-hover:bg-accent"
          }`}
          style={{ width: `${skill.score}%` }}
        />
        <span
          className={`absolute top-1/2 block h-1 w-1 -translate-y-1/2 transition-opacity duration-300 ${
            isActive ? "bg-accent opacity-100" : "bg-accent-dim opacity-70"
          }`}
          style={{ left: `calc(${skill.score}% - 2px)` }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
