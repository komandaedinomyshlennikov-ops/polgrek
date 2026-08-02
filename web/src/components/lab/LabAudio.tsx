"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { LAB_THOUGHT } from "@/data/lab";

/**
 * Micro «audio» corner — Web Speech API when available (no mp3 asset required).
 * Falls back to reading the text on the page.
 */
export function LabAudio() {
  const [speaking, setSpeaking] = useState(false);

  const toggle = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(LAB_THOUGHT.text);
    u.lang = "ru-RU";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <section id="audio" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-bg-elevated to-surface p-5 sm:p-7">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          🎧 Аудио-уголок
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold">{LAB_THOUGHT.title}</h2>
        <p className="mt-1 text-xs text-fg-muted">{LAB_THOUGHT.duration}</p>

        <blockquote className="mt-5 border-l-2 border-accent pl-4 font-display text-lg leading-snug text-fg sm:text-xl">
          {LAB_THOUGHT.text}
        </blockquote>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white"
          >
            {speaking ? (
              <>
                <Pause className="h-4 w-4" aria-hidden />
                Стоп
              </>
            ) : (
              <>
                <Play className="h-4 w-4" aria-hidden />
                Прослушать
              </>
            )}
          </button>
          <p className="text-xs text-fg-muted">
            Голос браузера (Web Speech). Отдельные mp3-заметки — позже в бете.
          </p>
        </div>
      </div>
    </section>
  );
}
