import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";
import { about } from "@/data/about";
import { defaultOg, OG_IMAGE, SITE_URL } from "@/lib/seo";

const t = about("en");

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
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
    title: `${t.h1} — ${t.metaTitle}`,
    description: t.metaDesc,
    url: `${SITE_URL}/en/about/`,
    images: [
      {
        url: `${SITE_URL}/images/pol-grek-portrait.webp`,
        width: 800,
        height: 800,
        alt: t.portraitAlt,
      },
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: t.h1,
      },
    ],
  },
};

export default function EnAboutPage() {
  return <AboutView locale="en" />;
}
