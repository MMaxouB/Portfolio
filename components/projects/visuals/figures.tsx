/**
 * Project figures (PORTFOLIO_SPEC §5.4).
 *
 * The spec asks for a distinct visual identity per project and sketches the
 * diagrams it wants. These are those diagrams: thin-stroke monochrome schematics
 * with mono labels, drawn like datasheet figures. No glow, no gradient fills,
 * no node-graph-with-glowing-edges repeated five times — each project gets a
 * different *kind* of drawing because each project is a different kind of thing.
 *
 * Notably: the NDA project is not a padlock (§0.3 forbids it). It is the real
 * architecture with the sensitive parts redacted, which is what an NDA actually
 * looks like.
 */

const FRAME = "0 0 320 180";

interface FigureProps {
  className?: string;
}

/** Shared label style — small, wide-tracked, monospaced. */
const label = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 7.5,
  letterSpacing: "0.14em",
} as const;

function Figure({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox={FRAME}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   AI Video Editor — an edit timeline: ruler, tracks, clips, playhead, render bar
   -------------------------------------------------------------------------- */
export function VideoTracksFigure({ className }: FigureProps) {
  const clips = [
    { y: 66, x: 34, w: 62 },
    { y: 66, x: 102, w: 38 },
    { y: 66, x: 146, w: 74 },
    { y: 88, x: 34, w: 44 },
    { y: 88, x: 96, w: 96 },
    { y: 110, x: 52, w: 118 },
  ];

  return (
    <Figure className={className}>
      {/* Timecode ruler */}
      <line x1="34" y1="50" x2="286" y2="50" className="stroke-border-hover" strokeWidth="1" />
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={i}
          x1={34 + i * 18}
          y1="50"
          x2={34 + i * 18}
          y2={i % 3 === 0 ? 43 : 46}
          className="stroke-border-hover"
          strokeWidth="1"
        />
      ))}
      <text x="34" y="36" style={label} className="fill-text-muted">
        00:00
      </text>

      {/* Track lanes */}
      {[62, 84, 106].map((y) => (
        <rect
          key={y}
          x="34"
          y={y}
          width="252"
          height="16"
          className="fill-bg-primary stroke-border-subtle"
          strokeWidth="1"
        />
      ))}

      {/* Clips */}
      {clips.map((clip, i) => (
        <rect
          key={i}
          x={clip.x}
          y={clip.y}
          width={clip.w}
          height="12"
          rx="1.5"
          className={i === 4 ? "fill-accent-wash stroke-accent-dim" : "fill-surface-hover stroke-border-hover"}
          strokeWidth="1"
        />
      ))}

      {/* Playhead */}
      <g className="playhead-sweep">
        <line x1="128" y1="40" x2="128" y2="130" className="stroke-accent" strokeWidth="1" />
        <path d="M124 40 h8 l-4 5 z" className="fill-accent" />
      </g>

      {/* Render bar */}
      <rect x="34" y="142" width="252" height="5" rx="1" className="fill-bg-primary stroke-border-subtle" strokeWidth="1" />
      <rect x="34" y="142" width="168" height="5" rx="1" className="fill-accent-dim" />
      <text x="286" y="160" textAnchor="end" style={label} className="fill-text-muted">
        RENDER 66%
      </text>
    </Figure>
  );
}

/* --------------------------------------------------------------------------
   Agent Orchestrator — the dispatch fan drawn in the spec, §5.4
   -------------------------------------------------------------------------- */
export function DispatchFanFigure({ className }: FigureProps) {
  const agents = [56, 90, 124];

  return (
    <Figure className={className}>
      {/* Input */}
      <rect x="20" y="80" width="46" height="20" rx="2" className="fill-surface-hover stroke-border-hover" strokeWidth="1" />
      <text x="43" y="93" textAnchor="middle" style={label} className="fill-text-secondary">
        INPUT
      </text>

      {/* Input → dispatcher */}
      <line x1="66" y1="90" x2="104" y2="90" className="stroke-accent-dim trace-flow" strokeWidth="1" strokeDasharray="4 4" />

      {/* Dispatcher */}
      <rect x="104" y="74" width="52" height="32" rx="2" className="fill-bg-primary stroke-accent-dim" strokeWidth="1" />
      <text x="130" y="93" textAnchor="middle" style={label} className="fill-accent">
        DISPATCH
      </text>

      {/* Dispatcher → agents (orthogonal routing, like a schematic) */}
      {agents.map((y) => (
        <path
          key={y}
          d={`M156 90 H176 V${y + 10} H196`}
          fill="none"
          className="stroke-border-hover"
          strokeWidth="1"
        />
      ))}

      {/* Agents */}
      {agents.map((y, i) => (
        <g key={y}>
          <rect x="196" y={y} width="52" height="20" rx="2" className="fill-surface-hover stroke-border-hover" strokeWidth="1" />
          <text x="222" y={y + 13} textAnchor="middle" style={label} className="fill-text-secondary">
            {`AGENT ${String.fromCharCode(65 + i)}`}
          </text>
        </g>
      ))}

      {/* Agents → comparison */}
      {agents.map((y) => (
        <path key={y} d={`M248 ${y + 10} H268 V90`} fill="none" className="stroke-border-hover" strokeWidth="1" />
      ))}
      <line x1="268" y1="90" x2="288" y2="90" className="stroke-accent-dim trace-flow" strokeWidth="1" strokeDasharray="4 4" />

      {/* Selection */}
      <circle cx="294" cy="90" r="5" className="fill-none stroke-accent" strokeWidth="1" />
      <text x="294" y="112" textAnchor="middle" style={label} className="fill-text-muted">
        SELECT
      </text>
    </Figure>
  );
}

/* --------------------------------------------------------------------------
   Obsidian System — the linear pipeline drawn in the spec, §5.4
   -------------------------------------------------------------------------- */
export function PipelineFigure({ className }: FigureProps) {
  const stages = [
    { x: 24, label: "DISCORD" },
    { x: 106, label: "BOT" },
    { x: 188, label: "OBSIDIAN" },
  ];
  const outputs = ["PROJECTS", "TASKS", "DOCS"];

  return (
    <Figure className={className}>
      {stages.map((stage, i) => (
        <g key={stage.label}>
          <rect
            x={stage.x}
            y="52"
            width="58"
            height="24"
            rx="2"
            className={i === 1 ? "fill-bg-primary stroke-accent-dim" : "fill-surface-hover stroke-border-hover"}
            strokeWidth="1"
          />
          <text x={stage.x + 29} y="67" textAnchor="middle" style={label} className={i === 1 ? "fill-accent" : "fill-text-secondary"}>
            {stage.label}
          </text>
          {i < stages.length - 1 && (
            <line
              x1={stage.x + 58}
              y1="64"
              x2={stage.x + 82}
              y2="64"
              className="stroke-accent-dim trace-flow"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}
        </g>
      ))}

      {/* Fan-out into the vault */}
      <line x1="217" y1="76" x2="217" y2="100" className="stroke-border-hover" strokeWidth="1" />
      <path d="M64 100 H286" fill="none" className="stroke-border-hover" strokeWidth="1" />

      {outputs.map((output, i) => {
        const x = 64 + i * 111;
        return (
          <g key={output}>
            <line x1={x} y1="100" x2={x} y2="120" className="stroke-border-hover" strokeWidth="1" />
            <rect x={x - 32} y="120" width="64" height="20" rx="2" className="fill-surface-hover stroke-border-subtle" strokeWidth="1" />
            <text x={x} y="133" textAnchor="middle" style={label} className="fill-text-muted">
              {output}
            </text>
          </g>
        );
      })}
    </Figure>
  );
}

/* --------------------------------------------------------------------------
   Enterprise Network Audit — real topology, sensitive parts redacted.
   An NDA is a redaction, not a padlock.
   -------------------------------------------------------------------------- */
export function RedactedMapFigure({ className }: FigureProps) {
  return (
    <Figure className={className}>
      {/* Perimeter */}
      <rect
        x="16"
        y="26"
        width="288"
        height="128"
        rx="3"
        fill="none"
        className="stroke-border-subtle"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <text x="24" y="20" style={label} className="fill-text-muted">
        PERIMETER
      </text>

      {/* External node */}
      <rect x="30" y="76" width="46" height="22" rx="2" className="fill-surface-hover stroke-accent-dim" strokeWidth="1" />
      <text x="53" y="90" textAnchor="middle" style={label} className="fill-accent">
        EDGE
      </text>

      <line x1="76" y1="87" x2="106" y2="87" className="stroke-accent-dim trace-flow" strokeWidth="1" strokeDasharray="4 4" />

      {/* Internal segments — labels redacted */}
      {[46, 78, 110].map((y, i) => (
        <g key={y}>
          <rect x="106" y={y} width="74" height="18" rx="2" className="fill-bg-primary stroke-border-hover" strokeWidth="1" />
          {/* Redaction bar in place of the segment name */}
          <rect x="112" y={y + 5} width={i === 1 ? 52 : 40} height="8" className="fill-text-muted opacity-40" />
          <line x1="180" y1={y + 9} x2="206" y2={y + 9} className="stroke-border-hover" strokeWidth="1" />
          <rect x="206" y={y} width="74" height="18" rx="2" className="fill-bg-primary stroke-border-subtle" strokeWidth="1" />
          <rect x="212" y={y + 5} width={i === 0 ? 46 : 34} height="8" className="fill-text-muted opacity-40" />
        </g>
      ))}

      {/* Pivot path */}
      <path d="M106 87 V55 M106 87 V119" fill="none" className="stroke-border-hover" strokeWidth="1" />

      <text x="304" y="168" textAnchor="end" style={label} className="fill-text-muted">
        3 FINDINGS · REDACTED
      </text>
    </Figure>
  );
}

/* --------------------------------------------------------------------------
   Vulnerability Scanner — a scan readout, the artefact the tool produces
   -------------------------------------------------------------------------- */
export function ScanReadoutFigure({ className }: FigureProps) {
  const rows = [
    { port: "22/tcp", state: "open", service: "ssh", flag: true },
    { port: "80/tcp", state: "open", service: "http", flag: false },
    { port: "443/tcp", state: "open", service: "https", flag: false },
    { port: "3306/tcp", state: "filtered", service: "mysql", flag: false },
    { port: "8080/tcp", state: "open", service: "http-proxy", flag: true },
  ];

  return (
    <Figure className={className}>
      {/* Column headers */}
      <text x="30" y="36" style={label} className="fill-text-muted">PORT</text>
      <text x="130" y="36" style={label} className="fill-text-muted">STATE</text>
      <text x="216" y="36" style={label} className="fill-text-muted">SERVICE</text>
      <line x1="24" y1="42" x2="296" y2="42" className="stroke-border-hover" strokeWidth="1" />

      {rows.map((row, i) => {
        const y = 60 + i * 21;
        return (
          <g key={row.port}>
            {/* Status square */}
            <rect
              x="24"
              y={y - 7}
              width="4"
              height="8"
              className={row.flag ? "fill-accent" : "fill-text-muted opacity-50"}
            />
            <text x="34" y={y} style={label} className="fill-text-secondary">{row.port}</text>
            <text x="130" y={y} style={label} className={row.state === "open" ? "fill-accent" : "fill-text-muted"}>
              {row.state}
            </text>
            <text x="216" y={y} style={label} className="fill-text-muted">{row.service}</text>
            <line x1="24" y1={y + 7} x2="296" y2={y + 7} className="stroke-border-subtle" strokeWidth="1" />
          </g>
        );
      })}

      <text x="24" y="172" style={label} className="fill-text-muted">
        5 PORTS · 2 FLAGGED
      </text>
    </Figure>
  );
}

/** slug → figure. A project without a figure falls back to a neutral plate. */
export const PROJECT_FIGURES: Record<string, (props: FigureProps) => React.ReactElement> = {
  "ai-video-editor": VideoTracksFigure,
  "agent-orchestrator": DispatchFanFigure,
  "obsidian-system": PipelineFigure,
  "enterprise-security-audit": RedactedMapFigure,
  "cyber-tool": ScanReadoutFigure,
};

export function ProjectFigure({ slug, className }: { slug: string; className?: string }) {
  const Component = PROJECT_FIGURES[slug];
  if (!Component) return null;
  return <Component className={className} />;
}
