"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

/**
 * Entrance (§4.4) reworked: nothing translates upward. The rule extends, the
 * headline is uncovered line by line by a moving mask, and the rest fades in
 * place. It reads as a drawing being made rather than a page assembling itself.
 */
const HEADLINE = ["Building software", "that matters."];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6 py-24">
      <HeroVisual />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex max-w-3xl flex-col items-start">
          {/* Title block strip */}
          <div className="flex w-full max-w-lg items-center gap-4">
            <motion.span className="title-block text-accent" {...fade(0.1)}>
              00
            </motion.span>
            <motion.span className="title-block" {...fade(0.15)}>
              Software · Engineering · Security
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="h-px flex-1 origin-left bg-border-subtle"
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Headline — uncovered line by line */}
          <h1 className="mt-9 text-[clamp(2.9rem,8.5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.04em] text-text-primary">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { clipPath: "inset(0 100% 0 0)", opacity: 0.3 }
                  }
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                  transition={{
                    duration: 0.78,
                    delay: 0.3 + i * 0.13,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
            {...fade(0.66)}
          >
            I build backend systems, automation pipelines and AI tools — and I
            always think about how they might break.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap items-center gap-3"
            {...fade(0.8)}
          >
            <Link href="/projects">
              <Button size="lg" variant="primary">
                Explore projects
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                About me
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
