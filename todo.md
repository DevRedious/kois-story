# TODO — Koi's Story

> Mise à jour : 2026-03-22 — Branch `MVP`. Rails app opérationnelle.

Palette autorisée : `#e60000` · `#630f0f` · `#000000` · `#f5f5f2` · `#ffffff` · `#25d366` (WhatsApp uniquement)
Logo : `docs/assets/LOGO MANU FINI.png`
Fonts : `docs/fonts/inter/` + `docs/fonts/playfair-display/` (aucune dépendance Google Fonts)

---

## ✅ Terminé — Rails & Backend

- [x] Initialiser l'application Rails (Rails 8.1.2, SQLite, Propshaft + Importmap)
- [x] Configurer la base SQLite
- [x] Installer Devise (+ devise-two-factor sur User)
- [x] Créer les modèles V1 dans l'ordre de migration :
  - [x] `User` (Devise, rôle: visitor|client|admin)
  - [x] `Koi` (status: available|sold_out|incoming, age_class, age, sex)
  - [x] `Image` (polymorphique : koi ou product) + ImageUploader Cloudinary
  - [x] `Tag`, `KoiTag`
  - [x] `Message` + `after_create :notify_admin` → MessageMailer
  - [x] `Product` (category: materiel|soins|nourriture)
  - [x] `ClientProfile`
  - [x] `Order`, `OrderItem`, `Payment`
  - `NewsletterSubscriber` *(dormant V2 — intentionnellement absent)*
- [x] Mettre en place les migrations dans l'ordre prévu (11 tables, schema v20260320143856)
- [x] Construire les routes REST principales (public + namespace admin)
- [x] Seeds de démonstration : 26 variétés, 2 admins
- [x] ActionMailer fonctionnel (formulaire contact → notification admin)
- [x] Intégrer Cloudinary (ImageUploader sur Image)
- [x] Admin CRUD Koïs (`Admin::KoisController` complet)
- [x] Admin Messages (`Admin::MessagesController` index, show, update + flag `read`)
- [x] Vues publiques : `kois/index`, `kois/show`, `home/index`, Devise complet
- [x] Badge Konishi affiché sur les cartes koïs
- [x] Bouton WhatsApp avec message prérempli
- [x] Corriger bug root route (`root "home#index"`)
- [x] Corriger bug scope `Koi.available`

---

## ✅ Terminé — Frontend / Accessibilité (session 2026-03-22)

- [x] Conversion mobile-first complète : tous les `max-width` convertis en `min-width`
  - `product-pages-section-3.css`, `koi-card-pages-section-3.css`
  - `header-section-1.css`, `header-section-3.css`
- [x] `gallery.js` : suppression des `style.cssText`, remplacement par classes CSS
- [x] CSS overlay galerie ajouté dans `product-section-2.css`
- [x] Focus trap sur la lightbox (overlay clavier — Tab intercepté)
- [x] Skip link "Aller au contenu principal" (`base.css` + `application.html.erb`)
- [x] `id="main-content"` ajouté sur toutes les vues avec `<main>`
- [x] `aria-live="polite" aria-atomic="true"` sur le compteur de filtres
- [x] `<ul role="list">` + `<li>` sur la grille koïs (`kois/index`)
- [x] `aria-label="name, variety"` sur chaque `<article>` carte koï
- [x] `loading="lazy"` sur toutes les images hors-fold (showcase, galerie, story, thumbnails)

---

## 🚧 À faire — Admin CRUD manquant

- [ ] `Admin::ProductsController` (CRUD produits)
- [ ] `Admin::OrdersController` (CRUD commandes)
- [ ] `Admin::PaymentsController` (saisie manuelle : complet / acompte / échelonné)
- [ ] `Admin::ClientProfilesController` (fiches clients)
- [ ] Interface upload image dans le formulaire koï (Cloudinary côté admin)
- [ ] Archive comptable (vue consolidée commandes + paiements)
- [ ] Interface newsletter *(UI prête, envoi dormant V2)*

---

## 🚧 À faire — Vues & CSS

- [ ] Remplir les vues stubs : `pages/decouvrir`, `pages/materiel`, `pages/soins`, `pages/nourriture`, `pages/azukari` (contenu depuis prototype VISITORS)
- [ ] Stimulus controllers : filtres catalogue (variété, age_class, sexe, taille, prix)
- [ ] CSS admin : remplir les stubs vides (la plupart des fichiers admin CSS)
- [ ] Affichage des certificats Konishi (fiche produit)
- [ ] Renommage tokens CSS `--c-*` → `--color-*` *(cosmétique, non-bloquant)*

---

## 🚧 À faire — Mise en production

- [ ] Configurer le VPS (dev + prod)
- [ ] Variables d'environnement Cloudinary + mailer en production
- [ ] Domain name (URL non encore communiquée par le client)
- [ ] Créer la fiche Google Business (client n'a pas encore de compte)

---

## 🎓 Conformité THP — Grille & Barème (éliminatoire)

> Référence : `docs/sources/ANALYSE_BAREME_GRILLE.md`. Un seul critère non respecté = projet refusé.

**Jury Produit**
- [ ] Page d'accueil : proposition de valeur claire, logo + slogan, pas de texte vague ou excessif.
- [ ] Signup Devise : uniquement email + mot de passe (prénom/nom tolérés si justifiés).
- [ ] Navigation : navbar utilisable, liens visibles, pas de retour obligatoire pour naviguer.
- [ ] Fonctionnalité principale (catalogue / contact) utilisable sans erreur.

**Jury Technique (Rails)**
- [ ] Code et README en anglais (aucun nom de classe/model/variable en français).
- [ ] Routes REST uniquement (aucun POST hors CRUD ; GET OK pour pages statiques).
- [ ] Liens et images via helpers Rails uniquement (`link_to`, `image_tag`), pas de `<a href>` ou `<img src>` en dur.
- [ ] Clefs API en variables d'environnement, jamais en clair dans le code.
- [ ] Fat Model Skinny Controllers, validations dans les models, N-N en `has_many :through`.
- [ ] Mailer présent et fonctionnel en production ; au moins une API externe (ex. Cloudinary).

**Jury Cursus**
- [ ] App déployée et fonctionnelle en production.
- [ ] Devise : 5 vues avec CSS (inscription, connexion, édition, mot de passe oublié, réinitialisation).
- [ ] Dashboard admin présent ; Hotwire/Stimulus utilisés.
- [ ] Trello (ou Asana / Atlassian) pour la gestion de projet.
- [ ] Dépôt GitHub/GitLab, branches utilisées, pas de commit sur Master, commits en anglais et explicites.

**Intégration Rails — checklist finale**
- [ ] Layout unique : aligner sur `app/views/layouts/admin.html.erb`, supprimer la duplication sidebar.
- [ ] Assets Pipeline : déplacer les polices (`docs/fonts/`) et icônes vers `app/assets/`.
- [ ] Active link : remplacer la gestion manuelle de `.nav-item.active` par `active_link_to` Rails.
- [ ] Mode Card Mobile : affichage en cartes pour les tableaux sur mobile.

---

## 🎨 À faire — Emojis SVG

> Remplacer tous les emojis par des SVG inline ou depuis `docs/assets/`. Règle : aucun emoji dans le HTML final.
> ⚠️ Les chemins de fichiers ci-dessous référencent le prototype (`VISITORS/pages/`) — à adapter vers les vues Rails correspondantes lors de l'implémentation.

### Icônes d'information

| Emoji | Signification | Fichiers prototype |
|---|---|---|
| 📍 | Adresse | `pages/contact.html:344`, `pages/home.html:681` |
| 💬 | WhatsApp / contact | `pages/contact.html:358`, `pages/home.html:683` |
| 🚚 | Livraison | `pages/contact.html:365`, `pages/home.html:643`, `organisms/features.html:120` |
| 📋 | Rendez-vous / conditions | `pages/home.html:648`, `organisms/features.html:130` |
| 📷 | Placeholder photo | `organisms/farm-gallery.html:113`, `organisms/farm-gallery.html:119` |
| 📜 | Certificat Konishi | `organisms/koi-detail.html:186` |

### Icônes shop-card — Matériel

| Emoji | Produit | Fichiers prototype |
|---|---|---|
| ⚙️ | Filtre biologique | `pages/materiel.html:305`, `molecules/shop-card.html:88`, `organisms/shop-section.html:114` |
| 🔄 | Filtre japonais | `pages/materiel.html:306` |
| 🧹 | Brosserie de filtration | `pages/materiel.html:307` |
| 💧 | Pompe de bassin | `pages/materiel.html:313`, `molecules/shop-card.html:102`, `organisms/shop-section.html:126` |
| ☀️ | Stérilisateur UV | `pages/materiel.html:314`, `organisms/shop-section.html:138` |
| 🌡️ | Chauffage bassin | `pages/materiel.html:315`, `pages/azukari.html:322` |

### Icônes shop-card — Nourriture

| Emoji | Produit | Fichiers prototype |
|---|---|---|
| 🐟 | Nourriture poisson | `pages/nourriture.html:322` |
| 🎨 | Aliment colorant | `pages/nourriture.html:323` |
| ⭐ | Premium | `pages/nourriture.html:324` |
| 💊 | Complément vitaminé | `pages/nourriture.html:330` |
| 🍂 | Aliment hiver | `pages/nourriture.html:331` |
| 🎯 | Distributeur automatique | `pages/nourriture.html:332` |

### Icônes shop-card — Soins

| Emoji | Produit | Fichiers prototype |
|---|---|---|
| 🔬 | Microscope | `pages/soins.html:304`, `pages/azukari.html:308` |
| 🧪 | Kit analyse eau | `pages/soins.html:305` |
| 📊 | Oxymètre numérique | `pages/soins.html:306` |
| 💊 | Anti-parasites | `pages/soins.html:312` |
| 🌿 | Bactéries nitrifiantes | `pages/soins.html:313` |
| 🩹 | Traitement plaies | `pages/soins.html:314` |

### Icônes Azukari

| Emoji | Usage | Fichier prototype |
|---|---|---|
| 🔬 | Suivi sanitaire | `pages/azukari.html:308` |
| 🍱 | Alimentation | `pages/azukari.html:315` |
| 🌡️ | Température | `pages/azukari.html:322` |
| 📹 | Caméra surveillance | `pages/azukari.html:329` |

### Symboles Unicode (priorité basse)

| Symbole | Usage | Fichiers prototype |
|---|---|---|
| `★` | Badge Konishi, hero, features | `atoms/badge.html`, `molecules/koi-card.html`, `molecules/koi-card--editorial.html`, `molecules/filter-bar.html`, `organisms/hero.html`, `organisms/koi-showcase.html`, `organisms/features.html`, `pages/home.html`, `pages/kois.html`, `pages/product.html` |
| `♀` `♂` | Sexe des koïs | `molecules/koi-card.html`, `organisms/koi-showcase.html`, `organisms/koi-detail.html`, `pages/product.html` |
| `❮` `❯` | Navigation galerie photo | `pages/product.html:597-598`, `pages/product.html:802-803` |
| `✕` | Fermer la lightbox | `pages/product.html:801` |

---

## 📣 Retour client — Maquettes ChatGPT (reçues le 17/03/2026)

> La direction est indicative, pas contractuelle.

### Ajustements visuels intégrables avant beta (23/03)

- [ ] Ajouter un bouton WhatsApp flottant (bas droit, toutes les pages visiteurs)
- [ ] Afficher le numéro de téléphone dans la navbar
- [ ] Retravailler la section About : disposition texte à gauche / photo couple à droite (en attente photo client)
- [ ] Ajouter une section "Parcourir par variété" (Kohaku, Showa, Tancho…) sur la home — galerie visuelle cliquable vers le catalogue filtré
- [ ] Ajouter une section avis clients (Google ★★★★★) sur la home — contenu statique acceptable pour la beta
- [ ] Ajouter les logos partenaires en bas de page (iKonShî, Konishi Europe GmbH…)
- [ ] Ajouter une card "Nous contacter pour ce koï" sur la fiche produit (UX flottante ou sticky)
- [ ] Revoir l'esthétique générale : moins corporate/sombre, plus chaud et organique

### À reporter en V2 post-beta (scope trop large)

- [ ] Sections "Matériel", "Soins", "Nourriture", "Azukari", "Conseils" — nouveaux domaines métier, contenu non fourni
- [ ] Page "Installations intérieures / extérieures"
- [ ] Navigation étendue à 7-8 entrées

### Assets en attente (client)

- Photo HD du couple (Emmanuel & Mathilde)
- Confirmation numéros de téléphone WhatsApp (Manu + Mathilde)
- Logos partenaires HD (iKonShî, Konishi Europe GmbH)
- Photos HD koïs et bassins
- Scans certificats Konishi
- Liens Facebook / Instagram
- Adresse exacte (Google Maps)

---

## ✅ Historique — Chantier VISITORS V3 (complété le 2026-03-18)

> Journal de référence — source : `todo.md` (ancienne racine).

### Fondations & Atoms

- [x] `docs/design/tokens.css`, `fonts.css`, `reset.css`, `wave.svg`
- [x] `atoms/` : `logo`, `button` (4 variantes), `badge` (3 variantes), `price`, `input`, `koi-thumb`, `wave-divider`, `icon-wa`

### Molecules & Organisms

- [x] `molecules/` : `nav-header`, `koi-card`, `koi-card--editorial`, `filter-bar`, `cta-whatsapp`, `contact-form`, `shop-card`
- [x] `organisms/` : `header`, `hero`, `features`, `koi-showcase`, `konishi-band`, `farm-gallery`, `koi-detail`, `footer`, `shop-section`
- [x] `templates/visitor-layout.html`

### Pages

- [x] `home`, `kois`, `product`, `decouvrir`, `materiel`, `nourriture`, `soins`, `azukari`, `contact`

### JS & CSS

- [x] `header.js`, `filter.js`, `gallery.js` — tous < 200 lignes
- [x] Architecture CSS modulaire complète (20 fichiers dans `VISITORS/assets/css/`)
- [x] 0 `<style>` inline, 0 `style=""` dans les pages de production
- [x] ~110 classes CSS manquantes ajoutées (Option B — 2026-03-18)
- [x] Violations 200 lignes corrigées (`header`, `nav-header`, `koi-showcase`, `koi-detail`)
- [x] `main.js` supprimé — fonctions déjà dans les modules JS
- [x] Fichiers V2 obsolètes supprimés (`catalogue.html`, `farm.html`, `catalogue-grid.html`)

---

## ✅ Historique — Audit Back-office Admin (complété le 2026-03-18)

> Journal de référence — source : `ADMIN/todo.md`.

### Corrections JS

- [x] 13 attributs `onclick`/`onchange` inline migrés dans `koi-form.js` et `order-form.js`
- [x] Blocs `<script>` de page migrés dans `kois.js`, `messages.js`, `orders.js`, `payments.js`
- [x] `showNotification()` extraite dans `notifications.js` — palette V3 appliquée
- [x] `admin.js` 276 → 116 lignes (découpé en `notifications.js`, `koi-form.js`, `order-form.js`)

### Corrections CSS

- [x] `variables.css` réécrit : palette V3 complète (5 nouvelles variables, 5 obsolètes supprimées)
- [x] Tous les atoms, molecules, organisms et pages migrés vers la palette V3
- [x] Media queries `max-width` → `min-width` dans `dashboard.html` et `messages.html`
- [x] ~84 attributs `style=""` extraits en classes CSS
- [x] `utilities.css` créé
- [x] `organisms/kois-table.html` 214 → 130 lignes

### UX & Contenu

- [x] `aria-label` sur les boutons d'action des tableaux (A11y)
- [x] Icônes sidebar : `<img src="*.svg">` remplacés par SVG inline (`currentColor`)
- [x] Validation formulaires : états `:invalid` et `:valid` dans `forms.css`
- [x] Breadcrumb ajouté sur `dashboard.html`
- [x] 26 variétés exactes client dans `koi-form.html` et filtres
- [x] Bannière Stripe mise à jour dans `payments.html`
