(function () {
  function initCadastroFormValidation(form) {
    if (!form) return;
    const fields = {
      fullName: form.querySelector('#fullName'),
      email: form.querySelector('#email'),
      cpf: form.querySelector('#cpf'),
      phone: form.querySelector('#phone'),
      birthDate: form.querySelector('#birthDate'),
      address: form.querySelector('#address'),
      cep: form.querySelector('#cep'),
      city: form.querySelector('#city'),
      state: form.querySelector('#state'),
    };

    Object.values(fields).forEach((inp) => {
      if (!inp) return;
      inp.addEventListener('blur', () => validateField(inp));
      inp.addEventListener('input', () => clearError(inp));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const allValid = Object.values(fields).every((inp) => validateField(inp));
      if (!allValid) return;

      const record = Object.fromEntries(Object.entries(fields).map(([k, el]) => [k, el.value.trim()]));
      window.Storage?.saveRecord('helpio:cadastros', record);
      try { document.dispatchEvent(new CustomEvent('cadastros:updated')); } catch {}

      try { window.Toast?.showToast('Cadastro salvo com sucesso!', 'success'); } catch {}

      form.reset();
    });
  }

  function validateField(input) { // Valida o campo do formulário
    const name = input?.name || input?.id;
    const value = input.value.trim();
    let error = '';

    switch (name) {
      case 'fullName':
        if (value.length < 3 || value.split(' ').length < 2) error = 'Informe nome e sobrenome.';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'E-mail inválido.';
        break;
      case 'cpf': {
        const v = onlyDigits(value);
        if (!/^\d{11}$/.test(v) || !cpfIsValid(v)) error = 'CPF inválido.';
        break;
      }
      case 'phone':
        if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value)) error = 'Telefone inválido.';
        break;
      case 'birthDate':
        if (!dateIsValidPast(value)) error = 'Data de nascimento inválida.';
        break;
      case 'address':
        if (value.length < 5) error = 'Endereço muito curto.';
        break;
      case 'cep': {
        const v = onlyDigits(value);
        if (!/^\d{8}$/.test(v)) error = 'CEP inválido.';
        break;
      }
      case 'city':
        if (value.length < 2) error = 'Cidade inválida.';
        break;
      case 'state':
        if (!value) error = 'Selecione um estado.';
        break;
    }

    if (error) {
      showError(input, error);
      return false;
    }
    showValid(input);
    return true;
  }

  function showError(input, message) {
    let msg = input.closest('.form-field')?.querySelector('.field-error');
    if (!msg) {
      msg = document.createElement('small');
      msg.className = 'field-error';
      input.closest('.form-field')?.appendChild(msg);
    }
    msg.textContent = message;
  }

  function clearError(input) {
    const msg = input.closest('.form-field')?.querySelector('.field-error');
    if (msg) msg.textContent = '';
  }

  function showValid(input) {
    clearError(input);
  }

  function dateIsValidPast(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    return d <= now;
  }

  function onlyDigits(v) { return (v || '').replace(/\D+/g, ''); }

  function cpfIsValid(cpf) {
    // Algoritmo de validação de CPF
    if (!cpf || cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    const calc = (base) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) sum += parseInt(base[i], 10) * (base.length + 1 - i);
      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };
    const d1 = calc(cpf.slice(0, 9));
    const d2 = calc(cpf.slice(0, 9) + d1);
    return cpf.endsWith(String(d1) + String(d2));
  }

  window.Validation = { initCadastroFormValidation }; // A variável window é acessível globalmente
})();
