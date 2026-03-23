# État de la Migration Rails — Koi's Story
> Audit généré le 2026-03-21 — Branche `MVP`
> Référence : `docs/audit/RAILS_MIGRATION_PLAN.md`

---

## Résumé Rapide

| Phase | Description | État |
|-------|-------------|------|
| 1 | Rails Init & Database | ⚠️ Fait — time_zone et i18n non configurés |
| 2 | Models & Migrations | ⚠️ Fait — 2 bugs (order_items nullable + has_many manquant) |
| 3 | Auth Devise | ⚠️ Fait — devise.rb mailer_sender placeholder non configuré |
| 4 | Layout & Assets | ✅ Fait |
| 5 | Pages Publiques | ✅ Fait |
| 6 | Admin CRUD | ⚠️ Partiel — 4 controllers manquants |
| 7 | Contact & Mailer | ✅ Fait — SMTP remplacé par Resend |
| 8 | Cloudinary API | ✅ Fait |
| 9 | JS → Stimulus | ❌ Non fait — JS plain modules seulement |
| 10 | Seeds & Tests | ⚠️ Seeds OK — Tags non seedés, aucun test |
| 11 | Production Deploy | — En attente |

---

## Phase 1 — Rails Init & Database ⚠️

- Rails app scaffolded avec SQLite3 ✓
- Gems : `devise` ✓, `cloudinary` ✓, `carrierwave` ✓, `letter_opener` ✓
- **Manquant** : `pagy` (pagination catalogue) — gem absente du Gemfile
- **Manquant** : `annotate` (outil dev) — mineur, non bloquant

### Problème — `config/application.rb` non configuré

Le plan prévoit deux lignes dans `Application` :
```ruby
config.time_zone = "Paris"
config.i18n.default_locale = :fr
```
État actuel : `config.time_zone` est commenté (valeur US par défaut), `config.i18n.default_locale` est complètement absent. Sans ces configs, les timestamps Rails s'affichent en UTC et Devise génère ses messages en anglais.

---

## Phase 2 — Models & Migrations ⚠️

### Tables DB — schema.rb vérifié

| Table | Statut |
|-------|--------|
| users | ✅ |
| kois | ✅ |
| images | ✅ |
| tags | ✅ |
| koi_tags | ✅ |
| messages | ✅ |
| products | ✅ |
| client_profiles | ✅ |
| orders | ✅ |
| order_items | ✅ |
| payments | ✅ |
| newsletter_subscribers | ➖ Absent — dormant V2 (attendu) |

### Bug critique — `order_items`

Dans `schema.rb`, `koi_id` et `product_id` sont `null: false` :
```ruby
t.integer "koi_id", null: false
t.integer "product_id", null: false
```
Le plan spécifie qu'ils doivent être **nullable** (une commande peut porter un koi OU un produit, pas forcément les deux). À corriger via migration.

### Models — état

| Model | Statut | Note |
|-------|--------|------|
| User | ✅ | Devise + enum role + OTP |
| Koi | ⚠️ | `has_many :order_items` manquant |
| Image | ✅ | Polymorphique |
| Tag | ✅ | |
| KoiTag | ✅ | |
| Message | ✅ | `deliver_now` → recommander `deliver_later` |
| Product | ✅ | |
| ClientProfile | ✅ | |
| Order | ✅ | |
| OrderItem | ✅ | |
| Payment | ✅ | |

**Koi model** : les scopes nommés du plan (`by_variety`, `by_age_class`, etc.) ont été remplacés par `self.filter(params)` — approche différente mais équivalente, acceptable.

---

## Phase 3 — Auth Devise ⚠️

- Devise installé avec 2FA (`devise-two-factor`) — non prévu dans le plan mais non bloquant ✓
- 5 vues Devise présentes : sessions/new, registrations/new, registrations/edit, passwords/new, passwords/edit ✓
- `Admin::BaseController` : `authenticate_user!` + `require_admin!` ✓

### Note — ApplicationController

Le plan prévoyait `require_admin` et `configure_permitted_parameters` dans `ApplicationController`.
- `require_admin!` est défini dans `Admin::BaseController` — correct pour l'usage actuel ✓
- `configure_permitted_parameters` : **non nécessaire** — les registrations sont désactivées (`devise_for :users, skip: [:registrations]`), ce callback n'est jamais déclenché ✓

### Problème — `devise.rb` mailer_sender non configuré

`config/initializers/devise.rb` ligne 27 contient le placeholder par défaut :
```ruby
config.mailer_sender = "please-change-me-at-config-initializers-devise@example.com"
```
Non bloquant en développement (letter_opener intercepte les emails), mais **à corriger avant la mise en production** avec l'adresse réelle (`contact.koistory@gmail.com`).

---

## Phase 4 — Layout & Assets ✅

- Deux layouts : `application.html.erb` (visitors) + `admin.html.erb` ✓
- CSS architecture : `visitors/`, `admin/`, `shared/` ✓
- JS modules : `visitors/` (header, filter, gallery, animations) + `admin/` ✓
- Initializers : `cloudinary.rb`, `devise.rb` présents ✓

---

## Phase 5 — Pages Publiques ✅

Routes présentes (routes.rb vérifié) :

| Route | Statut |
|-------|--------|
| `root "home#index"` | ✅ |
| `/decouvrir` | ✅ |
| `/materiel` | ✅ |
| `/soins` | ✅ |
| `/nourriture` | ✅ |
| `/azukari` | ✅ |
| `resources :kois, only: [:index, :show]` | ✅ |
| `resources :messages, only: [:create]` | ✅ |
| `/mentions-legales`, `/cgv`, `/politique-de-confidentialite` | ✅ Bonus |

**Note** : les routes `get "/decouvrir"` etc. n'ont pas de `as:` explicite dans `routes.rb`, mais Rails génère automatiquement les helpers (`decouvrir_path`, `materiel_path`…) à partir du path. ✓

---

## Phase 6 — Admin CRUD ⚠️

### Présent

| Controller | Vues | État |
|------------|------|------|
| `Admin::DashboardController` | index | ✅ |
| `Admin::KoisController` | index, show, new, edit, _form* | ✅ |
| `Admin::MessagesController` | index, show | ✅ |

### Manquant (non implémenté)

| Controller | Routes prévues |
|------------|----------------|
| `Admin::ProductsController` | `resources :products` |
| `Admin::OrdersController` | `resources :orders` |
| `Admin::ClientProfilesController` | `resources :clients` |
| `Admin::PaymentsController` | `resources :payments, only: [...]` |

Ces controllers sont dans le plan mais **absents du code**. Non bloquant pour la démo MVP (seuls les kois et messages sont prioritaires), mais à compléter.

---

## Phase 7 — Contact & Mailer ✅

- Mailer nommé `MessageMailer` au lieu de `ContactMailer` — différence de nommage, fonctionnellement identique ✓
- Vues mailer présentes : `new_message.html.erb` + `new_message.text.erb` ✓
- `Message` model : `after_create :notify_admin` → appelle `MessageMailer.new_message(self).deliver_now` ✓
- Dev : `letter_opener` configuré dans `development.rb` ✓
- **Recommandation** : utiliser `deliver_later` (asynchrone) plutôt que `deliver_now`

### Déviation du plan — SMTP Resend (non bloquant)

Le plan prévoyait un SMTP générique. L'implémentation utilise **Resend** (`smtp.resend.com`) :
- Variable d'env : `RESEND_API_KEY` (et non `SMTP_PASSWORD` + `SMTP_HOST` + `SMTP_USER`)
- Variable d'env : `APP_HOST` pour `default_url_options` et `domain`
- Bon choix technique (Resend = 3 000 emails/mois gratuits, délivrabilité supérieure) ✓

---

## Phase 8 — Cloudinary API ✅

- Initializer `config/initializers/cloudinary.rb` présent ✓
- `ImageUploader` (CarrierWave + Cloudinary) présent dans `app/uploaders/` ✓
- Nommé `ImageUploader` au lieu de `KoiImageUploader` — acceptable (polymorphique)

---

## Phase 9 — JS → Stimulus ❌

**Non réalisé.** Seul `hello_controller.js` (boilerplate Rails) existe dans `app/javascript/controllers/`.

Les modules JS du plan (`header`, `filter`, `gallery`, `animation`, `sidebar`, `koi-form`, `order-form`) sont implémentés comme **plain ES modules** dans `visitors/` et `admin/`, pas comme Stimulus controllers.

Cette migration est **optionnelle pour le MVP** si les modules fonctionnent correctement avec Turbo (utiliser `turbo:load` au lieu de `DOMContentLoaded`). À prioriser après la démo si le temps le permet.

---

## Phase 10 — Seeds & Tests ⚠️

### Seeds — état

| Élément | Statut |
|---------|--------|
| Admin user (`contact.koistory@gmail.com`) | ✅ |
| 2ème admin (`emmanuel.koistory@gmail.com`) | ✅ Bonus |
| 26 variétés koi | ✅ |
| Images placeholder (placehold.co) | ✅ |
| Tags de variété | ⚠️ Non seedés |

Le plan prévoit de seeder des `Tag` (catégorie `:variety`). Actuellement `Tag.destroy_all` est appelé en seeds mais aucun `Tag.create` n'est présent — la table `tags` reste vide.

**Impact réel : nul pour le MVP.** `KoisController#index` filtre directement sur `kois.variety` (string column) et construit `@varieties` via `Koi.pluck(:variety)`. Le système de Tags n'est pas utilisé dans le filtre actuel. C'est une feature incomplète, pas un bloquant.

### Tests
Aucun test écrit. Non bloquant pour la démo orale, mais critère THP.

---

## Phase 11 — Production Deploy

Non applicable à ce stade (branche MVP locale). Variables d'env réelles à configurer côté VPS :

```bash
RAILS_MASTER_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=...          # (remplace SMTP_HOST/USER/PASSWORD du plan)
APP_HOST=...                # domaine de production
ADMIN_EMAIL=contact.koistory@gmail.com
ADMIN_PASSWORD=...
```

---

## Récapitulatif des Actions Prioritaires

### Bloquant pour la démo (à corriger avant le 23/03)

1. **`Koi` model : ajouter `has_many :order_items`** — relation manquante (utilisée dès que les orders admin seront implémentés)
2. **`config/application.rb`** : activer `config.time_zone = "Paris"` et `config.i18n.default_locale = :fr`

### Important mais non bloquant pour la démo

3. **Migration `order_items`** : rendre `koi_id` et `product_id` nullable (1 ligne de migration)
4. **Admin : 4 controllers manquants** (products, orders, clients, payments) — admin actuel fonctionnel pour kois + messages
5. **`pagy` gem** : ajouter pour la pagination du catalogue (risque UX si beaucoup de kois)
6. **`devise.rb` mailer_sender** : remplacer le placeholder par `contact.koistory@gmail.com` avant la prod

### Améliorations pour après la démo

6. **JS → Stimulus** : conversion des modules visitors/ en controllers Stimulus
7. **`deliver_later`** pour le mailer (performance prod)
8. **Tests** : models + controllers (critère THP à satisfaire)
9. **`annotate` gem** : confort dev uniquement
