import { HERO_META } from "@/lib/content";
import HeroSketch from "./HeroSketch";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative z-10 pt-32 md:pt-40">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          {/* left — editorial intro */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="label text-accent">01</span>
                <span className="hairline max-w-[52px]" aria-hidden />
                <span className="label">Software Engineer</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display-hero mt-6 text-5xl text-ink sm:text-6xl md:text-7xl">
                Bobby
                <br />
                Nandigam
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="font-display mt-8 max-w-xl text-2xl font-normal leading-tight tracking-tight text-ink-soft md:text-3xl">
                I build backend systems, ML-powered services, and cloud
                infrastructure that operate in the real world.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite">
                Software Engineer with 2+ years of industry experience building
                scalable backend APIs, ML-integrated services, and cloud-native
                systems — where latency, reliability, and failure boundaries
                matter.
              </p>
            </Reveal>

            {/* metadata grid */}
            <Reveal delay={300}>
              <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
                {HERO_META.map((m) => (
                  <div key={m.label}>
                    <dt className="label">{m.label}</dt>
                    <dd className="mt-2 font-display text-sm font-medium text-ink">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* start here annotation */}
            <Reveal delay={380}>
              <a
                href="#work"
                className="group mt-12 inline-flex items-center gap-3"
              >
                <span className="annotation text-lg">start here</span>
                <svg
                  width="54"
                  height="24"
                  viewBox="0 0 54 24"
                  fill="none"
                  aria-hidden
                  className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 12 C 18 12, 30 6, 44 12"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M38 7 L45 12 L38 17"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* right — engineering sketch */}
          <div className="relative hidden lg:block">
            <Reveal delay={200} className="corner-marks sticky top-32 p-6">
              <span className="label absolute -top-3 left-6 bg-paper px-2">
                SYSTEM / 001
              </span>
              <HeroSketch />
            </Reveal>
          </div>
        </div>
      </div>

      {/* mobile sketch */}
      <div className="shell mt-14 lg:hidden">
        <div className="corner-marks relative mx-auto max-w-xs p-4">
          <span className="label absolute -top-3 left-4 bg-paper px-2">
            SYSTEM / 001
          </span>
          <HeroSketch />
        </div>
      </div>

      <div className="shell mt-20 md:mt-28">
        <div className="hairline" />
      </div>
    </section>
  );
}
