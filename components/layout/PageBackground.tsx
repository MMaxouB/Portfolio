/**
 * Global depth layer (PORTFOLIO_SPEC §1.3).
 *
 * Deliberately not a set of blurred radial blobs — that reads as "dark SaaS
 * template". This is ruled paper: a fixed horizontal rhythm, sparse vertical
 * registration ticks, one directional wash and a little grain. Each pass is
 * almost invisible on its own; together they give depth you feel but cannot
 * name, which is what the spec asks for.
 *
 * Fixed and inert, so it costs nothing on scroll and never intercepts input.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Horizontal ledger rules, faded out toward the bottom of the viewport */}
      <div className="paper-rules absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]" />

      {/* Vertical registration ticks, held to the upper band only */}
      <div className="paper-ticks absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,transparent_42%)]" />

      {/* One directional wash, as if light fell across the sheet */}
      <div className="paper-wash absolute inset-0" />

      {/* Grain */}
      <div className="paper-grain absolute inset-0" />
    </div>
  );
}
