"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { NAVIGATOR } from "@/lib/navigator";
import { affiliateUrl, amazonUrl, getLocalizedBook } from "@/lib/books";
import { cn } from "@/lib/cn";
import { CoverImage } from "@/components/CoverImage";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";

export function NeuroNavigator({ locale = "ru" }: { locale?: Locale }) {
  const t = ui(locale).navigator;
  const [activeId, setActiveId] = useState(NAVIGATOR[0].id);
  const cat = useMemo(
    () => NAVIGATOR.find((c) => c.id === activeId) || NAVIGATOR[0],
    [activeId]
  );
  const book = getLocalizedBook(cat.bookSlug, locale);
  const fact = locale === "en" ? cat.factEn : cat.fact;
  const protocol = locale === "en" ? cat.protocolEn : cat.protocol;
  const primaryBuy = book?.amazon ? amazonUrl(book) : book ? affiliateUrl(book) : "#";
  const buyIsAmazon = Boolean(book?.amazon);

  return (
    <section id="navigator" className="scroll-mt-20 border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-fg-muted">{t.lead}</p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={locale === "en" ? "States" : "Состояния"}
        >
          {NAVIGATOR.map((c) => {
            const selected = c.id === activeId;
            const tabLabel = locale === "en" ? c.labelEn : c.label;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                  selected
                    ? "border-accent/40 bg-accent-soft text-fg shadow-sm"
                    : "border-border bg-bg-elevated text-fg-muted hover:border-border-strong hover:text-fg"
                )}
              >
                <span aria-hidden>{c.emoji}</span>
                {tabLabel}
              </button>
            );
          })}
        </div>

        <div
          className="mt-6 grid gap-5 rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-7 lg:grid-cols-12"
          role="tabpanel"
        >
          <div className="space-y-5 lg:col-span-7">
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-bio uppercase">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {t.factLabel}
              </p>
              <p className="text-[15px] leading-relaxed text-fg sm:text-base">{fact}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="mb-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
                {t.protocolLabel}
              </p>
              <p className="text-[15px] leading-relaxed text-fg">{protocol}</p>
            </div>
          </div>

          {book && (
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg p-4 lg:col-span-5">
              <div className="flex gap-4">
                <CoverImage
                  book={book}
                  variant="card"
                  sizes="88px"
                  className="h-[132px] w-[88px] shrink-0 rounded-lg shadow-md"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-fg-muted">{t.bookLabel}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-fg">{book.title}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-fg-muted">
                    {book.subtitle || book.promise}
                  </p>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                <Link
                  href={lp(locale, `/read/${book.slug}/`)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <BookOpen className="h-4 w-4" aria-hidden />
                  {t.readCta}
                </Link>
                <a
                  href={primaryBuy}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border-strong px-4 text-sm font-semibold text-fg transition hover:border-accent/40"
                >
                  {buyIsAmazon && locale === "en"
                    ? ui(locale).buy.amazon
                    : locale === "en"
                      ? t.buyCta
                      : t.buyCta}
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </a>
              </div>
              <p className="text-[11px] text-fg-muted">{t.ad}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
