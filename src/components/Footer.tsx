import { PROFILE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-12">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-lg font-medium text-ink">
              {PROFILE.name}
            </p>
            <p className="meta mt-1">Software Engineer</p>
            <p className="meta">Backend · ML · Infrastructure</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="meta text-ink transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <span className="meta text-line-strong">·</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="meta text-ink transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <span className="meta text-line-strong">·</span>
            <a
              href={PROFILE.leetcode}
              target="_blank"
              rel="noreferrer"
              className="meta text-ink transition-colors hover:text-accent"
            >
              LeetCode
            </a>
            <span className="meta text-line-strong">·</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="meta text-ink transition-colors hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between border-t border-line pt-6">
          <div className="meta">
            © 2026 · {PROFILE.location}
          </div>
          <span className="annotation text-sm">built with intent.</span>
        </div>
      </div>
    </footer>
  );
}
