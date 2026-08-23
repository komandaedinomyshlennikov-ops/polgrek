import type { Metadata } from "next";
import Link from "next/link";
import { AuthorBlock } from "@/components/AuthorBlock";
import { defaultOg, OG_IMAGE, SITE_URL } from "@/lib/seo";

const title = "Об авторе — Пол Грэк";
const description =
  "Пол Грэк — автор научпопа о мозге без эзотерики. 13+ книг, уровни A–D, главы бесплатно. Механика, не «просто соберись».";

export const metadata: Metadata = {
  title: "Об авторе",
  description,
  alternates: {
    canonical: `${SITE_URL}/about/`,
    languages: {
      ru: `${SITE_URL}/about/`,
      en: `${SITE_URL}/en/about/`,
      "x-default": `${SITE_URL}/about/`,
    },
  },
  openGraph: {
    ...defaultOg,
    type: "profile",
    title,
    description,
    url: `${SITE_URL}/about/`,
    images: [
      {
        url: `${SITE_URL}/images/pol-grek-portrait.webp`,
        width: 800,
        height: 800,
        alt: "Пол Грэк",
      },
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Пол Грэк — нейробиология без эзотерики",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
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
      <AuthorBlock showMoreLink={false} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm text-fg-muted">
          Материалы образовательные, не замена врачу. Оплата — на Литрес / Amazon; партнёрские ссылки
          с erid.
        </p>
        <Link
          href="/#navigator"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          Выбрать первую книгу →
        </Link>
      </div>
    </div>
  );
}
