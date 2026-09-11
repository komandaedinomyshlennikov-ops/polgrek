#!/usr/bin/env python3
"""Pull live LitRes URLs and prices into web/src/data/site.json.

Run: python3 scripts/sync-litres.py
Safe: keeps old values if a page fails. Aborts if author catalog looks empty.
Amazon links are not touched (no public API).
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.request
from datetime import date
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SITE_JSON = ROOT / "web" / "src" / "data" / "site.json"
AUTHOR_PAGES = [
    "https://www.litres.ru/author/pol-grek/",
    "https://www.litres.ru/author/lora-grek/",
]
UA = "PolGrekSite/1.0 (+https://polgrek.site/; hello@polgrek.site)"
ART_RE = re.compile(r"/book/[^\"'\s?]+-(\d{6,})/?")
PATH_RE = re.compile(r'href="(/book/[^"]+?-(\d{6,})/?)"')
OFFER_RE = re.compile(
    r'"offers"\s*:\s*\{[^}]*?"price"\s*:\s*"?(\d+(?:\.\d+)?)"?',
    re.I,
)
BUY_SPAN_RE = re.compile(r"Купить за(?:<!-- -->)?\s*(?:<!-- -->)?\s*(\d+)")


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "ru"})
    with urllib.request.urlopen(req, timeout=25) as res:
        return res.read().decode("utf-8", errors="replace")


def art_id(url: str) -> str | None:
    m = ART_RE.search(url or "")
    return m.group(1) if m else None


def catalog_by_art() -> dict[str, str]:
    found: dict[str, str] = {}
    for page in AUTHOR_PAGES:
        html = fetch(page)
        for path, aid in PATH_RE.findall(html):
            clean = "https://www.litres.ru" + path.split("?")[0]
            if not clean.endswith("/"):
                clean += "/"
            found[aid] = clean
        time.sleep(0.6)
    return found


def book_price(url: str) -> int | None:
    html = fetch(url)
    m = OFFER_RE.search(html)
    if m:
        return int(float(m.group(1)))
    m = BUY_SPAN_RE.search(html)
    if m:
        return int(m.group(1))
    return None


def affiliate_url(template: str, clean: str, sub1: str) -> str:
    url = clean if clean.endswith("/") else clean + "/"
    return (
        template.replace("{url_enc}", quote(url, safe=""))
        .replace("{url}", url)
        .replace("{sub1}", sub1)
    )


def main() -> int:
    data = json.loads(SITE_JSON.read_text(encoding="utf-8"))
    aff = data.get("affiliate") or {}
    template = aff.get("template") or ""
    by_slug: dict[str, str] = dict(aff.get("bySlug") or {})

    print("Fetching author catalogs…", file=sys.stderr)
    catalog = catalog_by_art()
    print(f"  {len(catalog)} live book URLs", file=sys.stderr)
    if len(catalog) < 8:
        print("Catalog too small — aborting so we do not wipe links.", file=sys.stderr)
        return 1

    changes: list[str] = []
    books = data.get("books") or []

    for book in books:
        slug = book.get("slug") or ""
        old = (book.get("buyUrl") or "").split("?")[0]
        aid = art_id(old)
        new_url = catalog.get(aid) if aid else None
        if new_url and new_url.rstrip("/") != old.rstrip("/"):
            book["buyUrl"] = new_url
            changes.append(f"{slug}: url {old} → {new_url}")
        live_url = book.get("buyUrl") or old
        if not live_url:
            continue
        try:
            price = book_price(live_url)
            time.sleep(0.5)
        except Exception as exc:  # noqa: BLE001
            print(f"  skip price {slug}: {exc}", file=sys.stderr)
            price = None
        if price and price != book.get("litresPrice"):
            changes.append(f"{slug}: {book.get('litresPrice')} ₽ → {price} ₽")
            book["litresPrice"] = price
        if template and live_url:
            by_slug[slug] = affiliate_url(template, live_url.split("?")[0], slug)

    # Extra partner URLs that are not full site books
    for slug, url in list(by_slug.items()):
        aid = art_id(url)
        if aid and aid in catalog:
            clean = catalog[aid]
            rebuilt = affiliate_url(template, clean, slug) if template else clean
            if rebuilt != url:
                by_slug[slug] = rebuilt
                changes.append(f"bySlug {slug}: path updated")

    aff["bySlug"] = dict(sorted(by_slug.items()))
    data["affiliate"] = aff
    proof = data.get("socialProof") or {}
    proof["checkedAt"] = date.today().isoformat()
    data["socialProof"] = proof

    if not changes:
        print("No changes.", file=sys.stderr)
        return 0

    SITE_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated:", file=sys.stderr)
    for line in changes:
        print(" ", line, file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
