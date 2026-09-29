import { PRINCIPLES } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Principles() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="04" title="How I Build" kicker="PHILOSOPHY" />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 70}
              className="group flex flex-col justify-between bg-paper p-6 md:p-7"
            >
              <div>
                <span className="font-display text-3xl font-medium text-line-strong transition-colors group-hover:text-accent">
                  {p.n}
                </span>
                <h3 className="font-display mt-4 text-lg font-medium leading-snug text-ink">
                  {p.title}
                </h3>
              </div>

              {/* handwritten annotation with a small leader */}
              <div className="mt-8 flex items-start gap-2">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  aria-hidden
                  className="mt-1 shrink-0 text-accent"
                >
                  <path
                    d="M1 1 C 6 1, 4 10, 16 11"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M12 8 L17 11 L12 13"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <p className="annotation text-sm leading-snug">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
