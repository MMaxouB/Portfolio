import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectFigure } from "@/components/projects/visuals/figures";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Code, Globe } from "lucide-react";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

interface ProjectPageProps {
  // Next 16: params is a Promise and must be awaited before use.
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
    },
  };
}

const TYPE_LABEL = {
  "open-source": "Open Source",
  public: "Public",
  private: "Private",
  nda: "NDA",
} as const;

/** A numbered section, matching the title-block language used site-wide. */
function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="grid gap-6 md:grid-cols-[128px_1fr] md:gap-10">
        <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
          <span className="title-block text-accent tabular-nums">{index}</span>
          <span className="title-block">{label}</span>
        </div>
        <div className="min-w-0">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isNDA = project.type === "nda";
  let blockIndex = 0;
  const nextIndex = () => String(++blockIndex).padStart(2, "0");

  return (
    <article className="min-h-screen py-28">
      <header className="container mx-auto mb-14 max-w-4xl px-6">
        <Link
          href="/projects"
          className="mb-14 inline-flex items-center gap-2 rounded text-sm text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to projects
        </Link>

        {/* Title block: type · status on the left, year on the right */}
        <div className="flex items-center gap-4">
          <span className="title-block shrink-0 text-accent">
            {TYPE_LABEL[project.type]}
          </span>
          <span className="title-block shrink-0">
            {project.status.replace("-", " ")}
          </span>
          <Rule className="flex-1" />
          <span className="title-block shrink-0 tabular-nums">
            {project.year}
          </span>
        </div>

        <h1 className="mt-8 text-[clamp(2.5rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.035em] text-text-primary">
          {project.title}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {project.shortDescription}
        </p>

        {(project.githubUrl || project.liveUrl) && !isNDA && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <Code size={15} className="mr-2" aria-hidden="true" />
                  View source
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm">
                  <Globe size={15} className="mr-2" aria-hidden="true" />
                  Live demo
                </Button>
              </a>
            )}
          </div>
        )}
      </header>

      {/* The figure, morphed from the card it was clicked on (§15.5) */}
      <div className="container mx-auto mb-20 max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-plate border border-border-subtle bg-bg-secondary">
          <div
            aria-hidden="true"
            className="paper-rules absolute inset-0 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000,transparent)]"
          />
          <ViewTransition name={`figure-${project.slug}`}>
            <div className="relative px-6 py-12 md:px-16 md:py-16">
              <ProjectFigure slug={project.slug} className="mx-auto w-full max-w-3xl" />
            </div>
          </ViewTransition>
          <span className="title-block absolute bottom-3 left-5">
            Fig. 1 — {project.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto flex max-w-4xl flex-col gap-16 px-6">
        {/* Meta */}
        <Reveal>
          <div className="grid grid-cols-2 gap-8 border-y border-border-subtle py-8 md:grid-cols-4">
            <div>
              <span className="title-block">Role</span>
              <p className="mt-2 text-sm text-text-primary">{project.role}</p>
            </div>
            <div>
              <span className="title-block">Tags</span>
              <p className="mt-2 text-sm text-text-primary">
                {project.category.join(" · ")}
              </p>
            </div>
            <div className="col-span-2">
              <span className="title-block">Stack</span>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">
                {project.technologies.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* NDA notice — a redaction notice, not a warning box */}
        {isNDA && project.confidentialityNote && (
          <Reveal>
            <div className="rounded-plate border border-dashed border-accent-dim bg-transparent p-6">
              <span className="title-block text-accent">Redacted under NDA</span>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.confidentialityNote}
              </p>
            </div>
          </Reveal>
        )}

        {project.architectureSummary && (
          <Block index={nextIndex()} label="Architecture">
            <p className="leading-relaxed text-text-secondary">
              {project.architectureSummary}
            </p>
          </Block>
        )}

        {project.contribution && project.contribution.length > 0 && (
          <Block index={nextIndex()} label="Contribution">
            <ul className="flex flex-col gap-5">
              {project.contribution.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-text-secondary">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent-dim" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.technicalChallenges && project.technicalChallenges.length > 0 && (
          <Block index={nextIndex()} label="Challenges">
            <ul className="flex flex-col gap-5">
              {project.technicalChallenges.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-text-secondary">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-border-hover" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.results && (
          <Block index={nextIndex()} label="Results">
            <p className="leading-relaxed text-text-secondary">{project.results}</p>
          </Block>
        )}
      </div>
    </article>
  );
}
