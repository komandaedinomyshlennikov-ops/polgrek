"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  bookSlugFromPath,
  metrikaHit,
  reachGoal,
  trackContext,
} from "@/lib/metrika";

function goalFromHref(href: string, pathname: string): { name: string; params: Record<string, string> } | null {
  const ctx = trackContext(pathname);
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  const full = url.href;

  if (/purchase\/donation/i.test(full)) return null;

  if (host === "litres.ru" || host.endsWith(".litres.ru")) {
    const art = full.match(/\/book\/[^/]+\/[^/]*?(\d{6,})/i);
    const slug = bookSlugFromPath(pathname);
    const params = { ...ctx };
    if (slug) params.book = slug;
    if (art) params.art = art[1];
    return { name: "litres", params };
  }

  if (host === "threads.net" || host.endsWith(".threads.net")) {
    return { name: "threads", params: ctx };
  }

  if (host === "t.me" || host === "telegram.me") {
    return { name: "telegram", params: ctx };
  }

  if (host === "amazon.com" || host.endsWith(".amazon.com") || host === "amazon.in") {
    return { name: "amazon", params: ctx };
  }

  const path = url.pathname;
  if (/\/read\/[^/]+/.test(path)) {
    const book = bookSlugFromPath(path) || ctx.book;
    return { name: "excerpt_open", params: { ...ctx, ...(book ? { book } : {}) } };
  }

  if (path === "/en" || path === "/en/" || path.startsWith("/en/")) {
    if (ctx.lang === "ru") return { name: "lang_en", params: ctx };
  }

  return null;
}

function pageGoal(pathname: string): { name: string; params: Record<string, string> } | null {
  const p = pathname.replace(/^\/en(?=\/)/, "") || "/";
  const ctx = trackContext(pathname);
  if (/^\/books\/[^/]+/.test(p)) return { name: "book_view", params: ctx };
  if (/^\/read\/[^/]+/.test(p)) return { name: "excerpt_open", params: ctx };
  if (/^\/lab\/[^/]+/.test(p)) return { name: "lab_view", params: ctx };
  return null;
}

export function MetrikaGoals() {
  const pathname = usePathname() || "/";
  const first = useRef(true);
  const lastPageGoal = useRef("");

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      metrikaHit(window.location.href);
    }
    const g = pageGoal(pathname);
    const key = g ? `${g.name}:${g.params.book || pathname}` : "";
    if (g && key !== lastPageGoal.current) {
      lastPageGoal.current = key;
      reachGoal(g.name, g.params);
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const a = t?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      const hit = goalFromHref(href, window.location.pathname || pathname);
      if (hit) reachGoal(hit.name, hit.params);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
