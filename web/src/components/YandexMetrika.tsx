"use client";

import { useEffect } from "react";
import { ensureMetrikaStub, flushGoals, METRIKA_COUNTER_ID } from "@/lib/metrika";

/**
 * Yandex Metrika 110711984 — stub+init immediately, tag.js deferred.
 * Goals can queue before the network script arrives.
 */
export function YandexMetrika() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    ensureMetrikaStub();
    type YmFn = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
    const w = window as Window & { ym?: YmFn };
    w.ym?.(METRIKA_COUNTER_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,
    });
    flushGoals();

    let booted = false;
    const bootScript = () => {
      if (booted) return;
      booted = true;
      const src = "https://mc.yandex.ru/metrika/tag.js";
      const scripts = document.getElementsByTagName("script");
      for (let j = 0; j < scripts.length; j++) {
        if (scripts[j].src === src) return;
      }
      const s = document.createElement("script");
      s.async = true;
      s.defer = true;
      s.src = src;
      s.onload = () => flushGoals();
      const first = document.getElementsByTagName("script")[0];
      first?.parentNode?.insertBefore(s, first);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const onInteract = () => {
      bootScript();
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
      idleId = window.requestIdleCallback(() => bootScript(), { timeout: 4000 });
    } else {
      timeoutId = setTimeout(bootScript, 2500);
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
          src={`https://mc.yandex.ru/watch/${METRIKA_COUNTER_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
          width={1}
          height={1}
        />
      </div>
    </noscript>
  );
}
