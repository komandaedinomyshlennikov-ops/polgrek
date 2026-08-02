import type { MetadataRoute } from "next";

const SITE = "https://polgrek.site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/lab/article.html",
          "/en/books/book.html",
          "/en/lab/article.html",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
