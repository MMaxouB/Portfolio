"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  TimelineEvent,
  AREA_LABELS,
  AREA_MARKS,
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[64px_auto_1fr] md:gap-x-8"
    >
      {/* Year gutter, aligned like a drawing's revision column */}
      <span className="title-block hidden pt-0.5 tabular-nums md:block">
        {event.year}
      </span>

      {/* Mark + connector */}
      <div className="flex flex-col items-center">
        <span
          className={`mt-1 h-2 w-2 shrink-0 ${AREA_MARKS[event.area]}`}
          aria-hidden="true"
        />
        {!isLast && (
          <motion.span
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.7, delay: index * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="-mb-12 mt-2 w-px flex-1 origin-top bg-border-subtle"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 pb-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="title-block tabular-nums md:hidden">{event.year}</span>
          <span className={`title-block ${AREA_TEXT_COLORS[event.area]}`}>
            {AREA_LABELS[event.area]}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-text-primary">
          {event.title}
        </h3>

        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
          {event.description}
        </p>

        {event.technologies && event.technologies.length > 0 && (
          <p className="title-block mt-1 normal-case tracking-[0.08em]">
            {event.technologies.join(" · ")}
          </p>
        )}

        {event.projectSlugs && event.projectSlugs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {event.projectSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="group inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="title-block text-accent">{slug}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-4 bg-accent-dim transition-all duration-500 ease-out group-hover:w-8 group-hover:bg-accent"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
