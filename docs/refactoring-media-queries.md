# Plan d'action — Conversion Media Queries vers Mobile-First

> **Objectif** : Remplacer tous les `@media (max-width: ...)` par `@media (min-width: ...)` dans les fichiers CSS de `VISITORS/assets/css/`.
> **Règle** : Ne jamais utiliser `max-width` dans les media queries (sauf `prefers-reduced-motion`).
> **Impact visuel attendu** : Aucun si la conversion est faite correctement.

---

## Méthode de conversion

La conversion n'est **pas** un simple find/replace. Elle demande de réorganiser les styles.

### Principe général

**Avant (desktop-first) :**
```css
/* Base = desktop */
.element { padding: 40px; font-size: 18px; }

@media (max-width: 768px) { .element { padding: 20px; font-size: 16px; } }
@media (max-width: 480px) { .element { padding: 12px; font-size: 14px; } }
```

**Après (mobile-first) :**
```css
/* Base = mobile (valeur de l'ancien max-width le plus petit) */
.element { padding: 12px; font-size: 14px; }

@media (min-width: 481px) { .element { padding: 20px; font-size: 16px; } }
@media (min-width: 769px) { .element { padding: 40px; font-size: 18px; } }
```

### Règle de conversion des breakpoints

| Ancien `max-width` | Nouveau `min-width` | Signification |
|---|---|---|
| `max-width: 480px` | base (pas de MQ) | mobile petit = styles de base |
| `max-width: 580px` | `min-width: 481px` | mobile standard |
| `max-width: 600px` | `min-width: 481px` | mobile standard |
| `max-width: 768px` | `min-width: 481px` | mobile standard |
| `max-width: 900px` | `min-width: 769px` | tablette / desktop |
| base (desktop) | `min-width: 901px` | grand desktop |

> `prefers-reduced-motion` n'est pas une media query de taille — **à laisser inchangée**.

---

## Breakpoints cibles (système unifié)

```css
/* Mobile (base — pas de media query) : < 481px */
/* Mobile large / Tablette : min-width: 481px */
/* Tablette / Desktop : min-width: 769px */
/* Grand desktop : min-width: 901px */
```

---

## Fichiers à ne PAS modifier

Ces fichiers sont déjà mobile-first ou n'ont pas de media queries de taille :

- `footer.css` — utilise déjà `min-width: 769px` ✓
- `forms.css` — partiellement correct (1 `min-width` déjà présent, mais aussi des `max-width`)
- `koi-card.css` — aucune media query
- `base.css` — aucune media query
- `atoms-media.css` — aucune media query
- `variables.css` — aucune media query
- `fonts.css` — aucune media query
- `demo.css` — preview only, hors scope

---

## Plan fichier par fichier

### 1. `azukari.css` — Priorité FACILE

**Media queries actuelles :**
- `max-width: 768px` → padding de la section `.azukari-desc`
- `max-width: 480px` → padding encore plus réduit
- `max-width: 768px` → grilles `.azukari-desc__inner` et `.azukari-features` passent à `1fr`

**Conversion :**
1. Faire du style de `max-width: 480px` le style de base
2. Créer `min-width: 481px` avec les valeurs actuelles de `max-width: 768px`
3. Créer `min-width: 769px` avec les valeurs de base actuelles (desktop)

**Propriétés concernées :** `padding`, `grid-template-columns`

---

### 2. `konishi.css` — Priorité FACILE

**Media queries actuelles :**
- `max-width: 768px` → `margin-top` et `padding-top` de `.konishi-band--wavy-bottom + .contact-quick`
- `max-width: 480px` → valeurs légèrement différentes
- `max-width: 768px` → `.konishi-band__inner` passe à `grid-template-columns: 1fr`
- `max-width: 480px` → padding encore réduit

**Conversion :**
1. Style de base = valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs de `max-width: 768px`
3. `min-width: 769px` = valeurs de base actuelles

**Propriétés concernées :** `margin-top`, `padding-top`, `grid-template-columns`, `padding`, `gap`

---

### 3. `shop.css` — Priorité FACILE

**Media queries actuelles :**
- `max-width: 768px` → `.konishi-info__inner` passe à `1fr`
- `max-width: 900px` → `.shop-grid` passe à `repeat(2, 1fr)`, padding réduit
- `max-width: 480px` → `.shop-grid` passe à `1fr`, padding encore réduit

**Conversion :**
1. Style de base = valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs de `max-width: 768px` et `max-width: 900px` (fusionner si même breakpoint)
3. `min-width: 769px` = valeurs intermédiaires
4. `min-width: 901px` = valeurs de base actuelles

**Propriétés concernées :** `grid-template-columns`, `padding`

---

### 4. `catalogue.css` — Priorité FACILE

**Media queries actuelles :**
- `max-width: 900px` → `.koi-grid` passe à `repeat(2, 1fr)`, padding réduit
- `max-width: 480px` → `.koi-grid` passe à `1fr`, padding encore réduit

**Conversion :**
1. Style de base = `koi-grid: 1fr` (mobile), padding le plus réduit
2. `min-width: 481px` = `koi-grid: repeat(2, 1fr)`, padding intermédiaire
3. `min-width: 901px` = `koi-grid: repeat(3, 1fr)`, padding desktop

**Propriétés concernées :** `grid-template-columns`, `padding`

---

### 5. `hero.css` — Priorité MOYENNE

**Media queries actuelles :**
- `prefers-reduced-motion: reduce` → à laisser inchangée
- `max-width: 768px` → `margin-top` / `padding-top` du hero wavy
- `max-width: 480px` → valeurs encore plus réduites
- `max-width: 768px` → `margin-top` du hero-compact wavy
- `max-width: 480px` → valeurs légèrement différentes

**Conversion :**
1. Style de base = valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs de `max-width: 768px`
3. `min-width: 769px` = valeurs de base actuelles

**Propriétés concernées :** `margin-top`, `padding-top` (gestion des vagues clip-path, valeurs sensibles)

> ⚠️ Les valeurs `vh` et `calc()` sur les vagues sont critiques pour l'alignement visuel. Tester soigneusement.

---

### 6. `features.css` — Priorité MOYENNE

**Media queries actuelles :**
- `max-width: 768px` → grille `.features__grid` passe à `1fr`, `.feature-card--main` réduit
- `max-width: 480px` → padding et min-height encore réduits
- `max-width: 900px` → `.feature-main` repasse à `grid-row: auto`

**Conversion :**
1. Style de base = valeurs de `max-width: 480px` (colonne simple, petits paddings)
2. `min-width: 481px` = valeurs de `max-width: 768px`
3. `min-width: 769px` = valeurs entre 768 et 900
4. `min-width: 901px` = valeurs de base actuelles (grille `2fr 1fr`, `grid-row: 1/3`)

**Propriétés concernées :** `grid-template-columns`, `grid-template-rows`, `grid-row`, `min-height`, `padding`

---

### 7. `farm.css` — Priorité MOYENNE

**Media queries actuelles :**
- `max-width: 768px` → nombreux grids passent à colonne simple, story-block reset
- `max-width: 480px` → paddings encore réduits, grilles à `1fr`

**Conversion :**
1. Style de base = toutes les valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs de `max-width: 768px`
3. `min-width: 769px` = valeurs de base actuelles

**Propriétés concernées :** `grid-template-columns`, `flex-direction`, `padding`, `gap`, `direction`

> ⚠️ `.story-block--reverse { direction: rtl }` est reset à `ltr` en mobile. Vérifier l'affichage du texte arabe ou bidirectionnel.

---

### 8. `forms.css` — Priorité MOYENNE

**Media queries actuelles (mix) :**
- `max-width: 900px` → grilles contact passent à `1fr`
- `min-width: 769px` → `.form-row` passe à `1fr 1fr` (déjà correct ✓)
- `max-width: 580px` → `.contact-quick__wa` passe à `1fr`

**Conversion :**
1. Garder le `min-width: 769px` existant
2. `max-width: 900px` → mettre la version `1fr` en base, créer `min-width: 901px` pour `1fr 1fr`
3. `max-width: 580px` → version `1fr` en base, `min-width: 581px` pour `1fr 1fr`

**Propriétés concernées :** `grid-template-columns`

---

### 9. `product.css` — Priorité MOYENNE

**Media queries actuelles :**
- `max-width: 900px` → `.koi-detail` passe à `1fr`, specs à `repeat(3, 1fr)`
- `max-width: 480px` → specs à `repeat(2, 1fr)`, padding réduit

**Conversion :**
1. Style de base = valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs de `max-width: 900px` (attention: specs passent à 3 colonnes)
3. `min-width: 901px` = valeurs de base actuelles (layout 2 colonnes)

**Propriétés concernées :** `grid-template-columns`, `padding`

---

### 10. `product-pages.css` — Priorité DIFFICILE

**Media queries actuelles :**
- `max-width: 900px` → grilles produit, specs, related passent à `1fr`
- `max-width: 600px` → paddings réduits
- `max-width: 480px` → thumbnails réduites, related à `1fr`

**Conversion :**
1. Style de base = valeurs de `max-width: 480px`
2. `min-width: 481px` = valeurs entre 480 et 600
3. `min-width: 601px` = valeurs entre 600 et 900 (paddings)
4. `min-width: 901px` = valeurs de base actuelles (grille `1.2fr 1fr`)

**Propriétés concernées :** `grid-template-columns`, `gap`, `padding`, `width`, `height`

---

### 11. `koi-card-pages.css` — Priorité DIFFICILE

**Media queries actuelles :**
- `max-width: 900px` → `.editorial` passe de `row` à `column`, modifications profondes
- `max-width: 480px` → title font-size réduit, `.editorial__sub` caché

**Conversion :**
1. Style de base = layout colonne (mobile)
2. `min-width: 481px` = styles intermédiaires
3. `min-width: 901px` = layout `row` avec `flex: 0 0 65%` et hauteur fixe 440px

**Propriétés concernées :** `flex-direction`, `height`, `flex`, `border`, `box-shadow`, `padding`, `font-size`, `display`

> ⚠️ Le composant editorial est structurellement différent mobile vs desktop. Tester en priorité.

---

### 12. `header.css` — Priorité DIFFICILE

**Media queries actuelles :**
- `max-width: 480px` → logo plus petit
- `max-width: 900px` (ligne 60) → padding du header `.site-header--on-filter`
- `max-width: 900px` (lignes 276-387) → navigation complète masquée, burger affiché

**Conversion :**
1. Style de base = mobile (burger visible, nav masquée, logo petit)
2. `min-width: 481px` = logo légèrement plus grand
3. `min-width: 901px` = navigation desktop visible, burger masqué, pill avec blur

**Propriétés concernées :** `display`, `backdrop-filter`, `background`, `border-color`, `padding`, `height`, `position`, `top`, `left`, `right`

> ⚠️ La navigation mobile (burger + menu overlay) doit rester fonctionnelle. C'est le fichier le plus complexe. À faire en dernier.

---

## Ordre d'exécution recommandé

```
Étape 1 — Facile (pages statiques, peu d'impact)
  [ ] azukari.css
  [ ] konishi.css
  [ ] shop.css
  [ ] catalogue.css

Étape 2 — Moyenne (composants avec logique de cascade)
  [ ] hero.css
  [ ] features.css
  [ ] farm.css
  [ ] forms.css
  [ ] product.css

Étape 3 — Difficile (composants structurellement complexes)
  [ ] product-pages.css
  [ ] koi-card-pages.css
  [ ] header.css  ← en dernier
```

---

## Protocole de test après chaque fichier

Pour chaque fichier converti, ouvrir dans le navigateur et vérifier :

1. **Mobile (< 480px)** — DevTools → iPhone SE ou 375px
2. **Mobile large (481–768px)** — DevTools → 600px
3. **Tablette (769–900px)** — DevTools → 820px
4. **Desktop (> 900px)** — DevTools → 1280px

Pages à tester selon le fichier modifié :

| Fichier | Pages à tester |
|---|---|
| `azukari.css` | `pages/azukari.html` |
| `konishi.css` | `pages/home.html`, `pages/nourriture.html` |
| `shop.css` | `pages/nourriture.html`, `pages/materiel.html`, `pages/soins.html` |
| `catalogue.css` | `pages/kois.html` |
| `hero.css` | toutes les pages |
| `features.css` | `pages/home.html` |
| `farm.css` | `pages/decouvrir.html` |
| `forms.css` | `pages/contact.html` |
| `product.css` | `pages/product.html` |
| `product-pages.css` | `pages/product.html` |
| `koi-card-pages.css` | `pages/kois.html`, `pages/product.html` |
| `header.css` | toutes les pages |

---

## Points d'attention globaux

- `prefers-reduced-motion` n'est **jamais** à modifier — ce n'est pas une media query de taille
- Les valeurs `calc(50px + var(--sp-20))` dans les vagues clip-path sont des compensations de hauteur header — vérifier l'alignement à chaque taille d'écran
- Ne pas fusionner les breakpoints `481px` et `769px` en un seul si les valeurs intermédiaires existent
- Après conversion, chaque fichier doit utiliser **uniquement** `min-width` (sauf `prefers-reduced-motion`)
