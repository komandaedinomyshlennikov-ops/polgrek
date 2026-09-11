import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook, getBooks, tagLabel } from "@/lib/books";
import { BookHighlight } from "@/components/BookHighlight";
import { CoverImage } from "@/components/CoverImage";
import { BookLandingView } from "@/components/BookLandingView";
import { hasBookLanding } from "@/data/book-landing";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { bookCoverAbs, bookJsonLd, bookSeo } from "@/lib/book-seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Книга" };
  const seo = bookSeo(book);
  const pageUrl = `${SITE_URL}/books/${slug}/`;
  const cover = bookCoverAbs(book);
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: `${book.title} — Пол Грэк`,
      description: seo.description,
      type: "book",
      url: pageUrl,
      locale: "ru_RU",
      siteName: "Пол Грэк",
      images: [
        { url: cover, width: 720, height: 1080, alt: `Обложка книги «${book.title}»` },
        { url: OG_IMAGE, width: 1200, height: 630, alt: "Пол Грэк" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — Пол Грэк`,
      description: seo.description,
      images: [cover],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: pageUrl,
        en: `${SITE_URL}/en/books/${slug}/`,
        "x-default": pageUrl,
      },
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  if (hasBookLanding(slug)) {
    return <BookLandingView book={book} />;
  }

  const tags = (book.tags || []).filter((t) => t !== "лора");
  const bookLd = bookJsonLd(book);

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
        <div className="mx-auto w-full max-w-[min(280px,58vw)] sm:max-w-[320px] lg:col-span-4 lg:mx-0 lg:max-w-none lg:sticky lg:top-24">
          <CoverImage
            book={book}
            variant="product"
            priority
            sizes="(max-width:1023px) 58vw, 320px"
            className="rounded-2xl border border-border bg-surface shadow-[var(--shadow)]"
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
