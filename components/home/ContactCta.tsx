import Link from "next/link";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";

export function ContactCta() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="title-block text-accent tabular-nums">05</span>
          <span className="title-block">Contact</span>
          <Rule className="flex-1" />
          <span className="title-block hidden shrink-0 sm:block">
            Remote · France
          </span>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="max-w-xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1] tracking-[-0.035em] text-text-primary">
            Let&apos;s build something.
          </h2>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded font-mono text-sm text-text-secondary underline decoration-border-hover underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {SITE.email}
            </a>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
