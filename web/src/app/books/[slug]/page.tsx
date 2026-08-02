import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ExternalLink } from "lucide-react";
import { affiliateUrl, coverUrl, getBook, getBooks, tagLabel } from "@/lib/books";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Книга" };
  return {
    title: book.title,
    description: book.subtitle || book.promise || book.title,
    openGraph: {
      title: `${book.title} — Пол Грэк`,
      description: book.subtitle || book.promise,
      type: "book",
    },
    alternates: { canonical: `https://polgrek.site/books/${slug}/` },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const tags = (book.tags || []).filter((t) => t !== "лора");
  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.authors?.[0] || "Пол Грэк" },
    description: book.annotation || book.promise || book.subtitle,
    url: `https://polgrek.site/books/${book.slug}/`,
    inLanguage: "ru",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />
      <nav className="mb-6 text-sm text-fg-muted" aria-label="Путь">
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

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="mx-auto w-full max-w-[280px] lg:col-span-4 lg:mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl(book)}
            alt={`Обложка «${book.title}»`}
            width={400}
            height={600}
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow)]"
            fetchPriority="high"
          />
        </div>
        <div className="lg:col-span-8">
          <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
            {book.series || "Научпоп о мозге"}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {book.title}
          </h1>
          <p className="mt-2 text-fg-muted">{book.authors?.join(", ")}</p>
          {book.subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">{book.subtitle}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-fg-muted"
              >
                {tagLabel(t)}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/read/${book.slug}/`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Читать главу бесплатно
            </Link>
            <a
              href={affiliateUrl(book)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-6 text-sm font-semibold"
            >
              Купить на Литрес
              <ExternalLink className="h-4 w-4 opacity-60" aria-hidden />
            </a>
          </div>
          <p className="mt-3 text-[11px] text-fg-muted">
            Реклама · erid: 2VfnxyNkZrY · партнёрская ссылка Литрес
          </p>

          {(book.annotation || book.promise) && (
            <div className="mt-10 prose-space space-y-4 text-[15px] leading-relaxed text-fg-muted">
              {(book.annotation || book.promise)
                .split(/\n\n+/)
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          )}

          {!!book.takeaways?.length && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold">Что внутри</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-fg-muted">
                {book.takeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
