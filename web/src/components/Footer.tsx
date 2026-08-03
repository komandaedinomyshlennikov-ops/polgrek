"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedBooks, litresAuthorUrl, siteData } from "@/lib/books";
import { localeFromPath, lp } from "@/lib/locale";
import { ui } from "@/data/ui";

export function Footer() {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);
  const t = ui(locale);
  const books = getLocalizedBooks(locale);

  const disclaimer =
    locale === "en"
      ? "Educational material about the brain and behavior. Not medical advice and not a substitute for a doctor or therapist."
      : siteData.legal.disclaimer;

  return (
    <footer className="border-t border-border bg-bg-elevated py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-sm font-semibold tracking-wide">{t.brand}</p>
            <p className="mt-1 text-xs tracking-[0.12em] text-fg-muted uppercase">{t.brandSub}</p>
            <p className="mt-4 max-w-xs text-sm text-fg-muted">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
              {t.footer.sections}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href={lp(locale, "/#navigator")} className="text-fg hover:text-accent">
                  {t.nav.navigator}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/books/")} className="text-fg hover:text-accent">
                  {t.nav.books}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/about/")} className="text-fg hover:text-accent">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/lab/")} className="text-fg hover:text-accent">
                  {t.nav.lab}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/privacy/")} className="text-fg hover:text-accent">
                  {t.privacy.title}
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
              {t.footer.books}
            </p>
            <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto text-sm">
              {books.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={lp(locale, `/books/${b.slug}/`)}
                    className="text-fg-muted hover:text-accent"
                  >
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={litresAuthorUrl()}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              {t.footer.allLitres}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-fg-muted">
          <p>© {new Date().getFullYear()} {locale === "en" ? "Pol Grek" : "Пол Грэк"} · polgrek.site</p>
          <p className="mt-2 max-w-3xl">{disclaimer}</p>
          <p className="mt-2">
            {t.footer.ad}{" "}
            <a href={`mailto:${siteData.legal.email}`} className="underline hover:text-fg">
              {siteData.legal.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
