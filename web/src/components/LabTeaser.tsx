import Link from "next/link";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { home } from "@/data/home";

export function LabTeaser({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).lab;

  return (
    <section id="lab-home" className="border-b border-border bg-surface/40 py-16 sm:py-24">
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

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted">
                  {item.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href={lp(locale, "/lab/")}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
