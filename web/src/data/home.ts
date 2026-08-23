import type { Locale } from "@/lib/types";

/**
 * Editorial law (RF / CIS, 30–60):
 * Write the inner speech of the reader, not Western middle-class rituals.
 * Telegram, not inbox. Notes, not calendar. «Голова не варит», not cognitive overload.
 * Each screen: 1) that’s me  2) now I see why  3) this can change.
 * No paragraph that exists only to sound clever.
 */
export const HOME = {
  ru: {
    hero: {
      h1: "Мозг не ленится. Он пытается вас защитить.",
      dek: "Книги для тех, кто устал жить на автопилоте.",
      lead: "Простым языком о стрессе, памяти, сне, внимании и энергии — без эзотерики, биохакинг-хайпа и советов «просто возьмите себя в руки».",
      sceneEyebrow: "Представьте обычное утро.",
      scene:
        "Вы открыли Telegram «на пару минут». Потом ещё один канал. Потом новости. Потом сообщения. И вдруг прошло сорок минут, а внутри уже странная тяжесть — хотя день ещё даже не начался.",
      familiar: "Знакомо?",
      why: "Большинство людей думают, что проблема в дисциплине. Но нейробиология говорит другое: мозг не саботирует вас. Он адаптируется к перегрузке.",
      ctaNav: "Выбрать первую книгу",
      ctaRead: "Читать бесплатный фрагмент",
      proof: "Более 13 книг о работе мозга, когнитивном здоровье и управлении стрессом.",
      sign: "Пол Грэк",
      portraitAlt: "Пол Грэк — автор научпопа о мозге",
    },
    recognize: {
      eyebrow: "Возможно, вы узнаете себя",
      title: "Не ищите диагноз. Просто посмотрите, насколько это похоже на вашу жизнь.",
      items: [
        {
          title: "Спите по 8 часов, но не просыпаетесь отдохнувшим",
          body: "Иногда проблема не в количестве сна, а в том, как нервная система вообще умеет восстанавливаться.",
        },
        {
          title: "Читаете страницу книги и понимаете, что не помните ни строчки",
          body: "Концентрация — не черта характера. Это ограниченный ресурс мозга.",
        },
        {
          title: "К вечеру сил хватает только бесконечно листать ленту",
          body: "Это не отдых. Мозг выбирает самый дешёвый источник дофамина, когда ресурс заканчивается.",
        },
        {
          title: "Постоянно тревожитесь, хотя объективно всё вроде бы нормально",
          body: "Когда стресс длится месяцами, мозг начинает считать тревогу обычным фоном жизни.",
        },
      ],
      close: "Если хотя бы два пункта показались знакомыми — вы именно тот человек, для которого я пишу книги.",
    },
    navigator: {
      eyebrow: "Навигатор",
      title: "С чего начать именно вам?",
      lead: "Не выбирайте книгу по названию. Выберите состояние, которое сейчас мешает жить сильнее всего.",
      cta: "К книге",
    },
    author: {
      eyebrow: "Об авторе",
      title: "Кто такой Пол Грэк?",
      p1: "Я не учу людей «становиться лучшей версией себя».",
      p2: "Меня гораздо больше интересует другой вопрос: почему умный, взрослый и дисциплинированный человек вдруг перестаёт справляться с тем, что раньше давалось легко?",
      p3: "Именно поэтому мои книги посвящены не мотивации, а нейробиологии: памяти, стрессу, вниманию, привычкам, сну и когнитивному долголетию.",
      p4: "Каждая книга начинается с уважения к читателю. Потому что поведение человека почти всегда имеет биологическую причину раньше, чем моральную.",
      more: "Подробнее об авторе",
      portraitAlt: "Пол Грэк",
    },
    books: {
      eyebrow: "Книги",
      title: "Самые важные книги, с которых начинают читатели",
      all: "Посмотреть все 13 книг",
      excerpt: "Читать фрагмент",
      litres: "Литрес",
      amazon: "Amazon",
      items: [
        {
          slug: "mozg-na-100",
          tag: "Память · Внимание",
          forWhom: "Для тех, кто хочет сохранить ясное мышление на десятилетия.",
          body: "Почему память меняется после 40? Какие привычки действительно снижают риск когнитивного снижения? Что говорит современная наука вместо мифов о «таблетках для мозга»?",
          store: "litres" as const,
        },
        {
          slug: "anatomiya-energii",
          tag: "Энергия",
          forWhom: "Для тех, кто устал «делать всё правильно», но всё равно чувствует истощение.",
          body: "Эта книга объясняет три системы, которые определяют нашу энергию: циркадные ритмы, когнитивную нагрузку и работу клеточной энергетики.",
          store: "amazon" as const,
        },
        {
          slug: "mentalnyy-debag",
          tag: "Фокус",
          forWhom: "Если вы постоянно откладываете важное и вините себя за это.",
          body: "Не очередная книга про продуктивность. А практический протокол, который помогает перестать жить между уведомлениями и вернуть способность глубоко думать.",
          store: "litres" as const,
        },
      ],
    },
    philosophy: {
      eyebrow: "Во что я верю",
      h: "Мозг не наш враг.",
      p1: "Когда мы забываем важное, снова листаем ленту вместо отдыха, раздражаемся на близких или не можем заставить себя начать работу — это не всегда слабость характера.",
      p2: "Чаще всего это способ, которым нервная система пытается защитить человека от перегрузки.",
      h2: "Наука не делает жизнь идеальной.",
      p3: "Она делает человека более понятным самому себе.",
    },
    lab: {
      eyebrow: "Лаборатория",
      title: "Лаборатория Пола Грэка",
      lead: "Здесь появляются материалы, которые ещё не стали книгами. Короткие разборы исследований, практические нейропротоколы, эксперименты с вниманием и бесплатные инструменты для читателей.",
      cta: "Открыть лабораторию",
      items: [
        {
          href: "/lab/#checkup",
          title: "Нейро-чекап за 3 минуты",
          body: "Четыре вопроса помогут определить, что сейчас сильнее всего расходует ресурс мозга.",
        },
        {
          href: "/lab/#checkup",
          title: "15-минутный дофаминовый дебаг",
          body: "Практика, которая помогает выйти из режима бесконечного потребления информации.",
        },
        {
          href: "/lab/#prompts",
          title: "AI-шаблоны для ChatGPT",
          body: "Готовые промпты для структурирования мыслей, глубокой работы и борьбы с информационным шумом.",
        },
        {
          href: "/lab/#beta",
          title: "Черновики новых исследований",
          body: "Иногда самые интересные идеи рождаются задолго до выхода новой книги.",
        },
      ],
    },
    social: {
      eyebrow: "Threads и Telegram",
      title: "Место, где рождаются новые книги",
      lead: "Социальные сети для меня — не площадка с мотивационными цитатами. Это рабочая лаборатория, где я публикую наблюдения, объясняю свежие исследования простым языком и проверяю идеи будущих книг.",
      threadsTitle: "Threads",
      threadsBody:
        "Короткие разборы нейробиологии, заметки о внимании, сне и работе мозга в реальной жизни.",
      threadsCta: "Читать Threads",
      telegramTitle: "Telegram",
      telegramBody: "Более глубокие материалы, новые главы, протоколы и анонсы книг без рекламного шума.",
      telegramCta: "Перейти в Telegram",
      close: "Лучшие идеи сначала появляются здесь. И только потом становятся главами книг.",
    },
    cta: {
      title: "Начните не с самой популярной книги. Начните с той, которая решает вашу проблему.",
      body: "Если вы дочитали до этого места, значит вам не нужны громкие обещания. Вам нужны понятные объяснения и инструменты, которые действительно работают. Именно для этого и существует этот сайт.",
      nav: "Выбрать первую книгу",
      read: "Читать бесплатно",
    },
    footer: {
      tagline: "Доказательная нейробиология простым языком.",
      about:
        "Книги о мозге, памяти, сне, энергии, привычках и когнитивном здоровье для читателей России и СНГ. Без эзотерики, псевдонауки и мотивационного шума.",
      moreBooks: "и ещё 8 книг",
      disclaimer:
        "Материалы сайта носят образовательный характер и не заменяют консультацию врача, психиатра, психотерапевта или другого специалиста здравоохранения. При острых состояниях обращайтесь к специалистам и службам экстренной помощи.",
    },
  },
  en: {
    hero: {
      h1: "Your brain isn’t lazy. It’s trying to protect you.",
      dek: "Books for people tired of living on autopilot.",
      lead: "Plain language on stress, memory, sleep, attention and energy — no woo, no biohacking hype, no “just pull yourself together.”",
      sceneEyebrow: "Picture an ordinary morning.",
      scene:
        "You opened the feed “for a couple of minutes.” Then another channel. Then the news. Then messages. Suddenly forty minutes are gone, and a strange heaviness is already there — though the day hasn’t started.",
      familiar: "Sound familiar?",
      why: "Most people blame discipline. Neuroscience says something else: the brain is not sabotaging you. It is adapting to overload.",
      ctaNav: "Choose a first book",
      ctaRead: "Read a free sample",
      proof: "13+ books on how the brain works, cognitive health, and stress.",
      sign: "Pol Grek",
      portraitAlt: "Pol Grek — popular science author on the brain",
    },
    recognize: {
      eyebrow: "You may recognize yourself",
      title: "Don’t look for a diagnosis. Just see how close this is to your days.",
      items: [
        {
          title: "You sleep eight hours and still wake unrested",
          body: "Sometimes the problem is not hours in bed, but whether the nervous system can recover at all.",
        },
        {
          title: "You finish a page and realize you remember none of it",
          body: "Focus is not a character trait. It is a limited brain resource.",
        },
        {
          title: "By evening the only energy left is for scrolling",
          body: "That is not rest. When the tank is empty, the brain picks the cheapest dopamine.",
        },
        {
          title: "You stay anxious even when “objectively everything is fine”",
          body: "When stress lasts for months, the brain starts treating alarm as the normal background of life.",
        },
      ],
      close: "If even two of these feel familiar — you are the reader I write for.",
    },
    navigator: {
      eyebrow: "Navigator",
      title: "Where should you start?",
      lead: "Don’t pick a book by its title. Pick the state that gets in the way of living, right now.",
      cta: "To the book",
    },
    author: {
      eyebrow: "About the author",
      title: "Who is Pol Grek?",
      p1: "I don’t teach people to “become a better version of themselves.”",
      p2: "I’m more interested in another question: why a smart, adult, disciplined person suddenly stops handling what used to come easily.",
      p3: "That’s why the books are not about motivation. They are about neuroscience: memory, stress, attention, habits, sleep, and cognitive longevity.",
      p4: "Every book starts with respect for the reader. Behavior almost always has a biological cause before it has a moral one.",
      more: "More about the author",
      portraitAlt: "Pol Grek",
    },
    books: {
      eyebrow: "Books",
      title: "The books readers usually start with",
      all: "See all 13 books",
      excerpt: "Read sample",
      litres: "LitRes",
      amazon: "Amazon",
      items: [
        {
          slug: "mozg-na-100",
          tag: "Memory · Attention",
          forWhom: "For people who want clear thinking for decades, not a miracle week.",
          body: "Why does memory shift after 40? Which habits actually lower cognitive-decline risk? What does the science say instead of “brain pill” myths?",
          store: "litres" as const,
        },
        {
          slug: "anatomiya-energii",
          tag: "Energy",
          forWhom: "For people who “do everything right” and still feel emptied out.",
          body: "Three systems that decide your energy: circadian rhythm, cognitive load, and cellular energetics.",
          store: "amazon" as const,
        },
        {
          slug: "mentalnyy-debag",
          tag: "Focus",
          forWhom: "If you keep putting off what matters and then blame yourself.",
          body: "Not another productivity book. A practical protocol for getting out from between notifications and thinking in depth again.",
          store: "litres" as const,
        },
      ],
    },
    philosophy: {
      eyebrow: "What I believe",
      h: "The brain is not the enemy.",
      p1: "When we forget what matters, scroll instead of rest, snap at people close to us, or cannot start the work — that is not always a weak character.",
      p2: "More often it is how the nervous system tries to protect a person from overload.",
      h2: "Science does not make life perfect.",
      p3: "It makes a person more understandable to themselves.",
    },
    lab: {
      eyebrow: "Lab",
      title: "Pol Grek Lab",
      lead: "Material that is not a book yet: short research notes, neuro protocols, attention experiments, and free tools for readers.",
      cta: "Open the lab",
      items: [
        {
          href: "/en/lab/#checkup",
          title: "A 3-minute neuro checkup",
          body: "Four questions to see what is draining brain resource the most right now.",
        },
        {
          href: "/en/lab/#checkup",
          title: "A 15-minute dopamine debug",
          body: "A practice for stepping out of endless information consumption.",
        },
        {
          href: "/en/lab/#prompts",
          title: "ChatGPT templates",
          body: "Ready prompts for structuring thought, deep work, and cutting informational noise.",
        },
        {
          href: "/en/lab/#beta",
          title: "Drafts of new research",
          body: "The most interesting ideas often appear long before a new book.",
        },
      ],
    },
    social: {
      eyebrow: "Threads and Telegram",
      title: "Where new books are born",
      lead: "Social media is not a wall of motivational quotes. It is a working lab: field notes, new studies in plain language, and ideas tested before they become chapters.",
      threadsTitle: "Threads",
      threadsBody: "Short neuroscience notes on attention, sleep, and the brain in ordinary days.",
      threadsCta: "Read Threads",
      telegramTitle: "Telegram",
      telegramBody: "Deeper pieces, new chapters, protocols, and book news without ad noise.",
      telegramCta: "Open Telegram",
      close: "The best ideas show up here first. Only later do they become chapters.",
    },
    cta: {
      title: "Don’t start with the most popular book. Start with the one that solves your problem.",
      body: "If you read this far, you don’t need loud promises. You need clear explanations and tools that actually work. That is what this site is for.",
      nav: "Choose a first book",
      read: "Read for free",
    },
    footer: {
      tagline: "Evidence-based neuroscience in plain language.",
      about:
        "Books on the brain, memory, sleep, energy, habits, and cognitive health — without woo, pseudoscience, or motivational noise.",
      moreBooks: "and 8 more books",
      disclaimer:
        "Educational material. Not a substitute for a doctor, psychiatrist, psychotherapist, or other health professional. In acute states, contact specialists and emergency services.",
    },
  },
} as const;

export type HomeCopy = (typeof HOME)["ru"];

export function home(locale: Locale): HomeCopy {
  return HOME[locale] as HomeCopy;
}

export const HOME_FOOTER_SLUGS = [
  "mozg-na-100",
  "anatomiya-energii",
  "mentalnyy-debag",
  "stress-i-mozg",
  "svyashchennye-chasy",
] as const;

export const DEFAULT_SAMPLE_SLUG = "mentalnyy-debag";
