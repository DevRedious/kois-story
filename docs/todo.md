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

---

## Retour client  Maquettes ChatGPT (reçues le 17/03/2026)

Le client a fourni 3 captures d'écran de maquettes générées par ChatGPT comme référence de direction souhaitée.

### Ajustements visuels intégrables avant beta (23/03)

- [ ] Ajouter un bouton WhatsApp flottant (bas droit, toutes les pages visiteurs)
- [ ] Afficher le numéro de téléphone dans la navbar
- [ ] Retravailler la section About : disposition texte à gauche / photo couple à droite (en attente de la photo fournie par le client)
- [ ] Ajouter une section "Parcourir par variété" (Kohaku, Showa, Tancho…) sur la home  galerie visuelle cliquable vers le catalogue filtré
- [ ] Ajouter une section avis clients (Google ★★★★★) sur la home  contenu statique acceptable pour la beta
- [ ] Ajouter les logos partenaires en bas de page (iKonShî, Konishi Europe GmbH…)
- [ ] Ajouter une card "Nous contacter pour ce koï" sur la fiche produit catalogue (UX flottante ou sticky)
- [ ] Revoir l'esthétique générale : moins corporate/sombre, plus chaud et organique (voir analyse ci-dessous)

### À reporter en V2 post-beta (scope trop large)

- [ ] Sections "Matériel", "Soins", "Nourriture", "Azukari", "Conseils"  nouveaux domaines métier non prévus dans le brief initial, impliquent de nouveaux modèles Rails et du contenu non fourni
- [ ] Page "Installations intérieures / extérieures"
- [ ] Navigation étendue à 7-8 entrées

### Notes

- Le client semble avoir utilisé ChatGPT pour générer ces maquettes  la direction est indicative, pas contractuelle
- Demander au client : photo HD du couple (Emmanuel & Mathilde), confirmation du numéro de téléphone à afficher, logos partenaires en HD
