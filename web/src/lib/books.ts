import site from "@/data/site.json";
import type { Book, SiteData } from "./types";

export const siteData = site as SiteData;

export function getBooks(): Book[] {
  return siteData.books;
}

export function getBook(slug: string): Book | undefined {
  return siteData.books.find((b) => b.slug === slug);
}

export function getFlagships(): Book[] {
  const order = ["zhenskiy-mozg", "biohacking-mozga", "ei-2", "mozg-na-100", "reset"];
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
