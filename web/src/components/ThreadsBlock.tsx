import { siteData } from "@/lib/books";
import { ExternalLink, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/types";
import { home } from "@/data/home";

export function ThreadsBlock({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).social;

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
            {t.lead}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={siteData.links.threads}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
          >
            <h3 className="font-display text-lg font-semibold text-fg">{t.threadsTitle}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
              {t.threadsBody}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              {t.threadsCta}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>
          <a
            href={siteData.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
          >
            <h3 className="font-display text-lg font-semibold text-fg">{t.telegramTitle}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
              {t.telegramBody}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t.telegramCta}
            </span>
          </a>
        </div>

        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-fg">{t.close}</p>
      </div>
    </section>
  );
}
