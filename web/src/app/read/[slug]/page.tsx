import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { getBook, getBooks } from "@/lib/books";
import { Reader } from "@/components/Reader";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Глава" };
  return {
    title: `Глава — ${book.title}`,
    description: `Бесплатный отрывок: ${book.title}. Пол Грэк.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://polgrek.site/read/${slug}/` },
  };
}

async function loadExcerpt(excerptFile: string): Promise<string> {
  try {
    const file = path.join(process.cwd(), "public", "excerpts", excerptFile);
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

export default async function ReadPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  const text = await loadExcerpt(book.excerptFile);

  // Reader is full-bleed — hide chrome via layout? We use nested layout without footer noise
  return <Reader book={book} text={text} />;
}
