import type { Metadata } from "next";
import Link from "next/link";
import { NeuroCheckup } from "@/components/lab/NeuroCheckup";
import { LabBeta } from "@/components/lab/LabBeta";
import { LabPrompts } from "@/components/lab/LabPrompts";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Лаборатория",
  description:
    "Цифровая песочница Пола Грэка: нейро-чек-ап, бета-протоколы, ИИ-промпты. Эксперименты без эзотерики.",
  alternates: { canonical: `${SITE_URL}/lab/` },
  openGraph: {
    title: "Лаборатория Пола Грэка",
    description: "Нейро-чек-ап, протоколы и ИИ-шаблоны. EXPERIMENTAL ZONE.",
    url: `${SITE_URL}/lab/`,
  },
};

const JUMP = [
  { href: "#checkup", label: "Чек-ап" },
  { href: "#beta", label: "Бета" },
  { href: "#prompts", label: "ИИ-промпты" },
];

export default function LabPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-border bg-gradient-to-b from-accent-soft/30 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <span className="inline-flex items-center rounded-full border border-bio/30 bg-bio-soft px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-bio uppercase">
            Experimental zone
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Лаборатория Пола Грэка
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Песочница: нейро-протоколы, ИИ-шаблоны, полевые тесты. Не архив статей и не «просто
            соберись».
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
            <Link
              href="/books/"
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-sm font-medium text-fg-muted transition hover:border-accent/40 hover:text-fg"
            >
              Книги
            </Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <NeuroCheckup />
        <LabBeta />
        <LabPrompts />
      </div>
    </div>
  );
}
