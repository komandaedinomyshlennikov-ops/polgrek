import type { Metadata } from "next";
import Link from "next/link";
import { AuthorBlock } from "@/components/AuthorBlock";
import { defaultOg, OG_IMAGE, SITE_URL } from "@/lib/seo";
import { ui } from "@/data/ui";

const title = "About — Pol Grek";
const description =
  "Pol Grek — brain science without the woo. 13+ books, evidence grades A–D, free samples. Mechanics, not “just try harder.”";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: `${SITE_URL}/en/about/`,
    languages: {
      ru: `${SITE_URL}/about/`,
      en: `${SITE_URL}/en/about/`,
      "x-default": `${SITE_URL}/about/`,
    },
  },
  openGraph: {
    ...defaultOg,
    locale: "en_US",
    type: "profile",
    title,
    description,
    url: `${SITE_URL}/en/about/`,
    images: [
      {
        url: `${SITE_URL}/images/pol-grek-portrait.webp`,
        width: 800,
        height: 800,
        alt: "Pol Grek",
      },
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pol Grek — brain science without the woo",
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

export default function EnAboutPage() {
  const t = ui("en").about;
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <nav className="mb-6 text-sm text-fg-muted">
          <Link href="/en/" className="hover:text-accent">
            {t.crumbHome}
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-fg">{t.crumbHere}</span>
        </nav>
      </div>
      <AuthorBlock showMoreLink={false} locale="en" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm text-fg-muted">{t.note}</p>
        <Link
          href="/en/#navigator"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
