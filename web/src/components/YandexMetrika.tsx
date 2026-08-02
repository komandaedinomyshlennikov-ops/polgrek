"use client";

import { useEffect } from "react";

/**
 * Yandex Metrika 110711984 — deferred (idle / interaction / timeout).
 * async+defer script; never blocks LCP.
 */
const METRIKA_ID = 110711984;

export function YandexMetrika() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    let booted = false;

    const boot = () => {
      if (booted) return;
      booted = true;

      type YmFn = ((...args: unknown[]) => void) & {
        a?: unknown[];
        l?: number;
      };
      const w = window as Window & { ym?: YmFn };

      w.ym =
        w.ym ||
        (function (...args: unknown[]) {
          (w.ym!.a = w.ym!.a || []).push(args);
        } as YmFn);
      w.ym.l = Date.now();

      const src = "https://mc.yandex.ru/metrika/tag.js";
      const scripts = document.getElementsByTagName("script");
      for (let j = 0; j < scripts.length; j++) {
        if (scripts[j].src === src) {
          w.ym(METRIKA_ID, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: false,
          });
          return;
        }
      }

      const s = document.createElement("script");
      s.async = true;
      s.defer = true;
      s.src = src;
      const first = document.getElementsByTagName("script")[0];
      first?.parentNode?.insertBefore(s, first);

      w.ym(METRIKA_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
      });
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const onInteract = () => {
      boot();
      cleanup();
    };

    function cleanup() {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => boot(), { timeout: 4000 });
    } else {
      timeoutId = setTimeout(boot, 2500);
    }

    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true, passive: true });

    return cleanup;
  }, []);

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
          width={1}
          height={1}
        />
      </div>
    </noscript>
  );
}
