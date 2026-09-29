"use client";

import { useState } from "react";
import { useInView } from "./useInView";

type Props = {
  flow: string[];
  annotations?: string[];
  /** show an animated data-flow dot travelling the path */
  animateFlow?: boolean;
};

/**
 * Vertical system-architecture diagram. Draws itself in when scrolled into view,
 * lets you hover nodes to highlight them, and (optionally) sends a data-flow dot
 * down the path. Blueprint styling — thin lines, mono labels.
 */
export default function ArchDiagram({
  flow,
  annotations = [],
  animateFlow = false,
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState<number | null>(null);

  const boxW = 210;
  const boxH = 40;
  const gap = 34;
  const padX = 20;
  const padY = 16;
  const centerX = padX + boxW / 2;
  const width = boxW + padX * 2 + 130; // room for annotations on the right
  const height = padY * 2 + flow.length * boxH + (flow.length - 1) * gap;

  const pathD = `M${centerX} ${padY} L${centerX} ${height - padY}`;

  return (
    <div ref={ref} className={inView ? "diagram-visible" : ""}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="arch-svg h-auto w-full"
        data-dim={active !== null}
        role="img"
        aria-label={`Architecture: ${flow.join(" to ")}`}
        fill="none"
      >
        <defs>
          <marker
            id={`arr-${flow[0]}`}
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

        {/* connectors first (behind) */}
        {flow.map((_, i) => {
          if (i === flow.length - 1) return null;
          const y1 = padY + i * (boxH + gap) + boxH;
          const y2 = y1 + gap;
          const near = active === i || active === i + 1;
          return (
            <path
              key={`c-${i}`}
              className="draw-path"
              style={{ ["--len" as string]: "60", transitionDelay: `${i * 120 + 150}ms` }}
              d={`M${centerX} ${y1} L${centerX} ${y2}`}
              stroke={near ? "#26428b" : "#626262"}
              strokeWidth={near ? 1.4 : 1}
              markerEnd={`url(#arr-${flow[0]})`}
            />
          );
        })}

        {/* animated data-flow dot */}
        {animateFlow && inView && (
          <circle r="3.5" fill="#26428b" className="flow-dot">
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              path={pathD}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        )}

        {/* nodes */}
        {flow.map((label, i) => {
          const y = padY + i * (boxH + gap);
          const isActive = active === i;
          return (
            <g
              key={label}
              className="arch-node node-fade"
              data-active={isActive}
              style={{ transitionDelay: `${i * 120}ms` }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={label}
            >
              <rect
                x={padX}
                y={y}
                width={boxW}
                height={boxH}
                rx="2"
                fill={isActive ? "#26428b" : "#f5f3ee"}
                stroke={isActive ? "#26428b" : "#111111"}
                strokeWidth="1"
              />
              <text
                x={centerX}
                y={y + boxH / 2 + 3.5}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono)"
                fontSize="11"
                letterSpacing="1.5"
                fill={isActive ? "#f5f3ee" : "#111111"}
              >
                {label}
              </text>

              {/* annotation on the corresponding node index */}
              {annotations[i] && (
                <g>
                  <path
                    d={`M${padX + boxW} ${y + boxH / 2} h 14`}
                    stroke="#26428b"
                    strokeWidth="0.8"
                  />
                  <text
                    x={padX + boxW + 20}
                    y={y + boxH / 2 + 3.5}
                    fontFamily="var(--font-space-grotesk)"
                    fontStyle="italic"
                    fontSize="11"
                    fill="#26428b"
                  >
                    {annotations[i]}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
