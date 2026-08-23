import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { affiliateUrl, amazonUrl, getBooks, getLocalizedBook } from "@/lib/books";
import { CoverImage } from "@/components/CoverImage";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { home } from "@/data/home";

export function HomeBooks({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).books;
  const count = getBooks().length;

  return (
    <section id="books" className="border-b border-border bg-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
            {t.title}
          </h2>
        </div>

        <ul className="mt-10 space-y-5">
          {t.items.map((item) => {
            const book = getLocalizedBook(item.slug, locale);
            if (!book) return null;
            const storeHref =
              item.store === "amazon" && book.amazon ? amazonUrl(book) : affiliateUrl(book);
            const storeLabel = item.store === "amazon" ? t.amazon : t.litres;
            return (
              <li
                key={item.slug}
                className="grid gap-5 rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:grid-cols-[120px_1fr] sm:p-6"
              >
                <Link
                  href={lp(locale, `/books/${book.slug}/`)}
                  className="mx-auto w-[120px] sm:mx-0"
                >
                  <CoverImage
                    book={book}
                    variant="card"
                    sizes="120px"
                    className="aspect-[2/3] overflow-hidden rounded-lg shadow-md"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.12em] text-accent uppercase">
                    {item.tag}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-fg">
                    <Link href={lp(locale, `/books/${book.slug}/`)} className="hover:text-accent">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-fg">{item.forWhom}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {item.body}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={lp(locale, `/read/${book.slug}/`)}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      {t.excerpt}
                    </Link>
                    <a
                      href={storeHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-fg px-4 text-sm font-semibold text-bg transition hover:opacity-90"
                    >
                      {storeLabel}
                      <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href={lp(locale, "/books/")}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong px-5 text-sm font-semibold text-fg transition hover:border-accent/40"
          >
            {t.all.replace("13", String(count))}
          </Link>
        </div>
      </div>
    </section>
  );
}
