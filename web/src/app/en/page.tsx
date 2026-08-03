import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { NeuroNavigator } from "@/components/NeuroNavigator";
import { BooksShowcase } from "@/components/BooksShowcase";
import { ThreadsBlock } from "@/components/ThreadsBlock";
import { SITE_URL } from "@/lib/seo";
import { ui } from "@/data/ui";

const t = ui("en").meta;

export const metadata: Metadata = {
  title: { absolute: t.siteTitle },
  description: t.siteDesc,
  alternates: {
    canonical: `${SITE_URL}/en/`,
    languages: {
      ru: `${SITE_URL}/`,
      en: `${SITE_URL}/en/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    locale: "en_US",
    title: t.siteTitle,
    description: t.siteDesc,
    url: `${SITE_URL}/en/`,
  },
};

/**
 * EN home funnel (parity with RU):
 * Hero → Navigator → Books → Threads
 */
export default function EnHomePage() {
  return (
    <>
      <Hero locale="en" />
      <NeuroNavigator locale="en" />
      <BooksShowcase mode="flagships" locale="en" />
      <ThreadsBlock locale="en" />
    </>
  );
}
