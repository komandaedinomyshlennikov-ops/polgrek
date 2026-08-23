import Link from "next/link";
import type { Locale } from "@/lib/types";
import { lp } from "@/lib/locale";
import { home } from "@/data/home";

export function AuthorBlock({
  showMoreLink = true,
  locale = "ru",
}: {
  showMoreLink?: boolean;
  locale?: Locale;
}) {
  const t = home(locale).author;

  return (
    <section id="author" className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mx-auto aspect-square max-w-[280px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] lg:mx-0">
            <picture>
              <source type="image/webp" srcSet="/images/pol-grek-portrait.webp" />
              <img
                src="/images/pol-grek-portrait.jpg"
                alt={t.portraitAlt}
                className="h-full w-full object-cover"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {t.title}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
            <p className="font-medium text-fg">{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
            <p>{t.p4}</p>
          </div>
          {showMoreLink && (
            <Link
              href={lp(locale, "/about/")}
              className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              {t.more} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
