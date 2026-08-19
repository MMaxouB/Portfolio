import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ABOUT_BLOCKS, ABOUT_INTRO } from "@/lib/about";
import { TIMELINE } from "@/lib/timeline";
import { SITE } from "@/lib/site";
import { Timeline } from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} — ${SITE.role}. Professional identity, current focus and what I build.`,
};

/** The four most recent milestones — the full record lives on /timeline. */
const SELECTED_TIMELINE = TIMELINE.slice(-4).reverse();

export default function AboutPage() {
  return (
    <div className="container mx-auto min-h-screen max-w-3xl px-6 py-24">
      {/* Introduction */}
      <SectionHeading
        as="h1"
        index="06"
        label="About"
        title={SITE.name}
        annotation={SITE.role}
        className="mb-12"
      />
      <p className="mb-24 max-w-2xl text-xl leading-relaxed text-text-secondary">
        {ABOUT_INTRO}
      </p>

      {/* Blocks */}
      <div className="flex flex-col gap-16">
        {ABOUT_BLOCKS.map((block, i) => (
          <Reveal key={block.label} delay={i * 0.05}>
            <section
              aria-labelledby={`about-${i}`}
              className="grid gap-5 md:grid-cols-[140px_1fr] md:gap-10"
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                <span className="title-block text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="title-block">{block.label}</span>
              </div>

              <div className="min-w-0">
                <h2
                  id={`about-${i}`}
                  className="text-2xl font-bold leading-snug tracking-[-0.02em] text-text-primary"
                >
                  {block.title}
                </h2>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {block.body}
                </p>

                {block.points && (
                  <ul className="mt-6 flex flex-col gap-4">
                    {block.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-4 leading-relaxed text-text-secondary"
                      >
                        <span
                          className="mt-3 h-px w-4 shrink-0 bg-accent-dim"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Selected timeline */}
      <section className="mt-20" aria-labelledby="about-timeline">
        <div className="mb-10 flex items-center gap-4">
          <h2 id="about-timeline" className="title-block">
            Selected timeline
          </h2>
          <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
          <Link
            href="/timeline"
            className="group/link flex shrink-0 items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="title-block text-text-primary">Full timeline</span>
            <span
              aria-hidden="true"
              className="h-px w-5 bg-accent-dim transition-all duration-500 ease-out group-hover/link:w-10 group-hover/link:bg-accent"
            />
          </Link>
        </div>
        <Timeline events={SELECTED_TIMELINE} />
      </section>

      {/* Contact */}
      <Plate className="mt-20 p-8" aria-labelledby="about-contact" role="region">
        <h2
          id="about-contact"
          className="mb-3 text-2xl font-bold tracking-tight text-text-primary"
        >
          Let&apos;s build something.
        </h2>
        <p className="mb-6 leading-relaxed text-text-secondary">
          Open to engineering work, security engagements and interesting
          problems that do not have an obvious answer yet.
        </p>
        <Link href="/contact" className="inline-block">
          <Button variant="primary">
            Get in touch
            <ArrowRight size={16} className="ml-2" aria-hidden="true" />
          </Button>
        </Link>
      </Plate>
    </div>
  );
}
