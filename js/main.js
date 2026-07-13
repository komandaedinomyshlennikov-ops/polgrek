/* Pol Grek site — UI runtime */
(function () {
  // Relative prefix for nested pages (".." from books/lab). Works on GitHub Pages project sites.
  const pathPrefix = document.body.dataset.base || '';
  // Optional absolute site base from base-config.js (e.g. '/pol-grek-site') — only for root-relative assets
  const siteBase = (typeof window.POL_GREK_BASE === 'string' ? window.POL_GREK_BASE : '').replace(/\/$/, '');

  function url(path) {
    if (!path) {
      if (pathPrefix) return pathPrefix + '/index.html';
      return siteBase ? siteBase + '/index.html' : 'index.html';
    }
    if (path.startsWith('http')) return path;
    // Nested pages: use relative ../
    if (pathPrefix) return pathPrefix + path;
    // Root pages: strip leading slash; optional siteBase for GH project pages
    const clean = path.replace(/^\//, '');
    return siteBase ? siteBase + '/' + clean : clean;
  }

  function headerHTML(active) {
    const doors = `
      <div class="nav-dropdown" data-dropdown>
        <button type="button" class="nav-drop-btn" aria-expanded="false" aria-haspopup="true" data-drop-toggle>
          С чего начать
          <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="nav-drop-panel" role="menu">
          <a role="menuitem" href="${url('/books/index.html')}?filter=выгорание">
            <strong>Я выгорел</strong>
            <span>RESET, стресс, перезагрузка</span>
          </a>
          <a role="menuitem" href="${url('/books/index.html')}?filter=когнитивное-здоровье">
            <strong>Мозг после 40 / энергия</strong>
            <span>«Мозг на 100+», биохакинг, сон</span>
          </a>
          <a role="menuitem" href="${url('/books/index.html')}?filter=деньги">
            <strong>Деньги и эмоции</strong>
            <span>«Мозг и деньги», эмоции, гормоны</span>
          </a>
          <a role="menuitem" class="nav-drop-all" href="${url('/books/index.html')}">Все книги →</a>
        </div>
      </div>`;

    return `
      <a class="skip-link" href="#main-content">К содержанию</a>
      <header class="site-header" id="siteHeader">
        <div class="nav-inner">
          <a class="logo" href="${url('/index.html')}" aria-label="Пол Грэк — на главную">
            <span class="logo-mark" aria-hidden="true"></span>
            <span class="logo-text">Пол Грэк<span>Pol Grek · нейробиология</span></span>
          </a>
          <nav class="nav-links" id="navLinks" aria-label="Основная навигация">
            <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}">Главная</a>
            ${doors}
            <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}">Книги</a>
            <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}">Лаборатория</a>
            <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}">Об авторе</a>
            <a href="${url('/index.html')}#faq" class="nav-soft">FAQ</a>
          </nav>
          <div class="nav-actions">
            <a class="btn btn-outline nav-cta-secondary" href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">Литрес</a>
            <a class="btn btn-primary nav-cta" href="${url('/books/index.html')}">Книги</a>
          </div>
          <button class="nav-toggle" id="navToggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobileDrawer">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div class="mobile-drawer" id="mobileDrawer" hidden>
        <div class="mobile-drawer-backdrop" data-drawer-close></div>
        <div class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Меню сайта">
          <div class="mobile-drawer-head">
            <strong>Куда дальше?</strong>
            <button type="button" class="mobile-drawer-close" data-drawer-close aria-label="Закрыть">×</button>
          </div>
          <nav class="mobile-drawer-nav" aria-label="Мобильная навигация">
            <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}">🏠 Главная</a>
            <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}">📚 Все книги</a>
            <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}">🧪 Лаборатория</a>
            <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}">👤 Об авторе</a>
            <a href="${url('/index.html')}#faq">❓ FAQ</a>
          </nav>
          <p class="mobile-drawer-label">С чего начать</p>
          <div class="mobile-door-list">
            <a href="${url('/books/index.html')}?filter=выгорание"><strong>Я выгорел</strong><span>RESET · стресс</span></a>
            <a href="${url('/books/index.html')}?filter=когнитивное-здоровье"><strong>Энергия / 40+</strong><span>100+ · биохакинг</span></a>
            <a href="${url('/books/index.html')}?filter=деньги"><strong>Деньги / эмоции</strong><span>Мозг и деньги · ЭИ</span></a>
          </div>
          <div class="mobile-drawer-cta">
            <a class="btn btn-primary" href="${url('/books/index.html')}">Открыть каталог</a>
            <a class="btn btn-outline" href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">Литрес</a>
          </div>
        </div>
      </div>
      <nav class="mobile-tabbar" aria-label="Быстрые разделы">
        <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}"><span>🏠</span>Главная</a>
        <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}"><span>📚</span>Книги</a>
        <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}"><span>🧪</span>Лаб</a>
        <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}"><span>👤</span>Автор</a>
        <a href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener"><span>🛒</span>Литрес</a>
      </nav>
      <button type="button" class="back-to-top" id="backToTop" aria-label="Наверх" hidden>↑</button>`;
  }

  function footerHTML() {
    const legal = (window.POL_GREK && POL_GREK.legal) || {};
    const email = legal.email || 'hello@polgrek.site';
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="logo" style="margin-bottom:1rem">
              <span class="logo-mark" aria-hidden="true"></span>
              <span class="logo-text">Пол Грэк<span>Pol Grek</span></span>
            </div>
            <p>Нейробиология без эзотерики. Витрина и редакция — покупка на Литрес и Amazon.</p>
          </div>
          <div>
            <h4>Разделы</h4>
            <a href="${url('/books/index.html')}">Книги</a>
            <a href="${url('/lab/index.html')}">Лаборатория</a>
            <a href="${url('/about.html')}">Об авторе</a>
            <a href="${url('/index.html')}#faq">FAQ</a>
            <a href="${url('/privacy.html')}">Конфиденциальность</a>
          </div>
          <div>
            <h4>Читать и купить</h4>
            <a href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">Литрес · все книги</a>
            <a href="https://www.amazon.in/s?i=digital-text&rh=p_27%3A%25D0%259F%25D0%25BE%25D0%25BB%2B%25D0%2593%25D1%2580%25D1%258D%25D0%25BA&s=relevancerank&text=%D0%9F%D0%BE%D0%BB+%D0%93%D1%80%D1%8D%D0%BA&ref=dp_byline_sr_ebooks_1" target="_blank" rel="noopener">Amazon · Пол Грэк</a>
          </div>
          <div>
            <h4>Связь</h4>
            <a href="https://www.threads.net/@pol.grek" target="_blank" rel="noopener">Threads @pol.grek</a>
            <a href="mailto:${email}">${email}</a>
          </div>
        </div>
        <div class="container footer-legal">
          <p>${legal.disclaimer || 'Материалы не заменяют консультацию врача или психотерапевта.'}</p>
          <p>${legal.privacy || ''}</p>
        </div>
        <div class="container footer-bottom">
          <span>© ${new Date().getFullYear()} Пол Грэк / Pol Grek</span>
          <span>Не является медицинской рекламой. Издательская витрина автора.</span>
        </div>
      </footer>`;
  }

  function coverUrl(book) {
    const file = book.coverFile || `${book.slug}.jpg`;
    return url('/assets/covers/' + file);
  }

  function excerptUrl(book) {
    const file = book.excerptFile || `${book.slug}-otryvok.txt`;
    return url('/excerpts/' + file);
  }

  function storeButtons(book, compact) {
    const cls = compact ? 'btn btn-sm' : 'btn';
    return `
      <a class="${cls} btn-primary" href="${book.litres}" target="_blank" rel="noopener" data-track="litres" data-book="${book.slug}">Литрес</a>
      <a class="${cls} btn-outline" href="${book.amazon}" target="_blank" rel="noopener" data-track="amazon" data-book="${book.slug}">Amazon</a>`;
  }

  function bookCardHTML(book, opts = {}) {
    const co = book.authors.length > 1 ? '<span class="tag co">с Лорой Грэк</span>' : '';
    const flag = book.flagship || opts.flagship ? '<span class="tag flag">Ключевая</span>' : '';
    const tagRu = {
      'когнитивное-здоровье': 'когнитивное здоровье',
      биохакинг: 'биохакинг',
      энергия: 'энергия',
      стресс: 'стресс',
      выгорание: 'выгорание',
      деньги: 'деньги',
      гормоны: 'гормоны',
      лора: 'с Лорой',
    };
    const tags = book.tags
      .filter((t) => t !== 'лора' || book.authors.length === 1)
      .slice(0, 2)
      .map((t) => `<span class="tag">${tagRu[t] || t}</span>`)
      .join('');
    return `
      <article class="book-card${book.flagship ? ' is-flagship' : ''}">
        <a class="book-cover has-image clean" href="${url('/books/book.html?slug=' + book.slug)}" aria-label="${book.title}">
          <img src="${coverUrl(book)}" alt="Обложка: ${book.title}" loading="lazy" width="600" height="900" />
        </a>
        <div class="book-body">
          <h3 class="book-title"><a href="${url('/books/book.html?slug=' + book.slug)}">${book.title}</a></h3>
          <div class="book-tags">${flag}${co}${tags}</div>
          <p>${book.promise}</p>
          <div class="book-actions">
            ${storeButtons(book, true)}
          </div>
          <a class="book-more" href="${url('/books/book.html?slug=' + book.slug)}">Аннотация и отрывок →</a>
        </div>
      </article>`;
  }

  function articleCardHTML(a) {
    return `
      <a class="article-card" href="${url('/lab/article.html?slug=' + a.slug)}">
        <div class="cat">${a.category}</div>
        <h3>${a.title}</h3>
        <p>${a.hook}</p>
        <div class="meta">${a.readMin} мин чтения →</div>
      </a>`;
  }

  function mountShell(active) {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.outerHTML = headerHTML(active);
    if (footerMount) footerMount.outerHTML = footerHTML();

    // Ensure main landmark for skip-link
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'main-content';
    if (main && !main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');

    const header = document.getElementById('siteHeader');
    const backTop = document.getElementById('backToTop');
    const onScroll = () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 8);
      if (backTop) {
        const show = window.scrollY > 480;
        backTop.hidden = !show;
        backTop.classList.toggle('visible', show);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (backTop) {
      backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Desktop dropdown
    document.querySelectorAll('[data-dropdown]').forEach((drop) => {
      const btn = drop.querySelector('[data-drop-toggle]');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = drop.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.querySelectorAll('[data-dropdown].open').forEach((other) => {
          if (other !== drop) {
            other.classList.remove('open');
            const b = other.querySelector('[data-drop-toggle]');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-dropdown].open').forEach((drop) => {
        drop.classList.remove('open');
        const b = drop.querySelector('[data-drop-toggle]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });

    // Mobile drawer
    const toggle = document.getElementById('navToggle');
    const drawer = document.getElementById('mobileDrawer');
    const openDrawer = (open) => {
      if (!drawer || !toggle) return;
      drawer.hidden = !open;
      drawer.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('drawer-open', open);
    };
    if (toggle && drawer) {
      toggle.addEventListener('click', () => openDrawer(drawer.hidden));
      drawer.querySelectorAll('[data-drawer-close]').forEach((el) => {
        el.addEventListener('click', () => openDrawer(false));
      });
      drawer.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => openDrawer(false));
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') openDrawer(false);
      });
    }

    // Keyboard: close dropdown on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('[data-dropdown].open').forEach((drop) => {
        drop.classList.remove('open');
        const b = drop.querySelector('[data-drop-toggle]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Neural canvas for hero */
  function initNeuralCanvas(canvas) {
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes, raf;
    const count = 42;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 2.2,
      }));
    }

    function step() {
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // soft orbs
      const g1 = ctx.createRadialGradient(rect.width * 0.3, rect.height * 0.3, 0, rect.width * 0.3, rect.height * 0.3, rect.width * 0.45);
      g1.addColorStop(0, 'rgba(42,157,143,0.22)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const g2 = ctx.createRadialGradient(rect.width * 0.8, rect.height * 0.7, 0, rect.width * 0.8, rect.height * 0.7, rect.width * 0.4);
      g2.addColorStop(0, 'rgba(232,162,58,0.18)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > rect.width) n.vx *= -1;
        if (n.y < 0 || n.y > rect.height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(246,241,232,${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(246,241,232,0.85)';
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resize();
      step();
    });
  }

  function renderHome() {
    const flagships = POL_GREK.books.filter((b) => b.flagship || b.featured).slice(0, 3);
    const featured = document.getElementById('featuredBooks');
    // Keep static HTML if present (SEO / no-JS); only fill if empty
    if (featured && !featured.querySelector('.book-card')) {
      featured.innerHTML = flagships.map((b) => bookCardHTML(b)).join('');
      featured.classList.add('books-grid-flagship');
    }

    const social = document.getElementById('socialProof');
    if (social && POL_GREK.socialProof && !social.querySelector('.rating-card')) {
      const sp = POL_GREK.socialProof;
      social.innerHTML = sp.items
        .map((item) => {
          const book = POL_GREK.getBook(item.slug);
          return `
            <a class="rating-card" href="${book ? book.litres : sp.sourceUrl}" target="_blank" rel="noopener">
              <div class="rating-stars" aria-label="Оценка ${item.rating}">${'★'.repeat(5)}</div>
              <strong>${item.rating.toFixed(1)}</strong>
              <span class="rating-book">${item.book}</span>
              <span class="rating-meta">${(function (n) {
                n = Math.abs(n) % 100;
                const n1 = n % 10;
                if (n > 10 && n < 20) return item.votes + ' оценок';
                if (n1 === 1) return item.votes + ' оценка';
                if (n1 >= 2 && n1 <= 4) return item.votes + ' оценки';
                return item.votes + ' оценок';
              })(item.votes)} на ${sp.source} · открыть книгу →</span>
            </a>`;
        })
        .join('');
    }
    const note = document.getElementById('socialProofNote');
    if (note && POL_GREK.socialProof) note.textContent = POL_GREK.socialProof.note;

    const articles = document.getElementById('homeArticles');
    if (articles && !articles.querySelector('.article-card')) {
      articles.innerHTML = POL_GREK.articles.slice(0, 3).map(articleCardHTML).join('');
    }

    const quotes = document.getElementById('homeQuotes');
    if (quotes) {
      quotes.innerHTML = POL_GREK.quotes
        .slice(0, 3)
        .map(
          (q) => `
          <article class="quote-card">
            <p>«${q.text}»</p>
            <span>— ${q.source}</span>
          </article>`
        )
        .join('');
    }

    const magnetSelect = document.getElementById('magnetBook');
    if (magnetSelect) {
      magnetSelect.innerHTML = flagships
        .map((b) => `<option value="${b.slug}">${b.title}</option>`)
        .join('');
    }

    // Sync radio cover picks → select
    const picks = document.getElementById('magnetPicks');
    if (picks && magnetSelect) {
      picks.addEventListener('change', (e) => {
        if (e.target && e.target.name === 'flagPick') {
          magnetSelect.value = e.target.value;
        }
      });
      const checked = picks.querySelector('input[name="flagPick"]:checked');
      if (checked) magnetSelect.value = checked.value;
    }

    const magnetForm = document.getElementById('magnetForm');
    if (magnetForm) {
      magnetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const radio = document.querySelector('input[name="flagPick"]:checked');
        const slug = (radio && radio.value) || (magnetSelect && magnetSelect.value) || 'mozg-na-100';
        window.location.href = url('/books/book.html?slug=' + slug + '#excerpt');
      });
    }

    // Hero stack: fill only if empty (static HTML may already be present)
    const stack = document.getElementById('heroCoverStack');
    if (stack && !stack.querySelector('img')) {
      stack.innerHTML = flagships
        .map(
          (b, i) =>
            `<a class="hero-cover hero-cover-${i}" href="${url('/books/book.html?slug=' + b.slug)}" aria-label="${b.title}">
              <img src="${coverUrl(b)}" alt="" width="280" height="420" />
            </a>`
        )
        .join('');
    }

    initNeuralCanvas(document.getElementById('neuralCanvas'));
  }

  function renderBooksPage() {
    const grid = document.getElementById('booksGrid');
    const filtersEl = document.getElementById('bookFilters');
    if (!grid || !filtersEl) return;

    let active = 'all';
    // Preserve static catalog for no-JS; filters re-render when used
    const hasStatic = !!grid.querySelector('.book-card');

    function paint() {
      const list =
        active === 'all'
          ? POL_GREK.books
          : POL_GREK.books.filter((b) => {
              const f = POL_GREK.filters.find((x) => x.id === active);
              return f && f.match ? f.match(b) : b.tags.includes(active);
            });
      grid.innerHTML = list.map(bookCardHTML).join('');
      const count = document.getElementById('booksCount');
      if (count) count.textContent = 'Найдено: ' + list.length;
      filtersEl.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.filter === active);
      });
    }

    filtersEl.innerHTML = POL_GREK.filters
      .map((f) => `<button type="button" class="filter-btn" data-filter="${f.id}">${f.label}</button>`)
      .join('');

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      active = btn.dataset.filter;
      paint();
    });

    // Only full re-render if no static cards or filters will need data paths fixed
    if (!hasStatic) paint();
    else {
      filtersEl.querySelector('.filter-btn')?.classList.add('active');
    }
  }

  async function downloadExcerpt(book) {
    const fileUrl = excerptUrl(book);
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error('no file');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = book.excerptFile || `${book.slug}-otryvok.txt`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      // fallback: inline excerpt from data.js
      const text = `${book.title}\n${book.subtitle}\nАвтор: ${book.authors.join(', ')}\n\n— Отрывок —\n\n${book.excerpt}\n\n© Пол Грэк / Pol Grek\nПолный текст — на Литрес и Amazon.\n`;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${book.slug}-otryvok.txt`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  }

  function renderBookPage() {
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug') || 'mozg-na-100';
    const book = POL_GREK.getBook(slug);
    const root = document.getElementById('bookRoot');
    if (!root) return;

    if (!book) {
      root.innerHTML = `<div class="container page-hero"><h1>Книга не найдена</h1><a class="btn btn-primary" href="${url('/books/index.html')}">Все книги</a></div>`;
      return;
    }

    document.title = `${book.title} — Пол Грэк`;
    document.body.classList.add('has-sticky-buy');

    const related = POL_GREK.relatedBooks(book.slug, 3);
    root.innerHTML = `
      <div class="container">
        <div class="breadcrumb">
          <a href="${url('/index.html')}">Главная</a> ·
          <a href="${url('/books/index.html')}">Книги</a> ·
          <span>${book.title}</span>
        </div>
        <div class="book-detail">
          <div class="book-detail-cover has-image">
            <img src="${coverUrl(book)}" alt="Обложка: ${book.title}" width="640" height="960" />
          </div>
          <div class="book-detail-body">
            <p class="eyebrow">Научпоп · без эзотерики</p>
            <h1 class="display" style="font-size:clamp(2rem,4vw,2.8rem)">${book.title}</h1>
            <p class="lead">${book.subtitle}</p>
            <div class="actions">
              <a class="btn btn-primary" href="${book.litres}" target="_blank" rel="noopener" data-track="litres" data-book="${book.slug}">Купить на Литрес</a>
              <a class="btn btn-outline" href="${excerptUrl(book)}" download="${book.excerptFile || book.slug + '-otryvok.txt'}">Скачать отрывок</a>
              <a class="btn btn-ghost-link" href="${book.amazon}" target="_blank" rel="noopener" data-track="amazon" data-book="${book.slug}">Также на Amazon →</a>
            </div>
            <div class="evidence-row" aria-label="Уровни доказательности в подходе автора">
              <span class="badge-a">A</span><span class="badge-b">B</span><span class="badge-c">C</span><span class="badge-d">D</span>
              <span class="muted" style="font-size:0.85rem;align-self:center;margin-left:0.35rem">подход с уровнями доказательности</span>
            </div>

            <h2 style="margin-top:2rem">Для кого эта книга</h2>
            <ul class="checklist">${book.forWhom.map((x) => `<li>${x}</li>`).join('')}</ul>

            <h2>О чём</h2>
            <p>${book.annotation}</p>

            <h2>Что внутри</h2>
            <ul class="checklist">${book.takeaways.map((x) => `<li>${x}</li>`).join('')}</ul>

            <div class="excerpt-box" id="excerpt">
              <strong style="color:var(--ink);font-family:var(--serif);font-size:1.15rem">Отрывок</strong>
              <p class="muted" style="margin:0.35rem 0 0;font-size:0.9rem">Фрагмент из книги. Если откликается — полный текст на Литрес и Amazon.</p>
              <pre id="excerptPreview">${book.excerpt}</pre>
              <div class="btn-row" style="margin-top:1rem">
                <a class="btn btn-teal" href="${excerptUrl(book)}" download="${book.excerptFile || book.slug + '-otryvok.txt'}">Скачать отрывок (.txt)</a>
                <button type="button" class="btn btn-outline" id="downloadExcerpt2">Скачать (если ссылка не сработала)</button>
                <a class="btn btn-outline" href="${book.litres}" target="_blank" rel="noopener">Читать целиком на Литрес</a>
              </div>
            </div>

            <div class="disclaimer">
              Книга носит образовательный характер и не заменяет консультацию врача, психотерапевта или финансового советника. При острых состояниях — обратитесь к специалисту.
            </div>

            <div class="related">
              <div class="section-head">
                <div>
                  <p class="eyebrow">Рядом на полке</p>
                  <h2>Если эта тема откликнулась</h2>
                </div>
              </div>
              <div class="books-grid">${related.map(bookCardHTML).join('')}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky-buy" aria-label="Купить">
        <a class="btn btn-primary" href="${book.litres}" target="_blank" rel="noopener">Литрес</a>
        <a class="btn btn-outline" href="${excerptUrl(book)}" download="${book.excerptFile || book.slug + '-otryvok.txt'}">Отрывок</a>
        <a class="btn btn-ghost-link" href="${book.amazon}" target="_blank" rel="noopener">Amazon</a>
      </div>`;

    // Load full excerpt file into preview when available
    fetch(excerptUrl(book))
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        const pre = document.getElementById('excerptPreview');
        if (pre && text) {
          // show body without huge footer for on-page preview
          const clean = text.replace(/^[\s\S]*?— Отрывок —\s*/m, '').replace(/\n—\n[\s\S]*$/, '').trim();
          pre.textContent = clean.slice(0, 2200) + (clean.length > 2200 ? '…' : '');
        }
      })
      .catch(() => {});

    ['downloadExcerpt', 'downloadExcerpt2'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', () => downloadExcerpt(book));
    });
  }

  function renderLabPage() {
    const grid = document.getElementById('labGrid');
    if (grid && !grid.querySelector('.article-card')) {
      grid.innerHTML = POL_GREK.articles.map(articleCardHTML).join('');
    }
  }

  function renderArticlePage() {
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug') || POL_GREK.articles[0].slug;
    const article = POL_GREK.getArticle(slug);
    const root = document.getElementById('articleRoot');
    if (!root) return;

    if (!article) {
      root.innerHTML = `<div class="container page-hero"><h1>Статья не найдена</h1></div>`;
      return;
    }

    document.title = `${article.title} — Лаборатория Пола Грэка`;
    const book = POL_GREK.getBook(article.relatedBook);

    const bodyHTML = article.body
      .map((block) => {
        if (block.type === 'h2') return `<h2>${block.text}</h2>`;
        if (block.type === 'experiment') {
          return `<div class="experiment"><strong>${block.title}</strong><p style="margin:0;max-width:none">${block.text}</p></div>`;
        }
        return `<p>${block.text}</p>`;
      })
      .join('');

    root.innerHTML = `
      <div class="container">
        <div class="breadcrumb">
          <a href="${url('/index.html')}">Главная</a> ·
          <a href="${url('/lab/index.html')}">Лаборатория</a> ·
          <span>${article.title}</span>
        </div>
        <div class="article-layout">
          <article class="article-content">
            <p class="eyebrow">${article.category} · ${article.readMin} мин${article.source ? ' · ' + article.source : ''}</p>
            <h1>${article.title}</h1>
            <p class="lead">${article.hook}</p>
            <div class="pull-quote">${article.hook}</div>
            ${bodyHTML}
          </article>
          <aside class="article-side">
            ${
              book
                ? `<div class="side-card">
                    <p class="eyebrow" style="margin-bottom:0.5rem">Если хотите глубже</p>
                    <h3>${book.title}</h3>
                    <p>${book.promise}</p>
                    <a class="btn btn-primary" href="${book.litres}" target="_blank" rel="noopener">Купить на Литрес</a>
                    <a class="btn btn-outline" href="${url('/books/book.html?slug=' + book.slug)}">О книге</a>
                    <a class="btn btn-ghost-link" href="${book.amazon}" target="_blank" rel="noopener">Amazon →</a>
                  </div>`
                : ''
            }
            <div class="side-card" style="margin-top:1rem">
              <h3>Ещё из лаборатории</h3>
              ${POL_GREK.articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 3)
                .map((a) => `<a href="${url('/lab/article.html?slug=' + a.slug)}" style="display:block;padding:0.45rem 0;font-weight:600;color:var(--ink)">${a.title}</a>`)
                .join('')}
            </div>
          </aside>
        </div>
      </div>`;
  }

  function renderAboutPage() {
    // Static HTML already contains biography, timeline, principles, Laura.
    // Only enrich if containers are empty (fallback).
    const a = POL_GREK.author;
    const timeline = document.getElementById('autoTimeline');
    if (timeline && !timeline.querySelector('.timeline-item') && a.autobiography) {
      timeline.innerHTML = a.autobiography
        .map(
          (item) => `
          <div class="timeline-item">
            <strong>${item.checkpoint}</strong>
            <p>${item.text}</p>
          </div>`
        )
        .join('');
    }
    const principles = document.getElementById('principles');
    if (principles && !principles.querySelector('.method-card')) {
      principles.innerHTML = a.principles
        .map(
          (p, i) => `
          <article class="method-card">
            <div class="method-icon">0${i + 1}</div>
            <h3>${p.title}</h3>
            <p>${p.text}</p>
          </article>`
        )
        .join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';
    const activeMap = {
      home: 'home',
      books: 'books',
      book: 'books',
      lab: 'lab',
      article: 'lab',
      about: 'about',
    };
    mountShell(activeMap[page] || 'home');

    if (page === 'home') renderHome();
    if (page === 'books') renderBooksPage();
    if (page === 'book') renderBookPage();
    if (page === 'lab') renderLabPage();
    if (page === 'article') renderArticlePage();
    if (page === 'about') renderAboutPage();
  });

  window.PolSite = { bookCardHTML, articleCardHTML, url };
})();
