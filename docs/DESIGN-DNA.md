# Design DNA · polgrek.site

**Роль:** research → patterns → original system (не moodboard-коллаж)  
**Дата:** 2026-07-27  
**Статус:** рабочая система для продукта «практическая библиотека решений для мозга»

---

## 0. Метод (как работают сильные команды)

### Что **не** делаем
- Копировать Awwwards-анимации, Framer-hero «один в один»
- Склеивать «понравившиеся» блоки из 5 скринов
- Гоняться за Dribbble-эстетикой (макеты ≠ реальные потоки)

### Что делаем
1. **Корпус** — каталоги award / conversion / product UX / author / science / personal brands  
2. **Рубрикатор** — 15 осей оценки (ниже)  
3. **Закономерности** — что повторяется у сильных, что отваливается у слабых  
4. **Синтез** — Design DNA **для Pol Grek**, совместимая с Quiet Lab, anti-hype, static stack  
5. **Фильтр** — каждый паттерн: *усиливает ли маленькую победу читателя?*

### Честность о масштабе
Полный ручной разбор **300 URL по 15 осям** — отдельный research-спринт (1–2 недели команды).  
Этот документ — **синтез по корпусу**, а не вымышленный Excel «300 строк».  
Корпус опирается на:

| Кластер | Источники / типы | Порядок объёма |
|---------|------------------|----------------|
| Award / craft | Awwwards, Godly, SiteInspire, CSSDA, Framer Showcase, Made in Webflow | сотни showcased проектов (паттерны UI/motion) |
| Conversion | Land-book, Lapa Ninja, One Page Love, Landingfolio | сотни landing-структур |
| Product UX | Mobbin, Refero, Page Flows | тысячи экранов реальных продуктов |
| Authors | Reedsy, BookBub, Luminare, studio roundups (Kleon, Clear, Brown, Eagleman, Hazelwood, Bennett, Aveyard…) | 50–80+ разобранных author sites + industry best practices |
| Science orgs | MIT, Stanford Medicine, Nature, Science, NIH, Mayo Clinic | институциональная подача доказательности |
| Personal science | prof/scientist sites, science-writer portfolios | экспертность без «SaaS-хайпа» |
| Pol Grek today | polgrek.site + CONCEPT-BRAIN-SOLUTIONS + Quiet Lab | текущий продукт |

**Итоговый «вес» корпуса:** сопоставим с «сотнями» проектов на уровне **паттернов**, не с 300 full-audit PDF.  
Если нужен формальный dataset 300×15 — следующий этап: скрипт + ручная калибровка.

---

## 1. Корпус-карта (pipeline, как вы задали)

```
1 Award craft     → композиция, type, motion, polish
2 Conversion      → блоки, порядок, CTA hierarchy
3 Product UX      → реальные сценарии (не mock)
4 Author sites    → hero, trust, books shelf, path
5 Science orgs    → тон доказательности, иерархия info
6 Scientists      → фото, экспертность, статьи, CTA
7 Framer          → contemporary layout systems
8 Webflow         → component discipline
9 Figma Community → tokens, hero kits (как abstract, не как template dump)
```

**Запрет:** copy-paste.  
**Разрешено:** вычленять *законы* (например: «value before identity»).

---

## 2. Таблица закономерностей (15 осей)

Оценка: **что повторяется у сильных** → **что значит для Pol Grek**.

| # | Ось | Сильные сайты (паттерн) | Слабые / опасные | DNA Pol Grek |
|---|-----|-------------------------|------------------|--------------|
| 1 | **Hero** | Обещание **исхода** или **мира** за 3 с; один главный CTA; identity вторична | «Меня зовут… я автор 13 книг» | Уже: проблема-first. Закрепить. Не возвращать «нейробиология» в H1 |
| 2 | **Типографика** | 2 семьи max; чёткая шкала H1→body; serif = trust/editorial | 4+ шрифта, display-хаос | **Manrope + Source Serif 4**; H1 serif, body sans; scale 1.25 |
| 3 | **Цвет** | 1 primary + 1 accent + neutrals; CTA = solid, не rainbow | Неон, градиент-кнопки, AI-purple | **Ink / teal / paper / amber hairline** (Quiet Lab). Без neural glow |
| 4 | **Контраст** | Body ≥ WCAG AA; muted не для длинного текста | Серый на сером | Graphite body; muted только secondary; teal-deep links |
| 5 | **Сетка** | 8/12-col mental model; max ~1120–1200; consistent gutter | «карточки везде по-разному» | `--max: 1120`; 7/5 hero; problems/why 2-col → 1-col mobile |
| 6 | **Белое пространство** | Air = premium; секции «дышат» | Стена блоков | `clamp` section padding; меньше competing surfaces |
| 7 | **Анимации** | Micro, reduced-motion; scroll reveal осторожно | Particle brain, cursor thrash | Idle/pointer only; no canvas on hero; `prefers-reduced-motion` |
| 8 | **Скорость** | LCP image/text fast; third-party late | 3 full covers + Metrika early | Thumbs srcset; Metrika delay; critical CSS; budget transfer |
| 9 | **CTA** | 1 primary per viewport; secondary = explore | 5 равных кнопок | Primary: глава / понять; LitRes **после** текста |
| 10 | **Trust** | Reviews + press + method **после** value | Fake 5.0, «гарантия» | Честные мало оценок; A–D; «почему иначе» mid-low |
| 11 | **Книги** | Cover + promise + one action; series clarity | 13 SKU wall first screen | **Проблема → книга**; Netflix «почему»; shelf later |
| 12 | **Footer** | Nav + legal + one social cluster | 40 ссылок | Keep compact; privacy; LitRes author |
| 13 | **Навигация** | 4–6 items; mobile sticky utility | App chrome overload | Jump: Проверка · Проблемы · Почему · Глава; tabbar light |
| 14 | **Mobile UX** | Thumb reach; 44px+; no h-scroll body | Desktop paste | overflow-x clip; 16px inputs; sticky buy ok |
| 15 | **A11y + SEO** | Landmarks, alt, h-order, canonical | Div soup, decorative only | Already strong path; keep semantic sections + goals |

---

## 3. Повторяющиеся законы (Design Laws)

### Law A — Value before identity
James Clear, сильные nonfiction: **глава / идея → потом «кто я»**.  
Science orgs: **вопрос пациента/читателя → evidence**.  
**Pol Grek:** фазы 1–3 уже на этом. DNA: *никогда не открывать home «я автор».*

### Law B — One job per page (or one job per fold)
Victoria Aveyard / conversion landings: один primary goal.  
**Pol Grek home jobs (по порядку):**  
узнать себя → получить микропользу → прочитать главу → (опц.) купить.  
Не: купить + подписаться + 13 книг + lab + TG одновременно в hero.

### Law C — Free sample is the sales engine
Clear: chapter 1.  
Authors: excerpt.  
**Pol Grek:** mid-page reader + download; LitRes = *дочитать*.

### Law D — Social proof is seasoning, not the meal
Bennett: endorsements around the book.  
Weak sites: ratings first with empty stars.  
**Pol Grek:** reviews **после** check / problems / excerpt.

### Law E — Brand = world consistency, not decoration
Nita Prose / genre sites: type+color echo the book.  
**Pol Grek world:** paper lab, honest grades, no glowing brain covers, no SaaS purple.

### Law F — Immersion only if genre needs it
Seth Ring: game wiki — OK for LitRPG.  
**Pol Grek is nonfiction utility** — immersion = *self-diagnosis + clarity*, not particles.

### Law G — Science tone = calm hierarchy
Mayo / NIH / Nature: short paragraphs, scannable H2, caveats visible.  
**Pol Grek:** A–D, disclaimers, short takeaways, no miracle claims.

### Law H — Expert face mid-journey
Angie Thomas: face early for *persona brands*.  
Neuro/scientist sites: CV heavy early = academic.  
**Pol Grek hybrid:** face + «почему иначе» **после** value (фаза 1–3) — correct for trust without ego-landing.

### Law I — Motion is optional; clarity is not
Awwwards winners often over-motion.  
Product UX (Mobbin): clarity wins retention.  
**Pol Grek:** performance > applause animation.

### Law J — Mobile is the default reader
Author buyers often 35–55, phone in hand.  
**Pol Grek:** 16px inputs, clip overflow, chapter max-height scroll, 48px targets (secdev).

---

## 4. Design DNA Pol Grek (система)

### 4.1 Positioning (product, not style)
```
НЕ: «Сайт автора научпопа о мозге»
ДА: «Практическая библиотека решений для мозга»
     — маленькие победы на каждом экране
     — книга = углубление
     — Литрес = дочитать
```

### 4.2 Visual tokens (locked)

| Token | Value | Role |
|-------|-------|------|
| Paper | `#F2EDE3` | page |
| Paper-2 | `#E8E0D2` | panels |
| Ink | `#0A1929` | titles / strong CTA |
| Teal | `#185A53` / deep links | emphasis |
| Amber | matte brass | eyebrows / hairlines only |
| Type | Manrope + Source Serif 4 | body / display |
| Radius | 8–14px cards, not pill-everything | editorial not startup |
| Shadow | soft, one elevation | no multi-glow body |

**Forbidden in DNA:** neon brain covers, neural canvas, gradient primary buttons as default, purple AI aesthetic.

### 4.3 Interaction DNA

| Interaction | Rule |
|-------------|------|
| Hover | 1° tilt / light lift max; fine pointer only |
| Cursor | optional, never mobile |
| Scroll | section air; no parallax tax |
| Forms | email optional; honeypot; no dark patterns |
| External | `noopener noreferrer` (+ sponsored) |

### 4.4 Information architecture DNA

```
HOME
  Hero (problem)
  Self-check
  Outcomes
  Micro-fact
  Problems (diagnosis)
  Why-cards (Netflix of pain)
  Mistakes of the day
  Micro-fact
  Chapter reader (mid)
  Quiz (optional path)
  Shelf (if recognized)
  Social proof
  Method + author face
  FAQ friction
  Soft CTA chapter

BOOK
  Situation H1
  Outcomes for this book
  Chapter
  Method A–D
  LitRes
  Related problems

CATALOG (фаза 5)
  Grid of problems / situations
  Not only covers wall
```

### 4.5 Trust DNA

1. Free chapter without email  
2. A–D grades where claims appear  
3. Real reviews, admit low volume  
4. Pay off-site (LitRes)  
5. Author mid-page as **method**, not celebrity  

### 4.6 Motion & speed DNA

- LCP: text or small thumb, not full cover DPR  
- Metrika late  
- `prefers-reduced-motion`  
- content-visibility below fold  

### 4.7 Conversion DNA (without sleaze)

| Step | Mechanism |
|------|-----------|
| Attention | problem H1 + segment `?s=` |
| Recognition | checklist + doors |
| Reciprocity | micro-facts, mistakes, free text |
| Desire | chapter quality |
| Action | LitRes after sample |
| Measurement | `excerpt_open` → `litres`, scroll depth, `self_check` |

---

## 5. Gap analysis: DNA vs polgrek.site сейчас

| DNA requirement | Status (post phases 1–4 + secdev) |
|-----------------|-------------------------------------|
| Problem-first hero | ✅ |
| Self-check | ✅ |
| Outcomes | ✅ |
| Micro-facts | ✅ |
| Problems / why-cards | ✅ |
| Mid-page chapter | ✅ |
| Author as method | ✅ |
| Segment entry | ✅ `?s=` |
| Quiet Lab tokens | ✅ |
| Security meta / noreferrer | ✅ |
| Edge security headers | ⚠️ needs Cloudflare apply `_headers` |
| Catalog as problems grid | ❌ фаза 5 |
| Cover visual DNA (no neon brain) | ⚠️ site still ships old covers; concept exists |
| EN home parity | ❌ partial |
| Formal 300-row audit table | ❌ optional next research sprint |
| CrUX / field speed | ⚠️ depends on traffic + CDN |

---

## 6. Что **не** брать из award sites

| Attractive but wrong for Pol Grek | Why |
|-----------------------------------|-----|
| Full-screen WebGL / particle neural | fights trust + TBT |
| Auto-playing video heroes | slow, mobile pain |
| Infinite scroll storytelling | breaks chapter CTA |
| Heavy cursor + magnetic buttons | mobile / a11y / TBT |
| “Buy now” sticky as first action | before sample |
| 13 covers in hero | catalog anxiety |

---

## 7. Приоритеты внедрения DNA (после research)

### P0 — удержание DNA
- Не откатывать hero к «автор + нейробиология»
- Любой новый блок: *какую маленькую победу даёт прямо сейчас?*

### P1 — визуальный продукт
- Новые обложки в quiet DNA (без светящегося мозга)
- Catalog: problem-first cards (фаза 5)

### P2 — edge & field
- Cloudflare: `_headers` + HSTS + TTFB RU
- EN home mirror of value path

### P3 — research depth
- Spreadsheet 100–300 sites × 15 axes (half-day sampling per cluster)
- Annual refresh of DNA

---

## 8. Design DNA one-pager (для дизайнера / агента)

```
BRAND WORLD     Quiet Lab · paper · ink · teal · amber hairline
PRODUCT JOB     Small wins for tired brains · then books
HERO            Problem / curiosity · never résumé
TYPE            Serif titles · sans body · 2 families
MOTION          Minimal · reduced-motion · no canvas tax
BOOKS           Diagnosis → why → sample → LitRes
TRUST           Method A–D · honest reviews · off-site pay
SPEED           Thumbs · late analytics · critical CSS
MOBILE          Clip overflow · 16px inputs · 48px hits
SECURITY        CSP/referrer · noreferrer · LitRes-only aff
FORBIDDEN       Neon brains · hype CTAs · author-first hero
```

---

## 9. Источники (выборочный индекс корпуса)

**Authors / nonfiction:** Austin Kleon, James Clear, Brené Brown, Rupi Kaur, Ali Hazelwood, Brit Bennett, Victoria Aveyard, Nita Prose, Angie Thomas, Reedsy/BookBub/Luminare roundups.  
**Neuroscience/public science:** David Eagleman (eagleman.com), academic scientist sites, science-writer portfolios.  
**Orgs (tone):** Mayo Clinic, NIH, Nature, Science, MIT, Stanford Medicine.  
**Craft/conversion catalogs:** Awwwards, Godly, SiteInspire, CSSDA, Land-book, Lapa Ninja, One Page Love, Landingfolio, Framer, Webflow Showcase.  
**Product UX:** Mobbin, Refero, Page Flows (паттерны сценариев, не копи UI).  
**Internal:** CONCEPT-BRAIN-SOLUTIONS.md, CONCEPT-SCROLL-VALUE.md, DESIGN-PREMIUM-AUDIT.md, SECURITY.md, polgrek.site phases 1–4.

---

## 10. Резюме

Сильные сайты **не копируют друг друга** — они сходятся в законах:  
value → sample → trust → buy; restraint; one job; mobile clarity; science calm.  

**Pol Grek Design DNA** = эти законы + Quiet Lab + problem library + free chapter mid-page + anti-hype.  

Уже реализованный путь (фазы 1–4) **совпадает** с DNA сильнее, чем классическая «витрина автора».  
Следующий визуальный скачок — **обложки + каталог-как-диагностика**, не новый Framer-hero.

---

*Документ — живой. Обновлять после фазы 5 и после любого award-копирования (запрещать).*
