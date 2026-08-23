import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Book, Locale } from "@/lib/types";
import { affiliateUrl, amazonUrl, internationalTitle, tagLabel } from "@/lib/books";
import { getBuyVoice, getBookVoice } from "@/data/book-voice";
import { CoverImage } from "@/components/CoverImage";
import { lp } from "@/lib/locale";

export function BookCard({
  book,
  locale = "ru",
  priceCta = false,
}: {
  book: Book;
  locale?: Locale;
  priceCta?: boolean;
}) {
  const tags = (book.tags || []).filter((t) => t !== "лора").slice(0, 3);
  const voice = getBookVoice(book.slug, locale);
  const blurb = voice?.hook || book.subtitle || book.promise;
  const enTitle = locale === "ru" ? internationalTitle(book) : null;
  const buy = getBuyVoice(locale);
  const storeHref = locale === "en" && book.amazon ? amazonUrl(book) : affiliateUrl(book);
  const storeLabel =
    priceCta && locale === "ru" && book.litresPrice
      ? `Купить за ${book.litresPrice}\u00a0₽`
      : locale === "en" && book.amazon
        ? buy.amazon
        : buy.litres;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)] transition hover:border-border-strong">
      <Link href={lp(locale, `/books/${book.slug}/`)} className="relative block aspect-[2/3] bg-surface">
        <CoverImage
          book={book}
          variant="card"
          sizes="(max-width:640px) 45vw, (max-width:1024px) 28vw, 220px"
          imgClassName="transition duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-fg-muted"
            >
              {tagLabel(t, locale)}
            </span>
          ))}
          {enTitle && (
            <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
              EN · {enTitle}
            </span>
          )}
        </div>
        <h3 className="font-display text-base font-semibold leading-snug text-fg">
          <Link href={lp(locale, `/books/${book.slug}/`)} className="hover:text-accent">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-snug text-fg-muted">{blurb}</p>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href={storeHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {storeLabel}
            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </a>
          {priceCta ? (
            <Link
              href={lp(locale, `/read/${book.slug}/`)}
              className="inline-flex min-h-10 items-center justify-center text-sm font-medium text-fg-muted hover:text-accent"
            >
              {buy.excerpt}
            </Link>
          ) : (
            <Link
              href={lp(locale, `/read/${book.slug}/`)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {buy.excerpt}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

