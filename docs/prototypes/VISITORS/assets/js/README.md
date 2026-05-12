# JavaScript - Espace Visiteur

Fichier principal : `main.js`

## Fonctionnalités implémentées

### 🎯 Navigation

| Fonction | Description |
|----------|-------------|
| **Header scroll** | Le header devient opaque au scroll (ajoute la classe `.scrolled`) |
| **Menu mobile** | Toggle du menu hamburger avec animation (☰ → ✕) |
| **Fermeture auto** | Le menu se ferme en cliquant à l'extérieur ou sur un lien |
| **Smooth scroll** | Défilement fluide vers les ancres (header offset pris en compte) |

### 🖼️ Galerie Produit

| Fonction | Description |
|----------|-------------|
| **Miniatures** | Clique sur une miniature change l'image principale |
| **Navigation** | Boutons précédent/suivant |
| **Clavier** | Flèches gauche/droite pour naviguer |
| **Transition** | Fade animation entre les images |

### 🔍 Filtres Catalogue

| Fonction | Description |
|----------|-------------|
| **Filtre Konishi** | Toggle pour afficher uniquement les koïs Konishi |
| **Compteur** | Mise à jour dynamique du nombre de résultats |
| **Animation** | Fade in/out des cartes filtrées |

### 📱 Interactions

| Fonction | Description |
|----------|-------------|
| **Charger plus** | Simule le chargement AJAX de nouvelles cartes |
| **WhatsApp** | Ouvre WhatsApp dans une nouvelle fenêtre |
| **Formulaire** | Validation + simulation d'envoi avec notification |

### ✨ UX Enhancements

| Fonction | Description |
|----------|-------------|
| **Animations scroll** | Les éléments apparaissent au scroll (Intersection Observer) |
| **Notifications** | Toast notifications pour les actions (succès/erreur) |
| **Validation visuelle** | Bordures rouges sur les champs invalides |

---

## Utilisation

### Inclure le JS dans une page

```html
<script src="../assets/js/main.js"></script>
</body>
```

### Prérequis HTML

#### Header (obligatoire pour le scroll effect)
```html
<header class="header" id="header">
```

#### Navigation mobile
```html
<nav class="header-nav" id="headerNav">
<button class="header-mobile-btn">☰</button>
```

#### Filtres catalogue
```html
<select class="filter-select" data-filter="variety">
<input type="checkbox"> <!-- dans .filter-toggle -->
```

#### Galerie produit
```html
<div class="gallery-main">
  <img src="...">
</div>
<div class="gallery-thumb">
  <img src="...">
</div>
```

#### Formulaire contact
```html
<form>
  <input required>
  <button type="submit" class="form-submit">
</form>
```

---

## API JavaScript

### `showNotification(message, type)`

Affiche une notification toast.

```javascript
showNotification('Message envoyé !', 'success');
showNotification('Erreur de formulaire', 'error');
```

**Types :** `success` (vert), `error` (rouge)

---

## Événements personnalisés

Le script écoute et déclenche les événements natifs :

| Événement | Déclencheur |
|-----------|-------------|
| `scroll` | Header effect |
| `click` | Menu toggle, galeries, boutons |
| `change` | Filtres selects |
| `submit` | Formulaires |
| `keydown` | Navigation galerie (flèches) |

---

## Compatibilité

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- iOS Safari 13+
- Chrome Android 80+

**Pas de dépendances externes** (vanilla JS)

---

## TODO

- [ ] Connecter les filtres à une vraie API/backend
- [ ] Ajouter un système de favoris (localStorage)
- [ ] Lazy loading des images
- [ ] Swipe sur mobile pour la galerie
