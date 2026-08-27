"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  detectLocale,
  isCrawler,
  persistLocale,
  readLocalePref,
} from "@/lib/locale-pref";
import { switchLocalePath } from "@/lib/locale";

/**
 * First visit: country (CIS → ru, else en). Later visits use saved pref.
 * Manual RU/EN in the header always wins.
 */
export function LocaleAuto() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (isCrawler()) return;
    if (readLocalePref()) return;

    let cancelled = false;
    detectLocale().then((locale) => {
      if (cancelled) return;
      persistLocale(locale);
      const currentPath = window.location.pathname || pathname;
      const next = switchLocalePath(currentPath, locale);
      if (next === currentPath || next === `${currentPath}/`) return;
      const dest = `${next}${window.location.search}${window.location.hash}`;
      window.location.replace(dest);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
