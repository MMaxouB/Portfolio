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
    githubUrl: "https://github.com/PARTH-CODE2012/zipzop-backend",
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
    shortDescription: "A personal automation tool that syncs Discord bots and Web-App with Obsidian notes.",
    year: 2026,
    status: "completed",
    type: "public",
    category: ["Automation", "Web"],
    role: "Creator",
    technologies: ["TypeScript", "Discord.js", "Obsidian API", "Node.js", "FastAPI"],
    featured: true,
    order: 3,
    githubUrl: "https://github.com/MMaxouB/web-app-workplace",
    contribution: [
      "Built a Discord bot that reads specific commands and adds them straight to daily Obsidian notes.",
      "Automated task extraction using regex and simple NLP.",
      "Created a web dashboard to manage and visualize the workflow."
    ]
  },
  {
    slug: "ctf-penetration-labs",
    title: "CTF & Penetration Testing Platforms",
    shortDescription: "Ongoing participation in capture-the-flag competitions and penetration testing labs on HackTheBox and TryHackMe.",
    year: 2024,
    status: "in-progress",
    type: "public",
    category: ["Security"],
    role: "Penetration Tester & CTF Competitor",
    technologies: ["Linux", "Bash", "Nmap", "Burp Suite", "Metasploit", "Python", "SQL"],
    featured: true,
    order: 4,
    contribution: [
      "Completed 20+ machines on HackTheBox across difficulty levels (Easy, Medium, Hard).",
      "Participated in HackTheBox CTF competitions, focusing on web exploitation and privilege escalation.",
      "Mastered TryHackMe learning paths: Complete Beginner, Web Security, Linux Privilege Escalation and more.",
      "Developed practical skills in OWASP Top 10 vulnerabilities, SQL injection, XSS, and reverse shells.",
      "My main area is network security, but I also enjoy web application security and cryptography challenges."
    ],
    technicalChallenges: [
      "Chaining multiple vulnerabilities to escalate privileges in segmented environments.",
      "Time management under competitive CTF pressure — solving boxes in contests with live scoreboards.",
      "Reverse engineering obfuscated applications and binaries to find hidden attack vectors."
    ],
    architectureSummary: "CTF labs simulate real-world penetration testing scenarios: initial access via web vulnerabilities or misconfiguration, lateral movement through compromised systems, and finally privilege escalation to achieve full system control.",
    results: "Developed methodical exploitation techniques and deepened understanding of attack chains in production-like environments."
  },
  {
    slug: "templates-web",
    title: "Templates Web — AI-Resistant Design System",
    shortDescription: "Catalog of 145+ web architecture templates with an AI-resistant design system built on measurable diversity constraints.",
    year: 2026,
    status: "in-progress",
    type: "open-source",
    category: ["Web"],
    role: "Creator",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
    featured: true,
    order: 5,
    githubUrl: "https://github.com/MMaxouB/templates_web",
    contribution: [
      "Designed a three-layer separation: structure (composition), artistic direction (typography, material, geometry), and palette (colors only).",
      "Defined a Design DNA schema on nine independent axes with measurable consequences, enforced by automated tools.",
      "Built constraint validation: 25+ creative constraints (no-cards, asymmetry, dense, editorial, etc.) verified by screenshot and CSS analysis.",
      "Implemented anti-LLM budget system: reflexes (centered-axial, soft-rounded, hero, etc.) are taxed rather than banned, forcing deliberate trade-offs.",
      "Created measurement tools: `dna-report.js` (coverage, collisions, suggestions), `check-constraints.js` (verification), `perceptual-diff.js` (visual comparison invariant to palette)."
    ],
    technicalChallenges: [
      "Preventing AI-generated sameness: 145 templates converge toward the same design without structural constraints.",
      "Separating concerns: making layer independence absolute—a palette changes only colors, a direction changes only form, structure carries only composition.",
      "Measuring diversity: building tools to detect when metadata claims divergence but pixels show collision.",
      "Zero dependencies: all 145 templates run by opening `index.html` in a browser—no build, no npm, no CDN."
    ],
    architectureSummary: "Three independent layers: 145 unique structures (vitrine, boutique, portfolio, blog, app, etc.) × ~150 artistic directions (minimalist, brutalist, editorial, cyberpunk, etc.) × ~120 color palettes. Each template declares its design DNA across composition, density, typography system, geometry, surface, navigation, media treatment, interaction, and motion. Constraints are not decorative—they carry measurable consequences enforced by tests.",
    results: "Delivered 43 templates across 12 families, measured diversity across 66 pairwise comparisons, achieved zero AI-generated sameness (84% of initial lot reduced to 14% centered composition through structural redesign)."
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
