import type { Book } from "@/lib/types";
import { SITE_URL } from "@/lib/seo";

type BookSeo = {
  title: string;
  description: string;
};

const SEO: Record<string, BookSeo> = {
  "mozg-na-100": {
    title: "Мозг на 100+ — книга о памяти после 40",
    description:
      "Почему после сорока слово на кончике языка — и что с этим делать без «таблеток для мозга». Глава бесплатно, книга на Литрес.",
  },
  "anatomiya-energii": {
    title: "Анатомия энергии — почему к трём часам нет сил",
    description:
      "Провал после обеда — не лень. Сон, нагрузка и ритм дня. Глава бесплатно, книга Пола Грэка на Литрес.",
  },
  "mentalnyy-debag": {
    title: "Ментальный дебаг — если не можете начать",
    description:
      "Открыли Telegram на минуту — прошло сорок. Почему важное откладывается и что можно сделать сегодня. Глава бесплатно.",
  },
  "stress-i-mozg": {
    title: "Мозг и стресс — почему «успокойся» не работает",
    description:
      "Тело уже сжалось, а совет всё тот же. Как устроена петля стресса без лозунгов. Глава бесплатно, книга на Литрес.",
  },
  "svyashchennye-chasy": {
    title: "Священные часы — почему сон не восстанавливает",
    description:
      "Восемь часов в кровати — и утром разбиты. Свет, лента и тишина без мистики. Глава бесплатно на polgrek.site.",
  },
  "biohacking-mozga": {
    title: "Биохакинг мозга — без аптечки из ленты",
    description:
      "Прокачать голову легко. Вовремя остановиться — навык. Что оставить, что отсечь. Глава бесплатно, книга на Литрес.",
  },
  "mozg-i-dengi": {
    title: "Мозг и деньги — почему вечером хочется купить",
    description:
      "Деньги — не только математика. Как усталость и тревога меняют решение. Глава бесплатно, книга Пола Грэка.",
  },
  "snachala-dengi-potom-soznanie": {
    title: "Сначала деньги, потом сознание",
    description:
      "Дебиторка аффирмациями не закрывается. Сначала внешний порядок, потом ясность. Глава бесплатно на сайте.",
  },
  reset: {
    title: "RESET — когда выходные не помогают",
    description:
      "Отдохнули — и в понедельник снова ноль. Выгорание и усталость — разные вещи. Глава бесплатно, книга на Литрес.",
  },
  "ostorozhnyy-biohaker": {
    title: "Осторожный биохакер — «два литра воды» и другие мифы",
    description:
      "Как не превратить жизнь в лабораторию без выходных. Сначала «не навреди». Глава бесплатно, книга на Литрес.",
  },
  "zhenskiy-mozg": {
    title: "Женский мозг — когда голова работает иначе",
    description:
      "«Я больше не понимаю свой мозг» — часто не характер. Цикл, ясность, возраст. Пол и Лора Грэк. Глава бесплатно.",
  },
  "muzhskoy-mozg": {
    title: "Мужской мозг — энергия после сорока",
    description:
      "После сорока сил меньше. Это не охота за двадцатью пятью. Пол и Лора Грэк. Глава бесплатно, книга на Литрес.",
  },
  "ei-2": {
    title: "Эмоциональный интеллект 2.0 — когда срыв быстрее мысли",
    description:
      "«Просто успокойся» опаздывает. Стыд, срыв, лента. Карта вместо лозунга. Глава бесплатно, книга на Литрес.",
  },
};

export function bookSeo(book: Book): BookSeo {
  return (
    SEO[book.slug] || {
      title: book.title,
      description: (book.subtitle || book.promise || book.title).slice(0, 160),
    }
  );
}

export function bookCoverAbs(book: Book): string {
  const file = book.coverFile.replace(/\.(webp|png)$/i, ".jpg");
  return `${SITE_URL}/covers/${file}`;
}

export function bookJsonLd(book: Book) {
  const seo = bookSeo(book);
  const url = `${SITE_URL}/books/${book.slug}/`;
  const authors = (book.authors?.length ? book.authors : ["Пол Грэк"]).map((name) => ({
    "@type": "Person",
    name,
    url: `${SITE_URL}/about/`,
  }));

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    url,
    inLanguage: "ru",
    bookFormat: "https://schema.org/EBook",
    image: bookCoverAbs(book),
    description: seo.description,
    author: authors.length === 1 ? authors[0] : authors,
    sameAs: book.buyUrl || undefined,
  };

  if (book.litresPrice && book.buyUrl) {
    ld.offers = {
      "@type": "Offer",
      url: book.buyUrl,
      price: String(book.litresPrice),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  }

  return ld;
}

export function bookBreadcrumbLd(book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Книги", item: `${SITE_URL}/books/` },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: `${SITE_URL}/books/${book.slug}/`,
      },
    ],
  };
}

export function booksCollectionLd(books: Book[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Книги Пола Грэка",
    url: `${SITE_URL}/books/`,
    inLanguage: "ru",
    hasPart: books.map((b) => ({
      "@type": "Book",
      name: b.title,
      url: `${SITE_URL}/books/${b.slug}/`,
    })),
  };
}
