import { TimelineEvent } from "@/lib/timeline";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <ol aria-label="Career timeline" className="flex flex-col">
      {events.map((event, index) => (
        // Spacing lives here: inside TimelineItem the content column is always
        // its parent's :last-child, so a `last:` variant would match every row.
        <li key={`${event.year}-${event.title}`} className="pb-12 last:pb-0">
          <TimelineItem
            event={event}
            index={index}
            isLast={index === events.length - 1}
          />
        </li>
      ))}
    </ol>
  );
}
