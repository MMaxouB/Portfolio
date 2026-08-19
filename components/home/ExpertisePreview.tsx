import { getHeadlineSkills, CATEGORY_LABELS } from "@/lib/skills";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Skills as a measurement table rather than a row of progress bars: name,
 * category, level, and a hairline whose length is the score. It reads as a
 * datasheet, and the numbers stay honest because the label carries the claim.
 */
export function ExpertisePreview() {
  const skills = getHeadlineSkills(8);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b border-border-subtle pb-3">
        <span className="title-block flex-1">Skill</span>
        <span className="title-block hidden w-40 sm:block">Area</span>
        <span className="title-block w-24 text-right">Level</span>
        <span className="hidden w-32 md:block" />
      </div>

      {skills.map((skill, i) => (
        <Reveal key={skill.slug} delay={i * 0.04}>
          <div className="group flex items-center gap-4 border-b border-border-subtle py-4 transition-colors hover:bg-surface/40">
            <span className="flex-1 text-sm font-medium text-text-primary">
              {skill.name}
            </span>
            <span className="title-block hidden w-40 sm:block">
              {CATEGORY_LABELS[skill.category]}
            </span>
            <span className="w-24 text-right font-mono text-xs text-text-secondary">
              {skill.levelLabel}
            </span>
            {/* Score as a rule length — no filled bar, no percentage shouting */}
            <span
              className="hidden h-px w-32 bg-border-subtle md:block"
              aria-hidden="true"
            >
              <span
                className="block h-px bg-accent-dim transition-colors duration-300 group-hover:bg-accent"
                style={{ width: `${skill.score}%` }}
              />
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
