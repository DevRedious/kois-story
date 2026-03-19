# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> The parent directory (`../CLAUDE.md`) contains the full project spec: Rails stack, data model, routes, THP constraints, and design system. Read it first.

---

## What This Repo Contains Now

This repo is **HTML/CSS/JS prototypes only**  no Rails app yet. Two independent prototyping workspaces:

- `ADMIN/`  Back-office admin interface (Mathilde's dashboard)
- `VISITORS/`  Public-facing site prototype

Pages can be opened directly via double-click (no server needed). All sidebar/navigation HTML is injected inline into each page file  there is no `fetch()` for components.

---

## File Length  Hard Limit

**No file may exceed 200 lines.** This is a non-negotiable constraint for maintainability.

- If a file approaches 200 lines, split it before adding more content.
- If asked to edit a file that already exceeds 200 lines, flag it and propose a split as part of the task.
- **Exceptions** (and only these): generated files, `admin-layout.html` (standalone self-contained template), page files in `pages/` that are full assembled views.
- Page files in `pages/` are the only HTML files allowed to be longer  they are the final assembly. All logic and structure must live in atoms/molecules/organisms, not in the page file itself.

When a file is too long, the fix is always **to extract into a smaller component at the right Atomic Design layer**  never just to compress or minify.

---

## Architecture: Atomic Design

Both `ADMIN/` and `VISITORS/` follow the same layered structure:

```
atoms/        → single UI elements (badge, button, input, stat-card…)
molecules/    → small assemblies of atoms (koi-row, filter-bar, nav-item…)
organisms/    → complete functional blocks (sidebar, topbar, kois-table…)
templates/    → full page skeleton with layout slots
pages/        → final assembled views (duplicate the template + fill content)
assets/
  css/        → modular CSS files (one responsibility per file, max 200 lines)
  js/         → one JS file per workspace (split into modules if > 200 lines)
```

**Key rules:**
- Components stay in their layer. No business logic in atoms.
- Do not duplicate components that already exist  reuse them.
- A new component must be created as soon as a pattern appears twice.
- CSS: one file per responsibility. Never add rules to a module that doesn't own that responsibility.
- JS: all behavior via `DOMContentLoaded` event listeners  no `onclick=""` in HTML, no global functions.

---

## ADMIN Prototype

### CSS Architecture

`assets/css/admin.css` is a **pure manifest**  it only imports the five modules:

| File | Responsibility |
|---|---|
| `variables.css` | All CSS custom properties (colors, fonts, sizes) |
| `layout.css` | Sidebar, topbar, main, overlay, mobile toggle |
| `components.css` | Buttons, badges, stat-cards, panels |
| `forms.css` | Input, select, textarea, form-group |
| `tables.css` | Table base styles + `.table-responsive` wrapper |

**Never write styles directly in `admin.css`.** Add to the appropriate module.

### CSS Variables (from `variables.css`)

**Palette V3**  définie dans `docs/assets/palette_V3.svg`. Remplace entièrement l'ancienne palette (plus de bleu `#003049`, plus d'or `#E09F3E`). À appliquer dans **tout le projet** (ADMIN et VISITORS).

```css
--rouge-vif:      #e60000   /* CTA principal, accents forts */
--rouge-sombre:   #630f0f   /* fonds sombres, hover, sidebar */
--noir:           #000000   /* texte principal, backgrounds sombres */
--blanc-casse:    #f5f5f2   /* fond de page, backgrounds neutres */
--blanc-pur:      #ffffff   /* surfaces cards, formulaires */

/* Utilitaires (à définir selon usage) */
--sidebar-w:      64px        /* collapsed */
--sidebar-open-w: 280px       /* expanded */
--topbar-h:       60px
--font-title:     'Playfair Display', Georgia, serif
--font-body:      'Inter', system-ui, sans-serif
```

> Toute référence à `#D62828`, `#003049`, `#E09F3E`, `#6C757D`, `#F8F9FA` dans le code est **obsolète** et doit être remplacée.

**Exceptions à la palette V3 :**
- `#25d366` (vert WhatsApp officiel)  obligatoire sur tout élément visuel WhatsApp (bouton, icône, badge, CTA). Aucune substitution.
- **SVG réseaux sociaux**  les icônes/logos liés à des liens sociaux (Facebook, Instagram, Google, TrustPilot…) conservent leurs couleurs de marque officielles. La palette V3 ne s'applique pas à ces éléments.

### Media Queries

Use **`min-width` only** (mobile-first). The base styles target mobile; desktop expands via:
- `@media (min-width: 769px)`  tablet/desktop layout
- `@media (min-width: 1025px)`  large desktop

Never add `max-width` media queries in CSS files. Page-level `<style>` blocks in `dashboard.html` and `messages.html` currently violate this  fix before Rails integration.

### JavaScript (`assets/js/admin.js`)

Single file, one `DOMContentLoaded` listener. Handles globally:
- Sidebar mobile toggle (`.menu-burger` → `.sidebar.open`)
- Overlay close on click
- Logout confirmation (`.logout-btn`)
- Table row search (`.filter-search`)
- Message read state (`.msg-row.unread`)
- `beforeunload` guard when form is modified

**Known gaps (not yet migrated to `admin.js`):**
- `koi-form.html`  image preview + `onclick` on upload button and image removal
- `order-form.html`  7 inline functions: `addLine()`, `removeLine()`, `updateRow()`, `updateTotal()` + dynamic HTML with embedded `onclick`/`onchange`
- `kois.html`, `orders.html`, `payments.html`  inline filter/sort `<script>` blocks

When adding new interactive behavior, **always add it to `admin.js` via event delegation**  no `onclick=""` in HTML.

### Sidebar

- Container: `<aside class="sidebar" id="sidebar">`
- Active page: add class `active` to the matching `.nav-item` (set manually per page via `data-page` attribute)
- Sidebar HTML is duplicated verbatim in every page file AND in `organisms/sidebar.html` (source of truth for the component reference). When editing sidebar navigation, update **both**.
- `templates/admin-layout.html` is the skeleton reference  it contains self-contained CSS (not linked to `assets/css/`) for standalone preview.

### Topbar & Breadcrumbs

- List pages (`kois.html`, `clients.html`, etc.): topbar shows title + breadcrumb `Admin › Page`
- Form pages (`koi-form.html`, etc.): breadcrumb is `Admin › Parent › Action`
- Dashboard: title only, no breadcrumb (inconsistency  fix for uniformity)
- Logout: always `<button class="btn btn-outline btn-sm logout-btn">Déconnexion</button>`

### Tables

Every table must be wrapped in `<div class="table-responsive">`. This is already done on all current pages.

---

## VISITORS Prototype

### CSS Architecture

**Règle obligatoire : tout CSS doit être dans `VISITORS/assets/css/`.** Aucun style ne doit rester embarqué dans les fichiers HTML (ni `<style>` inline, ni attribut `style=""`). Un fichier CSS par composant ou section, max 200 lignes chacun.

**État actuel : le dossier `VISITORS/assets/css/` n'existe pas encore.** Tous les styles sont embarqués dans les HTML  c'est une violation à corriger. Modèle à suivre : celui d'ADMIN (`variables.css`, puis un fichier par responsabilité, `admin.css` comme manifest d'import).

Structure cible :
```
assets/css/
  variables.css      → tokens (couleurs, fonts, sizes)  partagé avec preview
  base.css           → reset, body
  header.css         → navigation
  hero.css           → hero homepage
  catalogue.css      → grille koi + filtres
  product.css        → fiche produit koi
  koi-card.css       → molecule koi-card
  farm.css           → page découvrir / galerie
  footer.css         → footer + formulaire contact
  …                  → un fichier par composant/section, max 200 lignes
```

Chaque page ne `<link>`e que les CSS dont elle a besoin. Pas de fichier "tout-en-un".

### JavaScript  4 modules (état au 18/03/2026)

`main.js` monolithique découpé en modules, tous sous 200 lignes :

| Fichier | Lignes | Rôle |
|---|---|---|
| `assets/js/header.js` | 41 | nav mobile, menu toggle |
| `assets/js/filter.js` | 76 | filtres catalogue koi |
| `assets/js/gallery.js` | 104 | galerie photos |
| `assets/js/animations.js` | 22 | animations scroll |

### Composants disponibles (état au 18/03/2026)

**Atoms :** `badge`, `button`, `input`, `price`, `koi-thumb`, `icon-wa`, `wave-divider`, `logo`

**Molecules :** `koi-card`, `koi-card--editorial`, `cta-whatsapp`, `filter-bar`, `nav-header`, `contact-form`, `shop-card`

**Organisms :** `header`, `footer`, `hero`, `koi-detail`, `koi-showcase`, `farm-gallery`, `features`, `konishi-band`, `shop-section`

**Pages :** `home`, `product`, `kois`, `contact`, `decouvrir`, `azukari`, `nourriture`, `materiel`, `soins`

### Violations 200 lignes restantes dans VISITORS

Non-exceptions à corriger :

| Fichier | Lignes | Problème |
|---|---|---|
| `organisms/header.html` | 320 | trop lourd  extraire nav items en molecule |
| `molecules/nav-header.html` | 310 | trop lourd pour une molecule |
| `organisms/koi-showcase.html` | 218 | légèrement au-dessus |
| `organisms/koi-detail.html` | 212 | légèrement au-dessus |

Pages (exceptions tolérées, mais excessives  le contenu doit migrer vers les organisms) :

| Fichier | Lignes |
|---|---|
| `pages/product.html` | 940 |
| `pages/home.html` | 841 |
| `pages/kois.html` | 653 |
| `pages/contact.html` | 500 |
| `pages/decouvrir.html` | 486 |
| `pages/azukari.html` | 465 |
| `pages/nourriture.html` | 453 |
| `pages/materiel.html` | 436 |
| `pages/soins.html` | 435 |

`templates/visitor-layout.html` à 426 lignes  exception (template de référence standalone, comme `admin-layout.html`).

---

## Tooling

### Biome (linter/formatter)

```bash
npx biome check .        # lint JS, CSS, JSON
npx biome format --write . # auto-format
```

`biome.json` ignore tous les fichiers HTML (`**/*.html`)  le HTML n'est pas couvert par Biome.

### Fonts

Stockées dans `docs/fonts/inter/` et `docs/fonts/playfair-display/`. Toutes les `@font-face` des composants pointent vers ce dossier. À déplacer vers `app/assets/fonts/` lors de l'intégration Rails.

### Assets partagés

`docs/assets/` contient les images de référence, logos, icônes SVG et UI kits. Les composants y pointent via des chemins relatifs `../../docs/assets/`  fragile, à corriger lors du passage à Rails (Asset Pipeline / Cloudinary).

---

## Branching & Commits

Voir `CONTRIBUTING.md` pour le détail complet.

- Branches : `dev` (intégration) → `main` (prod). Jamais de commit direct sur `main`.
- Feature branches depuis `dev`, PR vers `dev`.
- Messages de commit en anglais, format conventionnel : `feat:`, `fix:`, `docs:`, `refactor:`.

---

## Fichiers Racine Notables

- `koi_story_ui_mockup.jsx`  maquette UI React (référence visuelle, non exécutée)
- `docs/design/atomic_design.md`  règles Atomic Design du projet
- `docs/design/brand/charte_graphique.md`  charte graphique complète (couleurs, typo, règles)
- `docs/design/wireframes/`  wireframes SVG + HTML de référence
- `docs/roadmap.md`  roadmap du projet
- `docs/todo.md`  todo global projet (distinct de `ADMIN/todo.md`)
