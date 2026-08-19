"use client";

import Link from "next/link";
import { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Lock, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  featuredMode?: boolean;
}

export function ProjectCard({ project, featuredMode = false }: ProjectCardProps) {
  const isNDA = project.type === "nda";
  const isPrivate = project.type === "private";
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl">
        <Card className={`h-full flex flex-col overflow-hidden relative group ${featuredMode ? 'md:flex-row' : ''}`}>
          
          {/* Visual Area Placeholder (could be real image, abstract gradient, or mini UI representation) */}
          <div className={`relative bg-surface-hover border-border-subtle flex items-center justify-center p-8
            ${featuredMode ? 'md:w-1/2 border-b md:border-b-0 md:border-r min-h-[300px]' : 'border-b h-48'}
          `}>
            {/* Minimal abstract representation based on tags or type */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-primary to-surface-hover opacity-50" />
            <div className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
               {isNDA ? <ShieldAlert size={48} className="text-accent/50" /> :
                isPrivate ? <Lock size={48} className="text-text-muted" /> :
                <div className="font-mono text-xs text-text-muted border border-border-hover px-4 py-2 rounded bg-bg-primary/50 backdrop-blur">
                  {"{"} ... {project.slug} {"}"}
                </div>}
            </div>
          </div>
          
          <div className={`p-6 flex flex-col flex-1 ${featuredMode ? 'md:w-1/2 justify-center' : ''}`}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={isNDA ? "accent" : isPrivate ? "secondary" : "default"}>
                {project.type.toUpperCase()}
              </Badge>
              {project.category.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="outline" className="text-text-muted border-border-subtle/50">
                  {cat}
                </Badge>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold text-text-primary mb-2 flex items-center gap-2">
              {project.title}
              <ArrowUpRight size={16} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent" />
            </h3>
            
            <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
              {project.shortDescription}
            </p>
            
            <div className="mt-auto flex items-center justify-between text-xs font-medium text-text-muted uppercase tracking-wider">
              <span>{project.role}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
