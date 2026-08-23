import type { NavigatorCategory } from "./types";

/** Problem → kitchen scene → book. Pick a state, not a title. */
export const NAVIGATOR: NavigatorCategory[] = [
  {
    id: "fatigue",
    label: "Постоянная усталость",
    labelEn: "Constant fatigue",
    scene: "Даже после выходных ощущение, что батарея не заряжается.",
    sceneEn: "Even after the weekend it feels like the battery never charges.",
    bookSlug: "anatomiya-energii",
  },
  {
    id: "fog",
    label: "Память и туман в голове",
    labelEn: "Memory and brain fog",
    scene: "Забываете слова, теряете мысль, сложнее удерживать внимание.",
    sceneEn: "Words slip, a thought vanishes, holding attention gets harder.",
    bookSlug: "mozg-na-100",
  },
  {
    id: "stress",
    label: "Стресс и тревога",
    labelEn: "Stress and anxiety",
    scene: "Тело реагирует быстрее, чем успеваете подумать.",
    sceneEn: "The body reacts before you have time to think.",
    bookSlug: "stress-i-mozg",
  },
  {
    id: "sleep",
    label: "Плохой сон",
    labelEn: "Poor sleep",
    scene: "Вы спите, но не восстанавливаетесь.",
    sceneEn: "You sleep, but you don’t recover.",
    bookSlug: "svyashchennye-chasy",
  },
  {
    id: "start",
    label: "Не могу начать важные дела",
    labelEn: "Can’t start what matters",
    scene: "Прокрастинация выглядит как лень, но редко ею является.",
    sceneEn: "Putting it off looks like laziness. It rarely is.",
    bookSlug: "mentalnyy-debag",
  },
  {
    id: "money",
    label: "Эмоции постоянно влияют на деньги",
    labelEn: "Emotions keep steering money",
    scene: "Импульсивные покупки, тревога и финансовые решения.",
    sceneEn: "Impulse buys, anxiety, and money decisions in the same loop.",
    bookSlug: "snachala-dengi-potom-soznanie",
  },
];
