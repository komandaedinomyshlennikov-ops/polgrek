import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { amazonUrl, getBook, getBooks } from "@/lib/books";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBooks()
    .filter((b) => b.amazon)
    .map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return {
    title: book ? `Amazon — ${book.title}` : "Amazon",
    robots: { index: false, follow: false },
  };
}

export default async function GoAmazon({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book?.amazon) notFound();
  const href = amazonUrl(book);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(href)})`,
        }}
      />
      <p className="text-fg-muted">Открываем Amazon…</p>
      <a
        href={href}
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
      >
        Купить «{book.title}» на Amazon
      </a>
    </div>
  );
}
