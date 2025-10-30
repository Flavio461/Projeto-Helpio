(function () {
  var THEME_KEY = 'helpio:theme'; // 'dark' | 'light' | '' - Chave para o modo escuro
  var CONTRAST_KEY = 'helpio:contrast'; // 'high' | '' - Chave para o alto contraste

  function init() {
    try { // Aplica as preferências armazenadas
      var theme = localStorage.getItem(THEME_KEY) || '';
      var contrast = localStorage.getItem(CONTRAST_KEY) || '';
      if (theme) document.documentElement.setAttribute('data-theme', theme);
      if (contrast) document.documentElement.setAttribute('data-contrast', contrast);
    } catch {}

    var darkBtns = document.querySelectorAll('[data-theme-toggle="dark"]'); // Botão do modo escuro
    var contrastBtns = document.querySelectorAll('[data-contrast-toggle="high"]'); // Botão do alto contraste

    if (darkBtns && darkBtns.length) {
      darkBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          setTheme(isDark ? '' : 'dark');
        });
      });
    }

    if (contrastBtns && contrastBtns.length) {
      contrastBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
          setContrast(isHigh ? '' : 'high');
        });
      });
    }

    syncButtonStates();
    wireNavAria();
  }

  function setTheme(mode) { // Define o modo escuro
    if (mode) {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem(THEME_KEY, mode); } catch {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.removeItem(THEME_KEY); } catch {}
    }
    syncButtonStates();
  }

  function setContrast(level) { // Define o nível de alto contraste
    if (level) {
      document.documentElement.setAttribute('data-contrast', level);
      try { localStorage.setItem(CONTRAST_KEY, level); } catch {}
    } else {
      document.documentElement.removeAttribute('data-contrast');
      try { localStorage.removeItem(CONTRAST_KEY); } catch {}
    }
    syncButtonStates();
  }

  function syncButtonStates() { // Sincroniza os estados dos botões (dentro e fora do menu)
    var darkBtns = document.querySelectorAll('[data-theme-toggle="dark"]');
    var contrastBtns = document.querySelectorAll('[data-contrast-toggle="high"]');
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
    if (darkBtns && darkBtns.length) darkBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(isDark)); });
    if (contrastBtns && contrastBtns.length) contrastBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(isHigh)); });
  }

  function wireNavAria() {
    var toggle = document.querySelector('.nav-toggle');
    var label = document.querySelector('.nav-toggle-label');
    var list = document.querySelector('.nav-list');
    if (toggle && label && list) {
      var id = list.id || 'nav-list';
      if (!list.id) list.id = id;
      label.setAttribute('aria-controls', id);
      var setExpanded = function () { label.setAttribute('aria-expanded', String(!!toggle.checked)); };
      toggle.addEventListener('change', setExpanded);
      setExpanded();
    }
  }

  window.Theme = { init: init, setTheme: setTheme, setContrast: setContrast };
  document.addEventListener('DOMContentLoaded', init);
})();


