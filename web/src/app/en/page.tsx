import Link from "next/link";
import { getFlagships, siteData } from "@/lib/books";

/** Lightweight EN landing — full i18n can expand later */
export default function EnHomePage() {
  const books = getFlagships().slice(0, 4);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold tracking-wide text-accent uppercase">Pol Grek</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Brain science without the woo
      </h1>
      <p className="mt-4 text-lg text-fg-muted">
        Physiological takes on burnout, focus, stress, and money. Free chapters on the site. Full
        books on LitRes / Amazon.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#navigator"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          Symptom navigator (RU UI)
        </Link>
        <a
          href={siteData.links.amazonAuthor}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold"
        >
          Amazon author page
        </a>
      </div>
      <ul className="mt-12 space-y-3">
        {books.map((b) => (
          <li key={b.slug}>
            <Link href={`/books/${b.slug}/`} className="font-medium text-fg hover:text-accent">
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-10 inline-flex text-sm text-fg-muted hover:text-accent">
        ← Русская версия
      </Link>
    </div>
  );
}
