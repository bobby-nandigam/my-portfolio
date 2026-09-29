import { OPEN_SOURCE } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

/**
 * Deterministic activity grid (no randomness → no hydration mismatch),
 * redesigned in the site's blueprint language rather than the usual green grid.
 */
const WEEKS = 30;
const DAYS = 7;

function intensity(week: number, day: number) {
  // deterministic pseudo-pattern that reads like real activity
  const v = (Math.sin(week * 1.3 + day * 0.7) + Math.cos(week * 0.5 - day)) ;
  const n = (v + 2) / 4; // 0..1
  if (n < 0.32) return 0;
  if (n < 0.55) return 1;
  if (n < 0.78) return 2;
  return 3;
}

const LEVELS = [
  "bg-line",
  "bg-accent/25",
  "bg-accent/55",
  "bg-accent/90",
];

export default function OpenSource() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index="06"
          title="Open Source & Building"
          kicker="BEYOND WORK"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
          {/* editorial stats */}
          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              {OPEN_SOURCE.map((o) => (
                <li
                  key={o.label}
                  className="flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                    {o.value}
                  </span>
                  <span className="meta max-w-[180px] text-right leading-snug">
                    {o.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* activity map */}
          <Reveal delay={120}>
            <div className="corner-marks relative p-6 md:p-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="label">ACTIVITY MAP</span>
                <span className="meta">contribution cadence</span>
              </div>

              <div
                className="flex gap-[3px] overflow-hidden"
                role="img"
                aria-label="Contribution activity map"
              >
                {Array.from({ length: WEEKS }).map((_, w) => (
                  <div key={w} className="flex flex-1 flex-col gap-[3px]">
                    {Array.from({ length: DAYS }).map((_, d) => (
                      <div
                        key={d}
                        className={`aspect-square w-full rounded-[1px] ${
                          LEVELS[intensity(w, d)]
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="meta">less</span>
                  {LEVELS.map((l, i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-[1px] ${l}`}
                    />
                  ))}
                  <span className="meta">more</span>
                </div>
                <span className="annotation text-sm">ship, observe, improve</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
