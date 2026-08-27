import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/books";

export const metadata: Metadata = {
  title: "Конфиденциальность",
  description: "Политика конфиденциальности polgrek.site",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Конфиденциальность</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted">
        <p>
          Сайт polgrek.site — статическая витрина книг и статей. Формы сбора почты на сайте сейчас
          нет. Письма на {siteData.legal.email} вы отправляете сами, через свой почтовый клиент.
        </p>
        <p>
          Для статистики используется Яндекс Метрика, счётчик 110711984. Она ставит cookie, чтобы
          отличать визиты, считать страницы, клики по целям (просмотр книги, глава, переход на
          Литрес) и строить карты кликов. Вебвизор в коде сайта выключен.
        </p>
        <p>
          Язык оболочки: если в браузере русский (или близкий язык СНГ) — русская версия. Английская
          открывается, только если браузер явно английский и русского в списке языков нет — либо
          вы сами нажали EN. Выбор RU/EN запоминается в cookie и localStorage. Поисковые роботы не
          переключаются.
        </p>
        <p>
          Ссылки на Литрес — партнёрские (AdvCake), маркировка «Реклама» и erid: 2VfnxyNkZrY.
          Покупка происходит на стороне Литрес. Мы не видим номер карты и не обрабатываем платёж.
        </p>
        <p>{siteData.legal.disclaimer}</p>
        <p>
          Этот текст описывает фактический стек сайта. Юридическая достаточность — на стороне
          владельца сайта. Связь:{" "}
          <a href={`mailto:${siteData.legal.email}`} className="text-accent underline">
            {siteData.legal.email}
          </a>
        </p>
      </div>
      <Link href="/" className="mt-8 inline-flex text-sm font-semibold text-accent hover:underline">
        ← На главную
      </Link>
    </div>
  );
}
