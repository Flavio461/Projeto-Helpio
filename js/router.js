let config = { routes: [] };

function initRouter(userConfig) {
  config = { ...config, ...userConfig };
}

function navigateTo(path) {
  if (path) location.href = path;
}

function bootstrapPage() {
  const main = document.querySelector('main');
  if (!main) return;

  window.Modal?.initModals?.(); // A variável window é acessível globalmente

  if (document.querySelector('form') && document.querySelector('#cadastro-title')) {
    const formEl = document.querySelector('form');
    window.Masks && window.Masks.initMasks(formEl); // A variável window é acessível globalmente
    window.Validation?.initCadastroFormValidation?.(formEl); // A variável window é acessível globalmente
  }

  if (document.querySelector('.project-list') && document.querySelector('.tags')) {
    window.Projects?.initProjectsFilters?.(); // A variável window é acessível globalmente
  }
}

window.Router = { initRouter, navigateTo, bootstrapPage }; // A variável window é acessível globalmente