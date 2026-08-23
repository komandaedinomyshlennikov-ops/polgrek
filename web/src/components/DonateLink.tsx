import { Heart } from "lucide-react";
import { siteData } from "@/lib/books";
import type { Locale } from "@/lib/types";

const COPY = {
  ru: {
    label: "Поддержать автора",
    hint: "Если материалы зашли — на странице автора Литрес нажмите «Поддержать автора». Сначала может понадобиться войти в кабинет. Это не покупка книги.",
  },
  en: {
    label: "Support the author",
    hint: "If the work lands — on the LitRes author page tap “Support the author.” You may need to sign in first. This is not a book purchase.",
  },
} as const;

export function DonateLink({
  locale = "ru",
  variant = "text",
  className = "",
}: {
  locale?: Locale;
  variant?: "text" | "button" | "quiet";
  className?: string;
}) {
  const t = COPY[locale];
  const href = siteData.links.donate;

  if (variant === "button") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-fg transition hover:border-accent/40 ${className}`}
      >
        <Heart className="h-4 w-4 text-accent" aria-hidden />
        {t.label}
      </a>
    );
  }

  if (variant === "quiet") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline ${className}`}
      >
        <Heart className="h-3.5 w-3.5" aria-hidden />
        {t.label}
      </a>
    );
  }

  return (
    <p className={`text-sm leading-relaxed text-fg-muted ${className}`}>
      {t.hint}{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent hover:underline"
      >
        {t.label}
      </a>
    </p>
  );
}
