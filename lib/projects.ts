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
    shortDescription: "Automated video generation and editing pipeline using GenAI models.",
    year: 2026,
    status: "in-development",
    type: "private",
    category: ["AI", "SaaS"],
    role: "Lead Backend Engineer",
    technologies: ["TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    featured: true,
    order: 1,
    contribution: [
      "Architected the microservices backend to handle heavy video processing asynchronously.",
      "Designed the AI dispatching system to route requests to appropriate LLMs and generation models.",
      "Implemented secure webhook integrations for video rendering status."
    ],
    technicalChallenges: [
      "Managing unpredictable generation times and long-polling safely.",
      "Cost optimization across multiple API providers."
    ],
    architectureSummary: "A decoupled architecture where a Next.js edge handles UI state and a FastAPI worker pool processes heavy ML workloads via message queues."
  },
  {
    slug: "agent-orchestrator",
    title: "Agent Orchestrator",
    shortDescription: "A multi-agent routing system for complex automated workflows.",
    year: 2025,
    status: "completed",
    type: "open-source",
    category: ["AI", "Automation"],
    role: "Creator",
    technologies: ["Python", "LangChain", "Docker", "Redis"],
    featured: true,
    order: 2,
    githubUrl: "https://github.com",
    contribution: [
      "Built the core routing engine that dispatches tasks to specific agents based on semantic intent.",
      "Implemented a comparison node to select the best output from concurrent agent executions."
    ],
    technicalChallenges: [
      "Preventing infinite loops in agent reasoning.",
      "Maintaining state across disconnected agent executions without heavy database latency."
    ]
  },
  {
    slug: "obsidian-system",
    title: "Obsidian Workflow System",
    shortDescription: "A personal automation suite syncing Discord bots to Obsidian notes.",
    year: 2024,
    status: "completed",
    type: "public",
    category: ["Automation", "Web"],
    role: "Developer",
    technologies: ["TypeScript", "Discord.js", "Obsidian API"],
    featured: false,
    order: 3,
    contribution: [
      "Created a Discord bot that parses specific commands and pushes them directly into daily Obsidian notes.",
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
    confidentialityNote: "Detailed implementation, target names, and proprietary vulnerabilities are restricted under NDA. The following describes only the high-level methodology.",
    contribution: [
      "Led the external penetration test on the corporate web perimeter.",
      "Mapped the internal Active Directory structure to identify privilege escalation paths.",
      "Provided architectural remediation strategies to the client engineering team."
    ],
    architectureSummary: "Abstractly, the engagement involved pivoting through compromised edge nodes to access segregated internal VLANs.",
    results: "Identified and assisted in patching 3 critical vulnerabilities before exploitation."
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
