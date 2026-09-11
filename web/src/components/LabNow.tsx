import Link from "next/link";
import { getLabArticles } from "@/data/lab-articles";
import { lp } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export function LabNow({ locale = "ru" }: { locale?: Locale }) {
  const article = getLabArticles()[0];
  if (!article) return null;

  return (
    <section className="reveal border-b border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-l-2 border-accent bg-bg-elevated/80 p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
            {locale === "en" ? "Today in the lab" : "Сегодня в LAB"}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            {article.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-pretty text-fg-muted">
            {article.dek}
          </p>
          <Link
            href={lp(locale, `/lab/${article.slug}/`)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {locale === "en" ? "Read →" : "Разобраться →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
