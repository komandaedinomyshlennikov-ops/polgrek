/**
 * Site base path + theme bootstrap + Yandex Metrika.
 * Theme applies immediately (before paint) to avoid flash.
 */
(function () {
  // Empty string = site at domain root (polgrek.site)
  var manual = '';
  window.POL_GREK_BASE = typeof manual === 'string' ? manual : '';

  /* ---------- Theme (light / dark) ---------- */
  var THEME_KEY = 'pol-grek-theme';

  function systemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function readStoredTheme() {
    try {
      var s = localStorage.getItem(THEME_KEY);
      if (s === 'dark' || s === 'light') return s;
    } catch (e) {
      /* private mode */
    }
    return null;
  }

  function applyTheme(theme) {
    var t = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    try {
      document.documentElement.style.colorScheme = t;
    } catch (e) {
      /* ignore */
    }
    return t;
  }

  var initial = readStoredTheme() || systemTheme();
  applyTheme(initial);

  window.PolTheme = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    },
    set: function (theme) {
      var t = applyTheme(theme);
      try {
        localStorage.setItem(THEME_KEY, t);
      } catch (e) {
        /* ignore */
      }
      try {
        document.dispatchEvent(new CustomEvent('pol-theme-change', { detail: { theme: t } }));
      } catch (e2) {
        /* ignore */
      }
      return t;
    },
    toggle: function () {
      return window.PolTheme.set(window.PolTheme.get() === 'dark' ? 'light' : 'dark');
    },
  };

  /* ---------- Yandex Metrika 110711984 ---------- */
  window.POL_GREK_METRIKA_ID = 110711984;
  var counterId = Number(window.POL_GREK_METRIKA_ID) || 0;
  if (!counterId) return;

  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
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

  try {
    var ns = document.createElement('noscript');
    ns.innerHTML =
      '<div><img src="https://mc.yandex.ru/watch/' +
      counterId +
      '" style="position:absolute;left:-9999px" alt="" /></div>';
    (document.body || document.documentElement).appendChild(ns);
  } catch (e) {
    /* ignore */
  }

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
