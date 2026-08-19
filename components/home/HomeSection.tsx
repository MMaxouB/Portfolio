import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/Button";

/**
 * Shared shell for the homepage bands (§4.1). Each band carries the same title
 * block so the page reads as one numbered document, but callers vary the inner
 * layout — a stack of identical sections is exactly what §5.3 warns against.
 */
export function HomeSection({
  index,
  label,
  title,
  annotation,
  description,
  href,
  hrefLabel,
  children,
  className,
}: {
  index: string;
  label: string;
  title: string;
  annotation?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container mx-auto max-w-6xl px-6 py-24", className)}>
      <Reveal>
        <SectionHeading
          index={index}
          label={label}
          title={title}
          annotation={annotation}
          description={description}
        />
      </Reveal>

      <div className="mt-14">{children}</div>

      {href && hrefLabel && (
        <div className="mt-12 flex items-center gap-4">
          <Link
            href={href}
            className="group/link inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="title-block text-text-primary">{hrefLabel}</span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-accent-dim transition-all duration-500 ease-out group-hover/link:w-16 group-hover/link:bg-accent"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
