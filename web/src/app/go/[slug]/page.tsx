import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliateUrl, getBook, getBooks } from "@/lib/books";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return {
    title: book ? `Литрес — ${book.title}` : "Литрес",
    robots: { index: false, follow: false },
  };
}

export default async function GoLitres({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  const href = affiliateUrl(book);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(href)})`,
        }}
      />
      <p className="text-fg-muted">Открываем Литрес…</p>
      <a
        href={href}
        rel="noopener noreferrer sponsored"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
      >
        Купить «{book.title}» на Литрес
      </a>
    </div>
  );
}
