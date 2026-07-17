# ТЗ: поэтапная редактура и правки polgrek.site

**Основание:** multi-expert pre-launch аудит (2026-07-17)  
**Сайт:** https://polgrek.site  
**Тип:** витрина автора (не магазин); покупка на Литрес/Amazon  
**Автор:** Пол Грэк · научпоп о мозге без эзотерики, A–D  
**Аудитория:** 30–65+, РФ / СНГ, читатели научпопа, анти-инфоцыганство  

**Цель работ:** довести сайт до состояния «ДА» на публичный трафик (в т.ч. холодный), не ломая позиционирование и голос автора.

**Голос (обязательный стандарт копирайта):**
- механика вместо морали («не характер, а система»);
- миф / слабая связь / устойчивый факт — раздельно;
- частичное согласие, где уместно;
- короткий практический вывод;
- без эзотерики, без «просто успокойся», без канцелярита и техжаргона (JS и т.п.) в пользовательских текстах;
- опора на стиль Threads @pol.grek (replies + посты).

**Не делать:**
- фейковые отзывы, рейтинги, тиражи;
- «чудо-CTA» и dark patterns;
- магазин/корзину на сайте;
- ломать no-JS базовую доступность контента;
- подключать псевдонауку.

---

## 0. Общие правила исполнения

### 0.1. Репозиторий и деплой
- Рабочая копия: `Projects/pol-grek-site`
- Ветка: `main` (или feature → PR → main)
- После контентных/шаблонных правок: `python3 build_static.py` при изменении книг/lab/data
- CSS cache-bust: обновлять `CSS_VER` / `?v=` на затронутых страницах
- Деплой: push в GitHub Pages; smoke-check live URL

### 0.2. Критерии качества (Definition of Done на любой этап)
- [ ] RU и EN согласованы (если затронут user-facing текст)
- [ ] Нет регрессии кнопок «Купить» (есть, видны, AdvCake `utm_source=advcake`)
- [ ] Lighthouse mobile (или WebPageTest) по ключевым URL — не хуже baseline этапа
- [ ] Ручной проход: iOS Safari + Chrome Android (home, catalog, 1 book, 1 lab)
- [ ] Копирайт проверен на канцелярит / ИИ-штампы / техжаргон
- [ ] Коммит с осмысленным сообщением; live обновлён

### 0.3. Ключевые URL для приёмки
| URL | Роль |
|-----|------|
| `/` | Hero, doors, flagships, excerpt, FAQ |
| `/books/index.html` | Каталог + buy |
| `/books/mozg-na-100.html` | Product + excerpt |
| `/books/reset.html` | Product (выгорание) |
| `/lab/index.html` + 1 article | Lab voice |
| `/about.html` | Trust / bio |
| `/en/` + `/en/books/` | EN parity |
| `/privacy.html` | Legal (не ломать смысл) |

### 0.4. Метрики успеха (после Этапа 1–3)
| Метрика | Цель |
|---------|------|
| LCP mobile (поле / lab) | ≤ 2.5 s на mid-device (стремиться) |
| Клики «Купить на Литрес» / визит catalog | рост vs baseline |
| excerpt_download | рост vs baseline |
| Bounce home (mobile) | снижение vs baseline |
| Ошибки «кнопки не видно» | 0 репортов |

---

# Этап 1 — Критично (перед «громким» трафиком)

**Срок ориентир:** 1–3 рабочих дня  
**Цель:** не потерять продажи из‑за perf и ясности первого экрана; buy-path стабилен.

## 1.1. Производительность ассетов 🔴

### Задача
Снизить вес hero/covers и исключить риск отдачи «full»-файлов.

### Работы
1. Инвентаризация `assets/covers/` (jpg/png `*-full*`).
2. Для web: WebP (или AVIF) **≤ 100–120 KB** на обложку карточки; retina ≤ 200 KB.
3. Убедиться, что `*-full.png` (в т.ч. 4–16 MB) **не ссылаются** из HTML/CSS/JS и **не нужны** в public deploy (вынести / `.gitignore` / не коммитить в pages path).
4. Проверить `preload` только для LCP-изображения hero.
5. `loading="lazy"` на всех non-LCP covers (уже частично есть — аудит).

### Приёмка
- [ ] Ни один HTML не ссылается на `*-full*`
- [ ] Суммарный вес 13 catalog covers < ~1.5 MB
- [ ] LCP-кандидат (hero cover) < ~150 KB

### Файлы
`assets/covers/*`, HTML/JS пути к covers, `index.html` preload.

---

## 1.2. Шрифты 🔴

### Задача
Убрать блокирующий `@import` Google Fonts.

### Работы
1. Скачать/собрать **Manrope + Fraunces** (cyrillic) → `assets/fonts/*.woff2`.
2. `@font-face` + `font-display: swap` в CSS.
3. Удалить `@import url('https://fonts.googleapis.com/...')` из `css/styles.css`.
4. Preload 1–2 critical woff2 на home.
5. Опционально: `preconnect` на fonts.gstatic убрать, если self-host.

### Приёмка
- [ ] Нет network request на fonts.googleapis.com на cold load
- [ ] Кириллица без FOUT-краша; читаемый fallback system-ui

### Файлы
`css/styles.css`, `assets/fonts/`, `index.html`, `en/index.html`, shell в `build_static.py` при необходимости.

---

## 1.3. Hero: человек + ясность 🔴

### Задача
За 5 секунд: кто автор, зачем доверять, что сделать.

### Редактура (RU)
**Сейчас (проблема):** H1 = жанр; lead = список меток.

**Требование к новому hero (смысл, не дословно):**
- H1: польза человеку + «без эзотерики» (не только «научпоп»).
- 1 строка: кто Пол (2–3 якоря: книги / A–D / без хайпа).
- Lead: **сначала отрывок → потом Литрес**.
- CTA primary: скачать/открыть отрывок.  
  CTA secondary: каталог / ситуации.
- Опционально 1 trust-line: «Книги на Литрес · отрывки бесплатно» (+ цифра, если честная).

### EN
Зеркало смысла (`en/index.html`).

### Приёмка
- [ ] 5 пользователей 30–55: «кто это?» ≤ 5 с
- [ ] Нет техжаргона
- [ ] Голос Пола (механика, не мотивационный лозунг)

### Файлы
`index.html`, `en/index.html`, при необходимости partials.

---

## 1.4. Buy path: smoke + защита от регрессии 🔴

### Задача
Кнопки «Купить на Литрес» видны и ведут на AdvCake.

### Работы
1. Ручной чеклист: catalog ×13, home flagships ×3, product page primary CTA.
2. URL содержит `utm_source=advcake` и корректный `sub1` (не `stres&mozg=`).
3. `rel` включает `sponsored` где партнёрка.
4. Регрессия NSF CSS vs JS: `html.js` не прячет `.book-card` / `.book-card-buy` (уже фикс — закрепить тестом).
5. Простой checklist в `ADVCATE.md` или `METRIKA.md`: post-deploy smoke.

### Приёмка
- [ ] iPhone Safari + Android Chrome: кнопки видны без «пустых» карточек
- [ ] 3 случайные книги: sub1 = ожидаемый slug/bySlug
- [ ] Metrika goals `litres` / `excerpt_download` срабатывают (если настроены)

---

## 1.5. JS payload (минимум) 🟠→ в рамках этапа 1 если успеваем

### Задача
Не парсить весь `data.js` там, где не нужен.

### Работы (MVP)
1. Оценить: catalog/home требуют полный articles[]?
2. Если нет — отложенная загрузка lab data или split `data-books.js` / `data-articles.js`.
3. Neural canvas: не инициализировать на `prefers-reduced-motion` и на узких/low-end (простая эвристика).

### Приёмка
- [ ] Home JS parse time не хуже baseline; ideally −20%+

---

# Этап 2 — Усиление доверия

**Срок ориентир:** 3–5 дней  
**Цель:** cold visitor понимает, почему верить автору.

## 2.1. Social proof (только реальный) 🟠

### Работы
1. 3 цитаты/рейтинга **только** с Литрес (или Amazon) с проверяемой ссылкой.
2. Блок на home (компакт) + опционально about.
3. Запрет выдуманных отзывов.

### Приёмка
- [ ] Каждая цитата traceable
- [ ] Нет AggregateRating schema без реальных данных

---

## 2.2. «Как проверить автора» 🟠

### Работы
1. Блок 4–6 строк: Литрес author, Telegram, (опц.) Threads, email.
2. На home (FAQ или trust) + about.
3. Согласовать с privacy (не раздувать legal).

### Копирайт (направление)
*«Сайт — витрина. Книги и отзывы — на Литрес. Короткие разборы — в Telegram / Threads.»*

---

## 2.3. Hero / about: человеческий якорь 🟠

### Работы
1. В hero или сразу под hero: портрет + **≤ 40–50 слов** (Англия / русский с 35 / Лора / «сначала на себе»).
2. About: timeline max 5 пунктов (сейчас не раздувать).
3. Убрать остатки «ключевые книги» / канцелярит (уже чистили — контроль).

### Приёмка
- [ ] Пользователь называет 2 факта о Поле без скролла до footer

---

## 2.4. Согласованность FAQ 🟡

### Работы
1. Единый источник: `js/data.js` / partials / hardcoded index FAQ.
2. 3–5 вопросов max на home; без воды.

---

# Этап 3 — Рост конверсии

**Срок ориентир:** 5–7 дней  
**Цель:** больше отрывков и переходов на Литрес.

## 3.1. Doors (ситуации) 🟠

### Работы
1. Mobile: проверить 5 карточек — не перегружают ли; при необходимости 3 primary + «ещё».
2. Копирайт дверей — держать голос Пола (уже сильный).
3. Каждая дверь → product page с excerpt/buy above fold.

### Приёмка
- [ ] Сценарий «выгорел» ≤ 2 клика до кнопки Купить/Отрывок

---

## 3.2. Product page funnel 🟠

### Работы
1. Порядок: cover + promise + **Скачать отрывок** + **Купить** → потом long copy.
2. Не прятать excerpt за 3 экрана.
3. Повтор CTA после excerpt (уже частично).
4. Sticky buy mobile — проверить не перекрывает tabbar.

---

## 3.3. Catalog CRO 🟡

### Работы
1. Chip «для кого» / «проблема» на карточке (1 строка, не теги-спам).
2. Placeholder поиска человеческий: *«Выгорание, сон, деньги…»*.
3. EN: meta строки карточек на английском (`book_card_meta` lang).

---

## 3.4. Analytics funnel 🟡

### Работы
1. Воронка Metrika: home → doors/catalog → book → excerpt → litres.
2. Отчёт baseline 7 дней → после этапа 3.

---

# Этап 4 — Полировка

**Срок ориентир:** 3–5 дней  

## 4.1. EN parity 🟡
1. `book_card_meta` / format labels EN.
2. Проверка hreflang и canonical.
3. Lab EN уже переписан — spot-check 3 статьи.

## 4.2. Accessibility WCAG 2.2 🟡
1. Skip-link на **всех** static headers.
2. Контраст muted / paper (минимум AA).
3. Focus visible на doors, filters, buy.
4. `prefers-reduced-motion` для canvas/transitions.
5. Keyboard: dropdown «По ситуации».

## 4.3. Lab visual 🟢
1. Лёгкая визуальная иерархия категорий (не «голые» карточки).
2. Не превращать в журнал-глянец.

## 4.4. Microcopy / редактура 🟢
1. Пройти home, about, catalog, privacy, 404.
2. Запрещённые маркеры: «с JS», «осуществлять», «в рамках», «данный» (в UI), «полный каталог изданий».
3. Допустимо: «данные» как research data; legal «персональные данные».

## 4.5. Technical SEO spot-check 🟢
1. Lighthouse SEO ≥ 90.
2. Rich results test: Book, FAQ, ItemList.
3. sitemap lastmod актуален.

---

# Редактура: матрица страниц

| Страница | Этап | Фокус редактуры |
|----------|------|-----------------|
| `/` hero + lead | 1 | Польза + имя + CTA |
| `/` doors | 3 | Mobile length; голос |
| `/` flagships / excerpt / FAQ | 2–3 | Proof; FAQ sync |
| `/books/` | 1, 3 | Hero уже ok; chips; search placeholder |
| `/books/*.html` | 3 | Funnel order; CTA |
| `/lab/` + articles | 4 | Visual; EN spot |
| `/about.html` | 2 | 40 words + timeline |
| `/privacy.html` | 4 | Не ломать legal; тон «коротко» |
| `/en/**` | 1, 4 | Mirror + locale bugs |
| 404 | 4 | Тёплый тон, пути |

---

# Чеклист копирайта (перед merge)

- [ ] Нет «просто успокойся / возьми себя в руки» как совета
- [ ] Нет обещаний «за 2 недели»
- [ ] Есть «может / часто / не у всех», где уместно
- [ ] CTA глагол + объект: «Скачать отрывок», «Купить на Литрес»
- [ ] RU звучит как речь Пола (Threads), не как пресс-релиз
- [ ] EN — native, не подстрочник

---

# Тест-план (сводка)

| # | Сценарий | Ожидание |
|---|----------|----------|
| T1 | Cold open home mobile | Понял кто/что/что нажать ≤ 10 с |
| T2 | Door «выгорел» → RESET | Excerpt + buy видны |
| T3 | Catalog все 13 | Buy + advcake |
| T4 | Excerpt download | Файл / превью; goal |
| T5 | LitRes click | sub1 корректен |
| T6 | No JS catalog | Список + noscript filters |
| T7 | EN home + book | Без RU-меток в meta |
| T8 | Privacy | Смысл legal сохранён |
| T9 | Lighthouse mobile home | LCP/CLS/INP в зелёной/жёлтой зоне post-E1 |
| T10 | Keyboard | Tab до buy, Enter открывает |

---

# Порядок работ (сводка)

```
Этап 1  Perf (covers+fonts) → Hero copy → Buy smoke
        ↓
Этап 2  Proof + «как проверить» + bio в hero/about
        ↓
Этап 3  Doors/product CRO → analytics funnel
        ↓
Этап 4  EN locale, a11y, lab visual, SEO polish
        ↓
Критерий «ДА к 100k»: Этап 1 закрыт + proof из Этапа 2 минимум
```

---

# Роли и ответственность (рекомендуемо)

| Роль | Этапы |
|------|--------|
| Front-end | 1.1, 1.2, 1.5, 3.2, 4.2 |
| Редактор RU + голос Пола | 1.3, 2.x, 3.1, 4.4 |
| EN editor | 1.3 EN, 3.3 EN, 4.1 |
| SEO/tech | 1.1 verify, 4.5 |
| Owner (Пол/команда) | Proof quotes approve; soft/hard launch |

---

# Критерий финального «ДА» (из аудита)

Сайт готов к широкому запуску, если:
1. Этап 1 выполнен полностью.
2. Есть хотя бы минимальный trust-блок (2.1 или 2.2).
3. Buy path стабилен на mobile.
4. Нет блокирующих a11y/SEO регрессий.

До этого — **мягкий запуск** (Telegram/Threads/тёплый трафик) допустим.

---

# Приложение A. Ссылки на уже сделанное (не переделывать без причины)

- Lab RU voice rewrite · commit `5aae732`
- Lab EN mirror · `2ac9d0e`
- Catalog hero copy · `7fedda3`
- Канцелярит shell · `8c47799`
- Buy buttons + NSF fix · `c71f2a6`, `885b88b`
- AdvCake bySlug · серия `e79e791`…`b8b0654`

---

# Приложение B. Шаблон задачи (для трекера)

```
Название: [E1.3] Hero home RU/EN
Описание: …
Файлы: …
Критерии приёмки: …
Голос: чеклист 0. / копирайт
Зависимости: …
Оценка: …
```

---

*Документ можно вести как living TZ: отмечать чекбоксы по мере закрытия этапов.*
