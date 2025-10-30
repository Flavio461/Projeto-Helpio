(function () {
  let refreshBound = false;

  function injectCadastrosModal() {
    if (document.getElementById('modal-cadastros')) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="modal" id="modal-cadastros" role="dialog" aria-labelledby="modal-cadastros-title" aria-modal="true">
        <h2 id="modal-cadastros-title">Cadastros</h2>
        <div id="cadastros-list" class="mt-16"></div>
        <div class="form-actions mt-24">
          <button type="button" class="button" data-modal-close>Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper.firstElementChild);
  }

  function refreshCadastrosList() {
    const container = document.getElementById('cadastros-list');
    if (!container) return;
    const items = (window.Storage?.loadRecords('helpio:cadastros')) || [];
    if (!items.length) {
      container.innerHTML = '<p class="text-muted">Nenhum cadastro encontrado.</p>';
      return;
    }
    const cards = items.map((r) => `
      <div class="cadastro-card">
        <div class="cadastro-card-header">
          <strong>${escapeHtml(r.fullName || '')}</strong>
          <span class="cadastro-badge">${escapeHtml(r.role || 'voluntário')}</span>
        </div>
        <div class="cadastro-card-body">
          <div class="cadastro-info">
            <span class="cadastro-label">E-mail:</span>
            <span class="cadastro-value">${escapeHtml(r.email || '')}</span>
          </div>
          <div class="cadastro-info">
            <span class="cadastro-label">Data:</span>
            <span class="cadastro-value">${formatDate(r._savedAt)}</span>
          </div>
        </div>
      </div>
    `).join('');

    const rows = items.map((r) => `
      <tr>
        <td>${escapeHtml(r.fullName || '')}</td>
        <td>${escapeHtml(r.email || '')}</td>
        <td>${escapeHtml(r.role || 'voluntário')}</td>
        <td>${formatDate(r._savedAt)}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="cadastros-cards-view">
        ${cards}
      </div>
      <div class="cadastros-table-view overflow-x">
        <table class="cadastros-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  function initCadastrosOpenRefresh() {
    if (refreshBound) return; // Garante que a função seja executada apenas uma vez
    refreshBound = true;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-modal-open="modal-cadastros"]');
      if (btn) refreshCadastrosList();
    });
    document.addEventListener('modal:open', (e) => {
      if (e.detail?.id === 'modal-cadastros') refreshCadastrosList();
    });
    document.addEventListener('cadastros:updated', () => {
      const opened = document.getElementById('modal-cadastros');
      if (opened && opened.hasAttribute('open')) refreshCadastrosList();
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));
  }

  function formatDate(iso) {
    try { const d = new Date(iso); return d.toLocaleString('pt-BR'); } catch { return '' }
  }

  window.Panel = { injectCadastrosModal, refreshCadastrosList, initCadastrosOpenRefresh }; // A variável window é acessível globalmente
})();

