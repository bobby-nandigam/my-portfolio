"use client";

import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className={`shell flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-ink"
          aria-label={`${PROFILE.name} — home`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center border border-line-strong text-[0.6rem] font-mono">
              BN
            </span>
            <span className="hidden sm:inline">{PROFILE.name}</span>
          </span>
        </a>

        {/* desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline meta text-ink transition-colors hover:text-accent"
              >
                <span className="text-accent">{item.n}</span> {item.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-4">
            <a
              href={PROFILE.resume}
              className="link-underline meta text-ink hover:text-accent"
            >
              Resume ↗
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="VIEW CODE"
              className="link-underline meta text-ink hover:text-accent"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-5 bg-ink transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="shell flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-2 text-lg font-display text-ink"
              >
                <span className="label text-accent">{item.n}</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex gap-5 border-t border-line pt-4">
            <a href={PROFILE.resume} className="meta text-ink">
              Resume ↗
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="meta text-ink"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
