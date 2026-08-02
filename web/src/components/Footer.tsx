import Link from "next/link";
import { getBooks, siteData } from "@/lib/books";

export function Footer() {
  const books = getBooks();

  return (
    <footer className="border-t border-border bg-bg-elevated py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-sm font-semibold tracking-wide">ПОЛ ГРЭК</p>
            <p className="mt-1 text-xs tracking-[0.12em] text-fg-muted uppercase">Нейробиология</p>
            <p className="mt-4 max-w-xs text-sm text-fg-muted">
              Научпоп о мозге без эзотерики. Главы на сайте · книги на Литрес / Amazon.
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">Разделы</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#navigator" className="text-fg hover:text-accent">
                  Нейро-навигатор
                </Link>
              </li>
              <li>
                <Link href="/books/" className="text-fg hover:text-accent">
                  Каталог книг
                </Link>
              </li>
              <li>
                <Link href="/about/" className="text-fg hover:text-accent">
                  Об авторе
                </Link>
              </li>
              <li>
                <Link href="/lab/" className="text-fg hover:text-accent">
                  Лаборатория
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="text-fg hover:text-accent">
                  Конфиденциальность
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">Книги</p>
            <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto text-sm">
              {books.map((b) => (
                <li key={b.slug}>
                  <Link href={`/books/${b.slug}/`} className="text-fg-muted hover:text-accent">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-fg-muted">
          <p>© {new Date().getFullYear()} Пол Грэк · polgrek.site</p>
          <p className="mt-2 max-w-3xl">{siteData.legal.disclaimer}</p>
          <p className="mt-2">
            Реклама · erid: 2VfnxyNkZrY · партнёрские ссылки Литрес (AdvCake).{" "}
            <a href={`mailto:${siteData.legal.email}`} className="underline hover:text-fg">
              {siteData.legal.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
