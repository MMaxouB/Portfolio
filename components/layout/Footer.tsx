import Link from "next/link";
import { MAIN_NAV, SOCIAL_NAV } from "@/lib/navigation";
import { TerminalHint } from "./TerminalHint";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-primary mt-auto">
      <div className="container mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-text-primary tracking-wide text-sm">MAXIME</h3>
            <p className="text-sm text-text-muted mt-1">Software / Engineering / Security</p>
          </div>
          <p className="text-xs text-text-muted mt-4 md:mt-auto">
            © {year} Maxime.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Navigation</span>
            {MAIN_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Connect</span>
            {SOCIAL_NAV.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
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
