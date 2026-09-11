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
    <section id={id} className="reveal scroll-mt-20 border-b border-border bg-surface/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
            {locale === "en" ? "Start here" : "С чего начать"}
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-fg sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-pretty text-fg-muted">{lead}</p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_DOORS.map((door, i) => {
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
                  className="card-lift group flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6"
                >
                  <span className="font-display text-sm tabular-nums text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium leading-snug text-fg">
                    {label}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {scene}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {article
                      ? locale === "en"
                        ? `Essay → ${book.title}`
                        : `Разбор → «${book.title}»`
                      : `→ «${book.title}»`}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
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
