/**
 * Site base path for links.
 * - Custom domain (polgrek.site): ''  ← current
 * - Project site (user.github.io/polgrek): '/polgrek'
 *
 * Yandex Metrika counter 110711984 (polgrek.site)
 * Goals: see METRIKA.md
 */
(function () {
  // Empty string = site at domain root (polgrek.site)
  var manual = '';

  // Do not use auto-detect: empty manual must stay empty (not fall through to auto)
  window.POL_GREK_BASE = typeof manual === 'string' ? manual : '';

  /** Yandex Metrika counter ID */
  window.POL_GREK_METRIKA_ID = 110711984;

  var counterId = Number(window.POL_GREK_METRIKA_ID) || 0;
  if (!counterId) {
    return;
  }

  // Official tag.js bootstrap (id in query matches cabinet snippet)
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]);
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + counterId, 'ym');

  window.ym(counterId, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
    trackHash: true,
  });

  // noscript pixel
  try {
    var ns = document.createElement('noscript');
    ns.innerHTML =
      '<div><img src="https://mc.yandex.ru/watch/' +
      counterId +
      '" style="position:absolute;left:-9999px" alt="" /></div>';
    // Prefer body when available; html fallback for early script in head
    var parent = document.body || document.documentElement;
    parent.appendChild(ns);
  } catch (e) {
    /* ignore */
  }

  /**
   * JS goals (create in Metrika → Goals → JavaScript event):
   * litres, amazon, excerpt_download, lang_en, lang_ru,
   * book_view, lab_view, filter_books
   */
  window.PolMetrika = {
    goal: function (name, params) {
      if (!name || !counterId || typeof window.ym !== 'function') return;
      try {
        if (params) window.ym(counterId, 'reachGoal', name, params);
        else window.ym(counterId, 'reachGoal', name);
      } catch (e) {
        /* ignore */
      }
    },
    hit: function (url, opts) {
      if (!counterId || typeof window.ym !== 'function') return;
      try {
        window.ym(counterId, 'hit', url || location.href, opts || {});
      } catch (e) {
        /* ignore */
      }
    },
    params: function (obj) {
      if (!counterId || typeof window.ym !== 'function') return;
      try {
        window.ym(counterId, 'params', obj || {});
      } catch (e) {
        /* ignore */
      }
    },
    id: function () {
      return counterId;
    },
  };
})();
