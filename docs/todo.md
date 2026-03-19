# TODO

## Priorité haute

- [ ] Initialiser l'application Rails
- [ ] Configurer la base SQLite
- [ ] Installer Devise
- [ ] Créer les modèles `User`, `Koi`, `Image`, `Tag`, `KoiTag`, `Message`
- [ ] Mettre en place les migrations dans l'ordre prévu
- [ ] Construire les routes REST principales
- [ ] Structurer `ADMIN/` et `VISITORS/` avec `atoms`, `molecules`, `organisms`, `templates`, `pages`
- [ ] Créer la page d'accueil dans `VISITORS/pages/`
- [ ] Créer le catalogue dans `VISITORS/pages/`
- [ ] Créer la fiche produit dans `VISITORS/pages/`
- [ ] Ajouter le bouton WhatsApp avec message prérempli

## Priorité moyenne

- [ ] Ajouter l'interface d'administration dans `ADMIN/pages/`
- [ ] Gérer le CRUD des koïs
- [ ] Gérer les messages de contact
- [ ] Intégrer Cloudinary pour les images
- [ ] Mettre en place ActionMailer
- [ ] Ajouter les filtres catalogue avec Hotwire
- [ ] Afficher le badge Konishi
- [ ] Prévoir l'affichage des certificats
- [ ] Créer la bibliothèque de composants UI en Atomic Design dans `ADMIN/` et `VISITORS/`

## Priorité basse

- [ ] Ajouter la galerie photo et vidéo
- [ ] Améliorer le tableau de bord admin
- [ ] Rédiger les seeds de démonstration
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
