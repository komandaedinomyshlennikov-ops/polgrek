import type { Locale } from "@/lib/types";
import { home } from "@/data/home";

export function Recognize({ locale = "ru" }: { locale?: Locale }) {
  const t = home(locale).recognize;

  return (
    <section id="recognize" className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
            {t.title}
          </h2>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] sm:p-6"
            >
              <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-pretty text-fg-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl font-display text-base font-medium leading-relaxed text-fg sm:text-lg">
          {t.close}
        </p>
      </div>
    </section>
  );
}
