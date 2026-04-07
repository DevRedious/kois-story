# ADMIN

## Objectif

Ce dossier contient la structure `Atomic Design` dédiée au back-office de Koi's Story.

L'objectif est de construire une interface d'administration claire, réutilisable et facile à maintenir, sans mélanger les composants admin avec ceux de l'espace visiteurs.

## Structure

```text
ADMIN/
  atoms/
  molecules/
  organisms/
  templates/
  pages/
```

## Rôle de chaque dossier

### `atoms/`

Contient les éléments UI les plus simples.

Exemples présents :

- `avatar.html`
- `badge.html`
- `button.html`
- `input.html`
- `stat-card.html`

Usage :

- petits composants isolés
- peu ou pas de logique
- base de composition pour les niveaux supérieurs

### `molecules/`

Contient des assemblages courts de plusieurs `atoms`.

Exemples présents :

- `filter-bar.html`
- `koi-row.html`
- `message-row.html`
- `nav-item.html`

Usage :

- lignes de tableau
- éléments de navigation
- blocs de filtre

### `organisms/`

Contient des blocs fonctionnels plus complets.

Exemples présents :

- `sidebar.html`
- `topbar.html`
- `kois-table.html`
- `messages-table.html`

Usage :

- zones complètes d'interface
- blocs métier admin
- regroupement de plusieurs `molecules`

### `templates/`

Contient les structures globales de pages admin.

Exemple présent :

- `admin-layout.html`

Usage :

- squelette général du back-office
- répartition sidebar, topbar et contenu principal
- structure sans contenu métier final

### `pages/`

Contient les pages finales du back-office.

Exemples présents :

- `dashboard.html`
- `kois.html`
- `messages.html`

Usage :

- vues complètes prêtes à afficher
- assemblage final des `templates`, `organisms`, `molecules` et `atoms`

## Logique de composition

Le principe attendu est :

1. un `atom` reste simple
2. plusieurs `atoms` forment une `molecule`
3. plusieurs `molecules` forment un `organism`
4. les `organisms` sont placés dans un `template`
5. une `page` applique le `template` avec le contenu réel

## Règles de travail

- ne pas mettre un gros bloc métier dans `atoms`
- ne pas dupliquer les composants déjà présents
- garder les composants admin séparés de l'espace public
- nommer les composants selon leur rôle réel
- réutiliser les composants avant d'en créer de nouveaux

## Cible fonctionnelle

Cette structure sert à construire :

- le dashboard admin
- la gestion des koïs
- la gestion des messages
- les futurs formulaires CRUD

## Bénéfices

- meilleure lisibilité du back-office
- maintenance plus simple
- meilleure réutilisation des composants
- évolution plus propre de l'interface admin
