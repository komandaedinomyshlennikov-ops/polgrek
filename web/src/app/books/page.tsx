import type { Metadata } from "next";
import { BooksShowcase } from "@/components/BooksShowcase";
import { getBooks } from "@/lib/books";
import { booksCollectionLd } from "@/lib/book-seo";

export const metadata: Metadata = {
  title: "Книги Пола Грэка — мозг, сон, энергия, внимание",
  description:
    "13 книг о мозге простым языком: память после 40, провал в три часа, Telegram, стресс, сон. Главы бесплатно, полные тексты на Литрес.",
  alternates: {
    canonical: "https://polgrek.site/books/",
    languages: {
      ru: "https://polgrek.site/books/",
      en: "https://polgrek.site/en/books/",
      "x-default": "https://polgrek.site/books/",
    },
  },
  openGraph: {
    title: "Книги Пола Грэка",
    description: "Книги о мозге простым языком. Главы бесплатно, полные тексты на Литрес.",
    url: "https://polgrek.site/books/",
  },
};

export default function BooksPage() {
  const ld = booksCollectionLd(getBooks());
  return (
    <div className="pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <BooksShowcase mode="all" />
    </div>
  );
}
