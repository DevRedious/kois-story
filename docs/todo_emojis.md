# Inventaire emojis  VISITORS/

> Tâche : remplacer tous les emojis par des SVG inline ou depuis `docs/assets/`.
> Règle : aucun emoji dans le HTML final  SVG uniquement.

---

## Emojis à remplacer (priorité haute)

### Icônes d'information

| Emoji | Signification | Fichiers |
|---|---|---|
| 📍 | Adresse | `pages/contact.html:344`, `pages/home.html:681` |
| 💬 | WhatsApp / contact | `pages/contact.html:358`, `pages/home.html:683` |
| 🚚 | Livraison | `pages/contact.html:365`, `pages/home.html:643`, `organisms/features.html:120` |
| 📋 | Rendez-vous / conditions | `pages/home.html:648`, `organisms/features.html:130` |
| 📷 | Placeholder photo | `organisms/farm-gallery.html:113`, `organisms/farm-gallery.html:119` |
| 📜 | Certificat Konishi | `organisms/koi-detail.html:186` |

### Icônes shop-card  Matériel

| Emoji | Produit | Fichiers |
|---|---|---|
| ⚙️ | Filtre biologique | `pages/materiel.html:305`, `molecules/shop-card.html:88`, `organisms/shop-section.html:114` |
| 🔄 | Filtre japonais | `pages/materiel.html:306` |
| 🧹 | Brosserie de filtration | `pages/materiel.html:307` |
| 💧 | Pompe de bassin | `pages/materiel.html:313`, `molecules/shop-card.html:102`, `organisms/shop-section.html:126` |
| ☀️ | Stérilisateur UV | `pages/materiel.html:314`, `organisms/shop-section.html:138` |
| 🌡️ | Chauffage bassin | `pages/materiel.html:315`, `pages/azukari.html:322` |

### Icônes shop-card  Nourriture

| Emoji | Produit | Fichiers |
|---|---|---|
| 🐟 | Nourriture poisson | `pages/nourriture.html:322` |
| 🎨 | Aliment colorant | `pages/nourriture.html:323` |
| ⭐ | Premium | `pages/nourriture.html:324` |
| 💊 | Complément vitaminé | `pages/nourriture.html:330` |
| 🍂 | Aliment hiver | `pages/nourriture.html:331` |
| 🎯 | Distributeur automatique | `pages/nourriture.html:332` |

### Icônes shop-card  Soins

| Emoji | Produit | Fichiers |
|---|---|---|
| 🔬 | Microscope | `pages/soins.html:304`, `pages/azukari.html:308` |
| 🧪 | Kit analyse eau | `pages/soins.html:305` |
| 📊 | Oxymètre numérique | `pages/soins.html:306` |
| 💊 | Anti-parasites | `pages/soins.html:312` |
| 🌿 | Bactéries nitrifiantes | `pages/soins.html:313` |
| 🩹 | Traitement plaies | `pages/soins.html:314` |

### Icônes Azukari

| Emoji | Usage | Fichier |
|---|---|---|
| 🔬 | Suivi sanitaire | `pages/azukari.html:308` |
| 🍱 | Alimentation | `pages/azukari.html:315` |
| 🌡️ | Température | `pages/azukari.html:322` |
| 📹 | Caméra surveillance | `pages/azukari.html:329` |

---

## Symboles Unicode (priorité basse)

Ces caractères sont typographiques, pas des emojis à proprement parler.
Remplacement optionnel lors de la migration CSS.

| Symbole | Usage | Fichiers |
|---|---|---|
| `★` | Badge Konishi, hero, features | `atoms/badge.html`, `molecules/koi-card.html`, `molecules/koi-card--editorial.html`, `molecules/filter-bar.html`, `organisms/hero.html`, `organisms/koi-showcase.html`, `organisms/features.html`, `pages/home.html`, `pages/kois.html`, `pages/product.html` |
| `♀` `♂` | Sexe des koïs | `molecules/koi-card.html`, `organisms/koi-showcase.html`, `organisms/koi-detail.html`, `pages/product.html` |
| `❮` `❯` | Navigation galerie photo | `pages/product.html:597-598`, `pages/product.html:802-803` |
| `✕` | Fermer la lightbox | `pages/product.html:801` |

---

## Récapitulatif

| Catégorie | Nombre |
|---|---|
| Emojis à remplacer par SVG | 19 |
| Symboles Unicode (optionnel) | 4 types |

**Fichiers les plus impactés :** `pages/materiel.html`, `pages/nourriture.html`, `pages/soins.html`, `pages/azukari.html`
