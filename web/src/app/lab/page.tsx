import type { Metadata } from "next";
import Link from "next/link";
import { NeuroCheckup } from "@/components/lab/NeuroCheckup";
import { LabBeta } from "@/components/lab/LabBeta";
import { LabPrompts } from "@/components/lab/LabPrompts";
import { LabProgress } from "@/components/lab/LabProgress";
import { LabAudio } from "@/components/lab/LabAudio";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Лаборатория",
  description:
    "Цифровая песочница Пола Грэка: нейро-чек-ап, бета-протоколы, ИИ-промпты, live-прогресс. Эксперименты без эзотерики.",
  alternates: { canonical: `${SITE_URL}/lab/` },
  openGraph: {
    title: "Лаборатория Пола Грэка",
    description:
      "Полевые испытания нейро-протоколов, ИИ-шаблоны и закрытые черновики. EXPERIMENTAL ZONE.",
    url: `${SITE_URL}/lab/`,
  },
};

const JUMP = [
  { href: "#checkup", label: "Чек-ап" },
  { href: "#beta", label: "Бета" },
  { href: "#prompts", label: "ИИ-промпты" },
  { href: "#progress", label: "Прогресс" },
  { href: "#audio", label: "Мысль дня" },
];

export default function LabPage() {
  return (
    <div className="pb-16">
      {/* Header / experimental zone */}
      <section className="border-b border-border bg-gradient-to-b from-accent-soft/30 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <span className="inline-flex items-center rounded-full border border-bio/30 bg-bio-soft px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-bio uppercase">
            Experimental zone
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Лаборатория Пола Грэка
          </h1>
          <p className="lab-intro mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Полевые испытания нейро-протоколов, закрытые черновики и эксперименты на стыке
            когнитивных наук и ИИ. Не список сухих статей —{" "}
            <strong className="font-medium text-fg">цифровая песочница</strong>. Без аромапалочек и
            «просто соберись».
          </p>

          <nav
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Разделы лаборатории"
          >
            {JUMP.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-sm font-medium text-fg-muted transition hover:border-accent/40 hover:text-fg"
              >
                {j.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <NeuroCheckup />
        <LabBeta />
        <LabPrompts />
        <LabProgress />
        <LabAudio />

        <div className="rounded-2xl border border-border bg-bg-elevated p-6 text-center sm:p-8">
          <p className="font-display text-lg font-semibold">Нужна полка, не песочница?</p>
          <p className="mt-2 text-sm text-fg-muted">
            Каталог книг и бесплатные главы — отдельный контур. Лаборатория — для гипотез.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/books/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
            >
              Каталог книг
            </Link>
            <Link
              href="/#navigator"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold"
            >
              Нейро-навигатор
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
