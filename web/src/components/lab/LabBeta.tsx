import Link from "next/link";
import { siteData } from "@/lib/books";
import { LAB_PROTOCOLS } from "@/data/lab";
import { cn } from "@/lib/cn";

const statusClass: Record<string, string> = {
  beta: "text-amber-600 dark:text-amber-400",
  live: "text-bio",
  draft: "text-fg-muted",
};

export function LabBeta() {
  return (
    <section id="beta" className="scroll-mt-20">
      <div className="mb-5 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          🔬 Early Access
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
          Бета-тесты протоколов и фрагментов
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Полевые испытания — не «готовая истина». Забирайте, пробуйте, пишите в Threads/Telegram,
          если сломалось или зашло.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {LAB_PROTOCOLS.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm"
          >
            <p className={cn("text-xs font-semibold", statusClass[p.status])}>{p.statusLabel}</p>
            <h3 className="mt-2 font-display text-base font-semibold text-fg">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            <p className="mt-3 text-xs text-fg-muted">≈ {p.minutes} мин</p>
            <Link
              href={p.href}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-border-strong px-4 text-sm font-semibold text-fg transition hover:border-accent/40"
            >
              {p.cta}
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border-strong bg-surface/50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="font-display text-base font-semibold">Стать бета-читателем</p>
          <p className="mt-1 max-w-lg text-sm text-fg-muted">
            Черновики и протоколы раньше полки. Без спама: Threads @pol.grek и Telegram — туда же
            полевые заметки.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row">
          <a
            href={siteData.links.threads}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-fg px-4 text-sm font-semibold text-bg"
          >
            Threads
          </a>
          <a
            href={siteData.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
