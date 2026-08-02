"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/#navigator", label: "Навигатор" },
  { href: "/books/", label: "Каталог книг" },
  { href: "/about/", label: "Об авторе" },
  { href: "/lab/", label: "Лаборатория" },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-h-12 min-w-0 flex-col justify-center leading-tight"
          aria-label="Пол Грэк — на главную"
        >
          <span className="font-display text-[15px] font-semibold tracking-wide text-fg sm:text-base">
            ПОЛ ГРЭК
          </span>
          <span className="text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase">
            Нейробиология
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {NAV.map((item) => {
            const active =
              item.href.startsWith("/books") && pathname?.startsWith("/books")
                ? true
                : item.href.startsWith("/about") && pathname?.startsWith("/about")
                  ? true
                  : item.href.startsWith("/lab") && pathname?.startsWith("/lab");
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
            aria-label="Язык"
          >
            <span className="rounded-lg bg-accent-soft px-2.5 py-1.5 text-xs font-semibold text-accent">
              RU
            </span>
            <Link
              href="/en/"
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-fg-muted hover:text-fg"
              hrefLang="en"
            >
              EN
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-fg-muted transition hover:text-fg"
            aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
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
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-elevated md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-fg hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/en/"
              className="inline-flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-fg-muted"
              onClick={() => setOpen(false)}
            >
              English version
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
