import Link from "next/link";
import { MAIN_NAV, SOCIAL_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";
import { TerminalHint } from "./TerminalHint";
import { CurrentYear } from "./CurrentYear";

const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-bg-primary">
      <div className="container mx-auto flex max-w-5xl flex-col justify-between gap-12 px-6 py-12 md:flex-row">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-text-primary">
              {SITE.name.toUpperCase()}
            </h2>
            <p className="mt-1 text-sm text-text-muted">{SITE.tagline}</p>
          </div>
          <p className="mt-4 text-xs text-text-muted md:mt-auto">
            © <CurrentYear buildYear={BUILD_YEAR} /> {SITE.name}.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:gap-24">
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h2>
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cyber"
              className="rounded text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Cyber / Lab
            </Link>
            <Link
              href="/contact"
              className="rounded text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-primary">
              Connect
            </h2>
            {SOCIAL_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 pb-6">
        <TerminalHint />
      </div>
    </footer>
  );
}
