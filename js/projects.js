(function () {
  let currentCategory = '';

  function normalize(str) {
    return String(str || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function parseCategories(value) {
    return String(value || '')
      .split(',')
      .map((s) => normalize(s))
      .filter(Boolean);
  }

  function updateActiveTag(cat, tagsRoot) {
    if (!tagsRoot) return;
    const norm = normalize(cat);
    tagsRoot.querySelectorAll('a').forEach((a) => {
      const isActive = normalize(a.textContent) === norm && norm !== '';
      if (isActive) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  function applyFilter(cat) {
    const list = document.querySelectorAll('.project-list .project');
    const tagsRoot = document.querySelector('.tags');
    const normCat = normalize(cat);

    list.forEach((article) => {
      const cats = parseCategories(article.getAttribute('data-categories'));
      const show = !normCat || cats.includes(normCat);
      if (show) article.removeAttribute('hidden');
      else article.setAttribute('hidden', '');
    });

    updateActiveTag(cat, tagsRoot);
    currentCategory = normCat;
  }

  function initProjectsFilters() {
    const tagsRoot = document.querySelector('.tags');
    const list = document.querySelector('.project-list');
    if (!tagsRoot || !list) return;
    if (tagsRoot.dataset.bound) return;
    tagsRoot.dataset.bound = '1';

    tagsRoot.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      e.preventDefault();
      const label = link.textContent || '';
      const norm = normalize(label);
      if (norm && norm === currentCategory) {
        applyFilter('');
      } else {
        applyFilter(label);
      }
    });
  }

  window.Projects = { initProjectsFilters };
})();


