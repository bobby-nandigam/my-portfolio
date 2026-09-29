"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/content";
import ArchDiagram from "./ArchDiagram";
import CaseStudyPanel from "./CaseStudyPanel";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import NlSqlDemo from "./NlSqlDemo";

function ProjectBlock({
  project,
  reversed,
  onOpen,
}: {
  project: Project;
  reversed: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <article className="border-t border-line py-14 md:py-20">
      <div
        className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* text column */}
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl font-medium text-line-strong md:text-5xl">
              {project.index}
            </span>
            <span className="label">SELECTED SYSTEM</span>
          </div>

          <h3 className="font-display mt-5 text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
            {project.title}
          </h3>
          <p className="annotation mt-3 text-lg">{project.subtitle}</p>

          <p className="mt-5 max-w-prose text-[0.98rem] leading-relaxed text-graphite">
            {project.summary}
          </p>

          {/* engineering detail list */}
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {project.details.map((d) => (
              <li
                key={d}
                className="meta flex items-start gap-2 text-ink-soft"
              >
                <span className="text-accent">—</span> {d}
              </li>
            ))}
          </ul>

          {/* stats */}
          {project.stats && (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-medium text-ink">
                    {s.value}
                  </div>
                  <div className="meta mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* stack */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-graphite"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpen(project)}
            data-cursor="OPEN SYSTEM"
            className="link-underline mt-9 inline-flex items-center gap-2 font-display text-base font-medium text-ink transition-colors hover:text-accent"
          >
            View system ↗
          </button>
        </Reveal>

        {/* diagram column */}
        <Reveal delay={120}>
          <div className="corner-marks relative bg-paper/40 p-5 md:p-7">
            <span className="label absolute -top-3 left-5 bg-paper px-2">
              ARCHITECTURE
            </span>
            <ArchDiagram
              flow={project.flow}
              annotations={project.annotations}
              animateFlow={project.id === "document-storage"}
            />
            {project.id === "nlp-sql" && <NlSqlDemo />}
            {project.disclaimer && (
              <p className="meta mt-5 border-t border-line pt-4 leading-relaxed">
                {project.disclaimer}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="02" title="Selected Systems" kicker="SELECTED WORK" />

        {PROJECTS.map((p, i) => (
          <ProjectBlock
            key={p.id}
            project={p}
            reversed={i % 2 === 1}
            onOpen={setOpenProject}
          />
        ))}
      </div>

      {openProject && (
        <CaseStudyPanel
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}
