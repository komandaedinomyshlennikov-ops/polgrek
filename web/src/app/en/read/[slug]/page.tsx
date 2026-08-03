import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBooks, getLocalizedBook } from "@/lib/books";
import { PREVIEWS_EN } from "@/data/book-voice-en";
import { Reader } from "@/components/Reader";
import { SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getLocalizedBook(slug, "en");
  if (!book) return { title: "Sample" };
  return {
    title: `Sample — ${book.title}`,
    description: `Free English sample: ${book.title}. Pol Grek.`,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/en/read/${slug}/`,
      languages: {
        ru: `${SITE_URL}/read/${slug}/`,
        en: `${SITE_URL}/en/read/${slug}/`,
      },
    },
  };
}

export default async function EnReadPage({ params }: Props) {
  const { slug } = await params;
  const book = getLocalizedBook(slug, "en");
  if (!book) notFound();
  const text = PREVIEWS_EN[slug] || `— Excerpt —\n\n${book.annotation || book.promise}`;

  return <Reader book={book} text={text} locale="en" />;
}
