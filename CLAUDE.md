# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> The parent directory (`../CLAUDE.md`) contains the full project spec: Rails stack, data model, routes, THP constraints, and design system. Read it first.

---

## What This Repo Contains Now

Two phases coexist in this repo:

**Prototype (branches `DEV`, `main`, `admin-and-back`):**
- `ADMIN/` - Back-office admin interface (Mathilde's dashboard)
- `VISITORS/` - Public-facing site prototype
- Pages open directly via double-click (no server needed)
- All sidebar/navigation HTML is injected inline - no `fetch()` for components

**Rails MVP (branch `MVP`):**
- Rails app being scaffolded from scratch
- Follow `docs/rails_mvp_plan.md` for the full step-by-step implementation guide
- Do NOT modify `ADMIN/` or `VISITORS/` on the MVP branch - they are reference only
- CSS/fonts from the prototype will be copied to `app/assets/` during integration

## Branching

| Branch | Purpose |
|---|---|
| `main` | Production - no direct commits |
| `DEV` | Integration - all PRs target here |
| `MVP` | Rails app scaffold - oral blanc 2026-03-20 |
| `admin-and-back` | Docs, CI/CD, changelog, contributors |

Active PR: `admin-and-back` -> `DEV` (#39) - merge this before branching new features.

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

`assets/css/admin.css` is the **manifest** that imports the modules. The CSS is organized in subdirectories following Atomic Design:

```
assets/css/
  admin.css          → manifest (imports only)
  variables.css      → CSS custom properties
  layout.css         → sidebar, topbar, main, overlay (388 lines - over limit)
  components.css     → buttons, badges, stat-cards, panels (328 lines - over limit)
  forms.css          → input, select, textarea (294 lines - over limit)
  utilities.css      → utility classes (256 lines - over limit)
  login.css          → login page styles (230 lines - over limit)
  tables.css         → table base + .table-responsive (197 lines - ok)
  preview-shell.css  → standalone preview shell
  atoms/             → per-atom CSS files
  molecules/         → per-molecule CSS files (modal.css, messages-ui.css, etc.)
  templates/         → admin-layout.css
```

**Never write styles directly in `admin.css`.** Add to the appropriate module. Note: several files exceed the 200-line limit and should be split before Rails integration.

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

### JavaScript

JS is now split into **10 dedicated modules** (all under 200 lines):

| File | Lines | Responsibility |
|---|---|---|
| `admin.js` | 126 | Core: sidebar toggle, overlay, logout, search, read state, form guard |
| `order-form.js` | 104 | Dynamic order lines: addLine, removeLine, updateRow, updateTotal |
| `messages.js` | 100 | Message read/unread state management |
| `payments.js` | 99 | Payment filters and sort |
| `modal.js` | 60 | Modal open/close/confirm system |
| `koi-form.js` | 59 | Image preview + upload button |
| `notifications.js` | 58 | Toast notification system |
| `kois.js` | 40 | Koi table filter/sort |
| `orders.js` | 26 | Order table filter/sort |
| `theme.js` | 12 | Theme toggle |

No `onclick=""` violations remain in HTML. When adding new interactive behavior, **always add it via event delegation in the appropriate module** - no `onclick=""` in HTML.

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

**État actuel : le dossier `VISITORS/assets/css/` existe et contient 23 fichiers modules.** L'extraction CSS est complète.

Fichiers présents :
```
assets/css/
  variables.css      → tokens (couleurs, fonts, sizes)
  base.css           → reset, body
  fonts.css          → @font-face declarations
  header.css         → navigation
  hero.css           → hero homepage
  catalogue.css      → grille koi + filtres
  product.css        → fiche produit koi
  product-pages.css  → pages produit statiques
  koi-card.css       → molecule koi-card
  koi-card-pages.css → variantes koi-card
  farm.css           → page découvrir / galerie
  footer.css         → footer standard
  footer-full.css    → footer complet avec formulaire contact
  features.css       → section fonctionnalités
  konishi.css        → badge et section Konishi
  shop.css           → section boutique produits
  badge.css          → atom badge
  button.css         → atom button
  price.css          → atom price
  forms.css          → formulaires
  azukari.css        → page azukari
  atoms-media.css    → media queries atoms
  demo.css           → page demo/preview
  visitor.css        → manifest principal (imports)
```

Chaque page ne `<link>`e que les CSS dont elle a besoin. Pas de fichier "tout-en-un".

### JavaScript - 4 modules (état au 20/03/2026)

`main.js` monolithique découpé en 4 modules, tous sous 200 lignes :

| Fichier | Lignes | Rôle |
|---|---|---|
| `assets/js/header.js` | 78 | nav mobile, menu toggle |
| `assets/js/filter.js` | 77 | filtres catalogue koi |
| `assets/js/gallery.js` | 106 | galerie photos |
| `assets/js/animations.js` | 84 | animations scroll |

### Composants disponibles (état au 20/03/2026)

**Atoms :** `badge`, `button`, `input`, `price`, `koi-thumb`, `icon-wa`, `wave-divider`, `logo`

**Molecules :** `koi-card`, `koi-card--editorial`, `cta-whatsapp`, `filter-bar`, `nav-header`, `contact-form`, `shop-card`

**Organisms :** `header`, `footer`, `hero`, `koi-detail`, `koi-showcase`, `farm-gallery`, `features`, `konishi-band`, `shop-section`

**Pages :** `home`, `product`, `kois`, `contact`, `decouvrir`, `azukari`, `nourriture`, `materiel`, `soins`, `mentions-legales`

**Templates :** `visitor-layout.html` (175 lines - exception standalone)

### Etat des violations 200 lignes dans VISITORS

**HTML - toutes violations resolues.** Comptes actuels :

| Fichier | Lignes | Statut |
|---|---|---|
| `pages/home.html` | 455 | exception page |
| `pages/product.html` | 431 | exception page |
| `pages/kois.html` | 390 | exception page |
| `pages/contact.html` | 263 | exception page |
| `pages/decouvrir.html` | 254 | exception page |
| `pages/azukari.html` | 238 | exception page |
| `pages/nourriture.html` | 227 | exception page |
| `pages/soins.html` | 215 | exception page |
| `pages/materiel.html` | 215 | exception page |
| `pages/mentions-legales.html` | 198 | ok |
| All organisms/molecules/atoms | < 175 | ok |

**CSS - plusieurs fichiers depassent 200 lignes** (a corriger avant Rails) :

| Fichier | Lignes |
|---|---|
| `header.css` | 387 |
| `product-pages.css` | 352 |
| `farm.css` | 334 |
| `forms.css` | 312 |
| `koi-card-pages.css` | 310 |
| `product.css` | 267 |
| `features.css` | 249 |
| `hero.css` | 247 |
| `footer-full.css` | 233 |
| `shop.css` | 231 |
| `catalogue.css` | 222 |
| `variables.css` | 218 |
| `koi-card.css` | 213 |

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

- Branches : `DEV` (intégration) → `main` (prod). Jamais de commit direct sur `main`.
- Feature branches depuis `DEV`, PR vers `DEV`.
- Messages de commit en anglais, format conventionnel : `feat:`, `fix:`, `docs:`, `refactor:`.

---

## Fichiers Racine Notables

- `koi_story_ui_mockup.jsx`  maquette UI React (référence visuelle, non exécutée)
- `docs/design/atomic_design.md`  règles Atomic Design du projet
- `docs/design/brand/charte_graphique.md`  charte graphique complète (couleurs, typo, règles)
- `docs/design/wireframes/`  wireframes SVG + HTML de référence
- `docs/roadmap.md`  roadmap du projet
- `docs/todo.md`  todo global projet (distinct de `ADMIN/todo.md`)
