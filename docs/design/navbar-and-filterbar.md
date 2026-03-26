# Navbar & Filter Bar — Architecture technique

> Branche `MVP` — validé le 26/03/2026

---

## 1. Structure HTML

Le header et le logo sont dans un seul partial partagé par toutes les pages :
**`app/views/pages/_home_header.html.erb`**

```
<a class="site-logo" id="site-logo">  ← logo fixe, z-index 101
<header class="site-header" id="site-header">
  <div class="header__pill">
    <nav class="header__nav">…</nav>
    <button class="header__burger">…</button>
  </div>
</header>
<div class="nav-backdrop" id="nav-backdrop"></div>
```

La filter bar est un partial séparé rendu uniquement sur la page catalogue :
**`app/views/pages/_kois_filter_bar.html.erb`**

---

## 2. CSS — fichiers et responsabilités

| Fichier | Rôle |
|---|---|
| `header-section-1.css` | `.site-logo`, `.site-header` base, `.site-header--on-filter`, `.site-header--scroll-hidden`, burger blanc mobile |
| `header-section-2.css` | Nav links, dropdown desktop, `.header__burger` base |
| `header-section-3.css` | Overrides mobiles (pill transparent, burger sombre, menu ouvert) + desktop MQ |
| `catalogue-section-1.css` | `.filter-bar` base, `.filter-pill`, `.filter-panel`, `.filter-option`, `.filter-select--desktop` |
| `catalogue-section-2.css` | Overrides mobiles filter bar (scroll horizontal), drag cursor, grille catalogue |

---

## 3. Navbar — comportement par état

### Desktop (≥ 901px)
- `.site-header` : `position: fixed; pointer-events: none` (transparent, invisible)
- `.header__pill` : bulle glassmorphism sombre `rgba(0,0,0,0.42)` avec `backdrop-filter: blur`
- `.header__nav` : liens visibles, indicateur liquide animé
- `.header__burger` : `display: none`
- Au scroll : `.site-header--scrolled` → pill plus sombre `rgba(0,0,0,0.68)`

### Mobile (≤ 900px)
- `.header__pill` : `width: 100%; background: transparent` — le header est invisible par défaut
- `.header__burger` : bouton sombre flottant en haut à droite
- `.header__nav` : `display: none` par défaut, `display: block; position: fixed` quand `.open`
- Menu ouvert : panneau noir `rgba(0,0,0,0.94)` avec `border-radius: 2xl`, animation `slideDown`

### Mobile — page catalogue (`.site-header--on-filter`)
- Le header devient une **barre blanche pleine largeur** : `background: var(--c-white); box-shadow: var(--shadow-sm)`
- `.header__burger` : fond transparent, traits noirs (`var(--c-black)`)
- Logo (`z-index: 101`) visible au-dessus de la barre blanche (logo `z-index: 101` > header `z-index: 100`)
- `pointer-events: all` pour capturer les clics burger

---

## 4. Comportement Nike scroll (mobile, page catalogue uniquement)

Géré par `filter.js` — scroll direction detection avec `requestAnimationFrame`.

### Scroll vers le bas (> 80px depuis le haut)
1. `.site-header--scroll-hidden` ajouté → `transform: translateY(-100%)` → barre blanche glisse hors écran
2. `.filter-bar--at-top` ajouté → `top: 0 !important` → filter bar prend la place du header
3. `.site-logo--hidden` ajouté → logo disparaît (opacity 0)

### Scroll vers le haut
1. Les trois classes sont retirées → état initial restauré
2. Header blanc revient, logo réapparaît, filter bar retourne à `top: 66px`

### Seuil d'activation
```js
var goingDown = currentY > lastScrollY && currentY > 80;
```
Les 80px évitent le déclenchement sur les micro-scrolls en haut de page.

### Pourquoi filter.js et pas header.js ?
- header.js gère le comportement IntersectionObserver du hero (masque le logo quand le hero sort du viewport)
- Sur les pages avec filter bar, l'IntersectionObserver **ne cache plus le logo** (`if (!filterBar) logo?.classList.add(...)`)
- filter.js prend le relais exclusif pour la gestion logo + header + filter bar sur la page catalogue

---

## 5. Filter Bar — comportement mobile vs desktop

### Mobile (≤ 900px)
- Scroll horizontal : `overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none`
- Drag-to-scroll : mousedown → mousemove sur `document` → `scrollLeft`
- **Pills** (`.filter-pill`) : boutons inline-flex avec chevron SVG, construits depuis les `<select>` cachés
- Panels (`.filter-panel`) : construits dynamiquement par JS depuis les options des selects, `position: absolute; top: 100%`
- Les `<select>` (`.filter-select--desktop`) sont cachés : `display: none`

### Desktop (≥ 901px)
- `<select>` natifs visibles (`.filter-select--desktop { display: block }`)
- Pills cachées (`display: none`)
- Filter bar : `flex-wrap: wrap; overflow-x: visible`, centré avec `max-width: var(--max-width)`

### Source d'état unique
Les `<select>` sont la source de vérité pour les deux modes. Les pills lisent et écrivent dans les selects via `select.value` + `dispatchEvent(new Event("change"))`. Le filtrage des cartes écoute le `change` des selects.

---

## 6. Filter Bar — `top` et hauteur du header

| État | `top` filter bar | Calcul |
|---|---|---|
| Mobile normal (hero visible) | non-sticky | hero encore en viewport |
| Mobile avec header blanc | `66px` | padding 8px + burger 50px + padding 8px |
| Mobile scroll-down | `0` (via `.filter-bar--at-top`) | header hors écran |
| Desktop | `0` | header pill flottant, pas de décalage |

---

## 7. JS — `app/javascript/visitors/`

### `header.js` (197 lignes)
- IntersectionObserver sur `.hero` / `#hero` / `[data-scroll-trigger]`
- Ajoute/retire `.site-header--scrolled` et `.site-header--on-filter`
- **Ne cache pas le logo** sur les pages avec filter bar (`if (!filterBar)`)
- Nav active link detection, liquid indicator, mobile menu, dropdown, footer indicator

### `filter.js` (195 lignes)
- Filtrage des `.koi-card` par variété / âge / prix / Konishi
- Pill builder : construit les panels mobiles depuis les options des `<select>`
- Drag-to-scroll sur `.filter-bar__inner`
- Reset complet (selects + pills + panels + filtres)
- **Nike scroll** : scroll direction → classes sur header, filter bar, logo

---

## 8. Z-index reference (header zone)

| Élément | z-index |
|---|---|
| `.site-logo` | **101** |
| `.site-header` | 100 |
| `.nav-backdrop` | 90 |
| `.filter-bar` | 50 |
| `.filter-panel` | 60 |

Le logo est à `z-index: 101` (supérieur au header) pour rester visible au-dessus de la barre blanche mobile. Si les deux étaient à 100, le header (rendu après dans le DOM) peindrait par-dessus le logo.
