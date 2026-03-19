# Frontend Refactor Plan — Koi's Story

> Refactors à effectuer AVANT ou PENDANT la migration Rails.
> Priorité : 🔴 Bloquant | 🟠 Important | 🟡 Amélioration | 🟢 Optionnel

---

## 1. Fusion des Tokens CSS (Critique)

### Problème

ADMIN et VISITORS utilisent deux jeux de tokens différents pour la même palette V3 :

| ADMIN | VISITORS | Valeur |
|-------|----------|--------|
| `--rouge-vif` | `--c-red` | `#e60000` |
| `--rouge-sombre` | `--c-wine` | `#630f0f` |
| `--noir` | `--c-black` | `#000000` |
| `--blanc-casse` | `--c-cream` | `#f5f5f2` |
| `--blanc-pur` | `--c-white` | `#ffffff` |
| `--gris` (ADMIN only) | `--c-neutral` | `#666` |

De plus, `ADMIN/assets/css/admin.css` importe CSS de VISITORS via chemin relatif fragile :
```css
@import url("../../../VISITORS/assets/css/variables.css");
```

### Solution

Créer un fichier de tokens unifié `app/assets/stylesheets/shared/variables.css` :

```css
/* ============================================
   KOIS STORY — Design Tokens V3
   Source de vérité unique — ADMIN + VISITORS
   ============================================ */

:root {
  /* Palette principale */
  --color-red:     #e60000;    /* CTA, accents forts */
  --color-wine:    #630f0f;    /* Fonds sombres, hover, sidebar */
  --color-black:   #000000;    /* Texte, backgrounds sombres */
  --color-cream:   #f5f5f2;    /* Fond de page, backgrounds neutres */
  --color-white:   #ffffff;    /* Cards, formulaires */

  /* Exception obligatoire — NE PAS MODIFIER */
  --color-whatsapp: #25d366;  /* WhatsApp officiel */

  /* Neutrals */
  --color-gray-100: #f5f5f2;
  --color-gray-200: #e8e8e5;
  --color-gray-500: #666666;
  --color-gray-700: #333333;

  /* Status */
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-danger:  #dc3545;
  --color-info:    #17a2b8;

  /* Typography */
  --font-title:  'Playfair Display', Georgia, serif;
  --font-body:   'Inter', system-ui, sans-serif;

  /* Layout */
  --sidebar-w:      64px;
  --sidebar-open-w: 280px;
  --topbar-h:       60px;
  --header-h:       74px;
  --max-w:          1400px;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.12);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.15);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.20);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-normal: 300ms cubic-bezier(0.22, 1, 0.36, 1);
  --transition-slow:   600ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 9999px;

  /* Z-index */
  --z-sidebar:  100;
  --z-topbar:   200;
  --z-header:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
}
```

### Migration dans les CSS existants

Remplacer partout :

```bash
# ADMIN
--rouge-vif    → --color-red
--rouge-sombre → --color-wine
--noir         → --color-black
--blanc-casse  → --color-cream
--blanc-pur    → --color-white
--gris         → --color-gray-500

# VISITORS
--c-red   → --color-red
--c-wine  → --color-wine
--c-black → --color-black
--c-cream → --color-cream
--c-white → --color-white
--c-wa    → --color-whatsapp
```

---

## 2. Découpage CSS 200 Lignes — ADMIN

### 🔴 `layout.css` (388 lignes → 3 fichiers)

```
layout.css (388 lignes) →
  ├── admin-sidebar.css   (~150 lignes) : .sidebar, .nav-item, .nav-list
  ├── admin-topbar.css    (~100 lignes) : .topbar, .breadcrumb, .topbar-actions
  └── admin-grid.css      (~130 lignes) : .admin-layout, .admin-main, .admin-content, overlay
```

### 🟠 `components.css` (328 lignes → 3 fichiers)

```
components.css (328 lignes) →
  ├── admin-buttons.css   (~80 lignes)  : .btn variants, sizes
  ├── admin-cards.css     (~120 lignes) : .stat-card, .panel, .count-badge
  └── admin-badges.css    (~80 lignes)  : .badge variants (status, role, count)
```

### 🟠 `forms.css` (294 lignes → 2 fichiers)

```
forms.css (294 lignes) →
  ├── admin-form-layout.css (~140 lignes) : .form-section, .form-grid, .form-group
  └── admin-form-inputs.css (~140 lignes) : input, select, textarea, labels, focus states
```

---

## 3. Découpage CSS 200 Lignes — VISITORS

### 🔴 `header.css` (378 lignes → 2 fichiers)

```
header.css (378 lignes) →
  ├── header-core.css   (~180 lignes) : .site-header, logo, nav-pill, liquid indicator
  └── header-mobile.css (~180 lignes) : .nav-burger, .nav-dropdown, mobile menu animations
```

### 🟠 `product-pages.css` (343 lignes → 2 fichiers)

```
product-pages.css (343 lignes) →
  ├── product-layout.css  (~180 lignes) : .product-page, info panel, price block
  └── product-gallery.css (~150 lignes) : gallery thumbs, lightbox trigger styles
```

### 🟠 `koi-card-pages.css` (310 lignes → 2 fichiers)

```
koi-card-pages.css (310 lignes) →
  ├── koi-detail-layout.css (~160 lignes) : layout détail, grid, breadcrumb
  └── koi-detail-meta.css   (~140 lignes) : metadata table, badges, certificates
```

### 🟠 `forms.css` (312 lignes → 2 fichiers)

```
forms.css (312 lignes) →
  ├── forms-base.css       (~160 lignes) : .form-group, input, select, textarea
  └── forms-validation.css (~140 lignes) : error states, success states, messages
```

### 🟡 `farm.css` (308 lignes → acceptable)

La galerie de la ferme est un composant très spécifique. Acceptable à 308 lignes.
Refactor optionnel si d'autres CSS y sont ajoutés.

---

## 4. Refactor JavaScript — Suppression Inline Handlers

### 🔴 `order-form.js` — `innerHTML` avec `onclick`

**Problème actuel :**
```js
function addLine() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><button onclick="removeLine(this)">✕</button></td>
    <td><select onchange="updateRow(this)">...</select></td>
  `;
}
```

**Solution : Event Delegation**
```js
// Dans order-form.js refactoré
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("order-lines");
  const addBtn = document.getElementById("add-line-btn");
  let lineIndex = 0;

  if (!tbody || !addBtn) return;

  addBtn.addEventListener("click", () => addLine(tbody));
  tbody.addEventListener("click", (e) => {
    if (e.target.matches(".remove-line-btn")) removeLine(e.target);
  });
  tbody.addEventListener("change", (e) => {
    if (e.target.matches(".line-qty, .line-price")) updateRow(e.target);
  });

  function addLine(tbody) {
    const row = createLineRow(lineIndex++);
    tbody.appendChild(row);
    updateTotal();
  }

  function createLineRow(index) {
    const tr = document.createElement("tr");
    tr.dataset.lineIndex = index;
    // Pas d'onclick inline — utilise classes pour event delegation
    tr.innerHTML = `
      <td>
        <select class="line-select" name="order[items][${index}][product_id]">
          <option value="">Choisir...</option>
        </select>
      </td>
      <td><input type="number" class="line-qty" name="order[items][${index}][quantity]" value="1" min="1"></td>
      <td><input type="number" class="line-price" name="order[items][${index}][unit_price]" step="0.01"></td>
      <td class="line-total">0,00 €</td>
      <td><button type="button" class="remove-line-btn btn btn-sm btn-danger">✕</button></td>
    `;
    return tr;
  }

  function removeLine(btn) {
    btn.closest("tr").remove();
    updateTotal();
  }

  function updateRow(input) {
    const row = input.closest("tr");
    const qty   = parseFloat(row.querySelector(".line-qty")?.value   || 0);
    const price = parseFloat(row.querySelector(".line-price")?.value || 0);
    row.querySelector(".line-total").textContent =
      (qty * price).toFixed(2).replace(".", ",") + " €";
    updateTotal();
  }

  function updateTotal() {
    const total = Array.from(tbody.querySelectorAll("tr")).reduce((sum, row) => {
      const qty   = parseFloat(row.querySelector(".line-qty")?.value   || 0);
      const price = parseFloat(row.querySelector(".line-price")?.value || 0);
      return sum + qty * price;
    }, 0);
    const el = document.getElementById("order-total");
    if (el) el.textContent = total.toFixed(2).replace(".", ",") + " €";
  }
});
```

### 🟠 `gallery.js` — Supprimer `style.cssText`

**Problème :**
```js
overlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  ...
`;
```

**Solution : Classes CSS**
```css
/* Dans product.css ou gallery.css */
.gallery-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-normal);
  cursor: zoom-out;
}

.gallery-overlay--open {
  opacity: 1;
  visibility: visible;
}
```

```js
// Dans gallery.js
function openLightbox(src, alt) {
  overlay.querySelector("img").src = src;
  overlay.querySelector("img").alt = alt;
  overlay.classList.add("gallery-overlay--open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  overlay.classList.remove("gallery-overlay--open");
  document.body.style.overflow = "";
}
```

### 🟡 Turbo Compatibility — Tous les JS

**Problème :** `DOMContentLoaded` ne re-fire pas après navigation Turbo.

**Solution (avant Stimulus) :**
```js
// Pattern à appliquer dans tous les fichiers JS
function init() {
  // ... toute la logique d'initialisation ...
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("turbo:load", init);
```

**Solution définitive (Rails + Stimulus) :** Porter chaque fichier vers un Stimulus controller (voir `docs/implementation/stimulus_controller_examples.js`).

---

## 5. DRY — Élimination de la Sidebar Dupliquée

### Problème Actuel

La sidebar HTML est copiée verbatim dans chaque fichier de page ADMIN :
- `dashboard.html` — sidebar dupliquée
- `kois.html` — sidebar dupliquée
- `messages.html` — sidebar dupliquée
- `koi-form.html` — sidebar dupliquée
- etc.

En HTML statique, cette duplication est inévitable (pas de server-side render).
En Rails, cette duplication disparaît grâce au layout `admin.html.erb`.

### Action

1. **Pendant la phase prototypage** : ne pas modifier davantage la duplication — accepter temporairement
2. **En Rails** : la sidebar ne sera dans le layout admin qu'une seule fois :

```erb
<!-- layouts/admin.html.erb -->
<body>
  <%= render "admin/shared/sidebar" %>  ← UNE SEULE FOIS
  <div class="admin-main">
    <%= render "admin/shared/topbar" %>
    <main class="admin-content"><%= yield %></main>
  </div>
</body>
```

---

## 6. HTML Semantics — Cartes Koi

### Problème

Les cartes koi utilisent `<div class="koi-card">` au lieu d'un élément sémantique.

### Solution

Remplacer dans `kois/_card.html.erb` :
```erb
<%# Avant %>
<div class="koi-card">

<%# Après — plus sémantique %>
<article class="koi-card" aria-label="<%= koi.name %>, <%= koi.variety %>">
```

Et dans le catalogue (`kois/index.html.erb`) :
```erb
<section class="koi-catalogue" aria-label="Catalogue des koïs disponibles">
  <ul class="koi-grid" role="list">
    <% @kois.each do |koi| %>
      <li>
        <%= render "kois/card", koi: koi %>
      </li>
    <% end %>
  </ul>
</section>
```

---

## 7. Accessibilité — Corrections Prioritaires

### 🔴 Skip Link (Obligatoire)

Ajouter dans chaque layout AVANT le header :
```erb
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
```

```css
/* Dans base.css */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-red);
  color: var(--color-white);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  z-index: var(--z-toast);
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: 0;
}
```

### 🔴 Focus Trap Lightbox

```js
// Dans gallery.js ou GalleryController
const focusableSelectors = 'button, [href], input, [tabindex]:not([tabindex="-1"])';

function trapFocus(overlay) {
  const focusable = Array.from(overlay.querySelectorAll(focusableSelectors));
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  first.focus();
}
```

### 🟠 Aria-live pour Filtres

```erb
<%# Dans kois/index.html.erb %>
<p class="sr-only" aria-live="polite" aria-atomic="true" id="filter-count">
  <%= pluralize(@kois.count, "koï", "koïs") %> trouvé<%= "s" if @kois.count > 1 %>
</p>
```

---

## 8. Performance — Images

### Ajouter `loading="lazy"` partout

```erb
<%# Dans _thumb.html.erb %>
<%= image_tag koi.images.first.url,
    alt: koi.name,
    loading: "lazy",
    width: 400,
    height: 300 %>
```

### Ajouter `width` et `height` (CLS prevention)

Chaque `image_tag` doit avoir des dimensions explicites pour prévenir le Cumulative Layout Shift. Les dimensions sont connues grâce aux transformations Cloudinary.

---

## 9. Media Queries — Supprimer `max-width`

### Fichiers Concernés

- `ADMIN/pages/dashboard.html` — `<style>` inline avec `max-width`
- `ADMIN/pages/messages.html` — `<style>` inline avec `max-width`

### Action

1. Extraire les `<style>` inline → vers `admin/pages/dashboard.css` et `admin/pages/messages.css`
2. Convertir `@media (max-width: X)` → `@media (min-width: Y)` en inversant la logique

---

## Récapitulatif Priorisation

| Refactor | Priorité | Bloquant | Effort |
|---------|----------|----------|--------|
| Fusion tokens CSS | 🔴 | Oui | Moyen |
| `order-form.js` event delegation | 🔴 | Oui (Stimulus) | Moyen |
| Skip link accessibilité | 🔴 | THP | Faible |
| Layout ADMIN DRY (sidebar) | 🔴 | Rails | Automatique |
| `gallery.js` cssText → classes | 🟠 | Non | Faible |
| Turbo compatibility (DOMContentLoaded) | 🟠 | Rails/Turbo | Moyen |
| Découpage CSS 200 lignes | 🟠 | CLAUDE.md | Moyen |
| Focus trap lightbox | 🟠 | Non | Faible |
| `<article>` cartes koi | 🟡 | Non | Faible |
| `aria-live` filtres | 🟡 | Non | Faible |
| `loading="lazy"` images | 🟡 | Non | Faible |
| `max-width` media queries | 🟡 | Non | Faible |
