/**
 * Koi's Story — Order Form
 * Gestion des lignes de commande — order-form.html
 * Requires: notifications.js
 */

document.addEventListener('DOMContentLoaded', () => {

  const linesBody = document.getElementById('orderLinesBody');
  const tvaRate   = document.getElementById('tvaRate');
  const orderHT   = document.getElementById('orderHT');
  const orderTVA  = document.getElementById('orderTVA');
  const orderTTC  = document.getElementById('orderTTC');
  const tvaLabel  = document.getElementById('tvaLabel');

  const PRICES = {
    koi_kohaku_001: 850,
    koi_showa_002:  1200,
    food_konishi:   34,
    mat_pompe:      210,
  };

  const PRODUCT_OPTIONS = `
    <option value="">— Produit —</option>
    <option value="koi_kohaku_001" data-price="850">Kohaku #001</option>
    <option value="koi_showa_002"  data-price="1200">Showa #002</option>
    <option value="food_konishi"   data-price="34">Nourriture Konishi</option>
    <option value="mat_pompe"      data-price="210">Pompe bassin Pro</option>`;

  function fmt(n) {
    return n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
  }

  function updateRow(row) {
    const sel      = row.querySelector('.product-select');
    const qty      = parseInt(row.querySelector('.qty-input')?.value, 10) || 0;
    const price    = PRICES[sel?.value] ?? null;
    const unitEl   = row.querySelector('.unit-price');
    const subEl    = row.querySelector('.subtotal');
    if (unitEl) unitEl.textContent = price !== null ? fmt(price) : '— €';
    if (subEl)  subEl.textContent  = price !== null ? fmt(price * qty) : '— €';
  }

  function updateTotal() {
    if (!linesBody) return;
    let ttc = 0;
    linesBody.querySelectorAll('tr[data-line]').forEach(row => {
      const sel   = row.querySelector('.product-select');
      const qty   = parseInt(row.querySelector('.qty-input')?.value, 10) || 0;
      const price = PRICES[sel?.value] ?? 0;
      ttc += price * qty;
    });
    const rate = parseFloat(tvaRate?.value) || 20;
    const ht   = ttc / (1 + rate / 100);
    const tva  = ttc - ht;
    if (orderHT)  orderHT.textContent  = fmt(ht);
    if (orderTVA) orderTVA.textContent = fmt(tva);
    if (orderTTC) orderTTC.textContent = fmt(ttc);
    if (tvaLabel) tvaLabel.textContent = rate + '%';
  }

  function addLine() {
    if (!linesBody) return;
    const tr = document.createElement('tr');
    tr.dataset.line = '';
    tr.innerHTML = `
      <td><select class="product-select">${PRODUCT_OPTIONS}</select></td>
      <td class="td-center"><input type="number" class="qty-input" value="1" min="1"></td>
      <td class="td-right"><span class="unit-price">— €</span></td>
      <td class="td-right"><span class="subtotal">— €</span></td>
      <td class="td-center"><button type="button" class="btn btn-danger btn-sm remove-line" aria-label="Supprimer">✕</button></td>`;
    linesBody.appendChild(tr);
  }

  if (linesBody) {
    linesBody.addEventListener('change', e => {
      const row = e.target.closest('tr[data-line]');
      if (row) { updateRow(row); updateTotal(); }
    });
    linesBody.addEventListener('click', e => {
      const btn = e.target.closest('.remove-line');
      if (!btn) return;
      const rows = linesBody.querySelectorAll('tr[data-line]');
      if (rows.length <= 1) return;
      btn.closest('tr').remove();
      updateTotal();
    });
  }

  document.querySelector('.add-line-btn')?.addEventListener('click', addLine);
  tvaRate?.addEventListener('change', updateTotal);

  document.getElementById('orderForm')?.addEventListener('submit', e => {
    e.preventDefault();
    showNotification('Commande enregistrée avec succès', 'success');
  });

  updateTotal();
});
