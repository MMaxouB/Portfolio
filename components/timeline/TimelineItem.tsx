"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  TimelineEvent,
  AREA_LABELS,
  AREA_COLORS,
  AREA_TEXT_COLORS,
} from "@/lib/timeline";

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ event, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const dotColor = AREA_COLORS[event.area];
  const textColor = AREA_TEXT_COLORS[event.area];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-x-6"
    >
      {/* Left column: dot + vertical line */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ring-4 ring-bg-primary ${dotColor}`} />
        {/* Connector line */}
        {!isLast && (
          <div className="mt-2 flex-1 w-px bg-border-subtle" />
        )}
      </div>

      {/* Right column: content */}
      <div className={`pb-${isLast ? "0" : "12"} flex flex-col gap-3 pb-12 last:pb-0`}>
        {/* Year + area badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono font-semibold text-text-muted tracking-widest">
            {event.year}
          </span>
          <span className={`text-xs font-semibold tracking-wide uppercase ${textColor}`}>
            {AREA_LABELS[event.area]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-text-primary leading-snug">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {event.description}
        </p>

        {/* Technologies */}
        {event.technologies && event.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {event.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Linked projects */}
        {event.projectSlugs && event.projectSlugs.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {event.projectSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="text-[11px] font-mono text-accent/80 border border-accent/20 bg-accent/5 px-2 py-0.5 rounded hover:border-accent/50 hover:text-accent transition-colors"
              >
                ↗ {slug}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
