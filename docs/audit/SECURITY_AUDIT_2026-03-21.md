# Security Audit - 2026-03-21

## Scope

Audit cible du MVP Rails sur les points les plus sensibles avant essais reels :

- injection SQL
- protection admin
- upload de fichiers
- rendu HTML / XSS
- configuration HTTP / production
- hygiene de logs et secrets

## Executive Summary

Etat global : correct pour un MVP Rails, sans faille SQL evidente relevee.

Mise a jour apres remediation :

- uploads image durcis par allowlists + taille max
- create/update admin des kois rendus transactionnels avec rollback si image invalide
- CSP minimale activee
- HTTPS prod activable par variables d'environnement
- tests ajoutes sur les acces admin et les uploads non image

Points positifs :

- pas de trace d'injection SQL evidente dans les requetes ActiveRecord
- back-office protege par authentification + role admin
- `strong params` utilises sur les actions sensibles
- pas de `raw`, `html_safe`, `find_by_sql`, `Arel.sql` ou interpolation SQL dangereuse reperes dans `app/`
- filtrage des parametres sensibles actif dans les logs

Points a durcir avant une vraie mise en prod :

1. ajouter des restrictions explicites sur les uploads image
2. activer HTTPS force en production
3. mettre en place une Content Security Policy
4. ajouter des tests d'acces refuses pour l'admin
5. decider si le 2FA admin doit devenir obligatoire

## Findings

### [P1] Upload image sans garde-fous explicites

Fichiers :

- `app/uploaders/image_uploader.rb`
- `app/models/image.rb`
- `app/controllers/admin/kois_controller.rb`

Constat :

- l'uploader Cloudinary fonctionne, mais il ne definit pas de liste blanche d'extensions ou de types autorises
- aucune limite de taille n'est visible dans l'uploader
- l'admin peut envoyer un fichier via `uploaded_images`, puis `koi.images.create!(url: uploaded_image, ...)`

Risque :

- upload de fichier non image
- comportements imprevisibles selon Cloudinary / CarrierWave
- surface d'attaque plus large qu'un upload image strictement borne

Recommandation :

- definir une `extension_allowlist`
- definir un `content_type_allowlist`
- ajouter une taille max acceptable
- ajouter des tests d'upload rejetant un faux fichier non image

Statut :

- corrige

### [P1] HTTPS non force en production

Fichier :

- `config/environments/production.rb`

Constat :

- `config.force_ssl = true` est commente
- `config.assume_ssl = true` est commente

Risque :

- cookies et sessions admin moins bien proteges si le reverse proxy ou l'hebergement sont mal configures
- perte de protection HSTS

Recommandation :

- activer `force_ssl` si l'hebergement final supporte correctement HTTPS
- activer `assume_ssl` derriere un proxy TLS si necessaire

Statut :

- corrige via `FORCE_SSL` et `ASSUME_SSL`

### [P2] CSP non active

Fichier :

- `config/initializers/content_security_policy.rb`

Constat :

- la politique CSP est entierement commentee

Risque :

- protection plus faible contre certaines XSS ou injections de ressources tierces

Recommandation :

- activer une CSP minimale
- commencer simple : `default_src :self, :https`, `object_src :none`
- ajuster ensuite pour Cloudinary, fonts, importmap et assets reels

Statut :

- corrige

### [P2] Couverture de tests incomplete sur les acces admin refuses

Fichiers :

- `app/controllers/admin/base_controller.rb`
- `test/controllers/admin/kois_controller_test.rb`
- `test/controllers/admin/messages_controller_test.rb`

Constat :

- la protection est bien en place avec `authenticate_user!` et `require_admin!`
- les tests actuels couvrent surtout les cas connectes admin
- je n'ai pas vu de tests qui verifient qu'un non-connecte ou non-admin est bloque

Risque :

- une future regression pourrait exposer une route admin sans etre detectee assez tot

Recommandation :

- ajouter des tests de redirection pour utilisateur non connecte
- ajouter des tests de refus pour utilisateur connecte non admin

Statut :

- corrige

### [P2] 2FA present mais pas impose

Fichier :

- `app/models/user.rb`

Constat :

- le module `:two_factor_authenticatable` est present
- rien ne montre que tous les comptes admin doivent activer le 2FA avant connexion

Risque :

- si un mot de passe admin fuite, il n'y a pas forcement de seconde barriere

Recommandation :

- decider explicitement si le 2FA est obligatoire pour tous les admins
- si oui, ajouter une verification de politique admin et les tests associes

## Checks performed

### SQL injection

Verdict : pas de faille evidente relevee.

Points verifies :

- `app/models/koi.rb`
- `app/controllers/kois_controller.rb`
- `app/controllers/admin/kois_controller.rb`
- `app/controllers/admin/messages_controller.rb`
- `app/controllers/admin/dashboard_controller.rb`

Conclusion :

- les requetes utilisent `where(col: value)`, `find(params[:id])` ou des placeholders parametres comme `where("price <= ?", params[:max_price])`
- je n'ai pas trouve de `find_by_sql`, `order(params[:sort])`, `where("... #{params[:x]}")`, `Arel.sql` ou equivalent dangereux

### XSS / rendu HTML

Verdict : pas de point critique evident releve dans `app/`.

Points verifies :

- recherche de `raw`
- recherche de `html_safe`
- recherche de `sanitize`

Conclusion :

- aucun usage dangereux detecte dans les fichiers applicatifs audites
- le rendu ERB standard reste escape par defaut

### CSRF

Verdict : correct par defaut.

Conclusion :

- l'application derive de `ActionController::Base`
- aucun controleur API ou desactivation visible de la protection CSRF n'a ete releve

### Admin access control

Verdict : la base est saine.

Conclusion :

- `Admin::BaseController` impose `authenticate_user!`
- `require_admin!` redirige si `current_user.admin?` est faux
- les routes admin passent bien par les controleurs admin namespacs

### Logs / secrets

Verdict : plutot bon.

Conclusion :

- `filter_parameter_logging.rb` masque bien les secrets, tokens, cles et OTP
- les secrets critiques attendent des variables d'environnement (`RESEND_API_KEY`, `APP_HOST`, `OTP_SECRET_KEY`, etc.)

## Priority Actions

1. durcir l'uploader image
2. activer `force_ssl` en production
3. activer une CSP minimale
4. ajouter des tests d'acces admin refuses
5. statuer sur le 2FA admin obligatoire

## Final Assessment

Le projet n'expose pas de faille SQL evidente dans son etat actuel, et la base de securite Rails est plutot saine pour un MVP.

Le principal travail restant n'est pas une urgence critique de type injection SQL, mais un durcissement de mise en prod :

- uploads plus stricts
- HTTPS force
- CSP
- tests de regression sur les acces admin
