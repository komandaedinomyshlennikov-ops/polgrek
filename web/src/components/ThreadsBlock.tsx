import { siteData } from "@/lib/books";
import { SOCIAL_VOICE } from "@/data/book-voice";
import { ExternalLink, MessageCircle } from "lucide-react";

const POSTS = [
  {
    text: "Мотивация — не причина действия. Это побочный продукт. Сначала движение на 10 минут.",
  },
  {
    text: "«Просто успокойся» — почти бесполезный совет, когда система уже в угрозе. Тело уходит вперёд разума.",
  },
  {
    text: "Листание ленты — это не отдых. 15 минут без потока — и видно, когда мозг снова слышит себя.",
  },
  {
    text: "К вечеру «сила воли» уже съедена. Важные решения — не после 21:00. Это не характер — ресурс.",
  },
];

export function ThreadsBlock() {
  return (
    <section className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Threads & Telegram
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {SOCIAL_VOICE.title}
          </h2>
          <p className="mt-3 text-fg-muted">{SOCIAL_VOICE.body}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {POSTS.map((p) => (
            <blockquote
              key={p.text}
              className="rounded-2xl border border-border bg-bg-elevated p-5 text-[15px] leading-relaxed text-fg shadow-sm"
            >
              <p className="text-fg-muted">«{p.text}»</p>
              <footer className="mt-3 text-xs font-medium text-fg-muted">@pol.grek</footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={siteData.links.threads}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-bg transition hover:opacity-90"
          >
            {SOCIAL_VOICE.threadsCta}
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <a
            href={siteData.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-5 text-sm font-semibold text-fg transition hover:border-accent/40"
          >
            <MessageCircle className="h-4 w-4 text-accent" aria-hidden />
            {SOCIAL_VOICE.telegramCta}
          </a>
        </div>
      </div>
    </section>
  );
}
