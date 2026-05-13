---
name: kois-story-session-preflight
description: Applies Koi's Story session guardrails and a read-only preflight checklist (git, local env files, Infisical, Docker, Coolify) before any substantive work. Use when starting work on this repository, when the user attaches this skill, or when Infisical, Coolify, secrets, or production safety are in scope.
disable-model-invocation: true
---

# Koi's Story — session preflight

## Obsidian (source of truth locale)

Lire d’abord la note Obsidian **« Guide Cursor - Skill ecosysteme Koi Story »** dans le vault équipe. Elle n’est pas versionnée dans ce dépôt : si le chemin n’est pas fourni par l’utilisateur, demander où elle se trouve ou confirmer que les règles ci‑dessous suffisent pour la session.

## Règles absolues

- n'affiche jamais de secret ;
- ne modifie pas main ;
- ne fais pas de sync Infisical -> Coolify sans validation humaine ;
- ne touche pas au domaine public kois-story.com ;
- travaille en lecture seule tant que je ne demande pas explicitement une modification.

## Avant toute action substantielle

1. Exécuter la checklist **Preflight** ci‑dessous (lecture seule, pas de valeurs de secrets).
2. **Proposer le plan minimal** (étapes, fichiers, risques) et attendre validation implicite ou explicite si la tâche est ambiguë ou risquée.
3. N’utiliser `infisical init` que si l’utilisateur le demande explicitement.

## Preflight (checklist)

Exécuter dans l’ordre ; ne jamais afficher le contenu des fichiers `.env*` ni les valeurs Infisical / Coolify.

1. `git status --short --branch` — branche courante, état du working tree (ne pas committer sur `main`).
2. **Fichiers `.env` locaux** — pour chaque fichier pertinent (ex. `.env`, `.env.local`, `.env.infisical.local`, `.env.example`), indiquer seulement **présent / absent** (pas de `cat` des secrets).
3. `infisical --version` — CLI disponible.
4. `docker version` — client (et serveur si accessible) pour le contexte Docker local.
5. **Infisical `staging` (lecture seule)** — après chargement **silencieux** des variables depuis `.env.infisical.local` (sans les imprimer), `infisical login --method=universal-auth ... --silent --plain` en absorbant la sortie du token, puis pour chaque chemin `/shared`, `/public`, `/admin` : `infisical secrets --env staging --path <path> --projectId … --silent --output json` et ne reporter que **le nombre de clés** (pas les noms ni valeurs si l’utilisateur demande zéro fuite ; si inventaire de noms demandé explicitement, clés uniquement, jamais valeurs).
6. **Coolify** — `coolify context verify` puis statut des applications pertinentes (ex. `coolify app list` ou équivalent) : **pas** de dump des variables d’environnement, pas de secrets.

Si une étape échoue (auth Infisical, mauvais contexte Coolify), le signaler sans deviner de credentials ; proposer la correction minimale (ex. autre contexte Coolify, fichier local manquant).

## Résumé attendu après preflight

- Accès global : OK / partiel / KO par brique (git, env fichiers, infisical, docker, coolify).
- Branche Git et propreté du tree.
- Comptages Infisical staging par path (`/shared`, `/public`, `/admin`) si accessibles.
- Statut applicatif Coolify **sans** valeurs d’environnement.

## Hors scope sans demande explicite

- Sync ou push Infisical → Coolify.
- Changements DNS / domaine **kois-story.com**.
- Écriture dans les secrets Infisical ou fichiers sensibles.

## Fichiers sensibles

- `.env.infisical.local` est ignoré par Git via `.env.*` (ne jamais le committer).
