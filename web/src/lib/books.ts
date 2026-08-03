import site from "@/data/site.json";
import { localizeBook } from "@/data/books-en";
import type { Book, Locale, SiteData } from "./types";

export const siteData = site as SiteData;

export function getLocalizedBooks(locale: Locale = "ru"): Book[] {
  return siteData.books.map((b) => localizeBook(b, locale));
}

export function getLocalizedBook(slug: string, locale: Locale = "ru"): Book | undefined {
  const b = getBook(slug);
  return b ? localizeBook(b, locale) : undefined;
}

export function getBooks(): Book[] {
  return siteData.books;
}

export function getBook(slug: string): Book | undefined {
  return siteData.books.find((b) => b.slug === slug);
}

export function getFlagships(): Book[] {
  const order = [
    "mentalnyy-debag",
    "mozg-na-100",
    "biohacking-mozga",
    "ei-2",
    "zhenskiy-mozg",
    "reset",
  ];
  const by = Object.fromEntries(siteData.books.map((b) => [b.slug, b]));
  const list = order.map((s) => by[s]).filter(Boolean);
  if (list.length >= 3) return list.slice(0, 6);
  return siteData.books.filter((b) => b.flagship).slice(0, 6);
}

export function coverUrl(book: Book, size: "full" | "thumb" = "full"): string {
  if (size === "thumb") {
    const base = book.coverFile.replace(/\.(webp|jpg|png)$/i, "");
    return `/covers/thumbs/${base}-w280.webp`;
  }
  return `/covers/${book.coverFile.replace(/\.jpg$/i, ".webp")}`;
}

export function affiliateUrl(book: Book): string {
  const by = siteData.affiliate?.bySlug?.[book.slug];
  if (by) return by;
  const clean = (book.buyUrl || "").split("?")[0];
  if (!clean || !siteData.affiliate?.enabled) return clean || siteData.links.litresAuthor;
  return siteData.affiliate.template
    .replace("{url}", clean)
    .replace("{url_enc}", encodeURIComponent(clean))
    .replace("{sub1}", book.slug);
}

export function amazonUrl(book: Book): string {
  return book.amazon || siteData.links.amazonAuthor;
}

/** Author profile on LitRes with AdvCake sub1=author when enabled */
export function litresAuthorUrl(): string {
  const clean = (siteData.links.litresAuthor || "https://www.litres.ru/author/pol-grek/").split(
    "?"
  )[0];
  if (!siteData.affiliate?.enabled || !siteData.affiliate.template) return clean;
  const sub1 = siteData.affiliate.authorSub1 || "author";
  return siteData.affiliate.template
    .replace("{url}", clean)
    .replace("{url_enc}", encodeURIComponent(clean))
    .replace("{sub1}", sub1);
}

/** Catalog shelves (LitRes / KDP topics) — order for /books */
export const CATALOG_SHELVES: Array<{
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  emoji: string;
  slugs: string[];
}> = [
  {
    id: "neuro",
    title: "Нейробиология и когнитивные практики",
    titleEn: "Neuroscience & cognitive practice",
    subtitle: "Фокус, стресс, биохакинг, эмоции — механика, не «просто соберись»",
    subtitleEn: "Focus, stress, biohacking, emotion — mechanics, not “just try harder”",
    emoji: "🧠",
    slugs: [
      "mentalnyy-debag",
      "mozg-na-100",
      "biohacking-mozga",
      "ei-2",
      "zhenskiy-mozg",
      "muzhskoy-mozg",
      "stress-i-mozg",
      "anatomiya-energii",
      "ostorozhnyy-biohaker",
    ],
  },
  {
    id: "money-reset",
    title: "Деньги, мышление и перезапуск",
    titleEn: "Money, mindset & reset",
    subtitle: "Wired for Wealth · RESET · Sacred Hours — внешний порядок и ресурс",
    subtitleEn: "Wired for Wealth · RESET · Sacred Hours — external order and capacity",
    emoji: "💰",
    slugs: [
      "snachala-dengi-potom-soznanie",
      "mozg-i-dengi",
      "reset",
      "svyashchennye-chasy",
    ],
  },
];

export function getCatalogShelves(locale: Locale = "ru") {
  return CATALOG_SHELVES.map((s) => ({
    id: s.id,
    emoji: s.emoji,
    slugs: s.slugs,
    title: locale === "en" ? s.titleEn : s.title,
    subtitle: locale === "en" ? s.subtitleEn : s.subtitle,
  }));
}

export function getBooksByShelf(shelfId: string, locale: Locale = "ru"): Book[] {
  const shelf = CATALOG_SHELVES.find((s) => s.id === shelfId);
  if (!shelf) return [];
  const by = Object.fromEntries(getLocalizedBooks(locale).map((b) => [b.slug, b]));
  return shelf.slugs.map((s) => by[s]).filter(Boolean);
}

export function getFlagshipsLocalized(locale: Locale = "ru"): Book[] {
  return getFlagships().map((b) => localizeBook(b, locale));
}

/** EN title aliases (KDP) for display */
export function internationalTitle(book: Book): string | null {
  const map: Record<string, string> = {
    "mozg-na-100": "Brain on 100+",
    "mozg-i-dengi": "Wired for Wealth",
    "svyashchennye-chasy": "Sacred Hours",
    reset: "RESET",
  };
  return map[book.slug] || null;
}

export function tagLabel(tag: string, locale: "ru" | "en" = "ru"): string {
  const ru: Record<string, string> = {
    "когнитивное-здоровье": "Фокус",
    биохакинг: "Биохакинг",
    энергия: "Энергия",
    стресс: "Стресс",
    выгорание: "Выгорание",
    деньги: "Деньги",
    гормоны: "Гормоны",
    лора: "с Лорой",
  };
  const en: Record<string, string> = {
    "когнитивное-здоровье": "Focus",
    биохакинг: "Biohacking",
    энергия: "Energy",
    стресс: "Stress",
    выгорание: "Burnout",
    деньги: "Money",
    гормоны: "Hormones",
    лора: "with Laura",
  };
  return (locale === "en" ? en : ru)[tag] || tag;
}
