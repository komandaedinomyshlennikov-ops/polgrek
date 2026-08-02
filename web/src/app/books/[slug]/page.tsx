import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coverUrl, getBook, getBooks, tagLabel } from "@/lib/books";
import { getBookVoice } from "@/data/book-voice";
import { BookHighlight } from "@/components/BookHighlight";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Книга" };
  const voice = getBookVoice(slug);
  const desc = voice?.hook || book.subtitle || book.promise || book.title;
  return {
    title: book.title,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${book.title} — Пол Грэк`,
      description: desc.slice(0, 160),
      type: "book",
    },
    alternates: { canonical: `https://polgrek.site/books/${slug}/` },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const voice = getBookVoice(slug);
  const tags = (book.tags || []).filter((t) => t !== "лора");
  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.authors?.[0] || "Пол Грэк" },
    description: voice?.essence || book.annotation || book.promise || book.subtitle,
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
        <div className="mx-auto w-full max-w-[280px] lg:col-span-4 lg:mx-0 lg:sticky lg:top-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl(book)}
            alt={`Обложка «${book.title}»`}
            width={400}
            height={600}
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow)]"
            fetchPriority="high"
          />
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
          <p className="mt-3 text-sm text-fg-muted">{book.authors?.join(", ")}</p>
        </div>

        <div className="lg:col-span-8">
          <BookHighlight book={book} />

          {!!book.takeaways?.length && (
            <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold">Что внутри (без спойлеров)</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-fg-muted">
                {book.takeaways.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      →
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
