# Партнёрские ссылки Литрес (AdvCake) → polgrek.site

Цель: при клике «Купить» на [polgrek.site](https://polgrek.site/) пользователь попадает на Литрес **через вашу реферальную ссылку** AdvCake, и покупка (cookie ~30 дней) засчитывается вам.

Кабинет: [my.advcake.com](https://my.advcake.com/) · регистрация в оффер Литрес: [my.advcake.ru/o/litresru](https://my.advcake.ru/o/litresru/affiliate/registration)

---

## 1. Что сделать в кабинете AdvCake (один раз)

1. Войти в [my.advcake.com](https://my.advcake.com/) (или `.ru`).
2. Подключить оффер **Литрес** (Litres), если ещё не подключён.
3. Добавить площадку **https://polgrek.site/** и дождаться модерации (обычно ежедневно; письмо на почту).
4. Открыть **Генератор ссылок / Deep links** (название может быть «Инструменты → Генератор»).
5. Вставить URL книги с Литрес → получить **партнёрскую ссылку**.
6. Скопировать также текст **маркировки рекламы** (erid / «Реклама») — в РФ он нужен рядом с рекламными ссылками. AdvCake пишет, что токены в ОРД уже в ссылках; вам — вставить готовый дисклеймер на сайт/в пост.

Условия и ставки: в кабинете, wall офферов Литрес.

---

## 2. Готовые URL всех 13 книг (вставить в генератор)

Скопируйте по одной строке в генератор AdvCake:

| # | Книга | slug | URL на Литрес |
|---|--------|------|----------------|
| 1 | Мозг на 100+ | `mozg-na-100` | https://www.litres.ru/book/pol-grek/mozg-na-100-nauchnyy-plan-sohraneniya-kognitivnyh-funkciy-do-glub-73556522/ |
| 2 | Биохакинг мозга | `biohacking-mozga` | https://www.litres.ru/book/pol-grek/biohaking-mozga-73755942/ |
| 3 | Анатомия энергии | `anatomiya-energii` | https://www.litres.ru/book/pol-grek/anatomiya-energii-73551286/ |
| 4 | Мозг и деньги | `mozg-i-dengi` | https://www.litres.ru/book/pol-grek/mozg-i-dengi-74048009/ |
| 5 | Сначала деньги, потом сознание | `snachala-dengi-potom-soznanie` | https://www.litres.ru/book/pol-grek/snachala-dengi-potom-soznanie-73569016/ |
| 6 | Стресс и мозг | `stress-i-mozg` | https://www.litres.ru/book/pol-grek/stress-i-mozg-74047783/ |
| 7 | RESET | `reset` | https://www.litres.ru/book/pol-grek/reset-neyrobiologiya-vygoraniya-i-vosstanovlenie-adaptacionnogo-r-74066286/ |
| 8 | Ментальный дебаг | `mentalnyy-debag` | https://www.litres.ru/book/pol-grek/mental-nyy-debag-kak-perezagruzit-mozg-za-5-minut-v-den-73443798/ |
| 9 | Осторожный биохакер | `ostorozhnyy-biohaker` | https://www.litres.ru/book/pol-grek/ostorozhnyy-biohaker-73548892/ |
| 10 | Священные часы | `svyashchennye-chasy` | https://www.litres.ru/book/pol-grek/svyaschennye-chasy-neyroinzheneriya-soznaniya-73479341/ |
| 11 | Женский мозг | `zhenskiy-mozg` | https://www.litres.ru/book/lora-grek/zhenskiy-mozg-73580927/ |
| 12 | Мужской мозг | `muzhskoy-mozg` | https://www.litres.ru/book/lora-grek/muzhskoy-mozg-73738682/ |
| 13 | Эмоциональный интеллект 2.0 | `ei-2` | https://www.litres.ru/book/pol-grek/emocional-nyy-intellekt-2-0-73597132/ |

Страница автора (кнопки «Литрес» в шапке):  
https://www.litres.ru/author/pol-grek/

---

## 3. Как подключить ссылки на сайте

Конфиг: `js/data.js` → блок `affiliate`.

### Формат AdvCake «Ручной» (как у вас) — уже включён

Генератор отдаёт **не** go.advcake.com, а URL litres.ru с query:

```
https://www.litres.ru/book/.../книга/?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=ВАШ_ID&...&sub1=SLUG&erid=...&advcake_method=1&m=1
```

На сайте достаточно **одного шаблона** (уже проставлен из вашей ссылки EI 2.0):

```js
affiliate: {
  enabled: true,
  template:
    '{url}?utm_source=advcake&utm_medium=cpa&utm_campaign=affiliate&utm_content=f71f3ad5&advcake_params=&utm_term=&sub1={sub1}&keyword=polgrek+%2F+site&erid=2VfnxyNkZrY&advcake_method=1&m=1',
  authorSub1: 'author',
  authorUrl: '',
  bySlug: {},
},
```

- `{url}` — чистый URL книги  
- `{sub1}` — slug (`ei-2`, `reset`…) → видно в статистике AdvCake  
- `utm_content=f71f3ad5` — ваш partner content id  
- `erid=2VfnxyNkZrY` — маркировка ФЗ-38  

**13 раз генерировать не нужно** — шаблон покрывает все книги.

### Вариант B — 13 готовых ссылок

Если генератор даёт **уникальный короткий URL** на каждый товар:

```js
affiliate: {
  enabled: true,
  template: '',
  authorUrl: 'https://...партнёрская-на-автора...',
  bySlug: {
    'mozg-na-100': 'https://...из-генератора...',
    'biohacking-mozga': 'https://...',
    'anatomiya-energii': 'https://...',
    'mozg-i-dengi': 'https://...',
    'snachala-dengi-potom-soznanie': 'https://...',
    'stress-i-mozg': 'https://...',
    'reset': 'https://...',
    'mentalnyy-debag': 'https://...',
    'ostorozhnyy-biohaker': 'https://...',
    'svyashchennye-chasy': 'https://...',
    'zhenskiy-mozg': 'https://...',
    'muzhskoy-mozg': 'https://...',
    'ei-2': 'https://...',
  },
},
```

### После правок

```bash
cd Projects/pol-grek-site
python3 build_static.py
# затем деплой (GitHub Pages / ваш deploy-скрипт)
```

Кнопки «Купить» в каталоге, на страницах книг, в лаборатории и в JS-шапке пойдут через партнёрку.  
В schema.org `sameAs` остаётся **прямой** URL Литрес (это нормально для SEO).

При `enabled: true` у buy-ссылок ставится `rel="noopener sponsored"`.

---

## 4. Быстрая проверка

1. Включить `affiliate.enabled = true` + template или bySlug.
2. Открыть книгу на сайте → «Купить на Литрес».
3. В адресной строке должен быть **трекинг-домен AdvCake**, затем редирект на litres.ru.
4. В кабинете AdvCake: клики / переходы (через несколько минут).
5. Тестовую покупку (можно отменить/минимальную) — смотреть в статистике (окно cookie ~30 дней, last-click).

---

## 5. Что прислать, чтобы я всё проставил сам

Любой из вариантов:

1. **Один** сгенерированный deep link на любую книгу (я выведу `template` с `{url}`), **или**
2. Список из 13 партнёрских URL + ссылка на автора, **или**
3. Скрин/текст из кабинета: partner id + формат deep link.

После этого: `enabled: true`, пересборка, деплой.

---

## 6. Важно

- **Amazon** на сайте не через AdvCake/Литрес — отдельная партнёрка (Amazon Associates), если понадобится.
- Площадка должна быть **одобрена** в AdvCake, иначе трекинг могут не учитывать.
- В РФ для рекламы книг нужна **маркировка** — берите готовый текст из кабинета рядом с кнопками/в постах (при необходимости добавим дисклеймер в футер сайта).
- Нельзя логиниться в ваш кабинет отсюда: ссылки создаёте только вы.
