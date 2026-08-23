import type { Metadata } from "next";
import Link from "next/link";
import { NeuroCheckup } from "@/components/lab/NeuroCheckup";
import { LabBeta } from "@/components/lab/LabBeta";
import { LabPrompts } from "@/components/lab/LabPrompts";
import { GRADE_META } from "@/components/lab/lab-grade";
import {
  getLabArticles,
  LAB_EXPERIMENTS,
  LAB_MYTHS,
  LAB_PATH,
} from "@/data/lab-articles";
import { SITE_URL } from "@/lib/seo";
import type { EvidenceGrade } from "@/data/lab-types";
import { DonateLink } from "@/components/DonateLink";

export const metadata: Metadata = {
  title: "Лаборатория",
  description:
    "Научная лаборатория повседневной жизни. Почему мозг делает именно так — и что с этим можно сделать уже сегодня.",
  alternates: {
    canonical: `${SITE_URL}/lab/`,
    languages: {
      ru: `${SITE_URL}/lab/`,
      en: `${SITE_URL}/en/lab/`,
      "x-default": `${SITE_URL}/lab/`,
    },
  },
  openGraph: {
    title: "Лаборатория Пола Грэка",
    description:
      "Не архив статей. Место, где знания превращаются в навык: наблюдение, механика, эксперимент, доказательства.",
    url: `${SITE_URL}/lab/`,
  },
};

const GRADES: EvidenceGrade[] = ["A", "B", "C", "D"];

export default function LabPage() {
  const articles = getLabArticles();

  return (
    <div className="pb-16">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="inline-flex items-center rounded-full border border-bio/30 bg-bio-soft px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-bio uppercase">
            Бесплатно
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Лаборатория Пола Грэка
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-fg-muted">
            Место, где знания превращаются в навык, а научные исследования — в понятные решения
            для обычной жизни.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Здесь нет новостного шума, мотивационных цитат и статей ради просмотров. Только один
            вопрос: почему мозг делает именно так — и что с этим можно сделать уже сегодня?
          </p>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Что такое LAB?
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">
            <p>Большинство людей не испытывают недостатка в информации. Они испытывают недостаток в ясности.</p>
            <p>
              Мы читаем десятки советов о сне, стрессе, памяти и привычках, но через неделю помним
              лишь отдельные фразы. Знание остаётся в голове, а жизнь не меняется.
            </p>
            <p className="font-medium text-fg">Лаборатория создана для другого. Каждый материал проходит одинаковый путь:</p>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                [LAB_PATH.observe, "Реальная ситуация, в которой узнаёт себя почти каждый."],
                [LAB_PATH.mechanics, "Короткое объяснение без сложных терминов и псевдонауки."],
                [LAB_PATH.experiment, "Практика на 5–15 минут, которую можно проверить на себе."],
                [LAB_PATH.evidence, "Уровень силы исследований. Если данных мало — так и пишем."],
              ] as const
            ).map(([title, body], i) => (
              <li
                key={title}
                className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)]"
              >
                <p className="text-xs font-semibold tabular-nums text-accent">0{i + 1}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-fg">
            Моя задача — не убедить вас поверить мне. Моя задача — дать инструмент, который можно
            проверить собственной жизнью.
          </p>
        </div>
      </section>

      <section id="start" className="scroll-mt-20 border-b border-border bg-surface/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Начните с того, что болит сейчас
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Не ищите интересную тему. Начните с состояния, которое сильнее всего забирает силы.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/lab/${a.slug}/`}
                  className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)] transition hover:border-accent/40 sm:p-6"
                >
                  <p className="text-xs font-semibold tracking-[0.12em] text-accent uppercase">
                    {a.rubric}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-fg-muted">
                    {a.dek}
                  </p>
                  <p className="mt-4 text-sm text-fg-muted">{a.minutes} минут чтения</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="myths" className="scroll-mt-20 border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Разрушители мифов
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Не всё, что повторяют тысячи раз, становится правдой
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Каждую неделю появляются новые советы: пить определённые добавки, просыпаться в 5 утра,
            принимать холодный душ или покупать очередной «ноотроп». В лаборатории мы проверяем
            подобные утверждения по одному критерию: что показывают исследования?
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {LAB_MYTHS.map((m) => (
              <li
                key={m.title}
                className="rounded-2xl border border-dashed border-border bg-bg-elevated p-5"
              >
                <p className="text-[11px] font-semibold tracking-wide text-fg-muted uppercase">
                  Скоро в LAB
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experiments" className="scroll-mt-20 border-b border-border bg-surface/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Мини-эксперименты
          </h2>
          <p className="mt-2 font-display text-lg text-fg">Не читайте. Проверяйте.</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Самые полезные изменения редко требуют месяца подготовки. Иногда достаточно одного
            вечера без информационного потока, чтобы заметить, насколько громко обычно работает мозг.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {LAB_EXPERIMENTS.map((e) => (
              <li
                key={e.id}
                id={e.id}
                className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)]"
              >
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Как читать материалы LAB
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Не пытайтесь запомнить всё. Ошибка большинства образовательных проектов — дать человеку
            как можно больше информации. Моя цель противоположная. После каждого материала достаточно
            ответить на три вопроса:
          </p>
          <ol className="mt-6 max-w-xl space-y-3 font-display text-lg font-medium">
            <li>1. Что нового я понял о своём мозге?</li>
            <li>2. Что из этого можно проверить сегодня?</li>
            <li>3. Что я перестану делать уже завтра?</li>
          </ol>
          <p className="mt-6 text-[15px] text-fg-muted">Именно так знание становится навыком.</p>
        </div>
      </section>

      <section className="border-b border-border bg-surface/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Оценка силы доказательств
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-pretty text-fg-muted">
            Чтобы вы понимали, насколько надёжны выводы, каждый материал получает уровень
            доказательности. Если доказательств мало — я так и пишу. Наука начинается с честности, а
            не с уверенности.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GRADES.map((g) => (
              <li key={g} className="rounded-2xl border border-border bg-bg-elevated p-5">
                <p className="font-display text-3xl font-semibold">{g}</p>
                <p className="mt-2 text-sm font-medium leading-snug">{GRADE_META[g].title}</p>
                <p className="mt-2 text-sm text-fg-muted">{GRADE_META[g].body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Лучшие книги начинаются с одного вопроса
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-fg-muted">
            Почти каждая глава моих книг сначала была короткой заметкой в лаборатории. Здесь
            рождаются идеи, проверяются гипотезы и появляются материалы, которые позже становятся
            книгами. Если вам близок такой способ изучать мозг — добро пожаловать.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="#start"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
            >
              Читать все материалы LAB
            </a>
            <Link
              href="/books/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong px-5 text-sm font-semibold"
            >
              Вернуться к книгам
            </Link>
          </div>
          <DonateLink className="mt-6" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">
          Инструменты
        </p>
        <NeuroCheckup />
        <LabBeta />
        <LabPrompts />
      </div>
    </div>
  );
}
