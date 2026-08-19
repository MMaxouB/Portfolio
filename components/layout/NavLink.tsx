"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Active state is a rule under the label, not a colour swap — the accent stays
 * ink. The rule grows from the left on hover and sits full-width when active.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="group/nav relative flex flex-col gap-1.5 rounded pt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span
        className={`text-sm font-medium transition-colors ${
          isActive
            ? "text-text-primary"
            : "text-text-secondary group-hover/nav:text-text-primary"
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`h-px origin-left bg-accent transition-transform duration-400 ease-out ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
        }`}
      />
    </Link>
  );
}
