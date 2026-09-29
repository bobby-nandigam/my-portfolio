import { PROFILE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <span className="label text-accent">08 — CONTACT</span>
          <h2 className="display-hero mt-8 max-w-4xl text-4xl text-ink sm:text-6xl md:text-7xl">
            Let&apos;s build something useful.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-lg font-display text-xl leading-tight text-graphite md:text-2xl">
            For backend systems, ML infrastructure, or engineering problems
            worth solving.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={`mailto:${PROFILE.email}`}
            data-cursor="START A CONVERSATION"
            className="link-underline mt-12 inline-block font-display text-2xl font-medium tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl md:text-4xl"
          >
            {PROFILE.email}
          </a>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="VIEW CODE"
              className="link-underline meta text-ink hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline meta text-ink hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.leetcode}
              target="_blank"
              rel="noreferrer"
              className="link-underline meta text-ink hover:text-accent"
            >
              LeetCode ↗
            </a>
            <a
              href={PROFILE.resume}
              className="link-underline meta ml-auto text-accent"
            >
              Download Resume ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
