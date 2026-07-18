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

  /* ---------- Yandex Metrika 110711984 (deferred for LCP/INP) ---------- */
  window.POL_GREK_METRIKA_ID = 110711984;
  var counterId = Number(window.POL_GREK_METRIKA_ID) || 0;
  if (!counterId) return;

  // Queue goals before tag.js loads
  window.PolMetrika = {
    _q: [],
    goal: function (name, params) {
      if (!name) return;
      if (typeof window.ym === 'function') {
        try {
          if (params) window.ym(counterId, 'reachGoal', name, params);
          else window.ym(counterId, 'reachGoal', name);
        } catch (e) {}
      } else {
        this._q.push(['goal', name, params]);
      }
    },
    hit: function (url, opts) {
      if (typeof window.ym === 'function') {
        try {
          window.ym(counterId, 'hit', url || location.href, opts || {});
        } catch (e) {}
      } else {
        this._q.push(['hit', url, opts]);
      }
    },
    params: function (obj) {
      if (typeof window.ym === 'function') {
        try {
          window.ym(counterId, 'params', obj || {});
        } catch (e) {}
      } else {
        this._q.push(['params', obj]);
      }
    },
    id: function () {
      return counterId;
    },
  };

  function loadMetrika() {
    if (window.__polMetrikaLoaded) return;
    window.__polMetrikaLoaded = true;
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
      webvisor: false, // heavy; enable only if needed
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
      trackHash: true,
    });

    // Flush queued goals
    var q = (window.PolMetrika && window.PolMetrika._q) || [];
    for (var i = 0; i < q.length; i++) {
      var item = q[i];
      try {
        if (item[0] === 'goal') window.PolMetrika.goal(item[1], item[2]);
        else if (item[0] === 'hit') window.PolMetrika.hit(item[1], item[2]);
        else if (item[0] === 'params') window.PolMetrika.params(item[1]);
      } catch (e) {}
    }
    if (window.PolMetrika) window.PolMetrika._q = [];

    try {
      var ns = document.createElement('noscript');
      ns.innerHTML =
        '<div><img src="https://mc.yandex.ru/watch/' +
        counterId +
        '" style="position:absolute;left:-9999px" alt="" width="1" height="1" /></div>';
      (document.body || document.documentElement).appendChild(ns);
    } catch (e) {
      /* ignore */
    }
  }

  // After first paint / idle — keeps LCP/INP cleaner
  function scheduleMetrika() {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadMetrika, { timeout: 3500 });
    } else {
      window.setTimeout(loadMetrika, 2000);
    }
  }
  if (document.readyState === 'complete') scheduleMetrika();
  else window.addEventListener('load', scheduleMetrika);
})();
