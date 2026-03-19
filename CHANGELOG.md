# Journal des modifications

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).
Ce projet suit un workflow de pré-production jusqu'au premier déploiement en production.

---

## [Non publié]

### Ajouté
- Unification des fichiers TODO en un seul `TODO.md` structuré par thème

---

## [2026-03-19]

### Ajouté
- Restauration complète du dossier `VISITORS/` depuis la branche `Maquette` (69 fichiers : CSS, JS, HTML atoms/molecules/organisms/pages/templates)
- Récupération des fichiers absents de `admin-and-back` : `index.html`, `.nojekyll`, tokens de design, assets clients (vidéo, bambou, captures maquettes ChatGPT)
- Règles Cursor (`.cursor/rules/`) documentant l'architecture CSS admin, JS, Atomic Design, barème THP

### Modifié
- Refactorisation des composants admin : badge, button, input, avatar — palette V3 et nouvelles variables CSS appliquées
- Amélioration de la barre de filtres et de la structure des lignes koï pour une meilleure utilisabilité
- `README.md` mis à jour avec les statuts de badges et la fonctionnalité de sélecteur de thème
- `docs/todo.md` synchronisé avec la section retour client maquettes ChatGPT

### Corrigé
- Suppression accidentelle de tous les fichiers `VISITORS/` lors d'un rebase raté sur `admin-and-back` (commit `e00ff38`)

---

## [2026-03-18]

### Ajouté
- Architecture CSS modulaire complète pour `VISITORS/assets/css/` : 20 fichiers spécialisés (`variables`, `base`, `header`, `hero`, `catalogue`, `product`, `farm`, `shop`, `konishi`, `badge`, `button`, `price`, `forms`, `atoms-media`, `footer`, `features`, `koi-card`, `koi-card-pages`, `product-pages`, `azukari`, `demo`, `visitor`)
- Séparateurs en vague (`wave.svg`, `wave-divider`) sur les pages intérieures
- Animations au défilement sur toutes les pages visiteurs
- Nouvelle navbar et footer déployés sur toutes les pages visiteurs
- Modularisation JavaScript de VISITORS : `header.js`, `filter.js`, `gallery.js`, `animations.js` (tous sous 200 lignes)
- Conformité accessibilité WCAG AAA : contraste corrigé sur l'ensemble de `VISITORS/`
- Intégration de la branche `DEV` dans `Maquette` via la pull request #2

### Modifié
- Couleur du hero passée au noir pour améliorer la lisibilité du texte superposé
- Style des boutons : suppression de la variante liquide
- Koï en vedette sur la page d'accueil mis à jour
- Rayon de bordure des boutons harmonisé sur toutes les pages
- Correction de l'affichage du symbole euro sur la page d'accueil

### Corrigé
- Problème de police sur le koï Hanabi
- Conflit de fusion sur `hero.css` — approche wave clip-path de Maquette conservée
- Conflit de fusion sur `catalogue.css` — valeurs `top: 0` et `backdrop-filter` conservées
- Problème de navbar sur la page catalogue
- Lisibilité des cards et du footer
- Migration complète des styles CSS : 0 balise `<style>` inline restante dans les 34 fichiers HTML de VISITORS

### Supprimé
- Galerie circulaire (`CircularGallery`) suite au retour client
- Boucle de lecture automatique sur la vidéo du hero
- `main.js` (405 lignes, hors limite 200 lignes) remplacé par les modules JS dédiés

---

## [2026-03-17]

### Ajouté
- Fichiers transmis par le client : contenus textuels, assets visuels et informations recueillies lors de l'appel
- Maquette V2 après appel client : base de travail intégrant les premiers retours visuels

### Modifié
- Maquette V3 : intégration d'animations et de la galerie circulaire (retirée par la suite)

---

## [2026-03-16]

### Ajouté
- Configuration GitHub Pages pour la branche `Maquette` (`.nojekyll`, `index.html` de redirection)
- Vidéo dans la section hero de la page d'accueil

### Corrigé
- Ratios d'images incorrects (formats 4/3 et 3/4) sur toutes les pages
- Lien défectueux sur la page d'accueil
- Problème d'affichage de l'image sur les cards koï

### Supprimé
- Second bouton catalogue sur la page d'accueil
- Galerie photo sur la page d'accueil

---

## [2026-03-13]

### Modifié
- `CONTRIBUTING.md` : clarification du modèle de branches et du workflow (noms de branches en minuscules, directions des pull requests précisées)
- `biome.json` : extension des patterns de fichiers ignorés (tous les fichiers HTML et répertoires spécifiques)

---

## [2026-03-12]

### Ajouté
- Structure Atomic Design documentée pour `ADMIN/` et `VISITORS/` dans `docs/`
- Plan d'implémentation admin (`docs/planning/admin_implementation.md`)
- Réorganisation des wireframes et fichiers de design sous `docs/design/`

### Modifié
- `README.md` enrichi avec le statut du dépôt et les standards de collaboration
- `docs/todo.md` mis à jour pour utiliser `ADMIN/` et `VISITORS/` comme espaces de travail UI

---

## [2026-03-11]

### Modifié
- `README.md` complété avec les informations du projet (deux itérations)

### Intégration
- Fusion de la branche `DEV` dans `main` via la pull request #1

---

## [2026-03-10]

### Ajouté
- Initialisation du dépôt
- Structure de base : `docs/`, `ADMIN/`, `VISITORS/`
- Fichiers de gouvernance du dépôt : templates GitHub (issues, pull requests), `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`
- `docs/todo.md`, `docs/roadmap.md`, `docs/stack.md`, `docs/agent.md`
- `docs/design/atomic_design.md` — stratégie d'architecture UI
