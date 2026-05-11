# Guide de deploiement Coolify

Ce guide decrit la cible actuelle pour deployer Koi's Story avec Rails,
Docker et Coolify sur le VPS `137.74.112.197`. Coolify est l'orchestrateur
retenu ; Kamal n'est pas utilise dans le chemin de deploiement actif.

## Cible actuelle

Les DNS Cloudflare `dev.kois-story.com` et `admin.kois-story.com` pointent deja
vers `137.74.112.197`. Le public existant ne doit pas changer tant que staging
et admin ne sont pas valides.

| Service | Branche cible | Domaine | Role |
|---|---|---|---|
| Staging Rails | `DEV` | `dev.kois-story.com` | validation complete avant release |
| Admin Rails | `DEV` puis release | `admin.kois-story.com` | back-office separe |
| Public Rails | `main` | domaine principal | production, a basculer plus tard |

Objectif futur : public sur le domaine principal, admin sur
`admin.kois-story.com`, staging sur `dev.kois-story.com`, avec une base de
donnees partagee entre les services qui doivent voir les memes donnees.

## Modele Coolify

Creer un service Coolify par role applicatif. Chaque service peut pointer vers
le meme depot, mais avec sa branche, son domaine et ses variables.

Parametres communs :

```text
Source: depot Git
Build pack: Dockerfile
Dockerfile: Dockerfile
Port expose: 80
Healthcheck scheme: http
Healthcheck path: /up
```

Le Dockerfile lance `./bin/thrust ./bin/rails server`. L'entrypoint Docker lance
`bin/rails db:prepare` avant de demarrer Rails. Le healthcheck `/up` doit rester
accessible en HTTP depuis Coolify.

## Prerequis

- Coolify gere les conteneurs Docker sur le VPS.
- Cloudflare pointe les domaines attendus vers `137.74.112.197`.
- HTTPS est gere par Coolify/Traefik avec Cloudflare en amont.
- Le Dockerfile existe a la racine du depot.
- Les tests et linters passent avant deploy.
- Les secrets sont disponibles via Infisical ou variables Coolify.

Verification locale :

```bash
bundle check
bundle exec ruby bin/rails test
bundle exec rubocop
npx biome check .
```

## Variables d'environnement

Les secrets ne doivent jamais etre commits. La source de verite attendue est
Infisical quand le projet l'utilise ; Coolify recoit ensuite les variables au
runtime, soit par synchronisation, soit par saisie manuelle controlee.

Variables communes :

```text
RAILS_MASTER_KEY=<contenu de config/master.key>
DATABASE_URL=<url de la base partagee ou dediee au service>
CLOUDINARY_CLOUD_NAME=<cloud name Cloudinary>
CLOUDINARY_API_KEY=<api key Cloudinary>
CLOUDINARY_API_SECRET=<api secret Cloudinary>
RESEND_API_KEY=<api key Resend>
ADMIN_EMAIL=<email destinataire admin>
WHATSAPP_PHONE=<telephone international sans +>
MAILER_FROM=Koi's Story <no-reply@kois-story.com>
OTP_SECRET_KEY=<secret stable de 32+ octets>
FORCE_SSL=true
ASSUME_SSL=true
SOLID_QUEUE_IN_PUMA=true
```

Variables de routage par service :

| Service | `APP_HOST` | `PUBLIC_SITE_URL` | `KOIS_APP_ROLE` |
|---|---|---|---|
| Staging complet | `dev.kois-story.com` | `https://dev.kois-story.com` | `all` |
| Admin | `admin.kois-story.com` | `https://dev.kois-story.com` | `admin` |
| Public | `<domaine principal>` | `https://<domaine principal>` | `public` |

Notes :

- `APP_HOST` contient seulement le host, sans `https://`.
- `PUBLIC_SITE_URL` contient l'URL absolue du site public visible par les
  emails, liens et redirections inter-services.
- `KOIS_APP_ROLE` distingue `public`, `admin` et `all` sans changer l'image
  Docker. `all` expose les routes publiques et admin, utile pour un staging
  complet sur `dev.kois-story.com`.
- `DATABASE_URL` doit etre identique entre services si les donnees sont
  partagees. Utiliser des bases separees seulement pour isoler un environnement.
- `OTP_SECRET_KEY` doit rester stable pour ne pas casser les secrets 2FA.
- `ADMIN_PASSWORD` ne doit servir qu'a une initialisation controlee.

## Creation d'un service

1. Ouvrir Coolify et creer une ressource depuis le depot Git.
2. Choisir `Dockerfile`.
3. Selectionner la branche (`DEV` pour staging/admin, `main` pour production).
4. Configurer le domaine avec le schema `https://`.
5. Ajouter les variables d'environnement du service.
6. Lancer un premier deploiement.

Garder le port expose sur `80`. Rails parle HTTP dans le conteneur ; HTTPS est
termine par Coolify/Traefik.

## Base de donnees et stockage

La cible est une base referencee par `DATABASE_URL`. Pour un public/admin
partage, les services doivent utiliser la meme base et les memes migrations.

Si un service utilise encore SQLite pendant une phase transitoire, monter un
volume persistant sur `/rails/storage`. Sans volume, les fichiers SQLite et les
uploads locaux peuvent etre perdus lors d'un redeploiement.

## Premier deploiement

Surveiller dans les logs Coolify :

- `bundle install`
- `bootsnap precompile`
- `SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile`
- `bin/rails db:prepare`
- demarrage avec `./bin/thrust ./bin/rails server`

Verifier ensuite :

```text
https://<domaine>/up -> 200
https://<domaine>/    -> page attendue
```

Ne pas lancer `db:seed` sur une base contenant deja des donnees sans relire
`db/seeds.rb`. Les seeds peuvent etre destructifs selon leur etat courant.

## Ordre recommande

1. Deployer et valider `dev.kois-story.com` depuis `DEV`.
2. Deployer et valider `admin.kois-story.com` sans modifier le public actuel.
3. Verifier `DATABASE_URL`, uploads, emails et liens publics.
4. Basculer le domaine principal uniquement apres validation explicite.

## Checks apres deploiement

- `/up` retourne `200`.
- La page attendue charge sur le domaine du service.
- `/users/sign_in` charge pour les roles `admin` et `all`.
- La connexion admin fonctionne.
- Les formulaires critiques creent les donnees attendues.
- L'envoi email fonctionne via Resend.
- Les liens WhatsApp utilisent le bon numero.
- Les uploads Cloudinary fonctionnent.
- Les donnees survivent a un redeploiement.

## Depannage

- Precompilation en erreur : verifier les logs Docker et les assets Rails.
- Connexion ou 2FA en erreur : verifier `RAILS_MASTER_KEY` et `OTP_SECRET_KEY`.
- Emails absents : verifier `RESEND_API_KEY`, `APP_HOST`, `PUBLIC_SITE_URL` et
  `MAILER_FROM`.
- Donnees absentes entre services : comparer les valeurs `DATABASE_URL`.
- Healthcheck en erreur : garder `/up` en HTTP et verifier l'exclusion SSL Rails.

## References

- Documentation Coolify : https://coolify.io/docs
- Variables d'environnement Coolify : https://coolify.io/docs/resources/environment-variables
- Stockage persistant Coolify : https://coolify.io/docs/resources/persistent-storage
- Health checks Coolify : https://coolify.io/docs/resources/health-checks
