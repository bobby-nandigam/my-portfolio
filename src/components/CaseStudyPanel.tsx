"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/content";

const SECTIONS: { n: string; key: keyof Project["caseStudy"]; label: string }[] =
  [
    { n: "01", key: "problem", label: "Problem" },
    { n: "02", key: "constraints", label: "Constraints" },
    { n: "03", key: "architecture", label: "Architecture" },
    { n: "04", key: "decisions", label: "Engineering Decisions" },
    { n: "05", key: "implementation", label: "Implementation" },
    { n: "06", key: "performance", label: "Performance" },
    { n: "07", key: "tradeoffs", label: "Trade-offs" },
    { n: "08", key: "result", label: "Result" },
    { n: "09", key: "improve", label: "What I Would Improve" },
  ];

export default function CaseStudyPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
    >
      <div className="panel-scrim" onClick={onClose} aria-hidden />
      <div className="panel-sheet">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-paper/95 px-7 py-5 backdrop-blur-sm md:px-10">
          <div>
            <span className="label text-accent">
              CASE STUDY / {project.index}
            </span>
            <h3 className="font-display mt-2 text-xl font-medium leading-tight text-ink md:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="px-7 py-8 md:px-10 md:py-10">
          <p className="max-w-prose text-base leading-relaxed text-ink-soft">
            {project.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-graphite"
              >
                {t}
              </span>
            ))}
          </div>

          {project.disclaimer && (
            <p className="mt-6 border-l-2 border-accent bg-paper-2 px-4 py-3 text-sm leading-relaxed text-graphite">
              {project.disclaimer}
            </p>
          )}

          <dl className="mt-10 space-y-9">
            {SECTIONS.map((s) => (
              <div key={s.key} className="grid grid-cols-[auto_1fr] gap-x-5">
                <dt className="label pt-1 text-accent">{s.n}</dt>
                <div>
                  <p className="font-display text-lg font-medium text-ink">
                    {s.label}
                  </p>
                  <dd className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink-soft">
                    {project.caseStudy[s.key]}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t border-line pt-6">
            <button
              type="button"
              onClick={onClose}
              className="meta text-ink transition-colors hover:text-accent"
            >
              ← Close and return to work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
