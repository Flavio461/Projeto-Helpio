(function () {
  let activeModal = null;
  let lastFocus = null;
  let bound = false;

  function initModals() {
    if (bound) return;
    bound = true;
    document.addEventListener('click', onDocumentClick, false);
    document.removeEventListener('keydown', onKeydown);
    document.addEventListener('keydown', onKeydown);
  }

  function teardownModals() {
    if (!bound) return;
    document.removeEventListener('click', onDocumentClick, false);
    document.removeEventListener('keydown', onKeydown);
    bound = false;
  }

  function onDocumentClick(e) {
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      e.preventDefault();
      const targetId = openBtn.getAttribute('data-modal-open');
      const modal = document.querySelector(`#${CSS.escape(targetId)}`);
      if (modal) openModal(modal);
      return;
    }
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      e.preventDefault();
      closeModal();
      return;
    }
    const backdrop = e.target.closest('.modal-backdrop');
    if (backdrop) {
      e.preventDefault();
      closeModal();
      return;
    }
  }

  function openModal(modal) {
    const backdrop = ensureBackdrop();
    lastFocus = document.activeElement;
    activeModal = modal;
    modal.setAttribute('open', '');
    backdrop.setAttribute('open', '');
    trapFocus(modal);
    try { document.dispatchEvent(new CustomEvent('modal:open', { detail: { id: modal.id } })); } catch {}
  }

  function closeModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (activeModal) activeModal.removeAttribute('open');
    if (backdrop) backdrop.removeAttribute('open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    activeModal = null;
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab' && activeModal) {
      handleTabTrap(e, activeModal);
    }
  }

  function ensureBackdrop() {
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);
    }
    return backdrop;
  }

  function trapFocus(container) {
    const focusables = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (first) first.focus();
    container.__first = first; // Armazena referências no container
    container.__last = last;
  }

  function handleTabTrap(e, container) {
    const first = container.__first;
    const last = container.__last;
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  window.Modal = { initModals, teardownModals, openModal, closeModal };
})();

