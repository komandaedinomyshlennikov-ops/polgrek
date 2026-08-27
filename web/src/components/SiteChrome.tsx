"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { isReaderPath } from "@/lib/locale";
import { HtmlLang } from "./HtmlLang";
import { LocaleAuto } from "./LocaleAuto";
import { MetrikaGoals } from "./MetrikaGoals";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isReader = isReaderPath(pathname);

  if (isReader) {
    return (
      <>
        <HtmlLang />
        <LocaleAuto />
        <MetrikaGoals />
        {children}
      </>
    );
  }

  return (
    <>
      <HtmlLang />
      <LocaleAuto />
      <MetrikaGoals />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
