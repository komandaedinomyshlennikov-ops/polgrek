import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  CATALOG_SHELVES,
  getBooks,
  getBooksByShelf,
  getFlagships,
  litresAuthorUrl,
  siteData,
} from "@/lib/books";
import { LITRES_EXTRA } from "@/data/book-voice";
import { BookCard } from "./BookCard";

export function BooksShowcase({ mode = "flagships" }: { mode?: "flagships" | "all" }) {
  const flagships = getFlagships();
  const litresProfile = litresAuthorUrl();

  if (mode === "flagships") {
    return (
      <section id="books" className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                Книги Пола Грэка
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Практическая нейробиология и перепрошивка мышления
              </h2>
              <p className="mt-2 text-fg-muted">
                Хук → глава на сайте → Литрес / Amazon. Не витрина SKU.
              </p>
            </div>
            <Link
              href="/books/"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              Весь каталог →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {flagships.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/books/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong px-5 text-sm font-semibold text-fg"
            >
              Все {getBooks().length} книг на сайте
            </Link>
            <a
              href={litresProfile}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-bg"
            >
              Все книги на Литрес
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </div>
          <p className="mt-3 text-center text-[11px] text-fg-muted">
            Реклама · erid: 2VfnxyNkZrY ·{" "}
            <a href={siteData.links.litresAuthor} className="underline hover:text-fg">
              litres.ru/author/pol-grek
            </a>
          </p>
        </div>
      </section>
    );
  }

  // Full catalog with shelves
  return (
    <section id="books" className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Каталог · Литрес / KDP
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Книги Пола Грэка
          </h2>
          <p className="mt-2 text-fg-muted">
            Практическая нейробиология, биохакинг и перепрошивка мышления. Профиль автора:{" "}
            <a
              href={litresProfile}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              litres.ru/author/pol-grek
            </a>
            .
          </p>
        </div>

        {CATALOG_SHELVES.map((shelf) => {
          const books = getBooksByShelf(shelf.id);
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
                  <BookCard key={b.slug} book={b} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Titles on LitRes without on-site reader yet */}
        <div className="mt-14 rounded-2xl border border-border bg-bg-elevated p-5 sm:p-7">
          <h3 className="font-display text-lg font-semibold">Ещё на Литрес</h3>
          <p className="mt-1 text-sm text-fg-muted">
            Книги в профиле автора — глава на сайте появится по мере миграции обложек и отрывков.
          </p>
          <ul className="mt-4 space-y-3">
            {LITRES_EXTRA.map((item) => {
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
                    На Литрес
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={litresProfile}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white"
          >
            Все книги Пола Грэка на Литрес →
            <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-fg-muted">
          Реклама · erid: 2VfnxyNkZrY · партнёрская ссылка AdvCake
        </p>
      </div>
    </section>
  );
}
