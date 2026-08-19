import { Metadata } from "next";
import { TIMELINE, AREA_LABELS, AREA_COLORS } from "@/lib/timeline";
import { Timeline } from "@/components/timeline/Timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description: "A progression through learning, engineering projects, security work and AI systems.",
};

export default function TimelinePage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-24 min-h-screen">
      {/* Header */}
      <div className="mb-16">
        <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
          PROGRESSION
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          Timeline
        </h1>
        <p className="text-text-secondary leading-relaxed max-w-xl">
          From first scripts to system architecture and security — a record of
          real milestones rather than a polished résumé.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-14">
        {(Object.entries(AREA_LABELS) as [keyof typeof AREA_LABELS, string][]).map(
          ([area, label]) => (
            <div key={area} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${AREA_COLORS[area]}`} />
              <span className="text-xs text-text-muted font-medium">{label}</span>
            </div>
          )
        )}
      </div>

      <Timeline events={TIMELINE} />
    </div>
  );
}
