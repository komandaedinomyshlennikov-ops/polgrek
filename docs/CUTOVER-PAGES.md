# Cutover: GitHub Pages → Next.js (`web/`)

## Что меняется

| До | После |
|----|--------|
| Pages **legacy**: source = `main` branch `/` (весь static HTML в корне) | Pages **GitHub Actions**: workflow `Deploy Pages` |
| Корень репо = прод | `web/out` (static export) = прод |
| Старые URL `/knigi/…` | 301-like HTML refresh → `/books/…` |

**Custom domain:** `polgrek.site` (CNAME в артефакте + Settings → Pages).

## Workflow

Файл: `.github/workflows/deploy-pages.yml`

1. `push` на `main` или `workflow_dispatch`
2. `npm ci` + `npm run build` в `web/`
3. `out/CNAME` = `polgrek.site`, `.nojekyll`
4. `actions/upload-pages-artifact` → `actions/deploy-pages`

## Первый cutover (один раз)

1. Merge/push workflow на `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**  
   или API:
   ```bash
   gh api -X PUT repos/OWNER/REPO/pages -f build_type=workflow -f cname=polgrek.site
   ```
3. Дождаться зелёного run:  
   `gh run list --workflow=deploy-pages.yml`
4. Проверить:
   - https://polgrek.site/
   - https://polgrek.site/books/
   - https://polgrek.site/read/reset/
   - https://polgrek.site/knigi/reset/ → редирект на `/books/reset/`
   - HTTPS + www (сертификат уже был approved)

## Откат

Settings → Pages → Source: **Deploy from a branch** → `main` / `/`  
(вернутся legacy HTML из корня репо).

## Локально

```bash
cd web && npm ci && npm run build
# preview: npx serve out
```

## Важно

- Корень репо (legacy `index.html`, `knigi/`, …) **не удаляем** сразу — нужен для отката.
- После стабилизации cutover можно чистить legacy в отдельном PR.
- Не коммитить `web/out` и `web/node_modules` (в `.gitignore`).
