import { TimelineEvent } from "@/lib/timeline";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <ol aria-label="Career timeline" className="flex flex-col">
      {events.map((event, index) => (
        <li key={`${event.year}-${event.title}`}>
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
