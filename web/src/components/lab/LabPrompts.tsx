"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { LAB_PROMPTS } from "@/data/lab";
import { cn } from "@/lib/cn";

export function LabPrompts() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <section id="prompts" className="scroll-mt-20">
      <div className="mb-5 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          ⚡️ AI Template
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
          ИИ-промпты & нейро-шаблоны
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Авторские инструкции для ChatGPT / Claude. Без «стань лучшей версией». Вставьте поток —
          получите структуру. Делитесь, если зайдёт.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {LAB_PROMPTS.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm"
          >
            <span className="w-fit rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              AI Template
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-fg">{p.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-fg-muted">{p.body}</p>
            <pre className="mt-4 max-h-36 overflow-auto rounded-xl border border-border bg-bg p-3 text-[11px] leading-relaxed whitespace-pre-wrap text-fg-muted">
              {p.prompt}
            </pre>
            <button
              type="button"
              onClick={() => copy(p.id, p.prompt)}
              className={cn(
                "mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition",
                copied === p.id
                  ? "border-bio/40 bg-bio-soft text-fg"
                  : "border-border-strong bg-bg text-fg hover:border-accent/40"
              )}
            >
              {copied === p.id ? (
                <>
                  <Check className="h-4 w-4 text-bio" aria-hidden />
                  Скопировано
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden />
                  Скопировать промпт
                </>
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
