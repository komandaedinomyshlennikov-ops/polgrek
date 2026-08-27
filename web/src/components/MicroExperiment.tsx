import Link from "next/link";
import { lp } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export function MicroExperiment({ locale = "ru" }: { locale?: Locale }) {
  return (
    <section className="border-b border-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Можно проверить завтра
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Первые двадцать минут утра — без ленты.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-fg-muted">
            Не ради дисциплины и не ради челленджа. Чтобы увидеть, что происходит с вниманием,
            если мозг сначала побудет в собственной жизни — и только потом впустит чужую.
          </p>
          <Link
            href={lp(locale, "/lab/telegram-lenta/")}
            className="mt-6 inline-flex min-h-12 items-center text-sm font-semibold text-accent hover:underline"
          >
            Почему это имеет смысл →
          </Link>
        </div>
      </div>
    </section>
  );
}
