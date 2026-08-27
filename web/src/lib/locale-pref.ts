import type { Locale } from "./types";

export const LOCALE_PREF_KEY = "pg_locale";

/** Russian-speaking CIS — stay on RU. Everyone else → EN. */
const CIS = new Set([
  "RU",
  "BY",
  "KZ",
  "KG",
  "UZ",
  "TJ",
  "TM",
  "AM",
  "AZ",
  "MD",
  "UA",
]);

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_PREF_KEY, locale);
  } catch {
    /* private mode */
  }
  try {
    document.cookie = `${LOCALE_PREF_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readLocalePref(): Locale | null {
  try {
    const fromStore = localStorage.getItem(LOCALE_PREF_KEY);
    if (fromStore === "ru" || fromStore === "en") return fromStore;
  } catch {
    /* ignore */
  }
  try {
    const m = document.cookie.match(/(?:^|; )pg_locale=(ru|en)/);
    if (m) return m[1] as Locale;
  } catch {
    /* ignore */
  }
  return null;
}

export function isCrawler(): boolean {
  if (typeof navigator === "undefined") return false;
  return /bot|crawl|spider|slurp|preview|facebookexternalhit|yandex|google|bing|baidu|duckduck/i.test(
    navigator.userAgent
  );
}

export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  return CIS.has(country.toUpperCase()) ? "ru" : "en";
}

export function localeFromBrowser(): Locale {
  const langs =
    typeof navigator !== "undefined"
      ? navigator.languages?.length
        ? navigator.languages
        : navigator.language
          ? [navigator.language]
          : []
      : [];
  const blob = langs.join(" ").toLowerCase();
  if (/(^|[-_ ])(ru|be|uk|kk|ky|uz|tg|hy|az|mo)/.test(blob)) return "ru";
  return "en";
}

export async function detectCountryCode(): Promise<string | null> {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), 1400);
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return data.country ? data.country.toUpperCase() : null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(t);
  }
}

export async function detectLocale(): Promise<Locale> {
  const country = await detectCountryCode();
  return localeFromCountry(country) ?? localeFromBrowser();
}

