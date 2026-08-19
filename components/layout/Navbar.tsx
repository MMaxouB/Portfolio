import Link from "next/link";
import { MAIN_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { PaletteButton } from "./PaletteButton";
import { NavLink } from "./NavLink";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Registration mark as the logotype — same language as the plates */}
          <span
            aria-hidden="true"
            className="h-2 w-2 border-l border-t border-accent transition-all duration-500 group-hover:h-2.5 group-hover:w-2.5"
          />
          <span className="text-sm font-semibold tracking-[0.08em] text-text-primary">
            {SITE.name.toUpperCase()}
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 md:flex"
        >
          {MAIN_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <NavLink href="/cyber" label="Cyber" />
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <PaletteButton />
          <Link
            href="/contact"
            className="group/cta flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="title-block text-text-primary">Contact</span>
            <span
              aria-hidden="true"
              className="h-px w-5 bg-accent-dim transition-all duration-500 ease-out group-hover/cta:w-9 group-hover/cta:bg-accent"
            />
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
