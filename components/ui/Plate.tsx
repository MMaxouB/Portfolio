import { cn } from "./Button";

/**
 * The card primitive for the whole site.
 *
 * Not a glassy rounded panel with a glow on hover — that is the default look of
 * every dark portfolio. A Plate is a specimen plate from a technical document:
 * a hairline edge, four registration marks sitting just outside the corners,
 * and an optional index number in the title block. On hover the marks extend
 * and take the ink colour; nothing lifts and nothing glows.
 */

interface PlateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Index shown in the corner, e.g. "01" — omit for non-enumerated plates */
  index?: string;
  /** Registration marks react to hover on an ancestor with `group` */
  interactive?: boolean;
}

const MARK_BASE =
  "pointer-events-none absolute h-2.5 w-2.5 border-accent-dim transition-all duration-500 ease-out";
const MARK_ACTIVE = "group-hover:h-4 group-hover:w-4 group-hover:border-accent";

export function Plate({
  index,
  interactive = false,
  className,
  children,
  ...props
}: PlateProps) {
  const mark = cn(MARK_BASE, interactive && MARK_ACTIVE);

  return (
    <div
      className={cn(
        "relative rounded-plate border border-border-subtle bg-surface transition-colors duration-300",
        interactive && "group-hover:border-border-hover",
        className
      )}
      {...props}
    >
      {/* Registration marks — crop marks, not decoration */}
      <span className={cn(mark, "-left-px -top-px border-l border-t")} aria-hidden="true" />
      <span className={cn(mark, "-right-px -top-px border-r border-t")} aria-hidden="true" />
      <span className={cn(mark, "-bottom-px -left-px border-b border-l")} aria-hidden="true" />
      <span className={cn(mark, "-bottom-px -right-px border-b border-r")} aria-hidden="true" />

      {index && (
        <span
          className="title-block pointer-events-none absolute right-4 top-3 z-10 text-[10px] tabular-nums"
          aria-hidden="true"
        >
          {index}
        </span>
      )}

      {children}
    </div>
  );
}
