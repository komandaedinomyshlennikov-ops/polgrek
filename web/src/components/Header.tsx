"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { localeFromPath, lp, switchLocalePath } from "@/lib/locale";
import { persistLocale } from "@/lib/locale-pref";
import { ui } from "@/data/ui";

export function Header() {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);
  const t = ui(locale);
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const nav = useMemo(
    () => [
      { href: lp(locale, "/#navigator"), label: t.nav.navigator, match: null },
      { href: lp(locale, "/books/"), label: t.nav.books, match: "/books" },
      { href: lp(locale, "/about/"), label: t.nav.about, match: "/about" },
      { href: lp(locale, "/lab/"), label: t.nav.lab, match: "/lab" },
    ],
    [locale, t.nav]
  );

  const pathForMatch = locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;

  const enHref = switchLocalePath(pathname, "en");
  const ruHref = switchLocalePath(pathname, "ru");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={lp(locale, "/")}
          className="group flex min-h-12 min-w-0 flex-col justify-center leading-tight"
          aria-label={t.brandAria}
        >
          <span className="font-display text-[15px] font-semibold tracking-wide text-fg sm:text-base">
            {t.brand}
          </span>
          <span className="text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase">
            {t.brandSub}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.navAria}>
          {nav.map((item) => {
            const active = item.match
              ? pathForMatch.startsWith(item.match)
              : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-fg-muted hover:bg-surface hover:text-fg"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <div
            className="hidden items-center rounded-xl border border-border bg-bg-elevated p-0.5 sm:flex"
            role="group"
            aria-label={t.langAria}
          >
            <Link
              href={ruHref}
              hrefLang="ru"
              onClick={() => persistLocale("ru")}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-xs font-medium",
                locale === "ru"
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              RU
            </Link>
            <Link
              href={enHref}
              hrefLang="en"
              onClick={() => persistLocale("en")}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-xs font-medium",
                locale === "en"
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              EN
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-fg-muted transition hover:text-fg"
            aria-label={isDark ? t.themeLight : t.themeDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted ? (
              isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-fg md:hidden"
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-elevated md:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3"
            aria-label={t.navMobileAria}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-fg hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-1 flex gap-2 px-3 py-2">
              <Link
                href={ruHref}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  locale === "ru" ? "bg-accent-soft text-accent" : "text-fg-muted"
                )}
                onClick={() => {
                  persistLocale("ru");
                  setOpen(false);
                }}
              >
                Русский
              </Link>
              <Link
                href={enHref}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  locale === "en" ? "bg-accent-soft text-accent" : "text-fg-muted"
                )}
                onClick={() => {
                  persistLocale("en");
                  setOpen(false);
                }}
              >
                English
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
