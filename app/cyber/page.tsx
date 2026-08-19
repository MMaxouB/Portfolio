import { Metadata } from "next";
import Link from "next/link";
import { getSecurityProjects } from "@/lib/projects";
import { CTF_ENTRIES, SECURITY_AREAS } from "@/lib/cyber";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cyber / Lab",
  description:
    "Security projects, penetration testing, CTF activity and research — a secondary but serious specialisation.",
};

export default function CyberPage() {
  const securityProjects = getSecurityProjects();

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto max-w-5xl px-6">

        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-mono font-semibold tracking-[0.2em] text-emerald-400 uppercase mb-4 block">
            SECURITY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
            Cyber / Lab
          </h1>
          <p className="text-text-secondary leading-relaxed">
            Security is a specialisation within a broader software engineering
            identity — not the other way around. This section documents real
            engagement work, tooling and continuous practice.
          </p>
        </div>

        {/* ── Security projects (reused from project system) ── */}
        <section className="mb-20" aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-8"
          >
            Projects
          </h2>
          <div className="flex flex-col gap-4">
            {securityProjects.map((project) => {
              const isNDA = project.type === "nda";
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border-subtle bg-surface hover:border-border-hover hover:bg-surface-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={isNDA ? "accent" : "default"}
                        className="text-[10px]"
                      >
                        {project.type.toUpperCase()}
                      </Badge>
                      {project.category.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-[10px] text-text-muted border-border-subtle/50"
                        >
                          {cat}
                        </Badge>
                      ))}
                      <span className="text-xs font-mono text-text-muted ml-auto sm:ml-0">
                        {project.year}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      {project.title}
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">
                      {project.shortDescription}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-text-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 sm:self-center"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Knowledge Areas ── */}
        <section className="mb-20" aria-labelledby="areas-heading">
          <h2
            id="areas-heading"
            className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-8"
          >
            Knowledge Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECURITY_AREAS.map((area) => (
              <div
                key={area.title}
                className="p-6 rounded-xl border border-border-subtle bg-surface flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <h3 className="text-sm font-semibold text-text-primary leading-snug">
                    {area.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {area.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTF & Practice ── */}
        <section aria-labelledby="ctf-heading">
          <h2
            id="ctf-heading"
            className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em] mb-8"
          >
            CTF & Continuous Practice
          </h2>
          <div className="flex flex-col gap-4">
            {CTF_ENTRIES.map((entry) => (
              <div
                key={entry.name}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl border border-border-subtle bg-surface"
              >
                <div className="shrink-0 min-w-[120px]">
                  <span className="text-sm font-semibold text-text-primary block">
                    {entry.name}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {entry.year}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="text-[10px] text-text-muted border-border-subtle/50 self-start">
                    {entry.category}
                  </Badge>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Honest closing note */}
          <p className="mt-10 text-sm text-text-muted leading-relaxed max-w-xl border-l-2 border-border-subtle pl-4">
            Security is an ongoing practice, not a completed credential. These entries
            reflect real activity — no fabricated results or inflated rankings.
          </p>
        </section>

      </div>
    </div>
  );
}
