import type { Locale } from "./types";

export type { Locale };

/** Detect locale from pathname (client or server). */
export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return "ru";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

/** Strip /en prefix → RU path. */
export function toRuPath(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

/** Add /en prefix if needed. */
export function toEnPath(pathname: string): string {
  const p = pathname || "/";
  if (p === "/en" || p.startsWith("/en/")) return p.endsWith("/") || p === "/en" ? p : `${p}/`;
  if (p === "/") return "/en/";
  return p.startsWith("/") ? `/en${p}` : `/en/${p}`;
}

/** Locale-aware internal path. Paths should start with /. Supports #hash. */
export function lp(locale: Locale, path: string): string {
  const raw = path.startsWith("/") ? path : `/${path}`;
  const hashIdx = raw.indexOf("#");
  const hash = hashIdx >= 0 ? raw.slice(hashIdx) : "";
  const base = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;

  const withSlash = (p: string) => {
    if (p === "/" || p === "") return "/";
    return p.endsWith("/") ? p : `${p}/`;
  };

  if (locale === "en") {
    if (base === "/" || base === "") return `/en/${hash}`;
    const body = withSlash(base);
    return `/en${body}${hash}`.replace(/\/{2,}/g, "/").replace("/en/en/", "/en/");
  }
  if (base === "/" || base === "") return `/${hash}`.replace(/^\/#/, "/#") || "/";
  return `${withSlash(base)}${hash}`;
}

/** Switch language keeping the same logical page when possible. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const ru = toRuPath(pathname);
  return target === "en" ? toEnPath(ru) : ru.endsWith("/") || ru === "/" ? ru : `${ru}/`;
}

export function isReaderPath(pathname: string): boolean {
  return pathname.startsWith("/read") || pathname.startsWith("/en/read");
}
