import type { MetadataRoute } from "next";
import { getBooks } from "@/lib/books";

const SITE = "https://polgrek.site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);
  const books = getBooks();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { ru: `${SITE}/`, en: `${SITE}/en/`, "x-default": `${SITE}/` } },
    },
    {
      url: `${SITE}/books/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/lab/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE}/privacy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE}/en/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.flatMap((b) => [
    {
      url: `${SITE}/books/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: b.flagship ? 0.9 : 0.75,
    },
    {
      url: `${SITE}/read/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...bookRoutes];
}
