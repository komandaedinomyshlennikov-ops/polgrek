"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function LabProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="read-progress" aria-hidden>
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

export function LabToc({
  headings,
}: {
  headings: Array<{ id: string; text: string }>;
}) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Содержание статьи" className="max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1">
      <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">
        Содержание
      </p>
      <ol className="space-y-1.5">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block rounded-lg px-2 py-1.5 text-[13px] leading-snug transition",
                active === h.id
                  ? "bg-accent-soft font-medium text-fg"
                  : "text-fg-muted hover:bg-surface hover:text-fg"
              )}
            >
              <span className="mr-1.5 tabular-nums text-fg-muted">{i + 1}.</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
