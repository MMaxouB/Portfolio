import { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group/btn relative inline-flex items-center justify-center rounded-control font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            // Primary is ink-on-paper inverted, not a coloured fill
            "bg-text-primary text-bg-primary hover:bg-white": variant === "primary",
            "bg-surface text-text-primary hover:bg-surface-hover": variant === "secondary",
            "border border-border-subtle bg-transparent text-text-secondary hover:border-accent-dim hover:text-text-primary": variant === "outline",
            "hover:bg-surface hover:text-text-primary text-text-secondary": variant === "ghost",
            "h-9 px-4 py-2 text-sm": size === "sm",
            "h-10 px-6 py-2 text-sm": size === "md",
            "h-12 px-8 py-3 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, cn };
