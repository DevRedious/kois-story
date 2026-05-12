# JavaScript - Espace Admin

Fichier principal : `admin.js`

## Fonctionnalités implémentées

### 📱 Navigation Mobile

| Fonction | Description |
|----------|-------------|
| **Menu burger** | Toggle la sidebar sur mobile/tablette |
| **Overlay** | Ferme le menu en cliquant à l'extérieur |
| **Fermeture auto** | Ferme le menu en cliquant sur un lien |
| **Animation icône** | Change l'icône ☰ en ✕ quand ouvert |

### 🔐 Authentification

| Fonction | Description |
|----------|-------------|
| **Déconnexion** | Confirmation avant déconnexion + redirection |

### 🐟 Gestion des Koïs

| Fonction | Description |
|----------|-------------|
| **Nouveau koï** | Redirection vers formulaire d'ajout |
| **Éditer** | Notification d'ouverture du formulaire |
| **Supprimer** | Confirmation + animation de suppression |
| **Voir** | Notification d'ouverture de la fiche |

### 🔍 Recherche & Filtres

| Fonction | Description |
|----------|-------------|
| **Recherche temps réel** | Filtre les lignes de tableau instantanément |
| **Filtres** | Notifications de filtrage appliqué |

### ✉️ Messages

| Fonction | Description |
|----------|-------------|
| **Marquer comme lu** | Clique sur un message non lu le marque comme lu |
| **Mise à jour badge** | Décrémente le compteur de messages non lus |

### 🔔 Notifications

Système de toast notifications pour feedback utilisateur :
- **Succès** (vert) : Actions réussies
- **Erreur** (rouge) : Actions échouées
- **Info** (bleu) : Informations

### ⚠️ Protection

Confirmation avant de quitter si formulaire modifié (beforeunload)

---

## Utilisation

### Inclure le JS dans une page

```html
<script src="../assets/js/admin.js"></script>
</body>
```

### Fonction globale toggleSidebar()

La fonction `toggleSidebar()` est disponible globalement pour les boutons avec `onclick` inline.

---

## API JavaScript

### `toggleSidebar()`

Ouvre/ferme la sidebar mobile.

```javascript
toggleSidebar();
```

### `showNotification(message, type)`

Affiche une notification toast.

```javascript
showNotification('Message envoyé !', 'success');
showNotification('Une erreur est survenue', 'error');
showNotification('Chargement...', 'info');
```

**Types :** `success` (vert), `error` (rouge), `info` (bleu)

---

## Événements écoutés

| Événement | Déclencheur |
|-----------|-------------|
| `click` | Menu burger, boutons actions, overlay |
| `input` | Champs de recherche |
| `change` | Sélecteurs de filtres, formulaires |
| `beforeunload` | Protection formulaires |

---

## Compatibilité

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- iOS Safari 13+

**Pas de dépendances externes** (vanilla JS)

---

## TODO

- [ ] Connecter à l'API backend (CRUD réel)
- [ ] Ajouter la pagination
- [ ] Ajouter le tri des colonnes de tableau
- [ ] Implémenter le drag & drop pour les images
