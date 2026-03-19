# Wave Clip-Path  Technique de transition en vague

## Principe

Découper le bas d'une section en vague ondulée via `clip-path` CSS pointant sur un `<clipPath>` SVG inline.
Pas de div séparatrice : tout se fait sur la section elle-même. La section du dessous remonte pour combler les creux.

---

## SVG inline à insérer (une seule fois par page)

Placer ce bloc juste après `<body>`, avant tout contenu visible :

```html
<svg width="0" height="0" style="position:absolute;overflow:hidden;" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
      <!-- 4 demi-vagues de droite à gauche, centrées à y=0.92, amplitude ±0.04-0.05 -->
      <path d="M 0,0 L 1,0 L 1,0.92
               C 0.90,0.97 0.85,0.97 0.75,0.92
               C 0.65,0.88 0.60,0.88 0.50,0.92
               C 0.40,0.97 0.35,0.97 0.25,0.92
               C 0.15,0.88 0.10,0.88 0,0.92
               Z"/>
    </clipPath>
  </defs>
</svg>
```

### Lecture du path

| Segment | x de→à | Crête/Creux | y extrême |
|---|---|---|---|
| `C 0.90,0.97 0.85,0.97 0.75,0.92` | 1 → 0.75 | Creux (section visible plus bas) | 0.97 |
| `C 0.65,0.88 0.60,0.88 0.50,0.92` | 0.75 → 0.5 | Crête (section coupée plus haut) | 0.88 |
| `C 0.40,0.97 0.35,0.97 0.25,0.92` | 0.5 → 0.25 | Creux | 0.97 |
| `C 0.15,0.88 0.10,0.88 0,0.92` | 0.25 → 0 | Crête | 0.88 |

- **Coordonnées** : `objectBoundingBox` → 0 à 1 (0 = haut/gauche, 1 = bas/droite)
- **Vague** : dans les 8–12 % bas de l'élément (entre `y=0.88` et `y=0.97`)
- **Amplitude** : ±4–5 % de la hauteur de l'élément (~36–45 px sur 900 px)
- **Résultat** : 2 vagues complètes sur toute la largeur

---

## Appliquer à une section

### CSS (classe dédiée)

```css
.ma-section--wavy-bottom {
  clip-path: url(#wave-clip);
}
```

### HTML

```html
<section class="ma-section ma-section--wavy-bottom">
  ...
</section>
```

> La section doit avoir une **hauteur fixe ou min-height** pour que la vague soit proportionnelle.
> `overflow: hidden` existant sur la section est compatible  clip-path prend le dessus.

---

## Combler les creux : section du dessous

Sans overlap, les creux de la vague laissent apparaître le fond de page entre les deux sections.
La section du dessous doit remonter pour combler visuellement ces creux.

### Règle générale

```css
.ma-section--wavy-bottom + .section-suivante {
  margin-top: -[profondeur_max];
  padding-top: calc([profondeur_max] + [padding_original]);
}
```

### Valeurs selon le type de section

| Section clippée | Hauteur typique | Profondeur max (12%) | Valeur recommandée |
|---|---|---|---|
| Hero `100vh` | 900 px | ~108 px | `margin-top: -12vh` |
| Bande contenu (konishi-band) | ~400 px | ~48 px | `margin-top: -60px` |
| Hero compact (pages intérieures) | ~250 px | ~30 px | `margin-top: -40px` |

### Exemple Hero → Hero-intro

```css
.hero--wavy-bottom + .hero-intro {
  margin-top: -12vh;
  padding-top: calc(12vh + var(--sp-16)); /* sp-16 = padding original */
}
```

### Exemple Konishi-band → Contact

```css
.konishi-band--wavy-bottom + .contact-quick {
  margin-top: -60px;
  padding-top: calc(60px + var(--sp-20)); /* sp-20 = padding original */
}
```

---

## Implémentation actuelle (home.html)

| Classe | Section | Section suivante |
|---|---|---|
| `hero--wavy-bottom` | `.hero` (vidéo plein écran) | `.hero-intro` |
| `konishi-band--wavy-bottom` | `.konishi-band` (fond noir) | `.contact-quick` |

---

## Créer une variante (vague différente)

Pour une vague plus plate ou plus ample, dupliquer le `<clipPath>` avec un `id` différent :

```html
<clipPath id="wave-clip-flat" clipPathUnits="objectBoundingBox">
  <!-- Vague très plate : amplitude ±0.02, centrée à y=0.95 -->
  <path d="M 0,0 L 1,0 L 1,0.95
           C 0.875,0.97 0.75,0.93 0.625,0.95
           C 0.5,0.97 0.375,0.93 0.25,0.95
           C 0.125,0.97 0,0.93 0,0.95
           Z"/>
</clipPath>
```

| Paramètre | Effet | Plage conseillée |
|---|---|---|
| y de référence (`0.92`) | Position verticale de la vague | `0.88` – `0.96` |
| Amplitude crête (`0.88`) | Monte haut = coupe plus | `0.85` – `0.92` |
| Amplitude creux (`0.97`) | Descend bas = coupe moins | `0.93` – `0.99` |
| Nombre de segments C | Nombre de demi-vagues | 2 (1 vague) à 8 (4 vagues) |

---

## Limites et points d'attention

- **Un seul SVG par page** : l'`id="wave-clip"` doit être unique dans le document.
- **Rails / Turbo** : en Hotwire, le SVG inline doit être dans le layout (`application.html.erb`), pas dans une partial rechargée dynamiquement, pour que l'`id` persiste entre les navigations Turbo.
- **Safari** : `clip-path: url(#id)` est bien supporté sur Safari ≥ 14. Pas besoin de `-webkit-clip-path` pour les navigateurs cibles (2024+).
- **Pseudo-éléments** : les `::before` / `::after` sur la section clippée sont aussi découpés par le clip-path. C'est intentionnel (ex. grille décorative konishi-band).
- **Stacking context** : `clip-path` crée un nouveau contexte d'empilement. Si la section a des éléments en `z-index` élevé (tooltips, dropdowns), vérifier qu'ils ne sont pas tronqués par la vague.
