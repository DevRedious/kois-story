# Guide de deploiement Coolify

Ce guide explique comment deployer Koi's Story comme application Rails Dockerisee sur un VPS gere par Coolify.

## Modele de deploiement

Utiliser Coolify comme orchestrateur de deploiement. Kamal n'est pas necessaire pour cette configuration.

- Source : depot Git
- Build pack : Dockerfile
- Port d'execution : `80`
- Healthcheck : `/up`
- Stockage persistant : `/rails/storage`
- Base de donnees : fichiers SQLite stockes dans `/rails/storage`
- Uploads : stockage local Active Storage sous `/rails/storage`

Le Dockerfile de production lance :

```bash
./bin/thrust ./bin/rails server
```

L'entrypoint Docker lance automatiquement `bin/rails db:prepare` avant de demarrer le serveur Rails.

## Prerequis

Sur le VPS :

- Coolify installe et accessible
- Docker gere par Coolify
- DNS du domaine pointe vers le VPS
- HTTPS active via Coolify

Dans le depot :

- Les tests passent en local
- Le Dockerfile existe a la racine du depot
- `.dockerignore` exclut `vendor/bundle`
- La valeur de `config/master.key` est disponible
- Les secrets sont prets pour les variables d'environnement Coolify

Verification locale avant de deployer :

```bash
bundle check
bundle exec ruby bin/rails test
bundle exec rubocop
npx biome check .
```

## Creer l'application Coolify

1. Ouvrir Coolify.
2. Creer une nouvelle ressource.
3. Choisir le provider Git ou le depot Git public.
4. Selectionner ce depot.
5. Choisir `Dockerfile` comme build pack.
6. Garder le chemin du Dockerfile :

```text
Dockerfile
```

7. Definir le port expose :

```text
80
```

8. Definir le healthcheck :

```text
/up
```

## Domaine et SSL

Dans Coolify, attacher le domaine de production, par exemple :

```text
kois-story.fr
www.kois-story.fr
```

Valeurs recommandees en production :

```text
APP_HOST=kois-story.fr
FORCE_SSL=true
ASSUME_SSL=true
```

Si le premier deploiement se fait sur une URL temporaire Coolify sans domaine HTTPS final, utiliser :

```text
FORCE_SSL=false
ASSUME_SSL=false
```

Passer ensuite les deux valeurs a `true` lorsque le domaine final et le certificat SSL sont prets.

## Stockage persistant

Ajouter un volume persistant dans Coolify :

```text
Container path: /rails/storage
```

C'est obligatoire car SQLite utilise ces fichiers en production :

```text
storage/production.sqlite3
storage/production_cache.sqlite3
storage/production_queue.sqlite3
storage/production_cable.sqlite3
```

Sans ce volume, les donnees peuvent disparaitre lors d'un redeploiement.

Sauvegarder regulierement ce volume depuis Coolify ou depuis le VPS.

## Variables d'environnement

Ajouter ces variables dans les parametres d'environnement de l'application Coolify.

```text
RAILS_MASTER_KEY=<contenu de config/master.key>
CLOUDINARY_CLOUD_NAME=<cloud name Cloudinary>
CLOUDINARY_API_KEY=<api key Cloudinary>
CLOUDINARY_API_SECRET=<api secret Cloudinary>
RESEND_API_KEY=<api key Resend>
ADMIN_EMAIL=<email destinataire admin>
WHATSAPP_PHONE=<telephone international sans +, exemple 33612345678>
APP_HOST=<domaine de production, exemple kois-story.fr>
MAILER_FROM=Koi's Story <no-reply@kois-story.fr>
OTP_SECRET_KEY=<secret stable de 32+ octets>
ADMIN_PASSWORD=<mot de passe admin initial pour le premier seed seulement>
FORCE_SSL=true
ASSUME_SSL=true
SOLID_QUEUE_IN_PUMA=true
```

Notes :

- `RAILS_MASTER_KEY` doit correspondre a `config/credentials.yml.enc`.
- `OTP_SECRET_KEY` doit rester stable. Le changer peut casser les secrets 2FA existants.
- `ADMIN_PASSWORD` est utilise par `db/seeds.rb`, pas par le code normal de connexion.
- `WHATSAPP_PHONE` doit contenir uniquement les chiffres pour les liens `wa.me`.
- Ne jamais coller de secrets dans des fichiers suivis par Git.

## Premier deploiement

Lancer le deploiement depuis Coolify.

Surveiller les logs de build pour retrouver ces etapes attendues :

- `bundle install`
- `bootsnap precompile`
- `SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile`
- le conteneur demarre avec `./bin/thrust ./bin/rails server`
- l'entrypoint lance `./bin/rails db:prepare`

Apres le deploiement, ouvrir :

```text
https://votre-domaine/up
```

Reponse attendue :

```text
200 OK
```

Puis ouvrir le site public :

```text
https://votre-domaine/
```

## Premieres donnees admin

Ne pas lancer les seeds plusieurs fois en production. Le fichier actuel `db/seeds.rb` supprime et recree les utilisateurs, kois, tags, messages et images.

Uniquement pour une premiere base de production vide, lancer une seule fois depuis le terminal Coolify :

```bash
bin/rails db:seed
```

Emails admin crees par defaut :

```text
contact.koistory@gmail.com
emmanuel.koistory@gmail.com
```

Les deux utilisent `ADMIN_PASSWORD` au moment du seed.

Pour une mise en production plus sure plus tard, creer une tache ponctuelle dediee a la creation d'admin au lieu d'utiliser le fichier seed destructif.

## Checks apres deploiement

Faire ces verifications apres le premier deploiement :

- `/up` retourne `200`
- la page d'accueil charge
- `/kois` charge
- `/users/sign_in` charge
- la connexion admin fonctionne
- le formulaire de contact cree un message
- l'envoi email fonctionne via Resend
- les liens WhatsApp ouvrent le bon numero
- l'upload Cloudinary fonctionne depuis les formulaires admin koi/produit
- les fichiers uploades survivent a un redeploiement

## Depannage

Si l'application echoue pendant la precompilation des assets :

- Verifier les logs de build Dockerfile.
- Confirmer que `SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile` s'est execute.
- Confirmer que tous les assets frontend references par Rails existent dans le depot.

Si l'application demarre mais que la connexion ou la 2FA echoue :

- Confirmer que `RAILS_MASTER_KEY` est correct.
- Confirmer que `OTP_SECRET_KEY` est present et stable.

Si l'email ne part pas :

- Confirmer `RESEND_API_KEY`, `APP_HOST` et `MAILER_FROM`.
- Verifier les logs runtime Coolify pour les erreurs SMTP.

Si les donnees disparaissent apres redeploiement :

- Confirmer que le volume persistant est monte sur `/rails/storage`.
- Confirmer que les fichiers SQLite existent dans ce volume.

Si les uploads echouent :

- Confirmer les identifiants Cloudinary.
- Verifier que l'uploader concerne est configure pour Cloudinary en production.

## References

- Documentation Coolify : https://coolify.io/docs
- Variables d'environnement Coolify : https://coolify.io/docs/resources/environment-variables
- Stockage persistant Coolify : https://coolify.io/docs/resources/persistent-storage
- Health checks Coolify : https://coolify.io/docs/resources/health-checks

## Note de verification

Ce fichier peut etre modifie sans impact runtime pour verifier le webhook
GitHub -> Coolify sur la branche `deploy`.
