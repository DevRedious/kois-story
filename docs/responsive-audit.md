# Responsive Audit — VISITORS/

**Date :** 2026-03-19
**Périmètre :** `VISITORS/assets/css/`
**Breakpoints cibles :** 900px (tablet), 768px (mobile large), 480px (mobile petit)

---

## Problèmes identifiés et corrections appliquées

### Phase 1 — Critiques

| Fichier | Problème | Correction |
|---|---|---|
| `forms.css` | `.form-row` base `1fr 1fr` (pas mobile-first) | Base → `1fr`, la media query `min-width: 769px` passe à `1fr 1fr` |
| `farm.css` | `.gallery-row-2` : seul breakpoint 768px → 2col, aucun à 480px | Ajout `@media (max-width: 480px)` → `1fr` |
| `farm.css` | `.gallery-row2` (alias convention) : idem | Même correction à 480px |
| `farm.css` | Padding `.decouvrir-story`, `.story`, `.farm-gallery` non réduit sur mobile | Ajout breakpoints 768px et 480px |
| `product-pages.css` | `.gallery-thumb` 80×80px fixe sur mobile → débordement horizontal | Réduit à 56×56px @ 480px |

### Phase 2 — Modérés

| Fichier | Problème | Correction |
|---|---|---|
| `footer.css` | `.footer__wordmark` clamp minimum `5rem` → trop grand sur très petit écran | `clamp(2.5rem, 14vw, 12rem)` |
| `footer.css` | `.cta-wa-float` `bottom` fixe → recouvert par la barre iOS | `bottom: calc(var(--sp-6) + env(safe-area-inset-bottom, 0px))` |
| `features.css` | `.feature-card--main` min-height 360px trop élevé @ 480px | Ajout `@media (max-width: 480px)` → `min-height: 280px`, padding réduit |
| `features.css` | `.feature-main` (alias) min-height 440px → même problème | Même correction à 480px |
| `features.css` | `.features` padding horizontal non réduit à 480px | `padding: var(--sp-12) var(--sp-4)` @ 480px |
| `catalogue.css` | Padding `.catalogue-section` / `.catalogue` non réduit à 480px | `padding: var(--sp-6) var(--sp-4) var(--sp-16)` @ 480px |
| `shop.css` | `.shop-section__inner` padding non réduit à 480px | `padding: var(--sp-8) var(--sp-4) var(--sp-12)` @ 480px |
| `header.css` | Logo 72px fixe, trop grand sur petit écran | `height: 52px` @ 480px, position ajustée |

### Phase 3 — Mineurs

> Ces problèmes ont été traités en même temps que les phases 1 et 2.

| Fichier | Problème | Correction |
|---|---|---|
| `product-pages.css` | `.related-grid` `repeat(3, 1fr)` → colonne unique non définie @ 480px | Ajout `grid-template-columns: 1fr` @ 480px |

---

---

## Vagues clip-path — logique de compensation

### Principe

Le SVG `wave-clip` (défini en `objectBoundingBox`) découpe le bas de chaque section selon :
- Creux le plus profond : **y = 0.88** → 12% de la hauteur de l'élément depuis le bas
- Crête la plus haute : **y = 0.97** → 3% depuis le bas

La section suivante doit remonter d'au moins **12% de la hauteur de l'élément coupé** pour couvrir le creux le plus profond. On ajoute une marge de sécurité.

### Sections concernées et valeurs appliquées

#### `hero--wavy-bottom` (home.html)
- Élément : `<section class="hero">` — hauteur `min-height: 100vh`
- Profondeur de vague : 12% de 100vh = **12vh**
- Section suivante : `.hero-intro` (transparent, pas de background propre)
- Règle : `margin-top` basé sur `vh` — s'adapte automatiquement à toutes les tailles

| Breakpoint | margin-top | padding-top |
|---|---|---|
| Desktop | `-12vh` | `calc(12vh + var(--sp-16))` |
| ≤ 768px | `-8vh` | `calc(8vh + var(--sp-16))` |
| ≤ 480px | `-6vh` | `calc(6vh + var(--sp-16))` |

---

#### `konishi-band--wavy-bottom` (home.html)
- Élément : `.konishi-band` — hauteur variable selon contenu (~490px desktop, ~720px mobile 1-col)
- Profondeur de vague : 12% → ~59px desktop, ~86px à 768px
- Section suivante : `.contact-quick` (background `rgba(245,245,242,0.9)` semi-transparent)
- ⚠️ Le fond semi-transparent laisse légèrement filtrer le noir dans la zone d'overlap
- Fix konishi-band : padding réduit sur mobile pour limiter la hauteur de la bande

| Breakpoint | margin-top | padding-top contact-quick |
|---|---|---|
| Desktop | `-60px` | `calc(60px + var(--sp-20))` |
| ≤ 768px | `-96px` | `calc(96px + var(--sp-20))` |
| ≤ 480px | `-88px` | `calc(88px + var(--sp-20))` |

Réduction de `.konishi-band__inner` sur mobile :

| Breakpoint | padding | gap |
|---|---|---|
| ≤ 768px | `var(--sp-10) var(--sp-6)` | `var(--sp-8)` |
| ≤ 480px | `var(--sp-8) var(--sp-4)` | `var(--sp-6)` |

---

#### `hero-compact--wavy-bottom` (azukari, soins, materiel)
- Élément : `.hero-compact` — hauteur ~390px desktop, ~465px à 480px (texte qui s'étale)
- Profondeur de vague : 12% → ~47px desktop, ~56px à 480px
- Section suivante : `<main>` (transparent) contenant une section avec background

| Breakpoint | main margin-top |
|---|---|
| Desktop | `-50px` |
| ≤ 768px | `-52px` |
| ≤ 480px | `-60px` |

**azukari.html** — `.azukari-desc` (premier enfant de main, background semi-transparent) :
Le padding-top compense le margin négatif pour repositionner le contenu correctement.

| Breakpoint | azukari-desc padding-top |
|---|---|
| Desktop | `calc(50px + var(--sp-20))` |
| ≤ 768px | `calc(52px + var(--sp-16))` |
| ≤ 480px | `calc(60px + var(--sp-12))` |

**soins.html / materiel.html** — `.shop-section` (premier enfant de main, background semi-transparent) :
Le padding-top interne de `.shop-section__inner` absorbe le décalage.

| Breakpoint | shop-section__inner padding-top |
|---|---|
| Desktop | `var(--sp-16)` = 64px (≥ 50px ✓) |
| ≤ 900px | `var(--sp-16)` = 64px (≥ 52px ✓) |
| ≤ 480px | `var(--sp-8)` = 32px (le contenu remonte légèrement, acceptable) |

---

### Règle pour toute future section avec vague

```
margin-top négatif = -(12% de la hauteur de l'élément coupé) arrondi au-dessus
padding-top de la section suivante = calc(|margin-top| + padding_normal)
```

Si la section suivante a un **fond semi-transparent** : le fond laisse légèrement filtrer ce qui est derrière. Préférer un fond opaque (`var(--c-cream)`) sur la zone d'overlap, ou s'assurer que l'élément coupé est lui-même clipé (clip-path → pas de rendu sous la vague → seul le fond `body` fixed transparaît).

---

## Corrections antérieures (session initiale)

| Fichier | Correction |
|---|---|
| `hero.css` | `.hero--wavy-bottom + .hero-intro` : margin-top vh-based (-12vh → -8vh → -6vh) |
| `azukari.css` | Padding responsive 768px et 480px |

---

## Points restants à surveiller (non corrigés)

- **Organisms header / nav-header** : fichiers > 200 lignes à splitter avant intégration Rails
- **Touch targets** : certains liens de nav et boutons `shop-card__btn` peuvent être inférieurs à 44px de hauteur sur mobile — à corriger si remontée client
