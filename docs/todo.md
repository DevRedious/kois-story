# TODO

## Priorité haute

- [ ] Initialiser l'application Rails
- [ ] Configurer la base SQLite
- [ ] Installer Devise
- [ ] Créer les modèles V1 dans l'ordre de migration :
  - `User` (Devise, rôle: visitor|client|admin)
  - `Koi` (status: available|sold_out|incoming, age_class, age, sex)
  - `Image` (polymorphique : koi ou product)
  - `Tag`, `KoiTag`
  - `Message`
  - `Product` (category: materiel|soins|nourriture)
  - `ClientProfile`
  - `Order`, `OrderItem`, `Payment`
  - `NewsletterSubscriber` *(dormant V2)*
- [ ] Mettre en place les migrations dans l'ordre prévu
- [ ] Construire les routes REST principales
- [ ] Structurer `ADMIN/` et `VISITORS/` avec `atoms`, `molecules`, `organisms`, `templates`, `pages`
- [ ] Créer la page d'accueil dans `VISITORS/pages/`
- [ ] Créer le catalogue dans `VISITORS/pages/` (filtres : variété, age_class, sexe, taille, prix)
- [ ] Créer la fiche produit dans `VISITORS/pages/`
- [ ] Ajouter le bouton WhatsApp avec message prérempli
- [ ] Créer la page "Nous découvrir" dans `VISITORS/pages/` (texte fourni par client)
- [ ] Créer la page "Azukari" dans `VISITORS/pages/` (texte fourni par client)

## Priorité moyenne

- [ ] Construire l'interface admin dans `ADMIN/pages/`
  - [ ] Dashboard (vue synthétique : koïs, commandes, messages, paiements)
  - [ ] Gestion koïs : CRUD + statut (disponible / rupture / arrivage)
  - [ ] Gestion messages / demandes clients (lu/non lu, réponse WhatsApp)
  - [ ] Gestion commandes (création, statuts, order items)
  - [ ] Suivi paiements (saisie manuelle : complet / acompte / échelonné)
  - [ ] Fiches clients (création manuelle)
  - [ ] Archive comptable (vue consolidée commandes + paiements)
  - [ ] Gestion catalogue produits + stocks *(NICE TO HAVE)*
  - [ ] Interface newsletter *(UI prête, envoi dormant V2)*
- [ ] Intégrer Cloudinary pour les images (koïs et produits)
- [ ] Mettre en place ActionMailer (formulaire de contact dans le footer → notification admin)
- [ ] Ajouter les filtres catalogue avec Hotwire (variété, age_class, sexe, taille, prix)
- [ ] Afficher le badge Konishi
- [ ] Prévoir l'affichage des certificats
- [ ] Créer la bibliothèque de composants UI en Atomic Design dans `ADMIN/` et `VISITORS/`

## Priorité basse

- [ ] Ajouter la galerie photo et vidéo
- [ ] Créer les pages statiques Matériel, Soins, Nourriture dans `VISITORS/pages/`
- [ ] Améliorer le tableau de bord admin
- [ ] Rédiger les seeds de démonstration (26 variétés, enums age_class/sex)
- [ ] Finaliser les contenus marketing
- [ ] Préparer la mise en production VPS
