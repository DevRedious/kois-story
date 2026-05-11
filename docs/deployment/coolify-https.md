# Activer HTTPS avec Coolify et Cloudflare

Ce document decrit la configuration HTTPS attendue pour les services Koi's
Story geres par Coolify, avec Cloudflare devant le VPS `137.74.112.197`.

## Contexte

Les enregistrements DNS Cloudflare existent pour :

```text
dev.kois-story.com   -> 137.74.112.197
admin.kois-story.com -> 137.74.112.197
```

Ces domaines servent a valider staging et admin avant toute modification du
public existant. Le domaine principal ne doit pas etre bascule tant que
`dev.kois-story.com` et `admin.kois-story.com` ne sont pas valides.

## Responsabilites

| Couche | Role |
|---|---|
| Cloudflare DNS | Pointe les hosts vers le VPS. |
| Proxy Cloudflare | Peut etre active pour proteger et proxyfier le trafic. |
| Coolify/Traefik | Termine HTTPS et route vers le bon conteneur. |
| Rails | Recoit du HTTP interne sur le port `80`. |

Rails ne porte pas le certificat directement. Le conteneur expose `80`; Coolify
gere l'entree HTTPS.

## DNS Cloudflare

Verifier les records :

```text
Type: A
Name: dev
Value: 137.74.112.197
Proxy: active ou DNS only selon la phase de validation
```

```text
Type: A
Name: admin
Value: 137.74.112.197
Proxy: active ou DNS only selon la phase de validation
```

Pendant le diagnostic SSL, `DNS only` peut aider a isoler Coolify. En cible
normale, le proxy Cloudflare peut etre active si le mode SSL Cloudflare est
compatible avec le certificat Coolify.

## Mode SSL Cloudflare

Utiliser un mode qui chiffre aussi le trajet Cloudflare -> VPS. La cible
recommandee est :

```text
SSL/TLS encryption mode: Full (strict)
```

Precondition : Coolify doit avoir un certificat valide pour le host concerne.
Eviter `Flexible`, qui peut provoquer des boucles de redirection avec
`FORCE_SSL=true`.

## Configuration Coolify

Dans chaque application Coolify :

1. Ouvrir `Configuration > General`.
2. Ajouter le domaine avec le schema `https://`.
3. Garder le port expose sur `80`.
4. Garder le healthcheck interne en HTTP sur `/up`.
5. Redeployer apres changement de domaine ou de variable SSL.

Exemples :

```text
https://dev.kois-story.com
https://admin.kois-story.com
```

Ne pas remplacer le domaine public existant pendant cette phase.

## Variables Rails

Variables par service :

```text
APP_HOST=dev.kois-story.com
PUBLIC_SITE_URL=https://dev.kois-story.com
FORCE_SSL=true
ASSUME_SSL=true
```

```text
APP_HOST=admin.kois-story.com
PUBLIC_SITE_URL=https://dev.kois-story.com
FORCE_SSL=true
ASSUME_SSL=true
```

Role :

- `APP_HOST` : host canonique du service, sans schema.
- `PUBLIC_SITE_URL` : URL absolue du public referencee par emails ou liens.
- `FORCE_SSL=true` : active les redirections HTTPS Rails.
- `ASSUME_SSL=true` : indique a Rails qu'il est derriere un proxy HTTPS.

## Cote Rails

La production doit garder `/up` hors redirection SSL pour ne pas casser le
healthcheck Coolify :

```ruby
force_ssl = ENV["FORCE_SSL"] == "true"
config.assume_ssl = force_ssl || ENV["ASSUME_SSL"] == "true"
config.force_ssl = force_ssl
config.ssl_options = { redirect: { exclude: ->(request) { request.path == "/up" } } } if force_ssl
```

## Ordre de validation

1. Valider `dev.kois-story.com` sur la branche `DEV`.
2. Valider `admin.kois-story.com` avec son role applicatif.
3. Verifier certificats, redirections, login admin, emails et liens publics.
4. Garder le public actuel inchange tant que ces validations ne sont pas OK.
5. Planifier ensuite la bascule du domaine principal vers le service public.

## Verification

Commandes PowerShell :

```powershell
$hostName = "dev.kois-story.com"
Invoke-WebRequest "https://$hostName/up" -UseBasicParsing
Invoke-WebRequest "https://$hostName" -UseBasicParsing
Invoke-WebRequest "http://$hostName" -UseBasicParsing -MaximumRedirection 0
```

Resultat attendu :

```text
https://<host>/up -> 200
https://<host>/   -> 200 ou page applicative attendue
http://<host>/    -> redirection vers https://<host>/
Coolify           -> running:healthy
```

Repeter les checks pour `admin.kois-story.com`.

## Points d'attention

- Ne pas mettre `APP_HOST` avec `https://`.
- Garder le healthcheck Coolify en `http` sur `/up`.
- Eviter le mode Cloudflare `Flexible` avec `FORCE_SSL=true`.
- Si le proxy Cloudflare masque une erreur, tester temporairement en `DNS only`.
- Ne pas changer le domaine principal avant validation staging/admin.
