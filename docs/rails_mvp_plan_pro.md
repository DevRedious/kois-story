# Plan MVP Rails - Version Pro

> Projet: Koi's Story  
> Source de reference: `docs/rails_mvp_plan.md`  
> Objectif: livrer un MVP Rails demonstrable en oral blanc, conforme aux exigences THP eliminatoires.

---

## 1) Alignement strategique

### Positionnement du document

Ce plan pro est une version operationnelle condensee du plan complet.  
Il conserve les decisions techniques critiques, l'ordre d'execution et les points de controle.

### Scope MVP confirme

- front public lecture seule (`home`, pages statiques, `kois#index`, `kois#show`)
- back-office admin protege (`/admin`) avec CRUD kois et gestion messages
- authentification Devise admin uniquement (inscription publique desactivee)
- contact form footer + ActionMailer actif
- integration API externe Cloudinary
- seed de demonstration couvrant 26 varietes de koi

### Hors scope MVP

- tunnel de paiement
- modules metier V2 (`orders`, `payments`, `client_profiles`, `newsletter_subscribers`)
- activation 2FA en production immediate (infrastructure presente, activation differee)

---

## 2) Exigences eliminatoires THP

Toutes ces contraintes doivent etre valides avant demo:

- routes RESTful uniquement
- code et `README.md` en anglais
- usage des helpers Rails pour liens/images (`link_to`, `image_tag`)
- Devise operationnel avec vues generees
- ActionMailer fonctionnel en production
- au moins une API externe branchee (Cloudinary)
- logique metier en modeles (fat model / skinny controller)
- aucun modele isole
- relations N-N en `has_many :through` uniquement
- `db/seeds.rb` exploitable avec donnees de demonstration

---

## 3) Architecture cible

### Separation public/admin

VISITORS et ADMIN ne communiquent pas directement: ils partagent la meme base et les memes modeles.

Separation imposee a 3 niveaux:

1. routes: namespace `admin` (`/admin/*`)
2. controleurs: heritage `Admin::BaseController` avec garde d'acces centralisee
3. layouts: `application.html.erb` (public) vs `admin.html.erb` (admin)

### Regle de securite

`Admin::BaseController` est l'unique gatekeeper:

- `before_action :authenticate_user!`
- `before_action :require_admin!`
- `layout 'admin'`

---

## 4) Sequence d'implementation

## Phase 1 - Bootstrap Rails

- `rails new . --skip-git --database=sqlite3 --asset-pipeline=sprockets --javascript=importmap`
- `bundle install`
- `rails db:create`
- restauration des entrees `.env` dans `.gitignore`

Livrable: application Rails propre et bootable.

## Phase 2 - Gems et variables d'environnement

Ajouter:

- auth: `devise`, `devise-two-factor`, `rotp`, `rqrcode`
- images: `cloudinary`, `carrierwave`, `carrierwave-cloudinary`
- env: `dotenv-rails`
- dev: `letter_opener`

Definir `.env` et `.env.example` avec:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`, `ADMIN_EMAIL`, `APP_HOST`
- `OTP_SECRET_KEY`, `ADMIN_PASSWORD`

Livrable: dependances et secrets projet prets.

## Phase 3 - Auth Devise et verrouillage acces

- `rails generate devise:install`
- `rails generate devise User`
- `rails generate devise:views`
- enrichir migration user (`role`, colonnes OTP)
- configurer `User` avec enum roles et module `:two_factor_authenticatable`
- desactiver inscriptions: `devise_for :users, skip: [:registrations]`

Livrable: login admin operationnel, inscription publique absente.

## Phase 4 - Modeles MVP

Generer dans l'ordre:

1. `Koi`
2. `Image` (polymorphic)
3. `Tag`
4. `KoiTag`
5. `Message`

Points critiques:

- enums `Koi` (`status`, `sex`, `age_class`)
- methodes de filtrage catalogue
- callback mailer sur creation de message
- default `read: false` dans migration `messages`

Puis `rails db:migrate`.

Livrable: schema MVP stable et relie.

## Phase 5 - Integrations externes

- initializer Cloudinary
- `ImageUploader` CarrierWave + Cloudinary
- config ActionMailer:
  - dev: `letter_opener`
  - prod: SMTP Resend
- `MessageMailer` + templates HTML/TXT

Livrable: upload image et envoi email branches.

## Phase 6 - Controleurs et routes

Controleurs:

- `HomeController`
- `PagesController`
- `KoisController`
- `MessagesController`
- `Admin::KoisController`
- `Admin::MessagesController`
- `Admin::BaseController` (manuel)

Routes:

- `root 'home#index'`
- pages statiques (`/decouvrir`, `/materiel`, `/soins`, `/nourriture`, `/azukari`)
- `resources :kois, only: [:index, :show]`
- `resources :messages, only: [:create]`
- namespace `admin` avec `root 'kois#index'`, `resources :kois`, `resources :messages, only: [:index, :show, :update]`

Livrable: parcours public et admin complet.

## Phase 7 - Vues minimales + UX obligatoire

Public:

- home
- 5 pages statiques
- catalogue koi + fiche
- footer avec formulaire contact

Admin:

- liste kois
- formulaire new/edit koi
- liste messages + detail

Devise:

- page login personnalisee double audience (visiteur/admin)

Elements metier obligatoires:

- bouton WhatsApp en fiche koi
- badge Konishi conditionnel

Livrable: demo fonctionnelle de bout en bout.

## Phase 8 - Assets, CSS, JS, Turbo

Actions:

- migration assets `VISITORS/` et `ADMIN/` vers pipeline Rails
- creation `admin_application.css` et `admin_application.js`
- pin Importmap pour `admin_application`
- precompile asset admin dedie
- remplacement global `DOMContentLoaded` -> `turbo:load`
- normalisation variables CSS admin/visitors via `shared/variables.css`

Livrable: rendu visuel stable et JS fonctionnel apres navigation Turbo.

## Phase 9 - Seeds et verification finale

Seed:

- admin users
- 26 varietes koi
- statuts/disponibilites coherents

Verification:

- pages publiques OK
- auth Devise OK
- acces `/admin` protege
- CRUD koi admin OK
- gestion messages OK
- formulaire contact + logs mailer OK
- routes REST verify via `rails routes`

Livrable: environnement de soutenance pret.

---

## 5) Definition of Done

Le MVP est accepte si:

- serveur Rails demarre sans erreur
- home affiche hero/pitch + contenus attendus
- catalogue et detail koi fonctionnent
- WhatsApp et badge Konishi visibles selon conditions
- login admin valide, inscription publique absente
- espace admin protege et CRUD koi operationnel
- formulaire contact persiste et declenche le mail
- seed reconstruit une base demo complete

---

## 6) Risques majeurs et mitigation

| Risque | Impact | Mitigation |
|---|---|---|
| credentials Cloudinary manquants | eleve | fallback stockage local temporaire |
| SMTP prod non finalise | eleve | configuration Resend complete + test reel |
| collision tokens CSS admin/public | eleve | aliases centralises dans `shared/variables.css` |
| JS inactif apres navigation | eleve | migration systematique vers `turbo:load` |
| `admin_application` non charge | eleve | pin Importmap + precompile css admin |
| app ne boot pas (OTP secret absent) | eleve | forcer `OTP_SECRET_KEY` meme en dev |
| manque de temps execution | critique | priorite: Devise -> CRUD koi -> contact -> seed |

---

## 7) Branche et livraison

- base de travail: `MVP`
- push regulier apres chaque phase critique
- PR de `MVP` vers `DEV` a la fin du scaffold

---

## 8) Documents de reference associes

- `docs/audit/COMPONENT_MAPPING.md`
- `docs/implementation/partials_structure.md`
- `docs/implementation/asset_pipeline_setup.md`
- `docs/implementation/stimulus_controller_examples.js`
- `docs/audit/THP_COMPLIANCE_CHECKLIST.md`
- `docs/audit/RISKS_AND_BLOCKERS.md`

---

## 9) Priorisation en contrainte de temps

1. auth admin Devise + verrouillage acces
2. modeles/migrations MVP
3. CRUD koi admin
4. catalogue public + fiche koi
5. contact + ActionMailer
6. seeds 26 varietes
7. assets CSS/JS restants
