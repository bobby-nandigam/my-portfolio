import { EXPERIENCE } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Experience() {
  const e = EXPERIENCE;
  return (
    <section id="experience" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="03" title="Experience" kicker="TIMELINE" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* elevation rail */}
          <Reveal className="relative hidden pl-6 lg:block">
            <div className="absolute left-0 top-1 font-mono text-xs text-graphite">
              {e.endYear}
            </div>
            <div className="ml-[6px] h-full min-h-[280px] w-px bg-line-strong" />
            <div className="absolute bottom-0 left-0 font-mono text-xs text-graphite">
              {e.startYear}
            </div>
            {/* nodes */}
            <span className="absolute left-1 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-paper" />
            <span className="absolute bottom-1 left-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-accent" />
          </Reveal>

          <Reveal delay={100}>
            <div className="corner-marks relative p-6 md:p-8">
              <span className="label absolute -top-3 left-6 bg-paper px-2">
                ROLE / 001
              </span>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
                  {e.role}
                </h3>
                <span className="meta">
                  {e.start} — {e.end}
                </span>
              </div>
              <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="annotation text-lg">{e.company}</p>
                <span className="meta">{e.location}</span>
              </div>

              {/* focus tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {e.focus.map((f) => (
                  <span
                    key={f}
                    className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-graphite"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* measurable outcomes — prominent */}
              <div className="mt-8 border-t border-line pt-8">
                <span className="label">KEY MEASURABLE OUTCOMES</span>
                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
                  {e.outcomes.map((o) => (
                    <div key={o.label}>
                      <div className="font-display text-xl font-medium leading-none tracking-tight text-ink md:text-2xl">
                        {o.value}
                      </div>
                      <div className="meta mt-2 leading-snug">{o.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
