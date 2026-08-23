import type { MetadataRoute } from "next";
import { getBooks } from "@/lib/books";
import { getLabArticles } from "@/data/lab-articles";

const SITE = "https://polgrek.site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);
  const books = getBooks();
  const lab = getLabArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { ru: `${SITE}/`, en: `${SITE}/en/`, "x-default": `${SITE}/` } },
    },
    {
      url: `${SITE}/en/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: { ru: `${SITE}/`, en: `${SITE}/en/`, "x-default": `${SITE}/` } },
    },
    {
      url: `${SITE}/books/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: { ru: `${SITE}/books/`, en: `${SITE}/en/books/`, "x-default": `${SITE}/books/` },
      },
    },
    {
      url: `${SITE}/en/books/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { ru: `${SITE}/books/`, en: `${SITE}/en/books/`, "x-default": `${SITE}/books/` },
      },
    },
    {
      url: `${SITE}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { ru: `${SITE}/about/`, en: `${SITE}/en/about/`, "x-default": `${SITE}/about/` },
      },
    },
    {
      url: `${SITE}/en/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: { ru: `${SITE}/about/`, en: `${SITE}/en/about/`, "x-default": `${SITE}/about/` },
      },
    },
    {
      url: `${SITE}/lab/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: { ru: `${SITE}/lab/`, en: `${SITE}/en/lab/`, "x-default": `${SITE}/lab/` },
      },
    },
    {
      url: `${SITE}/en/lab/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
      alternates: {
        languages: { ru: `${SITE}/lab/`, en: `${SITE}/en/lab/`, "x-default": `${SITE}/lab/` },
      },
    },
    {
      url: `${SITE}/privacy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE}/en/privacy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.25,
    },
  ];

  const labRoutes: MetadataRoute.Sitemap = lab.map((a) => ({
    url: `${SITE}/lab/${a.slug}/`,
    lastModified: a.published,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const bookRoutes: MetadataRoute.Sitemap = books.flatMap((b) => [
    {
      url: `${SITE}/books/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: b.flagship ? 0.9 : 0.75,
      alternates: {
        languages: {
          ru: `${SITE}/books/${b.slug}/`,
          en: `${SITE}/en/books/${b.slug}/`,
          "x-default": `${SITE}/books/${b.slug}/`,
        },
      },
    },
    {
      url: `${SITE}/en/books/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: b.flagship ? 0.85 : 0.7,
      alternates: {
        languages: {
          ru: `${SITE}/books/${b.slug}/`,
          en: `${SITE}/en/books/${b.slug}/`,
          "x-default": `${SITE}/books/${b.slug}/`,
        },
      },
    },
    {
      url: `${SITE}/read/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${SITE}/read/${b.slug}/`,
          en: `${SITE}/en/read/${b.slug}/`,
        },
      },
    },
    {
      url: `${SITE}/en/read/${b.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: {
        languages: {
          ru: `${SITE}/read/${b.slug}/`,
          en: `${SITE}/en/read/${b.slug}/`,
        },
      },
    },
  ]);

  return [...staticRoutes, ...labRoutes, ...bookRoutes];
}
