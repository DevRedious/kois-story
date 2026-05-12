# Charte graphique - Koi's Story

## 1. Positionnement visuel

Identité visuelle orientée : **Aquatique · Premium · Nature / Japon · Commerce clair**

Objectif : valoriser la rareté des koï Konishi tout en restant accessible aux amateurs débutants et passionnés.

La source visuelle actuelle est l'application Rails, le logo V2 dans `public/` et la palette V4 dans `public/docs/assets/palette_V4.svg`.

---

## 2. Palette de couleurs V4

### Couleurs principales

| Nom | Hex | Signification |
|---|---|---|
| Bronze | `#a58241` | Matière, artisanat, premium discret |
| Or Konishi | `#eab21b` | Badge Konishi, accent haut de gamme, détails |
| Bleu nuit profond | `#011325` | Fonds sombres, profondeur, contraste |
| Noir | `#000000` | Texte fort, surfaces sombres, contraste |
| Blanc | `#ffffff` | Surfaces claires, respiration, lisibilité |

### Exception autorisée

| Nom | Hex | Utilisation |
|---|---|---|
| WhatsApp | `#25d366` | Boutons, icônes, badges et CTA WhatsApp |

La palette V3 rouge sombre / rouge vif (`#e60000`, `#630f0f`) est historique. Elle peut apparaître dans les prototypes archivés ou d'anciens audits, mais ne doit pas guider les nouveaux choix visuels.

---

## 3. Typographie

Maximum 2 polices principales.

| Usage | Police | Style |
|---|---|---|
| Titres (H1, H2, sections) | **Playfair Display** | Élégant, premium, univers japonais / luxe |
| Corps (paragraphes, cards, navigation) | **Inter** | Moderne, très lisible, parfait mobile |

---

## 4. Logo

Logo actuel : **V2**.

Fichiers de référence :
- `public/logo_bg_circle_dark_v2.svg`
- `public/logo_bg_circle_dark_v2.png`
- `public/logo_bg_circle_dark_v2.avif`

**Règles d'utilisation :**
- Toujours respecter l'espace de protection autour du logo
- Privilégier le fond bleu nuit profond ou noir quand le logo circulaire sombre est utilisé
- Utiliser le blanc pour les compositions à fort contraste
- Ne jamais étirer ou modifier les proportions

---

## 5. Iconographie

**Style d'images :**
- Photos HD, vue dorsale des koï
- Couleurs nettes, eau sombre pour contraste
- Traitement premium, sans effet décoratif excessif

**Règles :**
- Pas de photos floues
- Minimum 1 photo produit par fiche, idéalement 3 angles

**Règles de mise en forme anti-distorsion :**
- **Object-fit** : utiliser systématiquement `object-fit: cover` sur les conteneurs d'images pour éviter que les photos ne soient écrasées ou étirées.
- **Ratios imposés** :
  - **Hero** : format panoramique, hauteur fixe (ex: 600px sur desktop, 40vh sur mobile).
  - **Cards** : ratio 3:4 (portrait) pour uniformiser la grille du catalogue.
  - **Modules transverses** : ratio 4:3 ou 1:1.

---

## 6. Composants UI

### Card produit

Contenu affiché (dans l'ordre) :
1. Photo
2. Nom
3. Variété
4. Taille
5. **Prix** visible immédiatement
6. Badge Konishi si applicable
7. Bouton WhatsApp

**Image** : ratio 3:4 obligatoire, `object-fit: cover`.
**Style** : bordures arrondies `radius-md` (12px).

### Boutons

| Type | Fond | Texte |
|---|---|---|
| Bouton principal | `#a58241` | `#ffffff` |
| Bouton secondaire | `#011325` | `#ffffff` |
| Bouton accent | `#eab21b` | `#000000` |
| Bouton WhatsApp | `#25d366` | `#ffffff` |

### Badge Konishi

| Fond | Texte |
|---|---|
| `#eab21b` | `#000000` |

### Hero visuel

**Image** : doit couvrir toute la largeur (`w-full`), `object-fit: cover`.
**Cadrage** : point focal centré pour garantir la visibilité du poisson sur tous les écrans.

---

## 7. Style global

- Contraste fort
- Couleurs premium et lisibles
- Interface **mobile-first**
- App Rails actuelle prioritaire sur les prototypes archivés

Direction artistique : **"Dynamique & commerçante"** validée par le client.

---

## 8. Mise en page

**Principes :**
- Beaucoup d'espace blanc
- Cards larges
- Navigation simple
- CTA visible

**Structure typique d'une page :**

```text
Hero visuel
  ↓
Argumentaire court
  ↓
Catalogue
  ↓
Galerie
  ↓
Contact
```

---

## 9. Ton visuel

Le design doit évoquer : **la rareté, la qualité japonaise, la passion d'éleveur.**

> Pas un site de poissonnerie. Un élevage spécialisé haut de gamme.

---

## 10. Résumé rapide

### Palette V4

```text
Bronze             #a58241
Or Konishi         #eab21b
Bleu nuit profond  #011325
Noir               #000000
Blanc              #ffffff
WhatsApp           #25d366
```

### Typographie

```text
Titres : Playfair Display
Texte  : Inter
```

### Style

```text
Aquatique · Premium · Contrastes forts · Mobile-first
```
