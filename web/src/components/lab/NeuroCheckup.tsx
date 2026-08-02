"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LAB_CHECKUP, scoreToResult } from "@/data/lab";
import { cn } from "@/lib/cn";

export function NeuroCheckup() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers]
  );
  const complete = Object.keys(answers).length === LAB_CHECKUP.length;
  const result = done && complete ? scoreToResult(total) : null;

  return (
    <section
      id="checkup"
      className="scroll-mt-20 rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-bio uppercase">
            🧬 Нейро-чек-ап
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
            Насколько мозг забит шумом прямо сейчас?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-fg-muted">
            4 вопроса. Не диагноз и не «вердикт». На выходе — один протокол и глава, если нужно
            глубже. Тон: механика, не стыд.
          </p>
        </div>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted">
          {Object.keys(answers).length}/{LAB_CHECKUP.length}
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {LAB_CHECKUP.map((q, qi) => (
          <fieldset key={q.id} className="border-0 p-0">
            <legend className="text-sm font-semibold text-fg">
              <span className="text-fg-muted">{qi + 1}.</span> {q.q}
            </legend>
            <div className="mt-2.5 flex flex-col gap-2">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.score;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [q.id]: opt.score }));
                      setDone(false);
                    }}
                    className={cn(
                      "min-h-12 rounded-xl border px-3 py-2.5 text-left text-sm transition",
                      selected
                        ? "border-accent/50 bg-accent-soft font-medium text-fg"
                        : "border-border bg-bg text-fg-muted hover:border-border-strong hover:text-fg"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={!complete}
          onClick={() => setDone(true)}
          className={cn(
            "inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition",
            complete ? "bg-accent hover:brightness-110" : "cursor-not-allowed bg-fg-muted/40"
          )}
        >
          Показать разбор
        </button>
        {complete && (
          <p className="text-xs text-fg-muted">
            Сумма сигналов: <strong className="text-fg">{total}</strong> (чем выше — тем больше шума
            / пустого бака)
          </p>
        )}
      </div>

      {result && (
        <div className="mt-6 rounded-xl border border-bio/30 bg-bio-soft/40 p-5">
          <p className="text-xs font-semibold tracking-wide text-bio uppercase">Результат · не ярлык</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-fg">{result.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{result.body}</p>
          <div className="mt-4 rounded-lg border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent uppercase">Протокол сегодня</p>
            <p className="mt-1 text-sm text-fg">{result.protocol}</p>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href={result.readHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white"
            >
              Глава: {result.bookLabel} →
            </Link>
            <Link
              href={`/books/${result.bookSlug}/`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold"
            >
              О книге
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
