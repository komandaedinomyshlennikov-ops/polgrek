import Link from "next/link";
import { ArrowDown, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { ui } from "@/data/ui";

export function Hero({ locale = "ru" }: { locale?: Locale }) {
  const t = ui(locale).hero;
  const badge = locale === "en" ? t.badge : t.badgeRu;

  return (
    <section className="hero-grid-bg relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-bio uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-bio" aria-hidden />
            {badge}
          </p>
          <h1 className="font-display text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.75rem]">
            {t.h1}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {t.lead}
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
              href={lp(locale, "/books/")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-5 text-[15px] font-semibold text-fg transition hover:border-accent/40"
            >
              <BookOpen className="h-4 w-4 text-accent" aria-hidden />
              {t.ctaBooks}
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)]">
            <picture>
              <source type="image/webp" srcSet="/images/pol-grek-portrait.webp" />
              <img
                src="/images/pol-grek-portrait.jpg"
                alt={t.portraitAlt}
                className="h-full w-full object-cover"
                width={800}
                height={800}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80"
              aria-hidden
            />
            <div className="absolute right-0 bottom-0 left-0 p-5">
              <p className="font-display text-lg font-semibold text-fg">{t.portraitName}</p>
              <p className="text-sm text-fg-muted">{t.portraitLine}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
