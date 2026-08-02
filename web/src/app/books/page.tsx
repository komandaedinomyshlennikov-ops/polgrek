import type { Metadata } from "next";
import { BooksShowcase } from "@/components/BooksShowcase";

export const metadata: Metadata = {
  title: "Каталог книг",
  description:
    "Все книги Пола Грэка: выгорание, фокус, стресс, энергия, деньги. Глава бесплатно на сайте · Литрес.",
  alternates: { canonical: "https://polgrek.site/books/" },
};

export default function BooksPage() {
  return (
    <div className="pt-4">
      <BooksShowcase mode="all" />
    </div>
  );
}
