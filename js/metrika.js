/**
 * Yandex Metrika helpers (goals + safe wrappers).
 * Counter ID and init live in base-config.js so the tag loads early.
 */
(function () {
  function id() {
    return window.POL_GREK_METRIKA_ID || 0;
  }

  function ready(fn) {
    if (typeof window.ym === 'function' && id()) {
      try {
        fn();
      } catch (e) {
        /* ignore */
      }
    }
  }

  /** Reach a named JS goal (create the same name in Metrika → Goals). */
  function goal(name, params) {
    if (!name) return;
    ready(function () {
      if (params && typeof params === 'object') {
        window.ym(id(), 'reachGoal', name, params);
      } else {
        window.ym(id(), 'reachGoal', name);
      }
    });
  }

  /** Hit with optional URL (SPA-style; optional). */
  function hit(url, opts) {
    ready(function () {
      window.ym(id(), 'hit', url || location.href, opts || {});
    });
  }

  function params(obj) {
    ready(function () {
      window.ym(id(), 'params', obj || {});
    });
  }

  window.PolMetrika = {
    goal: goal,
    hit: hit,
    params: params,
    id: id,
  };
})();
