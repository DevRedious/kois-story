# Charte graphique  Koi's Story

## 1. Positionnement visuel

Identité visuelle orientée : **Aquatique · Premium · Nature / Japon · Commerce clair**

Objectif : valoriser la rareté des koï Konishi tout en restant accessible aux amateurs débutants et passionnés.

---

## 2. Palette de couleurs

### Couleurs principales

| Nom | Hex | Signification |
|---|---|---|
| Rouge Koi | `#D62828` | Poisson, tradition japonaise, énergie |
| Bleu profond | `#003049` | Eau, profondeur, sérieux |
| Blanc perle | `#F8F9FA` | Pureté, contraste, lisibilité |

### Couleurs secondaires

| Nom | Hex | Utilisation |
|---|---|---|
| Or Konishi | `#E09F3E` | Badge Konishi, éléments premium, détails |
| Gris pierre | `#6C757D` | Texte secondaire, UI neutre |

---

## 3. Typographie

Maximum 2 polices principales.

| Usage | Police | Style |
|---|---|---|
| Titres (H1, H2, sections) | **Playfair Display** | Élégant, premium, univers japonais / luxe |
| Corps (paragraphes, cards, navigation) | **Inter** | Moderne, très lisible, parfait mobile |

---

## 4. Logo

**Règles d'utilisation :**
- Toujours respecter l'espace de protection autour du logo
- Fond clair ou bleu profond uniquement
- Ne jamais étirer ou modifier les proportions

**Variantes autorisées :**
1. Logo couleur
2. Logo blanc
3. Logo noir

---

## 5. Iconographie

**Style d'images :**
- Photos HD, vue dorsale des koï
- Couleurs saturées, eau sombre pour contraste

**Règles :**
- Pas de photos floues
- Minimum 1 photo produit par fiche, idéalement 3 angles

**Règles de mise en forme (Anti-distorsion) :**
- **Object-fit** : Utiliser systématiquement `object-fit: cover` sur les conteneurs d'images pour éviter que les photos ne soient écrasées ou étirées.
- **Ratios imposés** :
  - **Hero** : Format panoramique, hauteur fixe (ex: 600px sur desktop, 40vh sur mobile).
  - **Cards** : Ratio 3:4 (Portrait) pour uniformiser la grille du catalogue.
  - **Modules transverses** : Ratio 4:3 ou 1:1.

---

## 6. Composants UI

### Card produit

Contenu affiché (dans l'ordre) :
1. Photo
2. Nom
3. Variété
4. Taille
5. **Prix** (visible immédiatement)
6. Badge Konishi (si applicable)
7. Bouton WhatsApp

### Boutons

| Type | Fond | Texte |
|---|---|---|
| Bouton principal | `#D62828` | Blanc |
| Bouton secondaire | `#003049` | Blanc |

### Badge Konishi

| Fond | Texte |
|---|---|
| `#E09F3E` | `#003049` |

### Card produit
**Image** : Ratio 3:4 obligatoire, `object-fit: cover`.
**Style** : Bordures arrondies `radius-md` (12px).

### Hero visuel
**Image** : Doit couvrir toute la largeur (`w-full`), `object-fit: cover`.
**Cadrage** : Point focal centré pour garantir la visibilité du poisson sur tous les écrans.

---

## 7. Style global

- Contraste fort
- Couleurs vives
- Interface **mobile-first**

Direction artistique : **"Dynamique & commerçante"**  validée par le client.

---

## 8. Mise en page

**Principes :**
- Beaucoup d'espace blanc
- Cards larges
- Navigation simple
- CTA visible

**Structure typique d'une page :**

```
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

### Palette

```
Rouge koi    #D62828
Bleu profond #003049
Or Konishi   #E09F3E
Blanc perle  #F8F9FA
Gris pierre  #6C757D
```

### Typographie

```
Titres : Playfair Display
Texte  : Inter
```

### Style

```
Aquatique · Premium · Contrastes forts · Mobile-first
```
