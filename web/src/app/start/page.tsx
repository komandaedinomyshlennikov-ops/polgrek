import type { Metadata } from "next";
import Link from "next/link";
import { ProblemDoors } from "@/components/ProblemDoors";
import { LabNow } from "@/components/LabNow";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "С чего начать",
  description:
    "Если вы пришли после поста Пола Грэка — продолжение здесь. Выберите состояние: усталость, внимание, стресс, сон, ясность с возрастом.",
  alternates: { canonical: `${SITE_URL}/start/` },
};

export default function StartPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            polgrek.site/start
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Если вы пришли после поста — продолжение здесь.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-fg-muted">
            Не каталог из 13 книг. Сначала узнайте себя. Потом короткий разбор. Потом глава — если
            голос зайдёт.
          </p>
          <Link
            href="/lab/"
            className="mt-8 inline-flex min-h-12 items-center text-sm font-semibold text-accent hover:underline"
          >
            Или сразу в лабораторию →
          </Link>
        </div>
      </section>
      <ProblemDoors
        id="start-doors"
        title="С чего начать именно вам"
        lead="Шесть входов. Каждый ведёт к разбору или к книге — не на общую полку."
      />
      <LabNow />
    </div>
  );
}
