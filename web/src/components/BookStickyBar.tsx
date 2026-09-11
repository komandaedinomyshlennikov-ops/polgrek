"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { affiliateUrl } from "@/lib/books";
import type { Book } from "@/lib/types";

export function BookStickyBar({
  book,
  excerptLabel = "Читать главу",
  buyLabel = "Купить",
}: {
  book: Book;
  excerptLabel?: string;
  buyLabel?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 px-3 pt-2 backdrop-blur-lg lg:hidden pb-[max(0.65rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href={`/read/${book.slug}/`}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-accent px-3 text-sm font-semibold text-white"
        >
          {excerptLabel}
        </Link>
        <a
          href={affiliateUrl(book)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border-strong bg-bg px-3 text-sm font-semibold text-fg"
        >
          {buyLabel}
          {book.litresPrice ? ` · ${book.litresPrice}\u00a0₽` : ""}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
      </div>
    </div>
  );
}
