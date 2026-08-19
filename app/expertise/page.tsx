import { Metadata } from "next";
import {
  SKILL_CATEGORIES,
  CATEGORY_LABELS,
  getSkillsByCategory,
} from "@/lib/skills";
import { SkillGroup } from "@/components/expertise/SkillGroup";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Skills, proficiency levels and technology areas — grounded in real projects.",
};

export default function ExpertisePage() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-24 min-h-screen">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
          SKILLS
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          Expertise
        </h1>
        <p className="text-text-secondary leading-relaxed">
          A personal assessment of proficiency across languages, engineering
          disciplines, AI tooling and security. Values reflect practical depth,
          not certification scores.
        </p>
      </div>

      {/* Skill categories — two-column grid on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {SKILL_CATEGORIES.map((category) => (
          <SkillGroup
            key={category}
            label={CATEGORY_LABELS[category]}
            skills={getSkillsByCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
