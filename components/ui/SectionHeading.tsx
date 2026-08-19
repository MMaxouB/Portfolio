import { Rule } from "./Rule";
import { cn } from "./Button";

/**
 * The title block of a technical drawing, used as the site's section header.
 *
 * `01 / SELECTED WORK ─────────────────────────────── 5 ENTRIES`
 * `Systems, not screenshots.`
 *
 * The index and the right-hand annotation are what make it read as an
 * engineering document rather than a marketing section: every block is
 * numbered, measured and captioned.
 */
interface SectionHeadingProps {
  /** Two-digit section index, e.g. "02" */
  index: string;
  /** Small uppercase label sitting next to the index */
  label: string;
  /** Large headline */
  title?: string;
  /** Mono annotation aligned to the right of the rule */
  annotation?: string;
  /** Short paragraph under the headline */
  description?: string;
  /** `h1` on page headers, `h2` inside a page */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  annotation,
  description,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Title block strip */}
      <div className="flex items-center gap-4">
        <span className="title-block shrink-0 text-accent tabular-nums">
          {index}
        </span>
        <span className="title-block shrink-0">{label}</span>
        <Rule className="flex-1" delay={0.08} />
        {annotation && (
          <span className="title-block shrink-0 hidden sm:block">
            {annotation}
          </span>
        )}
      </div>

      {title && (
        <Tag
          className={cn(
            "mt-7 font-bold tracking-[-0.03em] text-text-primary",
            Tag === "h1"
              ? "text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]"
              : "text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02]"
          )}
        >
          {title}
        </Tag>
      )}

      {description && (
        <p className="mt-6 max-w-2xl leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
