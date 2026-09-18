/* Tema giorno/notte.
   - default: dark (tema reale di Learnn)
   - persistenza: localStorage['theme']
   - il tema è applicato su <html data-theme> PRIMA del paint (script inline in <head>, vedi theme-init)
   - questo file gestisce solo i toggle [data-theme-toggle] */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem(KEY, theme); } catch (e) { /* storage non disponibile */ }
    sync();
  }

  function sync() {
    var isLight = current() === 'light';
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-pressed', String(isLight));
      toggles[i].setAttribute('aria-label', isLight ? 'Attiva tema scuro' : 'Attiva tema chiaro');
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    apply(current() === 'light' ? 'dark' : 'light');
  });

  sync();
})();
