# polgrek.site — Next.js (Scientific Premium)

Новая версия сайта Пола Грэка по ТЗ: Next.js 15 App Router, Tailwind 4, dark-first, Neuro Navigator, in-site reader.

## Стек

- **Next.js 15** (App Router, `output: "export"` → статика)
- **React 19** + TypeScript
- **Tailwind CSS 4** + design tokens (dark `#0B0F17` / light `#FAFAFA`)
- **Lucide** icons · **next-themes** · **Plus Jakarta Sans** + **Lora** (ридер)

## Маршруты

| Path | Описание |
|------|----------|
| `/` | Hero, Нейро-навигатор, автор, витрина, Threads |
| `/books/` | Каталог |
| `/books/[slug]/` | Карточка книги + Schema.org Book |
| `/read/[slug]/` | In-site reader главы (шрифт, сепия, sticky → Литрес) |
| `/about/` | Автор |
| `/lab/` | Заглушка лаборатории (миграция) |
| `/en/` | EN landing |

## Команды

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # → out/ (static export)
```

## Данные

- `src/data/site.json` — экспорт из корневого `js/data.js` (книги, affiliate, legal)
- `public/covers/`, `public/excerpts/`, `public/images/` — ассеты

Пересобрать JSON:

```bash
# from web/
node -e "/* см. scripts в истории сессии: vm load ../js/data.js */"
```

## Деплой (GitHub Pages)

1. `npm run build` → папка `web/out`
2. Либо Actions: publish `out/` в gh-pages / root
3. CNAME `polgrek.site` сохранить

Пока **legacy static** (корень репо) остаётся на проде; `web/` — новая версия для поэтапного переключения.

## Воронка

**Threads → Навигатор / глава (`/read/`) → Литрес (erid)**  
Один primary CTA на блок; без инфоцыганства.
