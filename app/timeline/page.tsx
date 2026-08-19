import { Metadata } from "next";
import { TIMELINE, AREA_LABELS, AREA_MARKS } from "@/lib/timeline";
import { Timeline } from "@/components/timeline/Timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A progression through learning, engineering projects, security work and AI systems.",
};

export default function TimelinePage() {
  const years = [...new Set(TIMELINE.map((event) => event.year))].sort();

  return (
    <div className="container mx-auto min-h-screen max-w-4xl px-6 py-28">
      <SectionHeading
        as="h1"
        index="03"
        label="Progression"
        title="How it got here."
        annotation={`${years[0]} — ${years[years.length - 1]}`}
        description="From my first scripts to system architecture and security — a record of real milestones, not a polished résumé."
        className="mb-16"
      />

      {/* Legend — marks, not colours */}
      <div className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-y border-border-subtle py-4">
        {(Object.entries(AREA_LABELS) as [keyof typeof AREA_LABELS, string][]).map(
          ([area, label]) => (
            <div key={area} className="flex items-center gap-2.5">
              <span className={`h-2 w-2 ${AREA_MARKS[area]}`} aria-hidden="true" />
              <span className="title-block">{label}</span>
            </div>
          )
        )}
      </div>

      <Timeline events={TIMELINE} />
    </div>
  );
}
