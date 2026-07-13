# Сайт Пола Грэка (Pol Grek)

Авторский сайт: книги, отрывки, лаборатория, биография.  
Дизайн: «тёплая лаборатория».

## Локально

```bash
cd pol-grek-site
python3 -m http.server 8765
# http://localhost:8765
```

## GitHub Pages

После push в `main` workflow `.github/workflows/pages.yml` публикует сайт.

1. Settings → Pages → Source: **GitHub Actions**
2. URL:
   - user site: `https://<username>.github.io/`
   - project site: `https://<username>.github.io/<repo>/`

Если репозиторий **не** `username.github.io`, задайте base path в `js/base-config.js` (см. ниже).

## Структура

```
index.html, about.html
books/, lab/
css/, js/, assets/, excerpts/
```
