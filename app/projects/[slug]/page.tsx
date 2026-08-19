import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Code, Globe, ShieldAlert } from "lucide-react";

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const isNDA = project.type === "nda";
  const isPrivate = project.type === "private";

  return (
    <article className="min-h-screen py-24">
      {/* Header Section */}
      <header className="container mx-auto max-w-3xl px-6 mb-16">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant={isNDA ? "accent" : isPrivate ? "secondary" : "default"}>
            {project.type.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="border-border-subtle/50 text-text-muted">
            {project.status.toUpperCase()}
          </Badge>
          <span className="text-sm font-mono text-text-muted ml-auto">
            {project.year}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          {project.title}
        </h1>
        
        <p className="text-xl text-text-secondary leading-relaxed mb-8">
          {project.shortDescription}
        </p>

        {(project.githubUrl || project.liveUrl) && !isNDA && (
          <div className="flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary">
                  <Code size={16} className="mr-2" />
                  View Source
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary">
                  <Globe size={16} className="mr-2" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Visual Area Placeholder */}
      <div className="w-full h-64 md:h-96 bg-surface-hover border-y border-border-subtle mb-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <span className="text-text-muted font-mono tracking-widest opacity-50 relative z-10">
          [ ARCHITECTURE_VISUALIZATION ]
        </span>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-3xl px-6 flex flex-col gap-16">
        
        {/* Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-border-subtle">
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Role</h4>
            <p className="text-sm text-text-primary">{project.role}</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {project.technologies.map((tech, i) => (
                <span key={tech} className="text-sm text-text-primary">
                  {tech}{i < project.technologies.length - 1 && <span className="text-text-muted mx-1">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* NDA Warning */}
        {isNDA && project.confidentialityNote && (
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 flex gap-4">
            <ShieldAlert className="text-accent shrink-0 mt-1" />
            <p className="text-sm text-accent/90 leading-relaxed">
              {project.confidentialityNote}
            </p>
          </div>
        )}

        {/* Dynamic Content Sections */}
        {project.architectureSummary && (
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Architecture</h2>
            <p className="text-text-secondary leading-relaxed">
              {project.architectureSummary}
            </p>
          </section>
        )}

        {project.contribution && project.contribution.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Contributions</h2>
            <ul className="space-y-4">
              {project.contribution.map((item, idx) => (
                <li key={idx} className="flex gap-4 text-text-secondary leading-relaxed">
                  <span className="text-accent mt-1.5">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.technicalChallenges && project.technicalChallenges.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Technical Challenges</h2>
            <ul className="space-y-4">
              {project.technicalChallenges.map((item, idx) => (
                <li key={idx} className="flex gap-4 text-text-secondary leading-relaxed">
                  <span className="text-text-muted mt-1.5">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {project.results && (
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Results</h2>
            <p className="text-text-secondary leading-relaxed">
              {project.results}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
