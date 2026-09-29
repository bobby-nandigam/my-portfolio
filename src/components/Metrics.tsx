"use client";

import { useEffect, useRef, useState } from "react";
import { METRICS } from "@/lib/content";
import { useInView } from "./useInView";

function formatValue(v: number) {
  if (Number.isInteger(v)) return v.toLocaleString("en-US");
  return v.toFixed(1);
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="metric-value tabular-nums">
      {formatValue(display)}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="relative z-10 py-20 md:py-28" aria-label="Engineering metrics">
      <div className="shell">
        <div className="mb-10 flex items-center justify-between">
          <span className="label">PERFORMANCE SHEET / 002</span>
          <span className="meta hidden sm:block">
            measured in production
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-7">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`relative ${
                i !== 0 ? "md:border-l md:border-line md:pl-6" : ""
              }`}
            >
              <span className="annotation absolute -top-5 right-0 text-[0.7rem] md:right-2">
                {m.note}
              </span>
              <div className="text-4xl text-ink md:text-[2.9rem]">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <p className="meta mt-3 leading-snug text-ink-soft">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
