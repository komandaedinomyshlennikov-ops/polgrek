"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isReader = pathname.startsWith("/read");

  if (isReader) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
