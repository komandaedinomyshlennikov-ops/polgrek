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
  priceCta = true,
}: {
  book: Book;
  locale?: Locale;
  priceCta?: boolean;
}) {
  const tags = (book.tags || []).filter((t) => t !== "лора").slice(0, 2);
  const voice = getBookVoice(book.slug, locale);
  const blurb = voice?.hook || book.subtitle || book.promise;
  const enTitle = locale === "ru" ? internationalTitle(book) : null;
  const buy = getBuyVoice(locale);
  const storeHref = locale === "en" && book.amazon ? amazonUrl(book) : affiliateUrl(book);
  const storeLabel =
    locale === "en" && book.amazon
      ? buy.amazon
      : priceCta && locale === "ru" && book.litresPrice
        ? `Купить за ${book.litresPrice}\u00a0₽`
        : buy.litres;

  return (
    <article className="card-lift flex flex-col rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)]">
      <div className="flex gap-3 p-3 sm:flex-col sm:gap-0 sm:p-0">
        <Link
          href={lp(locale, `/books/${book.slug}/`)}
          className="relative block aspect-[2/3] w-[34%] shrink-0 overflow-hidden rounded-xl bg-surface sm:w-full sm:rounded-none sm:rounded-t-2xl"
        >
          <CoverImage
            book={book}
            variant="card"
            className="h-full w-full"
            sizes="(max-width:640px) 34vw, (max-width:1024px) 40vw, 280px"
            imgClassName="transition duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        <div className="min-w-0 flex-1 sm:px-4 sm:pt-4">
          <div className="mb-1.5 hidden flex-wrap gap-1.5 sm:flex">
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
                EN
              </span>
            )}
          </div>
          <h3 className="font-display text-[15px] font-medium leading-snug text-fg sm:text-lg">
            <Link href={lp(locale, `/books/${book.slug}/`)} className="hover:text-accent">
              {book.title}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-3 text-[13px] leading-snug text-fg-muted sm:text-sm">
            {blurb}
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2 p-3 pt-0 sm:p-4">
        <a
          href={storeHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          data-book={book.slug}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-[13px] font-semibold text-white transition hover:brightness-110 sm:min-h-12 sm:text-sm"
        >
          {storeLabel}
          <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
        </a>
        <Link
          href={lp(locale, `/read/${book.slug}/`)}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border-strong px-3 text-[13px] font-semibold text-fg transition hover:border-accent/40 sm:min-h-11 sm:text-sm"
        >
          {locale === "en" ? "Read the chapter" : "Читать главу"}
        </Link>
      </div>
    </article>
  );
}
