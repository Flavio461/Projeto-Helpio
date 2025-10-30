(function () {
  function loadRecords(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveRecord(key, record) {
    const list = loadRecords(key);
    list.push({ ...record, _savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  }

  window.Storage = { loadRecords, saveRecord }; // A variável window é acessível globalmente
})();

