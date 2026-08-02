import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Лаборатория",
  description: "Короткие заметки о мозге: стресс, сон, дофамин, выгорание — без хайпа.",
  alternates: { canonical: "https://polgrek.site/lab/" },
};

export default function LabPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold tracking-wide text-accent uppercase">Лаборатория</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Короткие заметки — без «просто возьми себя в руки»
      </h1>
      <p className="mt-4 text-fg-muted">
        Полный архив лаборатории мигрирует в новую версию сайта. Пока — навигатор состояний и главы
        книг дают тот же формат: факт → ход → книга.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#navigator"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          Нейро-навигатор
        </Link>
        <Link
          href="/books/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold"
        >
          Каталог книг
        </Link>
      </div>
    </div>
  );
}
