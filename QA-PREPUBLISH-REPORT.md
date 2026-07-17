# Pre-publish QA Report — polgrek.site

**Role:** Lead QA Architect  
**Date:** 2026-07-17  
**Live:** https://polgrek.site  
**Entry focus:** `/lab/index.html` + full site matrix  
**Product:** author showcase (not a store); LitRes/Amazon off-site  

---

## Executive gate

| Gate | Result |
|------|--------|
| **G0 Legal** | **FIX-BEFORE-ADS** (soft-launch possible; ads/affiliate push blocked until C-01) |
| **G1 Revenue** | **OK with hygiene debt** — 13/13 static + JS buy work; `ei-2` uses `litres` not `buyUrl` (data consistency) |
| **G2 Trust** | **PASS with notes** — no fake AggregateRating; low-n ratings disclosed; A–D branding > practice |
| **G3 Tech** | **PASS** — hubs/assets 200; fonts self-host; articles split on lab |
| **G4 Soft-launch** | **SHIP WITH FIXES** |
| **G5 Hard / 100k** | **NOT YET** — legal ad mark + Metrika honesty + UX EN fixes + A–D honesty |

**Overall:** **SHIP WITH FIXES** for soft traffic (TG/Threads/warm).  
**NO-GO** for paid/cold “громкий” launch until **C-01**, **C-03** addressed.

---

# A. Technical validity & cross-browser

**Severity of block:** HIGH  
**Recommendation:** **SHIP** (tech)

### Live HTTP matrix (sample)

| Status | Path |
|--------|------|
| 200 | `/`, `/lab/`, `/books/`, books, about, privacy, EN hubs |
| 200 | `mozg-na-100.webp` (~108 KB), manrope woff2, `data.js`, `data-articles.js`, excerpts |
| 200 | `sitemap.xml`, `robots.txt` |
| 404 | unknown path (expected) |

### Checklist

| Item | Result |
|------|--------|
| No `*-full*` cover refs in HTML | PASS |
| No Google Fonts | PASS |
| Lab loads `data.js` + `data-articles.js` | PASS |
| Home does **not** load data-articles | PASS |
| CSS cache-bust `?v=20260717pre5` | PASS |
| No-JS catalog NSF present | PASS (static cards + noscript banner) |
| iOS/Android real devices | **Not run** (manual residual) |

### Findings

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| A-01 | LOW | Real device matrix not executed in this run | Smoke iPhone Safari + Android Chrome |
| A-02 | MEDIUM | `en/books/index.html` ~167 KB (duplicated static cards layers) | Rebuild EN catalog once; dedupe inject |

---

# B. UX/UI & visual hierarchy

**Recommendation:** **SHIP WITH FIXES**

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| B-01 | HIGH | EN related cards: «О книге» RU | EN replace map + rebuild |
| B-02 | HIGH | Sticky buy = LitRes only (no excerpt) | Sticky: Отрывок primary |
| B-03 | HIGH | EN sticky/store LitRes-primary | EN: Amazon first or dual equal |
| B-04 | MEDIUM | Dual primary above fold (excerpt + buy) | Buy outline |
| B-05 | MEDIUM | EN home flagships weaker vs RU | Same tile template |
| B-06 | MEDIUM | Lab flat 14-card grid | Featured / category chips |
| B-07 | MEDIUM | Lab index readMin inflated vs data | Rebuild from data-articles |
| B-08 | MEDIUM | Big ★★★★★ / 5.0 with n=2–4 | Lead with n |
| B-09 | MEDIUM | Sticky + tabbar stack | Single bottom chrome |
| B-10 | LOW | EN page-jump missing Ratings | Add #social-proof |
| B-12/13 | PASS | Home 5s clarity; catalog buy visible | — |

---

# C. Legal compliance

**Gate:** **FIX-BEFORE-ADS**

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| **C-01** | **HIGH** | No visible «Реклама / erid» by AdvCake buys (erid only in URL) | Visible mark near buy clusters |
| C-02 | MEDIUM | Some LitRes nav links `rel=noopener` only | `noopener sponsored` all AdvCake |
| **C-03** | **HIGH** | Privacy says Metrika *may*; code always loads + webvisor | Align privacy / consent / disable webvisor |
| C-04 | MEDIUM | Footer legal JS-only | Static/noscript legal |
| C-05 | LOW–MED | «Диагностика» on product cards | Soften wording |
| C-07–10 | PASS | Disclaimers, no clinic cart, no AggregateRating schema, anti-hype | Keep |

---

# D. SEO & brand metadata

**Gate:** **NEEDS FIXES**

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| D-01 | LOW–MED | Sitemap EN rows lack xhtml hreflang | Mirror pairs |
| D-02 | LOW–MED | SearchAction → JS catalog search | Drop or make no-JS |
| D-03 | LOW | Lab OG = generic og-image | Optional unique OG |
| D-04 | LOW | Article schema no dates | Add if known |
| D-07 | LOW | EN residual RU chrome | i18n pass |
| D-08–10 | PASS | canonical/hreflang/robots/Person/Book/FAQ/ItemList | Keep |

**Schema inventory:** Person, WebSite, FAQPage, ProfilePage, CollectionPage, ItemList, Book, Article, BreadcrumbList. **No AggregateRating.**

---

# E. Content & scientific integrity

**Voice score:** **8/10**  
**Recommendation:** **SHIP WITH FIXES**

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| E-01 | HIGH | A–D branded more than applied on page claims | Show grades on takeaways or soften promise |
| E-02 | MEDIUM | «100+ исследований 2025–2026» hard to verify | Soften / method note |
| E-03 | MEDIUM | «5 минут в день» performance hook | Align with non-magic voice |
| E-04 | MEDIUM | Logo «нейробиология» vs научпоп | Soften logo subline |
| E-05 | MEDIUM | Title «Неопределённость **лечится**…» | Non-medical verb |
| E-06 | MEDIUM | Lab index times vs readMin | Rebuild index |
| E-07 | MEDIUM | «Нейроинженерия сознания» woo-adjacent | Prefer mechanism subtitle |
| E-11–14 | PASS | Anti-«просто успокойся», disclaimers, no fake quotes | Keep |

---

# F. Book sales funnel (off-site CTR)

**Gate:** **REVENUE-PATH-OK** (with hygiene + UX funnel notes)

### Link quality (13 books)

| Check | Result |
|-------|--------|
| Static catalog buy buttons | 13/13 present with `utm_source=advcake` + `sponsored` (incl. ei-2) |
| Product pages sample | PASS (100+, reset, ei-2 sticky/primary) |
| JS `litresDirect` | uses `buyUrl \|\| litres` → ei-2 OK via `litres` |
| `ei-2` data | **has `litres`, missing `buyUrl`** — hygiene, not live broken |
| sub1 quirks | `reset-`, `biohaking-mozga` (generator) — analytics noise |

### Paths

| Journey | Expectation | Result |
|---------|-------------|--------|
| Door «выгорел» → RESET | ≤2 clicks to Buy/Excerpt | PASS |
| Catalog 13 | Buy visible | PASS (static) |
| Excerpt .txt | 200 | PASS (sample 100+, reset) |
| Sticky | excerpt+buy | **FAIL** sticky LitRes-only (B-02 / F-03) |

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| F-01 | MEDIUM | `ei-2` no `buyUrl` field (only `litres`) | Align field name for builders |
| F-02 | MEDIUM | sub1 quirks (`reset-`, `biohaking-mozga`) | Normalize sub1=slug |
| F-03 | HIGH | Sticky ignores excerpt-first brand rule | B-02 |
| F-04 | LOW | Metrika goals not verified live in this run | Cabinet smoke |

---

# G. Security, performance, accessibility

**Gate:** **PERF-A11Y-OK** (with manual device residual)

| Item | Result |
|------|--------|
| Self-host fonts, no Google | PASS |
| LCP cover WebP ~108 KB | PASS (under 150 KB target) |
| data split lab-only articles | PASS (~28 KB deferred) |
| skip-link + focus-visible | PASS (code) |
| reduced-motion canvas gate | PASS |
| muted contrast AA | PASS (`#5A6570`) |
| HTTPS / no secrets in JS | PASS (static + public Metrika id) |
| Lighthouse field run | **Not executed** this session |
| Real keyboard device test | **Not executed** |

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| G-01 | MEDIUM | Lighthouse numbers missing | Run mobile home + lab |
| G-02 | LOW | Sticky+tabbar a11y/overlap risk | B-09 |
| G-03 | LOW | Metrika webvisor always on (privacy + perf) | C-03 |

---

# Priority fix backlog (ordered)

1. **C-01** — visible «Реклама · erid» (before any paid/affiliate scale)  
2. **C-03** — privacy/Metrika/webvisor honesty  
3. **B-01** — EN «О книге»  
4. **B-02 / F-03** — sticky excerpt-first  
5. **E-01** — A–D show or soften  
6. **E-06 / B-07** — lab index rebuild from data  
7. **C-02** — sponsored on all AdvCake  
8. **F-01 / F-02** — data hygiene ei-2 buyUrl + sub1 normalize  
9. **D-02** — SearchAction decision  
10. Device smoke + Lighthouse (A-01, G-01)

---

# Soft-launch vs hard-launch

| Mode | Decision |
|------|----------|
| **Soft** (TG/Threads/warm) | **Yes**, after **F-01** (and ideally C-01 if any paid posts with links) |
| **Hard / cold / 100k** | **No** until C-01, C-03, B-01–B-03, E-01, device smoke |

---

*Generated by Lead QA orchestration: live curl matrix + repo scans + specialist agents B/E and C/D.*
