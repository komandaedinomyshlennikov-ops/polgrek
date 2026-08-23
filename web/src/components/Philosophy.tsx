import type { Locale } from "@/lib/types";
import { home } from "@/data/home";

export function Philosophy({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).philosophy;

  return (
    <section id="philosophy" className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {t.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
          {t.h}
        </h2>
        <div className="mt-6 space-y-4 font-reader text-[1.05rem] leading-relaxed text-pretty text-fg-muted sm:text-lg">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
        <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
          {t.h2}
        </h3>
        <p className="mt-4 font-reader text-[1.05rem] leading-relaxed text-pretty text-fg-muted sm:text-lg">
          {t.p3}
        </p>
      </div>
    </section>
  );
}
