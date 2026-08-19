# Portfolio

Maxime's portfolio — Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

The full brief lives in [`PORTFOLIO_SPEC.md`](./PORTFOLIO_SPEC.md) (French) — read
it before making structural or visual changes. `AGENTS.md` has environment-
specific notes for coding agents working in this repo.

## Getting started

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run lint    # ESLint
npm run test    # node --test, no extra runner
npx tsc --noEmit
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Real identity, contact and social links live in a single file:
[`lib/site.ts`](./lib/site.ts). Everything else — nav, footer, command
palette, terminal, metadata, sitemap, OG image — reads from there.

## Design system

The visual direction is "engineering document," not dashboard-SaaS: hairline
rules, numbered title blocks (`01 / LABEL`), specimen-plate cards with corner
registration marks, and schematic SVG figures per project instead of
screenshots or stock icons.

Tokens live in [`app/globals.css`](./app/globals.css):

| Token | Value | Rule |
|---|---|---|
| `--color-accent` | deep blue-violet | **Ink, never paint** — hairlines, marks, small text only. No filled accent surface anywhere; the primary button is inverted white-on-black, not accent-filled. |
| `--color-accent-dim` / `--color-accent-wash` | derived | Rest-state / background-wash variants of the same hue — one family, no rainbow (spec §1.2). |
| `--radius-plate` / `--radius-control` | 10px / 6px | The only two radii on the site. |

Custom utility classes (`.title-block`, `.paper-grain`, …) **must** live in
`@layer components` — unlayered CSS in Tailwind v4 outranks utility classes
and will silently override things like `text-accent`.

The global background ([`components/layout/PageBackground.tsx`](./components/layout/PageBackground.tsx))
is a fixed, inert layer: a directional gradient wash in the accent colour plus
large geometric plates (the same isometric-plane shape used in the hero
visual) bleeding off two corners, at low opacity, over a fine grain texture.
Deliberately not a node-and-line "cyber network" pattern — the spec (§0.3)
rules that out explicitly.

## Content voice

Copy across the site (about, project write-ups, skill/timeline descriptions)
is written in plain, direct English — aimed at a B2/C1 reader, not native-
flourish prose. Short sentences, common vocabulary, technical terms kept only
where the audience needs them (pentest/security jargon is fine; ornate
phrasing is not).

## Project structure

```
app/            routes (App Router)
components/     ui/, layout/, hero/, projects/, expertise/, timeline/,
                terminal/, command-palette/, home/
lib/            typed content + helpers (projects, skills, timeline, cyber,
                navigation, site config, search, about copy)
providers/      AppProviders — palette/terminal open state, ⌘K shortcut
tests/          node --test suite (search ranking, command registry,
                terminal commands)
```

## Terminal & command palette

An easter egg (spec §13) reachable from the footer, `⌘K`/`Ctrl+K`, or typing
`palette` in the terminal. Commands are defined once in
[`components/terminal/TerminalCommands.ts`](./components/terminal/TerminalCommands.ts)
and [`lib/commands.ts`](./lib/commands.ts) — `help` output is generated from
the registry so it cannot drift from what actually runs.
