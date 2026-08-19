export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  area: "software" | "security" | "ai" | "learning";
  projectSlugs?: string[];
  technologies?: string[];
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2024",
    title: "First Python projects & scripting",
    description:
      "Wrote the first real automation scripts — file processors, API wrappers, CLI utilities. Python became the primary working language.",
    area: "learning",
    technologies: ["Python", "Bash"],
  },
  {
    year: "2024",
    title: "Linux as a daily driver",
    description:
      "Committed to Linux full-time. Learned process management, shell scripting, permissions and system internals through daily use.",
    area: "security",
    technologies: ["Linux", "Bash"],
  },
  {
    year: "2024",
    title: "Personal tooling — Vulnerability Scanner",
    description:
      "Built a lightweight distributed port and service scanner to learn Go concurrency and network fundamentals.",
    area: "security",
    projectSlugs: ["cyber-tool"],
    technologies: ["Go", "Bash"],
  },
  {
    year: "2025",
    title: "CTFs and web security fundamentals",
    description:
      "Competed in multiple Capture the Flag events. Strengthened understanding of OWASP Top 10, authentication flaws and privilege escalation.",
    area: "security",
    technologies: ["Burp Suite", "Nmap", "Linux"],
  },
  {
    year: "2025",
    title: "Web development with TypeScript",
    description:
      "Shifted into full-stack web work. Adopted TypeScript and Next.js. Built the Obsidian workflow automation system — first production-grade Node project.",
    area: "software",
    projectSlugs: ["obsidian-system"],
    technologies: ["TypeScript", "Next.js", "Discord.js"],
  },
  {
    year: "2025",
    title: "First professional security engagement",
    description:
      "Conducted an enterprise network penetration test under NDA. External perimeter testing, AD enumeration, and remediation advisory.",
    area: "security",
    projectSlugs: ["enterprise-security-audit"],
    technologies: ["Metasploit", "Active Directory", "Nmap"],
  },
  {
    year: "2026",
    title: "AI agent systems & orchestration",
    description:
      "Built a multi-agent routing system capable of dispatching tasks to parallel LLM agents and selecting the best output. First real work at the intersection of systems design and AI.",
    area: "ai",
    projectSlugs: ["agent-orchestrator"],
    technologies: ["Python", "LangChain", "Redis", "Docker"],
  },
  {
    year: "2026",
    title: "Software architecture & SaaS development",
    description:
      "Taking on lead engineering roles in SaaS products. Designing microservice backends, async pipelines and AI-augmented media workflows.",
    area: "software",
    projectSlugs: ["ai-video-editor"],
    technologies: ["TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL"],
  },
];

export const AREA_LABELS: Record<TimelineEvent["area"], string> = {
  software: "Software",
  security: "Security",
  ai: "AI / Systems",
  learning: "Learning",
};

export const AREA_COLORS: Record<TimelineEvent["area"], string> = {
  software: "bg-accent",
  security: "bg-emerald-500",
  ai: "bg-violet-500",
  learning: "bg-text-muted",
};

export const AREA_TEXT_COLORS: Record<TimelineEvent["area"], string> = {
  software: "text-accent",
  security: "text-emerald-400",
  ai: "text-violet-400",
  learning: "text-text-muted",
};
