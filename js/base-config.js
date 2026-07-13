/**
 * Site base path for links.
 * - Custom domain (polgrek.site): ''  ← current
 * - Project site (user.github.io/polgrek): '/polgrek'
 *
 * Yandex Metrika:
 * 1) Open https://metrika.yandex.ru/list
 * 2) Create / open counter for polgrek.site
 * 3) Paste the numeric counter ID below (e.g. 12345678)
 * 4) In Metrika → Goals, add JavaScript events (see list under init)
 */
(function () {
  // Empty string = site at domain root (polgrek.site)
  var manual = '';

  // Do not use auto-detect: empty manual must stay empty (not fall through to auto)
  window.POL_GREK_BASE = typeof manual === 'string' ? manual : '';

  /**
   * >>> PASTE YOUR COUNTER ID HERE <<<
   * Metrika → counter → Settings (or address bar .../dashboard?id=XXXXXXXX)
   * Leave 0 to disable tracking until ID is set.
   */
  window.POL_GREK_METRIKA_ID = 0;

  var counterId = Number(window.POL_GREK_METRIKA_ID) || 0;
  if (!counterId) {
    return;
  }

  // Official tag.js bootstrap
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
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

  window.ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
    ecommerce: 'dataLayer',
  });

  // noscript pixel for users without JS
  try {
    var ns = document.createElement('noscript');
    ns.innerHTML =
      '<div><img src="https://mc.yandex.ru/watch/' +
      counterId +
      '" style="position:absolute;left:-9999px" alt="" /></div>';
    document.documentElement.appendChild(ns);
  } catch (e) {
    /* ignore */
  }

  /**
   * Goals to create in Metrika (type: JavaScript event), identifiers:
   *   litres            — click Buy / LitRes
   *   amazon            — click Amazon
   *   excerpt_download  — download excerpt .txt
   *   lang_en           — switch to English
   *   lang_ru           — switch to Russian
   *   book_view         — open book page
   *   lab_view          — open lab article
   *   filter_books      — use catalog filter
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
