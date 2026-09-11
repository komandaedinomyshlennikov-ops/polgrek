import { ExternalLink } from "lucide-react";
import { affiliateUrl, amazonUrl } from "@/lib/books";
import { getBuyVoice } from "@/data/book-voice";
import type { Book, Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

export function BuyButtons({
  book,
  locale = "ru",
  showPrice = true,
  layout = "stack",
}: {
  book: Book;
  locale?: Locale;
  showPrice?: boolean;
  layout?: "stack" | "row";
}) {
  const buy = getBuyVoice(locale);
  const litresLabel =
    showPrice && locale === "ru" && book.litresPrice
      ? `${buy.litres} · ${book.litresPrice}\u00a0₽`
      : buy.litres;

  return (
    <div
      className={cn(
        "flex gap-2",
        layout === "row" ? "flex-col sm:flex-row sm:flex-wrap" : "flex-col"
      )}
    >
      <a
        href={affiliateUrl(book)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-book={book.slug}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-fg px-4 text-sm font-semibold text-bg transition hover:opacity-90 sm:min-h-12"
      >
        {litresLabel}
        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </a>
      {book.amazon ? (
        <a
          href={amazonUrl(book)}
          target="_blank"
          rel="noopener noreferrer"
          data-book={book.slug}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border-strong px-4 text-sm font-semibold text-fg transition hover:border-accent/40 sm:min-h-12"
        >
          {buy.amazon}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
