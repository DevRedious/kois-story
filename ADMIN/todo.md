# TODO — Back-office Admin

Suivi des corrections et améliorations basées sur l'audit technique (`AUDIT_ADMIN.md`).

## ✅ Actions Effectuées (Audit & Harmonisation)

- [x] **Centralisation de la logique JS** : Migration des fonctions `toggleSidebar` et déconnexion dans `admin.js`.
- [x] **Harmonisation de la Topbar** : Unification de la structure HTML et utilisation de la classe `.burger-icon`.
- [x] **Système de Navigation** : Ajout des fils d'Ariane (`breadcrumbs`) sur tous les formulaires.
- [x] **Standardisation du Logout** : Utilisation de la classe `.logout-btn` sur tous les boutons de déconnexion pour la gestion globale.
- [x] **Mode 100% Local (sans fetch)** : Injection directe de la sidebar dans chaque fichier HTML pour permettre la consultation hors-serveur (double-clic).
- [x] **Unification de la Sidebar** : Synchronisation complète du template `admin-layout.html` et de `organisms/sidebar.html` avec tous les liens fonctionnels.
- [x] **Cohérence des Identifiants** : Standardisation des conteneurs de sidebar (`id="sidebar"` sur tous les `<aside>`).
- [x] **Modularisation du CSS** : Éclatement du fichier monolithique `admin.css` en modules spécialisés et maintenables.
- [x] **Refacto Mobile-First** : Inversion de la logique CSS dans les modules. Styles de base pour mobile, expansion via `min-width`.
- [x] **Tables Responsives** : Enveloppement de tous les tableaux dans des conteneurs `.table-responsive`.

---

## 🐛 Bugs Confirmés par Audit (18 Mars 2026)

> Ces points étaient marqués comme "faits" mais l'audit a révélé qu'ils sont **incomplets ou incorrects**.

### JS — `onclick` / `onchange` inline non supprimés
13 attributs recensés, à migrer dans `admin.js` via délégation d'événements :
- [x] `koi-form.html` ligne 264 — `onclick` bouton upload photo → `koi-form.js`
- [x] `koi-form.html` ligne 268 — `onchange="previewImages(this)"` → `koi-form.js`
- [x] `koi-form.html` ligne 294 — `onclick="this.parentNode.remove()"` → `koi-form.js`
- [x] `order-form.html` ligne 155 — `onchange="updateRow(this)"` → `order-form.js`
- [x] `order-form.html` ligne 158 — `onclick="removeLine(this)"` → `order-form.js`
- [x] `order-form.html` ligne 162 — `onchange="updateRow(this)"` → `order-form.js`
- [x] `order-form.html` ligne 165 — `onclick="removeLine(this)"` → `order-form.js`
- [x] `order-form.html` ligne 169 — `onchange="updateRow(this)"` → `order-form.js`
- [x] `order-form.html` ligne 172 — `onclick="removeLine(this)"` → `order-form.js`
- [x] `order-form.html` ligne 179 — `onclick="addLine()"` → `order-form.js`
- [x] `order-form.html` ligne 182 — `onchange="updateTotal()"` → `order-form.js`
- [x] `payments.html` ligne 139 — `onchange="filterPayments(this.value)"`
- [x] `payments.html` ligne 214 — `onchange="toggleDueDate(this.value)"`

### JS — Blocs `<script>` de page non supprimés
Les scripts inline en bas de page n'ont **pas** été migrés dans `admin.js` :
- [x] `koi-form.html` — migré dans `koi-form.js` (rewrite final — sélecteurs alignés, script inline supprimé)
- [x] `order-form.html` — migré dans `order-form.js`
- [x] `kois.html` — migré dans `kois.js`
- [x] `messages.html` — migré dans `messages.js`
- [x] `orders.html` — migré dans `orders.js`
- [x] `payments.html` — migré dans `payments.js`

### JS — Fonction globale résiduelle
- [x] `admin.js` — `function toggleSidebar()` globale supprimée (plus présente dans le fichier refactorisé)

### CSS — Media queries `max-width` résiduelles
Ces pages ont des blocs `<style>` inline qui contredisent la règle mobile-first :
- [x] `dashboard.html` — `@media(max-width:768px)` et `@media(max-width:480px)` → corrigées en `min-width` + couleurs V3
- [x] `messages.html` — `@media(max-width:768px)` → corrigée en `min-width` + couleurs V3

### CSS — Styles inline excessifs (`style=""`)
- [x] `order-form.html` — ~39 attributs `style=""` sur les cellules et éléments de formulaire → classes CSS + `<style>` block
- [x] `client-form.html` — ~35 attributs `style=""` sur les cellules et sections de formulaire → classes CSS + `<style>` block
- [x] `product-form.html` — ~10 attributs `style=""` sur les textes d'aide → `.label-hint`, `.field-hint`, `.form-actions`

### JS — Styles de notification codés en dur dans `admin.js`
- [x] `showNotification()` extraite dans `notifications.js` — styles déplacés en CSS avec classes `.admin-notification`, `.success`, `.error`, `.info`. Palette V3 appliquée.

### Navigation — Incohérence breadcrumb
- [x] `dashboard.html` — breadcrumb ajouté (`Admin` seul, sans séparateur — cohérent avec position racine)

---

## 🎨 Palette V3 — Non-Conformité Critique (Audit 18 Mars 2026)

> **Priorité maximale.** L'ancienne palette est encore définie et utilisée partout. Aucune couleur V3 n'est dans `variables.css`.

### `assets/css/variables.css` — À réécrire entièrement
- [x] Supprimer les 5 variables obsolètes : `--rouge-koi`, `--bleu-profond`, `--or-konishi`, `--gris-pierre`, `--blanc-perle`
- [x] Ajouter les 5 variables V3 : `--rouge-vif: #e60000`, `--rouge-sombre: #630f0f`, `--noir: #000000`, `--blanc-casse: #f5f5f2`, `--blanc-pur: #ffffff`
- [x] Migrer tous les usages dans les 4 modules CSS (`components.css`, `layout.css`, `forms.css`, `tables.css`) et `admin.css`

### `assets/js/admin.js` — Couleurs codées en dur
- [x] `showNotification()` extraite dans `notifications.js` — déjà V3 (palette appliquée lors du découpage)

### Boilerplate `:root` dans les composants (tous contiennent l'ancienne palette)
- [x] `atoms/` : `button.html`, `input.html`, `avatar.html`, `badge.html`, `stat-card.html`, `toggle.html`, `amount.html` — boilerplate remplacé par `<link admin.css>`, palette V3
- [x] `molecules/` : `nav-item.html`, `filter-bar.html`, `koi-row.html`, `message-row.html`, `client-row.html`, `product-row.html`, `payment-row.html`, `order-row.html` — idem
- [x] `organisms/` : `kois-table.html`, `messages-table.html`, `orders-table.html`, `products-table.html`, `payments-table.html`, `clients-table.html`, `topbar.html` — idem
- [x] `pages/` : toutes les références à l'ancienne palette corrigées
- [x] `templates/admin-layout.html` — palette V3 appliquée (`:root` + refs --rouge-vif, --rouge-sombre, --noir, --blanc-casse, --gris)

---

## 🚨 Violations Limite 200 Lignes (Directive CLAUDE.md)

> Règle : aucun fichier hors `pages/` et `templates/admin-layout.html` ne peut dépasser 200 lignes.

### Violations hard (non-exceptions, action obligatoire)

- [x] **`assets/js/admin.js` — 276 → 116 lignes** → Découpé en modules :
  - `notifications.js` (56 lignes) — `showNotification()` + styles CSS + palette V3
  - `koi-form.js` (52 lignes) — upload images, prévisualisation, soumission
  - `order-form.js` (82 lignes) — gestion lignes de commande via délégation
  - `admin.js` réduit aux comportements globaux — bugs `this` corrigés

- [x] **`organisms/kois-table.html` — 214 → 130 lignes** → boilerplate supprimé, link admin.css, 26 variétés mises à jour, palette V3

### Problème structurel : boilerplate CSS dupliqué dans tous les composants
- [x] Solution adoptée : lier `admin.css` directement dans chaque composant (remplace le boilerplate `@font-face` + `:root`)
- [x] Tous les atoms, molecules et organisms migrés (voir section précédente)

### Pages hors normes (exceptions tolérées, mais à surveiller)

Les `pages/` sont exclues de la limite stricte car elles intègrent la sidebar en dur (mode offline). Cependant les plus lourdes contiennent du code qui devrait être dans les couches inférieures :

- [x] **`koi-form.html` — 311 → 262 lignes** : bloc `<style>` supprimé (classes déplacées dans `forms.css` : price-wrap, toggle-*, logo-konishi, required, mt-2, mt-1). Styles inline restants remplacés par classes.
- [x] **`order-form.html`** : `<script>` inline supprimé, 39 `style=""` extraits en classes, inline handlers supprimés, `order-form.js` réécrit pour matcher l'HTML.
- [x] **`accounting.html` — 266 lignes** : blocs identifiés — `stats-grid` (4 stat-cards), panel Commandes, panel Paiements ; extractibles en partials Rails (`_accounting_stats`, `_accounting_orders_table`, `_accounting_payments_table`). Pas d’organismes statiques ajoutés (mode offline).
- [x] **`payments.html`** : filtre par statut via `data-payment-status` + `payments.js` (déjà migré).
- [x] **`kois.html`** : filtre/tri géré par `kois.js` (aucun script inline).

---

## 📋 Mises à Jour Contenu Client (Infos reçues le 18 Mars 2026)

### `koi-form.html` — Variétés
- [x] **Réécrire la liste des variétés** — 26 variétés exactes client, ordre alphabétique, ancienne liste supprimée

### `kois.html` + `kois-table.html` — Filtres
- [x] **Mettre à jour le filtre "Variété"** dans `kois.html` avec les 26 variétés confirmées
- [x] **Mettre à jour le filtre "Variété"** dans `organisms/kois-table.html` (26 variétés déjà alignées)

### `payments.html` — Stripe
- [x] **Bannière Stripe** : mise à jour "en cours d'évaluation"

---

## 🛠️ À Faire (Optimisations & UX)

### Design & CSS
- [x] **Accessibilité (A11y)** : `aria-label` ajoutés sur les boutons d'action des tableaux (Éditer, Supprimer, Voir, Paiement, Solder, Encaisser) — kois.html, orders.html, products.html, payments.html, messages.html.
- [x] **Standardisation des Icônes** : Remplacer les `<img src="*.svg">` de la sidebar par du SVG inline pour contrôle via `currentColor`. Fichiers concernés : `icon-kois.svg`, `icon-product.svg`, `icon-commande.svg`, `icon-cb.svg`, `icon-message.svg`, `icon-archive.svg`, `icon-newsletter.svg`, `icon-maps.svg`. Appliqué à `organisms/sidebar.html` et toutes les pages (dashboard, kois, orders, products, payments, messages, clients, accounting, newsletter, koi-form, order-form, client-form, product-form).
- [x] **Utilitaires CSS** : Créer `utilities.css` et déplacer les styles `style="..."` résiduels vers des classes utilitaires.

### Composants & Tableaux
- [ ] **Mode Card Mobile** : Implémenter un affichage en cartes pour les tableaux sur mobile (actuellement scroll horizontal uniquement).
- [x] **Validation Formulaires** : Ajouter des validations visuelles (états `:invalid` et `:valid`) plus explicites sur tous les formulaires (forms.css).

### Préparation Intégration Rails
- [ ] **Layout unique** : Aligner la structure sur `app/views/layouts/admin.html.erb`. Supprimer la duplication sidebar/CSS dans `admin-layout.html`.
- [ ] **Assets Pipeline** : Prévoir le déplacement des polices (`docs/fonts/`) et icônes vers `app/assets/`.
- [ ] **Active link** : Remplacer la gestion manuelle de `.nav-item.active` (attribut `data-page`) par `active_link_to` Rails.

---

## 📐 Conformité THP — Grille & Barème (Jury)

> Référence : `docs/sources/ANALYSE_BAREME_GRILLE.md` (synthèse PDF Grille projets finaux + xlsx Barème Fullstack élève). Un seul critère éliminatoire non respecté = projet refusé.

### Jury Produit (à vérifier sur le site public)
- [ ] Page d'accueil : proposition de valeur claire, logo + slogan, pas de texte vague ou excessif.
- [ ] Signup Devise : uniquement email + mot de passe (prénom/nom tolérés si justifiés ; pas de photo, bio, date de naissance, même en optionnel).
- [ ] Navigation : navbar utilisable, liens visibles, pas de retour obligatoire pour naviguer.
- [ ] Fonctionnalité principale (catalogue / contact) utilisable sans erreur.

### Jury Technique (Rails — à respecter au build)
- [ ] Code et README en anglais (aucun nom de classe/model/variable en français).
- [ ] Routes REST uniquement (aucun POST hors CRUD ; GET OK pour pages statiques).
- [ ] Liens et images via helpers Rails uniquement (`link_to`, `image_tag`), pas de `<a href>` ou `<img src>` en dur.
- [ ] Clefs API en variables d'environnement, jamais en clair dans le code.
- [ ] Fat Model Skinny Controllers, validations dans les models, N-N en `has_many :through`.
- [ ] Mailer présent et fonctionnel en production ; au moins une API externe (ex. Cloudinary, hors mailer / Google Maps).

### Jury Cursus (organisation)
- [ ] App déployée et fonctionnelle en production.
- [ ] Devise : 5 vues avec CSS (inscription, connexion, édition, mot de passe oublié, réinitialisation).
- [ ] Dashboard admin présent ; Hotwire/Stimulus utilisés.
- [ ] Trello (ou Asana / Atlassian) pour la gestion de projet.
- [ ] Dépôt GitHub/GitLab, branches utilisées, pas de commit sur Master, commits en anglais et explicites.

---

## 🎨 Audit CSS — Classes Manquantes (18 Mars 2026)

> Classes utilisées dans les pages HTML mais absentes des modules CSS — toutes corrigées.

### `layout.css` — Internes sidebar & navigation
- [x] `sidebar-nav`, `sidebar-footer` — structure verticale de la sidebar
- [x] `brand-sub`, `nav-label`, `nav-badge-dormant`, `nav-item.dormant` — éléments de navigation
- [x] `admin-user`, `admin-avatar`, `admin-info`, `admin-name`, `admin-role` — pied de sidebar
- [x] `breadcrumb`, `.sep`, `.current` — fil d'Ariane topbar (toutes les pages)
- [x] `quick-actions`, `page-greeting`, `page-date` — helpers dashboard

### `components.css` — Badges, dormant, stat extras
- [x] `badge-completed`, `badge-confirmed`, `badge-in-progress`, `badge-cancelled`, `badge-dormant` — statuts commandes
- [x] `badge-materiel`, `badge-nourriture`, `badge-soins` — catégories produits
- [x] `cat-materiel`, `cat-soins`, `cat-nourriture` — tags catégorie (products.html — `<style>` inline supprimé)
- [x] `spacer` — utilitaire flex (kois.html)
- [x] `dormant-banner` — bandeau modules V2
- [x] `stat-icon`, `stat-sub.up`, `stat-sub.down`, `stats-6` — extras stat-cards dashboard
- [x] `btn-lg` — taille bouton manquante
- [x] `btn-sm` — taille bouton manquante (utilisée partout, jamais définie !)

### `forms.css` — Sections, upload, preview
- [x] `form-section`, `form-section-title`, `section-num` — sections formulaire koi
- [x] `form-footer`, `form-hint` — helpers bas de formulaire
- [x] `upload-zone`, `upload-icon`, `upload-label`, `upload-hint`, `cloudinary-note` — zone upload photo
- [x] `img-preview`, `img-thumb`, `img-remove` — grille de prévisualisation images

### `tables.css` — Alignement, filtres, lignes enrichies
- [x] `td-center`, `td-right`, `td-action`, `td-ref` — helpers alignement cellules
- [x] `row-actions` — colonne actions tableaux
- [x] `filter-bar`, `filter-search`, `filter-count`, `filter-spacer` — barre de filtres
- [x] `msg-row`, `msg-preview`, `msg-date`, `msg-time`, `msg-email`, `unread-count` — lignes messages
- [x] `koi-cell`, `koi-thumb`, `koi-name`, `koi-variety`, `koi-price` — cellules tableau koïs
- [x] `client-cell`, `client-avatar` — cellules tableau clients

### Topbar & Logout — Bouton icône
- [x] `btn-icon` — nouveau style bouton icône (32×32px, transparent + bordure)
- [x] `topbar-count` — badge compteur topbar (ex: "3 non lus")
- [x] `.topbar-left`, `.topbar-right`, `.topbar-user`, `.topbar-avatar`, `.topbar-divider` — sous-éléments topbar manquants dans `layout.css`
- [x] `icon-logout.svg` — créé dans `assets/icons/` avec palette V3 (porte #d0d7de, flèche #e60000)
- [x] Bouton `Déconnexion` remplacé par icône sur les 13 pages

### Non migrés (volontairement dans `<style>` de page)
- `toggle-row`, `toggle-switch`, `toggle-slider`, `toggle-desc`, `toggle-hint` — `koi-form.html` uniquement
- `price-wrap` — `koi-form.html` uniquement
- `logo-konishi` — `koi-form.html` et `dashboard.html` uniquement

---
*Dernière mise à jour : 18 Mars 2026 — koi-form 311→262 lignes (styles → forms.css), A11y aria-label sur boutons d’action tableaux, Icônes sidebar SVG inline (newsletter + 4 formulaires). Utilitaires + validation cochés.*
