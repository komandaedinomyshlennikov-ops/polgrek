"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { isReaderPath } from "@/lib/locale";
import { HtmlLang } from "./HtmlLang";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isReader = isReaderPath(pathname);

  if (isReader) {
    return (
      <>
        <HtmlLang />
        {children}
      </>
    );
  }

  return (
    <>
      <HtmlLang />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
