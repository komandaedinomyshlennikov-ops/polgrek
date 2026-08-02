import type { Metadata } from "next";
import { BooksShowcase } from "@/components/BooksShowcase";

export const metadata: Metadata = {
  title: "Книги Пола Грэка",
  description:
    "Каталог Пола Грэка на polgrek.site и Литрес: Ментальный дебаг, Мозг на 100+, биохакинг, EI 2.0, RESET, Wired for Wealth. Главы бесплатно · litres.ru/author/pol-grek.",
  alternates: { canonical: "https://polgrek.site/books/" },
  openGraph: {
    title: "Книги Пола Грэка",
    description:
      "Практическая нейробиология и перепрошивка мышления. Каталог + бесплатные главы.",
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
