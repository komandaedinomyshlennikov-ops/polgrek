export type ProblemDoor = {
  id: string;
  label: string;
  labelEn: string;
  scene: string;
  sceneEn: string;
  bookSlug: string;
  articleSlug?: string;
};

export const PROBLEM_DOORS: ProblemDoor[] = [
  {
    id: "fatigue",
    label: "Я постоянно устаю",
    labelEn: "I’m tired all the time",
    scene: "Спите вроде нормально — к 15:00 уже ничего не хочется.",
    sceneEn: "You sleep, then by 3 p.m. nothing is left.",
    bookSlug: "anatomiya-energii",
    articleSlug: "proval-15",
  },
  {
    id: "focus",
    label: "Мне трудно сосредоточиться",
    labelEn: "I can’t hold focus",
    scene: "Открыли Telegram на минуту. Прошло сорок.",
    sceneEn: "You opened the feed for a minute. Forty passed.",
    bookSlug: "mentalnyy-debag",
    articleSlug: "telegram-lenta",
  },
  {
    id: "stress",
    label: "Я живу на стрессе",
    labelEn: "I live on stress",
    scene: "Тело реагирует быстрее, чем успеваете подумать.",
    sceneEn: "The body reacts before you have time to think.",
    bookSlug: "stress-i-mozg",
  },
  {
    id: "noise",
    label: "Мозг постоянно занят",
    labelEn: "My head never goes quiet",
    scene: "Лента, чаты, новости — а своей мысли уже нет.",
    sceneEn: "Feeds, chats, news — and no thought of your own.",
    bookSlug: "mentalnyy-debag",
    articleSlug: "telegram-lenta",
  },
  {
    id: "sleep",
    label: "Плохо сплю",
    labelEn: "I sleep badly",
    scene: "Часов в кровати хватает. Восстановления — нет.",
    sceneEn: "Hours in bed. No recovery.",
    bookSlug: "svyashchennye-chasy",
  },
  {
    id: "age",
    label: "Хочу сохранить ясность с возрастом",
    labelEn: "I want a clear mind as I age",
    scene: "Слово на кончике языка. Туман, которого не было пять лет назад.",
    sceneEn: "A word on the tip of the tongue. Fog that wasn’t there five years ago.",
    bookSlug: "mozg-na-100",
  },
];
