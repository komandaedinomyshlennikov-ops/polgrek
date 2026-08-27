import Link from "next/link";
import { getLabArticles } from "@/data/lab-articles";
import { lp } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export function LabNow({ locale = "ru" }: { locale?: Locale }) {
  const article = getLabArticles()[0];
  if (!article) return null;

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-[var(--shadow)] sm:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Сегодня в LAB
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {article.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            {article.dek}
          </p>
          <Link
            href={lp(locale, `/lab/${article.slug}/`)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Разобраться →
          </Link>
        </div>
      </div>
    </section>
  );
}
