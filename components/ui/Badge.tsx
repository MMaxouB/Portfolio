import { forwardRef } from "react";
import { cn } from "./Button";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-control px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
          {
            "bg-surface text-text-primary border border-border-subtle": variant === "default",
            "bg-bg-secondary text-text-secondary border border-border-subtle": variant === "secondary",
            "text-text-primary border border-border-subtle": variant === "outline",
            "bg-transparent text-accent border border-accent-dim": variant === "accent",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
