import type { Locale } from "@/lib/types";

export const ABOUT = {
  ru: {
    crumbHome: "На главную",
    crumbHere: "Об авторе",
    h1: "Пол Грэк",
    role: "Автор научно-популярных книг о мозге, стрессе, сне, энергии, когнитивном долголетии и поведении.",
    lead: "Пишу для тех, кто хочет не просто получить очередной совет из интернета, а понять, что происходит с ним самим.",
    line: "Я разбираю то, что происходит с вами, и отделяю науку от красивых объяснений.",
    ctaBooks: "Читать книги Пола Грэка",
    ctaLab: "Читать статьи",
    ctaFollow: "Следить за новыми материалами",
    followNote: "Задать вопрос можно в Telegram. Новые разборы — там же и в Threads.",
    booksEyebrow: "Книги",
    booksTitle: "С чего обычно начинают",
    booksAll: "Все книги",
    note: "Материалы сайта носят образовательный характер и не заменяют консультацию врача.",
    portraitAlt: "Пол Грэк",
    metaTitle: "Об авторе",
    metaDesc:
      "Пол Грэк — автор научно-популярных книг о мозге, стрессе, сне и энергии. Разбирает, что происходит с вами, и отделяет науку от красивых объяснений.",
  },
  en: {
    crumbHome: "Home",
    crumbHere: "About",
    h1: "Pol Grek",
    role: "Author of popular-science books on the brain, stress, sleep, energy, cognitive longevity, and behavior.",
    lead: "I write for people who want more than another internet tip — who want to understand what is happening to them.",
    line: "I take apart what is happening to you, and I separate science from neat explanations.",
    ctaBooks: "Read Pol Grek’s books",
    ctaLab: "Read the lab",
    ctaFollow: "Follow new pieces",
    followNote: "Questions go to Telegram. New essays appear there and on Threads.",
    booksEyebrow: "Books",
    booksTitle: "Where readers usually start",
    booksAll: "All books",
    note: "Educational material. Not a substitute for medical advice.",
    portraitAlt: "Pol Grek",
    metaTitle: "About",
    metaDesc:
      "Pol Grek writes popular-science books on the brain, stress, sleep, and energy — to understand what is happening to you, and to separate science from neat stories.",
  },
} as const;

export function about(locale: Locale) {
  return ABOUT[locale];
}
