# Audit Complet — rails_mvp_plan.md vs check_mvp_plan.md

## Contexte général

Aucun code Rails n'existe encore. Le repo ne contient que les prototypes VISITORS/ et ADMIN/, la documentation, et le .env.example. L'audit porte donc entièrement sur la cohérence du plan avant exécution.

---

## PARTIE 1 — Points du check_mvp_plan.md : état actuel dans le plan

## 🔴 Critiques — Toujours non corrigés

### #1 — root 'kois#index' au lieu d'une homepage hero
- Step 4 (l.269) : root 'kois#index'
- Step 9 (l.635) : root 'kois#index' — confirmé deux fois
- Aucun HomeController généré dans Step 8
- La checklist Step 12 dit encore "home page loads (koi catalogue)" — cohérente avec la mauvaise route
- partials_structure.md (doc de référence) définit app/views/home/index.html.erb et un HomeController — contradiction directe avec le plan

### #2 — 5 pages navbar absentes
- /decouvrir, /materiel, /soins, /nourriture, /azukari — introuvables dans Step 8 (controllers) et Step 9 (routes)
- partials_structure.md définit app/views/pages/decouvrir.html.erb, azukari.html.erb, etc. avec un PagesController
- Contradiction directe : la doc d'implémentation documente ces vues mais le plan ne génère pas le controller correspondant

### #3 — scope :available conflit avec l'enum
- Step 5 l.299 : enum status: { available: 0, sold_out: 1, incoming: 2 }
- Step 5 l.306 : scope :available, -> { where(status: :available) }
- Rails génère automatiquement Koi.available via l'enum — la redéfinition lève une ArgumentError au démarrage. Bloquant au boot.

### #4 — available:boolean orpheline dans la commande generate
- Step 5 l.279 : rails generate model Koi ... available:boolean ...
- La colonne est créée en base, jamais utilisée, jamais référencée dans le modèle
- Point C du check : la correction doit être dans la commande, pas seulement dans le modèle — non corrigé

### #5 — mount_uploader absent
- Step 6 crée app/uploaders/image_uploader.rb
- Aucun modèle dans Step 5 ne contient mount_uploader :image, ImageUploader
- Point D du check : koi_params (l.597-599) ne contient pas le champ image — Cloudinary ne fonctionnera pas même si mount_uploader est ajouté manuellement

---

## 🟡 Risques THP — Toujours présents

### #6 — Contenu mailer en français
- Step 7 l.458 : subject: "[Koi's Story] Nouveau message de #{message.sender_name}"
- Step 7 l.466 : <h2>Nouveau message de <%= @message.sender_name %></h2>
- Step 7 l.468 : <p><strong>Message:</strong></p> — ce champ est en anglais mais le reste ne l'est pas
- THP : "All code in English"

### #7 — def admin? redondant
- Step 4 l.232 : enum role: { visitor: 0, admin: 1 } → génère admin? automatiquement
- Step 4 l.234-236 : def admin?; role == 'admin'; end — override du prédicat enum. Retourne toujours false car role renvoie le symbole :admin et non la string 'admin'. Bug silencieux potentiel en plus de la redondance.

### #8 — deliver_later sans backend de queue
- Step 5 l.369 : MessageMailer.new_message(self).deliver_later
- Aucune configuration Active Job dans le plan (ni Sidekiq, ni Async configuré explicitement)
- En dev SQLite, :async peut rater silencieusement. deliver_now est plus sûr pour la démo.

### #9 — Admin::MessagesController#update manquante
- Step 8 l.489 : rails generate controller Admin::Messages index show — pas d'update
- Step 9 l.643 : resources :messages, only: [:index, :show, :update] — la route existe
- Step 8 (code du controller, l.606-620) : seuls index et show sont implémentés, update est absent
- Rails renverra AbstractController::ActionNotFound en appelant PATCH /admin/messages/:id

### #10 — Vues Devise avec registrations désactivées
- Step 4 : devise_for :users, skip: [:registrations]
- rails generate devise:views génère les vues registrations/ qui retournent 404
- Risque THP si le jury teste ces routes. Note : non corrigé, non documenté dans le plan.

---

## 🟠 Mineurs — Toujours présents

### #11 — visitor.css et demo.css copiés dans Rails
- Step 10 l.747 : cp VISITORS/assets/css/*.css app/assets/stylesheets/visitors/
- Le glob copie tous les fichiers, y compris visitor.css (manifest avec @import) et demo.css (page preview)
- Ces deux fichiers dans le pipeline Sprockets peuvent causer des conflits d'imports ou du CSS parasite

### #12 — Un seul admin en seeds
- Step 11 l.939-944 : seul contact.koistory@gmail.com (Mathilde) est créé
- CLAUDE.md mentionne "Mathilde & Emmanuel" — Emmanuel devrait avoir un compte admin

---

## Points complémentaires A-D — Toujours présents

### A — read:boolean sans default: false
- Step 5 l.287 : rails generate model Message ... read:boolean
- La migration générée n'aura pas default: false
- Message.where(read: false) (scope unread) retournera des résultats incorrects : les nouveaux messages auront read: nil

### B — noreply@koistory.fr non vérifié
- Step 7 l.454 : from: "Koi's Story <noreply@koistory.fr>"
- Resend exige que le domaine koistory.fr soit vérifié (DNS TXT)
- CLAUDE.md dit que le domaine n'est pas encore communiqué à l'équipe → l'envoi sera silencieusement rejeté

### C — available:boolean dans la commande generate (= même que #4)
- Confirmé non corrigé

### D — CarrierWave non branché sur le formulaire
- koi_params (l.597-599) : permit(:name, :variety, :age_class, :age, :sex, :size_cm, :price, :status, :konishi_lineage, :description) — pas de champ image
- Même si mount_uploader est ajouté manuellement, l'upload ne fonctionnera pas sans modification du permit et du formulaire ERB

---

## PARTIE 2 — Nouveaux problèmes non documentés dans check_mvp_plan.md

## 🔴 Critiques supplémentaires

### N1 — javascript_include_tag incompatible avec Importmap
- Step 10 l.671 : <%= javascript_include_tag 'application', defer: true %>
- Step 10 l.673 : <%= javascript_include_tag 'admin_application', defer: true %>
- Rails 8 avec --javascript=importmap (Step 1) utilise javascript_importmap_tags, pas javascript_include_tag
- javascript_include_tag cherche un fichier précompilé dans public/assets/ — avec Importmap, ça ne fonctionne pas ainsi. Le JS ne sera pas chargé.

### N2 — admin_application.js non pinné dans importmap.rb
- Step 10 crée app/javascript/admin_application.js
- Le plan ne modifie jamais config/importmap.rb pour ajouter pin "admin_application"
- Sans ce pin, Importmap ne sait pas que ce fichier existe. JS admin inaccessible.

### N3 — Conflict de nommage des manifests CSS
- rails_mvp_plan.md Step 10 : manifest admin = admin_application.css, layout = stylesheet_link_tag 'admin_application'
- asset_pipeline_setup.md (doc de référence Step 10) : manifest admin = admin.css, config/initializers/assets.rb précompile admin.css
- Incompatibilité directe entre le plan et son doc de référence

### N4 — Chemins de polices cassés en production
- Step 10 l.795 : "change all url('../../docs/fonts/...') to url('/assets/...')"
- Les chemins /assets/filename.woff2 ne fonctionnent pas avec le fingerprinting Sprockets en production (/assets/Inter-Regular-abc123.woff2)
- asset_pipeline_setup.md donne la bonne approche : font-url('inter/Inter-Regular.woff2') (helper Sprockets) — le plan contredit son doc de référence

### N5 — Tests absents du plan — critère éliminatoire THP
- RISKS_AND_BLOCKERS.md classe les tests comme BLOQUANT ÉLIMINATOIRE THP
- La checklist THP du plan (l.86-95) liste les tests, mais aucun step ne les écrit
- Step 12 ne contient que des vérifications manuelles navigateur
- Suivre le plan à la lettre = zéro fichier test/ = échec THP

## 🟡 Risques supplémentaires

### N6 — .env.example existant sera écrasé avec des variables incompatibles
- Fichier existant à la racine : CLOUDINARY_URL, SMTP_ADDRESS/PORT/USERNAME/PASSWORD/DOMAIN, WHATSAPP_PHONE, DEVISE_SECRET_KEY
- Plan Step 3 écrit : CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET, RESEND_API_KEY, ADMIN_EMAIL, APP_HOST, OTP_SECRET_KEY, ADMIN_PASSWORD
- Conflits : format Cloudinary différent (URL unique vs clés séparées), SMTP vs Resend, WHATSAPP_PHONE présent dans l'existant mais absent du plan (nécessaire pour les boutons WhatsApp), DEVISE_SECRET_KEY absent du plan

### N7 — OTP_SECRET_KEY manquant peut bloquer le démarrage
- Step 2 ajoute devise-two-factor avec otp_secret_encryption_key: ENV['OTP_SECRET_KEY']
- Si OTP_SECRET_KEY n'est pas défini dans .env, Devise lèvera une erreur au démarrage
- Le plan dit "dormant pour MVP" mais le gem est actif — risque de boot failure si .env incomplet

### N8 — Strings françaises dans les helpers d'ApplicationHelper
- partials_structure.md (référencé en Step 10) définit koi_status_badge avec "Disponible", "Vendu", "À venir"
- whatsapp_koi_url helper contient "Bonjour, je suis intéressé(e) par le koï..."
- THP exige le code en anglais — ces helpers sont en français

### N9 — Incohérence de chemin de vues mailer
- Plan Step 7 : vues dans app/views/message_mailer/new_message.html.erb
- partials_structure.md : vues dans app/views/contact_mailer/new_message.html.erb
- Le chemin réel est déterminé par le nom de la classe Ruby (MessageMailer → message_mailer/) — le plan est correct mais les docs sont incohérentes

### N10 — Provider SMTP incohérent entre les docs
- RISKS_AND_BLOCKERS.md (BLOQUANT 2) recommande Mailjet
- rails_mvp_plan.md Step 7 utilise Resend
- Ce n'est pas un bug bloquant, mais un développeur lisant les deux docs aura deux fournisseurs différents

### N11 — Approche JS incompatible entre le plan et asset_pipeline_setup.md
- Plan : copie les modules JS dans app/javascript/visitors/ et admin/, les importe directement via import "./visitors/header" — approche "raw modules"
- asset_pipeline_setup.md : approche Stimulus controllers (header_controller.js, filter_controller.js, etc.)
- Ces architectures sont mutuellement exclusives. Le plan et son doc de référence préconisent des stratégies contradictoires.

### N12 — Fix turbo:load incohérent entre le plan et RISKS_AND_BLOCKERS.md
- Plan Step 10 : remplacer DOMContentLoaded par turbo:load
- RISKS_AND_BLOCKERS.md RISQUE 1 : ajouter les deux DOMContentLoaded + turbo:load
- L'approche du plan (remplacement) est techniquement meilleure mais les docs se contredisent

### N13 — Admin::DashboardController absent
- partials_structure.md définit admin/dashboard/index.html.erb
- Plan Step 8 : aucun generate controller Admin::Dashboard
- Admin root pointe sur kois#index (acceptable), mais incohérent avec la structure de vues documentée

## 🟠 Mineurs supplémentaires

### N14 — Structure CSS du plan diverge de asset_pipeline_setup.md
- Plan : cp VISITORS/assets/css/*.css app/assets/stylesheets/visitors/ → structure plate
- asset_pipeline_setup.md : structure arborescente avec visitors/pages/home.css, visitors/pages/decouvrir.css, etc.
- Les manifests CSS de asset_pipeline_setup.md listent des fichiers (shared/variables, shared/badge, etc.) qui n'existent pas dans VISITORS/assets/css/ et ne seront pas créés par le cp

### N15 — admin_application.css non précompilé
- asset_pipeline_setup.md l.363 : Rails.application.config.assets.precompile += %w[admin.css]
- Plan : le manifest s'appelle admin_application.css mais aucun initializer ne le précompile
- En production, admin_application.css sera introuvable après assets:precompile

---

## Récapitulatif global

| Catégorie | Nb | Status |
| --- | --- | --- |
| Critiques check_mvp_plan (#1-5) | 5 | ❌ Tous présents |
| Risques THP check_mvp_plan (#6-10) | 5 | ❌ Tous présents |
| Mineurs check_mvp_plan (#11-12) | 2 | ❌ Tous présents |
| Compléments A-D | 4 | ❌ Tous présents |
| Point corrigé | 1 | ✅ devise_for dupliqué |
| Nouveaux critiques (JS/Importmap) | 2 | ❌ N1, N2 |
| Nouveaux risques | 9 | ❌ N3-N11 |
| Nouveaux mineurs | 4 | ❌ N12-N15 |

Total : 27 problèmes ouverts, 1 corrigé. Le plan est solide sur l'architecture générale et la logique métier, mais il ne peut pas être exécuté tel quel sans bloquer au démarrage (N1, N2, #3) ou échouer à la démo THP (manque de tests, mailer cassé, 5 pages absentes).