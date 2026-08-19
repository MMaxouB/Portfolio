export type ProjectPrivacy = "open-source" | "public" | "private" | "nda";
export type ProjectStatus = "completed" | "in-progress" | "archived" | "in-development";

/**
 * Closed tag vocabulary (PORTFOLIO_SPEC §5.6): tags describe the *nature* of a
 * project, never its stack. Open Source / Private / NDA are not listed here —
 * they come from `type` and are rendered separately, so a tag never repeats it.
 */
export const PROJECT_TAGS = [
  "SaaS",
  "AI",
  "Web",
  "Automation",
  "Security",
  "Research",
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  year: number;
  status: ProjectStatus;
  type: ProjectPrivacy;
  category: ProjectTag[];
  role: string;
  technologies: string[];
  featured: boolean;
  order: number;
  
  // Optional links depending on privacy level
  githubUrl?: string;
  liveUrl?: string;
  
  // Visuals
  image?: string;
  
  // Deep Dive Data (rendered in details page)
  contribution?: string[];
  technicalChallenges?: string[];
  architectureSummary?: string;
  results?: string;
  
  // Strict NDA warning if needed
  confidentialityNote?: string;
}

const projects: Project[] = [
  {
    slug: "ai-video-editor",
    title: "AI Video Editor",
    shortDescription: "A pipeline that generates and edits video automatically, using GenAI models.",
    year: 2026,
    status: "in-development",
    type: "private",
    category: ["AI", "SaaS"],
    role: "Lead Full-Stack Engineer",
    technologies: ["TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    featured: true,
    order: 1,
    contribution: [
      "Designed the microservices backend to process heavy video jobs in the background.",
      "Built the AI dispatch system that sends each request to the right LLM or generation model.",
      "Added secure webhooks to track video rendering status."
    ],
    technicalChallenges: [
      "Handling unpredictable generation times and long-polling safely.",
      "Keeping costs under control across several API providers."
    ],
    architectureSummary: "A decoupled architecture: a Next.js edge layer handles UI state, and a FastAPI worker pool processes heavy ML jobs through message queues."
  },
  {
    slug: "agent-orchestrator",
    title: "Agent Orchestrator",
    shortDescription: "A multi-agent system that routes tasks for complex automated workflows.",
    year: 2025,
    status: "completed",
    type: "open-source",
    category: ["AI", "Automation"],
    role: "Creator",
    technologies: ["Python", "LangChain", "Docker", "Redis"],
    featured: true,
    order: 2,
    githubUrl: "https://github.com/MMaxouB2/antigravity_extention_powerbot",
    contribution: [
      "Built the core routing engine, which sends each task to the right agent based on intent.",
      "Added a comparison step that picks the best result from agents running in parallel."
    ],
    technicalChallenges: [
      "Preventing infinite loops in agent reasoning.",
      "Keeping state consistent across separate agent runs, without slow database calls."
    ]
  },
  {
    slug: "obsidian-system",
    title: "Obsidian Workflow System",
    shortDescription: "A personal automation tool that syncs Discord bots with Obsidian notes.",
    year: 2024,
    status: "completed",
    type: "public",
    category: ["Automation", "Web"],
    role: "Developer",
    technologies: ["TypeScript", "Discord.js", "Obsidian API"],
    featured: false,
    order: 3,
    contribution: [
      "Built a Discord bot that reads specific commands and adds them straight to daily Obsidian notes.",
      "Automated task extraction using regex and simple NLP."
    ]
  },
  {
    slug: "enterprise-security-audit",
    title: "Enterprise Network Audit",
    shortDescription: "Comprehensive penetration testing and architecture review.",
    year: 2025,
    status: "completed",
    type: "nda",
    category: ["Security"],
    role: "Security Consultant",
    technologies: ["Linux", "Nmap", "Metasploit", "Burp Suite", "Active Directory"],
    featured: true,
    order: 4,
    confidentialityNote: "The full details, target names and specific vulnerabilities are confidential under NDA. This page only describes the general methodology.",
    contribution: [
      "Led the external penetration test on the corporate web perimeter.",
      "Mapped the internal Active Directory structure to find privilege escalation paths.",
      "Gave the client's engineering team clear steps to fix the architecture."
    ],
    architectureSummary: "In general terms, the engagement involved pivoting through compromised edge nodes to reach separate internal VLANs.",
    results: "Found 3 critical vulnerabilities and helped fix them before they could be exploited."
  },
  {
    slug: "cyber-tool",
    title: "Vulnerability Scanner",
    shortDescription: "Lightweight distributed port and vulnerability scanner.",
    year: 2024,
    status: "archived",
    type: "open-source",
    category: ["Security", "Research"],
    role: "Core Contributor",
    technologies: ["Go", "Bash"],
    featured: false,
    order: 5,
    githubUrl: "https://github.com",
  }
];

export function getProjects(): Project[] {
  // Copy first — sort() mutates, and this array is shared module state.
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getSecurityProjects(): Project[] {
  return getProjects().filter((p) =>
    p.category.some((c) => c.toLowerCase() === "security")
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
