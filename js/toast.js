(function () {
  let container;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, type = 'success', timeoutMs = 3000) {
    const root = ensureContainer();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    root.appendChild(el);
    void el.offsetWidth;
    el.classList.add('show');
    const timer = setTimeout(() => close(), timeoutMs);
    function close() {
      clearTimeout(timer);
      el.classList.remove('show');
      setTimeout(() => el.remove(), 200);
    }
    el.addEventListener('click', close);
  }

  window.Toast = { showToast }; // A variável window é acessível globalmente
})();

