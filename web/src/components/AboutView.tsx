import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { about } from "@/data/about";
import { home } from "@/data/home";
import { getLocalizedBook, siteData } from "@/lib/books";
import { CoverImage } from "@/components/CoverImage";
import { lp } from "@/lib/locale";
import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/lib/types";

export function AboutView({ locale = "ru" }: { locale?: Locale }) {
  const t = about(locale);
  const books = home(locale).books.items;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "en" ? "Pol Grek" : "Пол Грэк",
    url: `${SITE_URL}${lp(locale, "/about/")}`,
    image: `${SITE_URL}/images/pol-grek-portrait.jpg`,
    jobTitle:
      locale === "en"
        ? "Popular-science author"
        : "Автор научно-популярных книг",
    description: t.role,
    sameAs: [siteData.links.threads, siteData.links.telegram, siteData.links.litresAuthor].filter(
      Boolean
    ),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <nav className="mb-8 text-sm text-fg-muted">
            <Link href={lp(locale, "/")} className="hover:text-accent">
              {t.crumbHome}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-fg">{t.crumbHere}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mx-auto aspect-square max-w-[320px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] lg:mx-0">
                <picture>
                  <source type="image/webp" srcSet="/images/pol-grek-portrait.webp" />
                  <img
                    src="/images/pol-grek-portrait.jpg"
                    alt={t.portraitAlt}
                    className="h-full w-full object-cover"
                    width={800}
                    height={800}
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {t.h1}
              </h1>
              <p className="mt-5 max-w-xl font-display text-xl font-medium leading-snug text-pretty text-fg sm:text-2xl">
                {t.role}
              </p>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-fg-muted">
                {t.lead}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={lp(locale, "/books/")}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
                >
                  {t.ctaBooks}
                </Link>
                <Link
                  href={lp(locale, "/lab/")}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong px-5 text-sm font-semibold"
                >
                  {t.ctaLab}
                </Link>
                <a
                  href={siteData.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-border px-5 text-sm font-semibold text-fg"
                >
                  {t.ctaFollow}
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </a>
              </div>
              <p className="mt-3 max-w-md text-sm text-fg-muted">
                {t.followNote}{" "}
                <a
                  href={siteData.links.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  Threads
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <blockquote className="border-l-2 border-accent/50 pl-5 font-display text-2xl font-medium leading-snug text-pretty sm:text-3xl">
            {t.line}
          </blockquote>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {t.booksEyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {t.booksTitle}
              </h2>
            </div>
            <Link
              href={lp(locale, "/books/")}
              className="hidden text-sm font-semibold text-accent hover:underline sm:inline"
            >
              {t.booksAll} →
            </Link>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {books.map((item) => {
              const book = getLocalizedBook(item.slug, locale);
              if (!book) return null;
              return (
                <li key={item.slug}>
                  <Link
                    href={lp(locale, `/books/${book.slug}/`)}
                    className="flex h-full gap-4 rounded-2xl border border-border bg-bg-elevated p-4 shadow-[var(--shadow)] transition hover:border-accent/40"
                  >
                    <div className="w-[72px] shrink-0">
                      <CoverImage
                        book={book}
                        variant="card"
                        sizes="72px"
                        className="aspect-[2/3] overflow-hidden rounded-md"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-wide text-accent uppercase">
                        {item.tag}
                      </p>
                      <p className="mt-1 font-display font-semibold leading-snug">{book.title}</p>
                      <p className="mt-2 text-sm leading-snug text-pretty text-fg-muted">
                        {item.forWhom}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={lp(locale, "/books/")}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline sm:hidden"
          >
            {t.booksAll} →
          </Link>

          <p className="mt-10 max-w-2xl text-sm text-fg-muted">{t.note}</p>
        </div>
      </section>
    </div>
  );
}
