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
        start: 'By situation',
        books: 'Books',
        lab: 'Lab',
        about: 'About',
        faq: 'FAQ',
        litres: 'LitRes',
        amazon: 'Amazon',
        telegram: 'Telegram',
        threads: 'Threads',
        catalog: 'Open catalog',
        allBooks: 'All books →',
        doorsLabel: 'Find a book for your situation',
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
        footerFollow: 'Follow',
        footerPrivacy: 'Privacy & external links',
        footerLegalNote: 'Not medical advertising. Author showcase — not a clinic.',
        logoAria: 'Pol Grek — home',
        logoSub: 'Pol Grek · brain science',
        door1t: 'Burned out, can’t recover',
        door1s: 'RESET',
        door2t: 'Fog / focus after 40',
        door2s: 'Brain at 100+',
        door3t: 'Constant stress',
        door3s: 'Stress and the Brain',
        door4t: 'Energy & clarity for years',
        door4s: '100+ · Biohacking',
        door5t: 'Money & emotions stuck',
        door5s: 'Wired for Wealth',
        mobileDoor1t: 'Burned out',
        mobileDoor1s: 'RESET',
        mobileDoor2t: 'Fog after 40',
        mobileDoor2s: 'Brain at 100+',
        mobileDoor3t: 'Constant stress',
        mobileDoor3s: 'Stress & the Brain',
        mobileDoor4t: 'Long-term energy',
        mobileDoor4s: '100+ · biohacking',
        mobileDoor5t: 'Money / emotions',
        mobileDoor5s: 'Wired for Wealth',
        excerpt: 'Excerpt',
        annotation: 'About the book',
        buy: 'Buy',
        ebook: 'Ebook',
        startHere: 'Flagship',
        withLaura: 'with Laura Grek',
        withLauraShort: 'with Laura',
        shownOf: (n, total) => `Showing ${n} of ${total}`,
        searchPlaceholder: 'Burnout, sleep, money…',
        searchLabel: 'Search catalog',
        searchClear: 'Clear search',
        searchEmpty: 'No books match. Try another word or reset the topic filter.',
        searchReset: 'Show all books',
        privacy: 'Privacy',
        buyLitres: 'Buy on LitRes',
        fullLitres: 'All titles on LitRes',
        affiliateMark: 'Ad · erid: 2VfnxyNkZrY · LitRes partner link (AdvCake)',
        langRu: 'RU',
        langEn: 'EN',
        langAria: 'Language',
        themeAria: 'Toggle color theme',
        themeToLight: 'Switch to light theme',
        themeToDark: 'Switch to dark theme',
      }
    : {
        skip: 'К содержанию',
        home: 'Главная',
        start: 'По ситуации',
        books: 'Книги',
        lab: 'Лаборатория',
        about: 'Об авторе',
        faq: 'FAQ',
        litres: 'Литрес',
        amazon: 'Amazon',
        telegram: 'Telegram',
        threads: 'Threads',
        catalog: 'Открыть каталог',
        allBooks: 'Все книги →',
        doorsLabel: 'Найдите книгу под свою ситуацию',
        drawerTitle: 'Куда дальше?',
        drawerClose: 'Закрыть',
        menuOpen: 'Открыть меню',
        menuClose: 'Закрыть меню',
        navAria: 'Основная навигация',
        mobileNavAria: 'Мобильная навигация',
        tabAria: 'Быстрые разделы',
        top: 'Наверх',
        footerBrand: 'Научпоп о мозге без эзотерики. Книги — на Литрес.',
        footerSections: 'Разделы',
        footerBuy: 'Читать и купить',
        footerContact: 'Связь',
        footerFollow: 'Читать автора',
        footerPrivacy: 'О внешних ссылках',
        footerLegalNote: 'Не медицинская реклама. Сайт — витрина автора, не клиника.',
        logoAria: 'Пол Грэк — на главную',
        logoSub: 'Pol Grek · нейробиология',
        door1t: 'Выгорел, не восстанавливаюсь',
        door1s: 'RESET',
        door2t: 'Туман / фокус после 40',
        door2s: 'Мозг на 100+',
        door3t: 'Постоянный стресс',
        door3s: 'Стресс и мозг',
        door4t: 'Энергия и ясность на годы',
        door4s: '100+ · Биохакинг',
        door5t: 'Деньги и эмоции «плывут»',
        door5s: 'Мозг и деньги',
        mobileDoor1t: 'Выгорание',
        mobileDoor1s: 'RESET',
        mobileDoor2t: 'Туман после 40',
        mobileDoor2s: 'Мозг на 100+',
        mobileDoor3t: 'Стресс',
        mobileDoor3s: 'Стресс и мозг',
        mobileDoor4t: 'Энергия на годы',
        mobileDoor4s: '100+ · биохакинг',
        mobileDoor5t: 'Деньги / эмоции',
        mobileDoor5s: 'Мозг и деньги',
        excerpt: 'Отрывок',
        annotation: 'О книге',
        buy: 'Купить',
        ebook: 'Электронная',
        startHere: 'Флагман',
        withLaura: 'с Лорой Грэк',
        withLauraShort: 'с Лорой',
        shownOf: (n, total) => `Показано ${n} из ${total}`,
        searchPlaceholder: 'Выгорание, сон, деньги…',
        searchLabel: 'Поиск в каталоге',
        searchClear: 'Очистить поиск',
        searchEmpty: 'Ничего не найдено. Попробуйте другое слово или сбросьте тему.',
        searchReset: 'Показать все книги',
        privacy: 'Конфиденциальность',
        buyLitres: 'Купить на Литрес',
        fullLitres: 'Литрес · все книги автора',
        affiliateMark: 'Реклама · erid: 2VfnxyNkZrY · партнёрская ссылка Литрес (AdvCake)',
        langRu: 'RU',
        langEn: 'EN',
        langAria: 'Язык',
        themeAria: 'Переключить тему',
        themeToLight: 'Включить светлую тему',
        themeToDark: 'Включить тёмную тему',
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
      <a class="lang-btn${!isEn ? ' active' : ''}" href="${peerLangUrl('ru')}" hreflang="ru" lang="ru" data-track="lang_ru">${UI.langRu}</a>
      <a class="lang-btn${isEn ? ' active' : ''}" href="${peerLangUrl('en')}" hreflang="en" lang="en" data-track="lang_en">${UI.langEn}</a>
    </div>`;
  }

  function themeToggleBtn() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const label = dark ? UI.themeToLight : UI.themeToDark;
    return `<button type="button" class="theme-toggle" data-theme-toggle aria-label="${label}" title="${label}">
      <span class="theme-icon-light" aria-hidden="true">☾</span>
      <span class="theme-icon-dark" aria-hidden="true">☀</span>
    </button>`;
  }

  function bindThemeToggle(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', () => {
        if (window.PolTheme && typeof window.PolTheme.toggle === 'function') {
          const next = window.PolTheme.toggle();
          track('theme_' + next, { lang: isEn ? 'en' : 'ru' });
          document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
            const isDark = next === 'dark';
            const lab = isDark ? UI.themeToLight : UI.themeToDark;
            b.setAttribute('aria-label', lab);
            b.setAttribute('title', lab);
          });
        }
      });
    });
  }

  function track(name, params) {
    if (window.PolMetrika && typeof window.PolMetrika.goal === 'function') {
      window.PolMetrika.goal(name, params);
    }
  }

  function bindAnalytics() {
    document.addEventListener(
      'click',
      (e) => {
        const a = e.target.closest('a');
        if (!a || !a.href) return;
        const params = {
          lang: isEn ? 'en' : 'ru',
          path: location.pathname,
        };
        if (a.dataset.book) params.book = a.dataset.book;

        // Explicit data-track wins
        const tracked = a.getAttribute('data-track');
        if (tracked) {
          track(tracked, params);
          return;
        }

        // Static HTML buttons without data-track
        const href = a.href;
        if (/litres\.ru/i.test(href)) {
          track('litres', params);
          return;
        }
        if (/t\.me\//i.test(href) || /telegram\.me\//i.test(href)) {
          track('telegram', params);
          return;
        }
        if (/threads\.net\//i.test(href)) {
          track('threads', params);
          return;
        }
        if (/amazon\.[a-z.]+\/(?:dp|gp\/product)\//i.test(href)) {
          track('amazon', params);
          return;
        }
        if (a.hasAttribute('download') && /excerpt|otryvok/i.test(href + (a.download || ''))) {
          track('excerpt_download', params);
        }
      },
      true
    );
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

  function siteLinks() {
    const L = (window.POL_GREK && POL_GREK.links) || {};
    return {
      litres: litresAuthorUrl(),
      litresRel: litresRel(),
      telegram: L.telegram || 'https://t.me/+KGQgs6MVHHYwZGVi',
      threads: L.threads || 'https://www.threads.net/@pol.grek',
    };
  }

  function headerHTML(active) {
    const S = siteLinks();
    const d1 = url('/books/reset.html');
    const d2 = url('/books/mozg-na-100.html');
    const d3 = url('/books/stress-i-mozg.html');
    const d4 = url('/books/mozg-na-100.html');
    const d5 = url('/books/mozg-i-dengi.html');
    const doors = `
      <div class="nav-dropdown" data-dropdown>
        <button type="button" class="nav-drop-btn" aria-expanded="false" aria-haspopup="true" data-drop-toggle>
          ${UI.start}
          <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="nav-drop-panel" role="menu">
          <a role="menuitem" href="${d1}"><strong>${UI.door1t}</strong><span>${UI.door1s}</span></a>
          <a role="menuitem" href="${d2}"><strong>${UI.door2t}</strong><span>${UI.door2s}</span></a>
          <a role="menuitem" href="${d3}"><strong>${UI.door3t}</strong><span>${UI.door3s}</span></a>
          <a role="menuitem" href="${d4}"><strong>${UI.door4t}</strong><span>${UI.door4s}</span></a>
          <a role="menuitem" href="${d5}"><strong>${UI.door5t}</strong><span>${UI.door5s}</span></a>
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
            ${themeToggleBtn()}
            <div class="nav-social" aria-label="${UI.footerFollow}">
              <a class="nav-social-link" href="${S.telegram}" target="_blank" rel="noopener" data-track="telegram" title="${UI.telegram}" aria-label="${UI.telegram}">TG</a>
              <a class="nav-social-link" href="${S.threads}" target="_blank" rel="noopener" data-track="threads" title="${UI.threads}" aria-label="${UI.threads}">Th</a>
            </div>
            <a class="btn btn-outline nav-cta-secondary" href="${S.litres}" target="_blank" rel="${S.litresRel}" data-track="litres">${UI.litres}</a>
            <a class="btn btn-primary nav-cta" href="${url('/books/index.html')}">${UI.books}</a>
          </div>
          <div class="nav-mobile-tools">
            ${langSwitcher()}
            ${themeToggleBtn()}
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
          <div class="mobile-lang-row">${langSwitcher()}${themeToggleBtn()}</div>
          <nav class="mobile-drawer-nav" aria-label="${UI.mobileNavAria}">
            <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}">🏠 ${UI.home}</a>
            <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}">📚 ${UI.books}</a>
            <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}">🧪 ${UI.lab}</a>
            <a href="${url('/about.html')}" class="${active === 'about' ? 'active' : ''}">👤 ${UI.about}</a>
            <a href="${url('/index.html')}#faq">❓ ${UI.faq}</a>
          </nav>
          <p class="mobile-drawer-label">${UI.doorsLabel}</p>
          <div class="mobile-door-list">
            <a href="${d1}"><strong>${UI.mobileDoor1t}</strong><span>${UI.mobileDoor1s}</span></a>
            <a href="${d2}"><strong>${UI.mobileDoor2t}</strong><span>${UI.mobileDoor2s}</span></a>
            <a href="${d3}"><strong>${UI.mobileDoor3t}</strong><span>${UI.mobileDoor3s}</span></a>
            <a href="${d4}"><strong>${UI.mobileDoor4t}</strong><span>${UI.mobileDoor4s}</span></a>
            <a href="${d5}"><strong>${UI.mobileDoor5t}</strong><span>${UI.mobileDoor5s}</span></a>
          </div>
          <div class="mobile-drawer-cta">
            <a class="btn btn-primary" href="${url('/books/index.html')}">${UI.catalog}</a>
            <a class="btn btn-outline" href="${S.litres}" target="_blank" rel="${S.litresRel}" data-track="litres">${UI.litres}</a>
            <a class="btn btn-outline" href="${S.telegram}" target="_blank" rel="noopener" data-track="telegram">${UI.telegram}</a>
            <a class="btn btn-outline" href="${S.threads}" target="_blank" rel="noopener" data-track="threads">${UI.threads}</a>
          </div>
        </div>
      </div>
      <nav class="mobile-tabbar" aria-label="${UI.tabAria}">
        <a href="${url('/index.html')}" class="${active === 'home' ? 'active' : ''}"><span aria-hidden="true">🏠</span>${UI.home}</a>
        <a href="${url('/books/index.html')}" class="${active === 'books' ? 'active' : ''}"><span aria-hidden="true">📚</span>${UI.books}</a>
        <a href="${url('/lab/index.html')}" class="${active === 'lab' ? 'active' : ''}"><span aria-hidden="true">🧪</span>${isEn ? 'Lab' : 'Лаб'}</a>
        <a href="${S.telegram}" target="_blank" rel="noopener" data-track="telegram" aria-label="${UI.telegram}"><span aria-hidden="true">✈️</span>TG</a>
        <a href="${S.litres}" target="_blank" rel="${S.litresRel}" data-track="litres" aria-label="${UI.litres}"><span aria-hidden="true">🛒</span>${UI.litres}</a>
      </nav>
      <button type="button" class="back-to-top" id="backToTop" aria-label="${UI.top}" hidden>↑</button>`;
  }

  function footerHTML() {
    const legal = (window.POL_GREK && POL_GREK.legal) || {};
    const email = legal.email || 'hello@polgrek.site';
    const name = isEn ? 'Pol Grek' : 'Пол Грэк';
    const S = siteLinks();
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
            <a href="${S.litres}" target="_blank" rel="${S.litresRel}" data-track="litres">${UI.fullLitres}</a>
          </div>
          <div>
            <h4>${UI.footerFollow}</h4>
            <a href="${S.telegram}" target="_blank" rel="noopener" data-track="telegram">${UI.telegram}</a>
            <a href="${S.threads}" target="_blank" rel="noopener" data-track="threads">${UI.threads} · @pol.grek</a>
            <a href="mailto:${email}">${email}</a>
            <a href="${url('/privacy.html')}">${UI.footerPrivacy}</a>
          </div>
        </div>
        <div class="container footer-legal">
          <p>${legal.disclaimer || ''}</p>
          <p>${legal.privacy || ''}</p>
          <p class="affiliate-mark">${UI.affiliateMark || ''}</p>
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

  /** Direct LitRes URL (for schema / non-buy references). Strip tracking query. */
  function litresDirect(bookOrUrl) {
    if (!bookOrUrl) return '';
    let u = typeof bookOrUrl === 'string' ? bookOrUrl : bookOrUrl.litres || '';
    return String(u).replace(/\?[\s\S]*$/, '').trim();
  }

  /** Escape URL for HTML attribute (JS-built cards). */
  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /** Sub1 token: never allow & or = that would split the query. */
  function affiliateSub1(label) {
    return String(label || '')
      .trim()
      .replace(/[^a-zA-Z0-9._-]+/g, '_')
      .slice(0, 80);
  }

  /**
   * Build AdvCake litres deep link.
   * Structured query (urlencode-equivalent) so hyphenated slugs stay intact:
   * sub1=stress-i-mozg  — NOT sub1=stres&mozg=
   */
  function applyAffiliateTemplate(tpl, direct, sub1) {
    const base = litresDirect(direct);
    if (!base) return base;
    const label = affiliateSub1(sub1);
    const t = String(tpl || '');

    // Default AdvCake manual generator shape → build with URLSearchParams
    if (!t || (t.indexOf('{url}') !== -1 && t.indexOf('utm_source=advcake') !== -1)) {
      let content = 'f71f3ad5';
      let erid = '2VfnxyNkZrY';
      let keyword = 'polgrek / site';
      const mc = t.match(/utm_content=([^&{]+)/);
      if (mc) content = mc[1];
      const me = t.match(/erid=([^&{]+)/);
      if (me) erid = me[1];
      const mk = t.match(/keyword=([^&{]+)/);
      if (mk) {
        try {
          keyword = decodeURIComponent(mk[1].replace(/\+/g, ' '));
        } catch (_) {
          keyword = mk[1];
        }
      }
      const q = new URLSearchParams();
      q.set('utm_source', 'advcake');
      q.set('utm_medium', 'cpa');
      q.set('utm_campaign', 'affiliate');
      q.set('utm_content', content);
      q.set('advcake_params', '');
      q.set('utm_term', '');
      q.set('sub1', label);
      q.set('keyword', keyword);
      q.set('erid', erid);
      q.set('advcake_method', '1');
      q.set('m', '1');
      return base + '?' + q.toString();
    }

    let out = t;
    if (out.indexOf('{url_enc}') !== -1) {
      out = out.split('{url_enc}').join(encodeURIComponent(base));
    }
    if (out.indexOf('{url}') !== -1) {
      out = out.split('{url}').join(base);
    }
    if (out.indexOf('{sub1}') !== -1) {
      out = out.split('{sub1}').join(encodeURIComponent(label));
    }
    return out;
  }

  /**
   * Buy URL: AdvCake partner deep link when affiliate.enabled, else plain LitRes.
   */
  function litresBuyUrl(bookOrUrl, slug) {
    const direct = litresDirect(bookOrUrl);
    const aff = (window.POL_GREK && window.POL_GREK.affiliate) || {};
    if (!aff.enabled) return direct;

    const s =
      slug ||
      (bookOrUrl && typeof bookOrUrl === 'object' ? bookOrUrl.slug : '') ||
      '';
    const bySlug = aff.bySlug || {};
    if (s && bySlug[s]) return bySlug[s];

    const tpl = (aff.template || '').trim();
    if (tpl && direct) {
      return applyAffiliateTemplate(tpl, direct, s);
    }
    return direct;
  }

  function litresAuthorUrl() {
    const L = (window.POL_GREK && window.POL_GREK.links) || {};
    const aff = (window.POL_GREK && window.POL_GREK.affiliate) || {};
    const direct = L.litresAuthor || 'https://www.litres.ru/author/pol-grek/';
    if (aff.enabled && aff.authorUrl) return aff.authorUrl;
    if (aff.enabled && aff.template) {
      return applyAffiliateTemplate(aff.template, direct, aff.authorSub1 || 'author');
    }
    return direct;
  }

  function litresRel() {
    const aff = (window.POL_GREK && window.POL_GREK.affiliate) || {};
    return aff.enabled ? 'noopener sponsored' : 'noopener';
  }

  function storeButtons(book, compact) {
    const amzOk = hasAmazonProduct(book);
    const buy = escapeAttr(litresBuyUrl(book));
    const rel = litresRel();
    const buyLabel = UI.buyLitres || UI.buy;
    // Under each catalog card: full-width affiliate Buy (LitRes AdvCake)
    const amzLink = amzOk
      ? `<a class="book-amazon-link" href="${escapeAttr(book.amazon)}" target="_blank" rel="noopener" data-track="amazon" data-book="${book.slug}">${UI.amazon}</a>`
      : '';
    return `
      <div class="book-card-cta">
        <a class="btn btn-primary book-card-buy" href="${buy}" target="_blank" rel="${rel}" data-track="litres" data-book="${book.slug}">${buyLabel}</a>
        <div class="book-card-links">
          <a class="book-more" href="${bookPageUrl(book.slug)}">${UI.annotation}</a>
          ${amzLink}
        </div>
        <p class="affiliate-mark affiliate-mark--card">${UI.affiliateMark || ''}</p>
      </div>`;
  }

  function bookCardMeta(book) {
    const tagRu = isEn
      ? {
          'cognitive-health': 'cognitive health',
          biohacking: 'biohacking',
          energy: 'energy',
          stress: 'stress',
          burnout: 'burnout',
          money: 'money',
          hormones: 'hormones',
          'когнитивное-здоровье': 'cognitive health',
          биохакинг: 'biohacking',
          энергия: 'energy',
          стресс: 'stress',
          выгорание: 'burnout',
          деньги: 'money',
          гормоны: 'hormones',
        }
      : {
          'когнитивное-здоровье': 'когнитивное здоровье',
          биохакинг: 'биохакинг',
          энергия: 'энергия',
          стресс: 'стресс',
          выгорание: 'выгорание',
          деньги: 'деньги',
          гормоны: 'гормоны',
        };
    const bits = [UI.ebook];
    for (const t of book.tags || []) {
      if (t === 'лора' || t === 'laura') continue;
      bits.push(tagRu[t] || t);
      break;
    }
    if ((book.authors || []).length > 1) bits.push(UI.withLauraShort);
    return bits.join(' · ');
  }

  function filterSafeId(fid) {
    const map = {
      all: 'all',
      стресс: 'stress',
      'когнитивное-здоровье': 'cog',
      деньги: 'money',
      гормоны: 'hormones',
      выгорание: 'burnout',
      лора: 'laura',
      биохакинг: 'bio',
      stress: 'stress',
      'cognitive-health': 'cog',
      money: 'money',
      hormones: 'hormones',
      burnout: 'burnout',
      laura: 'laura',
      biohacking: 'bio',
    };
    return map[fid] || String(fid || 'x').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function bookDataShow(book) {
    const tokens = ['all'];
    const seen = { all: true };
    (POL_GREK.filters || []).forEach((f) => {
      if (!f || f.id === 'all') return;
      let ok = false;
      try {
        ok = f.match ? f.match(book) : (book.tags || []).includes(f.id);
      } catch (e) {
        ok = false;
      }
      if (ok) {
        const t = filterSafeId(f.id);
        if (!seen[t]) {
          tokens.push(t);
          seen[t] = true;
        }
      }
    });
    return tokens.join(' ');
  }

  function bookCardHTML(book, opts = {}) {
    const badges = [];
    if (book.flagship) {
      badges.push(`<span class="book-badge book-badge-key">${UI.startHere}</span>`);
    }
    if ((book.authors || []).length > 1) {
      badges.push(`<span class="book-badge book-badge-co">${UI.withLauraShort}</span>`);
    }
    const badgeHtml = badges.length
      ? `<div class="book-cover-badges">${badges.join('')}</div>`
      : '';
    const show = bookDataShow(book);
    const title = escapeAttr(book.title || '');
    const promise = escapeAttr(book.promise || '');
    const whom = (book.forWhom && book.forWhom[0]) || book.problem || '';
    const chip = whom
      ? `<p class="book-card-chip">${escapeAttr(String(whom).slice(0, 90))}</p>`
      : '';
    return `
      <article class="book-card book-card--tile${book.flagship ? ' is-flagship' : ''}" data-show="${show}">
        <a class="book-cover has-image clean" href="${bookPageUrl(book.slug)}" aria-label="${title}">
          <img src="${coverUrl(book)}" alt="${isEn ? 'Cover' : 'Обложка'}: ${title}" loading="lazy" width="600" height="900" />
          ${badgeHtml}
        </a>
        <div class="book-body">
          <h3 class="book-title"><a href="${bookPageUrl(book.slug)}">${title}</a></h3>
          ${chip}
          <p class="book-card-promise">${promise}</p>
          <p class="book-card-meta">${escapeAttr(bookCardMeta(book))}</p>
        </div>
        ${storeButtons(book, true)}
      </article>`;
  }

  function articleCardHTML(a) {
    const meta = isEn
      ? `${a.readMin} min · excerpt & book →`
      : `${a.readMin} мин · отрывок и книга →`;
    const cat = escapeAttr(a.category || '');
    const catSlug = String(a.category || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-zа-я0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 32);
    return `
      <a class="article-card" href="${articlePageUrl(a.slug)}" data-cat="${catSlug}">
        <div class="cat">${cat}</div>
        <h3>${escapeAttr(a.title || '')}</h3>
        <p>${escapeAttr(a.hook || '')}</p>
        <div class="meta">${meta}</div>
      </a>`;
  }

  function mountShell(active) {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.outerHTML = headerHTML(active);
    if (footerMount) footerMount.outerHTML = footerHTML();
    bindThemeToggle(document);

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

    // Desktop dropdown — click + keyboard (Escape / ArrowDown focus first link)
    document.querySelectorAll('[data-dropdown]').forEach((drop) => {
      const btn = drop.querySelector('[data-drop-toggle]');
      if (!btn) return;
      const menu =
        drop.querySelector('[data-drop-menu]') ||
        drop.querySelector('.nav-drop-panel') ||
        drop.querySelector('.nav-drop-menu');
      const setOpen = (open) => {
        drop.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open && menu) {
          const first = menu.querySelector('a');
          if (first) first.focus();
        }
      };
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !drop.classList.contains('open');
        document.querySelectorAll('[data-dropdown].open').forEach((other) => {
          if (other !== drop) {
            other.classList.remove('open');
            const b = other.querySelector('[data-drop-toggle]');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
        setOpen(willOpen);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      });
      if (menu) {
        menu.addEventListener('keydown', (e) => {
          const links = [...menu.querySelectorAll('a')];
          const i = links.indexOf(document.activeElement);
          if (e.key === 'ArrowDown' && i >= 0 && i < links.length - 1) {
            e.preventDefault();
            links[i + 1].focus();
          } else if (e.key === 'ArrowUp' && i > 0) {
            e.preventDefault();
            links[i - 1].focus();
          } else if (e.key === 'ArrowUp' && i === 0) {
            e.preventDefault();
            btn.focus();
            setOpen(false);
          } else if (e.key === 'Escape') {
            e.preventDefault();
            setOpen(false);
            btn.focus();
          } else if (e.key === 'Tab' && !e.shiftKey && i === links.length - 1) {
            setOpen(false);
          }
        });
      }
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

  /* Neural canvas disabled — Quiet Lab premium direction */
  function initNeuralCanvas(canvas) {
    if (canvas) canvas.style.display = 'none';
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
            <a class="rating-card" href="${book ? litresBuyUrl(book) : sp.sourceUrl}" target="_blank" rel="${book ? litresRel() : 'noopener'}">
              <div class="rating-stars" aria-label="Оценка ${item.rating}">${'★'.repeat(5)}</div>
              <strong>${item.rating.toFixed(1)}</strong>
              <span class="rating-book">${item.book}</span>
              <span class="rating-meta">${(function (n) {
                n = Math.abs(n) % 100;
                const n1 = n % 10;
                let word = 'оценок';
                if (!(n > 10 && n < 20)) {
                  if (n1 === 1) word = 'оценка';
                  else if (n1 >= 2 && n1 <= 4) word = 'оценки';
                }
                if (isEn) {
                  const w = n === 1 ? 'rating' : 'ratings';
                  return item.votes + ' ' + w + ' · view on LitRes →';
                }
                return item.votes + ' ' + word + ' · смотреть на Литрес →';
              })(item.votes)}</span>
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

  function bookSearchHaystack(book) {
    const parts = [
      book.title,
      book.subtitle,
      book.promise,
      book.annotation,
      book.series,
      book.slug,
      ...(book.authors || []),
      ...(book.tags || []),
      ...(book.forWhom || []),
      ...(book.takeaways || []),
    ];
    return parts
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/ё/g, 'е');
  }

  function bookMatchesQuery(book, rawQ) {
    const q = String(rawQ || '')
      .trim()
      .toLowerCase()
      .replace(/ё/g, 'е');
    if (!q) return true;
    const hay = bookSearchHaystack(book);
    const terms = q.split(/\s+/).filter(Boolean);
    return terms.every((t) => hay.includes(t));
  }

  function renderBooksPage() {
    document.documentElement.classList.add('js');
    const grid = document.getElementById('booksGrid');
    const filtersEl = document.getElementById('bookFilters');
    if (!grid || !filtersEl) return;

    const searchInput = document.getElementById('catalogSearch');
    const searchClear = document.getElementById('catalogSearchClear');
    const emptyEl = document.getElementById('catalogEmpty');

    // Neutralize no-JS CSS filters: they use display:none on .book-card and can
    // hide the whole grid (and Buy buttons) after JS repaints — e.g. restored radio.
    try {
      document.querySelectorAll('.nsf-input').forEach((r) => {
        r.checked = false;
        r.disabled = true;
      });
      const nsfAll = document.getElementById('nsf-all');
      if (nsfAll) {
        nsfAll.disabled = false;
        nsfAll.checked = true;
      }
    } catch (e) {
      /* ignore */
    }

    // URL: ?filter= + ?q=
    let active = 'all';
    let query = '';
    try {
      const params = new URLSearchParams(location.search);
      const urlFilter = params.get('filter');
      if (urlFilter && POL_GREK.filters.some((f) => f.id === urlFilter)) {
        active = urlFilter;
      }
      query = (params.get('q') || '').trim();
    } catch (e) {
      /* ignore */
    }

    if (searchInput) {
      searchInput.placeholder = UI.searchPlaceholder || searchInput.placeholder;
      searchInput.setAttribute('aria-label', UI.searchLabel || 'Search');
      if (query) searchInput.value = query;
    }
    if (searchClear) {
      searchClear.setAttribute('aria-label', UI.searchClear || 'Clear');
      searchClear.title = UI.searchClear || 'Clear';
    }

    function syncUrl() {
      try {
        const u = new URL(location.href);
        if (active === 'all') u.searchParams.delete('filter');
        else u.searchParams.set('filter', active);
        if (!query) u.searchParams.delete('q');
        else u.searchParams.set('q', query);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch (err) {
        /* ignore */
      }
    }

    function listForFilter(filterId) {
      if (filterId === 'all') return POL_GREK.books.slice();
      return POL_GREK.books.filter((b) => {
        const f = POL_GREK.filters.find((x) => x.id === filterId);
        return f && f.match ? f.match(b) : (b.tags || []).includes(filterId);
      });
    }

    function filterCount(f) {
      // Counts reflect current search query (if any) within each topic
      const base = listForFilter(f.id);
      return base.filter((b) => bookMatchesQuery(b, query)).length;
    }

    function paintFilters() {
      filtersEl.innerHTML = POL_GREK.filters
        .map((f) => {
          const n = filterCount(f);
          return `<button type="button" class="filter-btn${f.id === active ? ' active' : ''}" data-filter="${f.id}"><span class="filter-label">${f.label}</span><span class="filter-count">${n}</span></button>`;
        })
        .join('');
    }

    function paint() {
      let list = listForFilter(active).filter((b) => bookMatchesQuery(b, query));
      // Always paint from data.js so new books appear even if static HTML is cached
      if (list.length) {
        grid.innerHTML = list.map((b) => bookCardHTML(b)).join('');
        grid.hidden = false;
        if (emptyEl) emptyEl.hidden = true;
      } else {
        grid.innerHTML = '';
        grid.hidden = true;
        if (emptyEl) {
          emptyEl.hidden = false;
          const msg = emptyEl.querySelector('[data-empty-msg]');
          if (msg) msg.textContent = UI.searchEmpty || msg.textContent;
        }
      }

      const count = document.getElementById('booksCount') || document.getElementById('catalogCount');
      if (count) {
        const total = POL_GREK.books.length;
        let label =
          typeof UI.shownOf === 'function'
            ? UI.shownOf(list.length, total)
            : isEn
              ? `Showing ${list.length} of ${total}`
              : `Показано ${list.length} из ${total}`;
        if (query) {
          label += isEn ? ` · “${query}”` : ` · «${query}»`;
        }
        count.textContent = label;
      }

      if (searchClear) {
        searchClear.hidden = !query;
      }
      paintFilters();
    }

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      active = btn.dataset.filter;
      syncUrl();
      track('filter_books', { filter: active, q: query || undefined, lang: isEn ? 'en' : 'ru' });
      paint();
    });

    let searchTimer = null;
    function applySearch(raw, { trackEvent } = {}) {
      query = String(raw || '').trim();
      syncUrl();
      paint();
      if (trackEvent && query.length >= 2) {
        track('catalog_search', { q: query, lang: isEn ? 'en' : 'ru' });
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => applySearch(searchInput.value, { trackEvent: true }), 180);
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          applySearch('');
          searchInput.blur();
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        applySearch('');
        if (searchInput) searchInput.focus();
      });
    }

    if (emptyEl) {
      emptyEl.addEventListener('click', (e) => {
        const reset = e.target.closest('[data-catalog-reset]');
        if (!reset) return;
        active = 'all';
        query = '';
        if (searchInput) searchInput.value = '';
        syncUrl();
        paint();
      });
    }

    paint();
  }

  async function downloadExcerpt(book) {
    track('excerpt_download', { book: book.slug, lang: isEn ? 'en' : 'ru' });
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

  /** Split excerpt text into prose paragraphs for mobile-friendly reading. */
  function fillExcerptProse(root, text) {
    if (!root) return;
    const max = 2400;
    let t = String(text || '').trim();
    if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, '') + '…';
    let parts = t.split(/\n\s*\n+/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
    if (parts.length <= 1) {
      const lines = t.split(/\n/).map((l) => l.trim()).filter(Boolean);
      parts = [];
      let buf = [];
      for (const ln of lines) {
        buf.push(ln);
        if (buf.join(' ').length > 220) {
          parts.push(buf.join(' '));
          buf = [];
        }
      }
      if (buf.length) parts.push(buf.join(' '));
    }
    const previewN = 4;
    const head = parts.slice(0, previewN);
    const rest = parts.slice(previewN);
    root.classList.add('excerpt-prose');
    root.innerHTML = head.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
    let more = document.getElementById('excerptPreviewMore');
    let details = root.closest('.excerpt-reader')?.querySelector('.excerpt-more');
    if (rest.length) {
      if (!details) {
        const reader = root.closest('.excerpt-reader') || root.parentElement;
        details = document.createElement('details');
        details.className = 'excerpt-more';
        details.innerHTML = `<summary>${isEn ? 'Show more of the excerpt' : 'Показать ещё текст отрывка'}</summary><div class="excerpt-prose excerpt-prose-rest" id="excerptPreviewMore"></div>`;
        if (reader) reader.appendChild(details);
        more = details.querySelector('#excerptPreviewMore');
      }
      if (more) more.innerHTML = rest.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
      if (details) details.hidden = false;
    } else if (details) {
      details.hidden = true;
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
          const c = text
            .replace(/^[\s\S]*?— (?:Отрывок|Excerpt) —\s*/im, '')
            .replace(/\n—\n[\s\S]*$/, '')
            .trim();
          fillExcerptProse(pre, c);
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
    const grid = document.getElementById('labGrid') || document.getElementById('articlesGrid');
    if (!grid) return;
    grid.classList.add('articles-grid--editorial');
    // Always refresh so new articles appear even if old static cards exist
    grid.innerHTML = POL_GREK.articles.map(articleCardHTML).join('');
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
    bindAnalytics();

    // Page-level goals for Metrika reports
    if (page === 'book') {
      const m = (location.pathname || '').match(/\/books\/([^/]+)\.html/);
      const slug = m ? m[1] : '';
      track('book_view', { book: slug, lang: isEn ? 'en' : 'ru' });
    }
    if (page === 'article') {
      const m = (location.pathname || '').match(/\/lab\/([^/]+)\.html/);
      track('lab_view', { article: m ? m[1] : '', lang: isEn ? 'en' : 'ru' });
    }
    if (window.PolMetrika && typeof window.PolMetrika.params === 'function') {
      window.PolMetrika.params({
        lang: isEn ? 'en' : 'ru',
        page: page,
      });
    }

    if (page === 'home') renderHome();
    if (page === 'books') renderBooksPage();
    if (page === 'book') renderBookPage();
    if (page === 'lab') renderLabPage();
    if (page === 'article') renderArticlePage();
    if (page === 'about') renderAboutPage();

    // Home doors: collapse extras on mobile; always expanded on desktop
    const doorsMore = document.querySelectorAll('details.doors-more');
    if (doorsMore.length) {
      const mq = window.matchMedia('(min-width: 801px)');
      const syncDoors = () => {
        doorsMore.forEach((el) => {
          el.open = mq.matches;
        });
      };
      syncDoors();
      if (mq.addEventListener) mq.addEventListener('change', syncDoors);
      else if (mq.addListener) mq.addListener(syncDoors);
    }
  });

  window.PolSite = { bookCardHTML, articleCardHTML, url, peerLangUrl, isEn, UI, track };
})();
