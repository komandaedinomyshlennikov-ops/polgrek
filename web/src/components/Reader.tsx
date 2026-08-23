"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Minus, Plus } from "lucide-react";
import type { Book, Locale } from "@/lib/types";
import { affiliateUrl, amazonUrl } from "@/lib/books";
import { cn } from "@/lib/cn";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";
import { getBuyVoice } from "@/data/book-voice";
import { DonateLink } from "@/components/DonateLink";

type ReaderTheme = "default" | "sepia";

export function Reader({
  book,
  text,
  locale = "ru",
}: {
  book: Book;
  text: string;
  locale?: Locale;
}) {
  const t = ui(locale).reader;
  const buy = getBuyVoice(locale);
  const [fontPx, setFontPx] = useState(19);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("default");
  const [progress, setProgress] = useState(0);

  const paragraphs = useMemo(() => {
    const raw = text
      .replace(/^[\s\S]*?— (?:Отрывок|Excerpt) —\s*/i, "")
      .replace(/\n—\n[\s\S]*$/, "")
      .trim();
    const parts = raw
      .split(/\n\s*\n+/)
      .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean);
    return parts.length ? parts : [raw || t.empty];
  }, [text, t.empty]);

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

  const hasAmazon = Boolean(book.amazon);
  const primaryHref = locale === "en" && hasAmazon ? amazonUrl(book) : affiliateUrl(book);
  const primaryLabel =
    locale === "en" && hasAmazon
      ? buy.amazon
      : locale === "en"
        ? buy.litres
        : buy.litres;
  const stickyLabel =
    locale === "en"
      ? hasAmazon
        ? `${buy.amazon} →`
        : `${buy.litres} →`
      : "Забрать на Литрес →";

  return (
    <div className={cn("min-h-dvh bg-reader text-fg", readerTheme === "sepia" && "reader-sepia")}>
      <div className="read-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-reader/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link
            href={lp(locale, `/books/${book.slug}/`)}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t.back}
          </Link>
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
              aria-label={t.smaller}
              onClick={() => setFontPx((n) => Math.max(15, n - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-10 text-center text-xs text-fg-muted">{fontPx}</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
              aria-label={t.larger}
              onClick={() => setFontPx((n) => Math.min(26, n + 1))}
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={cn(
                "ml-1 rounded-lg border px-3 py-2 text-xs font-semibold",
                readerTheme === "default"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border"
              )}
              onClick={() => setReaderTheme("default")}
            >
              {locale === "en" ? "Theme" : "Тема"}
            </button>
            <button
              type="button"
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-semibold",
                readerTheme === "sepia"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border"
              )}
              onClick={() => setReaderTheme("sepia")}
            >
              {locale === "en" ? "Sepia" : "Сепия"}
            </button>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-2xl px-4 py-10 pb-36 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
          {locale === "en" ? "Free sample" : "Глава · бесплатно"}
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {book.title}
        </h1>
        <p className="mt-2 text-sm text-fg-muted">{book.authors?.join(", ")}</p>
        {locale === "en" && (
          <p className="mt-3 text-xs leading-relaxed text-fg-muted">{t.sampleNote}</p>
        )}

        <div
          className="font-reader mt-10 space-y-5 text-fg"
          style={{ fontSize: `${fontPx}px`, lineHeight: 1.75 }}
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6">
          <p className="font-display text-lg font-semibold">{buy.title}</p>
          <p className="mt-2 text-sm text-fg-muted">{buy.body}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white"
            >
              {primaryLabel}
              <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            {locale === "en" && hasAmazon && (
              <a
                href={affiliateUrl(book)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold"
              >
                {buy.litres}
                <ExternalLink className="h-4 w-4 opacity-60" aria-hidden />
              </a>
            )}
            {locale === "ru" && hasAmazon && (
              <a
                href={amazonUrl(book)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold"
              >
                {buy.amazon}
                <ExternalLink className="h-4 w-4 opacity-60" aria-hidden />
              </a>
            )}
          </div>
          <p className="mt-3 text-[11px] text-fg-muted">
            {locale === "en"
              ? "Ad · erid: 2VfnxyNkZrY · partner links where applicable"
              : "Реклама · erid: 2VfnxyNkZrY · партнёрская ссылка"}
          </p>
          <DonateLink locale={locale} className="mt-4" />
        </div>
      </article>

      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-bg-elevated/95 px-4 py-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-muted">{t.sticky}</p>
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white"
          >
            {stickyLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
