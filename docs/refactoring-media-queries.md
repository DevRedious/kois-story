# Plan d'action — Conversion Media Queries vers Mobile-First

> **Priorité : 🟡 Amélioration — non bloquant**
> Source : `docs/audit/FRONTEND_REFACTOR_PLAN.md` §9 + `docs/audit/THP_COMPLIANCE_CHECKLIST.md`
>
> **Quand le faire :** pendant l'intégration CSS dans Rails (Phase 4 de `RAILS_MIGRATION_PLAN.md`), pas avant.
> **Ne pas faire maintenant** — le backend est la priorité absolue (deadline J+4).

---

## Contexte

La règle du projet impose `@media (min-width: ...)` uniquement (mobile-first).
Les VISITORS CSS utilisent `@media (max-width: ...)` (desktop-first).

La checklist coche déjà ✅ "Responsive mobile-first validé" — le **rendu visuel est correct**.
La conversion est une dette technique de code, pas un bug visuel.

---

## Dépendance critique — Fusion des tokens

**Avant toute conversion**, les tokens CSS doivent être renommés (cf. `FRONTEND_REFACTOR_PLAN.md` §1) :

```
VISITORS actuel → Nouveau token unifié
--c-red   → --color-red
--c-wine  → --color-wine
--c-black → --color-black
--c-cream → --color-cream
--c-white → --color-white
--c-wa    → --color-whatsapp
```

La conversion media queries et la fusion tokens doivent être faites dans le **même passage** sur chaque fichier CSS, pour ne toucher chaque fichier qu'une seule fois.

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
| `max-width: 480px` | base (pas de MQ) | mobile = styles de base |
| `max-width: 580px` | `min-width: 481px` | mobile standard |
| `max-width: 600px` | `min-width: 481px` | mobile standard |
| `max-width: 768px` | `min-width: 481px` | tablette portrait |
| `max-width: 900px` | `min-width: 769px` | tablette / desktop |
| base actuelle (desktop) | `min-width: 901px` | grand desktop |

> `prefers-reduced-motion` n'est pas une media query de taille — **à laisser inchangée**.

---

## Périmètre exact

> ⚠️ **Mise à jour post-migration Rails (22/03/2026)**
> Les fichiers CSS ont été découpés en sections (`-section-1.css`, `-section-2.css`…) lors de l'intégration Rails.
> Les media queries se trouvent dans les **dernières sections** de chaque fichier.
> Tous les chemins ci-dessous sont relatifs à `app/assets/stylesheets/`.

### VISITORS — fichiers à convertir

| Fichier à modifier | Difficulté | Breakpoints concernés |
|---|---|---|
| `visitors/azukari.css` | Facile | 768px, 480px |
| `visitors/konishi.css` | Facile | 768px, 480px |
| `visitors/shop-section-2.css` | Facile | 768px, 900px, 480px |
| `visitors/catalogue-section-2.css` | Facile | 900px, 480px |
| `visitors/hero-section-2.css` | Moyenne | 768px, 480px (+ `prefers-reduced-motion` dans `hero-section-1.css` à laisser) |
| `visitors/features-section-2.css` | Moyenne | 768px, 480px, 900px |
| `visitors/farm-section-3.css` | Moyenne | 768px, 480px |
| `visitors/forms-section-2.css` | Moyenne | 900px, 580px (+ `min-width: 769px` déjà correct — à garder) |
| `visitors/product-section-2.css` | Moyenne | 900px, 480px |
| `visitors/product-pages-section-3.css` | Difficile | 900px, 600px, 480px |
| `visitors/koi-card-pages-section-3.css` | Difficile | 900px, 480px |
| `visitors/header-section-1.css` | Difficile | 480px, 900px |
| `visitors/header-section-3.css` | Difficile | 900px |

### ADMIN — hors périmètre

> L'ADMIN est géré par un autre membre de l'équipe. Ne pas toucher aux fichiers `admin/`.

### Fichiers à ne PAS modifier

| Fichier | Raison |
|---|---|
| `visitors/footer.css` | Déjà en `min-width: 769px` ✓ |
| `visitors/footer-full-section-1.css` | Déjà en `min-width: 481px` et `min-width: 901px` ✓ |
| `visitors/footer-full-section-2.css` | Déjà en `min-width: 481px` et `min-width: 769px` ✓ |
| `visitors/legal.css` | Déjà en `min-width: 769px` ✓ |
| `visitors/forms-section-2.css` ligne ~149 | Le `min-width: 769px` existant est correct — à garder |
| `visitors/koi-card.css` | Aucune media query |
| `visitors/base.css` | Aucune media query |
| `visitors/atoms-media.css` | Aucune media query |
| `visitors/variables-section-2.css` | Uniquement `prefers-reduced-motion` — à laisser |
| `visitors/header-section-2.css` | Uniquement `prefers-reduced-motion` — à laisser |
| `visitors/fonts.css` | Aucune media query |

---

## Ordre d'exécution recommandé

> À suivre dans `app/assets/stylesheets/` — un fichier à la fois, testé avant de passer au suivant.

```
Étape 1 — Facile ✅
  [x] visitors/azukari.css
  [x] visitors/konishi.css
  [x] visitors/shop-section-2.css
  [x] visitors/catalogue-section-2.css

Étape 2 — Moyenne ✅
  [x] visitors/hero-section-2.css        ← prefers-reduced-motion dans hero-section-1.css : ne pas toucher
  [x] visitors/features-section-2.css
  [x] visitors/farm-section-3.css
  [x] visitors/forms-section-2.css       ← min-width: 769px pour form-row conservé
  [x] visitors/product-section-2.css

Étape 3 — Difficile ✅
  [x] visitors/product-pages-section-3.css
  [x] visitors/koi-card-pages-section-3.css
  [x] visitors/header-section-1.css      ← header mobile (nav entière)
  [x] visitors/header-section-3.css      ← header desktop (dropdown)

-- ADMIN : hors périmètre --
```

---

## Protocole de test après chaque fichier

Ouvrir dans le navigateur (ou DevTools en Rails) et vérifier à 4 tailles :

1. **Mobile (375px)** — iPhone SE
2. **Mobile large (600px)** — intermédiaire
3. **Tablette (820px)** — iPad Air
4. **Desktop (1280px)** — standard

| Fichier | Routes Rails à tester |
|---|---|
| `visitors/azukari.css` | `/azukari` |
| `visitors/konishi.css` | `/`, `/nourriture` |
| `visitors/shop-section-2.css` | `/nourriture`, `/materiel`, `/soins` |
| `visitors/catalogue-section-2.css` | `/kois` |
| `visitors/hero-section-2.css` | toutes les pages |
| `visitors/features-section-2.css` | `/` |
| `visitors/farm-section-3.css` | `/decouvrir` |
| `visitors/forms-section-2.css` | footer (toutes les pages) |
| `visitors/product-section-2.css` | `/kois/:id` |
| `visitors/product-pages-section-3.css` | `/kois/:id` |
| `visitors/koi-card-pages-section-3.css` | `/kois`, `/kois/:id` |
| `visitors/header-section-1.css` + `header-section-3.css` | toutes les pages |

---

## Points d'attention globaux

- `prefers-reduced-motion` ne se convertit jamais — ce n'est pas une media query de taille
- Les `calc(Xpx + var(--sp-N))` dans les vagues clip-path compensent la hauteur du header — vérifier l'alignement à chaque taille d'écran
- Faire la conversion tokens (`--c-red` → `--color-red`) dans le même passage
- Ce refactoring est couvert par `FRONTEND_REFACTOR_PLAN.md` §3 pour le découpage 200 lignes — coordonner les deux

---

## Références

- `docs/audit/FRONTEND_REFACTOR_PLAN.md` §9 — Media queries ADMIN
- `docs/audit/FRONTEND_REFACTOR_PLAN.md` §1 — Fusion tokens CSS
- `docs/audit/FRONTEND_REFACTOR_PLAN.md` §3 — Découpage CSS 200 lignes VISITORS
- `docs/audit/RAILS_MIGRATION_PLAN.md` Phase 4 — Layout & Assets
- `docs/audit/THP_COMPLIANCE_CHECKLIST.md` — Priorité 🟡
