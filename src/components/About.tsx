import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="07" title="Beyond the Code" kicker="ABOUT" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
              <p>
                Most of my time goes into understanding how systems actually
                behave — where latency comes from, where a queue quietly becomes
                a failure boundary, and why a system that works in a demo falls
                over under real load.
              </p>
              <p>
                I like problems that don&apos;t have a clean answer yet:
                retrieval that needs relationships and not just similarity,
                ingestion that has to stay fast under concurrency, models that
                have to survive contact with production. I learn by building the
                thing, measuring it, and improving what the numbers point at.
              </p>
              <p>
                Across backend, ML, and infrastructure, the through-line is the
                same — build systems that are reliable, honest about their
                trade-offs, and useful to the people who depend on them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="corner-marks relative p-6 md:p-7">
              <span className="label absolute -top-3 left-6 bg-paper px-2">
                NOTES
              </span>
              <ul className="space-y-5">
                {[
                  "understanding systems end-to-end",
                  "hard engineering problems",
                  "performance optimization",
                  "ML infrastructure",
                  "building useful products",
                  "learning through implementation",
                ].map((n, i) => (
                  <li key={n} className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.7rem] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
