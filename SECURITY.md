# Безопасность и устройства — polgrek.site

Статический сайт (GitHub Pages). Нет серверной сессии, нет БД, нет кассы на сайте.

## Уже в репозитории

| Мера | Где |
|------|-----|
| HTTPS | GitHub Pages + custom domain |
| `rel="noopener noreferrer"` на `target="_blank"` | HTML + `litresRel()` |
| Honeypot + optional email на магните | `magnetForm` |
| Theme boot в try/catch | localStorage |
| Metrika deferred | `base-config.js` |
| Нет inline eval / сторонних виджетов-чатов | — |
| Security meta (CSP, referrer, permissions) | все HTML через `build_static` |
| `_headers` | Cloudflare (если proxy) |

## Заголовки на edge (рекомендуется)

GitHub Pages **не** читает `_headers`. Варианты:

1. **Cloudflare** перед доменом (Free) → Transform Rules или Pages-style headers из `_headers`.
2. Скопировать правила из `_headers` вручную в Cloudflare → Rules → Transform Rules → Modify response header.

Минимум на edge:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (или `CSP frame-ancestors 'none'`)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` (см. `_headers`)
- HSTS: `max-age=15552000; includeSubDomains` (только когда HTTPS стабилен)

## CSP

Строгая CSP ломает Метрику/FormSubmit, если вырезать домены. Актуальный список — в `_headers` и meta `Content-Security-Policy` в HTML.

После смены сторонних скриптов — обновить CSP.

## Внешние ссылки

- Партнёрские: `rel="noopener noreferrer sponsored"`
- Обычные внешние: `rel="noopener noreferrer"`
- JS не подставляет `data-aff`, если host не `litres.ru` / `www.litres.ru`

## Устройства

- `viewport-fit=cover` + `env(safe-area-inset-*)`
- touch targets ≥ 44–48px (`--touch-min`)
- input `font-size: 16px` на mobile (без zoom iOS)
- `overflow-x: clip` на html/body
- `touch-action: manipulation` на кнопках
- horizontal scroll только у намеренных полос (page-jump, tabs)

## Чеклист после деплоя

1. https://securityheaders.com/?q=https://polgrek.site  
2. https://observatory.mozilla.org/analyze/polgrek.site  
3. Chrome DevTools → device toolbar: 320 / 390 / 768 / 1024  
4. iOS Safari: адресная строка, sticky buy, таббар  
5. Android Chrome: 360×800  

## Чего нет (и не нужно для static showcase)

- Auth / cookies сессии  
- Server-side rate limit (edge WAF — Cloudflare)  
- PCI (платежи только на Литрес/Amazon)
