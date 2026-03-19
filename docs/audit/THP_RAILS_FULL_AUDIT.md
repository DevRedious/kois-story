# Audit Global — Koi's Story

> Audit réalisé le 19/03/2026 — Périmètre : prototypes HTML/CSS/JS (ADMIN + VISITORS)
> Aucun code Rails n'existe encore. Cet audit prépare la migration.

---

## 1. Résumé Exécutif

### État réel du projet

Le projet est une **maquette frontend complète** organisée selon les principes de l'Atomic Design. Deux espaces de travail indépendants (`ADMIN/` et `VISITORS/`) représentent respectivement le back-office admin (Mathilde) et le site public.

**Score global : 73/100**

| Dimension | Score |
|-----------|-------|
| CSS Architecture | 7/10 |
| JS Architecture | 8/10 |
| Accessibilité | 8/10 |
| Performance (frontend) | 7/10 |
| Mobile-First | 8/10 |
| Maintenabilité | 6/10 |
| Atomic Design | 7/10 |
| Prêt pour Rails | 6/10 |

### Limites de l'audit

- **Backend non évalué** : Devise, mailer, API Cloudinary, models, seeds — non existants, non évaluables.
- **Production non testée** : déploiement VPS, CI/CD, environnements prod/dev.
- **Accessibilité** : analysée statiquement — aucun outil automatisé (Axe, Lighthouse) utilisé.
- **Performance** : mesures estimées depuis la structure du code, pas de Lighthouse run.

---

## 2. Méthodologie

### Ce qui a été analysé

- Arborescence complète (139 fichiers)
- Contenu intégral de tous les fichiers CSS et JS
- Structure HTML des pages et composants ADMIN + VISITORS
- Conformité aux règles définies dans `CLAUDE.md` et `../CLAUDE.md`
- Architecture Atomic Design (atoms / molecules / organisms / pages)
- Import cross-workspace, couplages fragiles

### Ce qui ne peut pas être validé

- Comportement réel sur navigateurs (rendu, interactions)
- Accessibilité avec screen-reader
- Performances réseau (Lighthouse / WebPageTest)
- Logique métier (pas de Rails encore)
- Workflow Git multi-contributeurs

---

## 3. Conformité THP

### 3.1 Critères Éliminatoires

| Critère | Statut | Preuve | Risque |
|---------|--------|--------|--------|
| Proposition de valeur claire | ✅ OK | Hero `home.html` : "seul vendeur Konishi en France", pitch visible en < 5s | Faible |
| Fonctionnalité principale utilisable | ⚠️ Partiel | Catalogue kois + filtres fonctionnels dans `kois.html`. Pas de back-end — aucune donnée réelle | **Moyen** — Rails requis |
| Navigation simple et fluide | ✅ OK | Navbar 8 items, breadcrumbs cohérents, aucun lien mort détecté sur composants | Faible |
| UI lisible et non chaotique | ✅ OK | Palette V3 cohérente, typographie Playfair/Inter, hiérarchie visuelle claire | Faible |
| Pas de flux cassés | ⚠️ Partiel | Formulaire contact statique (pas de mailer), WhatsApp non configuré (numéros manquants) | **Moyen** |
| RESTful routes uniquement | N/A | Pas de Rails — à valider après migration | **Critique** |
| Tout le code en anglais | ✅ OK | Variables, classes CSS, fonctions JS en anglais. Contenu client en français (acceptable) | Faible |
| Rails helpers pour liens/images | N/A | HTML statique — à corriger pendant migration | **Critique** |
| Mailer fonctionnel en production | N/A | Pas encore implémenté | **Éliminatoire si absent** |
| Au moins 1 API externe | N/A | Cloudinary prévu, non implémenté | **Éliminatoire si absent** |
| Auth Devise (5 vues) | N/A | Page login prototypée, pas de Devise | **Éliminatoire si absent** |
| Tests | N/A | Aucun test existant | **Éliminatoire si absent** |

### 3.2 UX THP

| Critère | Statut | Notes |
|---------|--------|-------|
| Pas de friction de navigation | ✅ OK | Menu clair, breadcrumbs sur formulaires admin |
| Zéro lien mort détecté | ✅ OK | Composants statiques — à vérifier en Rails avec routes réelles |
| Flows utilisateur clairs | ✅ OK | Thomas → Catalogue → Fiche → WhatsApp. Mathilde → Dashboard → CRUD kois |
| Formulaires avec feedback | ⚠️ Partiel | Validation HTML5 présente, pas de feedback server-side |
| Mobile UX validée | ✅ OK | Burger menu, sidebar collapsée, grid responsive |
| WhatsApp CTA visible | ✅ OK | Bouton flottant + bouton fiche koi. Numéros non encore configurés |

### 3.3 UI THP

| Critère | Statut | Notes |
|---------|--------|-------|
| Max 3 polices | ✅ OK | Playfair Display (titres) + Inter (corps) — 2 polices |
| Max 5 couleurs | ✅ OK | Rouge vif / Rouge sombre / Noir / Blanc cassé / Blanc pur — 5 exactement. WhatsApp vert = exception obligatoire |
| Contraste lisible | ✅ OK | Blanc sur noir/rouge, rouge sur blanc cassé. Ratio WCAG AA estimé OK |
| Cohérence visuelle | ✅ OK | Variables CSS centralisées, tokens utilisés partout |
| Hiérarchie visuelle | ✅ OK | H1 Playfair grand, corps Inter lisible, badges et prix mis en avant |

### 3.4 Proposition de Valeur

**Validée côté frontend :**
- "Seul vendeur en France de koïs lignée Konishi" — affiché dans hero et konishi-band
- Filtres catalogue : variété, âge, sexe, taille, prix — présents dans `filter-bar.html`
- Badge Konishi sur cartes koi — présent dans `koi-card.html`
- Certificats Konishi — mentionnés dans fiche produit `product.html`
- Bouton WhatsApp direct — présent sur chaque carte et page produit

**Non encore validable :**
- Google Business account (pas créé)
- Acompte/paiement (virement, % non défini)
- Photos/certificats réels du client (non reçus)

### 3.5 Points Non Auditables (THP Jury)

Ces points SERONT évalués par le jury mais NE PEUVENT PAS être validés maintenant :

| Point | Raison |
|-------|--------|
| Devise auth (5 vues) | Non implémenté |
| Mailer fonctionnel | Non implémenté |
| API externe (Cloudinary) | Non implémenté |
| Models & relations | Pas de Rails |
| Seeds (26 variétés) | Pas de Rails |
| Tests `rails test` | Pas de Rails |
| Fat Model / Skinny Controller | Pas de Rails |
| `has_many :through` sur koi_tags | Pas de Rails |
| Hébergement VPS prod | Non déployé |
| GitHub Actions CONTRIBUTORS.md | Non vérifié |

---

## 4. Audit UI

### 4.1 Palette V3

**Statut : Conforme.** Tokens V3 définis dans `VISITORS/assets/css/variables.css` et `ADMIN/assets/css/variables.css`.

| Token | Valeur | Usage |
|-------|--------|-------|
| `--c-red` / `--rouge-vif` | `#e60000` | CTA, accents |
| `--c-wine` / `--rouge-sombre` | `#630f0f` | Sidebar, hover |
| `--c-black` / `--noir` | `#000000` | Texte, backgrounds sombres |
| `--c-cream` / `--blanc-casse` | `#f5f5f2` | Fond de page |
| `--c-white` / `--blanc-pur` | `#ffffff` | Cards, surfaces |
| `--c-wa` (WhatsApp) | `#25d366` | Boutons WhatsApp UNIQUEMENT |

**⚠️ Inconsistance détectée :** ADMIN et VISITORS utilisent des noms de tokens différents pour la même palette (`--rouge-vif` vs `--c-red`). À unifier lors de la migration Rails vers un seul fichier de tokens.

### 4.2 Typographie

- Titres : Playfair Display (Regular + Bold)
- Corps : Inter (Regular 400, Medium 500, SemiBold 600, Bold 700)
- Scale : `clamp()` pour le hero (3rem → 5.5rem), cohérente
- Décision : 2 polices, sous la limite THP de 3 ✅

### 4.3 Cohérence Visuelle

- Boutons : 3 variants (primary rouge, ghost, outline) — cohérents entre pages
- Badges : variété, âge, Konishi, statut — composant `badge.html` réutilisé
- Cards : `koi-card.html` réutilisé dans catalogue et showcase
- Sidebar admin : mêmes items, même hiérarchie sur toutes les pages

**Problème :** La sidebar HTML est dupliquée verbatim dans chaque fichier page. `organisms/sidebar.html` existe mais n'est pas fetchée dynamiquement — intentionnel (pas de serveur), mais crée une dérive si on modifie un seul endroit.

---

## 5. Audit UX

### 5.1 Flux Visiteur (Thomas — Koïphile Expert)

```
/ (home) → /kois (catalogue) → /kois/:id (fiche) → WhatsApp
```
- Navigation : ✅ 2 clics max
- Filtres catalogue : ✅ variété + âge + prix + Konishi
- Bouton WhatsApp : ✅ visible sur carte ET fiche
- Certificat Konishi : ✅ mentionné sur fiche produit
- **Friction identifiée** : numéros WhatsApp manquants → CTA non fonctionnel en production

### 5.2 Flux Admin (Mathilde)

```
/admin/login → /admin/dashboard → /admin/kois → /admin/kois/new
```
- Auth : login.html prototypé ✅
- Dashboard : stats, liens rapides ✅
- CRUD kois : list + form ✅
- Messages : badge unread, mark as read ✅
- **Absence** : pas de flow de validation commande ni de gestion stock dans le prototype

### 5.3 Flux Débutant (Camille)

```
/ (hero "seul Konishi en France" → 5 secondes) → /decouvrir → /kois
```
- Hero claim : ✅ accroche visible immédiatement
- Page découvrir : ✅ biographie Manu & Mathilde
- Aucun jargon en hero : ✅ "koïs de lignée Konishi" avec badge explicatif

---

## 6. Audit HTML

### 6.1 Sémantique

| Élément | Utilisation | Statut |
|---------|-------------|--------|
| `<main>` | Présent sur toutes les pages | ✅ |
| `<nav>` | Header + sidebar | ✅ |
| `<aside>` | Sidebar admin | ✅ |
| `<section>` | Sections de contenu | ✅ |
| `<article>` | Cartes koi (implicite) | ⚠️ utilise `<div class="koi-card">` |
| `<h1>` unique par page | Oui dans pages/ | ✅ |
| `alt` sur images | Présent sur koi-thumb | ✅ |
| `lang` sur `<html>` | `lang="fr"` | ✅ |

### 6.2 Violations Détectées

- `<div>` utilisé pour les cartes koi au lieu de `<article>` — sémantique correcte mais non strictement HTML5
- Sidebar dupliquée dans chaque page HTML → problème de maintenabilité, pas de sémantique
- `order-form.js` génère du HTML avec `onclick=""` inline via `innerHTML` → violates CLAUDE.md rules

### 6.3 Fichiers Dépassant 200 Lignes

Les pages dans `pages/` sont **des exceptions autorisées** par CLAUDE.md. Les organisms et molecules suivants dépassent la limite non-exception :

| Fichier | Lignes | Action Requise |
|---------|--------|----------------|
| `VISITORS/organisms/header.html` | 320 | Extraire nav items → molecule |
| `VISITORS/molecules/nav-header.html` | 310 | Décomposer en sous-composants |
| `VISITORS/organisms/koi-showcase.html` | 218 | Légèrement au-dessus |
| `VISITORS/organisms/koi-detail.html` | 212 | Légèrement au-dessus |

---

## 7. Audit CSS

### 7.1 Architecture ADMIN

```
admin.css (manifest) → variables.css + layout.css + components.css + forms.css + tables.css
```

Points positifs :
- Manifest propre, imports séparés
- Variables centralisées (V3 tokens)
- Mobile-first systématique (`min-width` uniquement)

**Violations 200 lignes (non-exceptions) :**

| Fichier | Lignes | Action |
|---------|--------|--------|
| `layout.css` | 388 | Extraire sidebar/topbar en fichiers séparés |
| `components.css` | 328 | Séparer buttons.css / stat-cards.css / badges.css |
| `forms.css` | 294 | Extraire form-grid.css, form-inputs.css |
| `utilities.css` | 256 | Acceptable, peu d'alternatives |

### 7.2 Architecture VISITORS

**Violations 200 lignes (non-exceptions) :**

| Fichier | Lignes | Action |
|---------|--------|--------|
| `header.css` | 378 | nav.css + mobile-menu.css |
| `footer.css` | 283 | Acceptable (2 variants) |
| `product-pages.css` | 343 | Extraire gallery.css |
| `koi-card-pages.css` | 310 | Extraire koi-detail-gallery.css |
| `forms.css` | 312 | Extraire form-validation.css |
| `farm.css` | 308 | Acceptable (galerie isolée) |
| `koi-card.css` | 213 | À surveiller |
| `catalogue.css` | 216 | À surveiller |

### 7.3 Inconsistance Cross-Workspace

`ADMIN/assets/css/admin.css` importe :
```css
@import url("../../../VISITORS/assets/css/variables.css");
@import url("../../../VISITORS/assets/css/button.css");
```

**Problème** : couplage fragile entre workspaces, chemins relatifs cassés si un dossier est renommé. En Rails : à remplacer par un fichier `tokens.css` partagé dans `app/assets/stylesheets/shared/`.

### 7.4 Tokens Dupliqués

Deux sets de tokens pour la même palette :

| ADMIN | VISITORS | Valeur |
|-------|----------|--------|
| `--rouge-vif` | `--c-red` | `#e60000` |
| `--rouge-sombre` | `--c-wine` | `#630f0f` |
| `--noir` | `--c-black` | `#000000` |
| `--blanc-casse` | `--c-cream` | `#f5f5f2` |
| `--blanc-pur` | `--c-white` | `#ffffff` |

**Action Rails** : un seul `variables.css` dans `app/assets/stylesheets/shared/variables.css`.

---

## 8. Audit JS

### 8.1 VISITORS JavaScript

| Fichier | Lignes | Qualité | Notes |
|---------|--------|---------|-------|
| `header.js` | 78 | ✅ Bon | IntersectionObserver, DOMContentLoaded |
| `filter.js` | 77 | ✅ Bon | Event delegation, data-attribute filtering |
| `gallery.js` | 106 | ✅ Bon | Lightbox accessible (role=dialog, aria-modal) |
| `animations.js` | 45 | ✅ Bon | `turbo:load` compatible |

**Problème dans `gallery.js`** :
```js
overlay.style.cssText = `...inline styles...`
```
Utilise `cssText` pour injecter des styles inline → déconseillé. En Rails/Stimulus : utiliser des classes CSS et `classList.add()`.

### 8.2 ADMIN JavaScript

| Fichier | Lignes | Qualité | Notes |
|---------|--------|---------|-------|
| `admin.js` | 142 | ✅ Bon | Event delegation, DOMContentLoaded |
| `koi-form.js` | 59 | ⚠️ Partiel | Non migré vers admin.js |
| `order-form.js` | 104 | ❌ Problème | `innerHTML` avec `onclick=""` inline |
| `notifications.js` | 58 | ✅ OK | Toast system |
| `payments.js` | 41 | ✅ OK | |
| `theme.js` | 12 | ✅ OK | |

**Violation critique dans `order-form.js`** :
```js
row.innerHTML = `<button onclick="removeLine(this)">...</button>`;
```
Génère des handlers inline → viole CLAUDE.md + rendra la migration Stimulus complexe.

### 8.3 Compatibilité Turbo/Stimulus

- `animations.js` écoute `turbo:load` ✅ — déjà compatible
- Reste des fichiers : `DOMContentLoaded` uniquement — **problème avec Turbo** : après navigation Turbo, `DOMContentLoaded` ne re-fire pas
- **Action** : tous les listeners doivent être enregistrés sur `document.addEventListener('turbo:load', ...)` ou portés vers des Stimulus controllers

---

## 9. Accessibilité

### Points Positifs

- `lang="fr"` sur `<html>` ✅
- `alt` attributs présents sur images ✅
- `aria-label` sur icônes sans texte ✅
- `role="dialog"`, `aria-modal="true"` dans `gallery.js` ✅
- `focus-visible` styles définis dans `base.css` ✅
- `sr-only` classe définie dans `utilities.css` ✅
- Navigation clavier : pas de trap détecté dans HTML statique

### Points Manquants

| Problème | Fichier | Priorité |
|---------|---------|----------|
| `<div class="koi-card">` sans `role` | `koi-card.html` | Moyenne — utiliser `<article>` |
| Focus trap dans lightbox | `gallery.js` | **Haute** — tabulation sort du modal |
| Skip link "aller au contenu" | Toutes les pages | Haute — THP accessibilité |
| Labels form manquants sur filtres | `filter-bar.html` | Moyenne |
| `aria-live` pour filtres | `kois.html` | Moyenne — annonce dynamique |
| Contraste ratio non mesuré | Global | Haute — à vérifier avec Axe |

---

## 10. Performance

### Estimations (sans Lighthouse)

| Élément | Impact | Notes |
|---------|--------|-------|
| CSS `backdrop-filter: blur()` | Moyen | Utilisé dans header pill — GPU-intensif sur mobile |
| Pseudo-éléments `body::before/after` | Faible | Background texture sakura — toujours visible |
| `IntersectionObserver` | Positif | Évite scroll listeners continus |
| Images sans `loading="lazy"` | Négatif | `koi-thumb.html` — à ajouter |
| Polices locales (docs/fonts/) | Positif | Pas de requêtes Google Fonts |
| `clamp()` CSS | Positif | Pas de media queries pour la typo |
| CSS non-minifié | Neutre | Sera géré par Asset Pipeline en Rails |
| 23+ fichiers CSS en VISITORS | Négatif | HTTP/2 OK, mais nombreuses requêtes |

### Actions Prioritaires

1. Ajouter `loading="lazy"` sur toutes les images `koi-thumb`
2. Ajouter `width` et `height` sur images pour éviter le layout shift (CLS)
3. En Rails : Sprockets bundlera le CSS → réduira les requêtes

---

## 11. Responsive

### ADMIN

- Sidebar : collapse à 64px sur mobile, toggle burger ✅
- Tables : `table-responsive` wrapper sur toutes les tables ✅
- Forms : grid responsive 1 → 2 colonnes ✅
- Media queries : `min-width: 769px` et `min-width: 1025px` ✅

**Problème identifié** : `dashboard.html` et `messages.html` contiennent des `max-width` media queries en `<style>` inline — viole la règle `min-width` only du CLAUDE.md.

### VISITORS

- Header : burger menu + dropdown sur mobile ✅
- Catalogue koi : grid 1 → 2 → 3 → 4 colonnes ✅
- Hero : titre responsive via `clamp()` ✅
- Product : layout 1 col mobile → 2 col desktop ✅
- WhatsApp CTA flottant : visible sur mobile ✅

---

## 12. Sécurité (Frontend)

### Liens Externes

- WhatsApp : `https://wa.me/XXXXXXXXXX?text=...` — URL direct, pas de redirection ✅
- Facebook : lien fourni par client — `rel="noopener noreferrer"` à vérifier
- Instagram : lien fourni par client — même vérification

### Patterns Non-Sécurisés

| Problème | Localisation | Risque |
|---------|-------------|--------|
| `innerHTML` avec données utilisateur | `order-form.js` | Risque XSS si les données viennent d'une API — à nettoyer avant Rails |
| Liens externes sans `noopener` | Toutes pages footer | Faible (statique), critique en Rails |
| Formulaire contact sans CSRF | `contact-form.html` | N/A en statique — Rails génère le token automatiquement |

---

## 13. Compatibilité Rails

### 13.1 Layout Mapping

```
VISITORS/templates/visitor-layout.html
→ app/views/layouts/application.html.erb

ADMIN/templates/admin-layout.html
→ app/views/layouts/admin.html.erb
```

Le layout admin nécessite un `content_for :sidebar` ou un partial conditionnel.

### 13.2 Partials Mapping

| HTML Statique | Partial Rails |
|--------------|---------------|
| `VISITORS/organisms/header.html` | `app/views/shared/_header.html.erb` |
| `VISITORS/organisms/footer.html` | `app/views/shared/_footer.html.erb` |
| `VISITORS/organisms/hero.html` | `app/views/shared/_hero.html.erb` |
| `VISITORS/molecules/koi-card.html` | `app/views/kois/_card.html.erb` |
| `VISITORS/molecules/filter-bar.html` | `app/views/kois/_filters.html.erb` |
| `VISITORS/molecules/cta-whatsapp.html` | `app/views/shared/_whatsapp_cta.html.erb` |
| `VISITORS/atoms/badge.html` | `app/views/shared/_badge.html.erb` |
| `VISITORS/atoms/price.html` | `app/views/shared/_price.html.erb` |
| `ADMIN/organisms/sidebar.html` | `app/views/admin/shared/_sidebar.html.erb` |
| `ADMIN/organisms/topbar.html` | `app/views/admin/shared/_topbar.html.erb` |
| `ADMIN/molecules/koi-admin.html` | `app/views/admin/kois/_row.html.erb` |
| `ADMIN/molecules/messages-ui.html` | `app/views/admin/messages/_row.html.erb` |

### 13.3 Rails Helpers (Remplacement Obligatoire)

| HTML Statique | Helper Rails |
|--------------|--------------|
| `<a href="/kois">Catalogue</a>` | `<%= link_to "Catalogue", kois_path %>` |
| `<img src="...koi.jpg">` | `<%= image_tag koi.images.first.url, alt: koi.name %>` |
| `<form action="/messages">` | `<%= form_with model: @message do |f| %>` |
| `<a href="https://wa.me/...">` | `<%= link_to "WhatsApp", whatsapp_url(@koi), target: "_blank", rel: "noopener noreferrer" %>` |

### 13.4 Assets Pipeline

**CSS :** `app/assets/stylesheets/application.css`
```css
/*
 *= require_tree .
 *= require_self
 */
```
Ou Propshaft + importmap selon config Rails 8.

**JS :** Avec Importmap (Rails 8 default) :
```ruby
# config/importmap.rb
pin "application"
pin "header_controller", to: "controllers/header_controller.js"
pin "filter_controller", to: "controllers/filter_controller.js"
pin "gallery_controller", to: "controllers/gallery_controller.js"
```

**Polices :** `docs/fonts/` → `app/assets/fonts/`
- Mettre à jour `@font-face` dans `fonts.css`

**Images placeholder :** remplacer par Cloudinary via `app/services/cloudinary_service.rb`

### 13.5 JS → Stimulus Migration

| JS Actuel | Stimulus Controller |
|-----------|---------------------|
| `header.js` | `HeaderController` (scroll + mobile menu) |
| `filter.js` | `FilterController` (catalogue filters) |
| `gallery.js` | `GalleryController` (lightbox) |
| `animations.js` | `AnimationController` (IntersectionObserver) |
| `admin.js` | `SidebarController` + `TableController` |
| `order-form.js` | `OrderFormController` (dynamic line items) |
| `koi-form.js` | `KoiFormController` (image preview) |

### 13.6 MVC Mapping

| Route | Controller#Action | View |
|-------|-------------------|------|
| `GET /` | `home#index` | `home/index.html.erb` |
| `GET /kois` | `kois#index` | `kois/index.html.erb` |
| `GET /kois/:id` | `kois#show` | `kois/show.html.erb` |
| `GET /decouvrir` | `pages#decouvrir` | `pages/decouvrir.html.erb` |
| `GET /azukari` | `pages#azukari` | `pages/azukari.html.erb` |
| `GET /materiel` | `pages#materiel` | `pages/materiel.html.erb` |
| `GET /soins` | `pages#soins` | `pages/soins.html.erb` |
| `GET /nourriture` | `pages#nourriture` | `pages/nourriture.html.erb` |
| `GET /contact` | `messages#new` | `messages/new.html.erb` |
| `POST /messages` | `messages#create` | — (redirect) |
| `GET /admin` | `admin/dashboard#index` | `admin/dashboard/index.html.erb` |
| `GET/POST /admin/kois` | `admin/kois#index/create` | ERB |
| `GET/PATCH/DELETE /admin/kois/:id` | `admin/kois#show/update/destroy` | ERB |
| `GET /admin/messages` | `admin/messages#index` | ERB |
| `PATCH /admin/messages/:id` | `admin/messages#update` | — (read flag) |

---

## 14. Plan d'Action

### 🔴 Bloquants THP (Éliminatoires)

1. **Implémenter Devise** : `rails generate devise:install`, 5 vues custom, `role` enum (visitor/admin)
2. **ActionMailer** : mailer contact form, configurer SMTP en production (Mailjet recommandé pour VPS)
3. **API Cloudinary** : `app/services/cloudinary_service.rb`, upload images koi, migration colonnes `url`
4. **Seeds complets** : 26 variétés de koi, données factices pour démo jury
5. **Tests** : au minimum `rails test` sur models (User, Koi, Message, Order)
6. **Routes RESTful** : aucune route POST hors CRUD — à valider dans `config/routes.rb`
7. **README en anglais** : `kois-story/README.md` — vérifier contenu actuel

### 🟠 Bloquants Rails

8. **Migration layout** : `visitor-layout.html` → `application.html.erb`, `admin-layout.html` → `admin.html.erb`
9. **Remplacement `<a href>` hardcodés** : utiliser Rails helpers partout
10. **Remplacement `<img src>` hardcodés** : `image_tag` ou Cloudinary helper
11. **CSRF token** : Rails l'ajoute automatiquement — vérifier formulaires, ne pas utiliser `data: { turbo: false }` sans raison
12. **`order-form.js` refactor** : supprimer `innerHTML` avec `onclick` inline → Stimulus `OrderFormController`
13. **Turbo compatibility** : tous les `DOMContentLoaded` → `turbo:load` ou Stimulus `connect()`
14. **Fusion tokens CSS** : un seul `variables.css` partagé (ADMIN + VISITORS)

### 🟡 Refactor (Avant ou Pendant Rails)

15. **CSS 200 lignes** : découper `layout.css` (sidebar/topbar), `components.css` (buttons/cards/badges), `forms.css` (grid/inputs)
16. **Sidebar DRY** : supprimer la duplication dans les pages — en Rails, `render 'admin/shared/sidebar'` dans le layout
17. **`gallery.js`** : remplacer `style.cssText` inline par classes CSS + `classList`
18. **`koi-form.js`** : migrer dans `admin.js` ou vers `KoiFormController`
19. **`dashboard.html` / `messages.html`** : supprimer `max-width` media queries des `<style>` inline
20. **Tokens unifiés** : `--rouge-vif` vs `--c-red` → choisir une convention unique

### 🟢 Optimisations

21. `loading="lazy"` sur toutes les images `<img>` non-hero
22. `width` + `height` sur images pour réduire CLS
23. `rel="noopener noreferrer"` sur tous liens externes
24. Skip link "Aller au contenu principal" dans chaque layout
25. Focus trap dans le lightbox (`gallery.js`)
26. `aria-live="polite"` sur le compteur de résultats filtres

---

## 15. Verdict

### Score Final : 73/100

| Dimension | Score | Commentaire |
|-----------|-------|-------------|
| UI/Design | 16/20 | Palette V3 cohérente, typo soignée, tokens bien définis |
| UX/Flows | 15/20 | Flows clairs, WhatsApp intégré, filtres fonctionnels |
| HTML/Accessibilité | 13/20 | Sémantique correcte, ARIA présent, gaps focus trap et skip links |
| CSS/Architecture | 14/20 | Modulaire, DRY en progrès, 18 violations 200 lignes |
| JS/Interactivité | 15/20 | Majoritairement propre, order-form.js problématique |

### Conformité THP (Limitée au Frontend)

**Ce qui est prêt :** Proposition de valeur, design system, flows UX, composants, mobile.
**Ce qui est critique :** Backend complet (Devise, Mailer, API, Models, Seeds, Tests) — tout manque.

### Readiness Rails : 6/10

Le frontend est un socle solide. La structure Atomic Design se mappe bien aux partials Rails. Les principaux obstacles sont les helpers hardcodés, la duplication sidebar, et la migration Stimulus des listeners JS.

### Risques Majeurs

| Risque | Probabilité | Impact |
|--------|-------------|--------|
| Backend non prêt avant deadline 23/03/2026 | **Haute** | **Éliminatoire** |
| Cloudinary non configuré (images manquantes) | Haute | Forte dégradation UX jury |
| WhatsApp numéros manquants | Haute | CTA principal non fonctionnel |
| Mailer non fonctionnel en production | Haute | Critère éliminatoire THP |
| Seeds incomplets (26 variétés) | Moyenne | Demo vide devant jury |
| Google Business non créé | Haute | Pas d'adresse Maps affichable |
