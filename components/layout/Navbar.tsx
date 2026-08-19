import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-text-primary text-sm">
          MAXIME
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-text-secondary">
          <Link href="/projects" className="hover:text-text-primary transition-colors">Projects</Link>
          <Link href="/expertise" className="hover:text-text-primary transition-colors">Expertise</Link>
          <Link href="/timeline" className="hover:text-text-primary transition-colors">Timeline</Link>
          <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="text-sm font-medium text-text-primary bg-surface border border-border-subtle hover:border-border-hover px-4 py-2 rounded-md transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
