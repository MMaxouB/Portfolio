"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-20 px-6">
      <HeroVisual />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-start gap-6"
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Software / Engineering / Security
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary leading-[1.1]"
          >
            Building software<br />
            that matters.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            I am a software engineer specializing in backend architecture, AI systems, and robust web applications, with a strong foundation in cybersecurity.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
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
        </motion.div>
      </div>
    </section>
  );
}
