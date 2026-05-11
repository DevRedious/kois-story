# Développement local Docker

Ce guide décrit le démarrage local officiel de Koi's Story avec Docker Desktop.
Il s'adresse aux développeurs de l'équipe qui travaillent depuis Windows.

## Principe

Docker Desktop est la méthode de référence pour développer l'application Rails.
Pour éviter les écarts Ruby, PostgreSQL, gems natives et fins de ligne entre
machines, l'équipe ne lance pas Rails directement en natif sur Windows.

Le poste Windows sert à piloter Git, Docker et les commandes `docker compose`.
Rails, Bundler, Node et PostgreSQL tournent dans les conteneurs.

## Pré-requis

- Windows 10 ou 11 avec virtualisation activée.
- Docker Desktop installé, lancé, et configuré en mode Linux containers.
- Git installé, avec le dépôt déjà cloné.
- Accès au dossier du projet :

```powershell
cd <chemin-du-repo>\kois-story
```

## Installation depuis un clone existant

Créer `.env.local`, puis exécuter la séquence complète :

```powershell
Copy-Item .env.example .env.local
docker compose build
docker compose up -d --wait db public admin
docker compose exec -T admin bin/rails db:seed
ruby script/docker_smoke.rb
docker compose run --rm -e KOIS_APP_ROLE=all -e RAILS_ENV=test public bash -lc "unset DATABASE_URL; bin/rails test"
docker compose exec -T public bundle exec rubocop
```

Compléter `.env.local` si une intégration locale le demande. Les clés vides sont
acceptées pour le démarrage Docker de base.

## URLs et rôles locaux

| Service | URL | Rôle | Notes |
| --- | --- | --- | --- |
| Public | http://localhost:3000 | `KOIS_APP_ROLE=public` | Catalogue, pages publiques, contact |
| Admin | http://localhost:3001 | `KOIS_APP_ROLE=admin` | Back-office et authentification admin |
| PostgreSQL | `127.0.0.1:5433` | n/a | Port Windows exposé vers le service `db` |

Les services `public` et `admin` partagent la même base PostgreSQL Docker.
Le routage reste séparé par rôle : les routes admin ne doivent pas répondre sur
`:3000`, et les routes publiques ne doivent pas répondre sur `:3001` quand elles
sont hors périmètre admin.

## Commandes utiles

Voir l'état des services et les logs :

```powershell
docker compose ps
docker compose logs -f
```

Suivre un service précis :

```powershell
docker compose logs -f public
docker compose logs -f admin
docker compose logs -f db
```

Redémarrer ou arrêter sans supprimer la base :

```powershell
docker compose restart public admin
docker compose down
```

Réappliquer migrations et seeds sans supprimer les volumes :

```powershell
docker compose exec -T admin bin/rails db:prepare
docker compose exec -T admin bin/rails db:seed
```

Recharger les seeds en nettoyant les données gérées par Rails :

```powershell
docker compose exec -T admin bin/rails db:seed:replant
```

Reconstruire après changement de dépendances ou du Dockerfile :

```powershell
docker compose build
docker compose up -d --wait db public admin
```

Supprimer les volumes Docker est destructif pour la base locale. Ne le faire que
si la pile est irrécupérable et après accord avec l'équipe.

## Dépannage

### Erreur `ruby\r` ou binstubs cassés

Les fichiers `bin/*` doivent rester en LF, pas en CRLF. Le smoke script vérifie
`bin/rails`, `bin/rake`, `bin/setup` et `bin/dev`.

Si Git a converti les fins de ligne, réappliquer les attributs puis relancer le
smoke :

```powershell
git add --renormalize bin .gitattributes
ruby script/docker_smoke.rb
```

Ne pas committer une renormalisation large sans vérifier le diff.

### Turnstile en local ou en test

`TURNSTILE_SITE_KEY` et `TURNSTILE_SECRET_KEY` peuvent rester vides dans
`.env.local` pour le développement de base. Le formulaire de contact active
Turnstile seulement si les deux variables sont présentes.

Pour tester explicitement Turnstile, utiliser des clés locales ou de test, puis
retirer ces valeurs si elles gênent les tests manuels.

Exemple de paire de test Cloudflare qui valide toujours :

```dotenv
TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### Port déjà utilisé

Les ports attendus sont `3000`, `3001` et `5433`. Si l'un est occupé :

```powershell
docker compose ps
docker compose down
netstat -ano | findstr ":3000"
netstat -ano | findstr ":3001"
netstat -ano | findstr ":5433"
```

Arrêter le processus concurrent, puis relancer `docker compose up -d --wait db public admin`.

### Docker daemon non lancé

Si le daemon est indisponible, ouvrir Docker Desktop, attendre le démarrage du
moteur, puis relancer :

```powershell
docker compose up -d --wait db public admin
```

### `.env.local` absent

Les services Compose chargent `.env.local`. S'il manque, recréer le fichier :

```powershell
Copy-Item .env.example .env.local
docker compose up -d --wait db public admin
```

## Critères d'acceptation

- `http://localhost:3000` sert le public avec `KOIS_APP_ROLE=public`.
- `http://localhost:3001` sert l'admin avec `KOIS_APP_ROLE=admin`.
- Les routes public/admin restent isolées entre les deux ports.
- Les deux services Rails utilisent la même base PostgreSQL Docker.
- `ruby script/docker_smoke.rb` termine par `PASS: Docker smoke checks completed.`
