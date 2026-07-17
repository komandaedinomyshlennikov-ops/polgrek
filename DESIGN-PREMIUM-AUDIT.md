# Premium visual audit + 2 directions

**Role:** Principal Brand & Digital Product Designer (Author Premium Showcase)  
**Site:** https://polgrek.site  
**Product:** author showcase (not store) · brain nonfiction · trust > hype  
**Date:** 2026-07-17  
**Constraint:** static HTML/CSS, no-JS base, WebP/fonts/perf already optimized  

---

## 0. Brand frame (design must serve this)

| Axis | Meaning for UI |
|------|----------------|
| Trust | Quiet confidence, open LitRes, no fake glamour |
| Intelligence | Editorial hierarchy, calm type, A–D as craft not badge spam |
| Warmth | Paper/ink lab — human, not clinic-white SaaS |
| Restraint | Premium = less noise, more air and material |

**Premium here ≠ luxury fashion.**  
**Premium = “умный кабинет / тёплая лаборатория / хорошее издательство”.**

---

## 1. Visual audit (current system)

### 1.1 What already works (keep)

| Strength | Why it is valuable |
|----------|-------------------|
| **Warm lab palette** (`#F6F1E8` paper / `#0B1F33` ink / amber / teal) | Distinct, on-brand, not generic “AI purple” |
| **Dual type stack** Manrope + Fraunces | Editorial + modern body; good base for premium |
| **Cover-first product language** | Books are the product; UI already knows this |
| **Self-host fonts + WebP** | Premium feels slow if assets are cheap/heavy — technical base is solid |
| **Honest copy layer** | Design should not fight the anti-hype voice |
| **Dark mode tokens** | Rare for author sites; keep as refinement track |

### 1.2 What blocks “premium” today

| Issue | Severity | Evidence | Effect |
|-------|----------|----------|--------|
| **Gradient primary buttons** + heavy amber glow | High | `btn-primary` linear-gradient + 28–34px amber shadow | Reads as marketing landing, not imprint |
| **Hero CTA panel** amber fill box | High | `.hero-cta-panel` amber wash + border | Cheap “promo strip” on first screen |
| **Too many competing surface treatments** | High | glows on body, cards shadow-lg, magnet ink panel, rating cards, chips, badges | Visual noise; no single “quiet room” |
| **Neural canvas** | Medium–High | animated particles behind covers | 2018 tech-demo vibe; fights serious author brand |
| **Page-jump strip** | Medium | sticky chip nav under header | Useful IA, looks utilitarian / app-like |
| **Radius 18px + pill buttons everywhere** | Medium | `--radius: 18px`, `border-radius: 999px` | Soft-startups language; premium editorial often sharper (8–12px) or more intentional mix |
| **Rating cards: big stars + 5.0** | Medium | social-proof row | Even with honest copy, UI still “review widget” |
| **CSS entropy** | Medium | ~3.6k lines, 140+ `!important` | Hard to evolve a coherent premium system |
| **Mobile chrome stack** | Medium | tabbar + sticky buy | Functional but “app shell”, not premium reading |
| **Fraunces Cyrillic fallback** | Low–Med | serif Latin only | H1 RU mixes Fraunces Latin + Georgia Cyrillic — subtle “broken luxury” |
| **Section density on home** | Medium | doors → flagships → magnet → ratings → author → FAQ → final CTA | Journey is long; premium often fewer, deeper beats |

### 1.3 Screen-by-screen score (current)

| Screen | Score /10 | Note |
|--------|-----------|------|
| Home hero | 6.5 | Copy strong; chrome (CTA panel, canvas, dual accent) dilutes |
| Doors | 7 | Concept strong; cards a bit same-weight |
| Catalog | 6.5 | Useful, dense; feels “tool” more than “shelf” |
| Book product | 7.5 | Best editorial page; sticky/tabbar clutter mobile |
| Lab index | 6 | Flat grid; category chips help little visually |
| About | 7 | Content-rich; layout still “long blog” |
| Footer | 6 | Dark block OK; legal + ad marks pile up |

**Overall brand surface today: ~6.8/10** — distinctive, honest, slightly “warm SaaS + landing”.  
**Gap to premium: polish, restraint, material, type discipline — not a new identity from zero.**

### 1.4 Design debt map (what to stop doing)

1. Stop defaulting to **amber gradient CTA** as the only “important” signal.  
2. Stop **body multi-glow** competing with content.  
3. Stop **canvas decoration** on hero unless it becomes a deliberate art piece (unlikely).  
4. Stop treating every card with **same elevation + hover lift**.  
5. Stop **uppercase tracking eyebrows** on every section (fatigue).  

---

## 2. Two premium directions

Both keep: warm paper DNA, Manrope body, book covers as hero objects, LitRes off-site buy, no dark patterns.

---

### Direction A — «Тихая лаборатория» (Quiet Lab)

**One-liner:** *Издательская бумага + кабинетный ink. Меньше золота, больше воздуха.*

**References (mood, not clone):** good nonfiction imprint sites, literary journals, Aesop-adjacent restraint (warmer).

#### Visual system

| Token | Spec |
|-------|------|
| Paper | `#F3EEE4` → slightly flatter, less “peach glow” |
| Ink | `#0A1929` |
| Accent | **single** deep teal `#1F6F66` for links/focus; amber only for rare emphasis (eyebrow dash, pull-quote) |
| Primary button | **Solid ink** or solid deep teal — no gradient, soft shadow `0 1px 2px` / `0 8px 24px` low opacity |
| Radius | `--radius: 12px`; buttons `14px` or soft rect, not full pill |
| Type | Fraunces for H1–H2 **where Latin**; for RU consider **Literata / Source Serif / PT Serif** with full Cyrillic for true premium |
| Grid | More margin: container max 1120; section padding `clamp(3.5rem, 8vw, 7rem)` |
| Elevation | 1 level only: hairline border + whisper shadow; hover = border darken, not jump |

#### Key UI moves

1. **Hero:** remove canvas; one large cover (or 2-stack, not 3 chaotic); text column with more line-height; CTA row flat (primary solid + text link secondary).  
2. **No amber CTA box** — CTAs sit in open air.  
3. **Ratings:** drop giant stars; small numeral + “N оценок · Литрес” as text list or quiet chips.  
4. **Lab:** 2-column editorial list (title + category + 1-line hook), not equal card wall.  
5. **Book page:** gallery-like cover with generous pad; buy card as thin paper panel, not “checkout widget”.  
6. **Mobile:** prefer one bottom action (Отрывок) + secondary LitRes text; reduce dual chrome if possible.

#### Emotion

Calm, adult, trustworthy, “я могу читать час”.

#### Risk

Can feel *too* quiet / academic if type and photography are weak — needs strong portrait crop and cover lighting.

#### Fit score for Pol Grek: **9/10** (recommended primary)

---

### Direction B — «Полка / кабинет» (Shelf & Study)

**One-liner:** *Премиум через объект книги и архитектуру полки, не через UI-эффекты.*

**References (mood):** museum shop digital, carefully art-directed bookstores, high-end education studios.

#### Visual system

| Token | Spec |
|-------|------|
| Paper | Cooler cream `#EFE9DF` with **ink panels** for key chapters (home excerpt magnet becomes “desk blotter”) |
| Ink | Near-black `#12151A` |
| Accent | Brass/amber **matte** `#C9A227` (no neon gradient); teal secondary for lab only |
| Primary button | Matte brass fill, dark text, 0 gradient; outline = thin ink hairline |
| Radius | Sharp-soft: cards `8px`, media `4px` — more “object”, less “bubble” |
| Type | Display serif with **opsz** drama on H1; body Manrope 16–18 / 1.7 |
| Grid | Asymmetric: 7/5 hero, full-bleed cover band on catalog |
| Motion | Almost none; cover hover = 1° tilt max or light |

#### Key UI moves

1. **Hero:** horizontal “shelf” of 3 covers on a ledge (subtle shadow under books as physical objects).  
2. **Catalog:** masonry or shelf rows by series; less filter-chip noise (filters collapse into one refined control).  
3. **Lab:** magazine index — large first article, then compact list.  
4. **Social proof:** integrated as footnote under shelf, not star widgets.  
5. **About:** full-bleed portrait left, text right — gallery layout.  
6. **Dark mode:** charcoal study with warm lamp accent (amber at 8–12% surfaces).

#### Emotion

Collectible, material, “полка умного человека”.

#### Risk

Heavier art direction / photo work; easier to over-illustrate; slightly more implementation cost (shelf layout, series rails).

#### Fit score for Pol Grek: **8/10** (strong alternative if you want more “book object” drama)

---

## 3. Side-by-side comparison

| Criterion | A Quiet Lab | B Shelf & Study |
|-----------|-------------|-----------------|
| Trust / anti-hype | ★★★★★ | ★★★★☆ |
| Premium “feel” speed of win | ★★★★★ (token + type + remove noise) | ★★★★☆ (needs layout art) |
| Implementation cost (static CSS) | Lower | Medium |
| Mobile | Excellent if chrome simplified | Good if shelf simplifies |
| Risk of “SaaS landing” | Low | Low–Med if brass overused |
| Aligns with current palette | High (evolution) | Medium (shift cooler + brass) |
| **Recommendation** | **Default choice** | Choose if brand wants stronger “bookshelf” identity |

---

## 4. Rejected directions (explicit)

| Rejected | Why |
|----------|-----|
| Neon biohacking / cyber | Contradicts anti-hype positioning |
| Clinical white hospital | Cold, medical-ad adjacency risk |
| Dark-only mysterious guru | Fake depth, skeptic audience backlash |
| Heavy glassmorphism / 3D | Dated “premium” cliché, perf cost |

---

## 5. Shared premium principles (whichever direction)

1. **One primary action per viewport** (excerpt on home/book; LitRes secondary).  
2. **Typography > decoration.**  
3. **Covers and portrait are the jewelry** — UI is the setting.  
4. **Honest UI for ratings** (count first, stars last or gone).  
5. **Cyrillic-complete display serif** for true premium RU.  
6. **Reduce home to 5–6 beats**, not 9.  
7. Keep legal/ad marks, but style them as footnotes, not error text.  

---

## 6. Proposed phase plan (after you pick a direction)

| Phase | Deliverable | Effort |
|-------|-------------|--------|
| **P0** | Lock direction A or B | decision |
| **P1** | Tokens + type + button/card/nav in `styles.css` | 1–2 d |
| **P2** | Home + book product premium pass | 2–3 d |
| **P3** | Catalog + lab editorial layouts | 2 d |
| **P4** | About + mobile chrome refinement | 1–2 d |
| **P5** | Dark mode harmonize + QA | 1 d |

**Quick wins if starting tomorrow (Direction A):**
- Kill neural canvas on hero  
- Solid ink/teal primary (no gradient)  
- Remove hero-cta-panel fill  
- Soften body glows  
- Rating row → compact text style  
- Increase section vertical rhythm  

---

## 7. Decision ask

**Recommend: Direction A — «Тихая лаборатория»** as the premium path that respects voice, audience skepticism, and static stack.

Reply with:
- **A** — implement Quiet Lab (start P1 tokens + home/book), or  
- **B** — develop Shelf & Study further (shelf hero mock in CSS), or  
- **A+B hybrid** (Quiet Lab system + shelf only on catalog/home flagships).

---

*End of audit. No production CSS changed in this document phase.*
