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
      lead: "Пишу о том, почему утром рука сама тянется к Telegram, почему к трём часам голова уже не варит — и почему это редко про лень.",
      sceneEyebrow: "Обычное утро.",
      scene:
        "Открыли Telegram «на пару минут». Потом ещё канал. Потом новости. Потом сообщения. Прошло сорок минут, а внутри уже тяжесть — хотя день ещё даже не начался.",
      familiar: "Знакомо?",
      why: "Кажется, что вы просто не собрались. Чаще так выглядит перегруженная нервная система: мозг не против вас. Он экономит силы.",
      ctaNav: "Найти свою проблему",
      ctaRead: "Читать главу бесплатно",
      proof: "Книги и разборы о мозге, сне и энергии — для читателей России и СНГ.",
      sign: "Пол Грэк",
      portraitAlt: "Пол Грэк — автор научпопа о мозге",
    },
    recognize: {
      eyebrow: "Возможно, вы узнаете себя",
      title: "Не ищите диагноз. Просто узнайте, не ваши ли это дни.",
      items: [
        {
          title: "Спите по восемь часов — и всё равно встаёте разбитым",
          body: "Иногда дело не в часах в кровати, а в том, успевает ли нервная система вообще выключиться.",
        },
        {
          title: "Дочитали страницу — и не помните ни строчки",
          body: "Внимание не черта характера. Это ресурс, который кончается раньше, чем мы привыкли думать.",
        },
        {
          title: "К вечеру сил хватает только листать ленту",
          body: "Это не отдых. Когда сил почти нет, мозг выбирает самое лёгкое: ещё один ролик, а не трудное дело.",
        },
        {
          title: "Тревожно, хотя «в жизни вроде всё нормально»",
          body: "Если напряжение тянется месяцами, мозг начинает считать его обычным фоном. Как шум холодильника — пока не сломается.",
        },
      ],
      close: "Если хотя бы два пункта про вас — я пишу как раз для вас.",
    },
    navigator: {
      eyebrow: "Навигатор",
      title: "С чего начать?",
      lead: "Не выбирайте книгу по названию. Выберите состояние, которое сейчас мешает сильнее всего.",
      cta: "К книге",
    },
    author: {
      eyebrow: "Об авторе",
      title: "Кто такой Пол Грэк?",
      p1: "Пишу научно-популярные книги о мозге, сне, энергии, стрессе и о том, почему с возрастом кажется, что память стала хуже.",
      p2: "Не для тех, кто собирает советы. Для тех, кто хочет понять, что с ним происходит.",
      p3: "Разбираю обычные сцены и отделяю то, что говорит наука, от красивых объяснений ленты.",
      p4: "Поведение почти всегда имеет биологическую причину раньше, чем моральную. Это не оправдание. Это место, с которого можно начать.",
      more: "Подробнее об авторе",
      portraitAlt: "Пол Грэк",
    },
    books: {
      eyebrow: "Книги",
      title: "С этих книг чаще всего начинают",
      all: "Посмотреть все 13 книг",
      excerpt: "Читать главу",
      litres: "Купить на Литрес",
      amazon: "Купить на Amazon",
      items: [
        {
          slug: "zhenskiy-mozg",
          tag: "Цикл · Ясность",
          forWhom: "Если в разные недели месяца голова работает по-разному — и вам говорят «привыкайте».",
          body: "Часто это физиология, не «характер» и не «женская логика». Два голоса: лаборатория и кабинет.",
          store: "litres" as const,
        },
        {
          slug: "biohacking-mozga",
          tag: "Фильтр хайпа",
          forWhom: "Если уже пробовали «прокачать мозг» — и устали от чужих стеков.",
          body: "Сон, свет, стресс, лента. Что оставить, что отсечь. Главное — вовремя остановиться, а не собрать аптечку из рекламы.",
          store: "amazon" as const,
        },
        {
          slug: "mozg-i-dengi",
          tag: "Решения · Деньги",
          forWhom: "Если покупки «для спокойствия» случаются после девяти вечера.",
          body: "Мозг считает риск иначе, когда устал или на взводе. Не жадность. Состояние. Без графиков акций.",
          store: "litres" as const,
        },
      ],
    },
    philosophy: {
      eyebrow: "Во что я верю",
      h: "Мозг не наш враг.",
      p1: "Когда забываем важное, снова открываем ленту вместо отдыха, срываемся на близких или не можем начать работу — это не всегда «характер».",
      p2: "Чаще нервная система так пытается не сломаться от перегрузки.",
      h2: "Наука не делает жизнь идеальной.",
      p3: "Она делает человека понятнее самому себе.",
    },
    lab: {
      eyebrow: "Лаборатория",
      title: "Лаборатория Пола Грэка",
      lead: "Здесь разборы, которые ещё не стали книгами. Обычная сцена, что на это говорит наука, и что можно проверить на себе уже сегодня.",
      cta: "Открыть лабораторию",
      items: [
        {
          href: "/lab/#checkup",
          title: "Четыре вопроса про мозг",
          body: "Не тест личности. Помогает понять, что сейчас сильнее всего съедает силы.",
        },
        {
          href: "/lab/telegram-lenta/",
          title: "Утро без ленты",
          body: "Короткий опыт: что будет с вниманием, если первые двадцать минут не открывать Telegram.",
        },
        {
          href: "/lab/#prompts",
          title: "Заготовки для ChatGPT",
          body: "Чтобы свалить мысли в кучу — и получить обратно порядок, а не ещё один поток советов.",
        },
        {
          href: "/lab/#myths",
          title: "Разборы мифов",
          body: "«Два литра воды», «лень в три часа», «Telegram убивает дофамин» — что из этого наука, а что слоган.",
        },
      ],
    },
    social: {
      eyebrow: "Threads и Telegram",
      title: "Где сначала появляются книги",
      lead: "Соцсети для меня не витрина с цитатами. Там я пробую мысли вслух — и смотрю, какие из них потом становятся главами.",
      threadsTitle: "Threads",
      threadsBody: "Короткие разборы: внимание, сон, почему мозг делает именно так, а не иначе.",
      threadsCta: "Читать Threads",
      telegramTitle: "Telegram",
      telegramBody: "Длиннее, чем пост. Новые главы, разборы и анонсы — без мотивационного шума.",
      telegramCta: "Перейти в Telegram",
      close: "Лучшие мысли сначала появляются здесь. Потом — в книгах.",
    },
    cta: {
      title: "Не самую известную книгу. Ту, что про ваши дни.",
      body: "Если вы дочитали досюда, громкие обещания вам не нужны. Нужны понятные объяснения и то, что можно проверить на себе. Для этого сайт и сделан.",
      nav: "Выбрать первую книгу",
      read: "Читать бесплатно",
    },
    footer: {
      tagline: "Наука о мозге — простым языком.",
      about:
        "Книги о памяти, сне, энергии, привычках и ясности — для читателей России и СНГ. Без эзотерики, чудо-методов и мотивационного шума.",
      moreBooks: "и ещё 8 книг",
      disclaimer:
        "Материалы сайта носят образовательный характер и не заменяют консультацию врача, психиатра, психотерапевта или другого специалиста. При острых состояниях обращайтесь к специалистам и службам экстренной помощи.",
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
      p1: "Author of popular-science books on the brain, stress, sleep, energy, cognitive longevity, and behavior.",
      p2: "I write for people who want more than another internet tip — who want to understand what is happening to them.",
      p3: "I take apart what is happening to you, and I separate science from neat explanations.",
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
          slug: "zhenskiy-mozg",
          tag: "Cycle · Clarity",
          forWhom: "If your mind works differently across the month — and you’re told to “just get used to it.”",
          body: "Often physiology, not character or “female logic.” Two voices: the lab and the clinic.",
          store: "litres" as const,
        },
        {
          slug: "biohacking-mozga",
          tag: "Hype filter",
          forWhom: "If you’ve already tried to “hack your brain” — and you’re tired of other people’s stacks.",
          body: "Sleep, light, stress, the feed. What to keep, what to cut. The skill is stopping in time, not collecting a pharmacy from ads.",
          store: "amazon" as const,
        },
        {
          slug: "mozg-i-dengi",
          tag: "Decisions · Money",
          forWhom: "If “just to feel calmer” purchases tend to happen after 9 p.m.",
          body: "The brain scores risk differently when you’re tired or on edge. Not greed. A state. No stock charts.",
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
