/**
 * Global depth layer (PORTFOLIO_SPEC §1.3).
 *
 * Client correction, 2026-08-19: the first version (faint ruled paper) read as
 * empty — no colour, no shape. This version gives the background actual
 * presence: a visible gradient wash in the accent's deep blue-violet, plus
 * large geometric plates bleeding off two corners. The plates are the same
 * rhombus/isometric-plane language as HeroVisual, scaled up and set to a low
 * opacity — geometry the site already speaks, not a node-and-line "cyber
 * network" cliché (explicitly ruled out by §0.3).
 *
 * Fixed and inert, so it costs nothing on scroll and never intercepts input.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Gradient wash — visible depth, asymmetric so it reads as light, not a screen tint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 84% 6%, var(--color-accent-wash), transparent 60%)",
            "radial-gradient(ellipse 50% 45% at 4% 96%, rgba(106, 114, 232, 0.08), transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Geometric plates — oversized isometric planes, bleeding off two corners */}
      <svg
        viewBox="0 0 600 600"
        className="absolute -right-40 -top-48 h-[720px] w-[720px] text-accent-dim opacity-[0.22] md:opacity-[0.3]"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon points="300,60 520,190 300,320 80,190" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="300,170 480,278 300,386 120,278" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="300,280 440,366 300,452 160,366" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <line x1="300" y1="60" x2="300" y2="452" stroke="currentColor" strokeWidth="1" strokeDasharray="1 7" />
      </svg>

      <svg
        viewBox="0 0 480 480"
        className="absolute -bottom-40 -left-32 h-[560px] w-[560px] text-accent-dim opacity-[0.16] md:opacity-[0.22]"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon points="240,60 400,164 240,268 80,164" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="240,150 360,228 240,306 120,228" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="240" y1="60" x2="240" y2="306" stroke="currentColor" strokeWidth="1" strokeDasharray="1 7" />
      </svg>

      {/* Grain */}
      <div className="paper-grain absolute inset-0" />
    </div>
  );
}
