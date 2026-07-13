/* Pol Grek site — UI runtime */
(function () {
  // Relative prefix for nested pages (".." from books/lab). Works on GitHub Pages project sites.
  const pathPrefix = document.body.dataset.base || '';
  // Optional absolute site base from base-config.js (e.g. '/pol-grek-site') — only for root-relative assets
  const siteBase = (typeof window.POL_GREK_BASE === 'string' ? window.POL_GREK_BASE : '').replace(/\/$/, '');

  const lang = (document.documentElement.lang || document.body.dataset.lang || 'ru').slice(0, 2).toLowerCase();
  const isEn = lang === 'en';
  const UI = isEn
    ? {
        skip: 'Skip to content',
        home: 'Home',
        start: 'Where to start',
        books: 'Books',
        lab: 'Lab',
        about: 'About',
        faq: 'FAQ',
        litres: 'LitRes',
        amazon: 'Amazon',
        catalog: 'Open catalog',
        allBooks: 'All books →',
        doorsLabel: 'Where to start',
        drawerTitle: 'Where next?',
        drawerClose: 'Close',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        navAria: 'Primary',
        mobileNavAria: 'Mobile menu',
        tabAria: 'Quick links',
        top: 'Back to top',
        footerBrand: 'Brain science without the woo. Author showcase — buy on Amazon or LitRes.',
        footerSections: 'Sections',
        footerBuy: 'Read & buy',
        footerContact: 'Contact',
        footerPrivacy: 'Privacy & external links',
        footerLegalNote: 'Not medical advertising. Author publishing showcase.',
        logoAria: 'Pol Grek — home',
        logoSub: 'Pol Grek · brain science',
        door1t: 'I burned out',
        door1s: 'RESET · stress · reboot',
        door2t: 'Brain after 40 / energy',
        door2s: 'Brain at 100+ · biohacking · sleep',
        door3t: 'Money & emotions',
        door3s: 'Wired for Wealth · EI · hormones',
        mobileDoor1t: 'I burned out',
        mobileDoor1s: 'RESET · stress',
        mobileDoor2t: 'Energy / 40+',
        mobileDoor2s: '100+ · biohacking',
        mobileDoor3t: 'Money / emotions',
        mobileDoor3s: 'Wealth · EI',
        excerpt: 'Excerpt',
        annotation: 'Blurb & excerpt →',
        withLaura: 'with Laura Grek',
        privacy: 'Privacy',
        buyLitres: 'Buy on LitRes',
        fullLitres: 'Full author catalog on LitRes',
        langRu: 'RU',
        langEn: 'EN',
        langAria: 'Language',
      }
    : {
        skip: 'К содержанию',
        home: 'Главная',
        start: 'С чего начать',
        books: 'Книги',
        lab: 'Лаборатория',
        about: 'Об авторе',
        faq: 'FAQ',
        litres: 'Литрес',
        amazon: 'Amazon',
        catalog: 'Открыть каталог',
        allBooks: 'Все книги →',
        doorsLabel: 'С чего начать',
        drawerTitle: 'Куда дальше?',
        drawerClose: 'Закрыть',
        menuOpen: 'Открыть меню',
        menuClose: 'Закрыть меню',
        navAria: 'Основная навигация',
        mobileNavAria: 'Мобильная навигация',
        tabAria: 'Быстрые разделы',
        top: 'Наверх',
        footerBrand: 'Нейробиология без эзотерики. Витрина автора — покупка на Литрес.',
        footerSections: 'Разделы',
        footerBuy: 'Читать и купить',
        footerContact: 'Связь',
        footerPrivacy: 'О внешних ссылках',
        footerLegalNote: 'Не является медицинской рекламой. Издательская витрина автора.',
        logoAria: 'Пол Грэк — на главную',
        logoSub: 'Pol Grek · нейробиология',
        door1t: 'Я выгорел',
        door1s: 'RESET, стресс, перезагрузка',
        door2t: 'Мозг после 40 / энергия',
        door2s: '«Мозг на 100+», биохакинг, сон',
        door3t: 'Деньги и эмоции',
        door3s: '«Мозг и деньги», эмоции, гормоны',
        mobileDoor1t: 'Я выгорел',
        mobileDoor1s: 'RESET · стресс',
        mobileDoor2t: 'Энергия / 40+',
        mobileDoor2s: '100+ · биохакинг',
        mobileDoor3t: 'Деньги / эмоции',
        mobileDoor3s: 'Мозг и деньги · ЭИ',
        excerpt: 'Отрывок',
        annotation: 'Аннотация и отрывок →',
        withLaura: 'с Лорой Грэк',
        privacy: 'Конфиденциальность',
        buyLitres: 'Купить на Литрес',
        fullLitres: 'Литрес · полный каталог автора',
        langRu: 'RU',
        langEn: 'EN',
        langAria: 'Язык',
      };

  function peerLangUrl(target) {
    // Map current path between RU root and /en/ mirror
    let path = location.pathname || '/';
    // Normalize trailing
    if (path.endsWith('/')) path += 'index.html';
    if (!/\.html?$/i.test(path) && !path.endsWith('/')) {
      /* keep */
    }
    const hash = location.hash || '';
    const search = location.search || '';
    if (target === 'en') {
      if (path.includes('/en/')) return path + search + hash;
      // insert /en before last segment group
      if (path === '/' || path.endsWith('/index.html') && !path.includes('/books') && !path.includes('/lab')) {
        return path.replace(/\/?(index\.html)?$/, '/en/index.html') + search + hash;
      }
      // /foo/bar.html -> /en/foo/bar.html ; /about.html -> /en/about.html
      const m = path.match(/^(.*\/)([^/]+)$/);
      if (!m) return '/en/index.html' + search + hash;
      // if already at domain root file
      if (!path.includes('/books/') && !path.includes('/lab/') && path.match(/\/[^/]+\.html$/)) {
        return path.replace(/\/([^/]+\.html)$/, '/en/$1') + search + hash;
      }
      // books or lab under root
      return path.replace(/(\/)(books|lab)\//, '$1en/$2/') + search + hash;
    }
    // to RU
    if (!path.includes('/en/')) return path + search + hash;
    return path.replace('/en/', '/') + search + hash;
  }

  function langSwitcher() {
    return `<div class="lang-switch" role="group" aria-label="${UI.langAria}">
      <a class="lang-btn${!isEn ? ' active' : ''}" href="${peerLangUrl('ru')}" hreflang="ru" lang="ru">${UI.langRu}</a>
      <a class="lang-btn${isEn ? ' active' : ''}" href="${peerLangUrl('en')}" hreflang="en" lang="en">${UI.langEn}</a>
    </div>`;
  }

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
    const fBurn = isEn ? 'burnout' : 'выгорание';
    const fCog = isEn ? 'cognitive-health' : 'когнитивное-здоровье';
    const fMoney = isEn ? 'money' : 'деньги';
    const doors = `
      <div class="nav-dropdown" data-dropdown>
        <button type="button" class="nav-drop-btn" aria-expanded="false" aria-haspopup="true" data-drop-toggle>
          ${UI.start}
          <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="nav-drop-panel" role="menu">
          <a role="menuitem" href="${url('/books/index.html')}?filter=${encodeURIComponent(fBurn)}">
            <strong>${UI.door1t}</strong>
            <span>${UI.door1s}</span>
          </a>
          <a role="menuitem" href="${url('/books/index.html')}?filter=${encodeURIComponent(fCog)}">
            <strong>${UI.door2t}</strong>
            <span>${UI.door2s}</span>
          </a>
          <a role="menuitem" href="${url('/books/index.html')}?filter=${encodeURIComponent(fMoney)}">
            <strong>${UI.door3t}</strong>
            <span>${UI.door3s}</span>
          </a>
          <a role="menuitem" class="nav-drop-all" href="${url('/books/index.html')}">${UI.allBooks}</a>
        </div>
      </div>`;

    const name = isEn ? 'Pol Grek' : 'Пол Грэк';
    return `
      <a class="skip-link" href="#main-content">${UI.skip}</a>
      <header class="site-header" id="siteHeader">
        <div class="nav-inner">
          <a class="logo" href="${url('/index.html')}" aria-label="${UI.logoAria}">
            <span class="logo-mark" aria-hidden="true"></span>
            <span class="logo-text">${name}<span>${UI.logoSub}</span></span>
          </a>
          <nav class="nav-links" id="navLinks" aria-label="${UI.navAria}">
            <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}">${UI.home}</a>
            ${doors}
            <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}">${UI.books}</a>
            <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}">${UI.lab}</a>
            <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}">${UI.about}</a>
            <a href="${url('/index.html')}#faq" class="nav-soft">${UI.faq}</a>
          </nav>
          <div class="nav-actions">
            ${langSwitcher()}
            <a class="btn btn-outline nav-cta-secondary" href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">${UI.litres}</a>
            <a class="btn btn-primary nav-cta" href="${url('/books/index.html')}">${UI.books}</a>
          </div>
          <div class="nav-mobile-tools">
            ${langSwitcher()}
            <button class="nav-toggle" id="navToggle" aria-label="${UI.menuOpen}" aria-expanded="false" aria-controls="mobileDrawer">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div class="mobile-drawer" id="mobileDrawer" hidden>
        <div class="mobile-drawer-backdrop" data-drawer-close></div>
        <div class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="${UI.drawerTitle}">
          <div class="mobile-drawer-head">
            <strong>${UI.drawerTitle}</strong>
            <button type="button" class="mobile-drawer-close" data-drawer-close aria-label="${UI.drawerClose}">×</button>
          </div>
          <div class="mobile-lang-row">${langSwitcher()}</div>
          <nav class="mobile-drawer-nav" aria-label="${UI.mobileNavAria}">
            <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}">🏠 ${UI.home}</a>
            <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}">📚 ${UI.books}</a>
            <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}">🧪 ${UI.lab}</a>
            <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}">👤 ${UI.about}</a>
            <a href="${url('/index.html')}#faq">❓ ${UI.faq}</a>
          </nav>
          <p class="mobile-drawer-label">${UI.doorsLabel}</p>
          <div class="mobile-door-list">
            <a href="${url('/books/index.html')}?filter=${encodeURIComponent(fBurn)}"><strong>${UI.mobileDoor1t}</strong><span>${UI.mobileDoor1s}</span></a>
            <a href="${url('/books/index.html')}?filter=${encodeURIComponent(fCog)}"><strong>${UI.mobileDoor2t}</strong><span>${UI.mobileDoor2s}</span></a>
            <a href="${url('/books/index.html')}?filter=${encodeURIComponent(fMoney)}"><strong>${UI.mobileDoor3t}</strong><span>${UI.mobileDoor3s}</span></a>
          </div>
          <div class="mobile-drawer-cta">
            <a class="btn btn-primary" href="${url('/books/index.html')}">${UI.catalog}</a>
            <a class="btn btn-outline" href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">${UI.litres}</a>
          </div>
        </div>
      </div>
      <nav class="mobile-tabbar" aria-label="${UI.tabAria}">
        <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}"><span aria-hidden="true">🏠</span>${UI.home}</a>
        <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}"><span aria-hidden="true">📚</span>${UI.books}</a>
        <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}"><span aria-hidden="true">🧪</span>${isEn ? 'Lab' : 'Лаб'}</a>
        <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}"><span aria-hidden="true">👤</span>${isEn ? 'About' : 'Автор'}</a>
        <a href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener" aria-label="${UI.litres}"><span aria-hidden="true">🛒</span>${UI.litres}</a>
      </nav>
      <button type="button" class="back-to-top" id="backToTop" aria-label="${UI.top}" hidden>↑</button>`;
  }

  function footerHTML() {
    const legal = (window.POL_GREK && POL_GREK.legal) || {};
    const email = legal.email || 'hello@polgrek.site';
    const name = isEn ? 'Pol Grek' : 'Пол Грэк';
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="logo" style="margin-bottom:1rem">
              <span class="logo-mark" aria-hidden="true"></span>
              <span class="logo-text">${name}<span>Pol Grek</span></span>
            </div>
            <p>${UI.footerBrand}</p>
          </div>
          <div>
            <h4>${UI.footerSections}</h4>
            <a href="${url('/books/index.html')}">${UI.books}</a>
            <a href="${url('/lab/index.html')}">${UI.lab}</a>
            <a href="${url('/about.html')}">${UI.about}</a>
            <a href="${url('/index.html')}#faq">${UI.faq}</a>
            <a href="${url('/privacy.html')}">${UI.privacy}</a>
          </div>
          <div>
            <h4>${UI.footerBuy}</h4>
            <a href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">${UI.fullLitres}</a>
          </div>
          <div>
            <h4>${UI.footerContact}</h4>
            <a href="https://www.litres.ru/author/pol-grek/" target="_blank" rel="noopener">${UI.litres}</a>
            <a href="mailto:${email}">${email}</a>
            <a href="${url('/privacy.html')}">${UI.footerPrivacy}</a>
          </div>
        </div>
        <div class="container footer-legal">
          <p>${legal.disclaimer || ''}</p>
          <p>${legal.privacy || ''}</p>
        </div>
        <div class="container footer-bottom">
          <span>© ${new Date().getFullYear()} Pol Grek / Пол Грэк</span>
          <span>${UI.footerLegalNote}</span>
        </div>
      </footer>`;
  }

  /** Site root for shared assets (covers, excerpts). EN lives under /en/. */
  function siteRootPrefix() {
    const explicit = document.body.dataset.assets;
    if (explicit !== undefined && explicit !== null && String(explicit).length) {
      return String(explicit).replace(/\/$/, '');
    }
    const path = location.pathname || '';
    if (/\/en\/(books|lab)\//.test(path) || /\/en\/(books|lab)(\/|$)/.test(path)) {
      return '../..';
    }
    if (path.includes('/en/')) return '..';
    if (path.includes('/books/') || path.includes('/lab/')) return pathPrefix || '..';
    return pathPrefix || '';
  }

  function rootUrl(relPath) {
    const clean = String(relPath || '').replace(/^\//, '');
    const root = siteRootPrefix();
    if (!root || root === '.') return clean;
    return root + '/' + clean;
  }

  function coverUrl(book) {
    const file = book.coverFile || `${book.slug}.jpg`;
    return rootUrl('assets/covers/' + file);
  }

  function excerptUrl(book) {
    const file = book.excerptFile || (isEn ? `en/${book.slug}-excerpt.txt` : `${book.slug}-otryvok.txt`);
    return rootUrl('excerpts/' + file);
  }

  function bookPageUrl(slug) {
    return url('/books/' + slug + '.html');
  }

  function articlePageUrl(slug) {
    return url('/lab/' + slug + '.html');
  }

  function hasAmazonProduct(book) {
    const u = book && book.amazon;
    return typeof u === 'string' && /amazon\.[a-z.]+\/(?:dp|gp\/product)\//i.test(u);
  }

  function storeButtons(book, compact) {
    const cls = compact ? 'btn btn-sm' : 'btn';
    const amzOk = hasAmazonProduct(book);
    if (isEn && amzOk) {
      return `
      <a class="${cls} btn-primary" href="${book.amazon}" target="_blank" rel="noopener" data-track="amazon" data-book="${book.slug}">${UI.amazon}</a>
      <a class="${cls} btn-outline" href="${book.litres}" target="_blank" rel="noopener" data-track="litres" data-book="${book.slug}">${UI.litres}</a>
      <a class="${cls} btn-outline" href="${bookPageUrl(book.slug)}#excerpt">${UI.excerpt}</a>`;
    }
    const amz = amzOk
      ? `\n      <a class="${cls} btn-outline" href="${book.amazon}" target="_blank" rel="noopener" data-track="amazon" data-book="${book.slug}">${UI.amazon}</a>`
      : '';
    return `
      <a class="${cls} btn-primary" href="${book.litres}" target="_blank" rel="noopener" data-track="litres" data-book="${book.slug}">${UI.litres}</a>${amz}
      <a class="${cls} btn-outline" href="${bookPageUrl(book.slug)}#excerpt">${UI.excerpt}</a>`;
  }

  function bookCardHTML(book, opts = {}) {
    const tagRu = isEn
      ? {
          'cognitive-health': 'cognitive health',
          biohacking: 'biohacking',
          energy: 'energy',
          stress: 'stress',
          burnout: 'burnout',
          money: 'money',
          hormones: 'hormones',
          laura: 'with Laura',
          'когнитивное-здоровье': 'cognitive health',
          биохакинг: 'biohacking',
          энергия: 'energy',
          стресс: 'stress',
          выгорание: 'burnout',
          деньги: 'money',
          гормоны: 'hormones',
          лора: 'with Laura',
        }
      : {
          'когнитивное-здоровье': 'когнитивное здоровье',
          биохакинг: 'биохакинг',
          энергия: 'энергия',
          стресс: 'стресс',
          выгорание: 'выгорание',
          деньги: 'деньги',
          гормоны: 'гормоны',
          лора: 'с Лорой',
        };
    const parts = [];
    if (book.authors.length > 1) {
      parts.push(`<span class="tag co">${UI.withLaura}</span>`);
    }
    let n = 0;
    for (const t of book.tags) {
      if (t === 'лора') continue;
      parts.push(`<span class="tag">${tagRu[t] || t}</span>`);
      n += 1;
      if (n >= 2) break;
    }
    // Explicit separator so text without CSS is not glued
    const tags = parts.join('<span class="tag-sep"> · </span>');
    return `
      <article class="book-card${book.flagship ? ' is-flagship' : ''}">
        <a class="book-cover has-image clean" href="${bookPageUrl(book.slug)}" aria-label="${book.title}">
          <img src="${coverUrl(book)}" alt="${isEn ? 'Cover' : 'Обложка'}: ${book.title}" loading="lazy" width="600" height="900" />
        </a>
        <div class="book-body">
          <h3 class="book-title"><a href="${bookPageUrl(book.slug)}">${book.title}</a></h3>
          <div class="book-tags">${tags}</div>
          <p>${book.promise}</p>
          <div class="book-actions">
            ${storeButtons(book, true)}
          </div>
          <a class="book-more" href="${bookPageUrl(book.slug)}">${UI.annotation}</a>
        </div>
      </article>`;
  }

  function articleCardHTML(a) {
    return `
      <a class="article-card" href="${articlePageUrl(a.slug)}">
        <div class="cat">${a.category}</div>
        <h3>${a.title}</h3>
        <p>${a.hook}</p>
        <div class="meta">${a.readMin} мин · отрывок и книга →</div>
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
      toggle.setAttribute('aria-label', open ? UI.menuClose : UI.menuOpen);
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
        window.location.href = bookPageUrl(slug) + '#excerpt';
      });
    }

    // Hero stack: fill only if empty (static HTML may already be present)
    const stack = document.getElementById('heroCoverStack');
    if (stack && !stack.querySelector('img')) {
      stack.innerHTML = flagships
        .map(
          (b, i) =>
            `<a class="hero-cover hero-cover-${i}" href="${bookPageUrl(b.slug)}" aria-label="${b.title}">
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
      a.download = (book.excerptFile || (isEn ? `${book.slug}-excerpt.txt` : `${book.slug}-otryvok.txt`)).split('/').pop();
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      // fallback: inline excerpt from data.js
      const text = isEn
        ? `${book.title}\n${book.subtitle}\nAuthor: ${book.authors.join(', ')}\n\n— Excerpt —\n\n${book.excerpt}\n\n© Pol Grek\nFull text — Amazon / LitRes.\n`
        : `${book.title}\n${book.subtitle}\nАвтор: ${book.authors.join(', ')}\n\n— Отрывок —\n\n${book.excerpt}\n\n© Пол Грэк / Pol Grek\nПолный текст — на Литрес.\n`;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = isEn ? `${book.slug}-excerpt.txt` : `${book.slug}-otryvok.txt`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  }

  function renderBookPage() {
    // Static pages (books/{slug}.html) already contain full HTML.
    // Keep light enhancements only (TOC highlight, excerpt load).
    document.body.classList.add('has-sticky-buy', 'page-book');
    const pre = document.getElementById('excerptPreview');
    const path = location.pathname || '';
    const m = path.match(/\/books\/([^/]+)\.html/);
    const slug = m ? m[1] : new URLSearchParams(location.search).get('slug');
    const book = slug ? POL_GREK.getBook(slug) : null;
    if (book && pre) {
      fetch(excerptUrl(book))
        .then((r) => (r.ok ? r.text() : null))
        .then((text) => {
          if (!pre || !text) return;
          const c = text.replace(/^[\s\S]*?— Отрывок —\s*/m, '').replace(/\n—\n[\s\S]*$/, '').trim();
          pre.textContent = c.slice(0, 2200) + (c.length > 2200 ? '…' : '');
        })
        .catch(() => {});
    }
    const toc = document.querySelector('.book-toc');
    if (toc) {
      const links = [...toc.querySelectorAll('a[href^="#"]')];
      const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
      const onScroll = () => {
        let current = sections[0];
        const y = window.scrollY + 120;
        for (const s of sections) {
          if (s.offsetTop <= y) current = s;
        }
        links.forEach((a) => {
          a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function renderLabPage() {
    const grid = document.getElementById('labGrid');
    if (grid && !grid.querySelector('.article-card')) {
      grid.innerHTML = POL_GREK.articles.map(articleCardHTML).join('');
    }
  }

  function renderArticlePage() {
    // Static lab/{slug}.html already has content; no empty JS shell needed.
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

  window.PolSite = { bookCardHTML, articleCardHTML, url, peerLangUrl, isEn, UI };
})();
