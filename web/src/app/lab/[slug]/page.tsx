import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLabArticle, getLabArticles, labHeadings } from "@/data/lab-articles";
import { LabArticleBody } from "@/components/lab/LabArticleBody";
import { LabProgress, LabToc } from "@/components/lab/LabReadingChrome";
import { getLocalizedBook } from "@/lib/books";
import { SITE_URL } from "@/lib/seo";
import { GRADE_META } from "@/components/lab/lab-grade";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLabArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getLabArticle(slug);
  if (!article) return { title: "Лаборатория" };
  return {
    title: article.title,
    description: article.dek,
    alternates: {
      canonical: `${SITE_URL}/lab/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.dek,
      url: `${SITE_URL}/lab/${article.slug}/`,
      type: "article",
    },
  };
}

export default async function LabArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getLabArticle(slug);
  if (!article || article.status !== "live") notFound();

  const headings = labHeadings(article);
  const book = article.bookSlug ? getLocalizedBook(article.bookSlug, "ru") : undefined;
  const others = getLabArticles().filter((a) => a.slug !== article.slug).slice(0, 3);
  const grade = GRADE_META[article.grade];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.published,
    inLanguage: "ru",
    author: { "@type": "Person", name: "Пол Грэк", url: SITE_URL },
    publisher: { "@type": "Person", name: "Пол Грэк", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/lab/${article.slug}/`,
  };

  return (
    <article className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LabProgress />

      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/lab/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Лаборатория
          </Link>
          <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {article.rubric}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-fg-muted">
            {article.dek}
          </p>
          <p className="mt-5 text-sm text-fg-muted">
            {article.minutes} минут чтения · уровень {article.grade} · {grade.title}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <div>
          <details className="mb-8 rounded-2xl border border-border bg-bg-elevated p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">Содержание</summary>
            <ol className="mt-3 space-y-2 text-sm">
              {headings.map((h, i) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-fg-muted hover:text-accent">
                    {i + 1}. {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <LabArticleBody article={article} />
        </div>
        <aside className="sticky top-24 hidden lg:block">
          <LabToc headings={headings} />
        </aside>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              Как читать LAB
            </p>
            <ol className="mt-4 max-w-2xl space-y-2 text-[15px] leading-relaxed text-fg-muted">
              <li>1. Что нового я понял о своём мозге?</li>
              <li>2. Что из этого можно проверить сегодня?</li>
              <li>3. Что я перестану делать уже завтра?</li>
            </ol>
          </div>

          {book && (
            <div className="max-w-2xl rounded-2xl border border-border bg-bg-elevated p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">
                Если нужно глубже
              </p>
              <p className="mt-2 font-display text-lg font-semibold">
                <Link href={`/books/${book.slug}/`} className="hover:text-accent">
                  {book.title}
                </Link>
              </p>
              <p className="mt-1 text-sm text-fg-muted">{book.subtitle}</p>
              <Link
                href={`/read/${book.slug}/`}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
              >
                Читать фрагмент бесплатно →
              </Link>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">
              Ещё в лаборатории
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/lab/${a.slug}/`}
                    className="block h-full rounded-2xl border border-border bg-bg-elevated p-4 transition hover:border-accent/40"
                  >
                    <p className="text-[11px] font-semibold tracking-wide text-accent uppercase">
                      {a.rubric}
                    </p>
                    <p className="mt-1 font-display font-semibold leading-snug">{a.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/lab/"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
            >
              Все материалы LAB →
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
