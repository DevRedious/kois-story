# Activer HTTPS avec Coolify

Ce document decrit les etapes appliquees pour passer Koi's Story de HTTP a
HTTPS sur Coolify.

## Contexte

Application Coolify :

```text
kois-story
```

URL de test utilisee :

```text
lnvi1e1noiilgzfjsnwe7luj.137.74.112.197.sslip.io
```

Objectif :

```text
http://... -> redirection vers https://...
https://... -> 200 OK
Coolify -> running:healthy
```

## Configuration Coolify

Dans Coolify :

1. Ouvrir l'application `kois-story`.
2. Aller dans `Configuration > General`.
3. Remplacer le domaine HTTP par le domaine HTTPS.
4. Sauvegarder.

Valeur appliquee pendant la phase de test :

```text
https://lnvi1e1noiilgzfjsnwe7luj.137.74.112.197.sslip.io
```

Pour un domaine final, utiliser par exemple :

```text
https://kois-story.fr
https://www.kois-story.fr
```

Garder :

```text
Port expose: 80
Healthcheck scheme: http
Healthcheck path: /up
```

Rails reste en HTTP dans le conteneur. Coolify/Traefik gere le certificat HTTPS
en entree, puis transmet la requete au conteneur.

## Variables Rails

Dans `Configuration > Environment Variables`, passer ces variables a :

```text
APP_HOST=lnvi1e1noiilgzfjsnwe7luj.137.74.112.197.sslip.io
FORCE_SSL=true
ASSUME_SSL=true
```

Pour le domaine final :

```text
APP_HOST=kois-story.fr
FORCE_SSL=true
ASSUME_SSL=true
```

Role :

- `APP_HOST` : host utilise par Rails pour les URLs absolues et les emails.
- `FORCE_SSL=true` : active `config.force_ssl` et redirige HTTP vers HTTPS.
- `ASSUME_SSL=true` : indique a Rails qu'il est derriere un proxy HTTPS.

## Cote Rails

La configuration existe dans `config/environments/production.rb` :

```ruby
force_ssl = ENV["FORCE_SSL"] == "true"
config.assume_ssl = force_ssl || ENV["ASSUME_SSL"] == "true"
config.force_ssl = force_ssl
config.ssl_options = { redirect: { exclude: ->(request) { request.path == "/up" } } } if force_ssl
```

L'exclusion de `/up` est importante : elle evite que le healthcheck interne
Coolify soit casse par une redirection HTTPS.

## Rededeployer

Apres avoir change le domaine et les variables :

1. Lancer `Redeploy` dans Coolify.
2. Attendre que le rolling update se termine.
3. Verifier que Coolify indique `running:healthy`.

Le deploiement valide a affiche :

```text
New container is healthy.
Rolling update completed.
```

## Verification

Commandes PowerShell :

```powershell
$hostName = "lnvi1e1noiilgzfjsnwe7luj.137.74.112.197.sslip.io"
Invoke-WebRequest "https://$hostName/up" -UseBasicParsing
Invoke-WebRequest "https://$hostName" -UseBasicParsing
Invoke-WebRequest "http://$hostName" -UseBasicParsing -MaximumRedirection 0
```

Resultat obtenu :

```text
https://.../up -> 200
https://.../ -> 200
http://.../ -> 302 vers https://.../
Coolify -> running:healthy
```

## Points d'attention

- Ne pas mettre `APP_HOST` avec `https://`; Rails attend seulement le host.
- Garder le healthcheck Coolify en `http` sur `/up`.
- Si un domaine final remplace `sslip.io`, mettre a jour `APP_HOST`.
- Si `FORCE_SSL=true` casse le healthcheck, verifier l'exclusion `/up`.
