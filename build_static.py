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


def load_data(data_file: str = "js/data.js") -> dict:
    node = f"""
const fs=require('fs');const vm=require('vm');
const c={{window:{{}}}};vm.createContext(c);
vm.runInContext(fs.readFileSync({data_file!r},'utf8'),c);
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
    """Catalog CTA: one buy button; Amazon as text link (no double fat buttons)."""
    sm = " btn-sm" if compact else ""
    amz = amazon_product_url(book)
    amz_link = (
        f'<a class="book-amazon-link" href="{esc(amz)}" target="_blank" rel="noopener" data-track="amazon">Amazon</a>'
        if amz
        else ""
    )
    return f"""<a class="btn{sm} btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener" data-track="litres">Купить</a>
      <div class="book-card-links">
        <a class="book-more" href="{href}">О книге</a>
        {amz_link}
      </div>"""


def book_card_meta(book: dict) -> str:
    """One soft line under promise: format + primary topic (MIF meta under title)."""
    topic = ""
    for t in book.get("tags") or []:
        if t in ("лора", "laura"):
            continue
        topic = TAG_RU.get(t, t)
        break
    bits = ["Электронная"]
    if topic:
        bits.append(topic)
    if len(book.get("authors") or []) > 1:
        bits.append("с Лорой")
    return " · ".join(bits)


# Safe CSS tokens for no-JS catalog filters (data-show + radio ids)
FILTER_SAFE = {
    "all": "all",
    "стресс": "stress",
    "когнитивное-здоровье": "cog",
    "деньги": "money",
    "гормоны": "hormones",
    "выгорание": "burnout",
    "лора": "laura",
    "биохакинг": "bio",
    # EN data-en.js ids
    "stress": "stress",
    "cognitive-health": "cog",
    "money": "money",
    "hormones": "hormones",
    "burnout": "burnout",
    "laura": "laura",
    "biohacking": "bio",
}


def filter_safe(fid: str) -> str:
    if fid in FILTER_SAFE:
        return FILTER_SAFE[fid]
    return re.sub(r"[^a-z0-9]+", "-", (fid or "").lower()).strip("-") or "x"


def book_matches_filter_id(book: dict, fid: str) -> bool:
    """Mirror js/data.js filter rules (match fns are lost in JSON load)."""
    if fid in ("all",):
        return True
    tags = set(book.get("tags") or [])
    authors = book.get("authors") or []
    if fid in ("стресс", "stress"):
        return bool(tags & {"стресс", "энергия", "выгорание", "stress", "energy", "burnout"})
    if fid in ("когнитивное-здоровье", "cognitive-health"):
        return bool(tags & {"когнитивное-здоровье", "cognitive-health"})
    if fid in ("деньги", "money"):
        return bool(tags & {"деньги", "money"})
    if fid in ("гормоны", "hormones"):
        return bool(tags & {"гормоны", "hormones"})
    if fid in ("выгорание", "burnout"):
        return bool(tags & {"выгорание", "burnout"})
    if fid in ("лора", "laura"):
        return bool(tags & {"лора", "laura"}) or len(authors) > 1
    if fid in ("биохакинг", "biohacking"):
        return bool(tags & {"биохакинг", "biohacking"})
    return fid in tags


def book_data_show(book: dict, filter_ids: list[str] | None = None) -> str:
    """Tokens for CSS :checked filters, always includes 'all'."""
    ids = filter_ids or list(FILTER_SAFE.keys())
    tokens = ["all"]
    seen = {"all"}
    for fid in ids:
        if fid == "all":
            continue
        if book_matches_filter_id(book, fid):
            tok = filter_safe(fid)
            if tok not in seen:
                tokens.append(tok)
                seen.add(tok)
    return " ".join(tokens)


def book_card(book: dict, prefix: str = "", books_dir: bool = True) -> str:
    """Cover-first catalog tile (MIF pattern: cover → title → pitch → buy)."""
    slug = book["slug"]
    href = book_url(slug, "") if books_dir else f"books/{slug}.html"
    cover = (
        f"../assets/covers/{book.get('coverFile', slug + '.jpg')}"
        if books_dir
        else f"assets/covers/{book.get('coverFile', slug + '.jpg')}"
    )
    if not books_dir:
        href = f"books/{slug}.html"
        cover = f"assets/covers/{book.get('coverFile', slug + '.jpg')}"

    badges = []
    if book.get("flagship"):
        badges.append('<span class="book-badge book-badge-key">Флагман</span>')
    if len(book.get("authors") or []) > 1:
        badges.append('<span class="book-badge book-badge-co">с Лорой</span>')
    badge_html = f'<div class="book-cover-badges">{"".join(badges)}</div>' if badges else ""
    show = book_data_show(book)

    return f"""
<article class="book-card book-card--tile{' is-flagship' if book.get('flagship') else ''}" data-show="{esc(show)}">
  <a class="book-cover has-image clean" href="{href}" aria-label="{esc(book['title'])}">
    <img src="{cover}" alt="Обложка: {esc(book['title'])}" loading="lazy" width="600" height="900" />
    {badge_html}
  </a>
  <div class="book-body">
    <h3 class="book-title"><a href="{href}">{esc(book['title'])}</a></h3>
    <p class="book-card-promise">{esc(book['promise'])}</p>
    <p class="book-card-meta">{esc(book_card_meta(book))}</p>
    <div class="book-actions book-actions--tile">
      {store_actions_html(book, href, compact=True)}
    </div>
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


def shell(
    title: str,
    description: str,
    body: str,
    page: str,
    base: str,
    path_prefix: str,
    lang: str = "ru",
    data_js: str = "js/data.js",
) -> str:
    # path_prefix: relative to page for assets (e.g. '../../' for en/books)
    css = f"{path_prefix}css/styles.css?v=20260714e"
    fav = f"{path_prefix}assets/favicon.svg"
    fav2 = f"{path_prefix}assets/favicon.png"
    data_src = f"{path_prefix}{data_js}"
    lang_attr = "en" if lang == "en" else "ru"
    data_lang = ' data-lang="en"' if lang == "en" else ""
    return f"""<!DOCTYPE html>
<html lang="{lang_attr}">
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
<body data-page="{page}" data-base="{base}"{data_lang}>
  <div id="site-header">
    <header class="site-header site-header--static" id="siteHeader">
      <div class="nav-inner">
        <a class="logo" href="{path_prefix}index.html" aria-label="{('Pol Grek — home' if lang == 'en' else 'Пол Грэк — на главную')}">
          <span class="logo-mark" aria-hidden="true"></span>
          <span class="logo-text">{('Pol Grek' if lang == 'en' else 'Пол Грэк')}<span>{('brain science' if lang == 'en' else 'нейробиология')}</span></span>
        </a>
        <nav class="nav-links" aria-label="{('Primary' if lang == 'en' else 'Основная навигация')}">
          <a href="{path_prefix}index.html">{('Home' if lang == 'en' else 'Главная')}</a>
          <a href="{path_prefix}books/index.html">{('Books' if lang == 'en' else 'Книги')}</a>
          <a href="{path_prefix}lab/index.html">{('Lab' if lang == 'en' else 'Лаборатория')}</a>
          <a href="{path_prefix}about.html">{('About' if lang == 'en' else 'Об авторе')}</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-primary nav-cta" href="{path_prefix}books/index.html">{('Books' if lang == 'en' else 'Книги')}</a>
        </div>
      </div>
    </header>
  </div>
  <main id="main-content" tabindex="-1">
{body}
  </main>
  <div id="site-footer"></div>
  <script src="{path_prefix}js/base-config.js"></script>
  <script src="{data_src}"></script>
  <script src="{path_prefix}js/main.js"></script>
</body>
</html>
"""


def pick_pull_quote(book: dict, excerpt_file_text: str = "") -> str:
    """Return a hooky one-liner for «Из книги» — never title/subtitle fluff."""
    explicit = (book.get("pullQuote") or book.get("hookQuote") or "").strip()
    if explicit:
        return explicit[:280]

    title = (book.get("title") or "").strip().lower()
    subtitle = (book.get("subtitle") or "").strip().lower()
    promise = (book.get("promise") or "").strip().lower()

    def is_junk(line: str) -> bool:
        s = line.strip()
        if len(s) < 45:
            return True
        low = s.lower().strip(" «»\"'.,")
        if low in (title, subtitle, promise):
            return True
        if title and title in low and len(low) < len(title) + 30:
            return True
        if subtitle and (low == subtitle or subtitle in low and len(low) < len(subtitle) + 20):
            return True
        u = s.upper()
        if u.startswith("ДИСКЛЕЙМЕР") or s.startswith("DISCLAIMER"):
            return True
        if s.startswith("#") or s.startswith("ГЛАВА") or s.startswith("CHAPTER"):
            return True
        if s.startswith("Предисловие") or s.startswith("Preface") or s.startswith("Правовая"):
            return True
        # Subtitle-like: no period, marketing colon title
        if "." not in s and "!" not in s and "?" not in s and ":" in s and len(s) < 120:
            return True
        # ALL-CAPS chapter heads
        letters = [c for c in s if c.isalpha()]
        if letters and sum(1 for c in letters if c.isupper()) / len(letters) > 0.7 and len(s) < 100:
            return True
        return False

    def first_sentence_chunk(text: str, max_len: int = 200) -> str:
        text = re.sub(r"\s+", " ", (text or "").strip())
        if not text or is_junk(text[:120]):
            # still try full scan below
            pass
        # Prefer first 1–2 sentences
        parts = re.split(r"(?<=[.!?…])\s+", text)
        chunk = ""
        for p in parts:
            p = p.strip()
            if not p:
                continue
            if is_junk(p) and not chunk:
                continue
            nxt = (chunk + " " + p).strip() if chunk else p
            if len(nxt) > max_len and chunk:
                break
            chunk = nxt
            if len(chunk) >= 70:
                break
        if chunk and not is_junk(chunk):
            return chunk[:max_len].rstrip("…") + ("…" if len(chunk) > max_len else "")
        return ""

    # 1) Short model excerpt from data.js (usually the real hook)
    from_model = first_sentence_chunk(book.get("excerpt") or "")
    if from_model:
        return from_model

    # 2) File excerpt lines
    for line in (excerpt_file_text or "").split("\n"):
        line = line.strip()
        if is_junk(line):
            continue
        got = first_sentence_chunk(line)
        if got:
            return got

    # 3) Last resort: promise if it is opinionated enough
    prom = (book.get("promise") or "").strip()
    if prom and len(prom) > 40 and not is_junk(prom):
        return prom
    return ""


def series_mates(G: dict, book: dict, n: int = 6) -> list:
    series = (book.get("series") or "").strip()
    if not series:
        return []
    mates = [
        b
        for b in G["books"]
        if b["slug"] != book["slug"] and (b.get("series") or "").strip() == series
    ]
    return mates[:n]


def build_book_page(G: dict, book: dict, *, prefer_inline_excerpt: bool = False) -> str:
    """Product page inspired by MIF catalog product layout."""
    all_books = G["books"]
    idx = next(i for i, b in enumerate(all_books) if b["slug"] == book["slug"])
    prev_b = all_books[idx - 1] if idx > 0 else None
    next_b = all_books[idx + 1] if idx < len(all_books) - 1 else None
    related = related_books(G, book["slug"], 4)
    mates = series_mates(G, book, 6)
    primary = next(
        (t for t in (book.get("tags") or []) if t not in ("лора", "laura")),
        "",
    )
    topic = TAG_RU.get(primary, primary)
    topic_href = f"index.html?filter={html.escape(primary)}" if primary else "index.html"
    authors_list = book.get("authors") or []
    authors = ", ".join(authors_list)
    series = book.get("series") or "Научпоп о мозге"
    excerpt_file = f"../excerpts/{book.get('excerptFile', book['slug'] + '-otryvok.txt')}"
    cover = f"../assets/covers/{book.get('coverFile', book['slug'] + '.jpg')}"
    amz = amazon_product_url(book)

    # Highlights (MIF "О книге" bullets): takeaways first, else forWhom
    highlights = (book.get("takeaways") or book.get("forWhom") or [])[:3]
    highlights_html = "".join(f"<li>{esc(x)}</li>" for x in highlights)

    # Tags as chips
    tag_chips = []
    for t in book.get("tags") or []:
        if t in ("лора", "laura"):
            continue
        label = TAG_RU.get(t, t)
        tag_chips.append(
            f'<a class="book-tag-chip" href="index.html?filter={html.escape(t)}">{esc(label)}</a>'
        )
    if len(authors_list) > 1:
        tag_chips.insert(0, '<span class="book-tag-chip is-co">с Лорой Грэк</span>')
    tags_row = "".join(tag_chips)

    # Series shelf thumbs
    series_html = ""
    if mates:
        thumbs = []
        for b in mates:
            c = f"../assets/covers/{b.get('coverFile', b['slug'] + '.jpg')}"
            thumbs.append(
                f'<a class="book-series-thumb" href="{b["slug"]}.html" title="{esc(b["title"])}">'
                f'<img src="{c}" alt="{esc(b["title"])}" width="96" height="144" loading="lazy" />'
                f"<span>{esc(b['title'])}</span></a>"
            )
        series_html = f"""
      <section class="book-series-shelf" aria-label="Серия">
        <div class="book-series-head">
          <p class="eyebrow">{esc(series)}</p>
          <a class="btn btn-ghost-link" href="index.html">Все книги серии →</a>
        </div>
        <div class="book-series-track">{"".join(thumbs)}</div>
      </section>"""

    # load excerpt file if exists (skip for EN — use native inline excerpt)
    excerpt_text = book.get("excerpt") or ""
    if not prefer_inline_excerpt:
        ex_path = SITE / "excerpts" / book.get("excerptFile", f"{book['slug']}-otryvok.txt")
        if ex_path.exists():
            raw = ex_path.read_text(encoding="utf-8", errors="ignore")
            raw = re.sub(r"^[\s\S]*?— Отрывок —\s*", "", raw)
            raw = re.sub(r"\n—\n[\s\S]*$", "", raw).strip()
            if raw:
                excerpt_text = raw[:2200] + ("…" if len(raw) > 2200 else "")
    else:
        excerpt_text = (excerpt_text or "")[:2200]

    # Pull-quote: explicit hook first; never use title/subtitle as “quote”
    pull = pick_pull_quote(book, excerpt_text)
    if pull:
        # Avoid ««…»» when the hook already starts with guillemets/quotes
        display = pull.strip()
        if not (display.startswith("«") or display.startswith('"') or display.startswith("“")):
            display = f"«{display}»"
        pull_html = (
            f'<blockquote class="book-pull-quote"><p>{esc(display)}</p>'
            f'<cite>— {esc(authors_list[0] if authors_list else "Пол Грэк")}</cite></blockquote>'
        )
    else:
        pull_html = ""

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

    for_whom_items = "".join(f"<li>{esc(x)}</li>" for x in (book.get("forWhom") or []))
    takeaway_items = "".join(f"<li>{esc(x)}</li>" for x in (book.get("takeaways") or []))
    annotation = book.get("annotation") or book.get("promise") or ""
    # split long annotation into paragraphs on double newline or by sentences groups
    ann_parts = [p.strip() for p in re.split(r"\n\n+", annotation) if p.strip()]
    if len(ann_parts) == 1 and len(ann_parts[0]) > 320:
        # soft split into ~2 paras at sentence boundary near middle
        t = ann_parts[0]
        mid = len(t) // 2
        cut = t.find(". ", mid)
        if cut > 0:
            ann_parts = [t[: cut + 1].strip(), t[cut + 2 :].strip()]
    ann_html = "".join(f"<p>{esc(p)}</p>" for p in ann_parts)

    author_note = (
        "Пол Грэк — научпоп о мозге без эзотерики. Уровни доказательности A–D, сначала проверка на себе."
        if len(authors_list) <= 1
        else "Пол Грэк — механизмы и протоколы. Лора Грэк — клинический психолог (МГУ), соавтор: голос кабинета."
    )

    amz_btn = (
        f'<a class="btn btn-outline" href="{esc(amz)}" target="_blank" rel="noopener">Amazon</a>'
        if amz
        else ""
    )
    amz_sticky = (
        f'<a class="btn btn-outline" href="{esc(amz)}" target="_blank" rel="noopener">Amazon</a>'
        if amz
        else '<a class="btn btn-outline" href="#excerpt">Отрывок</a>'
    )
    pay_hint = (
        "Оплата на Литрес или Amazon. Здесь — описание и фрагмент; сайт не принимает платежи."
        if amz
        else "Оплата на Литрес. Здесь — описание и фрагмент; сайт не принимает платежи."
    )
    buy_dd = f'<a href="{esc(book["litres"])}" target="_blank" rel="noopener">Литрес</a>'
    if amz:
        buy_dd += f' · <a href="{esc(amz)}" target="_blank" rel="noopener">Amazon</a>'
    highlights_block = (
        f"<ul class=\"book-highlights\">{highlights_html}</ul>" if highlights_html else ""
    )
    quotes_block = (
        f'<section class="book-section book-quotes" id="quotes"><h2>Из книги</h2>{pull_html}</section>'
        if pull_html
        else ""
    )
    format_store = "на Литрес · Amazon" if amz else "на Литрес"

    body = f"""
    <div class="container book-page">
      <noscript><div class="noscript-banner">Страница книги открыта без JavaScript: описание и отрывок ниже.</div></noscript>
      <nav class="breadcrumb" aria-label="Вы здесь">
        <a href="../index.html">Главная</a>
        <span class="bc-sep" aria-hidden="true">/</span>
        <a href="index.html">Книги</a>
        {f'<span class="bc-sep" aria-hidden="true">/</span><a href="{topic_href}">{esc(topic)}</a>' if topic else ''}
        <span class="bc-sep" aria-hidden="true">/</span>
        <span aria-current="page">{esc(book["title"])}</span>
      </nav>

      <!-- MIF-style product hero: cover + info + buy -->
      <div class="book-product">
        <div class="book-product-cover">
          <img src="{cover}" alt="Обложка: {esc(book["title"])}" width="640" height="960" />
        </div>
        <div class="book-product-info">
          <p class="eyebrow">{esc(series)}</p>
          <h1 class="book-h1">{esc(book["title"])}</h1>
          <p class="book-subtitle">{esc(book.get("subtitle") or "")}</p>
          <p class="book-authors">
            <span class="book-authors-label">Автор</span>
            <a href="../about.html">{esc(authors)}</a>
          </p>

          {highlights_block}

          <div class="book-buy-card">
            <div class="book-buy-format">
              <span class="book-format-pill">Электронная</span>
              <span class="book-format-store">{format_store}</span>
            </div>
            <div class="book-buy-actions">
              <a class="btn btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Купить на Литрес</a>
              {amz_btn}
              <a class="btn btn-outline" href="#excerpt">Читать отрывок</a>
            </div>
            <a class="book-buy-download" href="{excerpt_file}" download>Скачать фрагмент (.txt)</a>
            <p class="book-aside-hint">{pay_hint}</p>
          </div>

          <div class="book-meta-chips">{tags_row}</div>

          <details class="grade-legend-details book-grade-details">
            <summary>Уровни доказательности A–D</summary>
            <p class="grade-legend"><strong>A</strong> — надёжные данные; <strong>B</strong> — хорошие исследования; <strong>C</strong> — ограниченные данные; <strong>D</strong> — наблюдения.</p>
          </details>
        </div>
      </div>

      {series_html}

      <nav class="book-tabs" aria-label="Разделы о книге">
        <a href="#about-book">Описание</a>
        <a href="#for-whom">Для кого</a>
        <a href="#inside">Что внутри</a>
        <a href="#excerpt">Отрывок</a>
        <a href="#author">Об авторе</a>
        <a href="#related">С этой книгой</a>
        <a href="{esc(book["litres"])}" target="_blank" rel="noopener" class="book-tabs-buy">Купить</a>
      </nav>

      <div class="book-body-col">
        <section id="about-book" class="book-section">
          <h2>Описание</h2>
          {ann_html or f"<p>{esc(book.get('promise') or '')}</p>"}
        </section>

        <section id="for-whom" class="book-section">
          <h2>Для кого эта книга</h2>
          <ul class="checklist">{for_whom_items}</ul>
        </section>

        <section id="inside" class="book-section">
          <h2>Что внутри</h2>
          <ul class="checklist">{takeaway_items}</ul>
        </section>

        {quotes_block}

        <section class="excerpt-box book-section" id="excerpt">
          <div class="excerpt-head">
            <strong>Бесплатный отрывок</strong>
            <a class="btn btn-sm btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Читать целиком на Литрес</a>
          </div>
          <p class="muted excerpt-lead">Фрагмент из рукописи. Если стиль зайдёт — полный текст на Литрес.</p>
          <pre id="excerptPreview">{esc(excerpt_text)}</pre>
          <div class="btn-row" style="margin-top:1rem">
            <a class="btn btn-teal" href="{excerpt_file}" download>Скачать отрывок (.txt)</a>
            <a class="btn btn-outline" href="{esc(book["litres"])}" target="_blank" rel="noopener">Купить на Литрес</a>
          </div>
        </section>

        <section id="author" class="book-section">
          <h2>Об авторе</h2>
          <div class="book-author-card">
            <div class="book-author-photo">
              <img src="../assets/pol-grek-portrait.jpg" alt="Пол Грэк" width="88" height="88" />
            </div>
            <div>
              <h3>{esc(authors)}</h3>
              <p>{esc(author_note)}</p>
              <div class="btn-row">
                <a class="btn btn-outline" href="../about.html">Подробнее об авторе</a>
                <a class="btn btn-ghost-link" href="https://t.me/polgrekauthor" target="_blank" rel="noopener">Telegram</a>
              </div>
            </div>
          </div>
        </section>

        <section id="specs" class="book-section book-specs">
          <h2>Выходные данные</h2>
          <dl class="book-specs-list">
            <div><dt>Формат</dt><dd>Электронная книга</dd></div>
            <div><dt>Где купить</dt><dd>{buy_dd}</dd></div>
            <div><dt>Серия</dt><dd>{esc(series)}</dd></div>
            <div><dt>Язык</dt><dd>Русский</dd></div>
            <div><dt>Теги</dt><dd class="book-specs-tags">{tags_row or "—"}</dd></div>
          </dl>
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
              <p class="eyebrow">Подборка</p>
              <h2>С этой книгой читают</h2>
            </div>
            <a class="btn btn-outline" href="{topic_href}">Ещё в каталоге</a>
          </div>
          <div class="books-grid books-grid-related">{related_cards}</div>
        </section>
      </div>
    </div>
    <div class="sticky-buy" aria-label="Быстрые действия">
      <a class="btn btn-primary" href="{esc(book["litres"])}" target="_blank" rel="noopener">Литрес</a>
      {amz_sticky}
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

    # No-JS filter radios + labels (counts from data)
    def noscript_filters_html(books: list, lang: str = "ru") -> str:
        # Prefer filter defs from data if present
        raw_filters = G.get("filters") or []
        # Fallback RU list if functions stripped to id/label only
        if not raw_filters:
            raw_filters = [
                {"id": "all", "label": "Все книги" if lang == "ru" else "All books"},
            ]
        # Ensure we have full RU set even if labels only
        labels_ru = {
            "all": "Все книги",
            "стресс": "Стресс и энергия",
            "когнитивное-здоровье": "Когнитивное здоровье",
            "деньги": "Деньги",
            "гормоны": "Гормоны и пол",
            "выгорание": "Выгорание",
            "лора": "Вместе с Лорой",
            "биохакинг": "Биохакинг",
        }
        labels_en = {
            "all": "All books",
            "stress": "Stress & energy",
            "cognitive-health": "Cognitive health",
            "money": "Money",
            "hormones": "Hormones",
            "burnout": "Burnout",
            "laura": "With Laura",
            "biohacking": "Biohacking",
        }
        # Build ordered filter list from data.js ids when available
        fids = [f.get("id") for f in raw_filters if f.get("id")]
        if "all" not in fids:
            fids = ["all"] + fids
        radios = []
        labels = []
        for fid in fids:
            safe = filter_safe(fid)
            checked = " checked" if fid == "all" else ""
            count = sum(1 for b in books if book_matches_filter_id(b, fid))
            label = None
            for f in raw_filters:
                if f.get("id") == fid:
                    label = f.get("label")
                    break
            if not label:
                label = (labels_en if lang == "en" else labels_ru).get(fid, fid)
            radios.append(
                f'<input type="radio" name="nsf" id="nsf-{safe}" class="nsf-input" value="{esc(fid)}"{checked} />'
            )
            labels.append(
                f'<label for="nsf-{safe}" class="filter-btn nsf-label">'
                f'<span class="filter-label">{esc(label)}</span>'
                f'<span class="filter-count">{count}</span></label>'
            )
        aria = "Topics" if lang == "en" else "Темы"
        return (
            "".join(radios)
            + f'<div class="filters nsf-labels" role="radiogroup" aria-label="{aria}">'
            + "".join(labels)
            + "</div>"
        )

    # Inject noscript filter block into RU catalog
    nsf_ru = noscript_filters_html(G["books"], "ru")
    inject_between(
        SITE / "books" / "index.html",
        '<!--NSF_START-->',
        "<!--NSF_END-->",
        nsf_ru,
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


    # ---- English mirror (native US content) ----
    try:
        GE = load_data("js/data-en.js")
    except Exception as e:
        print("EN data skip", e)
        GE = None
    if GE:
        TAG_EN = {
            "cognitive-health": "cognitive health",
            "biohacking": "biohacking",
            "energy": "energy",
            "stress": "stress",
            "burnout": "burnout",
            "money": "money",
            "hormones": "hormones",
            "laura": "with Laura",
        }
        # temporarily swap TAG_RU for EN card labels
        global TAG_RU
        _tag_backup = dict(TAG_RU)
        TAG_RU.clear()
        TAG_RU.update(TAG_EN)

        en_books = SITE / "en" / "books"
        en_lab = SITE / "en" / "lab"
        en_books.mkdir(parents=True, exist_ok=True)
        en_lab.mkdir(parents=True, exist_ok=True)

        # Lightweight EN book/article pages via existing builders with monkeypatched strings
        import build_static as _self  # noqa — not needed

        def build_book_en(G, book):
            # reuse build_book_page but post-process Russian chrome to English
            html_out = build_book_page(G, book, prefer_inline_excerpt=True)
            # Fix paths: was ../ for books/ — need ../../ for en/books/
            html_out = html_out.replace('href="../', 'href="../../')
            html_out = html_out.replace('src="../', 'src="../../')
            html_out = html_out.replace('href="../../index.html"', 'href="../index.html"')
            html_out = html_out.replace(
                '<html lang="ru">', '<html lang="en">'
            ).replace(
                'data-base=".."',
                'data-base=".." data-lang="en" data-assets="../.."',
            ).replace(
                'js/data.js', 'js/data-en.js'
            )
            # Force EN excerpt download targets
            en_ex = f'../../excerpts/en/{book["slug"]}-excerpt.txt'
            html_out = re.sub(
                r'href="[^"]*excerpts/[^"]+"',
                f'href="{en_ex}"',
                html_out,
            )
            # UI chrome replacements (order matters — longer phrases first)
            reps = [
                ("Страница книги открыта без JavaScript: описание и отрывок ниже.", "Book page loaded without JavaScript: description and excerpt below."),
                ("Оплата на Литрес или Amazon. Здесь — описание и фрагмент; сайт не принимает платежи.", "Checkout on Amazon or LitRes. Description and sample here; this site does not take payment."),
                ("Оплата на Литрес. Здесь — описание и фрагмент; сайт не принимает платежи.", "Checkout on LitRes. Description and sample here; this site does not take payment."),
                ("Фрагмент из рукописи. Если стиль зайдёт — полный текст на Литрес.", "Sample from the manuscript. If the voice clicks — full text on LitRes / Amazon."),
                ("Пол Грэк — научпоп о мозге без эзотерики. Уровни доказательности A–D, сначала проверка на себе.", "Pol Grek writes popular brain science without mysticism. Evidence grades A–D; self-tested first."),
                ("Пол Грэк — механизмы и протоколы. Лора Грэк — клинический психолог (МГУ), соавтор: голос кабинета.", "Pol Grek — mechanisms and protocols. Laura Grek — clinical psychologist (MSU), co-author: clinic voice."),
                ("Книга носит образовательный характер и не заменяет консультацию врача, психотерапевта или финансового советника.", "Educational only — not a substitute for medical, psychological, or financial advice."),
                ("Уровни доказательности A–D", "Evidence grades A–D"),
                ("A — надёжные данные; B — хорошие исследования; C — ограниченные данные; D — наблюдения.", "A — strong data; B — solid studies; C — limited data; D — observation."),
                ("<strong>A</strong> — надёжные данные; <strong>B</strong> — хорошие исследования; <strong>C</strong> — ограниченные данные; <strong>D</strong> — наблюдения.", "<strong>A</strong> — strong data; <strong>B</strong> — solid studies; <strong>C</strong> — limited data; <strong>D</strong> — observation."),
                ("Для кого эта книга", "Who this book is for"),
                ("Для кого", "Who it's for"),
                ("Что внутри", "Inside the book"),
                ("Вы здесь", "You are here"),
                ("и покупка на Литрес", "and buy on LitRes"),
                ("Отрывок и покупка на Литрес", "Excerpt and buy on LitRes"),
                ("Бесплатный отрывок", "Free excerpt"),
                ("Читать целиком на Литрес", "Read full book on LitRes"),
                ("Купить на Литрес", "Buy on LitRes"),
                ("Читать отрывок", "Read excerpt"),
                ("Скачать фрагмент (.txt)", "Download sample (.txt)"),
                ("Скачать отрывок (.txt)", "Download excerpt (.txt)"),
                ("Скачать отрывок", "Download excerpt"),
                ("Все книги серии →", "All series books →"),
                ("С этой книгой читают", "Readers also pick"),
                ("С этой книгой", "Also read"),
                ("Выходные данные", "Product details"),
                ("Об авторе", "About the author"),
                ("Подробнее об авторе", "More about the author"),
                ("Из книги", "From the book"),
                ("Описание", "Description"),
                ("Электронная", "Ebook"),
                ("на Литрес · Amazon", "on LitRes · Amazon"),
                ("на Литрес", "on LitRes"),
                ("Где купить", "Where to buy"),
                ("Формат", "Format"),
                ("Электронная книга", "Ebook"),
                ("Серия", "Series"),
                ("Язык", "Language"),
                ("Русский", "Russian"),
                ("Теги", "Tags"),
                ("Подборка", "Picks"),
                ("Ещё в каталоге", "More in catalog"),
                ("Весь каталог", "Full catalog"),
                ("Каталог", "Catalog"),
                ("← Предыдущая", "← Previous"),
                ("Следующая →", "Next →"),
                ("Соседние книги", "Neighboring books"),
                ("Разделы о книге", "Book sections"),
                ("Купить", "Buy"),
                ("Главная", "Home"),
                ("Книги", "Books"),
                ("Автор", "Author"),
                ("с Лорой Грэк", "with Laura Grek"),
                ("Обложка:", "Cover:"),
                ("Литрес", "LitRes"),
                (" — Пол Грэк", " — Pol Grek"),
                ("Отрывок", "Excerpt"),
                ("Если эта тема откликнулась", "If this topic resonates"),
                ("Быстрые действия", "Quick actions"),
                ("Аннотация и отрывок →", "Blurb & excerpt →"),
                ("Скачать отрывок (.txt)", "Download excerpt (.txt)"),
                ("Excerpt и покупка на LitRes.", "Excerpt and purchase links included."),
                ('aria-label="Вы здесь"', 'aria-label="You are here"'),
                ("Книга носит образовательный характер и не заменяет консультацию врача, психотерапевта или финансового советника.", "This book is educational and does not replace a physician, therapist, or financial advisor."),
                ("с Лорой Грэк", "with Laura Grek"),
                ("Who it's for эта книга", "Who this book is for"),
            ]
            for a, b in reps:
                html_out = html_out.replace(a, b)
            return html_out

        def build_article_en(G, article):
            html_out = build_article_page(G, article)
            html_out = html_out.replace('href="../', 'href="../../')
            html_out = html_out.replace('src="../', 'src="../../')
            html_out = html_out.replace('<html lang="ru">', '<html lang="en">')
            html_out = html_out.replace('data-base=".."', 'data-base=".." data-lang="en"')
            html_out = html_out.replace('js/data.js', 'js/data-en.js')
            reps = [
                ("Статья открыта без JavaScript.", "Article loaded without JavaScript."),
                ("Главная", "Home"),
                ("Лаборатория", "Lab"),
                ("мин · отрывок и книга →", "min · excerpt & book →"),
                (" мин", " min"),
                ("Книга:", "Book:"),
                ("Все материалы", "All posts"),
                ("Ещё из лаборатории", "More from the lab"),
                ("Купить на Литрес", "Buy on LitRes"),
                (" — Лаборатория Пола Грэка", " — Pol Grek Lab"),
                ("Пола Грэка", "Pol Grek"),
                ("Если хотите глубже", "If you want to go deeper"),
                ("К книге", "To the book"),
                ("Вы здесь", "You are here"),
                ("aria-label=\"Вы здесь\"", "aria-label=\"You are here\""),
            ]
            for a, b in reps:
                html_out = html_out.replace(a, b)
            html_out = html_out.replace(
                'data-base=".." data-lang="en"',
                'data-base=".." data-lang="en" data-assets="../.."',
            )
            if 'data-assets' not in html_out:
                html_out = html_out.replace(
                    'data-lang="en"',
                    'data-lang="en" data-assets="../.."',
                )
            return html_out

        for book in GE["books"]:
            (en_books / f"{book['slug']}.html").write_text(build_book_en(GE, book), encoding="utf-8")
            print("en book", book["slug"])
        for article in GE["articles"]:
            (en_lab / f"{article['slug']}.html").write_text(build_article_en(GE, article), encoding="utf-8")
            print("en article", article["slug"])

        TAG_RU.clear()
        TAG_RU.update(_tag_backup)

    print("OK: static pages built")


if __name__ == "__main__":
    main()
