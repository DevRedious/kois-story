# Audit Technique & Design — Espace Administration (Koi's Story)

Cet audit évalue la structure actuelle du back-office en se basant sur les standards de développement moderne, l'architecture Atomic Design et les impératifs de réactivité mobile.

---

## 1. Analyse de l'Architecture & HTML

### Points Forts
- **Structure Atomique** : La séparation en `atoms`, `molecules`, `organisms` est bien respectée et facilite la réutilisation.
- **Sémantique** : Utilisation correcte des balises `aside`, `main`, `header`, `nav` et `table`.
- **Modularité** : Le système de chargement dynamique de la sidebar permet d'avoir une source de vérité unique pour la navigation.

### Incohérences & Améliorations
- **Duplication du Code (DRY)** : Certaines pages (ex: `accounting.html`, `client-form.html`) contiennent beaucoup de styles CSS "en ligne" (`style="..."`) qui devraient être centralisés dans `admin.css`.
- **Incohérence des IDs** : Le chargement de la sidebar utilise `#admin-sidebar-root` dans `admin.js`, mais certaines pages utilisent des structures légèrement différentes.
- **Accessibilité (A11y)** : Manque d'attributs `aria-label` sur les boutons d'action iconographiques et les champs de formulaire complexes.

---

## 2. Analyse CSS & Design System

### Design System
- **Palette Chromatique** : Excellente utilisation des variables CSS (`:root`). L'identité "Konishi" (Or/Bleu/Rouge) est cohérente.
- **Typographie** : Le duo *Playfair Display* (titres) et *Inter* (corps) apporte un aspect premium très réussi.

### Responsivité (Mobile-First)
- **Approche "Desktop-First"** : Le fichier `admin.css` définit les styles desktop par défaut et utilise des `@media (max-width: 768px)` pour corriger le mobile. 
    - *Recommandation* : Inverser la logique pour du vrai "Mobile-First" (styles de base pour mobile, puis expansion via `min-width`).
- **Tables de données** : Sur mobile, les tableaux larges provoquent un scroll horizontal important ou des chevauchements. 
    - *Recommandation* : Implémenter un système de cartes (`cards`) pour mobile ou un conteneur `overflow-x: auto` plus robuste.

---

## 3. Analyse JavaScript (`admin.js`)

### Logique & Fonctionnalités
- **Injection Dynamique** : L'utilisation de `fetch()` pour la sidebar est une bonne solution pour un prototype statique, mais elle créera un "flash" de contenu non chargé en production.
- **Notifications** : Le système de toast est fonctionnel mais les styles sont codés en dur dans le JS (`notification.style.cssText`), ce qui rend la maintenance difficile.

### Incohérences Détectées
- **Conflit de Toggle** : Il existe deux manières de gérer la sidebar dans le code : une via `addEventListener` dans `admin.js` et une autre via des fonctions globales `toggleSidebar()` appelées en `onclick` direct dans le HTML. Cela peut générer des comportements imprévisibles.
- **Navigation Active** : La logique de détection de la page active (`data-current-page`) est manuelle. Rails devra automatiser cela via les `active_link_to`.

---

## 4. Focus : Sidebar & Navigation

### Comportement Desktop
- Le système "Hover to expand" (64px -> 280px) est élégant mais peut être frustrant si l'utilisateur veut garder le menu ouvert.
- **Incohérence visuelle** : Dans `sidebar.html`, les icônes sont un mélange de SVG inline et de fichiers `.svg` via `<img>`. Le rendu peut différer (épaisseur des traits).

### Comportement Mobile
- **Le menu burger** : Bien implémenté avec l'overlay.
- **Zone de clic** : Les `nav-item` sont parfois trop étroits sur mobile pour une navigation tactile confortable.
- **Incohérence de Logo** : Le logo dans la sidebar change de taille de manière abrupte lors du survol.

---

## 5. Liste des Incohérences Critiques

1.  **Sidebar Double** : Le fichier `templates/admin-layout.html` possède une sidebar en dur différente de `organisms/sidebar.html`.
2.  **Breadcrumbs Orphelins** : Présents sur `koi-form.html` mais absents sur les autres pages de formulaires (`client-form`, `order-form`).
3.  **Titres de Page** : La `topbar` affiche parfois le titre de la page, et parfois le titre est dans le `content`. Il faut unifier cette structure.
4.  **Boutons Logout** : Le bouton de déconnexion est parfois un `button`, parfois un `a`.

---

## 6. Recommandations Prioritaires

1.  **Unifier le chargement du Layout** : Passer à une structure de layout unique une fois sous Rails pour éliminer les `fetch()` JS.
2.  **Standardiser les Icônes** : Choisir une seule méthode (idéalement SVG inline pour pouvoir manipuler les couleurs via CSS `currentColor`).
3.  **Refactoriser le CSS Mobile** : Ajouter une classe `.table-responsive` sur tous les wraps de tableaux.
4.  **Nettoyage JS** : Supprimer les `onclick=""` en ligne au profit des écouteurs d'événements dans `admin.js`.

---
*Audit réalisé le 18 Mars 2026 par Gemini CLI.*
