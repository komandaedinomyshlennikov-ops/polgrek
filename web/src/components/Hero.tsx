import Link from "next/link";
import { ArrowDown, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-grid-bg relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-bio uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-bio" aria-hidden />
            13+ книг · уровни A–D
          </p>
          <h1 className="font-display text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.75rem]">
            Нейробиология без эзотерики. Как устроен ваш мозг и как вернуть ему ресурс.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Выгорание, тревога, фокус — как система, не как «характер». Сначала глава на сайте,
            покупка только если зайдёт.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#navigator"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
            >
              Подобрать книгу под симптомы
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/books/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-5 text-[15px] font-semibold text-fg transition hover:border-accent/40"
            >
              <BookOpen className="h-4 w-4 text-accent" aria-hidden />
              Читать фрагменты бесплатно
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)]">
            <picture>
              <source type="image/webp" srcSet="/images/pol-grek-portrait.webp" />
              <img
                src="/images/pol-grek-portrait.jpg"
                alt="Пол Грэк — автор научпопа о мозге"
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
              <p className="font-display text-lg font-semibold text-fg">Пол Грэк</p>
              <p className="text-sm text-fg-muted">Механика мозга, не «просто соберись»</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
