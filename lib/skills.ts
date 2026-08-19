export type SkillCategory = "language" | "engineering" | "ai" | "security";

export interface Skill {
  slug: string;
  name: string;
  category: SkillCategory;
  /** 0–100 — personal proficiency indicator, not a scientific score */
  score: number;
  levelLabel: string;
  description?: string;
  /** Slugs of projects in lib/projects.ts that use this skill */
  projectSlugs: string[];
}

export const SKILLS: Skill[] = [
  // Languages
  {
    slug: "python",
    name: "Python",
    category: "language",
    score: 88,
    levelLabel: "Advanced",
    description: "Primary scripting and backend language. Used for API servers, automation pipelines and AI integrations.",
    projectSlugs: ["agent-orchestrator", "enterprise-security-audit"],
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "language",
    score: 82,
    levelLabel: "Advanced",
    description: "Language of choice for full-stack web work. All Next.js projects run strict TypeScript.",
    projectSlugs: ["ai-video-editor", "obsidian-system"],
  },
  {
    slug: "javascript",
    name: "JavaScript",
    category: "language",
    score: 80,
    levelLabel: "Advanced",
    description: "Solid foundation underlying TypeScript work; comfortable with runtime quirks and async patterns.",
    projectSlugs: ["obsidian-system"],
  },
  {
    slug: "html-css",
    name: "HTML / CSS",
    category: "language",
    score: 78,
    levelLabel: "Proficient",
    description: "Semantic markup and modern CSS including Flexbox, Grid, and CSS custom properties.",
    projectSlugs: [],
  },

  // Engineering
  {
    slug: "backend-engineering",
    name: "Backend Engineering",
    category: "engineering",
    score: 84,
    levelLabel: "Advanced",
    description: "REST API design, async task queues, database modelling and service architecture.",
    projectSlugs: ["ai-video-editor", "agent-orchestrator"],
  },
  {
    slug: "software-architecture",
    name: "Software Architecture",
    category: "engineering",
    score: 76,
    levelLabel: "Proficient",
    description: "Designing systems with clear boundaries, data flow and failure modes in mind.",
    projectSlugs: ["ai-video-editor", "agent-orchestrator"],
  },
  {
    slug: "automation",
    name: "Automation",
    category: "engineering",
    score: 82,
    levelLabel: "Advanced",
    description: "Scripted workflows, CI pipelines, browser automation, and custom tooling.",
    projectSlugs: ["obsidian-system", "agent-orchestrator"],
  },
  {
    slug: "git",
    name: "Git / Version Control",
    category: "engineering",
    score: 85,
    levelLabel: "Advanced",
    description: "Branching strategies, clean commit history, code review and collaborative workflows.",
    projectSlugs: [],
  },

  // AI / Systems
  {
    slug: "ai-integration",
    name: "AI Integration",
    category: "ai",
    score: 80,
    levelLabel: "Proficient",
    description: "Integrating LLM APIs into products — prompt engineering, latency control, cost management.",
    projectSlugs: ["ai-video-editor", "agent-orchestrator"],
  },
  {
    slug: "agent-systems",
    name: "Agent Systems",
    category: "ai",
    score: 75,
    levelLabel: "Proficient",
    description: "Building multi-agent orchestration with task routing, comparison and feedback loops.",
    projectSlugs: ["agent-orchestrator"],
  },
  {
    slug: "llm-applications",
    name: "LLM Applications",
    category: "ai",
    score: 74,
    levelLabel: "Proficient",
    description: "Applied use of language models for summarisation, extraction, classification and generation.",
    projectSlugs: ["ai-video-editor", "agent-orchestrator"],
  },

  // Security
  {
    slug: "web-security",
    name: "Web Security",
    category: "security",
    score: 72,
    levelLabel: "Proficient",
    description: "OWASP Top 10, authentication hardening, session management, header policies.",
    projectSlugs: ["enterprise-security-audit"],
  },
  {
    slug: "pentesting",
    name: "Penetration Testing",
    category: "security",
    score: 68,
    levelLabel: "Developing",
    description: "Active directory enumeration, web app testing, CTF-grounded methodology.",
    projectSlugs: ["enterprise-security-audit", "cyber-tool"],
  },
  {
    slug: "linux",
    name: "Linux",
    category: "security",
    score: 80,
    levelLabel: "Advanced",
    description: "Daily driver OS. Comfortable with the CLI, process management, permissions and shell scripting.",
    projectSlugs: ["enterprise-security-audit", "cyber-tool"],
  },
  {
    slug: "osint",
    name: "OSINT",
    category: "security",
    score: 65,
    levelLabel: "Developing",
    description: "Passive reconnaissance, footprinting and open-source intelligence gathering workflows.",
    projectSlugs: ["enterprise-security-audit"],
  },
];

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: "Languages",
  engineering: "Engineering",
  ai: "AI / Systems",
  security: "Security",
};

export const SKILL_CATEGORIES: SkillCategory[] = ["language", "engineering", "ai", "security"];

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return SKILLS.filter((s) => s.category === category);
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

/**
 * Homepage shows 6–8 skills, not the whole list (§8.4). Highest scored first,
 * capped to one per category so the preview reads as a range, not a ranking.
 */
export function getHeadlineSkills(limit = 8): Skill[] {
  const byScore = [...SKILLS].sort((a, b) => b.score - a.score);
  const picked: Skill[] = [];
  const seen = new Set<SkillCategory>();

  // One pass to cover every category, then fill up with the next best.
  for (const skill of byScore) {
    if (seen.has(skill.category)) continue;
    seen.add(skill.category);
    picked.push(skill);
  }
  for (const skill of byScore) {
    if (picked.length >= limit) break;
    if (!picked.includes(skill)) picked.push(skill);
  }

  return picked.slice(0, limit).sort((a, b) => b.score - a.score);
}

/** Projects a skill is evidenced by — powers the §8.6 filter. */
export function getSkillsForProject(slug: string): Skill[] {
  return SKILLS.filter((skill) => skill.projectSlugs.includes(slug));
}
