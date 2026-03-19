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

### VISITORS — 12 fichiers CSS à convertir

> À faire pendant `app/assets/stylesheets/visitors/` en Phase 4 Rails.

| Fichier | Difficulté | Breakpoints concernés |
|---|---|---|
| `azukari.css` | Facile | 768px, 480px |
| `konishi.css` | Facile | 768px, 480px |
| `shop.css` | Facile | 768px, 900px, 480px |
| `catalogue.css` | Facile | 900px, 480px |
| `hero.css` | Moyenne | 768px, 480px (+ `prefers-reduced-motion` à garder) |
| `features.css` | Moyenne | 768px, 480px, 900px |
| `farm.css` | Moyenne | 768px, 480px |
| `forms.css` | Moyenne | 900px, 580px (+ `min-width: 769px` déjà correct) |
| `product.css` | Moyenne | 900px, 480px |
| `product-pages.css` | Difficile | 900px, 600px, 480px |
| `koi-card-pages.css` | Difficile | 900px, 480px |
| `header.css` | Difficile | 480px, 900px (navigation entière) |

### ADMIN — 1 fichier CSS à corriger

> Vérifié le 19/03/2026 — les pages HTML ADMIN ne contiennent plus de `<style>` inline avec `@media` (déjà corrigé). Le `FRONTEND_REFACTOR_PLAN.md` §9 décrivait un état antérieur.
> Les fichiers `components.css`, `layout.css`, `tables.css`, `messages-ui.css` utilisent déjà `min-width` ✓.

| Fichier | Action |
|---|---|
| `ADMIN/assets/css/templates/admin-layout.css` | Convertir `@media (max-width: 768px)` → `@media (min-width: 769px)` en inversant la logique des styles |

### Fichiers à ne PAS modifier

| Fichier | Raison |
|---|---|
| `footer.css` | Déjà en `min-width: 769px` ✓ |
| `forms.css` ligne 302 | Le `min-width: 769px` existant est correct — à garder |
| `koi-card.css` | Aucune media query |
| `base.css` | Aucune media query |
| `atoms-media.css` | Aucune media query |
| `variables.css` | Aucune media query |
| `fonts.css` | Aucune media query |
| `demo.css` | Preview only, hors scope |

---

## Ordre d'exécution recommandé

> À suivre pendant la Phase 4 Rails — un fichier à la fois, testé avant de passer au suivant.

```
Étape 1 — Facile
  [ ] azukari.css
  [ ] konishi.css
  [ ] shop.css
  [ ] catalogue.css

Étape 2 — Moyenne
  [ ] hero.css          ← attention prefers-reduced-motion à garder
  [ ] features.css
  [ ] farm.css
  [ ] forms.css         ← garder le min-width: 769px existant
  [ ] product.css

Étape 3 — Difficile
  [ ] product-pages.css
  [ ] koi-card-pages.css
  [ ] header.css        ← en dernier (navigation mobile entière)

Étape 4 — ADMIN
  [ ] templates/admin-layout.css  → convertir max-width: 768px → min-width: 769px
```

---

## Protocole de test après chaque fichier

Ouvrir dans le navigateur (ou DevTools en Rails) et vérifier à 4 tailles :

1. **Mobile (375px)** — iPhone SE
2. **Mobile large (600px)** — intermédiaire
3. **Tablette (820px)** — iPad Air
4. **Desktop (1280px)** — standard

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
