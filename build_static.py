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
    """Load POL_GREK; side-load lab articles from data-articles*.js when split out."""
    articles_file = (
        "js/data-articles-en.js" if "data-en" in data_file else "js/data-articles.js"
    )
    node = f"""
const fs=require('fs');const vm=require('vm');
const c={{window:{{}}}};vm.createContext(c);
vm.runInContext(fs.readFileSync({data_file!r},'utf8'),c);
try {{
  vm.runInContext(fs.readFileSync({articles_file!r},'utf8'),c);
}} catch (e) {{ /* optional side file */ }}
console.log(JSON.stringify(c.window.POL_GREK));
"""
    return json.loads(subprocess.check_output(["node", "-e", node], cwd=SITE, text=True))


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def cover_path(book: dict, prefix: str = "") -> str:
    return f"{prefix}../assets/covers/{book.get('coverFile', book['slug'] + '.webp')}"


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


def affiliate_cfg(G: dict | None = None) -> dict:
    if G is None:
        return {}
    return G.get("affiliate") or {}


def _litres_base(url: str) -> str:
    """Strip query string; AdvCake params are re-applied via template."""
    u = (url or "").strip()
    if "?" in u:
        u = u.split("?", 1)[0]
    return u


def _affiliate_sub1(label: str) -> str:
    """Normalize Sub1: keep slug readable, never inject &/= into query."""
    import re

    s = (label or "").strip()
    # allow only safe token chars (hyphen/underscore ok for AdvCake reports)
    s = re.sub(r"[^a-zA-Z0-9._-]+", "_", s)
    return s[:80]


def apply_affiliate_template(tpl: str, direct: str, sub1: str = "") -> str:
    """Apply AdvCake template or build query via urlencode (preferred).

    Prefer structured params when template is the default AdvCake form —
    avoids fragile string replace and keeps sub1=stress-i-mozg intact.
    """
    from urllib.parse import quote, urlencode

    base = _litres_base(direct)
    if not base:
        return base
    label = _affiliate_sub1(sub1)

    # Structured build (default path): never split slug on hyphens
    # Matches AdvCake «ручной» generator: litres URL + utm_* + sub1 + erid
    if not tpl or "{url}" in tpl and "utm_source=advcake" in tpl:
        # pull ids from template when present
        content = "f71f3ad5"
        erid = "2VfnxyNkZrY"
        keyword = "polgrek / site"
        if tpl:
            import re

            m = re.search(r"utm_content=([^&{]+)", tpl)
            if m:
                content = m.group(1)
            m = re.search(r"erid=([^&{]+)", tpl)
            if m:
                erid = m.group(1)
            m = re.search(r"keyword=([^&{]+)", tpl)
            if m:
                from urllib.parse import unquote_plus

                keyword = unquote_plus(m.group(1))
        q = urlencode(
            [
                ("utm_source", "advcake"),
                ("utm_medium", "cpa"),
                ("utm_campaign", "affiliate"),
                ("utm_content", content),
                ("advcake_params", ""),
                ("utm_term", ""),
                ("sub1", label),
                ("keyword", keyword),
                ("erid", erid),
                ("advcake_method", "1"),
                ("m", "1"),
            ],
            doseq=False,
        )
        return f"{base}?{q}"

    # Custom template fallback
    out = tpl
    if "{url_enc}" in out:
        out = out.replace("{url_enc}", quote(base, safe=""))
    if "{url}" in out:
        out = out.replace("{url}", base)
    if "{sub1}" in out:
        # encode so hyphenated slugs never become extra query keys
        out = out.replace("{sub1}", quote(label, safe="-_.~"))
    return out


def litres_direct_url(book: dict | str) -> str:
    """Clean LitRes product URL (no tracking query). Prefer buyUrl → litres → buy."""
    if isinstance(book, str):
        return _litres_base(book)
    return _litres_base(
        book.get("buyUrl") or book.get("litres") or book.get("buy") or ""
    )


def litres_buy_url(G: dict | None, book: dict | str, slug: str | None = None) -> str:
    """Partner deep link (AdvCake) when affiliate.enabled, else plain LitRes URL.

    affiliate.template — e.g. '{url}?utm_source=advcake&...&sub1={sub1}'
    affiliate.bySlug   — map slug → full partner URL
    """
    if isinstance(book, str):
        direct = _litres_base(book)
        s = slug or ""
    else:
        direct = litres_direct_url(book)
        s = slug or (book.get("slug") or "")

    aff = affiliate_cfg(G)
    if not aff.get("enabled"):
        return direct

    by_slug = aff.get("bySlug") or {}
    if s and by_slug.get(s):
        return str(by_slug[s]).strip()

    tpl = (aff.get("template") or "").strip()
    if aff.get("enabled") and direct:
        return apply_affiliate_template(tpl, direct, s)
    return direct


def litres_author_url(G: dict) -> str:
    aff = affiliate_cfg(G)
    links = G.get("links") or {}
    direct = _litres_base(links.get("litresAuthor") or "https://www.litres.ru/author/pol-grek/")
    if aff.get("enabled") and (aff.get("authorUrl") or "").strip():
        return str(aff["authorUrl"]).strip()
    tpl = (aff.get("template") or "").strip()
    if aff.get("enabled") and (tpl or True):
        return apply_affiliate_template(tpl, direct, str(aff.get("authorSub1") or "author"))
    return direct


def litres_rel(G: dict | None = None) -> str:
    if affiliate_cfg(G).get("enabled"):
        return "noopener sponsored"
    return "noopener"


def store_actions_html(
    book: dict,
    href: str,
    compact: bool = True,
    G: dict | None = None,
    *,
    lang: str = "ru",
) -> str:
    """Catalog CTA under card: clean LitRes Buy (adblock-safe) + «О книге» / Amazon.

    Partner query is in data-aff; main.js applies it on click so filters that
    strip advcake/utm links do not remove the visible «Купить» button.
    """
    amz = amazon_product_url(book)
    amz_link = (
        f'<a class="book-amazon-link" href="{esc(amz)}" target="_blank" rel="noopener" data-track="amazon">Amazon</a>'
        if amz
        else ""
    )
    clean = litres_direct_url(book)
    aff = litres_buy_url(G, book) or clean
    buy_href = clean or aff
    data_aff = f' data-aff="{esc(aff)}"' if aff and aff != clean else ""
    rel = litres_rel(G)
    buy_label = "Buy on LitRes" if lang == "en" else "Купить на Литрес"
    more_label = "About the book" if lang == "en" else "О книге"
    mark = AFFILIATE_MARK_EN if lang == "en" else AFFILIATE_MARK_RU
    mark = mark.replace('class="affiliate-mark"', 'class="affiliate-mark affiliate-mark--card"')
    if not buy_href:
        return f"""<div class="book-card-cta">
      <div class="book-card-links">
        <a class="book-more" href="{href}">{more_label}</a>
        {amz_link}
      </div>
    </div>"""
    return f"""<div class="book-card-cta">
      <a class="btn btn-primary book-card-buy" href="{esc(buy_href)}"{data_aff} target="_blank" rel="{rel}" data-track="litres" data-book="{esc(book.get('slug') or '')}">{buy_label}</a>
      <div class="book-card-links">
        <a class="book-more" href="{href}">{more_label}</a>
        {amz_link}
      </div>
      {mark}
    </div>"""


def book_card_meta(book: dict, lang: str = "ru") -> str:
    """One soft line under promise: format + primary topic (MIF meta under title)."""
    is_en = lang == "en"
    tag_map = TAG_RU  # may be swapped to EN labels when building EN pages
    topic = ""
    for t in book.get("tags") or []:
        if t in ("лора", "laura"):
            continue
        topic = tag_map.get(t, t)
        break
    bits = ["Ebook" if is_en else "Электронная"]
    if topic:
        bits.append(topic)
    if len(book.get("authors") or []) > 1:
        bits.append("with Laura" if is_en else "с Лорой")
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


def book_card(
    book: dict,
    prefix: str = "",
    books_dir: bool = True,
    G: dict | None = None,
    *,
    lang: str = "ru",
) -> str:
    """Cover-first catalog tile: cover → title → pitch → affiliate Buy under card."""
    slug = book["slug"]
    href = book_url(slug, "") if books_dir else f"books/{slug}.html"
    if lang == "en" and books_dir:
        cover = f"../../assets/covers/{book.get('coverFile', slug + '.webp')}"
    elif books_dir:
        cover = f"../assets/covers/{book.get('coverFile', slug + '.webp')}"
    elif lang == "en":
        href = f"books/{slug}.html"
        cover = f"../assets/covers/{book.get('coverFile', slug + '.webp')}"
    else:
        href = f"books/{slug}.html"
        cover = f"assets/covers/{book.get('coverFile', slug + '.webp')}"

    badges = []
    if book.get("flagship"):
        flag = "Start here" if lang == "en" else "С чего начать"
        badges.append(f'<span class="book-badge book-badge-key">{flag}</span>')
    if len(book.get("authors") or []) > 1:
        co = "with Laura" if lang == "en" else "с Лорой"
        badges.append(f'<span class="book-badge book-badge-co">{co}</span>')
    badge_html = f'<div class="book-cover-badges">{"".join(badges)}</div>' if badges else ""
    show = book_data_show(book)
    cover_alt = ("Cover: " if lang == "en" else "Обложка: ") + book["title"]

    return f"""
<article class="book-card book-card--tile{' is-flagship' if book.get('flagship') else ''}" data-show="{esc(show)}">
  <a class="book-cover has-image clean" href="{href}" aria-label="{esc(book['title'])}">
    <img src="{cover}" alt="{esc(cover_alt)}" loading="lazy" width="600" height="900" />
    {badge_html}
  </a>
  <div class="book-body">
    <h3 class="book-title"><a href="{href}">{esc(book['title'])}</a></h3>
    {f'<p class="book-card-chip">{esc(str((book.get("forWhom") or [""])[0])[:90])}</p>' if (book.get("forWhom") or [None])[0] else ""}
    <p class="book-card-promise">{esc(book['promise'])}</p>
    <p class="book-card-meta">{esc(book_card_meta(book, lang=lang))}</p>
  </div>
  {store_actions_html(book, href, compact=True, G=G, lang=lang)}
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


SITE_ORIGIN = "https://polgrek.site"
OG_IMAGE = f"{SITE_ORIGIN}/assets/og-image.jpg"
CSS_VER = "20260718audit12"
AFFILIATE_ERID = "2VfnxyNkZrY"
AFFILIATE_MARK_RU = (
    f'<p class="affiliate-mark">Реклама · erid: {AFFILIATE_ERID} · партнёрская ссылка Литрес</p>'
)
AFFILIATE_MARK_EN = (
    f'<p class="affiliate-mark">Ad · erid: {AFFILIATE_ERID} · LitRes partner link</p>'
)


def abs_url(path: str) -> str:
    path = path or "/"
    if path.startswith("http"):
        return path
    if not path.startswith("/"):
        path = "/" + path
    return SITE_ORIGIN + path


def clip_title(title: str, max_len: int = 60) -> str:
    title = (title or "").strip()
    if len(title) <= max_len:
        return title
    return title[: max_len - 1].rstrip(" .,—–-") + "…"


def shell(
    title: str,
    description: str,
    body: str,
    page: str,
    base: str,
    path_prefix: str,
    lang: str = "ru",
    data_js: str = "js/data.js",
    *,
    canonical: str = "",
    og_type: str = "article",
    og_image: str = "",
    hreflang_ru: str = "",
    hreflang_en: str = "",
    json_ld: list | None = None,
    extra_head: str = "",
) -> str:
    # path_prefix: relative to page for assets (e.g. '../../' for en/books)
    css = f"{path_prefix}css/styles.css?v={CSS_VER}"
    fav = f"{path_prefix}assets/favicon.svg"
    fav2 = f"{path_prefix}assets/favicon.png"
    data_src = f"{path_prefix}{data_js}"
    articles_script = ""
    if page in ("article", "lab"):
        art_name = "data-articles-en.js" if lang == "en" else "data-articles.js"
        articles_script = f'  <script src="{path_prefix}js/{art_name}"></script>\n'
    lang_attr = "en" if lang == "en" else "ru"
    data_lang = ' data-lang="en"' if lang == "en" else ""
    data_assets = ' data-assets="../.."' if "/en/" in (canonical or "") and page in ("book", "article") else (
        ' data-assets=".."' if lang == "en" and page in ("book", "article") else ""
    )
    # en books use path_prefix ../../ and data-assets set by post-process; keep simple here
    if lang == "en" and path_prefix.count("../") >= 2:
        data_assets = ' data-assets="../.."'
    elif lang == "en" and path_prefix.startswith(".."):
        data_assets = ' data-assets=".."'

    desc = (description or "")[:160]
    og_img = og_image or OG_IMAGE
    can = canonical or ""
    hreflang_block = ""
    if hreflang_ru and hreflang_en:
        hreflang_block = f"""
  <link rel="alternate" hreflang="ru" href="{esc(hreflang_ru)}" />
  <link rel="alternate" hreflang="en" href="{esc(hreflang_en)}" />
  <link rel="alternate" hreflang="x-default" href="{esc(hreflang_ru)}" />"""
    canonical_tag = f'\n  <link rel="canonical" href="{esc(can)}" />' if can else ""
    og_url_tag = f'\n  <meta property="og:url" content="{esc(can)}" />' if can else ""

    ld_scripts = ""
    for block in json_ld or []:
        import json as _json

        ld_scripts += (
            '\n  <script type="application/ld+json">\n'
            + _json.dumps(block, ensure_ascii=False, indent=2)
            + "\n  </script>"
        )

    return f"""<!DOCTYPE html>
<html lang="{lang_attr}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="{'Pol Grek' if lang == 'en' else 'Пол Грэк'}" />
  <meta name="theme-color" content="#0B1F33" />
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}" />{canonical_tag}
  <meta property="og:site_name" content="{'Pol Grek' if lang == 'en' else 'Пол Грэк'}" />
  <meta property="og:title" content="{esc(title)}" />
  <meta property="og:description" content="{esc(desc)}" />
  <meta property="og:type" content="{esc(og_type)}" />{og_url_tag}
  <meta property="og:image" content="{esc(og_img)}" />
  <meta property="og:image:alt" content="{esc(title)}" />
  <meta property="og:locale" content="{'en_US' if lang == 'en' else 'ru_RU'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{esc(title)}" />
  <meta name="twitter:description" content="{esc(desc)}" />
  <meta name="twitter:image" content="{esc(og_img)}" />{hreflang_block}
  <link rel="dns-prefetch" href="https://www.litres.ru" />
  <link rel="icon" href="{fav}" type="image/svg+xml" />
  <link rel="icon" href="{fav2}" type="image/png" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="{SITE_ORIGIN}/sitemap.xml" />
  <link rel="stylesheet" href="{css}" />{ld_scripts}
{extra_head}</head>
<body data-page="{page}" data-base="{base}"{data_lang}{data_assets}>
  <a class="skip-link" href="#main-content">{('Skip to content' if lang == 'en' else 'К содержанию')}</a>
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
{articles_script}  <script src="{path_prefix}js/main.js?v={CSS_VER}"></script>
</body>
</html>
"""


def excerpt_to_paragraphs(text: str, max_chars: int = 2400) -> list[str]:
    """Split manuscript excerpt into readable paragraphs (for prose, not <pre>)."""
    text = (text or "").strip()
    if not text:
        return []
    # normalize
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"^[\s\S]*?— (?:Отрывок|Excerpt) —\s*", "", text, flags=re.I)
    text = re.sub(r"\n—\n[\s\S]*$", "", text).strip()
    if len(text) > max_chars:
        text = text[:max_chars].rsplit(" ", 1)[0] + "…"
    # prefer blank-line paragraphs; else pack single newlines into blocks
    parts = [p.strip() for p in re.split(r"\n\s*\n+", text) if p.strip()]
    if len(parts) <= 1:
        lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
        parts = []
        buf: list[str] = []
        for ln in lines:
            buf.append(ln)
            # ~2–3 lines per visual paragraph for mobile
            if len(" ".join(buf)) > 220:
                parts.append(" ".join(buf))
                buf = []
        if buf:
            parts.append(" ".join(buf))
    else:
        # collapse internal newlines inside a para
        parts = [re.sub(r"\s*\n\s*", " ", p) for p in parts]
    return parts


def excerpt_prose_html(text: str, *, lang: str = "ru", preview_n: int = 4) -> str:
    """Readable excerpt: first paragraphs visible, rest in <details> for mobile comfort."""
    paras = excerpt_to_paragraphs(text)
    if not paras:
        empty = "Excerpt will appear here." if lang == "en" else "Отрывок появится здесь."
        return f'<div class="excerpt-prose" id="excerptPreview"><p class="muted">{empty}</p></div>'
    head = paras[:preview_n]
    rest = paras[preview_n:]
    head_html = "".join(f"<p>{esc(p)}</p>" for p in head)
    out = f'<div class="excerpt-prose" id="excerptPreview">{head_html}</div>'
    if rest:
        rest_html = "".join(f"<p>{esc(p)}</p>" for p in rest)
        more = "Show more of the excerpt" if lang == "en" else "Показать ещё текст отрывка"
        out += (
            f'<details class="excerpt-more">'
            f"<summary>{more}</summary>"
            f'<div class="excerpt-prose excerpt-prose-rest" id="excerptPreviewMore">{rest_html}</div>'
            f"</details>"
        )
    return f'<div class="excerpt-reader">{out}</div>'


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
    cover = f"../assets/covers/{book.get('coverFile', book['slug'] + '.webp')}"
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
            c = f"../assets/covers/{b.get('coverFile', b['slug'] + '.webp')}"
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

    # Load excerpt file when present (RU .txt or EN excerpts/en/*)
    excerpt_text = book.get("excerpt") or ""
    excerpt_lang = "en" if prefer_inline_excerpt else "ru"
    ex_candidates = []
    if prefer_inline_excerpt:
        ef = book.get("excerptFile") or f"en/{book['slug']}-excerpt.txt"
        ex_candidates.append(SITE / "excerpts" / ef)
        ex_candidates.append(SITE / "excerpts" / "en" / f"{book['slug']}-excerpt.txt")
    else:
        ex_candidates.append(
            SITE / "excerpts" / book.get("excerptFile", f"{book['slug']}-otryvok.txt")
        )
    for ex_path in ex_candidates:
        if ex_path.exists():
            raw = ex_path.read_text(encoding="utf-8", errors="ignore")
            raw = re.sub(r"^[\s\S]*?— (?:Отрывок|Excerpt) —\s*", "", raw, flags=re.I)
            raw = re.sub(r"\n—\n[\s\S]*$", "", raw).strip()
            if raw:
                excerpt_text = raw
                if "en/" in str(ex_path).replace("\\", "/") or prefer_inline_excerpt:
                    excerpt_lang = "en"
                break
    excerpt_html = excerpt_prose_html(excerpt_text, lang=excerpt_lang, preview_n=4)

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
    related_cards = "".join(book_card(b, books_dir=True, G=G) for b in related)

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
    buy_url = litres_buy_url(G, book)
    buy_rel = litres_rel(G)
    # Specs «Где купить»: clean LitRes URL (no AdvCake query) so adblockers
    # don't strip the whole link and leave only Amazon visible.
    litres_clean = (
        (book.get("buyUrl") or book.get("litres") or buy_url or "").split("?")[0].strip()
    )
    buy_parts: list[str] = []
    if litres_clean:
        buy_parts.append(
            f'<a href="{esc(litres_clean)}" target="_blank" rel="noopener">Литрес</a>'
        )
    if amz:
        buy_parts.append(
            f'<a href="{esc(amz)}" target="_blank" rel="noopener">Amazon</a>'
        )
    buy_dd = " · ".join(buy_parts) if buy_parts else "—"
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
            <p class="book-buy-lead">Сначала бесплатная глава — потом покупка на Литрес.</p>
            <div class="book-buy-actions">
              <a class="btn btn-primary btn-cta-lg" href="{excerpt_file}" download>Скачать отрывок (.txt)</a>
              <a class="btn btn-outline" href="#excerpt">Читать на странице</a>
            </div>
            <div class="book-buy-actions book-buy-actions--store">
              <a class="btn btn-outline" href="{esc(buy_url)}" target="_blank" rel="{buy_rel}">Купить на Литрес</a>
              {amz_btn}
            </div>
            {AFFILIATE_MARK_RU}
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
        <a href="{esc(buy_url)}" target="_blank" rel="{buy_rel}" class="book-tabs-buy">Купить</a>
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
            <a class="btn btn-sm btn-primary" href="{excerpt_file}" download>Скачать .txt</a>
          </div>
          <p class="muted excerpt-lead">Фрагмент из рукописи. Если стиль зайдёт — полный текст на Литрес.</p>
          {excerpt_html}
          <div class="btn-row excerpt-cta-row">
            <a class="btn btn-primary btn-cta-lg" href="{excerpt_file}" download>Скачать отрывок (.txt)</a>
            <a class="btn btn-outline" href="{esc(buy_url)}" target="_blank" rel="{buy_rel}">Купить на Литрес</a>
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
                <a class="btn btn-ghost-link" href="https://t.me/+KGQgs6MVHHYwZGVi" target="_blank" rel="noopener">Telegram</a>
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
      <a class="btn btn-primary" href="#excerpt">Отрывок</a>
      <a class="btn btn-outline" href="{esc(buy_url)}" target="_blank" rel="{buy_rel}">Литрес</a>
      {amz_sticky}
      <a class="btn btn-ghost-link" href="index.html">Каталог</a>
    </div>
"""
    title = clip_title(f"{book['title']} — Пол Грэк", 60)
    desc = f"{book['title']}: {book.get('subtitle') or book.get('promise') or ''}. Отрывок бесплатно, покупка на Литрес."
    can = abs_url(f"/books/{book['slug']}.html")
    can_en = abs_url(f"/en/books/{book['slug']}.html")
    cover_abs = abs_url(f"/assets/covers/{book.get('coverFile', book['slug'] + '.webp')}")
    authors_ld = book.get("authors") or ["Пол Грэк"]
    book_ld = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": book["title"],
        "description": (book.get("annotation") or book.get("promise") or desc)[:300],
        "url": can,
        "image": cover_abs,
        "inLanguage": "ru",
        "author": [{"@type": "Person", "name": a} for a in authors_ld],
        "bookFormat": "https://schema.org/EBook",
        "workExample": {
            "@type": "Book",
            "bookFormat": "https://schema.org/EBook",
            "url": book.get("litres") or can,
            "potentialAction": {
                "@type": "ReadAction",
                "target": book.get("litres") or can,
            },
        },
    }
    if book.get("litres"):
        book_ld["sameAs"] = [book["litres"]]
    if amz := amazon_product_url(book):
        book_ld.setdefault("sameAs", []).append(amz)
    crumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Главная", "item": abs_url("/")},
            {"@type": "ListItem", "position": 2, "name": "Книги", "item": abs_url("/books/index.html")},
            {"@type": "ListItem", "position": 3, "name": book["title"], "item": can},
        ],
    }
    return shell(
        title,
        desc[:160],
        body,
        "book",
        "..",
        "../",
        canonical=can,
        og_type="book",
        og_image=cover_abs,
        hreflang_ru=can,
        hreflang_en=can_en,
        json_ld=[book_ld, crumbs],
    )


def build_article_page(G: dict, article: dict) -> str:
    book = next((b for b in G["books"] if b["slug"] == article.get("relatedBook")), None)
    others = [a for a in G["articles"] if a["slug"] != article["slug"]][:3]
    body_html = article_body_html(article)
    book_side = ""
    if book:
        book_buy = litres_buy_url(G, book)
        book_rel = litres_rel(G)
        book_side = f"""
        <div class="side-card">
          <p class="eyebrow" style="margin-bottom:0.5rem">Если хотите глубже</p>
          <h3>{esc(book["title"])}</h3>
          <p>{esc(book["promise"])}</p>
          <a class="btn btn-primary" href="../books/{book["slug"]}.html">К книге</a>
          <a class="btn btn-outline" href="{esc(book_buy)}" target="_blank" rel="{book_rel}">Купить на Литрес</a>
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
    raw_title = article["title"]
    title = clip_title(f"{raw_title} — Пол Грэк", 60)
    desc = (article.get("hook") or article["title"])[:160]
    can = abs_url(f"/lab/{article['slug']}.html")
    can_en = abs_url(f"/en/lab/{article['slug']}.html")
    article_ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": clip_title(raw_title, 110),
        "description": desc,
        "url": can,
        "image": [OG_IMAGE],
        "inLanguage": "ru",
        "author": {"@type": "Person", "name": "Пол Грэк", "url": abs_url("/about.html")},
        "publisher": {
            "@type": "Person",
            "name": "Пол Грэк",
            "url": abs_url("/"),
            "image": abs_url("/assets/pol-grek-portrait.jpg"),
        },
        "mainEntityOfPage": {"@type": "WebPage", "@id": can},
    }
    if book:
        article_ld["isPartOf"] = {
            "@type": "Book",
            "name": book["title"],
            "url": abs_url(f"/books/{book['slug']}.html"),
        }
    crumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Главная", "item": abs_url("/")},
            {"@type": "ListItem", "position": 2, "name": "Лаборатория", "item": abs_url("/lab/index.html")},
            {"@type": "ListItem", "position": 3, "name": clip_title(raw_title, 80), "item": can},
        ],
    }
    return shell(
        title,
        desc,
        body,
        "article",
        "..",
        "../",
        canonical=can,
        og_type="article",
        og_image=OG_IMAGE,
        hreflang_ru=can,
        hreflang_en=can_en,
        json_ld=[article_ld, crumbs],
    )


def faq_details_html(faq: list, *, home_max: int = 4) -> str:
    """No-JS FAQ block from POL_GREK.faq (single source)."""
    items = []
    for item in (faq or [])[:home_max]:
        q = esc(item.get("q") or item.get("question") or "")
        a = esc(item.get("a") or item.get("answer") or "")
        if not q or not a:
            continue
        items.append(
            f'<details class="faq-item"><summary>{q}</summary><p>{a}</p></details>'
        )
    return "".join(items)


def faq_json_ld(faq: list, *, home_max: int = 4) -> dict:
    entities = []
    for item in (faq or [])[:home_max]:
        q = (item.get("q") or item.get("question") or "").strip()
        a = (item.get("a") or item.get("answer") or "").strip()
        if not q or not a:
            continue
        entities.append(
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a},
            }
        )
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": entities,
    }


def timeline_html(autobio: list, *, max_items: int = 5) -> str:
    parts = []
    for item in (autobio or [])[:max_items]:
        title = esc(item.get("checkpoint") or "")
        text = esc(item.get("text") or "")
        if not title:
            continue
        parts.append(
            f'<div class="timeline-item"><strong>{title}</strong><p>{text}</p></div>'
        )
    return "".join(parts)


def sync_faq_and_timeline(G: dict, GE: dict | None) -> None:
    """Write partials + inject home FAQ/schema and about timeline from data."""
    # RU partials
    faq_ru = faq_details_html(G.get("faq") or [])
    (SITE / "partials" / "faq.html").write_text(faq_ru, encoding="utf-8")
    auto = ((G.get("author") or {}).get("autobiography") or [])[:5]
    (SITE / "partials" / "timeline.html").write_text(
        timeline_html(auto), encoding="utf-8"
    )

    def inject_faq_list(path: Path, html_block: str) -> None:
        if not path.exists():
            return
        raw = path.read_text(encoding="utf-8")
        start = raw.find('class="faq-list"')
        if start < 0:
            return
        # find opening >
        gt = raw.find(">", start)
        if gt < 0:
            return
        # find matching close for this div — first </div> after content that closes faq-list
        # use marker comments if present, else replace between <div class="faq-list"> and next section-level close
        open_tag_end = gt + 1
        # naive: find </div>\n      </div>\n    </section> after faq-list
        close = raw.find("</div>", open_tag_end)
        # may be nested details only — first </div> after items closes faq-list
        # walk depth
        i = open_tag_end
        depth = 1
        while i < len(raw) and depth:
            nxt_open = raw.find("<div", i)
            nxt_close = raw.find("</div>", i)
            if nxt_close < 0:
                return
            if nxt_open >= 0 and nxt_open < nxt_close:
                depth += 1
                i = nxt_open + 4
            else:
                depth -= 1
                if depth == 0:
                    close = nxt_close
                    break
                i = nxt_close + 6
        new = raw[:open_tag_end] + html_block + raw[close:]
        path.write_text(new, encoding="utf-8")
        print("inject FAQ", path)

    def inject_faq_schema(path: Path, block: dict) -> None:
        if not path.exists():
            return
        raw = path.read_text(encoding="utf-8")
        ld = (
            '\n  <script type="application/ld+json">\n'
            + json.dumps(block, ensure_ascii=False, indent=2)
            + "\n  </script>"
        )
        # replace existing FAQPage script or insert before </head>
        m = re.search(
            r'\s*<script type="application/ld\+json">\s*\{[^}]*"@type":\s*"FAQPage"[\s\S]*?</script>',
            raw,
        )
        if m:
            raw = raw[: m.start()] + ld + raw[m.end() :]
        else:
            raw = raw.replace("</head>", ld + "\n</head>", 1)
        path.write_text(raw, encoding="utf-8")
        print("inject FAQ schema", path)

    inject_faq_list(SITE / "index.html", faq_ru)
    inject_faq_schema(SITE / "index.html", faq_json_ld(G.get("faq") or []))

    if GE:
        faq_en = faq_details_html(GE.get("faq") or [])
        (SITE / "partials" / "faq-en.html").write_text(faq_en, encoding="utf-8")
        inject_faq_list(SITE / "en" / "index.html", faq_en)
        inject_faq_schema(SITE / "en" / "index.html", faq_json_ld(GE.get("faq") or []))
        auto_en = ((GE.get("author") or {}).get("autobiography") or [])[:5]
        (SITE / "partials" / "timeline-en.html").write_text(
            timeline_html(auto_en), encoding="utf-8"
        )

    # About timeline: inject if #autoTimeline empty or missing block
    def ensure_about_timeline(path: Path, html_block: str, heading: str) -> None:
        if not path.exists():
            return
        raw = path.read_text(encoding="utf-8")
        if 'id="autoTimeline"' in raw:
            # replace inner
            m = re.search(
                r'(<div[^>]*id="autoTimeline"[^>]*>)([\s\S]*?)(</div>)', raw
            )
            if m:
                raw = raw[: m.start(1)] + m.group(1) + html_block + m.group(3) + raw[m.end(3) :]
                path.write_text(raw, encoding="utf-8")
                print("update timeline", path)
            return
        # insert before first Laura section or before books/verify
        marker = 'id="laura"'
        block = (
            f'\n        <h2 id="path">{heading}</h2>\n'
            f'        <div class="timeline" id="autoTimeline">{html_block}</div>\n'
        )
        if marker in raw:
            # insert before <h2 id="laura">
            raw = re.sub(
                r'(\s*<h2 id="laura")',
                block + r"\1",
                raw,
                count=1,
            )
        else:
            raw = raw.replace(
                "</div>\n    </section>\n\n    <section>",
                block + "</div>\n    </section>\n\n    <section>",
                1,
            )
        path.write_text(raw, encoding="utf-8")
        print("insert timeline", path)

    ensure_about_timeline(
        SITE / "about.html", timeline_html(auto), "Путь — коротко"
    )
    if GE:
        auto_en = ((GE.get("author") or {}).get("autobiography") or [])[:5]
        ensure_about_timeline(
            SITE / "en" / "about.html",
            timeline_html(auto_en),
            "Path — short",
        )


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
        "".join(
            book_card(b, books_dir=False, G=G)
            .replace('href="books/', 'href="books/')
            .replace('src="assets/', 'src="assets/')
            for b in flagships
        ),
        encoding="utf-8",
    )
    # Fix flagships for index (from root)
    def card_root(book):
        return book_card(book, books_dir=False, G=G)

    def card_books_dir(book):
        return book_card(book, books_dir=True, G=G)

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
  <script src="../js/data-articles.js"></script>
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
            slug = book["slug"]
            en_desc = (
                f"{book['title']}: {book.get('subtitle') or book.get('promise') or ''}. "
                "Free excerpt; buy on LitRes or Amazon."
            )[:160]
            html_out = re.sub(
                r'<meta name="description" content="[^"]*"\s*/?>',
                f'<meta name="description" content="{esc(en_desc)}" />',
                html_out,
                count=1,
            )
            html_out = re.sub(
                r'property="og:description" content="[^"]*"',
                f'property="og:description" content="{esc(en_desc)}"',
                html_out,
                count=1,
            )
            html_out = re.sub(
                r'name="twitter:description" content="[^"]*"',
                f'name="twitter:description" content="{esc(en_desc)}"',
                html_out,
                count=1,
            )
            # SEO: EN canonical/og:url + schema language (keep hreflang ru on /books/)
            html_out = re.sub(
                rf'(<link rel="canonical" href=")https://polgrek\.site/books/{re.escape(slug)}\.html(")',
                rf"\1https://polgrek.site/en/books/{slug}.html\2",
                html_out,
            )
            html_out = re.sub(
                rf'(property="og:url" content=")https://polgrek\.site/books/{re.escape(slug)}\.html(")',
                rf"\1https://polgrek.site/en/books/{slug}.html\2",
                html_out,
            )
            html_out = html_out.replace(
                f'"url": "https://polgrek.site/books/{slug}.html"',
                f'"url": "https://polgrek.site/en/books/{slug}.html"',
            )
            html_out = html_out.replace(
                f'"item": "https://polgrek.site/books/{slug}.html"',
                f'"item": "https://polgrek.site/en/books/{slug}.html"',
            )
            html_out = html_out.replace('"inLanguage": "ru"', '"inLanguage": "en"')
            html_out = html_out.replace('content="ru_RU"', 'content="en_US"')
            html_out = html_out.replace('"name": "Главная"', '"name": "Home"')
            html_out = html_out.replace('"name": "Книги"', '"name": "Books"')
            html_out = html_out.replace(
                '"item": "https://polgrek.site/"',
                '"item": "https://polgrek.site/en/"',
            )
            html_out = html_out.replace(
                '"item": "https://polgrek.site/books/index.html"',
                '"item": "https://polgrek.site/en/books/index.html"',
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
                ("Сначала бесплатная глава — потом покупка на Литрес.", "Start with a free chapter — then buy on LitRes / Amazon."),
                ("Читать на странице", "Read on this page"),
                ("Читать целиком на Литрес", "Read full book on LitRes"),
                ("Купить на Литрес", "Buy on LitRes"),
                ("Читать отрывок", "Read excerpt"),
                ("Скачать .txt", "Download .txt"),
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
                ("Лаборатория", "Lab"),
                ("Книги", "Books"),
                ("Автор", "Author"),
                ("с Лорой", "with Laura"),
                ("с Лорой Грэк", "with Laura Grek"),
                ("Обложка:", "Cover:"),
                ("О книге", "About the book"),
                ("Реклама · erid:", "Ad · erid:"),
                ("партнёрская ссылка Литрес (AdvCake)", "LitRes partner link (AdvCake)"),
                ("Литрес", "LitRes"),
                (" — Пол Грэк", " — Pol Grek"),
                ("Отрывок", "Excerpt"),
                ('content="Пол Грэк"', 'content="Pol Grek"'),
                ("og:site_name\" content=\"Пол Грэк\"", "og:site_name\" content=\"Pol Grek\""),
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
            html_out = html_out.replace('data-base=".."', 'data-base=".." data-lang="en" data-assets="../.."')
            html_out = html_out.replace('js/data-articles.js', 'js/data-articles-en.js')
            html_out = html_out.replace('js/data.js', 'js/data-en.js')
            # Shorter EN document title
            en_title = clip_title(f"{article['title']} | Pol Grek", 60)
            html_out = re.sub(
                r"<title>[^<]*</title>",
                f"<title>{esc(en_title)}</title>",
                html_out,
                count=1,
            )
            html_out = re.sub(
                r'property="og:title" content="[^"]*"',
                f'property="og:title" content="{esc(en_title)}"',
                html_out,
                count=1,
            )
            html_out = re.sub(
                r'name="twitter:title" content="[^"]*"',
                f'name="twitter:title" content="{esc(en_title)}"',
                html_out,
                count=1,
            )
            slug = article["slug"]
            html_out = re.sub(
                rf'(<link rel="canonical" href=")https://polgrek\.site/lab/{re.escape(slug)}\.html(")',
                rf"\1https://polgrek.site/en/lab/{slug}.html\2",
                html_out,
            )
            html_out = re.sub(
                rf'(property="og:url" content=")https://polgrek\.site/lab/{re.escape(slug)}\.html(")',
                rf"\1https://polgrek.site/en/lab/{slug}.html\2",
                html_out,
            )
            html_out = html_out.replace(
                f'"url": "https://polgrek.site/lab/{slug}.html"',
                f'"url": "https://polgrek.site/en/lab/{slug}.html"',
            )
            html_out = html_out.replace(
                f'"item": "https://polgrek.site/lab/{slug}.html"',
                f'"item": "https://polgrek.site/en/lab/{slug}.html"',
            )
            html_out = html_out.replace('"inLanguage": "ru"', '"inLanguage": "en"')
            html_out = html_out.replace('content="ru_RU"', 'content="en_US"')
            html_out = html_out.replace('"name": "Главная"', '"name": "Home"')
            html_out = html_out.replace('"name": "Лаборатория"', '"name": "Lab"')
            html_out = html_out.replace(
                '"item": "https://polgrek.site/"',
                '"item": "https://polgrek.site/en/"',
            )
            html_out = html_out.replace(
                '"item": "https://polgrek.site/lab/index.html"',
                '"item": "https://polgrek.site/en/lab/index.html"',
            )
            reps = [
                ("Статья открыта без JavaScript.", "Article loaded without JavaScript."),
                ("Основная навигация", "Primary"),
                ("Пол Грэк — на главную", "Pol Grek — home"),
                ("Пол Грэк<span>нейробиология</span>", "Pol Grek<span>brain science</span>"),
                ("Пол Грэк<span>Pol Grek · нейробиология</span>", "Pol Grek<span>brain science</span>"),
                ("Главная", "Home"),
                ("Лаборатория", "Lab"),
                ("Об авторе", "About"),
                ("Книги", "Books"),
                ("мин · отрывок и книга →", "min · excerpt & book →"),
                (" мин", " min"),
                ("Книга:", "Book:"),
                ("Все материалы", "All posts"),
                ("Ещё из лаборатории", "More from the lab"),
                ("Купить на Литрес", "Buy on LitRes"),
                (" — Пол Грэк", " | Pol Grek"),
                ("Пола Грэка", "Pol Grek"),
                ("Если хотите глубже", "If you want to go deeper"),
                ("К книге", "To the book"),
                ("Вы здесь", "You are here"),
                ("aria-label=\"Вы здесь\"", "aria-label=\"You are here\""),
                ('content="Пол Грэк"', 'content="Pol Grek"'),
                ('og:site_name" content="Пол Грэк"', 'og:site_name" content="Pol Grek"'),
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

        # EN catalog: static cards (same end marker as RU — never first inner </div>)
        en_books_html = "".join(
            book_card(b, books_dir=True, G=GE, lang="en") for b in GE.get("books") or []
        )
        inject_between(
            SITE / "en" / "books" / "index.html",
            'id="booksGrid">',
            "</div>\n        <p class=\"catalog-hint\"",
            en_books_html,
        )

        TAG_RU.clear()
        TAG_RU.update(_tag_backup)

    write_sitemap(G, GE)
    inject_catalog_itemlist(G, lang="ru")
    if GE:
        inject_catalog_itemlist(GE, lang="en")
    sync_faq_and_timeline(G, GE)
    bust_asset_cache()
    print("OK: static pages built")


def bust_asset_cache() -> None:
    """Point every page shell at current CSS_VER (hand-edited catalog shells included)."""
    import re

    css_re = re.compile(r'(href="[^"]*css/styles\.css)(?:\?v=[^"]*)?"')
    js_re = re.compile(r'(src="[^"]*js/main\.js)(?:\?v=[^"]*)?"')
    n = 0
    for path in SITE.rglob("*.html"):
        if "partials" in path.parts:
            continue
        raw = path.read_text(encoding="utf-8")
        new = css_re.sub(rf'\1?v={CSS_VER}"', raw)
        new = js_re.sub(rf'\1?v={CSS_VER}"', new)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            n += 1
    print(f"cache bust CSS/JS on {n} html files → v={CSS_VER}")


def inject_catalog_itemlist(G: dict, *, lang: str = "ru") -> None:
    """Add ItemList JSON-LD to books catalog for rich results (RU and/or EN)."""
    import json as _json

    is_en = lang == "en"
    prefix = "/en/books/" if is_en else "/books/"
    name = "Books by Pol Grek" if is_en else "Книги Пола Грэка"
    path = SITE / ("en/books/index.html" if is_en else "books/index.html")
    if not path.exists():
        return

    items = []
    for i, b in enumerate(G.get("books") or [], 1):
        items.append(
            {
                "@type": "ListItem",
                "position": i,
                "name": b["title"],
                "url": abs_url(f"{prefix}{b['slug']}.html"),
            }
        )
    block = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": name,
        "numberOfItems": len(items),
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": items,
    }
    pretty = _json.dumps(block, ensure_ascii=False, indent=2)
    pretty_ind = "\n".join("  " + line if line else line for line in pretty.split("\n"))
    script = (
        '  <script type="application/ld+json" id="catalog-itemlist">\n'
        + pretty_ind
        + "\n  </script>\n"
    )
    raw = path.read_text(encoding="utf-8")
    if 'id="catalog-itemlist"' in raw:
        raw = re.sub(
            r'  <script type="application/ld\+json" id="catalog-itemlist">[\s\S]*?</script>\n?',
            script,
            raw,
            count=1,
        )
    else:
        raw = raw.replace("</head>", script + "</head>", 1)
    path.write_text(raw, encoding="utf-8")
    print(f"catalog ItemList injected ({lang})")


def write_sitemap(G: dict, GE: dict | None = None) -> None:
    """Full sitemap: hubs, all books, all lab articles, EN mirrors, lastmod."""
    from datetime import date

    today = date.today().isoformat()
    urls: list[tuple[str, str, str, str | None]] = []
    # (loc, changefreq, priority, hreflang_pair or None)

    def add(loc: str, freq: str, prio: str, alt: str | None = None):
        urls.append((loc, freq, prio, alt))

    add(f"{SITE_ORIGIN}/", "weekly", "1.0", f"{SITE_ORIGIN}/en/")
    add(f"{SITE_ORIGIN}/about.html", "monthly", "0.8", f"{SITE_ORIGIN}/en/about.html")
    add(f"{SITE_ORIGIN}/books/index.html", "weekly", "0.9", f"{SITE_ORIGIN}/en/books/index.html")
    add(f"{SITE_ORIGIN}/lab/index.html", "weekly", "0.8", f"{SITE_ORIGIN}/en/lab/index.html")
    add(f"{SITE_ORIGIN}/privacy.html", "yearly", "0.3", f"{SITE_ORIGIN}/en/privacy.html")

    for b in G.get("books") or []:
        slug = b["slug"]
        add(
            f"{SITE_ORIGIN}/books/{slug}.html",
            "monthly",
            "0.75" if b.get("flagship") else "0.65",
            f"{SITE_ORIGIN}/en/books/{slug}.html",
        )
    for a in G.get("articles") or []:
        slug = a["slug"]
        add(
            f"{SITE_ORIGIN}/lab/{slug}.html",
            "monthly",
            "0.55",
            f"{SITE_ORIGIN}/en/lab/{slug}.html",
        )

    # EN hubs (also listed as alts; include as own loc for crawlers)
    for loc in (
        f"{SITE_ORIGIN}/en/",
        f"{SITE_ORIGIN}/en/about.html",
        f"{SITE_ORIGIN}/en/books/index.html",
        f"{SITE_ORIGIN}/en/lab/index.html",
        f"{SITE_ORIGIN}/en/privacy.html",
    ):
        if not any(u[0] == loc for u in urls):
            add(loc, "weekly", "0.6", None)

    # EN books/articles as own URLs (hreflang already on RU entries; still list for discovery)
    if GE:
        for b in GE.get("books") or []:
            loc = f"{SITE_ORIGIN}/en/books/{b['slug']}.html"
            if not any(u[0] == loc for u in urls):
                add(loc, "monthly", "0.5", None)
        for a in GE.get("articles") or []:
            loc = f"{SITE_ORIGIN}/en/lab/{a['slug']}.html"
            if not any(u[0] == loc for u in urls):
                add(loc, "monthly", "0.45", None)

    # Dedupe by loc keeping first
    seen = set()
    ordered = []
    for u in urls:
        if u[0] in seen:
            continue
        seen.add(u[0])
        ordered.append(u)

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for loc, freq, prio, alt in ordered:
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        if alt:
            # Determine if loc is EN or RU for hreflang direction
            if "/en/" in loc:
                ru = loc.replace("/en/", "/")
                if ru.endswith("/en"):
                    ru = SITE_ORIGIN + "/"
                # privacy en path
                if loc == f"{SITE_ORIGIN}/en/":
                    ru = f"{SITE_ORIGIN}/"
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="ru" href="{ru}"/>'
                )
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="en" href="{loc}"/>'
                )
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="x-default" href="{ru}"/>'
                )
            else:
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="ru" href="{loc}"/>'
                )
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="en" href="{alt}"/>'
                )
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="x-default" href="{loc}"/>'
                )
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{prio}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    lines.append("")
    (SITE / "sitemap.xml").write_text("\n".join(lines), encoding="utf-8")
    print("sitemap urls", len(ordered))


if __name__ == "__main__":
    main()

