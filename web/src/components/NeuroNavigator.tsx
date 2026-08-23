import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAVIGATOR } from "@/lib/navigator";
import { getLocalizedBook } from "@/lib/books";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { home } from "@/data/home";

export function NeuroNavigator({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).navigator;

  return (
    <section id="navigator" className="scroll-mt-20 border-b border-border bg-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
            {t.lead}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAVIGATOR.map((cat) => {
            const book = getLocalizedBook(cat.bookSlug, locale);
            const scene = locale === "en" ? cat.sceneEn : cat.scene;
            const label = locale === "en" ? cat.labelEn : cat.label;
            if (!book) return null;
            return (
              <li key={cat.id}>
                <Link
                  href={lp(locale, `/books/${book.slug}/`)}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
                >
                  <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                    {label}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {scene}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    → «{book.title}»
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
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
