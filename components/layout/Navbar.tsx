import Link from "next/link";
import { MAIN_NAV } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";
import { PaletteButton } from "./PaletteButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-text-primary text-sm">
          MAXIME
        </Link>
        
        <nav className="hidden md:flex gap-6 text-sm font-medium text-text-secondary">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <PaletteButton />
          <Link 
            href="/contact" 
            className="text-sm font-medium text-text-primary bg-surface border border-border-subtle hover:border-border-hover px-4 py-2 rounded-md transition-all"
          >
            Contact
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
