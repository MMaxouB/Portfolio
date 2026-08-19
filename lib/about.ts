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
  "I build backends, automation pipelines and AI systems — and I think about how they break before someone else does.";

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    label: "Current focus",
    title: "Backend architecture for AI-heavy products",
    body: "Most of my work sits behind the interface: services that orchestrate models, queue long-running jobs and stay predictable under load. Python and TypeScript, FastAPI and Next.js, with PostgreSQL and Docker underneath.",
  },
  {
    label: "What I build",
    title: "Systems that hold up outside the demo",
    body: "Multi-agent orchestration, asynchronous processing pipelines, workflow automation and internal tooling. I care about the parts that only show up in production — retries, failure modes, cost, observability.",
    points: [
      "Decoupled services over monoliths that grow by accident",
      "Explicit data models before clever abstractions",
      "Security considered at design time, not bolted on after",
    ],
  },
  {
    label: "Security",
    title: "A specialisation, not the whole identity",
    body: "Penetration testing, OWASP Top 10, Active Directory enumeration and Linux privilege escalation — practised on CTF platforms and applied on a real engagement under NDA. It informs how I write software rather than replacing it.",
  },
  {
    label: "What I am learning",
    title: "Depth over breadth",
    body: "Distributed systems fundamentals, Go for concurrent tooling, and the operational side of running AI workloads — evaluation, cost control and failure containment.",
  },
];
