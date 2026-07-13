/**
 * GitHub Pages base path.
 * - User/org site (username.github.io): leave as ''
 * - Project site (username.github.io/repo-name/): set to '/repo-name'
 *
 * Override automatically from path if possible.
 */
(function () {
  var manual = '/polgrek'; // e.g. '/pol-grek-site'
  var path = window.location.pathname || '/';
  var auto = '';

  // Heuristic: if first segment is not a known site file/folder, treat as repo base
  var known = {
    '': true,
    index.html: true,
    about.html: true,
    books: true,
    lab: true,
    css: true,
    js: true,
    assets: true,
    excerpts: true,
  };
  var parts = path.split('/').filter(Boolean);
  if (parts.length && !known[parts[0]] && parts[0].indexOf('.') === -1) {
    auto = '/' + parts[0];
  }

  window.POL_GREK_BASE = manual || auto || '';
})();
