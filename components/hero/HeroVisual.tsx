"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero visual (PORTFOLIO_SPEC §4.3 / §16.3).
 *
 * The brief allows an abstract object, a node system or a gradient. Blurred
 * radial blobs and glowing particle constellations are what everyone reaches
 * for, so this goes the other way: an orthographic exploded view of a stack —
 * the drawing an engineer makes of a system before building it. Four planes,
 * hairline strokes, mono callouts, and a single signal descending through the
 * connectors. Plain SVG, no WebGL, no dependency.
 */

const PLANES = [
  { y: 58, label: "INTERFACE" },
  { y: 132, label: "API" },
  { y: 206, label: "QUEUE" },
  { y: 280, label: "DATA" },
];

const HALF_W = 148;
const HALF_D = 50;
const CX = 176;

/** Isometric plane as a rhombus. */
function planePoints(y: number) {
  return `${CX},${y - HALF_D} ${CX + HALF_W},${y} ${CX},${y + HALF_D} ${CX - HALF_W},${y}`;
}

const CONNECTOR_X = [CX - 78, CX, CX + 78];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] select-none items-center justify-center lg:flex"
    >
      <svg
        viewBox="0 0 352 360"
        className="h-[86%] w-full max-w-[560px] [mask-image:radial-gradient(ellipse_78%_82%_at_52%_50%,#000_35%,transparent_100%)]"
        role="presentation"
      >
        {/* Connectors sit behind the planes */}
        {CONNECTOR_X.map((x) => (
          <line
            key={x}
            x1={x}
            y1="58"
            x2={x}
            y2="280"
            className="stroke-border-subtle"
            strokeWidth="1"
          />
        ))}

        {PLANES.map((plane, i) => (
          <motion.g
            key={plane.label}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Plane */}
            <polygon
              points={planePoints(plane.y)}
              className={i === 1 ? "fill-accent-wash stroke-accent-dim" : "fill-bg-secondary/40 stroke-border-hover"}
              strokeWidth="1"
            />

            {/* Nodes where connectors meet the plane */}
            {CONNECTOR_X.map((x) => (
              <rect
                key={x}
                x={x - 2}
                y={plane.y - 2}
                width="4"
                height="4"
                className={i === 1 ? "fill-accent" : "fill-text-muted"}
              />
            ))}

            {/* Callout */}
            <line
              x1={CX + HALF_W}
              y1={plane.y}
              x2={CX + HALF_W + 22}
              y2={plane.y}
              className="stroke-border-hover"
              strokeWidth="1"
            />
            <text
              x={CX + HALF_W + 28}
              y={plane.y + 3}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 8,
                letterSpacing: "0.16em",
              }}
              className={i === 1 ? "fill-accent" : "fill-text-muted"}
            >
              {plane.label}
            </text>
          </motion.g>
        ))}

        {/* One signal descending the centre connector */}
        {!shouldReduceMotion && (
          <motion.rect
            x={CX - 2.5}
            width="5"
            height="5"
            className="fill-accent"
            initial={{ y: 58 }}
            animate={{ y: [58, 280, 280] }}
            transition={{
              duration: 5.2,
              times: [0, 0.72, 1],
              repeat: Infinity,
              ease: [0.5, 0, 0.5, 1],
            }}
          />
        )}
      </svg>
    </div>
  );
}
