# Performance & infrastructure (этап 12)

Цели CWV / PSI: Desktop ≥ 95, Mobile ≥ 90 · LCP &lt; 2.5s · CLS &lt; 0.1 · INP &lt; 200ms.

## Уже в репозитории

| # | Тема | Что сделано |
|---|------|-------------|
| 12.5 | Изображения | WebP для обложек и портрета; lazy на below-fold; `width`/`height` + `aspect-ratio`; обложки &lt; 200 КБ, прочие delivery &lt; 100 КБ; `*-full.*` в `.gitignore` |
| 12.6 | Шрифты | 2 семейства (Manrope + Source Serif 4), `font-display: swap`, self-hosted woff2; preload только Manrope (cyr+lat) |
| 12.7 | CSS/JS | `esbuild` minify → `styles.min.css`, `main.min.js`, `base-config.min.js`; `defer` на скриптах; Метрика после `load`/`requestIdleCallback` |
| 12.1–4 | CWV | LCP-cover `fetchpriority=high` + preload; secondary lazy; theme boot inline (меньше CLS от темы); `content-visibility` на below-fold секциях |

Сборка минификации: `python3 build_static.py` (вызывает esbuild через `npx`/`esbuild` если есть).

## 12.8 CDN (Cloudflare) — обязательно для TTFB из РФ/СНГ

GitHub Pages отдаёт с CDN GitHub (часто US). Для TTFB &lt; 600 ms из РФ/BY/KZ:

1. Домен `polgrek.site` → **Cloudflare** (Free plan ок).
2. DNS: оранжевое облако (proxy) на GitHub Pages (`A`/`CNAME` как в [доках GH Pages](https://docs.github.com/pages)).
3. SSL/TLS mode: **Full (strict)**.
4. Speed → Optimization: Auto Minify можно off (мы уже минифицируем); Brotli on; Early Hints on.
5. Caching Level: Standard; Browser Cache TTL ≥ 4h для static.
6. Page Rules / Cache Rules: `*.css`, `*.js`, `*.woff2`, `/assets/*` → Cache Everything + Edge TTL 1 month + `stale-while-revalidate`.

Проверка TTFB: WebPageTest (Moscow), PSI «server response», `curl -o /dev/null -s -w '%{time_starttransfer}\n' https://polgrek.site/`.

## 12.9 SSL / HSTS — Grade A+

На Cloudflare:

- SSL/TLS → **Full (strict)**
- Edge Certificates → **Always Use HTTPS**
- **HSTS**: enable, max-age ≥ 6 months, includeSubDomains, preload (когда уверены)
- Minimum TLS: **1.2**, TLS 1.3 on
- Automatic HTTPS Rewrites on

Проверка: [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=polgrek.site) → цель **A+**.

GitHub Pages сам даёт HTTPS на custom domain; A+ обычно после Cloudflare + HSTS.

## 12.10 Хостинг

| Слой | Роль | SLA / примечание |
|------|------|------------------|
| **GitHub Pages** | origin static | Бесплатно, без рекламы, git-deploy; uptime GitHub |
| **Cloudflare** | CDN + SSL + DDoS | Free/Pro; PoP в Европе/СНГ-соседях; не «бесплатный хостинг с баннерами» |

Альтернативы origin при росте: Cloudflare Pages, Netlify, Object Storage + CDN (Yandex/VK Cloud) — если нужна юрисдикция РФ.

Uptime 99.9%: Cloudflare status + внешний монитор (UptimeRobot / Better Stack) на `https://polgrek.site/` и `/knigi/`.

## Как снять отчёт PSI

1. Deploy `main` + purge Cloudflare cache.
2. [PageSpeed Insights](https://pagespeed.web.dev/) для `https://polgrek.site/` и `https://polgrek.site/knigi/mozg-na-100/` — Mobile + Desktop.
3. Сохранить PDF/screenshot отчёта (критерий 12.1).
4. Field data (CrUX) появляется после достаточного трафика; lab metrics — сразу.

## Локальная проверка бюджета файлов

```bash
# обложки webp < 200K, прочие delivery webp/jpg < 100K (не *-full)
find assets -type f \( -name '*.webp' -o -name '*.jpg' \) ! -name '*-full*' -exec ls -la {} \;
```

## Что не кладём в git

- `assets/covers/*-full.*` — исходники обложек
- Опционально `assets/*-full.jpg` портреты (тяжёлые архивы)
