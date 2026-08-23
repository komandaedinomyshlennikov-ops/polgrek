import Link from "next/link";
import { ArrowDown, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { DEFAULT_SAMPLE_SLUG, home } from "@/data/home";

export function HomeCta({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).cta;

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
          {t.body}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={lp(locale, "/#navigator")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
          >
            {t.nav}
            <ArrowDown className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={lp(locale, `/read/${DEFAULT_SAMPLE_SLUG}/`)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-5 text-[15px] font-semibold text-fg transition hover:border-accent/40"
          >
            <BookOpen className="h-4 w-4 text-accent" aria-hidden />
            {t.read}
          </Link>
        </div>
      </div>
    </section>
  );
}
