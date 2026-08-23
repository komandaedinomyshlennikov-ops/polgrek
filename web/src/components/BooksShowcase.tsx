import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  getBooks,
  getBooksByShelf,
  getCatalogShelves,
  getFlagshipsLocalized,
  litresAuthorUrl,
  siteData,
} from "@/lib/books";
import { getLitresExtra } from "@/data/book-voice";
import { BookCard } from "./BookCard";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";

export function BooksShowcase({
  mode = "flagships",
  locale = "ru",
}: {
  mode?: "flagships" | "all";
  locale?: Locale;
}) {
  const t = ui(locale).books;
  const flagships = getFlagshipsLocalized(locale);
  const litresProfile = litresAuthorUrl();

  if (mode === "flagships") {
    return (
      <section id="books" className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.flagshipsTitle}
            </h2>
            <p className="mt-2 text-fg-muted">{t.flagshipsLead}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {flagships.map((b) => (
              <BookCard key={b.slug} book={b} locale={locale} />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href={lp(locale, "/books/")}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong px-5 text-sm font-semibold text-fg"
            >
              {t.allCount(getBooks().length)}
            </Link>
            <a
              href={locale === "en" ? siteData.links.amazonAuthor : litresProfile}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-bg"
            >
              {locale === "en" ? "Amazon author page" : t.litresProfile}
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </div>
          <p className="mt-3 text-center text-[11px] text-fg-muted">{t.ad}</p>
        </div>
      </section>
    );
  }

  const shelves = getCatalogShelves(locale);
  const extra = getLitresExtra(locale);

  return (
    <section id="books" className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.catalogEyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.catalogTitle}
          </h2>
          <p className="mt-2 text-fg-muted">
            {t.catalogLeadBefore}
            <a
              href={locale === "en" ? siteData.links.amazonAuthor : litresProfile}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              {locale === "en" ? "Amazon" : "litres.ru/author/pol-grek"}
            </a>
            {t.catalogLeadAfter}
          </p>
          <div className="mt-6">
            <a
              href={locale === "en" ? siteData.links.amazonAuthor : litresProfile}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              {locale === "en" ? "Buy on Amazon" : "Купить на Литрес"}
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </div>
        </div>

        {shelves.map((shelf) => {
          const books = getBooksByShelf(shelf.id, locale);
          if (!books.length) return null;
          return (
            <div key={shelf.id} className="mt-12">
              <div className="mb-5 max-w-2xl">
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  <span className="mr-2" aria-hidden>
                    {shelf.emoji}
                  </span>
                  {shelf.title}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">{shelf.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {books.map((b) => (
                  <BookCard key={b.slug} book={b} locale={locale} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-14 rounded-2xl border border-border bg-bg-elevated p-5 sm:p-7">
          <h3 className="font-display text-lg font-semibold">{t.moreLitres}</h3>
          <p className="mt-1 text-sm text-fg-muted">{t.moreLitresLead}</p>
          <ul className="mt-4 space-y-3">
            {extra.map((item) => {
              const href =
                siteData.affiliate?.bySlug?.[item.slug] ||
                `https://www.litres.ru/book/pol-grek/${item.slug}/`;
              return (
                <li
                  key={item.slug}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-bg p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-fg">{item.title}</p>
                    <p className="mt-0.5 text-sm text-fg-muted">{item.tagline}</p>
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border-strong px-4 text-sm font-semibold"
                  >
                    {t.onLitres}
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {locale === "en" && (
            <a
              href={siteData.links.amazonAuthor}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white"
            >
              Amazon author page →
              <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
            </a>
          )}
          <a
            href={litresProfile}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-6 text-sm font-semibold text-fg"
          >
            {t.allOnLitres}
            <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-fg-muted">{t.adFull}</p>
      </div>
    </section>
  );
}
