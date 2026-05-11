# Stack

Ce document decrit l'etat technique actuel de l'application Rails Koi's Story.
La source de verite est l'application Rails, pas les prototypes archives.

## Backend

- Ruby on Rails `8.1.2`
- Ruby `3.4.2` dans les images Docker
- Architecture MVC Rails et routes REST
- Puma/Thruster pour le serveur applicatif
- Solid Cache, Solid Queue et Solid Cable inclus dans la stack Rails

## Frontend Rails

- Hotwire avec Turbo et Stimulus
- `importmap-rails` pour les modules JavaScript
- Assets Rails via Propshaft
- Vues ERB et composants UI derives de l'integration Atomic Design Rails

## Base de donnees

- PostgreSQL `17` en local via Docker Desktop
- Service local expose sur `127.0.0.1:5433`
- Services `public` et `admin` relies a la meme base via `DATABASE_URL`
- SQLite reste present comme configuration Rails historique/fallback si
  `DATABASE_URL` n'est pas fourni

## Authentification

- Devise pour l'authentification admin
- `devise-two-factor`, `rotp` et `rqrcode` pour la 2FA
- Routes admin isolees par role d'application (`KOIS_APP_ROLE=admin`)

## Medias et emails

- CarrierWave pour les uploads applicatifs
- Cloudinary pour le stockage et la transformation des images
- ActionMailer en SMTP Resend en production
- `letter_opener` en developpement
- WhatsApp `wa.me` pour le contact commercial direct

## Developpement local

- Docker Desktop est le runtime local officiel
- `compose.yaml` lance `db`, `setup`, `public` et `admin`
- Site public local : `http://localhost:3000`
- Admin local : `http://localhost:3001`
- Script de smoke test : `ruby script/docker_smoke.rb`

## Qualite

- Tests Rails via `bin/rails test`
- RuboCop Rails Omakase pour Ruby
- Brakeman et bundler-audit pour les controles securite
- Biome pour JS, CSS et JSON
- Smoke Docker pour l'isolation public/admin et la base partagee

## Hebergement cible

- Cible : VPS gere par Coolify avec conteneurs Docker
- Staging vise sur la branche `DEV`
- Separation cible : domaine public principal et `admin.kois-story.com`
- Base partagee cible : PostgreSQL gere par l'environnement Docker/Coolify
- Production non consideree comme migree tant que la validation DEV n'est pas
  terminee
