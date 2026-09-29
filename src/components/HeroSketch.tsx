"use client";

import { useInView } from "./useInView";

/**
 * Hand-drawn-style system architecture that constructs itself when in view:
 * CLIENT → API → QUEUE → WORKERS → DATABASE → ML SERVICE, with annotations.
 * Thin graphite lines, no fill flourish — an engineering drawing.
 */
export default function HeroSketch() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  const nodes = [
    { label: "CLIENT", note: "" },
    { label: "API", note: "async" },
    { label: "QUEUE", note: "failure boundary" },
    { label: "WORKERS", note: "" },
    { label: "DATABASE", note: "tenant isolation" },
    { label: "ML SERVICE", note: "latency ↓" },
  ];

  const boxW = 132;
  const boxH = 34;
  const gap = 30;
  const startX = 44;
  const centerX = startX + boxW / 2;
  const topY = 18;

  return (
    <div ref={ref} className={inView ? "diagram-visible" : ""}>
      <svg
        viewBox="0 0 300 400"
        className="h-auto w-full"
        role="img"
        aria-label="System architecture sketch: client to API to queue to workers to database and ML service"
        fill="none"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 5 L0 10" stroke="#626262" strokeWidth="1" fill="none" />
          </marker>
        </defs>

        {nodes.map((n, i) => {
          const y = topY + i * (boxH + gap);
          const lineY1 = y + boxH;
          const lineY2 = y + boxH + gap;
          return (
            <g key={n.label}>
              {/* connector */}
              {i < nodes.length - 1 && (
                <path
                  className="draw-path"
                  style={{ ["--len" as string]: "60", transitionDelay: `${i * 140 + 200}ms` }}
                  d={`M${centerX} ${lineY1} L${centerX} ${lineY2}`}
                  stroke="#626262"
                  strokeWidth="1"
                  markerEnd="url(#arrow)"
                />
              )}
              {/* box */}
              <rect
                className="node-fade"
                style={{ transitionDelay: `${i * 140}ms` }}
                x={startX}
                y={y}
                width={boxW}
                height={boxH}
                rx="2"
                stroke="#111111"
                strokeWidth="1"
                fill="#f5f3ee"
              />
              <text
                className="node-fade"
                style={{ transitionDelay: `${i * 140}ms` }}
                x={centerX}
                y={y + boxH / 2 + 3.5}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono)"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#111111"
              >
                {n.label}
              </text>

              {/* annotation with a little leader line */}
              {n.note && (
                <g
                  className="node-fade"
                  style={{ transitionDelay: `${i * 140 + 300}ms` }}
                >
                  <path
                    d={`M${startX + boxW} ${y + boxH / 2} q 16 0 22 -6`}
                    stroke="#26428b"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <text
                    x={startX + boxW + 26}
                    y={y + boxH / 2 - 6}
                    fontFamily="var(--font-space-grotesk)"
                    fontStyle="italic"
                    fontSize="10"
                    fill="#26428b"
                  >
                    {n.note}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* coordinate annotation, bottom-left */}
        <text
          x={startX - 8}
          y={396}
          fontFamily="var(--font-plex-mono)"
          fontSize="7.5"
          fill="#626262"
          className="node-fade"
          style={{ transitionDelay: "900ms" }}
        >
          FIG. 001 — DATA PATH
        </text>
      </svg>
    </div>
  );
}
