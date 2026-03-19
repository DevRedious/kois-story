# Agent

## Rôle

Ce document résume le contexte projet pour un agent de développement intervenant sur Koi's Story.

## Objectif produit

Créer une vitrine digitale premium pour un élevage de carpes koï affilié à la lignée Konishi, avec consultation catalogue et prise de contact directe via WhatsApp.

## Contraintes principales

- Respecter une architecture Rails classique
- Utiliser uniquement des routes REST
- Garder les contrôleurs fins et la logique métier dans les modèles
- Écrire le code et `README.md` en anglais
- Maintenir une approche mobile-first
- Structurer l'UI avec une approche Atomic Design
- Préserver le badge Konishi comme élément fort de différenciation
- Ne jamais introduire de paiement en ligne

## Données métier

- `users`
- `kois`
- `images`
- `tags`
- `koi_tags`
- `messages`

## Parcours prioritaires

- Visiteur : découvrir, filtrer, ouvrir une fiche, contacter en moins de 3 clics
- Admin : se connecter, gérer le stock, gérer les messages

## Références utiles

- `docs/business/executive_summary_kois_story.md`
- `docs/design/brand/charte_graphique.md`
- `docs/design/atomic_design.md`
- `docs/design/wireframes/wireframes.md`
- `docs/planning/formulaire_thp.md`
- `docs/ux/parcours_utilisateur.md`
