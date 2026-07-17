/* Lab articles — loaded only on lab pages (E1.5 split) */
(function () {
  if (!window.POL_GREK) {
    console.warn('[pol-grek] data core missing before articles');
    return;
  }
  window.POL_GREK.articles = [
  {
    slug: "motivaciya-pobochnyy-produkt",
    title: "Motivation isn’t why you act. It’s what shows up after you act",
    category: "Brain & behavior",
    hook: "If you’re waiting for the “right mood” before you start — you’re waiting for a signal the brain often never sends. Move first. Mood follows.",
    readMin: 4,
    relatedBook: "mentalnyy-debag",
    source: "Threads · pol.grek · Motivation",
    body: [
      { type: "p", text: "Motivation isn’t the cause of action. It’s a byproduct of action." },
      { type: "p", text: "The leap “I’ll feel ready, then I’ll do it” sounds logical and almost never works. The brain adapts faster to movement already started than to a fantasy of the outcome. Not “work on yourself” — open the doc, send one message, stand up. Any small “I did it.”" },
      { type: "h2", text: "The flip" },
      { type: "p", text: "Waiting for the mood is like waiting for the car to warm up while standing next to it instead of sitting in the driver’s seat. The system will always invent one more reason to wait. That isn’t laziness. It’s thrift: the brain hates spending fuel without a signal that the process has already begun." },
      { type: "h2", text: "Mechanics" },
      { type: "p", text: "The dopamine system latches harder onto something started than onto a perfect plan. Action without mood often creates mood. Mood without action burns off in scrolling. Everyday “motivation → behavior” is overrated; “behavior → state” is not." },
      { type: 'experiment', title: "Mini experiment", text: "One task you’ve been postponing. Ten-minute timer. Not “do it perfectly” — only start. Then decide: continue or stop. Most people continue. That’s data, not character." },
      { type: "p", text: "Practical takeaway: don’t fix motivation. Fix the entry into action. The brain often assembles the rest." }
    ],
  },
  {
    slug: "otdyh-ne-lenta",
    title: "Scrolling is not rest",
    category: "Sleep & energy",
    hook: "You’re in bed with your phone calling it rest. Your brain is still chewing new input — same job it did all day.",
    readMin: 3,
    relatedBook: "svyashchennye-chasy",
    source: "Threads · pol.grek · slowliving",
    body: [
      { type: "p", text: "“Slow living” often hides a simple fact: rest isn’t working. Not because you rest too little — because during “rest” the brain keeps doing work-mode: chewing the incoming stream." },
      { type: "p", text: "Feed, show-plus-scroll, texts in bed — that isn’t recovery. That’s a second shift. The brain doesn’t need “do nothing.” It needs 15–20 minutes without new input. Then it processes what it already has — and clarity shows up." },
      { type: "h2", text: "We used to call this boredom" },
      { type: "p", text: "Now it’s a brand. Same core: give the head time without a task. Real rest starts where the input stream stops. Not “phones are evil.” Attention mechanics." },
      { type: 'experiment', title: "15 minutes without input", text: "Today: 15 minutes without phone or background noise. Not formal meditation — just quiet. When was the last time?" },
      { type: "p", text: "If you want to “quit everything for 30 days,” three days without deadlines and screens sometimes do more. If a week after vacation you want to run again — the problem is the system you return to, not “not enough rest.”" }
    ],
  },
  {
    slug: "kontrol-i-neopredelennost",
    title: "The brain loves a sense of control — especially when it has none",
    category: "Stress & burnout",
    hook: "Panic under uncertainty isn’t weak character. The system didn’t get a clear next step.",
    readMin: 3,
    relatedBook: "stress-i-mozg",
    source: "Threads · pol.grek",
    body: [
      { type: "p", text: "The brain loves a sense of control. Even when there is none. Especially when there is none." },
      { type: "p", text: "So panic in the fog isn’t a verdict on character. It’s a request for a clear task. Give one concrete step — and the background noise often eases. Not because “the year is planned,” but because the system got a signal: movement exists." },
      { type: "h2", text: "Energy spent fighting reality" },
      { type: "p", text: "How much fuel goes to “how it should be” instead of “how it is”? Resistance to reality often costs more than contact with it. Not philosophy. Cost accounting." },
      { type: 'experiment', title: "One next step", text: "Write what’s hanging over you. Cross out everything except one action in the next 24 hours — small enough that it’s embarrassing not to do it. Do it. Panic often drops not from a yearly plan, but from one finished step." }
    ],
  },
  {
    slug: "vygoranie-ne-styd",
    title: "“I’m just burned out” and burnout are the same physiology",
    category: "Stress & burnout",
    hook: "Feeling and mechanism — two words for the same stop sign. The body says halt; we keep driving.",
    readMin: 4,
    relatedBook: "reset",
    source: "Threads · pol.grek · replies",
    body: [
      { type: "p", text: "People say “burnout” was invented so we wouldn’t say “I’m done.” Neurobiologically it’s the same thing. “Done” is the feeling. “Burnout” is the frame: cortisol, depletion, recovery offline. Call it whatever you want. Core: the body hits stop, and we keep going." },
      { type: "h2", text: "Not “I lost it.” Tired of the abstract" },
      { type: "p", text: "Wanting hands-on work instead of KPIs isn’t degradation. It’s a brain that gets little reward from tasks with no visible result. You finished — what changed? Unclear. Dopamine is thin. “I can see it, I did it, day closed” is a different deal." },
      { type: "h2", text: "Rest vs the system" },
      { type: "p", text: "Wanting to disappear for a month isn’t a whim. Signal: resource is low. Sometimes three days without deadlines and phone is enough. If a week after vacation you want out again — it isn’t “add more weekends.” It’s the system you return to." },
      { type: 'experiment', title: "Marker", text: "List three things that used to charge you. Over two weeks: real desire — or only “I should”? If only “I should,” the talk isn’t about days off. RESET is about why rest fails and where to start for real." }
    ],
  },
  {
    slug: "znaniya-ne-dengi",
    title: "Knowledge is potential — not results",
    category: "Money & decisions",
    hook: "Why do smart people stay broke? Power isn’t what you know. It’s what you do with it.",
    readMin: 3,
    relatedBook: "mozg-i-dengi",
    source: "Threads · pol.grek",
    body: [
      { type: "p", text: "Knowledge is potential, not outcome. You can know nutrition and live on takeout. You can know sales and never make a call." },
      { type: "p", text: "The brain is great at swapping action for learning. Another course, another chapter — progress feels real, results don’t. That isn’t “intelligence gets in the way.” It’s choice architecture: studying is safer than risking a move." },
      { type: "h2", text: "The flip" },
      { type: "p", text: "Don’t wait for “now I’m ready.” The brain rarely issues that signal. The gap between knowing and money (or any result) is a finished action — not another PDF." },
      { type: 'experiment', title: "Anti-course week", text: "This week: zero new courses. One action from what you already know. Small. Closed. Visible result beats a perfect plan for the brain." }
    ],
  },
  {
    slug: "anti-hype-2-litra",
    title: "“2 liters of water” is marketing, not physiology",
    category: "Careful biohacking",
    hook: "A careful biohacker asks first: is this data — or a catchy slogan?",
    readMin: 3,
    relatedBook: "ostorozhnyy-biohaker",
    source: "Threads · pol.grek",
    body: [
      { type: "p", text: "“I force 2 liters a day and feel like an aquarium.” A hard number without weight, climate, activity, or kidneys is usually marketing, not universal physiology." },
      { type: "p", text: "Dozens of “must-do” biohacks work the same way: clean, simple, no context. Careful doesn’t mean “drink less.” It means “don’t buy dogma.” Base (sleep, light, movement, food, stress) beats a stack of rituals. The everyday claim “2 L → health for everyone” is weaker than the slogans." },
      { type: 'experiment', title: "Hype filter", text: "Any feed tip: (1) mechanism / study? (2) your context? (3) what if you skip a week? If all three are “don’t know” — it’s content, not a protocol." }
    ],
  },
  {
    slug: "dofamin-predvkushenie",
    title: "Dopamine is anticipation — not happiness",
    category: "Money & decisions",
    hook: "The brain spikes on waiting for the purchase, not on owning it. That’s why “one more order” never fills the hole.",
    readMin: 4,
    relatedBook: "mozg-i-dengi",
    source: "Threads · pol.grek · money",
    body: [
      { type: "p", text: "Dopamine is often sold as “happiness.” Closer to truth: anticipation and search. Peak is “almost there.” The purchase is a different story. Mood-shopping works briefly and asks for a repeat." },
      { type: "p", text: "Hence status-on-credit and the endless feed: the brain chases “reward soon,” not durable resource. Budget knowledge helps. If the environment is built for the click, knowledge loses." },
      { type: "h2", text: "Instead of willpower" },
      { type: "p", text: "Don’t “ban wanting.” Raise friction on impulse, lower it on useful defaults: 24 hours outside the cart, no saved cards, boring bills on autopay. Prefrontal cortex wins when the environment helps — not when you shame it." },
      { type: 'experiment', title: "24-hour rule", text: "Optional buy above your line — 24 hours in notes, not the cart. Write: “what do I actually want to feel?” Often by tomorrow you want something else." }
    ],
  },
  {
    slug: "proval-v-15",
    title: "The 3 p.m. crash isn’t laziness",
    category: "Sleep & energy",
    hook: "Clear morning, fog after lunch? More often multi-system physiology than “pull yourself together.”",
    readMin: 4,
    relatedBook: "anatomiya-energii",
    source: "Threads · pol.grek · energy",
    body: [
      { type: "p", text: "Energy isn’t a moral resource. At minimum: fuel and recovery, attention load, and circadian timing (light, clock, sleep). Fix only one — and wonder why “doing everything right” fails." },
      { type: "p", text: "The post-lunch crash often mixes heavy food, office light, long focus without breaks, and stockpiled stress. The brain isn’t “breaking from laziness.” It’s conserving." },
      { type: "h2", text: "Short audit" },
      { type: "p", text: "Honest check: sleep last 3 nights, movement last 2 days, morning light, screen-free pause after 1 p.m. If answers are “meh,” you don’t need a secret protocol. You need base. Anatomy of Energy is about not fixing one system while feeding hype." },
      { type: 'experiment', title: "N-of-1 for 5 days", text: "One lever: 10–15 minutes walk in daylight after lunch. Leave the rest alone. Rate fog 1–10. If it shifts — that’s data, not “I finally got disciplined.”" }
    ],
  },
  {
    slug: "son-ne-tolko-chasy",
    title: "Count sleep cycles — not only “8 hours”",
    category: "Sleep & energy",
    hook: "Eight hours in bed with a phone isn’t recovery. Cycles and cutting the input stream matter more.",
    readMin: 4,
    relatedBook: "svyashchennye-chasy",
    source: "Threads · pol.grek · sleep",
    body: [
      { type: "p", text: "“I sleep 8 hours and still wake wrecked” is classic. Often bed is a second workday: feed, show, chat. Cycles fragment, evening light shifts melatonin, morning phone hits cortex before coffee." },
      { type: "p", text: "Rest starts where input stops — even 15–20 minutes. Not mandatory “app meditation.” Quiet without a task. The claim “exactly 8 hours → always recovered” is weaker than headlines: quality and stimulus cutoff matter more." },
      { type: "h2", text: "Minimum that beats hype" },
      { type: "p", text: "Morning light, dimmer evenings, no phone in the last 15 minutes, wake nearer finished cycles (~90 min), not the magic “eight.” Everything else after base." },
      { type: 'experiment', title: "15 minutes without input", text: "Before sleep: 15 minutes screen-free. Book, shower, just lie there. Morning clarity 1–10. Five nights — an experiment, not a reel tip." }
    ],
  },
  {
    slug: "prosto-uspokojsya",
    title: "“Just calm down” is useless advice to a nervous system",
    category: "Brain & behavior",
    hook: "The amygdala outruns thought. That isn’t weak character. It’s hardware. The question is how to take the wheel once the body is in threat mode.",
    readMin: 4,
    relatedBook: "ei-2",
    source: "Threads · pol.grek · emotion",
    body: [
      { type: "p", text: "“Just calm down” is nearly useless advice to a nervous system. The amygdala outruns prefrontal cortex. While you “understand logically,” the body is already in threat. Not character. Hardware." },
      { type: "p", text: "Shame adds a second layer: “something’s wrong with me.” Then STOP, breath, pause aren’t woo — they’re a chance for cortex to catch up. Pop science is not therapy when things are heavy." },
      { type: "h2", text: "What beats the slogan" },
      { type: "p", text: "Name the emotion out loud. Ninety seconds of physiology: longer exhale than inhale. One two-minute micro-step. Not “heal childhood tonight” — take the wheel. More in Emotional Intelligence 2.0 with Laura." },
      { type: 'experiment', title: "STOP for 90 seconds", text: "Spike → Stop: one-word feeling. Take a breath: longer exhale ×5. Observe: where in the body. Proceed: one micro-step. Not perfect. Just start." }
    ],
  },
  {
    slug: "minimalnaya-effektivnaya-doza",
    title: "Minimum effective dose isn’t laziness — it’s a filter",
    category: "Careful biohacking",
    hook: "If a protocol needs a pharmacy cabinet to “work,” it probably doesn’t work for long.",
    readMin: 3,
    relatedBook: "biohacking-mozga",
    source: "Threads · pol.grek · biohacking",
    body: [
      { type: "p", text: "Minimum effective dose isn’t laziness. It’s the opposite of a “just in case” stack. More protocols often mean more noise, less sleep, more anxiety that you’re “missing something.”" },
      { type: "p", text: "A careful biohacker asks: mechanism? context? what if I skip a week? Base (sleep, light, movement, food, stress) beats “2 liters and 12 miracle steps.”" },
      { type: "h2", text: "How not to break your mind with “optimization”" },
      { type: "p", text: "One lever → measurable effect → next. Not ten in parallel. Brain Biohacking covers why fast methods burn out and where nootropics stop being smart." },
      { type: 'experiment', title: "One lever for 7 days", text: "One only: sleep window ±30 min steadier, or 20 minutes walk, or screens off 30 min before bed. Leave the rest. End of week: what actually moved? Keep only that." }
    ],
  },
  {
    slug: "kognitivnyy-rezerv",
    title: "Cognitive reserve isn’t a gene lottery",
    category: "Cognitive health",
    hook: "Your brain won’t “just hold on” until retirement. Reserve is the sum of choices that either bank or burn. At 70 and 90 you can still get better — not automatically, and not “too late by passport.”",
    readMin: 4,
    relatedBook: "mozg-na-100",
    source: "Threads · pol.grek · longevity",
    body: [
      { type: "p", text: "Convenient myth: “too late, brain’s not what it was.” The link “age → only decline” is weaker than it feels. Studies show cognitive function can improve across ages — key word can. Not automatic. Not everyone. But the passport doesn’t flip a hard off switch." },
      { type: "p", text: "“Too late” often becomes a self-fulfilling prophecy: less novelty, less load, less practice — then decline arrives not from years, but from refusing to load the system. The brain answers the diet of input, not the number on the ID." },
      { type: "h2", text: "What banks reserve" },
      { type: "p", text: "Sleep. Movement that raises pulse. Difficulty: language, instrument, task off autopilot. Live contact. Less fog from debt-sleep and “I’ll rest later.” Miracle pills sell hope. Protocol sells boredom: regular, measurable. Brain at 100+ is A–D evidence, no magic." },
      { type: 'experiment', title: "20 minutes of difficulty", text: "Three times this week: 20 minutes slightly harder than comfort (not a work deadline). Instrument, language, puzzle without hints. Brains need effort load — like muscle." }
    ],
  },
  {
    slug: "styd-ne-toplivo",
    title: "Shame is a bad motivator. It eats capacity",
    category: "Brain & behavior",
    hook: "“You just don’t want it enough” sounds tough and almost never fixes the system. Shame closes prefrontal cortex; it doesn’t open it.",
    readMin: 3,
    relatedBook: "ei-2",
    source: "Threads · pol.grek · shame",
    body: [
      { type: "p", text: "Shame is sold as fuel: feel bad — then run. In practice it narrows attention, boosts avoidance and feed-eating. Under threat, the brain learns and plans poorly." },
      { type: "p", text: "Self-compassion isn’t “allow everything.” It’s lower the noise so you can return to mechanics: sleep, boundaries, one step. The label “rotten character” often masks environment and a self-control system still under construction — prefrontal cortex matures late. A whip doesn’t speed assembly." },
      { type: 'experiment', title: "Phrase instead of whip", text: "Instead of “I did nothing again” — “the system is heavy right now; what one 5-minute step is real?” Do it. Shame can be unpacked later. Now — action." }
    ],
  },
  {
    slug: "neopredelennost-odin-shag",
    title: "Uncertainty isn’t fixed by a yearly plan — by one step",
    category: "Stress & burnout",
    hook: "The brain loves control — especially when it has none. Panic is often a request for a clear task, not a weak character.",
    readMin: 3,
    relatedBook: "stress-i-mozg",
    source: "Threads · pol.grek · stress",
    body: [
      { type: "p", text: "Uncertainty eats resource: scenarios spin, cortisol holds the background, decisions go tunnel-vision. A huge yearly plan sometimes adds noise. A small finished step reduces it." },
      { type: "p", text: "Give the system one task for 24 hours — small enough that it’s embarrassing not to do it. Panic often eases not from “full future clarity,” but from the signal: “I already moved.” Not weakness. A control request you can dose." },
      { type: 'experiment', title: "One card for the day", text: "On paper: “today I will ___.” No second line. Evening: checkmark or move with a one-sentence reason. Not a report to a boss. A signal to the brain." }
    ],
  }
  ];
})();
