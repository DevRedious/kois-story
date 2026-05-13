# Design — Réutilisation du bouton nav « pilule » (public + admin)

> Centraliser le rendu visuel et les tokens CSS du lien pilule actif (référence : `Accueil` / `nav-pill` dans le header public) sans dupliquer le markup ni les dégradés, tout en gardant une couche Rails légère et des layouts public/admin distincts.

## Contexte (état actuel, hors `docs/`)

- **Public** : le header est rendu une seule fois via `app/views/pages/_home_header.html.erb` ; chaque entrée simple passe par `app/views/pages/_nav_pill_link.html.erb` ; les styles pilule/or vivent surtout dans `app/assets/stylesheets/visitors/molecules/nav-pill-link.css`. L’état `.active` sur les liens pilule est principalement appliqué côté client (`app/javascript/visitors/header-nav.js`), avec une exception serveur pour le groupe « Produits ».
- **Admin** : `app/views/admin/shared/_sidebar.html.erb` + `AdminHelper#admin_current_page` pour l’actif ; styles `.nav-item` dans les modules layout admin. Libellés et structure répétés dans la vue ; pas de réutilisation du partial public ni des mêmes tokens dédiés « pilule ».

## Objectif produit

- Réutiliser le **design UI/UX** du bouton pilule sélectionné (or/bronze, hover, actif, accessibilité de base) partout où un lien de navigation de même nature est nécessaire, **sans copier-coller** de blocs HTML/CSS.
- Conserver **deux espaces visuels** (public header vs sidebar admin) si la mise en page diffère, mais **une seule définition** des surfaces actives (tokens + règles communes ou variantes explicites).

## Approche retenue (option 2)

**Composants Rails ciblés + tokens CSS partagés**, sans inventaire unique Ruby de toute l’arborescence des deux apps.

- **Couche UI** : extraire ou factoriser les **custom properties** et les règles « surface active pilule » dans un module importé par les deux manifests (`application.css` et `admin_application.css`), en respectant la limite **≤ 200 lignes** par fichier (scinder si besoin).
- **Couche Vue** : un (ou deux) partial(s) avec API stable (`label`, `url`, `active`, `testid`, `variant`) ; le public garde `_home_header` comme orchestration ; l’admin peut introduire un partial dédié **sidebar link** qui réutilise les mêmes classes/tokens ou une variante `BEM`/modificateur documentée.
- **État actif** : documenter une règle unique par espace — **public** : soit conserver le JS pour l’indicateur glissant + aligner « Produits » sur la même règle, soit migrer vers une logique serveur cohérente ; **admin** : conserver le modèle serveur (`admin_current_page`) et le brancher sur le partial plutôt que répéter trois fois la même condition dans la vue.

## Architecture cible

1. **`app/assets/stylesheets/shared/nav-pill-tokens.css`**  
   - Variables : gradient or/bronze, bordure, ombres, rayons si non déjà couverts par `shared/variables.css`.  
   - Aucune règle de layout lourd ici — uniquement tokens + éventuellement utilitaires de surface.

2. **`visitors/molecules/nav-pill-link.css`**  
   - Importe les tokens partagés ; conserve les sélecteurs contextuels `.header__nav …` pour ne pas casser le header existant.

3. **`admin/...`** (nouveau module court, ex. `atoms/nav-pill-surface.css` ou extension contrôlée de `layout-section-2.css` si volume OK)  
   - `.nav-item` (ou modificateur) consomme les **mêmes variables** pour l’état actif afin d’aligner visuellement avec le public sans fusionner les structures HTML.

4. **Partials**  
   - **Public** : faire évoluer `_nav_pill_link` vers `app/views/shared/_nav_pill_link.html.erb` (ou garder le chemin `pages/` mais un seul fichier source) avec paramètres explicites ; `_home_header` ne fait qu’assembler les entrées.  
   - **Admin** : `admin/shared/_nav_item.html.erb` (exemple) qui encapsule `link_to`, classes, `aria-current`, `data-testid`, et reçoit `active:` depuis le helper — la sidebar devient une **boucle** sur une structure de données définie dans `AdminHelper` ou un PORO `Admin::NavItem` **minimal** (pas d’inventaire global public+admin unifié).

## Flux de données

- **Public** : contrôleur existant → vues → `_home_header` → partial pilule ; `request.path` ou helper léger pour le dropdown Produits ; JS optionnel pour indicateur — la spec d’implémentation précisera si l’actif pilule reste 100 % client ou hybride.
- **Admin** : `controller_path` → `admin_current_page` → collection d’items nav → partial ; pas de dépendance au JS pour l’état actif.

## Gestion d’erreurs et cas limites

- **Contrôleur admin inconnu** : remplacer le fallback silencieux `:dashboard` par **aucune entrée de sidebar marquée active** (`nil` ou symbole `:none` géré par le partial) ; en environnement `development`, journaliser un avertissement une fois par requête pour signaler un `controller_path` non mappé.
- **`data-page` inutilisé** : le retirer ou le documenter (analytics / futur script) pour éviter la fausse « source de vérité ».
- **Turbo / header permanent** : toute évolution de l’actif côté serveur doit rester compatible avec `data-turbo-permanent` sur le header public.

## Tests

- **Public** : au moins un test système ou E2E qui vérifie `data-testid="nav-home"` et, si `.active` reste piloté par JS, le scénario avec JS activé ou une assertion sur le comportement visible convenu.
- **Admin** : étendre les E2E existants ou ajouter des tests du helper sur le mapping `controller_path` → section active pour les routes principales.
- **Régression visuelle** : optionnel ; pas requis pour la première livraison.

## Hors périmètre (cette spec)

- Refonte complète de l’information architecture ou fusion d’une seule nav public+admin en un seul registre Ruby.
- Modification des prototypes sous `docs/` (exclu par la demande initiale).

## Critères de succès

- Un développeur ajoute une entrée de menu **sans dupliquer** gradient/bordure/ombre : il étend la liste (admin) ou une ligne de rendu (public) et réutilise le partial + tokens.
- Les manifests CSS importent explicitement le module de tokens partagé ; pas de copie de valeurs hex en dur pour la surface pilule hors du module tokens.
- Aucun fichier source ne dépasse **200 lignes** après refactor (scinder si nécessaire).

## Prochaine étape

Après validation de ce fichier : invoquer la skill **writing-plans** pour produire le plan d’implémentation pas à pas (fichiers touchés, ordre des PRs, tests).
