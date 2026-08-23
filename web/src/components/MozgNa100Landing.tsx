import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";
import { MOZG_LANDING as t } from "@/data/book-landing-mozg";
import { affiliateUrl, amazonUrl } from "@/lib/books";
import { ui } from "@/data/ui";
import { DonateLink } from "@/components/DonateLink";
import type { Book } from "@/lib/types";

function Ctas({ book, className = "" }: { book: Book; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Link
        href={`/read/${book.slug}/`}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        {t.ctaExcerpt}
      </Link>
      <a
        href={affiliateUrl(book)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-5 text-sm font-semibold transition hover:border-accent/40"
      >
        {t.ctaBuy}
        <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
      </a>
      {book.amazon && (
        <a
          href={amazonUrl(book)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-fg-muted hover:text-fg"
        >
          {t.ctaAmazon}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
      )}
      <DonateLink variant="quiet" className="justify-center sm:justify-start" />
    </div>
  );
}

export function MozgNa100Landing({ book }: { book: Book }) {
  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: "Пол Грэк" },
    description: t.dek,
    url: "https://polgrek.site/books/mozg-na-100/",
    inLanguage: "ru",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <nav className="mb-8 text-sm text-fg-muted" aria-label="Путь">
          <Link href="/" className="hover:text-accent">
            На главную
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/books/" className="hover:text-accent">
            Все книги
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-fg">{book.title}</span>
        </nav>
      </div>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-4">
            <div className="mx-auto max-w-[280px] lg:mx-0">
              <CoverImage
                book={book}
                variant="product"
                priority
                className="w-full rounded-2xl border border-border shadow-[var(--shadow)]"
              />
            </div>
            <Ctas book={book} className="mt-5 hidden lg:flex" />
            <p className="mt-3 hidden text-sm text-fg-muted lg:block">{t.ctaNote}</p>
          </div>

          <div className="lg:col-span-8">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              {t.kicker}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 max-w-xl font-display text-xl font-medium leading-snug text-pretty text-fg">
              {t.dek}
            </p>

            <div className="mt-8 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {t.sceneTitle}
              </p>
              <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-pretty text-fg-muted">
                {t.scene.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            <blockquote className="mt-8 max-w-2xl border-l-2 border-accent/50 pl-5 font-display text-xl font-medium leading-snug text-pretty sm:text-2xl">
              {t.reframe}
            </blockquote>

            <Ctas book={book} className="mt-8 lg:hidden" />
            <p className="mt-3 text-sm text-fg-muted lg:hidden">{t.ctaNote}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.recognizeTitle}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.recognize.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-bg-elevated p-4 text-[15px] leading-relaxed text-fg"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            {t.recognizeNote}
          </p>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.mapTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{t.mapLead}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                Уязвимости
              </p>
              <ul className="mt-4 space-y-3">
                {t.vulnerabilities.map((item) => (
                  <li key={item.t} className="rounded-2xl border border-border bg-surface/40 p-4">
                    <p className="font-display font-semibold">{item.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                Рычаги
              </p>
              <ul className="mt-4 space-y-3">
                {t.levers.map((item) => (
                  <li key={item.t} className="rounded-2xl border border-border bg-bg-elevated p-4">
                    <p className="font-display font-semibold">{item.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.insideTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{t.insideLead}</p>
          <ol className="mt-8 space-y-3">
            {t.parts.map((part, i) => (
              <li
                key={part.t}
                className="grid gap-3 rounded-2xl border border-border bg-bg-elevated p-4 sm:grid-cols-[3rem_1fr] sm:p-5"
              >
                <span className="font-display text-2xl font-semibold text-accent/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display font-semibold">{part.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{part.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.gradesTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{t.gradesLead}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.grades.map((g) => (
              <li key={g.letter} className="rounded-2xl border border-border p-4">
                <p className="font-display text-2xl font-semibold text-accent">{g.letter}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{g.d}</p>
              </li>
            ))}
          </ul>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-accent/50 pl-5 font-display text-xl font-medium leading-snug text-pretty sm:text-2xl">
            {t.promise}
          </blockquote>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">{t.getTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {t.getItems.map((item) => (
                <li key={item} className="flex gap-2 text-[15px] leading-relaxed">
                  <span className="text-accent" aria-hidden>
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">{t.notTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {t.notItems.map((item) => (
                <li key={item} className="flex gap-2 text-[15px] leading-relaxed text-fg-muted">
                  <span aria-hidden>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.faqTitle}
          </h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
            {t.faq.map((item) => (
              <details key={item.q} className="group p-4 sm:p-5">
                <summary className="cursor-pointer list-none font-display font-semibold marker:content-none">
                  {item.q}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="font-display text-2xl font-semibold tracking-tight text-balance">
            Сначала глава. Потом решите, нужна ли книга.
          </p>
          <Ctas book={book} className="mt-6 sm:items-center" />
          <p className="mt-4 text-sm text-fg-muted">{t.note}</p>
          <p className="mt-2 text-[11px] text-fg-muted">{ui("ru").bookPage.ad}</p>
        </div>
      </section>
    </div>
  );
}
