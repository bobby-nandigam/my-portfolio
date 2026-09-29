"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

const QUESTION =
  "Show me customers who purchased more than ₹50,000 this quarter.";

const SQL_LINES = [
  "SELECT c.name, SUM(o.amount) AS total",
  "FROM customers c",
  "JOIN orders o ON o.customer_id = c.id",
  "WHERE o.created_at >= date_trunc('quarter', now())",
  "GROUP BY c.name",
  "HAVING SUM(o.amount) > 50000",
  "ORDER BY total DESC;",
];

/** Natural language → validated SQL, revealed line-by-line when scrolled into view. */
export default function NlSqlDemo() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setShown(SQL_LINES.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= SQL_LINES.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="mt-6 border-t border-line pt-6">
      <span className="label">NATURAL LANGUAGE</span>
      <p className="mt-2 font-display text-base italic leading-snug text-ink">
        “{QUESTION}”
      </p>

      <div className="my-4 flex items-center gap-3">
        <span className="meta text-accent">↓ generated · validated</span>
        <span className="hairline flex-1" aria-hidden />
      </div>

      <span className="label">SQL</span>
      <pre className="mt-2 overflow-x-auto rounded-sm bg-ink/[0.03] p-4 font-mono text-[0.72rem] leading-relaxed text-ink-soft">
        <code>
          {SQL_LINES.slice(0, shown).map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          {shown < SQL_LINES.length && (
            <span className="inline-block h-3 w-1.5 animate-pulse bg-accent align-middle" />
          )}
        </code>
      </pre>
    </div>
  );
}
