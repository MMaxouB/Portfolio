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
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
          {
            "bg-surface text-text-primary border border-border-subtle": variant === "default",
            "bg-bg-secondary text-text-secondary border border-border-subtle": variant === "secondary",
            "text-text-primary border border-border-subtle": variant === "outline",
            "bg-accent/10 text-accent border border-accent/20": variant === "accent",
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
