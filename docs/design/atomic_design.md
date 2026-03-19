# Atomic Design

## Objectif

Le projet adopte une organisation UI basée sur l'Atomic Design pour rendre l'interface plus cohérente, réutilisable et maintenable.

## Niveaux

- `atoms` : éléments UI simples et isolés
- `molecules` : assemblages courts d'éléments
- `organisms` : blocs métier plus complets
- `templates` : structures de pages sans contenu final
- `pages` : pages complètes avec contenu réel

## Intention pour Koi's Story

- uniformiser les composants visuels
- accélérer la création des pages
- éviter les duplications de markup
- mieux faire évoluer la vitrine et le back-office

## Exemples projet

- `atoms` : bouton, badge Konishi, prix, input, label
- `molecules` : card meta koï, filtre catalogue, bloc CTA WhatsApp
- `organisms` : grille catalogue, hero, formulaire de contact, galerie
- `templates` : template home, template catalogue, template fiche produit
- `pages` : accueil, catalogue, détail koï, contact, dashboard admin

## Convention cible

Une structure possible côté front:

```text
app/components/
  atoms/
  molecules/
  organisms/
  templates/
  pages/
```

## Règles

- un composant doit avoir une responsabilité claire
- éviter les composants trop gros trop tôt
- privilégier la réutilisation avant la duplication
- aligner les composants avec la charte graphique
- conserver une approche mobile-first
