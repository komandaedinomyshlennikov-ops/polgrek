"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPath } from "@/lib/locale";

/** Keep <html lang> in sync with /en routes (static export shares root layout). */
export function HtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    const locale = localeFromPath(pathname);
    document.documentElement.lang = locale === "en" ? "en" : "ru";
  }, [pathname]);
  return null;
}
