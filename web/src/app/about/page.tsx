import type { Metadata } from "next";
import Link from "next/link";
import { AuthorBlock } from "@/components/AuthorBlock";

export const metadata: Metadata = {
  title: "Об авторе",
  description:
    "Пол Грэк — автор научпопа о мозге без эзотерики. 13+ книг, уровни A–D, главы бесплатно.",
  alternates: { canonical: "https://polgrek.site/about/" },
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <nav className="mb-6 text-sm text-fg-muted">
          <Link href="/" className="hover:text-accent">
            На главную
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-fg">Об авторе</span>
        </nav>
      </div>
      <AuthorBlock />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-xl font-semibold">Подход</h2>
        <div className="mt-4 space-y-4 text-fg-muted">
          <p>
            Материалы носят образовательный характер и не заменяют консультацию врача или
            психотерапевта. При острых состояниях — к специалистам.
          </p>
          <p>
            На сайте можно прочитать фрагменты. Оплата — только на Литрес (и Amazon для EN). Партнёрские
            ссылки помечены erid.
          </p>
        </div>
        <Link
          href="/#navigator"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          Подобрать книгу под симптомы →
        </Link>
      </div>
    </div>
  );
}
