"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "./Button";

/**
 * A hairline that draws itself in when it enters the viewport.
 *
 * Rules carry the layout on this site the way they carry a technical drawing —
 * they are the entrance animation, so blocks of content do not need to slide up.
 */
export function Rule({
  className,
  delay = 0,
  tone = "subtle",
}: {
  className?: string;
  delay?: number;
  tone?: "subtle" | "ink";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : undefined}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "h-px origin-left",
        tone === "ink" ? "bg-accent-dim" : "bg-border-subtle",
        className
      )}
    />
  );
}
