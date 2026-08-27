import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROBLEM_DOORS } from "@/data/problems";
import { getLabArticle } from "@/data/lab-articles";
import { getLocalizedBook } from "@/lib/books";
import { lp } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export function ProblemDoors({
  locale = "ru",
  title = "Что сейчас происходит с вами?",
  lead = "Не выбирайте книгу по обложке. Выберите состояние. Дальше — короткий разбор и, если нужно, глава.",
  id = "navigator",
}: {
  locale?: Locale;
  title?: string;
  lead?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border bg-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            С чего начать
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
            {lead}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_DOORS.map((door) => {
            const book = getLocalizedBook(door.bookSlug, locale);
            const article = door.articleSlug ? getLabArticle(door.articleSlug) : undefined;
            const href = article
              ? lp(locale, `/lab/${article.slug}/`)
              : lp(locale, `/books/${door.bookSlug}/`);
            if (!book) return null;
            const label = locale === "en" ? door.labelEn : door.label;
            const scene = locale === "en" ? door.sceneEn : door.scene;
            return (
              <li key={door.id}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
                >
                  <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                    {label}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {scene}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-accent">
                    {article ? (
                      <span className="inline-flex items-center gap-1.5">
                        Разбор → «{book.title}»
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        → «{book.title}»
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
