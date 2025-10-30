function initGlobal() {
  window.Router?.initRouter?.({
    routes: [
      { path: 'index.html', title: 'Helpio — Plataforma para ONGs' },
      { path: 'projetos.html', title: 'Projetos — Helpio' },
      { path: 'cadastro.html', title: 'Cadastro — Helpio' },
    ],
  });
  window.Modal?.initModals?.(); // As interrogações servem para evitar erros se a função não estiver definida
  window.Router?.bootstrapPage?.(); // As interrogações servem para evitar erros se a função não estiver definida

  const cadastroTitle = document.getElementById('cadastro-title');
  const formEl = document.querySelector('form');
  if (cadastroTitle && formEl) {
    window.Masks && window.Masks.initMasks(formEl);
    window.Validation?.initCadastroFormValidation?.(formEl);
  }


  window.Panel?.injectCadastrosModal?.(); // As interrogações servem para evitar erros se a função não estiver definida
  window.Panel?.initCadastrosOpenRefresh?.(); // As interrogações servem para evitar erros se a função não estiver definida
}

document.addEventListener('DOMContentLoaded', initGlobal);


