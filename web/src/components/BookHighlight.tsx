import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Book, Locale } from "@/lib/types";
import { affiliateUrl, amazonUrl } from "@/lib/books";
import { getBookVoice, getBuyVoice } from "@/data/book-voice";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";
import { DonateLink } from "@/components/DonateLink";

/**
 * Conversion book block in Pol Grek ToV:
 * hook → essence → vibe → CTA (fragment + store)
 */
export function BookHighlight({ book, locale = "ru" }: { book: Book; locale?: Locale }) {
  const voice = getBookVoice(book.slug, locale);
  const buy = getBuyVoice(locale);
  const hook = voice?.hook || book.subtitle || book.promise;
  const essence = voice?.essence || book.annotation || book.promise;
  const vibe = voice?.vibe ||
    (locale === "en"
      ? (["⚡ Short and sharp", "🧬 Mechanics, not morals", "🔥 No “just try harder”"] as [
          string,
          string,
          string,
        ])
      : (["⚡ Коротко и по делу", "🧬 Механика, не мораль", "🔥 Без «просто соберись»"] as [
          string,
          string,
          string,
        ]));
  const ctaLine = voice?.ctaLine || buy.body;
  const hasAmazon = Boolean(book.amazon);
  const primaryStore = locale === "en" && hasAmazon ? amazonUrl(book) : affiliateUrl(book);
  const primaryLabel = locale === "en" && hasAmazon ? buy.amazon : buy.litres;

  return (
    <section className="book-highlight rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {book.title}
      </h2>
      <p className="book-tagline mt-4 border-l-2 border-accent pl-4 font-display text-lg leading-snug text-fg sm:text-xl">
        {hook}
      </p>

      <div className="book-description mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted">
        {essence
          .split(/(?<=\.)\s+/)
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>

      <ul className="book-features mt-6 space-y-2.5">
        {vibe.map((item) => (
          <li key={item} className="text-sm font-medium text-fg">
            {item.replace(/^[⚡🧬🔥]\s*/, "")}
          </li>
        ))}
      </ul>

      <div className="book-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={lp(locale, `/read/${book.slug}/`)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {buy.excerpt}
        </Link>
        <a
          href={primaryStore}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-bg transition hover:opacity-90"
        >
          {primaryLabel}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
        {hasAmazon && locale === "ru" && (
          <a
            href={amazonUrl(book)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-fg-muted transition hover:text-fg"
          >
            {buy.amazon}
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
          </a>
        )}
        {locale === "en" && !hasAmazon && (
          <a
            href={affiliateUrl(book)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-fg-muted transition hover:text-fg"
          >
            {buy.litres}
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
          </a>
        )}
      </div>

      <p className="mt-4 text-sm text-fg-muted">{ctaLine}</p>
      <DonateLink locale={locale} className="mt-3" />
      <p className="mt-2 text-[11px] text-fg-muted">{ui(locale).bookPage.ad}</p>
    </section>
  );
}
