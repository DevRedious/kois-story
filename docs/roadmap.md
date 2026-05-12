# Roadmap

Cette roadmap decrit la trajectoire actuelle du repo Rails. Les prototypes
HTML et les audits THP restent des archives; la livraison passe par Rails,
Docker Desktop, puis une validation sur `DEV`.

## Etat actuel

- Rails est la source de verite applicative.
- Le dev local officiel passe par Docker Desktop.
- `compose.yaml` expose le site public sur `:3000`, l'admin sur `:3001` et
  PostgreSQL sur `:5433`.
- La production n'est pas encore consideree comme migree vers cette cible.

## Phase 1 - Stabilisation Docker local

Statut : en finalisation.

- Verifier le demarrage des services `db`, `setup`, `public` et `admin`.
- Confirmer que `public` et `admin` partagent la meme base PostgreSQL locale.
- Maintenir `ruby script/docker_smoke.rb` comme controle rapide.
- Garder les tests Rails et RuboCop verts dans les conteneurs.

## Phase 2 - Staging sur DEV

Statut : prochaine etape.

- Preparer la PR de `setup/local-docker-stack` vers `DEV`.
- Aligner les variables d'environnement de staging avec `.env.example`.
- Configurer la base PostgreSQL partagee pour les services staging.
- Verifier les seeds admin sans detruire de donnees existantes.
- Documenter les ecarts entre local Docker et staging Coolify.

## Phase 3 - Split public/admin

Statut : a faire apres stabilisation staging.

- Servir le public sur le domaine principal.
- Servir l'admin sur `admin.kois-story.com`.
- Garder l'isolation de routes via `KOIS_APP_ROLE`.
- Valider DNS, HTTPS, cookies, redirections et `/up` sur chaque service.

## Phase 4 - QA front responsive

Statut : a faire avant merge DEV.

- Tester les pages publiques sur mobile, tablette et desktop.
- Tester les ecrans admin critiques sur mobile large et desktop.
- Verifier catalogue, fiche koi, galerie, formulaire de contact et WhatsApp.
- Verifier uploads Cloudinary, emails Resend et messages admin.
- Corriger les regressions visuelles avant la PR finale.

## Phase 5 - PR vers DEV

Statut : objectif court terme.

- Relire le diff limite au perimetre attendu.
- Confirmer les commandes de validation Docker/Rails.
- Mettre a jour la documentation utile sans modifier les archives.
- Ouvrir ou finaliser la PR vers `DEV`.

## Apres validation DEV

- Preparer la migration production sans toucher directement `main`.
- Valider le plan de donnees, sauvegardes et rollback.
- Basculer la production seulement apres validation staging et accord equipe.
