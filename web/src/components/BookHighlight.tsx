import Link from "next/link";
import type { Book, Locale } from "@/lib/types";
import { getBookVoice, getBuyVoice } from "@/data/book-voice";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";
import { DonateLink } from "@/components/DonateLink";
import { BuyButtons } from "@/components/BuyButtons";

export function BookHighlight({ book, locale = "ru" }: { book: Book; locale?: Locale }) {
  const voice = getBookVoice(book.slug, locale);
  const buy = getBuyVoice(locale);
  const hook = voice?.hook || book.subtitle || book.promise;
  const essence = voice?.essence || book.annotation || book.promise;
  const vibe = voice?.vibe ||
    (locale === "en"
      ? (["Short and sharp", "Mechanics, not morals", "No “just try harder”"] as [
          string,
          string,
          string,
        ])
      : (["Без хайпа", "Как устроено, не мораль", "Без «просто соберись»"] as [
          string,
          string,
          string,
        ]));
  const ctaLine = voice?.ctaLine || buy.body;

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

      <div className="book-actions mt-8 flex flex-col gap-3">
        <Link
          href={lp(locale, `/read/${book.slug}/`)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110 sm:self-start"
        >
          {buy.excerpt}
        </Link>
        <BuyButtons book={book} locale={locale} layout="row" />
      </div>

      <p className="mt-4 text-sm text-fg-muted">{ctaLine}</p>
      <DonateLink locale={locale} className="mt-3" />
      <p className="mt-2 text-[11px] text-fg-muted">{ui(locale).bookPage.ad}</p>
    </section>
  );
}
