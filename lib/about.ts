/**
 * About page copy (PORTFOLIO_SPEC §11).
 *
 * Kept as data so the wording can be edited without touching layout. The spec
 * is explicit: professional identity, short blocks, no autobiography.
 *
 * ⚠️ Texte dérivé des données existantes (skills / timeline / projects).
 *    À relire et ajuster — c'est ta voix, pas la mienne.
 */

export interface AboutBlock {
  /** Small uppercase eyebrow */
  label: string;
  title: string;
  body: string;
  /** Optional short list rendered as a compact column */
  points?: string[];
}

export const ABOUT_INTRO =
  "I build backend systems, automation pipelines and AI tools — and I always think about how they could break.";

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    label: "Current focus",
    title: "Backend architecture for AI-heavy products",
    body: "Most of my work happens behind the interface. I build services that connect AI models, manage long background jobs, and stay reliable under heavy load — using Python, TypeScript, FastAPI, Next.js, PostgreSQL and Docker.",
  },
  {
    label: "What I build",
    title: "Systems that hold up outside the demo",
    body: "Multi-agent systems, background processing pipelines, workflow automation and internal tools. I care most about the parts that only show up in production: retries, failures, cost and monitoring.",
    points: [
      "Small, separate services instead of one big system that grows out of control",
      "Clear data models before clever abstractions",
      "Security planned from the start, not added later",
    ],
  },
  {
    label: "Security",
    title: "A specialisation, not the whole identity",
    body: "Penetration testing, the OWASP Top 10, Active Directory enumeration and Linux privilege escalation. I practise these skills on CTF platforms, and I have used them in one real engagement under NDA. Security shapes how I write software — it does not replace it.",
  },
  {
    label: "What I am learning",
    title: "Depth over breadth",
    body: "The fundamentals of distributed systems, Go for concurrent tools, and the practical side of running AI workloads: evaluation, cost control and handling failures.",
  },
];
