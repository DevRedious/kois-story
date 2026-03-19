/**
 * Koi's Story — Kois List
 * Filtres du tableau de gestion des koïs — kois.html
 */

document.addEventListener('DOMContentLoaded', () => {

  const search  = document.getElementById('koi-search');
  const status  = document.getElementById('status-filter');
  const variety = document.getElementById('variety-filter');
  const lineage = document.getElementById('lineage-filter');
  const count   = document.getElementById('koi-count');
  const table   = document.getElementById('kois-table');

  if (!table) return;

  function applyFilters() {
    const q  = search?.value.toLowerCase()  ?? '';
    const st = status?.value               ?? '';
    const va = variety?.value.toLowerCase() ?? '';
    const li = lineage?.value              ?? '';
    let visible = 0;

    table.querySelectorAll('tbody tr').forEach(row => {
      const match =
        (!q  || row.textContent.toLowerCase().includes(q)) &&
        (!st || row.dataset.status  === st) &&
        (!va || row.dataset.variety === va) &&
        (!li || row.dataset.lineage === li);
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (count) count.textContent = visible + ' koï' + (visible > 1 ? 's' : '');
  }

  search?.addEventListener('input',  applyFilters);
  status?.addEventListener('change', applyFilters);
  variety?.addEventListener('change', applyFilters);
  lineage?.addEventListener('change', applyFilters);

});
