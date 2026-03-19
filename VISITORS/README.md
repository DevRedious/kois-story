# VISITORS

## Objectif

Ce dossier contient la structure `Atomic Design` dédiée à l'espace public (visiteurs) de **Koi's Story**.

L'objectif est de construire une vitrine digitale élégante, cohérente et facile à maintenir, en séparant clairement les composants visiteurs de ceux du back-office admin.

## Structure

```
VISITORS/
  atoms/         # Éléments UI de base
  molecules/     # Assemblages d'atoms
  organisms/     # Blocs fonctionnels complets
  templates/     # Structures de pages
  pages/         # Pages finales
```

---

## Atoms (`atoms/`)

Éléments UI les plus simples et réutilisables.

| Fichier | Description |
|---------|-------------|
| `button.html` | Boutons (primary, secondary, outline, gold, whatsapp, sizes) |
| `badge.html` | Badges (Konishi, disponible, vendu, variété, taille) |
| `price.html` | Affichage des prix (sizes, variants, avec/sans label) |
| `input.html` | Champs de formulaire (text, email, textarea, select) |
| `koi-thumb.html` | Miniatures de koïs (sizes, ratios, overlays) |

**Règles:**
- Un atom = une responsabilité unique
- Pas de logique métier
- Base de composition pour les niveaux supérieurs

---

## Molecules (`molecules/`)

Assemblages de plusieurs atoms formant des composants fonctionnels.

| Fichier | Description |
|---------|-------------|
| `koi-card.html` | Carte produit complète (image, badges, nom, variété, prix, CTA) |
| `filter-bar.html` | Barre de filtres catalogue (variété, taille, prix, toggle Konishi) |
| `cta-whatsapp.html` | Blocs d'appel à l'action WhatsApp (standard, produit, inline) |
| `nav-header.html` | Navigation header (logo, menu, CTA, version mobile) |
| `contact-form.html` | Formulaire de contact (champs, validation, submit) |

**Règles:**
- Combinaison de 2-3 atoms
- Responsabilité claire et réutilisable
- Pas de dépendance au contexte de page

---

## Organisms (`organisms/`)

Blocs fonctionnels complets composés de molecules et atoms.

| Fichier | Description |
|---------|-------------|
| `header.html` | Header complet fixe avec navigation (standard + transparent) |
| `footer.html` | Footer complet (logo, liens, contact, social, copyright) |
| `hero.html` | Section hero avec background, titre, CTA, stats |
| `catalogue-grid.html` | Grille de produits avec filtres et cartes |
| `koi-detail.html` | Détail d'un koï (galerie, specs, prix, CTA) |
| `farm-gallery.html` | Section élevage (story, breeders, stats, Konishi, galerie) |

**Règles:**
- Blocs métier complets
- Indépendants et réutilisables
- Peuvent contenir plusieurs molecules

---

## Templates (`templates/`)

Structures de pages sans contenu final.

| Fichier | Description |
|---------|-------------|
| `visitor-layout.html` | Layout de base visiteur (header fixe, main, footer) |

**Règles:**
- Structure sémantique (header, main, footer)
- Pas de contenu métier
- Prêt à accueillir des organisms

---

## Pages (`pages/`)

Pages finales assemblant templates, organisms, molecules et atoms.

| Fichier | Description | Route |
|---------|-------------|-------|
| `home.html` | Page d'accueil complète | `/` |
| `catalogue.html` | Page catalogue avec filtres | `/catalogue` |
| `product.html` | Page fiche produit détaillée | `/catalogue/:id` |
| `farm.html` | Page présentation de l'élevage | `/elevage` |
| `contact.html` | Page contact avec formulaire | `/contact` |

**Règles:**
- Pages complètes et fonctionnelles
- Contenu réel et contextuel
- Responsive et accessible

---

## Assets utilisés

### Logos

| Fichier | Utilisation |
|---------|-------------|
| `../../docs/assets/LOGO MANU FINI 2.png` | Logo principal dans header et footer |
| `../../docs/assets/LogosWhatsappIcon.svg` | Icône WhatsApp pour tous les boutons CTA |
| `../../docs/assets/Logos_konishi-black_1.png` | Logo Konishi (optionnel pour badges) |

### Icônes

Les icônes sont intégrées en SVG inline pour une meilleure qualité et performance :
- Localisation (map pin)
- Email (enveloppe)
- Navigation galerie (flèches)

## Charte graphique

### Couleurs

| Nom | Code | Usage |
|-----|------|-------|
| Rouge Koi | `#D62828` | CTA principal, accent |
| Bleu Profond | `#003049` | Texte, header, footer |
| Or Konishi | `#E09F3E` | Badge premium, accents |
| Gris Pierre | `#6C757D` | Texte secondaire |
| Blanc Perle | `#F8F9FA` | Fond |
| Vert WhatsApp | `#25D366` | Bouton WhatsApp |

### Typographie

- **Titres:** Playfair Display (serif élégant)
- **Body:** Inter (sans-serif lisible)

### Principes

- Mobile-first
- Contraste élevé pour l'accessibilité
- Ombres subtiles pour la profondeur
- Transitions fluides (0.2s - 0.3s)

---

## Navigation du site

```
/
├── /catalogue           → Liste des koïs avec filtres
│   └── /catalogue/:id   → Fiche détaillée d'un koï
├── /elevage             → Présentation de la ferme
└── /contact             → Formulaire et coordonnées
```

---

## Conventions de nommage

### Classes CSS
- `.component-name` (ex: `.koi-card`)
- `.component-name--modifier` (ex: `.koi-card--sold`)
- `.component-name__element` (ex: `.koi-card__image`) - optionnel

### Fichiers
- Tout en minuscules
- Mots séparés par des tirets
- Extensions: `.html` pour les composants

---

## Bonnes pratiques

1. **Responsivité**
   - Mobile: < 600px
   - Tablet: 600px - 900px
   - Desktop: > 900px

2. **Accessibilité**
   - Contraste WCAG AA minimum
   - Attributs alt sur les images
   - Navigation clavier fonctionnelle

3. **Performance**
   - Images optimisées
   - CSS critique inline
   - Polices préchargées

4. **SEO**
   - Balises sémantiques (header, main, section, article)
   - Meta descriptions
   - Structure de headings logique

---

## TODO / Améliorations futures

- [ ] Ajouter des animations au scroll (AOS ou Intersection Observer)
- [ ] Intégrer un carrousel/galerie JavaScript pour les images
- [ ] Ajouter un système de toast notifications
- [ ] Implémenter la validation JS des formulaires
- [ ] Ajouter un mode sombre (dark mode)
- [ ] Créer une version imprimable des fiches koï
