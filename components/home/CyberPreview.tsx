import { SECURITY_AREAS } from "@/lib/cyber";
import { getSecurityProjects } from "@/lib/projects";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Security band. Deliberately understated — the spec is explicit that security
 * is a specialisation inside a software identity, never the headline, and that
 * the hacker aesthetic is out (§0.3). So: a plain register of areas, no green,
 * no glyphs, and a count of the real engagements behind it.
 */
export function CyberPreview() {
  const projects = getSecurityProjects();

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <Reveal className="md:col-span-5">
        <Plate className="flex h-full flex-col justify-between p-7">
          <div>
            <span className="title-block text-accent">Applied</span>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              One professional engagement under NDA, one open-source scanner, and
              continuous practice on CTF platforms. Security informs how the
              software above gets written.
            </p>
          </div>
          <div className="mt-8 flex items-end gap-8">
            <div>
              <span className="block font-mono text-3xl tabular-nums text-text-primary">
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="title-block">Security projects</span>
            </div>
            <div>
              <span className="block font-mono text-3xl tabular-nums text-text-primary">
                {String(SECURITY_AREAS.length).padStart(2, "0")}
              </span>
              <span className="title-block">Knowledge areas</span>
            </div>
          </div>
        </Plate>
      </Reveal>

      <div className="flex flex-col md:col-span-7">
        {SECURITY_AREAS.map((area, i) => (
          <Reveal key={area.title} delay={i * 0.05}>
            <div className="group flex items-baseline gap-5 border-b border-border-subtle py-5 first:border-t">
              <span className="title-block shrink-0 tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-text-primary">
                  {area.title}
                </h3>
                <p className="mt-1.5 title-block truncate normal-case tracking-[0.06em]">
                  {area.topics.slice(0, 4).join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
