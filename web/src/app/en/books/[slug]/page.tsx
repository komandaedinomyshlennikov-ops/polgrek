import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooks, getLocalizedBook, tagLabel } from "@/lib/books";
import { getBookVoice } from "@/data/book-voice";
import { BookHighlight } from "@/components/BookHighlight";
import { CoverImage } from "@/components/CoverImage";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { ui } from "@/data/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getLocalizedBook(slug, "en");
  if (!book) return { title: "Book" };
  const voice = getBookVoice(slug, "en");
  const desc = voice?.hook || book.subtitle || book.promise || book.title;
  const pageUrl = `${SITE_URL}/en/books/${slug}/`;
  return {
    title: book.title,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${book.title} — Pol Grek`,
      description: desc.slice(0, 160),
      type: "book",
      url: pageUrl,
      locale: "en_US",
      siteName: "Pol Grek",
      images: [
        {
          url: `${SITE_URL}/covers/${book.coverFile.replace(/\.(webp|png)$/i, ".jpg").replace(/\.jpg$/i, ".jpg")}`,
          width: 720,
          height: 1080,
          alt: book.title,
        },
        { url: OG_IMAGE, width: 1200, height: 630, alt: "Pol Grek" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — Pol Grek`,
      description: desc.slice(0, 160),
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: `${SITE_URL}/books/${slug}/`,
        en: pageUrl,
        "x-default": `${SITE_URL}/books/${slug}/`,
      },
    },
  };
}

export default async function EnBookPage({ params }: Props) {
  const { slug } = await params;
  const book = getLocalizedBook(slug, "en");
  if (!book) notFound();

  const t = ui("en").bookPage;
  const voice = getBookVoice(slug, "en");
  const tags = (book.tags || []).filter((x) => x !== "лора");
  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.authors?.[0] || "Pol Grek" },
    description: voice?.essence || book.annotation || book.promise || book.subtitle,
    url: `${SITE_URL}/en/books/${book.slug}/`,
    inLanguage: "en",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />
      <nav className="mb-6 text-sm text-fg-muted" aria-label="Breadcrumb">
        <Link href="/en/" className="hover:text-accent">
          {t.home}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href="/en/books/" className="hover:text-accent">
          {t.all}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-fg">{book.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="mx-auto w-full max-w-[280px] lg:col-span-4 lg:mx-0 lg:sticky lg:top-24">
          <CoverImage
            book={book}
            variant="product"
            priority
            className="w-full rounded-2xl border border-border shadow-[var(--shadow)]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-fg-muted"
              >
                {tagLabel(tag, "en")}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-fg-muted">{book.authors?.join(", ")}</p>
        </div>

        <div className="lg:col-span-8">
          <BookHighlight book={book} locale="en" />

          {!!book.takeaways?.length && (
            <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold">{t.takeaways}</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-fg-muted">
                {book.takeaways.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      →
                    </span>
                    <span>{item}</span>
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
