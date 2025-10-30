(function () {
  function digits(value) { return (value || '').replace(/\D+/g, ''); }

  function formatCPF(value) {
    const v = digits(value).slice(0, 11);
    const p1 = v.slice(0, 3), p2 = v.slice(3, 6), p3 = v.slice(6, 9), p4 = v.slice(9, 11);
    let out = '';
    if (p1) out = p1;
    if (p2) out += (out ? '.' : '') + p2;
    if (p3) out += (p2 ? '.' : '') + p3;
    if (p4) out += (p3 ? '-' : '') + p4;
    return out;
  }

  function formatCEP(value) {
    const v = digits(value).slice(0, 8);
    const p1 = v.slice(0, 5), p2 = v.slice(5, 8);
    return p2 ? (p1 + '-' + p2) : p1;
  }

  function formatPhone(value) {
    const v = digits(value).slice(0, 11);
    const ddd = v.slice(0, 2), rest = v.slice(2);
    if (!ddd) return '';
    if (rest.length <= 8) {
      const p1 = rest.slice(0, 4), p2 = rest.slice(4, 8);
      return '(' + ddd + ') ' + p1 + (p2 ? '-' + p2 : '');
    } else {
      const p1 = rest.slice(0, 5), p2 = rest.slice(5, 9);
      return '(' + ddd + ') ' + p1 + (p2 ? '-' + p2 : '');
    }
  }

  function initMasks(form) {
    if (!form) return;
    form.querySelectorAll('[data-mask]')?.forEach(function (el) {
      if (el.dataset.maskBound) return;
      el.dataset.maskBound = '1';
      var type = el.getAttribute('data-mask');
      function apply() {
        if (type === 'cpf') el.value = formatCPF(el.value);
        if (type === 'cep') el.value = formatCEP(el.value);
        if (type === 'phone') el.value = formatPhone(el.value);
      }
      el.addEventListener('input', apply);
      el.addEventListener('blur', apply);
      apply();
    });
  }

  window.Masks = { initMasks: initMasks, digits: digits, formatCPF: formatCPF, formatCEP: formatCEP, formatPhone: formatPhone }; // A variável window é acessível globalmente

  document.addEventListener('DOMContentLoaded', function () {
    initMasks(document);
  });
})();

