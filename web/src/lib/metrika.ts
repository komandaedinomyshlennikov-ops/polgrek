const METRIKA_ID = 110711984;

type Goal = { name: string; params?: Record<string, string> };

const queue: Goal[] = [];
let stubReady = false;

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };

function ym(): YmFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { ym?: YmFn }).ym;
}

export function ensureMetrikaStub() {
  if (typeof window === "undefined") return;
  const w = window as Window & { ym?: YmFn };
  w.ym =
    w.ym ||
    (function (...args: unknown[]) {
      (w.ym!.a = w.ym!.a || []).push(args);
    } as YmFn);
  w.ym.l = w.ym.l || Date.now();
  stubReady = true;
  flushGoals();
}

function send(name: string, params?: Record<string, string>) {
  const fn = ym();
  if (!fn) return false;
  try {
    if (params) fn(METRIKA_ID, "reachGoal", name, params);
    else fn(METRIKA_ID, "reachGoal", name);
    return true;
  } catch {
    return false;
  }
}

export function flushGoals() {
  if (!stubReady || !ym()) return;
  while (queue.length) {
    const g = queue.shift();
    if (g) send(g.name, g.params);
  }
}

export function reachGoal(name: string, params?: Record<string, string>) {
  if (!name || typeof window === "undefined") return;
  if (stubReady && send(name, params)) return;
  queue.push({ name, params });
}

export function metrikaHit(url?: string) {
  if (typeof window === "undefined") return;
  const fn = ym();
  if (!fn) return;
  try {
    fn(METRIKA_ID, "hit", url || window.location.href);
  } catch {
    /* ignore */
  }
}

export const METRIKA_COUNTER_ID = METRIKA_ID;

export function bookSlugFromPath(pathname: string): string | null {
  const p = pathname.replace(/^\/en(?=\/)/, "");
  const m = p.match(/^\/(?:books|read)\/([^/]+)/);
  return m?.[1] ?? null;
}

export function trackContext(pathname: string): Record<string, string> {
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
  const book = bookSlugFromPath(pathname);
  const out: Record<string, string> = { lang: locale, path: pathname };
  if (book) out.book = book;
  return out;
}
