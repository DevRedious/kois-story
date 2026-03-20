# Plan MVP Rails - Version Pro

> Projet: Koi's Story  
> Objectif: livrer un MVP Rails demonstrable, conforme aux exigences THP eliminatoires.
>
> Version complete et detaillee: `docs/rails_mvp_plan.md`

---

## 1) Objectif et perimetre

### Objectif de la version

Mettre en place une application Rails fonctionnelle avec:

- catalogue public des kois (liste + fiche)
- espace admin protege (CRUD kois + consultation messages)
- authentification admin via Devise
- formulaire de contact avec envoi email
- seed de demonstration couvrant 26 varietes

### Hors perimetre MVP

- tunnel de paiement en ligne
- modules V2 (orders, payments, client profiles, newsletter)
- refonte front globale non bloquante

---

## 2) Contraintes non negociables (THP)

- routes RESTful uniquement
- code et `README.md` en anglais
- helpers Rails pour liens et images (`link_to`, `image_tag`)
- Devise installe + 5 vues existantes
- ActionMailer operationnel
- 1 API externe minimum (Cloudinary)
- logique metier dans les modeles
- seed de demonstration complet

---

## 3) Architecture cible

- base de donnees partagee entre public et admin
- separation par namespace admin:
  - routes: `/admin/*`
  - controleurs: heritage `Admin::BaseController`
  - layout: `admin.html.erb`
- public en lecture seule (`kois#index`, `kois#show`)
- admin en CRUD complet sur `Koi`

---

## 4) Plan d'execution (ordre impose)

### Phase A - Initialisation (30 min)

1. Initialiser Rails dans `kois-story/` (`--skip-git`, sqlite).
2. Installer les gems MVP:
   - `devise`
   - `cloudinary`
   - `carrierwave`
   - `carrierwave-cloudinary`
   - `dotenv-rails`
3. Preparer variables d'environnement:
   - `CLOUDINARY_*`
   - `ADMIN_EMAIL`

Livrable: application Rails bootable + dependances installees.

### Phase B - Auth et securite (30 min)

1. Installer Devise (`install`, `User`, `views`).
2. Ajouter `role` sur `users` (enum `visitor/admin`, defaut `visitor`).
3. Desactiver l'inscription publique (`skip: [:registrations]`).
4. Creer `Admin::BaseController` avec:
   - `authenticate_user!`
   - `require_admin!`
   - `layout 'admin'`

Livrable: login admin fonctionnel, acces admin verrouille.

### Phase C - Modele metier MVP (45 min)

Creer et migrer:

- `User` (Devise + role)
- `Koi`
- `Image` (polymorphique)
- `Tag`
- `KoiTag` (`has_many :through`)
- `Message`

Regles cles:

- validations minimales sur `Koi` et `Message`
- scopes de filtrage sur `Koi`
- callback message vers mailer (`deliver_later`)

Livrable: schema DB stable + modeles relies.

### Phase D - Integrations externes (25 min)

1. Initializer Cloudinary.
2. Uploader CarrierWave (`ImageUploader`).
3. Mailer `MessageMailer` (HTML + texte).
4. Config ActionMailer dev (URL localhost).

Livrable: upload et envoi email cables.

### Phase E - Controleurs et routes (30 min)

Implementer:

- `KoisController`: `index`, `show`
- `MessagesController`: `create`
- `Admin::KoisController`: CRUD
- `Admin::MessagesController`: `index`, `show`, `update`

Routes minimales:

- `root 'kois#index'`
- `resources :kois, only: [:index, :show]`
- `resources :messages, only: [:create]`
- namespace `admin` avec ressources necessaires

Livrable: navigation publique + admin complete.

### Phase F - Vues minimales demonstrables (60 min)

Public:

- `kois/index`
- `kois/show`
- footer avec formulaire contact

Admin:

- `admin/kois/index`
- `admin/kois/new` + `edit`
- `admin/messages/index`
- `admin/messages/show`

Devise:

- page login personnalisee selon maquette

Elements obligatoires:

- bouton WhatsApp sur fiche koi
- badge Konishi conditionnel

Livrable: parcours jury complet utilisable.

### Phase G - Assets et compatibilite Turbo (35 min)

1. Copier assets `VISITORS/` et `ADMIN/` vers `app/assets` + `app/javascript`.
2. Creer `admin_application.css` et `admin_application.js`.
3. Remplacer `DOMContentLoaded` par `turbo:load` dans JS migre.
4. Unifier tokens CSS (aliases admin/visitors dans `shared/variables.css`).

Livrable: styles et JS stables sur navigation Turbo.

### Phase H - Seed et verification finale (30 min)

1. Seed:
   - 1 admin
   - 26 varietes koi
   - donnees plausibles (prix, taille, statut)
2. Verification complete:
   - login admin
   - CRUD koi
   - contact form
   - logs mailer
   - routes REST

Livrable: environnement de demo pret.

---

## 5) Definition du Done (DoD)

Le MVP est valide si:

- l'app demarre sans erreur
- `/` affiche le catalogue
- `/kois/:id` affiche WhatsApp + badge Konishi
- `/users/sign_in` fonctionne
- `/admin` est inaccessible sans auth
- admin peut creer / modifier / supprimer un koi
- formulaire contact persiste et declenche l'envoi mail
- `rails db:seed` reconstruit une base de demo propre

---

## 6) Gestion des risques

| Risque | Impact | Reponse |
|---|---|---|
| Cloudinary indisponible | Eleve | fallback stockage local temporaire |
| SMTP prod non pret | Eleve | Mailjet prioritaire, test reel avant demo |
| JS casse apres navigation | Eleve | migration systematique vers `turbo:load` |
| dette CSS trop large | Moyen | limiter au strict MVP |
| manque de temps | Critique | priorite: Devise -> CRUD koi -> contact -> seed |

---

## 7) Branching et livraison

- base: `DEV`
- branche de travail: `feat/rails-mvp-scaffold`
- PR cible: `DEV`
- merge vers `main` uniquement apres validation demo

---

## 8) References operationnelles

- `docs/audit/RAILS_MIGRATION_PLAN.md`
- `docs/audit/THP_COMPLIANCE_CHECKLIST.md`
- `docs/audit/COMPONENT_MAPPING.md`
- `docs/implementation/partials_structure.md`
- `docs/implementation/asset_pipeline_setup.md`

---

## 9) Priorite execution (si contrainte temps)

1. Devise + securite admin
2. Modeles et migrations MVP
3. CRUD koi admin
4. Catalogue public + fiche produit
5. Contact + mailer
6. Seed 26 varietes
7. Habillage CSS/JS restant
