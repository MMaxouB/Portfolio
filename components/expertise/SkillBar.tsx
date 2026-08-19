"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Skill } from "@/lib/skills";

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col gap-2 cursor-default"
    >
      {/* Label row */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-text-primary leading-none">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-text-muted shrink-0">
          {skill.levelLabel}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-px bg-border-subtle rounded-full overflow-visible">
        {/* Filled segment — animated on mount via CSS */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent rounded-full origin-left"
          style={{ width: `${skill.score}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
        {/* Glow dot at the end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_2px_rgba(59,130,246,0.5)]"
          style={{ left: `calc(${skill.score}% - 3px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Expandable detail on hover */}
      <motion.div
        initial={false}
        animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-3 flex flex-col gap-3">
          {skill.description && (
            <p className="text-xs text-text-muted leading-relaxed">
              {skill.description}
            </p>
          )}
          {skill.projectSlugs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skill.projectSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/projects/${slug}`}
                  className="inline-flex items-center text-[11px] font-mono text-accent/80 border border-accent/20 bg-accent/5 px-2 py-0.5 rounded hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {slug}
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
