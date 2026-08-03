import type { Metadata } from "next";
import { BooksShowcase } from "@/components/BooksShowcase";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Books by Pol Grek",
  description:
    "Pol Grek catalog: Mental Debug, Brain on 100+, biohacking, EI 2.0, RESET, Wired for Wealth. Free samples · Amazon / LitRes.",
  alternates: {
    canonical: `${SITE_URL}/en/books/`,
    languages: {
      ru: `${SITE_URL}/books/`,
      en: `${SITE_URL}/en/books/`,
      "x-default": `${SITE_URL}/books/`,
    },
  },
  openGraph: {
    locale: "en_US",
    title: "Books by Pol Grek",
    description: "Practical neuroscience and cognitive rewiring. Catalog + free samples.",
    url: `${SITE_URL}/en/books/`,
  },
};

export default function EnBooksPage() {
  return (
    <div className="pt-4">
      <BooksShowcase mode="all" locale="en" />
    </div>
  );
}
