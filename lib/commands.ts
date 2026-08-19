import { MAIN_NAV, SOCIAL_NAV } from "./navigation";
import { getProjects } from "./projects";
import { SKILLS } from "./skills";

export type CommandAction =
  | { type: "navigate"; href: string }
  | { type: "open-terminal" };

export type CommandGroup = "navigation" | "projects" | "social" | "system";

export interface Command {
  id: string;
  label: string;
  description?: string;
  /** Extra lowercase search terms — technologies, categories, synonyms */
  keywords?: string[];
  action: CommandAction;
  group: CommandGroup;
  /** kbd hint shown on the right */
  hint?: string;
}

const projects = getProjects();

/** Every technology and category referenced by a project, deduped + lowercased. */
const ALL_PROJECT_TERMS = Array.from(
  new Set(
    projects.flatMap((project) => [...project.technologies, ...project.category])
  )
).map((term) => term.toLowerCase());

const ALL_SKILL_TERMS = SKILLS.map((skill) => skill.name.toLowerCase());

/**
 * Search terms attached to a nav entry so a technology query also surfaces the
 * index page that lists it — "docker" finds both the project and /expertise.
 */
const NAV_KEYWORDS: Record<string, string[]> = {
  "/projects": ["work", "case study", "portfolio", ...ALL_PROJECT_TERMS],
  "/expertise": ["skills", "stack", "tech", ...ALL_SKILL_TERMS],
  "/timeline": ["journey", "history", "career", "path"],
  "/about": ["bio", "who", "background", "story"],
};

export const COMMANDS: Command[] = [
  // Navigation — sourced from lib/navigation, no duplication
  ...MAIN_NAV.map((item) => ({
    id: item.href,
    label: item.label,
    description: `Go to ${item.label}`,
    keywords: NAV_KEYWORDS[item.href],
    action: { type: "navigate" as const, href: item.href },
    group: "navigation" as const,
  })),
  {
    id: "/cyber",
    label: "Cyber / Lab",
    description: "Security projects and research",
    keywords: ["security", "ctf", "hacking", "pentest", "lab", "infosec"],
    action: { type: "navigate", href: "/cyber" },
    group: "navigation",
  },
  {
    id: "/contact",
    label: "Contact",
    description: "Get in touch",
    keywords: ["email", "hire", "reach", "message"],
    action: { type: "navigate", href: "/contact" },
    group: "navigation",
  },

  // Projects — searchable by title, technology and category (spec §14)
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    label: project.title,
    description: project.technologies.slice(0, 3).join(" · "),
    keywords: [
      project.slug,
      ...project.technologies.map((t) => t.toLowerCase()),
      ...project.category.map((c) => c.toLowerCase()),
      String(project.year),
    ],
    action: { type: "navigate" as const, href: `/projects/${project.slug}` },
    group: "projects" as const,
  })),

  // Social
  ...SOCIAL_NAV.map((item) => ({
    id: `social-${item.label.toLowerCase()}`,
    label: item.label,
    description: `Open ${item.label}`,
    action: { type: "navigate" as const, href: item.href },
    group: "social" as const,
  })),

  // System
  {
    id: "terminal",
    label: "Terminal",
    description: "Open the interactive terminal",
    keywords: ["shell", "repl", "easter", "egg", "cli", "console"],
    action: { type: "open-terminal" },
    group: "system",
    hint: "easter egg",
  },
];
