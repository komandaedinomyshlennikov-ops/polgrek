import Link from "next/link";
import { getBooks, getFlagships } from "@/lib/books";
import { BookCard } from "./BookCard";

export function BooksShowcase({ mode = "flagships" }: { mode?: "flagships" | "all" }) {
  const books = mode === "all" ? getBooks() : getFlagships();

  return (
    <section id="books" className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              Каталог
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {mode === "all" ? "Все книги" : "С чего чаще начинают"}
            </h2>
            <p className="mt-2 text-fg-muted">
              Не витрина SKU. Хук → суть → глава. Покупка — только если зайдёт.
            </p>
          </div>
          {mode === "flagships" && (
            <Link
              href="/books/"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              Весь каталог →
            </Link>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {books.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
