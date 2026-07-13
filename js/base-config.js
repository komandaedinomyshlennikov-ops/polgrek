/**
 * Site base path for links.
 * - Custom domain (polgrek.site): ''  ← current
 * - Project site (user.github.io/polgrek): '/polgrek'
 */
(function () {
  // Empty string = site at domain root (polgrek.site)
  var manual = '';

  // Do not use auto-detect: empty manual must stay empty (not fall through to auto)
  window.POL_GREK_BASE = typeof manual === 'string' ? manual : '';
})();
