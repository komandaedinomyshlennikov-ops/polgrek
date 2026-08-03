import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Book } from "@/lib/types";
import { affiliateUrl, amazonUrl } from "@/lib/books";
import { BUY_VOICE, getBookVoice } from "@/data/book-voice";

/**
 * Conversion book block in Pol Grek ToV:
 * hook → essence → vibe → CTA (fragment + store)
 */
export function BookHighlight({ book }: { book: Book }) {
  const voice = getBookVoice(book.slug);
  const hook = voice?.hook || book.subtitle || book.promise;
  const essence = voice?.essence || book.annotation || book.promise;
  const vibe = voice?.vibe || [
    "⚡ Коротко и по делу",
    "🧬 Механика, не мораль",
    "🔥 Без «просто соберись»",
  ];
  const ctaLine = voice?.ctaLine || BUY_VOICE.body;
  const hasAmazon = Boolean(book.amazon);

  return (
    <section className="book-highlight rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {book.title}
      </h2>
      <p className="book-tagline mt-4 border-l-2 border-accent pl-4 font-display text-lg leading-snug text-fg sm:text-xl">
        {hook}
      </p>

      <div className="book-description mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted">
        {essence.split(/(?<=\.)\s+/).filter(Boolean).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <ul className="book-features mt-6 space-y-2.5">
        {vibe.map((item) => (
          <li key={item} className="text-sm font-medium text-fg">
            {item}
          </li>
        ))}
      </ul>

      <div className="book-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={`/read/${book.slug}/`}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {BUY_VOICE.excerpt}
        </Link>
        <a
          href={affiliateUrl(book)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-5 text-sm font-semibold text-fg transition hover:border-accent/40"
        >
          {BUY_VOICE.litres}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
        {hasAmazon && (
          <a
            href={amazonUrl(book)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-fg-muted transition hover:text-fg"
          >
            {BUY_VOICE.amazon}
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
          </a>
        )}
      </div>

      <p className="mt-4 text-sm text-fg-muted">{ctaLine}</p>
      <p className="mt-2 text-[11px] text-fg-muted">
        Реклама · erid: 2VfnxyNkZrY · партнёрская ссылка Литрес
      </p>
    </section>
  );
}
