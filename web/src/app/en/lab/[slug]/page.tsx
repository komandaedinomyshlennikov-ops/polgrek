import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabArticle, getLabArticles } from "@/data/lab-articles";
import { SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLabArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getLabArticle(slug);
  if (!article) return { title: "Lab" };
  return {
    title: article.title,
    description: article.dek,
    alternates: {
      canonical: `${SITE_URL}/lab/${article.slug}/`,
      languages: {
        ru: `${SITE_URL}/lab/${article.slug}/`,
        en: `${SITE_URL}/en/lab/${article.slug}/`,
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function EnLabArticleBridge({ params }: Props) {
  const { slug } = await params;
  const article = getLabArticle(slug);
  if (!article || article.status !== "live") notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{article.rubric}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-fg-muted">{article.dek}</p>
      <p className="mt-6 leading-relaxed text-fg-muted">
        This lab essay is written in Russian — the language of the readers it was made for.
      </p>
      <Link
        href={`/lab/${article.slug}/`}
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
      >
        Read in Russian →
      </Link>
    </div>
  );
}
