import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const PRINCIPLES = [
  {
    t: "Без мотивационной шелухи",
    d: "Не «просто соберись» — физиология, биохимия и нейронные сети.",
  },
  {
    t: "Схемы вместо сухой теории",
    d: "Наглядные опоры и протоколы, которые можно проверить на себе.",
  },
  {
    t: "Честный тест-драйв",
    d: "Первые главы — бесплатно на сайте. Книга — только если зайдёт.",
  },
];

export function AuthorBlock() {
  return (
    <section id="author" className="border-b border-border bg-surface/40 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mx-auto aspect-square max-w-[280px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] lg:mx-0">
            <picture>
              <source type="image/webp" srcSet="/images/pol-grek-portrait.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pol-grek-portrait.jpg"
                alt="Пол Грэк"
                width={800}
                height={800}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Об авторе и методологии
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Пол Грэк — научпоп о мозге без воды
          </h2>
          <p className="mt-4 max-w-2xl text-fg-muted">
            Исследователь и автор 13+ книг по нейробиологии. Разбирает выгорание, фокус, стресс и
            деньги как систему сигналов — с уровнями доказательности A–D, без эзотерики и хайпа
            ленты.
          </p>
          <ul className="mt-6 space-y-4">
            {PRINCIPLES.map((p) => (
              <li key={p.t} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-bio" aria-hidden />
                <div>
                  <p className="font-semibold text-fg">{p.t}</p>
                  <p className="text-sm text-fg-muted">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/about/"
            className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
          >
            Подробнее об авторе →
          </Link>
        </div>
      </div>
    </section>
  );
}
