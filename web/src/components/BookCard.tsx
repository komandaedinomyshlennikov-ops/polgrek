import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Book } from "@/lib/types";
import { affiliateUrl, coverUrl, tagLabel } from "@/lib/books";

export function BookCard({ book }: { book: Book }) {
  const tags = (book.tags || []).filter((t) => t !== "лора").slice(0, 3);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)] transition hover:border-border-strong">
      <Link href={`/books/${book.slug}/`} className="relative block aspect-[2/3] bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(book)}
          alt={`Обложка книги «${book.title}»`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          width={320}
          height={480}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-fg-muted"
            >
              {tagLabel(t)}
            </span>
          ))}
        </div>
        <h3 className="font-display text-base font-semibold leading-snug text-fg">
          <Link href={`/books/${book.slug}/`} className="hover:text-accent">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-fg-muted">
          {book.subtitle || book.promise}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/read/${book.slug}/`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Читать главу
          </Link>
          <a
            href={affiliateUrl(book)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold text-fg transition hover:border-accent/40"
          >
            Купить на Литрес
            <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}
