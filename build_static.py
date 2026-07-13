#!/usr/bin/env python3
"""Build static book + article HTML pages for no-JS / SEO / sharing."""
from __future__ import annotations

import html
import json
import re
import subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parent

TAG_RU = {
    "когнитивное-здоровье": "когнитивное здоровье",
    "биохакинг": "биохакинг",
    "энергия": "энергия",
    "стресс": "стресс",
    "выгорание": "выгорание",
    "деньги": "деньги",
    "гормоны": "гормоны",
    "лора": "с Лорой",
}


def load_data() -> dict:
    node = r"""
const fs=require('fs');const vm=require('vm');
const c={window:{}};vm.createContext(c);
vm.runInContext(fs.readFileSync('js/data.js','utf8'),c);
console.log(JSON.stringify(c.window.POL_GREK));
"""
    return json.loads(subprocess.check_output(["node", "-e", node], cwd=SITE, text=True))


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def cover_path(book: dict, prefix: str = "") -> str:
    return f"{prefix}../assets/covers/{book.get('coverFile', book['slug'] + '.jpg')}"


def book_url(slug: str, prefix: str = "") -> str:
    return f"{prefix}{slug}.html"


def tags_html(book: dict) -> str:
    parts = []
    if len(book.get("authors") or []) > 1:
        parts.append('<span class="tag co">с Лорой Грэк</span>')
    n = 0
    for t in book.get("tags") or []:
        if t == "лора":
            continue
        parts.append(f'<span class="tag">{esc(TAG_RU.get(t, t))}</span>')
        n += 1
        if n >= 2:
            break
    return '<span class="tag-sep"> · </span>'.join(parts)


def amazon_product_url(book: dict) -> str:
    u = (book.get("amazon") or "").strip()
    if re.search(r"amazon\.[a-z.]+/(?:dp|gp/product)/", u, re.I):
        return u
    return ""


def store_actions_html(book: dict, href: str, compact: bool = True) -> str:
    sm = " btn-sm" if compact else ""
    parts = [
        f'<a class="btn{sm} btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Литрес</a>'
    ]
    amz = amazon_product_url(book)
    if amz:
        parts.append(
            f'<a class="btn{sm} btn-outline" href="{esc(amz)}" target="_blank" rel="noopener">Amazon</a>'
        )
    parts.append(f'<a class="btn{sm} btn-outline" href="{href}#excerpt">Отрывок</a>')
    return "\n      ".join(parts)


def book_card(book: dict, prefix: str = "", books_dir: bool = True) -> str:
    # prefix for links from books/ folder to other books: "" if same folder
    # assets: ../assets
    slug = book["slug"]
    href = book_url(slug, "") if books_dir else f"books/{slug}.html"
    cover = f"../assets/covers/{book.get('coverFile', slug + '.jpg')}" if books_dir else f"assets/covers/{book.get('coverFile', slug + '.jpg')}"
    if not books_dir:
        href = f"books/{slug}.html"
        cover = f"assets/covers/{book.get('coverFile', slug + '.jpg')}"
    return f"""
<article class="book-card{' is-flagship' if book.get('flagship') else ''}">
  <a class="book-cover has-image clean" href="{href}" aria-label="{esc(book['title'])}">
    <img src="{cover}" alt="Обложка: {esc(book['title'])}" loading="lazy" width="600" height="900" />
  </a>
  <div class="book-body">
    <h3 class="book-title"><a href="{href}">{esc(book['title'])}</a></h3>
    <div class="book-tags">{tags_html(book)}</div>
    <p>{esc(book['promise'])}</p>
    <div class="book-actions">
      {store_actions_html(book, href, compact=True)}
    </div>
    <a class="book-more" href="{href}">Аннотация и отрывок →</a>
  </div>
</article>"""


def article_card(a: dict, from_lab: bool = True) -> str:
    href = f"{a['slug']}.html" if from_lab else f"lab/{a['slug']}.html"
    return f"""
<a class="article-card" href="{href}">
  <div class="cat">{esc(a['category'])}</div>
  <h3>{esc(a['title'])}</h3>
  <p>{esc(a['hook'])}</p>
  <div class="meta">{a['readMin']} мин · отрывок и книга →</div>
</a>"""


def article_body_html(article: dict) -> str:
    out = []
    for block in article.get("body") or []:
        t = block.get("type")
        if t == "h2":
            out.append(f"<h2>{esc(block.get('text', ''))}</h2>")
        elif t == "experiment":
            out.append(
                f'<div class="experiment"><strong>{esc(block.get("title", "Практика"))}</strong>'
                f'<p style="margin:0;max-width:none">{esc(block.get("text", ""))}</p></div>'
            )
        else:
            out.append(f"<p>{esc(block.get('text', ''))}</p>")
    return "\n".join(out)


def related_books(G: dict, slug: str, n: int = 3) -> list:
    book = next((b for b in G["books"] if b["slug"] == slug), None)
    if not book:
        return G["books"][:n]
    scored = []
    for b in G["books"]:
        if b["slug"] == slug:
            continue
        score = len(set(b.get("tags") or []) & set(book.get("tags") or []))
        if any(a in (b.get("authors") or []) for a in (book.get("authors") or [])):
            score += 0.5
        scored.append((score, b))
    scored.sort(key=lambda x: -x[0])
    return [b for _, b in scored[:n]]


def shell(title: str, description: str, body: str, page: str, base: str, path_prefix: str) -> str:
    # path_prefix: '' for root, '../' for books/lab
    css = f"{path_prefix}css/styles.css"
    fav = f"{path_prefix}assets/favicon.svg"
    fav2 = f"{path_prefix}assets/favicon.png"
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}" />
  <meta property="og:title" content="{esc(title)}" />
  <meta property="og:description" content="{esc(description)}" />
  <meta property="og:type" content="article" />
  <link rel="icon" href="{fav}" type="image/svg+xml" />
  <link rel="icon" href="{fav2}" type="image/png" />
  <link rel="stylesheet" href="{css}" />
</head>
<body data-page="{page}" data-base="{base}">
  <div id="site-header"></div>
  <main id="main-content" tabindex="-1">
{body}
  </main>
  <div id="site-footer"></div>
  <script src="{path_prefix}js/base-config.js"></script>
  <script src="{path_prefix}js/data.js"></script>
  <script src="{path_prefix}js/main.js"></script>
</body>
</html>
"""


def build_book_page(G: dict, book: dict) -> str:
    all_books = G["books"]
    idx = next(i for i, b in enumerate(all_books) if b["slug"] == book["slug"])
    prev_b = all_books[idx - 1] if idx > 0 else None
    next_b = all_books[idx + 1] if idx < len(all_books) - 1 else None
    related = related_books(G, book["slug"], 3)
    primary = next((t for t in (book.get("tags") or []) if t != "лора"), "")
    topic = TAG_RU.get(primary, primary)
    topic_href = f"index.html?filter={html.escape(primary)}" if primary else "index.html"
    authors = ", ".join(book.get("authors") or [])
    series = book.get("series") or "Научпоп о мозге"
    excerpt_file = f"../excerpts/{book.get('excerptFile', book['slug'] + '-otryvok.txt')}"
    cover = f"../assets/covers/{book.get('coverFile', book['slug'] + '.jpg')}"

    # load excerpt file if exists
    ex_path = SITE / "excerpts" / book.get("excerptFile", f"{book['slug']}-otryvok.txt")
    excerpt_text = book.get("excerpt") or ""
    if ex_path.exists():
        raw = ex_path.read_text(encoding="utf-8", errors="ignore")
        raw = re.sub(r"^[\s\S]*?— Отрывок —\s*", "", raw)
        raw = re.sub(r"\n—\n[\s\S]*$", "", raw).strip()
        if raw:
            excerpt_text = raw[:2200] + ("…" if len(raw) > 2200 else "")

    prev_html = (
        f'<a class="book-pn prev" href="{prev_b["slug"]}.html"><span class="book-pn-label">← Предыдущая</span><strong>{esc(prev_b["title"])}</strong></a>'
        if prev_b
        else '<span class="book-pn prev empty"></span>'
    )
    next_html = (
        f'<a class="book-pn next" href="{next_b["slug"]}.html"><span class="book-pn-label">Следующая →</span><strong>{esc(next_b["title"])}</strong></a>'
        if next_b
        else '<span class="book-pn next empty"></span>'
    )
    related_cards = "".join(book_card(b, books_dir=True) for b in related)

    body = f"""
    <div class="container book-page" style="padding-top:1.5rem">
      <noscript><div class="noscript-banner">Страница книги открыта без JavaScript: описание и отрывок ниже.</div></noscript>
      <nav class="breadcrumb" aria-label="Вы здесь">
        <a href="../index.html">Главная</a>
        <span class="bc-sep" aria-hidden="true">/</span>
        <a href="index.html">Книги</a>
        {f'<span class="bc-sep" aria-hidden="true">/</span><a href="{topic_href}">{esc(topic)}</a>' if topic else ''}
        <span class="bc-sep" aria-hidden="true">/</span>
        <span aria-current="page">{esc(book["title"])}</span>
      </nav>

      <div class="book-you-are-here" role="status">
        <span>Сейчас открыта книга</span>
        <strong>{esc(book["title"])}</strong>
        <span class="book-you-are-meta">{esc(authors)}</span>
      </div>

      <nav class="book-toc" aria-label="На этой странице">
        <span class="book-toc-label">На странице:</span>
        <a href="#for-whom">Для кого</a>
        <a href="#about-book">О чём</a>
        <a href="#inside">Что внутри</a>
        <a href="#excerpt">Отрывок</a>
        <a href="#related">Похожие</a>
        <a href="{esc(book["litres"])}" target="_blank" rel="noopener" class="book-toc-buy">Купить на Литрес</a>
      </nav>

      <div class="book-detail">
        <aside class="book-detail-aside">
          <div class="book-detail-cover has-image">
            <img src="{cover}" alt="Обложка: {esc(book["title"])}" width="640" height="960" />
          </div>
          <div class="book-aside-actions">
            <a class="btn btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Купить на Литрес</a>
            {f'<a class="btn btn-outline" href="{esc(amazon_product_url(book))}" target="_blank" rel="noopener">Amazon</a>' if amazon_product_url(book) else ""}
            <a class="btn btn-outline" href="#excerpt">Читать отрывок</a>
          </div>
          <p class="book-aside-hint">{"Оплата на Литрес или Amazon. " if amazon_product_url(book) else "Оплата на Литрес. "}Здесь — описание и фрагмент; сайт не принимает платежи.</p>
        </aside>

        <div class="book-detail-body">
          <p class="eyebrow">{esc(series)}</p>
          <h1 class="display book-h1">{esc(book["title"])}</h1>
          <p class="lead">{esc(book.get("subtitle") or "")}</p>
          <p class="book-authors">Автор: {esc(authors)}</p>

          <div class="actions book-main-actions">
            <a class="btn btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Купить на Литрес</a>
            {f'<a class="btn btn-outline" href="{esc(amazon_product_url(book))}" target="_blank" rel="noopener">Amazon</a>' if amazon_product_url(book) else ""}
            <a class="btn btn-outline" href="#excerpt">К отрывку ↓</a>
            <a class="btn btn-ghost-link" href="{excerpt_file}" download>Скачать отрывок</a>
          </div>

          <p class="grade-legend book-grade">
            <strong>Уровни доказательности в подходе автора:</strong>
            A — надёжные данные; B — хорошие исследования; C — ограниченные данные; D — наблюдения.
          </p>

          <section id="for-whom" class="book-section">
            <h2>Для кого эта книга</h2>
            <ul class="checklist">{"".join(f"<li>{esc(x)}</li>" for x in book.get("forWhom") or [])}</ul>
          </section>

          <section id="about-book" class="book-section">
            <h2>О чём</h2>
            <p>{esc(book.get("annotation") or "")}</p>
          </section>

          <section id="inside" class="book-section">
            <h2>Что внутри</h2>
            <ul class="checklist">{"".join(f"<li>{esc(x)}</li>" for x in book.get("takeaways") or [])}</ul>
          </section>

          <section class="excerpt-box book-section" id="excerpt">
            <div class="excerpt-head">
              <strong>Отрывок</strong>
              <a class="btn btn-sm btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Читать целиком на Литрес</a>
            </div>
            <p class="muted excerpt-lead">Фрагмент из книги. Если тон откликнулся — полный текст на Литрес.</p>
            <pre id="excerptPreview">{esc(excerpt_text)}</pre>
            <div class="btn-row" style="margin-top:1rem">
              <a class="btn btn-teal" href="{excerpt_file}" download>Скачать отрывок (.txt)</a>
            </div>
          </section>

          <div class="disclaimer">
            Книга носит образовательный характер и не заменяет консультацию врача, психотерапевта или финансового советника.
          </div>

          <nav class="book-prev-next" aria-label="Соседние книги">
            {prev_html}
            <a class="book-pn catalog" href="index.html">Весь каталог</a>
            {next_html}
          </nav>

          <section class="related book-section" id="related">
            <div class="section-head">
              <div>
                <p class="eyebrow">Рядом на полке</p>
                <h2>Если эта тема откликнулась</h2>
              </div>
              <a class="btn btn-outline" href="{topic_href}">Ещё в каталоге</a>
            </div>
            <div class="books-grid">{related_cards}</div>
          </section>
        </div>
      </div>
    </div>
    <div class="sticky-buy" aria-label="Быстрые действия">
      <a class="btn btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Литрес</a>
      {f'<a class="btn btn-outline" href="{esc(amazon_product_url(book))}" target="_blank" rel="noopener">Amazon</a>' if amazon_product_url(book) else '<a class="btn btn-outline" href="#excerpt">Отрывок</a>'}
      <a class="btn btn-ghost-link" href="index.html">Каталог</a>
    </div>
"""
    title = f"{book['title']} — Пол Грэк"
    desc = f"{book['title']}: {book.get('subtitle') or book.get('promise') or ''}. Отрывок и покупка на Литрес."
    return shell(title, desc[:160], body, "book", "..", "../")


def build_article_page(G: dict, article: dict) -> str:
    book = next((b for b in G["books"] if b["slug"] == article.get("relatedBook")), None)
    others = [a for a in G["articles"] if a["slug"] != article["slug"]][:3]
    body_html = article_body_html(article)
    book_side = ""
    if book:
        book_side = f"""
        <div class="side-card">
          <p class="eyebrow" style="margin-bottom:0.5rem">Если хотите глубже</p>
          <h3>{esc(book["title"])}</h3>
          <p>{esc(book["promise"])}</p>
          <a class="btn btn-primary" href="../books/{book["slug"]}.html">К книге</a>
          <a class="btn btn-outline" href="{esc(book["litres"])}" target="_blank" rel="noopener">Купить на Литрес</a>
        </div>"""
    more = "".join(
        f'<a href="{a["slug"]}.html" style="display:block;padding:0.45rem 0;font-weight:600;color:var(--ink)">{esc(a["title"])}</a>'
        for a in others
    )
    body = f"""
    <div class="container" style="padding-top:1.5rem">
      <noscript><div class="noscript-banner">Статья открыта без JavaScript.</div></noscript>
      <nav class="breadcrumb" aria-label="Вы здесь">
        <a href="../index.html">Главная</a>
        <span class="bc-sep">/</span>
        <a href="index.html">Лаборатория</a>
        <span class="bc-sep">/</span>
        <span aria-current="page">{esc(article["title"])}</span>
      </nav>
      <div class="article-layout">
        <article class="article-content">
          <p class="eyebrow">{esc(article["category"])} · {article["readMin"]} мин</p>
          <h1>{esc(article["title"])}</h1>
          <p class="lead">{esc(article["hook"])}</p>
          <div class="pull-quote">{esc(article["hook"])}</div>
          {body_html}
          <div class="btn-row" style="margin-top:2rem">
            {f'<a class="btn btn-primary" href="../books/{book["slug"]}.html">Книга: {esc(book["title"])}</a>' if book else ""}
            <a class="btn btn-outline" href="index.html">Все материалы</a>
          </div>
        </article>
        <aside class="article-side">
          {book_side}
          <div class="side-card" style="margin-top:1rem">
            <h3>Ещё из лаборатории</h3>
            {more}
          </div>
        </aside>
      </div>
    </div>
"""
    title = f"{article['title']} — Лаборатория Пола Грэка"
    desc = (article.get("hook") or article["title"])[:160]
    return shell(title, desc, body, "article", "..", "../")


def main() -> None:
    G = load_data()

    # Generate book pages
    books_dir = SITE / "books"
    for book in G["books"]:
        html_out = build_book_page(G, book)
        (books_dir / f"{book['slug']}.html").write_text(html_out, encoding="utf-8")
        print("book", book["slug"])

    # Generate article pages
    lab_dir = SITE / "lab"
    for article in G["articles"]:
        html_out = build_article_page(G, article)
        (lab_dir / f"{article['slug']}.html").write_text(html_out, encoding="utf-8")
        print("article", article["slug"])

    # Update catalog partials (no Amazon)
    flagships = [b for b in G["books"] if b.get("flagship")]
    (SITE / "partials" / "flagships.html").write_text(
        "".join(book_card(b, books_dir=False).replace('href="books/', 'href="books/').replace('src="assets/', 'src="assets/') for b in flagships),
        encoding="utf-8",
    )
    # Fix flagships for index (from root)
    def card_root(book):
        return book_card(book, books_dir=False)

    def card_books_dir(book):
        return book_card(book, books_dir=True)

    flagships_html = "".join(card_root(b) for b in flagships)
    books_all_html = "".join(card_books_dir(b) for b in G["books"])
    (SITE / "partials" / "flagships.html").write_text(flagships_html, encoding="utf-8")
    (SITE / "partials" / "books-all.html").write_text(books_all_html, encoding="utf-8")

    # Inject into static index + catalog (no-JS grids)
    def inject_between(path: Path, start_marker: str, end_marker: str, content: str) -> None:
        raw = path.read_text(encoding="utf-8")
        a = raw.find(start_marker)
        b = raw.find(end_marker, a + len(start_marker) if a >= 0 else 0)
        if a < 0 or b < 0:
            print("skip inject", path.name)
            return
        path.write_text(raw[: a + len(start_marker)] + content + raw[b:], encoding="utf-8")
        print("inject", path.name)

    inject_between(
        SITE / "index.html",
        'id="featuredBooks">',
        "</div>\n        <p class=\"catalog-hint\">",
        flagships_html,
    )
    inject_between(
        SITE / "books" / "index.html",
        'id="booksGrid">',
        "</div>\n        <p class=\"catalog-hint\"",
        books_all_html,
    )

    arts = "".join(
        f"""
<a class="article-card" href="lab/{a['slug']}.html">
  <div class="cat">{esc(a['category'])}</div>
  <h3>{esc(a['title'])}</h3>
  <p>{esc(a['hook'])}</p>
  <div class="meta">{a['readMin']} мин · отрывок и книга →</div>
</a>"""
        for a in G["articles"][:3]
    )
    (SITE / "partials" / "articles.html").write_text(arts, encoding="utf-8")

    arts_all = "".join(
        f"""
<a class="article-card" href="{a['slug']}.html">
  <div class="cat">{esc(a['category'])}</div>
  <h3>{esc(a['title'])}</h3>
  <p>{esc(a['hook'])}</p>
  <div class="meta">{a['readMin']} мин · отрывок и книга →</div>
</a>"""
        for a in G["articles"]
    )
    (SITE / "partials" / "articles-all.html").write_text(arts_all, encoding="utf-8")

    # Redirect stubs for old ?slug= URLs — with static link lists for no-JS / bots
    book_links = "".join(
        f'<li><a href="{b["slug"]}.html">{esc(b["title"])}</a></li>' for b in G["books"]
    )
    art_links = "".join(
        f'<li><a href="{a["slug"]}.html">{esc(a["title"])}</a></li>' for a in G["articles"]
    )

    (SITE / "books" / "book.html").write_text(
        f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Переход к книге — Пол Грэк</title>
  <meta name="robots" content="noindex" />
  <link rel="stylesheet" href="../css/styles.css" />
  <script>
    (function () {{
      var p = new URLSearchParams(location.search);
      var slug = p.get('slug') || 'mozg-na-100';
      location.replace(slug + '.html' + (location.hash || ''));
    }})();
  </script>
</head>
<body data-page="books" data-base="..">
  <div id="site-header"></div>
  <main class="container page-hero">
    <h1>Переход к книге…</h1>
    <p class="lead">Если переход не сработал, выберите книгу ниже или откройте <a href="index.html">каталог</a>.</p>
    <noscript>
      <p class="muted">Автопереход требует JavaScript. Список книг (без JS):</p>
      <ul>{book_links}</ul>
    </noscript>
  </main>
  <div id="site-footer"></div>
  <script src="../js/base-config.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )

    (SITE / "lab" / "article.html").write_text(
        f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Переход к статье — Пол Грэк</title>
  <meta name="robots" content="noindex" />
  <link rel="stylesheet" href="../css/styles.css" />
  <script>
    (function () {{
      var p = new URLSearchParams(location.search);
      var slug = p.get('slug') || 'motivaciya-pobochnyy-produkt';
      location.replace(slug + '.html' + (location.hash || ''));
    }})();
  </script>
</head>
<body data-page="lab" data-base="..">
  <div id="site-header"></div>
  <main class="container page-hero">
    <h1>Переход к статье…</h1>
    <p class="lead">Если переход не сработал, выберите материал ниже или откройте <a href="index.html">лабораторию</a>.</p>
    <noscript>
      <p class="muted">Автопереход требует JavaScript. Материалы (без JS):</p>
      <ul>{art_links}</ul>
    </noscript>
  </main>
  <div id="site-footer"></div>
  <script src="../js/base-config.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )

    print("OK: static pages built")


if __name__ == "__main__":
    main()
