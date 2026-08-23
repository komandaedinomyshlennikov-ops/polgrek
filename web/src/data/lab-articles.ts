import { DVA_LITRA } from "./lab-dva-litra";
import { PROVAL_15 } from "./lab-proval-15";
import { TELEGRAM_LENTA } from "./lab-telegram";
import { UMNYE_DENGI } from "./lab-umnye-dengi";
import type { LabArticle, LabBlock } from "./lab-types";

export type { EvidenceGrade, LabArticle, LabBlock } from "./lab-types";

export type LabMyth = {
  title: string;
  body: string;
  status: "soon";
};

export const LAB_PATH = {
  observe: "Наблюдение",
  mechanics: "Механика мозга",
  experiment: "Эксперимент",
  evidence: "Доказательства",
} as const;

export const LAB_MYTHS: LabMyth[] = [
  {
    title: "Холодный душ действительно повышает дофамин?",
    body: "Разбираем, где заканчиваются реальные данные и начинаются преувеличения.",
    status: "soon",
  },
  {
    title: "Ноотропы: помогают ли здоровому мозгу?",
    body: "Без рекламы производителей и без категоричных обещаний.",
    status: "soon",
  },
  {
    title: "Правда ли, что успешные люди обязаны вставать в 5 утра?",
    body: "Почему хронотип важнее красивых историй из интернета.",
    status: "soon",
  },
];

export const LAB_EXPERIMENTS = [
  {
    id: "no-feed-15",
    title: "15 минут без входящей информации",
    body: "Никаких лент, сообщений, видео и музыки. Просто наблюдение за тем, как меняется внимание.",
    minutes: 15,
  },
  {
    id: "one-tab",
    title: "Один вечер без «ещё одной вкладки»",
    body: "Эксперимент показывает не силу воли, а уровень когнитивной усталости.",
    minutes: 0,
  },
  {
    id: "three-decisions",
    title: "Дневник трёх решений",
    body: "Почему важные решения лучше принимать до вечера, а не после 21:00.",
    minutes: 0,
  },
  {
    id: "info-hunger",
    title: "Тест на информационный голод",
    body: "Простая практика помогает отличить настоящую усталость от привычки постоянно получать стимулы.",
    minutes: 0,
  },
];

export const LAB_ARTICLES: LabArticle[] = [TELEGRAM_LENTA, PROVAL_15, DVA_LITRA, UMNYE_DENGI];

export function getLabArticles(): LabArticle[] {
  return LAB_ARTICLES.filter((a) => a.status === "live");
}

export function getLabArticle(slug: string): LabArticle | undefined {
  return LAB_ARTICLES.find((a) => a.slug === slug);
}

export function labHeadings(article: LabArticle): Array<{ id: string; text: string }> {
  return article.body.filter((b): b is Extract<LabBlock, { type: "h2" }> => b.type === "h2");
}
