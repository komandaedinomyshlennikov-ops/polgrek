import Link from "next/link";
import { getBooks, getLocalizedBook } from "@/lib/books";
import { CoverImage } from "@/components/CoverImage";
import { BuyButtons } from "@/components/BuyButtons";
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
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-fg sm:text-4xl">
            {t.title}
          </h2>
        </div>

        <ul className="mt-10 space-y-5">
          {t.items.map((item) => {
            const book = getLocalizedBook(item.slug, locale);
            if (!book) return null;
            return (
              <li
                key={item.slug}
                className="grid grid-cols-[128px_1fr] items-start gap-4 rounded-2xl border border-border bg-bg-elevated p-4 shadow-[var(--shadow)] sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-6"
              >
                <Link
                  href={lp(locale, `/books/${book.slug}/`)}
                  className="block w-full"
                >
                  <CoverImage
                    book={book}
                    variant="product"
                    sizes="(max-width:640px) 128px, 180px"
                    className="aspect-[2/3] overflow-hidden rounded-lg bg-surface shadow-md"
                    imgClassName="object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.12em] text-accent uppercase">
                    {item.tag}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-fg">
                    <Link href={lp(locale, `/books/${book.slug}/`)} className="hover:text-accent">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-fg">{item.forWhom}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {item.body}
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href={lp(locale, `/read/${book.slug}/`)}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white transition hover:brightness-110 sm:self-start"
                    >
                      {t.excerpt}
                    </Link>
                    <BuyButtons book={book} locale={locale} layout="row" />
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
