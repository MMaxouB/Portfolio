import { Skill } from "@/lib/skills";
import { SkillBar } from "./SkillBar";

interface SkillGroupProps {
  label: string;
  skills: Skill[];
}

export function SkillGroup({ label, skills }: SkillGroupProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em]">
        {label}
      </h3>
      <div className="flex flex-col gap-6">
        {skills.map((skill) => (
          <SkillBar key={skill.slug} skill={skill} />
        ))}
      </div>
    </div>
  );
}
