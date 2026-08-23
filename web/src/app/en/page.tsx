import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Recognize } from "@/components/Recognize";
import { NeuroNavigator } from "@/components/NeuroNavigator";
import { AuthorBlock } from "@/components/AuthorBlock";
import { HomeBooks } from "@/components/HomeBooks";
import { Philosophy } from "@/components/Philosophy";
import { LabTeaser } from "@/components/LabTeaser";
import { ThreadsBlock } from "@/components/ThreadsBlock";
import { HomeCta } from "@/components/HomeCta";
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

export default function EnHomePage() {
  return (
    <>
      <Hero locale="en" />
      <Recognize locale="en" />
      <NeuroNavigator locale="en" />
      <AuthorBlock locale="en" />
      <HomeBooks locale="en" />
      <Philosophy locale="en" />
      <LabTeaser locale="en" />
      <ThreadsBlock locale="en" />
      <HomeCta locale="en" />
    </>
  );
}
