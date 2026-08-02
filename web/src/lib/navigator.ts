import type { NavigatorCategory } from "./types";

/** Neuro Navigator categories — problem → fact → protocol → book */
export const NAVIGATOR: NavigatorCategory[] = [
  {
    id: "burnout",
    emoji: "🤯",
    label: "Выгорание и усталость",
    labelEn: "Burnout & fatigue",
    fact:
      "Выходные восстанавливают время, а не обязательно адаптационный ресурс. Истощение и «просто отдых» — разные режимы нервной системы.",
    factEn:
      "Weekends restore time, not always adaptive capacity. Depletion and “just rest” are different nervous-system modes.",
    protocol:
      "Сегодня: 15 минут без входящего потока (лента, чаты). Не «медитация по методичке» — тишина. Один вечер без «ещё одну вкладку».",
    protocolEn:
      "Today: 15 minutes with no inbound stream (feeds, chats). Not a scripted meditation — quiet. One evening without “one more tab.”",
    bookSlug: "reset",
  },
  {
    id: "fog",
    emoji: "🌫️",
    label: "Туман / память после 40",
    labelEn: "Brain fog / memory after 40",
    fact:
      "Мозг не видеорегистратор. Он сжимает «неважное» и держит ресурс на решения. Туман часто = сон + нагрузка + миф «возраст сделал глупее».",
    factEn:
      "The brain is not a dashcam. It compresses the “unimportant” and budgets resource for decisions. Fog is often sleep + load + the “age made me dumber” myth.",
    protocol:
      "Одно важное дело — одним предложением до ленты. Внешний якорь вместо «просто запомни».",
    protocolEn:
      "One important thing — one sentence, before the feed. An external anchor instead of “just remember.”",
    bookSlug: "mozg-na-100",
  },
  {
    id: "stress",
    emoji: "⚡",
    label: "Стресс и тревога",
    labelEn: "Stress & anxiety",
    fact:
      "«Просто успокойся» почти бесполезен: эмоциональный контур быстрее «разумного». Петля в теле уже крутится, пока вы «логически понимаете».",
    factEn:
      "“Just calm down” rarely works: the emotional circuit outruns deliberate thought. The body loop is already spinning while you “logically understand.”",
    protocol:
      "Один следующий шаг на 2 минуты. Не план на год — один конкретный микрошаг. Выдох длиннее вдоха × 5.",
    protocolEn:
      "One next step for 2 minutes. Not a year plan — one concrete micro-step. Exhale longer than inhale × 5.",
    bookSlug: "stress-i-mozg",
  },
  {
    id: "money",
    emoji: "💸",
    label: "Импульсы / мозг и деньги",
    labelEn: "Impulses / money & mind",
    fact:
      "К вечеру «сила воли» уже съедена. Это не характер и не жадность — другой режим просчёта риска, когда ресурс на дне.",
    factEn:
      "By evening “willpower” is already spent. Not character or greed — a different risk-scoring mode when the tank is empty.",
    protocol:
      "Важные деньги-решения — не после 21:00. Импульс: 24 часа в заметках, вне корзины.",
    protocolEn:
      "Money decisions that matter — not after 9pm. Impulse buys: 24 hours in notes, out of the cart.",
    bookSlug: "mozg-i-dengi",
  },
  {
    id: "focus",
    emoji: "🎯",
    label: "Потеря фокуса",
    labelEn: "Lost focus",
    fact:
      "Длинный текст без срочной награды — дорогой процесс. Скачки «проверить чат» уже съели рабочую память к вечеру.",
    factEn:
      "Long text without an urgent reward is expensive. “Quick check” jumps already spent working memory by evening.",
    protocol:
      "10 минут: телефон в другой комнате, один абзац без «проверить». Не час — десять минут.",
    protocolEn:
      "10 minutes: phone in another room, one paragraph with no “quick check.” Not an hour — ten minutes.",
    bookSlug: "biohacking-mozga",
  },
];
