import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent uppercase">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Страница не найдена</h1>
      <p className="mt-3 text-fg-muted">
        Возможно, ссылка устарела после обновления сайта. Начните с навигатора или каталога.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white"
        >
          На главную
        </Link>
        <Link
          href="/books/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold"
        >
          Каталог книг
        </Link>
      </div>
    </div>
  );
}
