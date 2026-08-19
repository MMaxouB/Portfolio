import { Metadata } from "next";
import Link from "next/link";
import { getSecurityProjects } from "@/lib/projects";
import { CTF_ENTRIES, SECURITY_AREAS } from "@/lib/cyber";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFigure } from "@/components/projects/visuals/figures";

export const metadata: Metadata = {
  title: "Cyber / Lab",
  description:
    "Security projects, penetration testing, CTF activity and research — a secondary but serious focus.",
};

/**
 * No green, no glyphs, no terminal-as-identity (§0.3). The page uses the same
 * ink and the same title blocks as the rest of the site, because security here
 * is one chapter of an engineering document, not a different website.
 */
export default function CyberPage() {
  const securityProjects = getSecurityProjects();

  return (
    <div className="container mx-auto min-h-screen max-w-6xl px-6 py-28">
      <SectionHeading
        as="h1"
        index="04"
        label="Cyber / Lab"
        title="Security as a discipline."
        annotation="Specialisation, not identity"
        description="Security is one specialisation inside a broader software engineering identity, not the other way around. This section covers real engagement work, tools and ongoing practice."
        className="mb-24 max-w-3xl"
      />

      {/* Projects */}
      <section className="mb-24" aria-labelledby="cyber-projects">
        <div className="mb-10 flex items-center gap-4">
          <span className="title-block text-accent tabular-nums">01</span>
          <h2 id="cyber-projects" className="title-block">
            Projects
          </h2>
          <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
          <span className="title-block tabular-nums">
            {String(securityProjects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {securityProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full rounded-plate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <Plate interactive index={String(i + 1).padStart(2, "0")} className="flex h-full flex-col">
                  <div className="relative border-b border-border-subtle bg-bg-primary/60 p-4">
                    <div
                      aria-hidden="true"
                      className="paper-rules absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]"
                    />
                    <ProjectFigure slug={project.slug} className="relative max-h-[170px] w-full" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="title-block text-accent">
                        {project.type.replace("-", " ")}
                      </span>
                      <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
                      <span className="title-block tabular-nums">{project.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                      {project.shortDescription}
                    </p>
                  </div>
                </Plate>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Knowledge areas — a register, not a card wall */}
      <section className="mb-24" aria-labelledby="cyber-areas">
        <div className="mb-10 flex items-center gap-4">
          <span className="title-block text-accent tabular-nums">02</span>
          <h2 id="cyber-areas" className="title-block">
            Knowledge areas
          </h2>
          <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
          <span className="title-block tabular-nums">
            {String(SECURITY_AREAS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col">
          {SECURITY_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-border-subtle py-7 first:border-t md:grid-cols-[1fr_1.4fr] md:gap-10">
                <div className="flex items-baseline gap-4">
                  <span className="title-block shrink-0 tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-text-primary">
                    {area.title}
                  </h3>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {area.description}
                  </p>
                  <p className="title-block mt-3 normal-case tracking-[0.08em]">
                    {area.topics.join(" · ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Practice */}
      <section aria-labelledby="cyber-practice">
        <div className="mb-10 flex items-center gap-4">
          <span className="title-block text-accent tabular-nums">03</span>
          <h2 id="cyber-practice" className="title-block">
            Continuous practice
          </h2>
          <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CTF_ENTRIES.map((entry, i) => (
            <Reveal key={entry.name} delay={i * 0.06}>
              <Plate className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="title-block text-accent">{entry.category}</span>
                  <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
                  <span className="title-block tabular-nums">{entry.year}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-text-primary">
                  {entry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {entry.notes}
                </p>
              </Plate>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
