import type { Book } from "@/lib/types";
import type { Locale } from "@/lib/types";

/** English overlay for catalog books (marketing + SEO). */
export type BookEn = {
  title: string;
  subtitle: string;
  promise: string;
  annotation: string;
  series: string;
  authors: string[];
  forWhom: string[];
  takeaways: string[];
};

export const BOOKS_EN: Record<string, BookEn> = {
  "mozg-na-100": {
    title: "Brain on 100+",
    subtitle: "What actually keeps clarity with age — and what stays a myth",
    promise: "Not “genius in a week.” How not to lose sharpness while busy with “more important” things.",
    annotation:
      "Not a hack list. A calm plan: what really protects clarity over decades, and what is marketing. 100+ studies, evidence grades A–D. No superhuman promises.",
    series: "Brain series",
    authors: ["Pol Grek"],
    forWhom: [
      "After 40 — fog, memory, cotton-head days",
      "Tired of miracle-pill ads",
      "Want mechanics, not slogans",
      "Ready for basics: sleep, movement, effortful load",
    ],
    takeaways: [
      "Sleep, movement, blood pressure, sugar — main levers",
      "Night cleanup of the brain — without magic",
      "Cognitive reserve: build it, don’t wait for genes",
      "What quietly steals memory in a normal day",
      "40 / 50 / 60+ — without “too late” panic",
    ],
  },
  "biohacking-mozga": {
    title: "Brain Biohacking",
    subtitle: "Memory, focus, energy — without upgrading until you break",
    promise: "What to keep, what to cut. Base dose first — no magic stacks.",
    annotation:
      "Tried everything — burned out. This book so you don’t pay the same price. Neuroplasticity, stress, dopamine, sleep, light, movement. The core skill: knowing when to stop.",
    series: "Brain series",
    authors: ["Pol Grek"],
    forWhom: [
      "Tried to “upgrade” the brain — and burned out",
      "Want data, not feed gurus",
      "Only interventions with evidence grades",
      "Need a rhythm, not a war with yourself",
    ],
    takeaways: [
      "Neuroplasticity without fairy tales",
      "Why “fast” methods burn you out",
      "Sleep, light, movement — before any stack",
      "Where nootropics and trends hit a wall",
      "Minimum effective dose",
    ],
  },
  "anatomiya-energii": {
    title: "Anatomy of Energy",
    subtitle: "Three systems that decide if you have fuel left",
    promise: "Three systems. Fix only one — “doing everything right” still fails.",
    annotation:
      "The 3pm crash is not character. Mitochondria, cognitive load, circadian rhythm. Fix one and ignore the rest — wonder why “everything correct” doesn’t work. Plus: what not to buy.",
    series: "Recovery",
    authors: ["Pol Grek"],
    forWhom: [
      "Empty by lunch",
      "Shift work or 10 hours at a desk",
      "Tired of wellness hype",
      "Want simple levers, not a cabinet of pills",
    ],
    takeaways: [
      "Three energy sources: mito / cognitive / circadian",
      "Self-checks and short experiments",
      "Evidence grades on interventions",
      "What doesn’t work: alkaline, detox scams",
    ],
  },
  "mozg-i-dengi": {
    title: "Wired for Wealth",
    subtitle: "Money is not pure math. It’s neurobiology",
    promise: "Not about greed. How the brain scores risk — shopping, loss aversion, status on credit.",
    annotation:
      "Income “exists,” willpower fails — and it’s not character. Dopamine and shopping, loss aversion, status on credit, scarcity tunnel. No stock charts. About the autopilot — so prefrontal cortex leads again.",
    series: "Brain series",
    authors: ["Pol Grek"],
    forWhom: [
      "Income without savings",
      "Mood purchases",
      "Tired of “pull yourself together”",
      "Want mechanics, not moral lectures",
    ],
    takeaways: [
      "Dopamine is the hormone of anticipation",
      "Why losses hurt more than wins feel good",
      "Financial brain profiles",
      "Stress and tunnel thinking",
      "Choice-architecture protocol",
    ],
  },
  "snachala-dengi-potom-soznanie": {
    title: "Money First, Then Consciousness",
    subtitle: "How external order rewires thinking",
    promise: "Fix operations first. “Consciousness” gets clearer after. Not affirmations instead of receivables.",
    annotation:
      "Read about abundance mindsets — receivables still sit. Flip the order: action and systems first, clarity second. When cortisol is high, you need scripts and deadlines — not the Universe.",
    series: "Brain series · money",
    authors: ["Pol Grek"],
    forWhom: [
      "Leaky ops — “clearing blocks” instead of calls",
      "Abundance books, frozen runway",
      "Tired of waiting for the right state",
      "Need CRM, scripts, 90 days — not metaphysics",
    ],
    takeaways: [
      "“Mindset first” is often escape from calls",
      "Action before readiness",
      "Receivables as 24/7 stress",
      "Cases: marketplace, IT, course without “full readiness”",
      "Formula: ops → results → rewiring",
    ],
  },
  "stress-i-mozg": {
    title: "Stress & the Brain",
    subtitle: "When “just calm down” does nothing",
    promise: "Cortisol, amygdala, one next step. No “just relax.”",
    annotation:
      "The brain loves the feeling of control — especially when there is none. Cortisol, amygdala, prefrontal cortex, sleep, boundaries. “Just calm down” is the least useful advice. Give the system one clear step.",
    series: "Brain series",
    authors: ["Pol Grek"],
    forWhom: [
      "Tension became the background noise",
      "Under stress — worse decisions",
      "Lead people or projects",
      "Need a mechanism, not affirmations",
    ],
    takeaways: [
      "Stress as adaptive machinery",
      "Too little and too much cortisol — different problems",
      "Your stress profile",
      "Techniques and a longer strategy",
    ],
  },
  reset: {
    title: "RESET",
    subtitle: "When weekends don’t help — and it isn’t laziness",
    promise: "Fatigue recovers with rest. Burnout does not. Where to actually start.",
    annotation:
      "Written from lived experience. Not positive thinking. Why “just rest” fails and where recovery really starts. Allostasis, capacity, regaining control.",
    series: "Recovery",
    authors: ["Pol Grek"],
    forWhom: [
      "Weekends don’t restore you",
      "Nothing lands — and it’s past “just tired”",
      "Want the mechanism, not another pep talk",
    ],
    takeaways: [
      "Burnout ≠ ordinary fatigue",
      "Markers of systemic depletion",
      "Why “just rest” fails",
      "Where recovery actually starts",
    ],
  },
  "mentalnyy-debag": {
    title: "Mental Debug",
    subtitle: "Short steps when you have no fuel for “personal growth”",
    promise: "Motivation is a byproduct. Move first — mood second.",
    annotation:
      "When self-help books irritate and you have no energy to “work on yourself.” Short steps: action first, state second. Don’t fix motivation — fix entry into action.",
    series: "Recovery",
    authors: ["Pol Grek"],
    forWhom: [
      "Anxiety and emptiness on a workday background",
      "No capacity for long programs",
      "Need a step, not inspiration",
    ],
    takeaways: [
      "Find where the system broke",
      "Short recovery protocols",
      "Don’t confuse laziness with physiology",
    ],
  },
  "ostorozhnyy-biohaker": {
    title: "The Careful Biohacker",
    subtitle: "First, do no harm. Core skill: knowing when to stop",
    promise: "“Two liters of water” is often marketing. Hype filter, not a protocol race.",
    annotation:
      "More protocols often means worse results. Separate signal from feed marketing without turning life into a lab with no days off. Careful is not timid — it’s about expensive mistakes you can skip.",
    series: "Brain series",
    authors: ["Pol Grek"],
    forWhom: [
      "Just starting — and the feed already stacks pressure",
      "Already overdid experiments",
    ],
    takeaways: [
      "Philosophy of a careful approach",
      "Filters for trends and hype",
      "Base before stack",
    ],
  },
  "svyashchennye-chasy": {
    title: "Sacred Hours",
    subtitle: "Sleep, cycles, light — no mysticism",
    promise: "You “sleep 8 hours” and still feel wrecked. Count cycles; cut inbound noise.",
    annotation:
      "Sleep and circadian rhythm without woo. Cycles, light, melatonin. Short steps that fit a normal day. Lying with a phone is not rest — the brain is still chewing the feed.",
    series: "Recovery",
    authors: ["Pol Grek"],
    forWhom: [
      "Eight hours in bed — still broken",
      "Screens late, phone first thing",
      "Want short steps, not a monk schedule",
    ],
    takeaways: [
      "Count cycles, not only hours",
      "Morning and evening light",
      "5–20 minute daily protocols",
    ],
  },
  "zhenskiy-mozg": {
    title: "The Female Brain",
    subtitle: "Hormones, cycles, clarity — without myths and “female logic”",
    promise: "Two voices: lab + clinic. “Just get used to it” is not an answer.",
    annotation:
      "“I no longer understand my brain” is often physiology, not character. Cycle, perimenopause, clarity. Pol — mechanisms. Laura (clinic) — what people actually say in the chair. No woo, no labels.",
    series: "With Laura",
    authors: ["Pol Grek", "Laura Grek"],
    forWhom: [
      "Different cycle weeks — different mind",
      "Perimenopause: fog, anxiety, insomnia",
      "Tired of “it’s age” / “get used to it”",
      "Partners who want to understand",
    ],
    takeaways: [
      "How hormones shift thinking and emotion",
      "The cycle as neurobiological context",
      "What science supports — and what it doesn’t",
      "Practices and red flags",
    ],
  },
  "muzhskoy-mozg": {
    title: "The Male Brain",
    subtitle: "Energy and focus after 40 — without panic about age 25",
    promise: "Energy fades by lunch. Not “just age.” Adult version — not chasing 25.",
    annotation:
      "After 40: testosterone, energy, focus, relationships. No shame, no midlife-crisis panic, no miracles. Pol and Laura — mechanics, not moralizing.",
    series: "With Laura",
    authors: ["Pol Grek", "Laura Grek"],
    forWhom: [
      "35–55: energy and focus feel off",
      "Irritation “from nowhere”",
      "Want mechanics, not “midlife crisis” framing",
    ],
    takeaways: [
      "Male brain ≠ female + testosterone",
      "Energy and recovery",
      "Cognitive power after 40",
      "Relationships and an 8-week protocol",
    ],
  },
  "ei-2": {
    title: "Emotional Intelligence 2.0",
    subtitle: "Amygdala, dopamine, shame — instead of “just calm down”",
    promise: "“Just calm down” is the least useful advice. The amygdala outruns thought.",
    annotation:
      "Amygdala faster than thought. Not weakness — architecture. Cheap feed dopamine, shame, guilt. STOP, breath, one micro-step. Popular science — not a therapy replacement when things are heavy.",
    series: "Mind",
    authors: ["Pol Grek", "Laura Grek"],
    forWhom: [
      "Emotions grab the wheel",
      "Shame and guilt eat capacity",
      "Need skills, not “just calm down”",
    ],
    takeaways: [
      "Amygdala vs prefrontal cortex",
      "Social-media dopamine",
      "STOP, RAIN, breath",
      "Shame through self-compassion",
    ],
  },
};

/** Merge EN overlay onto base book record. */
export function localizeBook(book: Book, locale: Locale): Book {
  if (locale !== "en") return book;
  const en = BOOKS_EN[book.slug];
  if (!en) {
    return {
      ...book,
      authors: book.authors.map((a) =>
        a === "Пол Грэк" ? "Pol Grek" : a === "Лора Грэк" ? "Laura Grek" : a
      ),
    };
  }
  return {
    ...book,
    title: en.title,
    subtitle: en.subtitle,
    promise: en.promise,
    annotation: en.annotation,
    series: en.series,
    authors: en.authors,
    forWhom: en.forWhom,
    takeaways: en.takeaways,
  };
}
