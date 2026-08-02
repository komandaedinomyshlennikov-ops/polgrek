/** Shared absolute URLs for OG / Twitter / Schema */

export const SITE_URL = "https://polgrek.site";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_ALT = "Пол Грэк — нейробиология без эзотерики";

export const defaultOg = {
  type: "website" as const,
  locale: "ru_RU",
  siteName: "Пол Грэк",
  url: SITE_URL,
  images: [
    {
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      alt: OG_IMAGE_ALT,
      type: "image/jpeg",
    },
  ],
};
