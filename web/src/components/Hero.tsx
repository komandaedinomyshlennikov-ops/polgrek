import Link from "next/link";
import { ArrowDown, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { DEFAULT_SAMPLE_SLUG, home } from "@/data/home";

export function Hero({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).hero;

  return (
    <section
      className="hero-grid-bg relative flex flex-col justify-center overflow-hidden border-b border-border"
      style={{ minHeight: "calc(100dvh - 4rem)" }}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.7rem]">
          {t.h1}
        </h1>
        <p className="mt-4 max-w-xl font-display text-lg font-medium leading-snug text-fg sm:text-xl">
          {t.dek}
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
          {t.lead}
        </p>

        <figure className="mt-8 rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-6">
          <figcaption className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.sceneEyebrow}
          </figcaption>
          <blockquote className="mt-3 font-reader text-[1.05rem] leading-relaxed text-pretty text-fg sm:text-[1.125rem]">
            {t.scene}
          </blockquote>
        </figure>

        <p className="mt-6 font-display text-lg font-semibold text-fg">{t.familiar}</p>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
          {t.why}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={lp(locale, "/#navigator")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
          >
            {t.ctaNav}
            <ArrowDown className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={lp(locale, `/read/${DEFAULT_SAMPLE_SLUG}/`)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-5 text-[15px] font-semibold text-fg transition hover:border-accent/40"
          >
            <BookOpen className="h-4 w-4 text-accent" aria-hidden />
            {t.ctaRead}
          </Link>
        </div>

        <p className="mt-6 text-sm text-fg-muted">{t.proof}</p>
        <p className="mt-1 text-sm font-semibold tracking-wide text-fg">{t.sign}</p>
      </div>
    </section>
  );
}
