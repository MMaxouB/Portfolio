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
      "Wrote my first real automation scripts: file processors, API wrappers and CLI tools. Python became my main language.",
    area: "learning",
    technologies: ["Python", "Bash"],
  },
  {
    year: "2024",
    title: "Linux as a daily driver",
    description:
      "Started using Linux full-time. Learned process management, shell scripting, permissions and system internals through daily use.",
    area: "security",
    technologies: ["Linux", "Bash"],
  },
  {
    year: "2024",
    title: "Personal tooling — Vulnerability Scanner",
    description:
      "Built a lightweight, distributed port scanner to learn Go concurrency and network basics.",
    area: "security",
    technologies: ["Go", "Bash"],
  },
  {
    year: "2025",
    title: "CTFs and web security fundamentals",
    description:
      "Took part in several Capture the Flag events. Learned more about the OWASP Top 10, authentication flaws and privilege escalation.",
    area: "security",
    projectSlugs: ["ctf-penetration-labs"],
    technologies: ["Burp Suite", "Nmap", "Linux"],
  },
  {
    year: "2025",
    title: "Web development with TypeScript",
    description:
      "Moved into full-stack web development. Started using TypeScript and Next.js. Built the Obsidian workflow automation system, my first production-grade Node project.",
    area: "software",
    projectSlugs: ["obsidian-system"],
    technologies: ["TypeScript", "Next.js", "Discord.js"],
  },
  {
    year: "2025",
    title: "Network security & penetration testing",
    description:
      "Participated in HackTheBox and TryHackMe labs. Learned to enumerate Active Directory, exploit web vulnerabilities and escalate privileges.",
    area: "security",
    projectSlugs: ["ctf-penetration-labs"],
    technologies: ["Metasploit", "Active Directory", "Nmap"],
  },
  {
    year: "2026",
    title: "AI agent systems & orchestration",
    description:
      "Built a multi-agent routing system that sends tasks to several LLM agents in parallel and picks the best result. My first real project combining systems design and AI.",
    area: "ai",
    projectSlugs: ["agent-orchestrator"],
    technologies: ["Python", "LangChain", "Redis", "Docker"],
  },
  {
    year: "2026",
    title: "Software architecture & SaaS development",
    description:
      "Taking on lead engineering roles in SaaS products. Designing microservice backends, async pipelines and AI-powered media workflows.",
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

/**
 * §1.2 forbids a rainbow system, so areas are not distinguished by hue. They
 * are distinguished by mark: a filled square, a hollow square, a rule, a dot —
 * all drawn in the one ink colour. Legible in greyscale, and it keeps the
 * palette to a single family.
 */
export const AREA_MARKS: Record<TimelineEvent["area"], string> = {
  software: "bg-accent",
  security: "border border-accent bg-transparent",
  ai: "bg-accent-dim",
  learning: "border border-border-hover bg-transparent",
};

export const AREA_TEXT_COLORS: Record<TimelineEvent["area"], string> = {
  software: "text-accent",
  security: "text-accent",
  ai: "text-text-secondary",
  learning: "text-text-muted",
};
