import Link from "next/link";
import type { Book, Locale } from "@/lib/types";
import { internationalTitle, tagLabel } from "@/lib/books";
import { getBookVoice } from "@/data/book-voice";
import { CoverImage } from "@/components/CoverImage";
import { BuyButtons } from "@/components/BuyButtons";
import { lp } from "@/lib/locale";

export function BookCard({
  book,
  locale = "ru",
}: {
  book: Book;
  locale?: Locale;
  priceCta?: boolean;
}) {
  const tags = (book.tags || []).filter((t) => t !== "лора").slice(0, 2);
  const voice = getBookVoice(book.slug, locale);
  const blurb = voice?.hook || book.subtitle || book.promise;
  const enTitle = locale === "ru" ? internationalTitle(book) : null;

  return (
    <article className="card-lift flex flex-col rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)]">
      <div className="flex gap-3 p-3 sm:flex-col sm:gap-0 sm:p-0">
        <Link
          href={lp(locale, `/books/${book.slug}/`)}
          className="relative block w-[38%] min-w-[96px] max-w-[140px] shrink-0 overflow-hidden rounded-xl bg-surface sm:w-full sm:max-w-none sm:rounded-none sm:rounded-t-2xl"
        >
          <CoverImage
            book={book}
            variant="card"
            className="sm:rounded-none sm:rounded-t-2xl"
            sizes="(max-width:640px) 38vw, (max-width:1024px) 40vw, 280px"
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
        <BuyButtons book={book} locale={locale} showPrice={locale === "ru"} />
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
