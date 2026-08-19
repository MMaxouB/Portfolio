import { TIMELINE } from "@/lib/timeline";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Year-grouped condensation of the timeline, in the shape the spec sketches
 * (§9.2) — a year, then the milestones hanging off it.
 */
export function TimelinePreview() {
  const byYear = TIMELINE.reduce<Record<string, string[]>>((acc, event) => {
    (acc[event.year] ??= []).push(event.title);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort();

  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-6">
      {years.map((year, i) => (
        <Reveal key={year} delay={i * 0.08}>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-text-primary">
                {year}
              </span>
              <span className="title-block">
                {byYear[year].length} {byYear[year].length > 1 ? "entries" : "entry"}
              </span>
            </div>

            <span className="mt-5 h-px w-full bg-accent-dim" aria-hidden="true" />

            <ul className="mt-5 flex flex-col gap-3">
              {byYear[year].map((title) => (
                <li key={title} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-px w-3 shrink-0 bg-border-hover" aria-hidden="true" />
                  <span>{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
