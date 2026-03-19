# Plan d'intégration des animations  Koi's Story Maquette

> Basé sur les techniques de motion.zajno.com (sans Lottie).
> Approche : CSS pur + IntersectionObserver. Zéro librairie externe.
> Règle fondamentale : **jamais d'animation sur les éléments de conversion** (prix, CTA, boutons WhatsApp, filtres).

---

## Étape 1  Fondations CSS (`docs/design/tokens.css`)

Ajouter en fin de fichier :

```css
/* ── Animations au scroll ──────────────────────────────────────────── */
--anim-duration: 600ms;
--anim-ease: cubic-bezier(0.22, 1, 0.36, 1);

[data-animate] {
  opacity: 0;
  transition: opacity var(--anim-duration) var(--anim-ease),
              transform var(--anim-duration) var(--anim-ease);
}
[data-animate="fade-up"]    { transform: translateY(28px); }
[data-animate="fade-left"]  { transform: translateX(-36px); }
[data-animate="fade-right"] { transform: translateX(36px); }
[data-animate="fade-scale"] { transform: scale(0.97); }
[data-animate="fade"]       { /* opacity seule */ }

[data-animate].is-visible   { opacity: 1; transform: none; }

[data-delay="1"] { transition-delay: 80ms; }
[data-delay="2"] { transition-delay: 160ms; }
[data-delay="3"] { transition-delay: 240ms; }
[data-delay="4"] { transition-delay: 320ms; }

@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}
```

**Statut :** [ ] À faire

---

## Étape 2  Fichier JS (`VISITORS/assets/js/animations.js`)

Créer ce fichier :

```js
// animations.js  Koi's Story
// Déclenche .is-visible sur [data-animate] au passage dans le viewport.
// Compatible Turbo (Rails Hotwire) via l'event turbo:load.
(function () {
  'use strict';

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      // Ne pas ré-observer les éléments déjà visibles
      if (!el.classList.contains('is-visible')) io.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('turbo:load', init); // Rails Hotwire
})();
```

**Statut :** [ ] À faire

---

## Étape 3  Inclusion dans le layout (`VISITORS/templates/visitor-layout.html`)

Ajouter avant la balise `</body>` :

```html
<script src="../assets/js/animations.js"></script>
```

> `header.js` reste chargé séparément  les deux fichiers sont indépendants.

**Statut :** [ ] À faire

---

## Étape 4  Application par page/composant

### `home.html`  Page d'accueil

| Élément | Attributs | Raison |
|---|---|---|
| `.features__header` | `data-animate="fade-up"` | Titre de section éditorial |
| `.feature-main` | `data-animate="fade-up"` | Bloc Konishi  storytelling |
| `.feature-small` (×2) | `data-animate="fade-up" data-delay="1/2"` | Stagger léger |
| `.koi-showcase__header` | `data-animate="fade-up"` | Titre section |
| `.editorial` | `data-animate="fade-scale"` | Carte koï vedette |
| `.koi-card` (×3) | `data-animate="fade-up" data-delay="0/1/2"` | Stagger grille |
| `.konishi-band__inner > div:first-child` | `data-animate="fade-right"` | Texte Konishi |
| `.konishi-band__img` | `data-animate="fade-left"` | Logo Konishi |
| `.contact-quick__left` | `data-animate="fade-right"` | Bloc info contact |
| `.contact-form` | `data-animate="fade-left"` | Formulaire |

**Ne PAS animer :**
- `.hero__content` (above the fold)
- `.cta-wa-float` (CTA permanent)
- `.site-header`

**Statut :** [ ] À faire

---

### `kois.html`  Catalogue

Règle stricte : **pas de stagger sur les cards**, l'utilisateur est en mode recherche.

| Élément | Attributs | Raison |
|---|---|---|
| `.filter-bar` en-tête | `data-animate="fade-up"` | Titre section uniquement |
| `.koi-card` | `data-animate="fade-up"` | Délai 0  reveal immédiat |

**Ne PAS animer :**
- Les filtres (`.filter-bar` les inputs/boutons)
- Les prix sur les cards
- Les boutons "Voir →"

**Statut :** [ ] À faire

---

### `product.html`  Fiche koï

| Élément | Attributs | Raison |
|---|---|---|
| `.koi-detail__description` | `data-animate="fade-up"` | Texte biographique |
| `.koi-detail__specs` | `data-animate="fade-up" data-delay="1"` | Tableau specs |
| `.koi-detail__certificate` | `data-animate="fade-scale"` | Certificat Konishi |

**Ne PAS animer :**
- Image principale (visible immédiatement)
- Prix
- Bouton WhatsApp
- Bouton "Contacter"

**Statut :** [ ] À faire

---

### `decouvrir.html`  Notre élevage

Page 100% éditoriale → animations libres.

| Élément | Attributs |
|---|---|
| Tous les blocs texte | `data-animate="fade-up"` |
| Photos galerie | `data-animate="fade-scale" data-delay="1/2"` |
| Titres `<h2>` | `data-animate="fade-up"` |

**Statut :** [ ] À faire

---

### `azukari.html`  Service Azukari

Même logique que `decouvrir.html`  contenu éditorial pur.

| Élément | Attributs |
|---|---|
| Blocs texte | `data-animate="fade-up"` |
| Illustration/image | `data-animate="fade-scale"` |
| CTA final | `data-animate="fade-up" data-delay="1"` |

**Statut :** [ ] À faire

---

### `materiel.html`, `soins.html`, `nourriture.html`  Pages produits

| Élément | Attributs |
|---|---|
| `.shop-card` (×n) | `data-animate="fade-up" data-delay="0/1/2"` max 3 niveaux |
| Titres de catégorie | `data-animate="fade-up"` |

**Ne PAS animer :** prix, boutons d'action

**Statut :** [ ] À faire

---

## Étape 5  Micro-interactions hover (CSS uniquement)

Déjà partiellement en place. Vérifier la cohérence sur tous les composants :

```css
/* Déjà présent  vérifier uniformité */
.koi-card:hover         { transform: translateY(-4px); }
.koi-card:hover img     { transform: scale(1.06); }
.editorial:hover img    { transform: scale(1.03); }
.btn:hover              { transform: translateY(-2px); }
```

Ajouter si manquant :
```css
.shop-card:hover        { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.feature-small:hover    { box-shadow: var(--shadow-md); transition: box-shadow var(--t-base); }
```

**Statut :** [ ] À faire

---

## Étape 6  Hero Ken Burns (déjà en place)

`organisms/hero.html` contient déjà l'effet zoom au chargement via `.hero.loaded .hero__bg`.
Vérifier que le script de trigger est bien inclus dans toutes les pages avec un hero :

```html
<script>
  window.addEventListener('load', function () {
    var hero = document.getElementById('hero');
    if (hero) hero.classList.add('loaded');
  });
</script>
```

**Statut :** [ ] Vérifier sur home.html, decouvrir.html, azukari.html

---

## Étape 7  Parallax léger sur le hero (optionnel, desktop only)

CSS pur, désactivé sur mobile et iOS :

```css
@media (min-width: 900px) {
  .hero__bg {
    background-attachment: fixed;
  }
}
```

> ⚠️ `background-attachment: fixed` peut être saccadé sur certains navigateurs mobiles.
> À tester avant validation client.

**Statut :** [ ] Optionnel  tester d'abord

---

## Récapitulatif des fichiers à modifier

| Fichier | Action |
|---|---|
| `docs/design/tokens.css` | Ajouter les classes d'animation |
| `VISITORS/assets/js/animations.js` | Créer |
| `VISITORS/templates/visitor-layout.html` | Inclure `animations.js` |
| `VISITORS/pages/home.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/kois.html` | Ajouter attributs `data-animate` (minimal) |
| `VISITORS/pages/product.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/decouvrir.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/azukari.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/materiel.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/soins.html` | Ajouter attributs `data-animate` |
| `VISITORS/pages/nourriture.html` | Ajouter attributs `data-animate` |
| `VISITORS/organisms/hero.html` | Vérifier script Ken Burns |

---

## Ordre d'exécution recommandé

1. `tokens.css` → fondation CSS (bloque tout le reste)
2. `animations.js` → créer le fichier
3. `visitor-layout.html` → inclure le script
4. `home.html` → page la plus complète, valider le rendu global
5. `decouvrir.html` + `azukari.html` → pages éditoriales, validation rapide
6. `kois.html` + `product.html` → pages e-commerce, validation stricte
7. Pages produits restantes → copier le pattern

---

## Règles à ne jamais enfreindre

- Prix → toujours visible immédiatement, jamais animé
- Bouton WhatsApp → toujours visible immédiatement
- Filtres de catalogue → aucune animation
- `data-delay` max = `3` (240ms) sur les grilles  au-delà, c'est irritant
- Sur mobile : supprimer les `data-delay` > `1` via media query si le stagger devient agaçant
- `prefers-reduced-motion` → respecté dans les tokens, aucune exception
