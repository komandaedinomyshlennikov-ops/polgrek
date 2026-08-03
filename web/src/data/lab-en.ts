import type { LabCheckQuestion, LabProtocol, LabPrompt, LabResult } from "./lab";

export const LAB_CHECKUP_EN: LabCheckQuestion[] = [
  {
    id: "noise",
    q: "How noisy is your content stream right now?",
    options: [
      { id: "n0", label: "Quiet. I can finish a paragraph", score: 0 },
      { id: "n1", label: "Feed/chats running in the background", score: 1 },
      { id: "n2", label: "I jump every 1–2 minutes", score: 2 },
      { id: "n3", label: "Head = 40 open tabs", score: 3 },
    ],
  },
  {
    id: "will",
    q: "How much “willpower” is left at this hour?",
    options: [
      { id: "w0", label: "Enough for one important thing", score: 0 },
      { id: "w1", label: "Only small tasks", score: 1 },
      { id: "w2", label: "Only “one more” notification", score: 2 },
      { id: "w3", label: "Tank empty. Decisions are dangerous", score: 3 },
    ],
  },
  {
    id: "body",
    q: "Is the body already in “threat” while you still “logically understand”?",
    options: [
      { id: "b0", label: "No — system is even", score: 0 },
      { id: "b1", label: "Light anxiety hum", score: 1 },
      { id: "b2", label: "Jaw / shoulders / breath already ahead", score: 2 },
      { id: "b3", label: "“Just calm down” sounds like mockery", score: 3 },
    ],
  },
  {
    id: "start",
    q: "The task you’re delaying: what blocks the start?",
    options: [
      { id: "s0", label: "Nothing — I just do it", score: 0 },
      { id: "s1", label: "Waiting for the “right mood”", score: 1 },
      { id: "s2", label: "Perfect plan ate the entry", score: 2 },
      { id: "s3", label: "Even opening the file feels like a mountain", score: 3 },
    ],
  },
];

export const LAB_RESULTS_EN: LabResult[] = [
  {
    id: "quiet",
    min: 0,
    max: 3,
    title: "System relatively quiet",
    body: "Not “you’re perfect.” You have a window. Don’t spend it on another tab — put one important thing into 10 minutes.",
    protocol: "Timer: 10 minutes. Only start the task. No perfect plan.",
    bookSlug: "mentalnyy-debag",
    bookLabel: "Mental Debug",
    readHref: "/en/read/mentalnyy-debag/",
  },
  {
    id: "noise",
    min: 4,
    max: 7,
    title: "Noise is already eating working memory",
    body: "Not laziness. Context and feeds spent the attention budget. Cut inbound first — then “try harder.”",
    protocol: "15 minutes without phone or background noise. Book / shower / sit. Notice when the hand reaches to check.",
    bookSlug: "biohacking-mozga",
    bookLabel: "Brain Biohacking",
    readHref: "/en/read/biohacking-mozga/",
  },
  {
    id: "threat",
    min: 8,
    max: 11,
    title: "Body already in threat mode",
    body: "Emotional circuitry outruns “reason.” “Just calm down” is almost useless. One micro-step — not a year plan.",
    protocol: "STOP 90 sec: name the feeling → longer exhale ×5 → one 2-minute step.",
    bookSlug: "ei-2",
    bookLabel: "Emotional Intelligence 2.0",
    readHref: "/en/read/ei-2/",
  },
  {
    id: "empty",
    min: 12,
    max: 99,
    title: "Capacity at the bottom — not character",
    body: "Weekends may have “passed.” Burnout and rest are different modes. Not shame — allostasis. Minimum first, not heroics.",
    protocol: "One evening: 15 minutes with no inbound. Important decisions — not after 9pm today.",
    bookSlug: "reset",
    bookLabel: "RESET",
    readHref: "/en/read/reset/",
  },
];

export function scoreToResultEn(total: number): LabResult {
  return (
    LAB_RESULTS_EN.find((r) => total >= r.min && total <= r.max) ||
    LAB_RESULTS_EN[LAB_RESULTS_EN.length - 1]
  );
}

export const LAB_PROTOCOLS_EN: LabProtocol[] = [
  {
    id: "dopamine-debug",
    status: "beta",
    statusLabel: "● Beta",
    title: "Protocol: Dopamine debug",
    body: "Reward-system reset in ~15 minutes. No scripted meditations. Cut the cheap stream first — then the task.",
    minutes: 15,
    cta: "Open protocol →",
    href: "/en/lab/#checkup",
  },
  {
    id: "focus-10",
    status: "live",
    statusLabel: "● In the field",
    title: "10 minutes without “checking”",
    body: "Phone in another room. One paragraph / one file. Not an hour — ten minutes. The brain latches onto what started.",
    minutes: 10,
    cta: "Related: Mental Debug",
    href: "/en/read/mentalnyy-debag/",
  },
  {
    id: "evening-bank",
    status: "live",
    statusLabel: "● In the field",
    title: "Decision bank after 9pm",
    body: "Money and career decisions — not on an empty tank. Impulse: 24 hours in notes, out of the cart.",
    minutes: 2,
    cta: "Chapter: Wired for Wealth",
    href: "/en/read/mozg-i-dengi/",
  },
];

export const LAB_PROMPTS_EN: LabPrompt[] = [
  {
    id: "noise-clean",
    title: "Clean thoughts from noise",
    body: "Chaotic stream → 3 priorities and one next step. No coaching tone.",
    prompt: `You are a calm thought editor, not a motivational coach.
Here is my raw stream (between work, chats, and anxiety):

"""
{{paste stream}}
"""

Do:
1) Separate noise from substance (1–2 sentences).
2) Three priorities for today — actions only, not “become better.”
3) One 10-minute micro-step phrased as “open / write / send.”
4) What to deliberately NOT do for the next 2 hours.
Tone: short, English, no woo, no “you are worthy.”`,
  },
  {
    id: "procrastination",
    title: "Entry into a delayed task",
    body: "When the perfect plan ate the start. Forces beginning, not eternal planning.",
    prompt: `Task I keep delaying: {{task}}.
Context: I am a skeptic, busy, allergic to “level up yourself.”

Give me:
1) Why the brain sabotages entry (1 mechanism, no moralizing).
2) Definition of “started enough” in 10 minutes.
3) Checklist of 3 actions, 2–3 minutes each.
4) What counts as success (not perfect outcome).
No affirmations. Short English.`,
  },
  {
    id: "evening-review",
    title: "Evening debug of the day",
    body: "Not a gratitude journal. Where capacity went, what to carry tomorrow.",
    prompt: `Debug my day as mental debug (not a report to a boss).

Day facts:
"""
{{what happened}}
"""

Output:
1) Where capacity went into noise / threat / impulse (mechanics).
2) One pattern that will repeat tomorrow if nothing changes.
3) One lever for tomorrow before 3pm.
4) One rule after 9pm.
Tone: reframe “not character — system,” short.`,
  },
  {
    id: "focus-block",
    title: "Deep focus block",
    body: "Build 45–90 minutes of work without “just try harder.”",
    prompt: `Build a protocol for one focus block.

Block goal: {{goal}}
Available time: {{minutes}} min
Constraints: {{noise / kids / office}}

Response format:
- Entry condition (what to turn off)
- Definition of done
- 3 stages with timing
- What to do if you slip (no shame)
No woo, no supplements.`,
  },
];
