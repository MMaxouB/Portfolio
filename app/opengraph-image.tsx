import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time. Uses the site's own palette so a shared link looks
 * like the site rather than a generic card.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090B",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(120,213,227,0.16) 0%, transparent 55%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#78d5e3",
            }}
          />
          <div
            style={{
              color: "#6F7681",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Satori needs one text node per element, hence the split lines. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#F5F7FA",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            <div style={{ display: "flex" }}>Building software</div>
            <div style={{ display: "flex" }}>that matters.</div>
          </div>
          <div style={{ display: "flex", color: "#A1A7B0", fontSize: 30 }}>
            {`${SITE.name} — ${SITE.role}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#6F7681",
            fontSize: 24,
          }}
        >
          <span style={{ color: "#78d5e3" }}>$</span>
          <span>type &quot;help&quot; to explore</span>
        </div>
      </div>
    ),
    size
  );
}
