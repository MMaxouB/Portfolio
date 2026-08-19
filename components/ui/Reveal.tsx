"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Section entrance (PORTFOLIO_SPEC §15.3), read sideways.
 *
 * The spec's literal pattern is opacity + translateY. Everything uses that, so
 * everything looks the same. Same intent, different mechanism: a mask sweeps
 * across the content, the way a plotter lays down a line. Nothing moves, so
 * nothing can feel like it is sliding into place.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.25 }}
      animate={inView ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : undefined}
      transition={{ duration: 0.66, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
