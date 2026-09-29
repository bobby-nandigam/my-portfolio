"use client";

import { useState } from "react";
import { STACK, PROJECTS } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function StackMap() {
  // focus can be a project id (hovering a project) or a tech name (hovering a tech)
  const [focusProject, setFocusProject] = useState<string | null>(null);
  const [focusTechProjects, setFocusTechProjects] = useState<string[] | null>(
    null
  );

  const projectActive = (id: string) =>
    focusTechProjects ? focusTechProjects.includes(id) : true;

  const techActive = (projects: string[]) =>
    focusProject ? projects.includes(focusProject) : true;

  const anyFocus = focusProject !== null || focusTechProjects !== null;

  return (
    <section id="systems" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index="05"
          title="Engineering Stack"
          kicker="STACK MAP"
        />

        <Reveal className="mb-10">
          <p className="max-w-prose text-graphite">
            Hover a technology to trace where it was used. Hover a system to see
            what it was built with. Skills mapped to real work — not a wall of
            badges.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
          {/* stack groups */}
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {STACK.map((group) => (
              <Reveal
                key={group.label}
                className="bg-paper p-6 md:p-7"
              >
                <span className="label">{group.label}</span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const active = techActive(item.projects);
                    const linked = item.projects.length > 0;
                    return (
                      <li key={item.name}>
                        <span
                          onMouseEnter={() =>
                            linked && setFocusTechProjects(item.projects)
                          }
                          onMouseLeave={() => setFocusTechProjects(null)}
                          className={`inline-block border px-2.5 py-1 font-mono text-[0.72rem] transition-all duration-200 ${
                            active
                              ? "border-line-strong text-ink"
                              : "border-line text-line-strong"
                          } ${
                            linked
                              ? "cursor-default hover:border-accent hover:text-accent"
                              : "cursor-default"
                          } ${
                            focusProject && active && linked
                              ? "border-accent text-accent"
                              : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* systems legend */}
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <span className="label">SYSTEMS</span>
              <ul className="mt-4 space-y-3">
                {PROJECTS.map((p) => {
                  const active = projectActive(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setFocusProject(p.id)}
                        onMouseLeave={() => setFocusProject(null)}
                        onFocus={() => setFocusProject(p.id)}
                        onBlur={() => setFocusProject(null)}
                        className={`flex w-full items-start gap-3 border-l-2 py-1.5 pl-3 text-left transition-all duration-200 ${
                          active
                            ? "border-accent"
                            : "border-line opacity-40"
                        }`}
                      >
                        <span className="font-mono text-[0.7rem] text-accent">
                          {p.index}
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            active ? "text-ink" : "text-graphite"
                          }`}
                        >
                          {p.title.replace(/ System$| Engine$/, "")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {anyFocus && (
                <p className="meta mt-5 text-accent">
                  {focusProject
                    ? "→ highlighting stack"
                    : "→ used in highlighted systems"}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
