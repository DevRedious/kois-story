# THP Compliance Checklist — Koi's Story

> Mis à jour le 19/03/2026 — Beta deadline : **23/03/2026**
> Statuts : ✅ Fait | ⚠️ Partiel | ❌ Manquant | 🔲 N/A (non applicable au stade actuel)

---

## PARTIE 1 — Frontend (Prototype HTML/CSS/JS)

### Valeur & UX

- [x] Proposition de valeur claire en < 5 secondes (hero "seul Konishi en France")
- [x] Navigation fluide — navbar 8 items, breadcrumbs cohérents
- [x] Pas de liens morts détectés sur les composants statiques
- [x] Flow visiteur complet : Home → Catalogue → Fiche → WhatsApp
- [x] Flow admin complet : Login → Dashboard → CRUD Kois → Messages
- [ ] WhatsApp CTA fonctionnel — numéros manquants ⏳ (client doit fournir)
- [ ] Google Maps affichable — Google Business non créé ⏳

### UI THP

- [x] Max 3 polices (Playfair Display + Inter = 2) ✅
- [x] Max 5 couleurs (Rouge vif, Rouge sombre, Noir, Blanc cassé, Blanc pur) ✅
- [x] Exception WhatsApp vert `#25d366` documentée et appliquée
- [x] Contrastes lisibles (estimation WCAG AA)
- [x] Cohérence visuelle sur toutes les pages
- [x] Hiérarchie typographique H1/H2/H3 cohérente
- [x] Responsive mobile-first validé

### Accessibilité Minimum

- [x] `lang="fr"` sur tous les `<html>`
- [x] `alt` attributs sur les images
- [x] `aria-label` sur les icônes sans texte
- [x] `focus-visible` styles définis
- [ ] Skip link "Aller au contenu principal" — absent sur toutes les pages
- [ ] Focus trap dans le lightbox galerie
- [ ] `aria-live` pour le compteur de résultats filtres catalogue

### Code Quality Frontend

- [x] Palette V3 en tokens CSS — variables centralisées
- [x] Atomic Design respecté (atoms → molecules → organisms → pages)
- [x] Biome configuré (CSS/JS/JSON)
- [x] JS event delegation (hors order-form.js)
- [x] `DOMContentLoaded` + `turbo:load` dans `animations.js`
- [ ] Limite 200 lignes — 18 violations (voir audit)
- [ ] Sidebar dupliquée dans chaque page HTML — DRY violé
- [ ] `order-form.js` : `innerHTML` avec `onclick` inline — à refactorer
- [ ] Tokens unifiés ADMIN ↔ VISITORS (noms différents, même valeurs)
- [ ] CSS cross-workspace : ADMIN importe CSS de VISITORS (couplage fragile)

---

## PARTIE 2 — Rails Backend (THP Éliminatoires)

### Auth — Devise

- [ ] `gem 'devise'` installé et configuré
- [ ] Modèle User avec Devise (`rails generate devise User`)
- [ ] `role` enum : `visitor` | `client` | `admin`
- [ ] Vue 1 : Login (`/users/sign_in`)
- [ ] Vue 2 : Register (`/users/sign_up`)
- [ ] Vue 3 : Edit Profile (`/users/edit`)
- [ ] Vue 4 : Password Reset (`/users/password/new`)
- [ ] Vue 5 : Password Edit (`/users/password/edit`)
- [ ] Admin protégé par `before_action :authenticate_user!` + `require_admin`
- [ ] Redirection après login selon le rôle (admin → /admin, visiteur → /)

### Mailer — ActionMailer

- [ ] `ContactMailer` : mail admin à chaque nouveau message contact
- [ ] `OrderMailer` : confirmation de commande (si applicable V1)
- [ ] SMTP configuré en production (`config/environments/production.rb`)
- [ ] Mailer testé en production (pas seulement en dev avec letter_opener)
- [ ] `deliver_later` via `ActiveJob` (optionnel mais recommandé)
- [ ] Templates HTML + texte pour chaque mailer

### API Externe — Cloudinary

- [ ] `gem 'cloudinary'` + `gem 'carrierwave'` ou `Active Storage`
- [ ] `CLOUDINARY_URL` dans variables d'environnement (credentials Rails)
- [ ] `app/services/cloudinary_service.rb` ou uploader configuré
- [ ] Upload d'images koi via formulaire admin → Cloudinary
- [ ] URLs Cloudinary stockées en base (colonne `url` dans `images`)
- [ ] Transformation à la demande (resize, webp) via Cloudinary URL params
- [ ] Pas d'images stockées localement (VPS sans stockage persistent)

### Data Model (12 tables)

- [ ] Migration `users` — Devise + `role` enum
- [ ] Migration `kois` — tous les champs du CLAUDE.md
- [ ] Migration `images` — polymorphic (koi OU product)
- [ ] Migration `tags` — `name`, `category` enum
- [ ] Migration `koi_tags` — join table Koi ↔ Tag (`has_many :through`)
- [ ] Migration `messages` — `sender_name`, `sender_email`, `body`, `read`
- [ ] Migration `products` — `category` enum, `status` enum
- [ ] Migration `client_profiles` — `user_id` reference
- [ ] Migration `orders` — `status` enum, `total_amount`
- [ ] Migration `order_items` — `koi_id` nullable + `product_id` nullable
- [ ] Migration `payments` — `payment_type` enum, `status` enum
- [ ] Migration `newsletter_subscribers` — dormant V2, migrer quand même
- [ ] Ordre de migration respecté (voir CLAUDE.md)

### Models & Relations

- [ ] `User` : `has_one :client_profile`, `has_many :kois` (admin)
- [ ] `Koi` : `has_many :koi_tags`, `has_many :tags, through: :koi_tags`, `has_many :images, as: :imageable`
- [ ] `Tag` : `has_many :koi_tags`, `has_many :kois, through: :koi_tags`
- [ ] `Message` : standalone (pas d'association User pour les visiteurs non-auth)
- [ ] `Product` : `has_many :images, as: :imageable`, `has_many :order_items`
- [ ] `ClientProfile` : `belongs_to :user`, `has_many :orders`
- [ ] `Order` : `belongs_to :client_profile`, `has_many :order_items`, `has_many :payments`
- [ ] `OrderItem` : `belongs_to :order`, `belongs_to :koi, optional: true`, `belongs_to :product, optional: true`
- [ ] `Payment` : `belongs_to :order`
- [ ] Aucun modèle isolé (chaque model a au moins 1 relation)
- [ ] `has_many :through` UNIQUEMENT (pas de `has_and_belongs_to_many`)
- [ ] Validations présentes dans tous les models (fat model)
- [ ] Business logic dans les models (pas dans les controllers)

### Controllers & Routes

- [ ] Routes RESTful uniquement — `config/routes.rb` sans routes custom POST
- [ ] Namespace `admin` : `namespace :admin do ... end`
- [ ] `before_action :authenticate_user!` sur admin
- [ ] `before_action :require_admin` sur namespace admin
- [ ] Skinny controllers — pas de logique métier
- [ ] Filtres catalogue koi (`kois#index`) via scopes dans le model

### Views & Partials

- [ ] Layout `application.html.erb` avec `yield`
- [ ] Layout `admin.html.erb` pour le namespace admin
- [ ] `shared/_header.html.erb` inclus dans application layout
- [ ] `shared/_footer.html.erb` inclus dans application layout
- [ ] `admin/shared/_sidebar.html.erb` inclus dans admin layout
- [ ] `kois/_card.html.erb` partial pour les cartes koi
- [ ] `shared/_badge.html.erb` partial pour les badges
- [ ] `shared/_whatsapp_cta.html.erb` partial pour les CTAs WhatsApp
- [ ] Zéro `<a href>` hardcodé — Rails helpers uniquement
- [ ] Zéro `<img src>` hardcodé — `image_tag` ou Cloudinary helper

### Seeds

- [ ] 1 user admin (Mathilde) avec `role: :admin`
- [ ] Kois : au minimum 10 entrées couvrant des variétés variées
- [ ] 26 variétés de koi — tags seeds complets
- [ ] Images placeholder (via Cloudinary ou URL de test)
- [ ] 1-2 messages non lus pour la démo
- [ ] 1-2 produits (matériel, nourriture)
- [ ] Données cohérentes (prix, tailles, variétés réalistes)

### Tests

- [ ] Tests model `User` (validations, rôles)
- [ ] Tests model `Koi` (validations, scopes filtres)
- [ ] Tests model `Message` (validations)
- [ ] Tests controller `kois#index` (filtres, accès public)
- [ ] Tests controller `messages#create` (envoi mailer)
- [ ] Tests admin (accès protégé)
- [ ] `rails test` passe sans erreurs

---

## PARTIE 3 — Infrastructure & Workflow

### Versioning Git

- [x] Branche `DEV` (intégration) — branche actuelle : `admin-and-back`
- [x] Branche `main` (production)
- [ ] Pas de commit direct sur `main` — règle à faire respecter
- [ ] Feature branches depuis `DEV`, PR vers `DEV`
- [ ] Messages de commit en anglais, format conventionnel (`feat:`, `fix:`, `docs:`)

### GitHub Actions

- [ ] Action `CONTRIBUTORS.md` — logging automatique des tâches
- [ ] Action CI (tests) sur PR vers `DEV`
- [ ] Vérification Biome (lint) sur PR

### Hébergement VPS

- [ ] Environnement `development` configuré
- [ ] Environnement `production` configuré
- [ ] Secrets Rails (`RAILS_MASTER_KEY`, `CLOUDINARY_URL`, SMTP credentials) dans ENV
- [ ] `rails assets:precompile` testé en production
- [ ] Base de données SQLite initialisée en production
- [ ] Mailer SMTP vérifié en production (envoi réel)
- [ ] Domaine configuré (URL non encore communiquée par client)

---

## RÉSUMÉ CHECKLIST

| Catégorie | Faits | Total | % |
|-----------|-------|-------|---|
| UX/UI Frontend | 12 | 16 | 75% |
| Accessibilité | 4 | 7 | 57% |
| Code Frontend | 6 | 11 | 55% |
| Auth Devise | 0 | 10 | 0% |
| Mailer | 0 | 6 | 0% |
| Cloudinary | 0 | 6 | 0% |
| Data Model | 0 | 12 | 0% |
| Models/Relations | 0 | 12 | 0% |
| Controllers/Routes | 0 | 6 | 0% |
| Views/Partials | 0 | 10 | 0% |
| Seeds | 0 | 7 | 0% |
| Tests | 0 | 7 | 0% |
| Git/CI | 2 | 6 | 33% |
| Hébergement | 0 | 7 | 0% |
| **TOTAL** | **24** | **123** | **20%** |

> Le projet est à 20% de sa complétion globale.
> Le frontend (maquette) est ~65% prêt pour la migration Rails.
> Le backend est à 0% — c'est le chantier principal avant le 23/03/2026.
