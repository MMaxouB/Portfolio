import Link from "next/link";

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
            <Link href="/projects" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Projects</Link>
            <Link href="/expertise" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Expertise</Link>
            <Link href="/about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Connect</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">LinkedIn</a>
            <a href="mailto:email@example.com" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Email</a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl px-6 pb-6">
        <p className="text-xs text-text-muted font-mono opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          $ type &quot;help&quot; to explore
        </p>
      </div>
    </footer>
  );
}
