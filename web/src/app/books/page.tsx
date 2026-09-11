import type { Metadata } from "next";
import { BooksShowcase } from "@/components/BooksShowcase";

export const metadata: Metadata = {
  title: "Книги Пола Грэка",
  description:
    "Каталог книг Пола Грэка: мозг, сон, энергия, внимание. Главы бесплатно на сайте, полные тексты — на Литрес.",
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
    description:
      "Книги о мозге простым языком. Каталог и бесплатные главы.",
    url: "https://polgrek.site/books/",
  },
};

export default function BooksPage() {
  return (
    <div className="pt-4">
      <BooksShowcase mode="all" />
    </div>
  );
}
