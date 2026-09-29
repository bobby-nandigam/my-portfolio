import { EDUCATION, CERTIFICATIONS } from "@/lib/content";
import Reveal from "./Reveal";

export default function EducationCerts() {
  return (
    <section className="relative z-10 py-16 md:py-20">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 border-t border-line pt-16 md:grid-cols-2 md:gap-16">
          {/* education */}
          <Reveal>
            <span className="label">EDUCATION</span>
            <div className="mt-6">
              <h3 className="font-display text-xl font-medium leading-snug text-ink">
                {EDUCATION.degree}
              </h3>
              <p className="mt-2 text-graphite">{EDUCATION.school}</p>
              <div className="mt-4 flex items-center gap-8">
                <div>
                  <span className="meta">Years</span>
                  <p className="mt-1 font-mono text-sm text-ink">
                    {EDUCATION.years}
                  </p>
                </div>
                <div>
                  <span className="meta">CGPA</span>
                  <p className="mt-1 font-mono text-sm text-ink">
                    {EDUCATION.cgpa}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* certifications */}
          <Reveal delay={100}>
            <span className="label">CERTIFICATIONS</span>
            <ul className="mt-6 space-y-4">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c.title}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-4"
                >
                  <span className="font-display text-base font-medium text-ink">
                    {c.title}
                  </span>
                  <span className="meta shrink-0">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
