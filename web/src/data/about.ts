import type { Locale } from "@/lib/types";

export const ABOUT = {
  ru: {
    crumbHome: "На главную",
    crumbHere: "Об авторе",
    h1: "Пол Грэк",
    role: "Автор научно-популярных книг о мозге, сне, энергии, стрессе и о том, почему с годами кажется, что голова стала хуже соображать.",
    lead: "Пишу не чтобы вы получили ещё один совет. Чтобы стало понятнее, что с вами происходит.",
    whyTitle: "Почему я об этом пишу",
    why: "Советов сейчас больше, чем ясности. Я разбираю обычные сцены — Telegram, провал в три часа, «лень», туман в голове — и отделяю то, что говорит наука, от красивых объяснений ленты.",
    methodTitle: "Как я работаю",
    method:
      "Сначала сцена, в которой узнаёте себя. Потом — как это устроено. Потом — насколько это доказано. И только потом шаг, который можно попробовать. Если данных мало, так и написано.",
    notTitle: "Чего здесь не будет",
    notItems: [
      "эзотерики и «энергий» из ленты",
      "чудо-методов и гарантий омоложения",
      "псевдонауки под видом нейробиологии",
      "самоназванного статуса «эксперт №1» и «бестселлер»",
    ],
    line: "Разбираю то, что происходит с вами, и отделяю науку от красивых объяснений.",
    ctaBooks: "Читать книги Пола Грэка",
    ctaLab: "Читать статьи",
    ctaFollow: "Следить за новыми материалами",
    followNote: "Вопрос можно задать в Telegram. Новые разборы — там же и в Threads.",
    booksEyebrow: "Книги",
    booksTitle: "С чего обычно начинают",
    booksAll: "Все книги",
    note: "Материалы сайта носят образовательный характер и не заменяют консультацию врача.",
    portraitAlt: "Пол Грэк",
    metaTitle: "Об авторе",
    metaDesc:
      "Пол Грэк пишет о мозге, сне и энергии простым языком: разбирает, что с вами происходит, и отделяет науку от красивых объяснений.",
  },
  en: {
    crumbHome: "Home",
    crumbHere: "About",
    h1: "Pol Grek",
    role: "Author of popular-science books on the brain, stress, sleep, energy, cognitive longevity, and behavior.",
    lead: "I write for people who want more than another internet tip — who want to understand what is happening to them.",
    whyTitle: "Why I write this",
    why: "Most people do not lack information. They lack clarity. I take apart ordinary scenes — the feed, the 3 p.m. crash, “laziness”, fog — and separate what the science supports from a pretty thread.",
    methodTitle: "How I work",
    method:
      "Observation → mechanism → evidence → a step you can test. If the data are thin, it says so. If a tip is unsafe, it says so too.",
    notTitle: "What you will not find",
    notItems: [
      "mysticism and feed-grade “energy”",
      "miracle protocols",
      "pseudoscience dressed as neuroscience",
      "self-awarded “#1 expert” or “bestseller” badges",
    ],
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
