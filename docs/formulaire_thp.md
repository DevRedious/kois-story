# 🎏 Projet Final : Koi's Story

## 1. Présentation

Le marché des carpes Koï d’exception repose encore largement sur le bouche-à-oreille et des annonces peu valorisantes, ne reflétant pas la noblesse de ces spécimens. Koi's Story répond au besoin de Mathilde et Emmanuel, éleveurs passionnés, d'avoir une vitrine digitale à la hauteur de leur savoir-faire et de leur affiliation à la prestigieuse lignée Konishi.

L'application est une plateforme e-commerce "vitrine" conçue en mobile-first. Elle permet aux collectionneurs de parcourir un catalogue haut de gamme, de filtrer les spécimens par variété, taille ou prix, et d'entrer en contact direct avec l'éleveur via un bouton WhatsApp pré-rempli. C’est l’alliance de l’élégance visuelle et de l’efficacité commerciale pour un segment de niche.

## 2. Parcours utilisateur

L'utilisateur arrive sur une landing page immersive mettant en avant l'univers de l'élevage. Il accède ensuite au catalogue où il peut filtrer les poissons. En cliquant sur une "card", il arrive sur une fiche détaillée (photos HD, caractéristiques, badge de lignée).

S'il est intéressé, un bouton unique "Commander via WhatsApp" ouvre directement une conversation avec l'éleveur contenant déjà les détails du poisson choisi (Nom, ID, Prix).
Côté Admin, l'éleveur se connecte pour gérer son stock (CRUD complet), uploader ses photos et consulter les messages reçus via le formulaire de contact classique.

## 3. Concrètement et techniquement

### 3.1. Base de données

Nous utilisons PostgreSQL. 

Pourquoi pas SQLite ? Pour la simple et bonne raison qu’on pense à l’après. Si demain Mathilde et Emmanuel ont des milliers de visiteurs simultanés, SQLite (qui verrouille la base entière lors d'une écriture) deviendrait un goulot d'étranglement. PostgreSQL permet des accès concurrents fluides.

Le schéma s'articule autour de trois piliers :

* Users : Gérés via Devise (avec un rôle admin pour la gestion).
* Kois : La table centrale contenant les attributs (variété, taille, prix, description) et liée à la lignée.
* Tags/Categories : Système N-N (via KoiTag) pour un filtrage efficace par caractéristiques.
* Messages : Pour stocker et traiter les demandes du formulaire de contact.

### 3.2. Front

Le front sera développé avec Hotwire (Turbo + Stimulus) pour offrir une expérience fluide sans rechargement de pages (notamment pour les filtres du catalogue). Nous utiliserons Tailwind CSS (ou Bootstrap) pour garantir un rendu professionnel et responsive. L'accent est mis sur des composants visuels forts : galeries d'images HD et badges dynamiques.

### 3.3. Backend

Le projet repose sur Ruby on Rails 7. Nous intégrons :

* Active Storage + Cloudinary : Pour l'hébergement et le redimensionnement dynamique des photos haute résolution.
* ActionMailer : Pour les notifications d'envoi de formulaire.
* API WhatsApp (wa.me) : Pour la redirection de commande simplifiée sans tunnel d'achat complexe.

### 3.4. Mes besoins techniques

L'équipe actuelle (Morgan, Romain, Valentin) maîtrise déjà le workflow Rails et le déploiement.
Nous recherchons 1 à 2 personnes supplémentaires motivées par :

* Le Front-end / UI-UX : Pour rendre le site visuellement "haut de gamme".
* Le SEO / Performance : Optimisation du chargement des médias HD.
* La Rigueur Back-end : Pour nous aider sur la logique des filtres et l'organisation de la data.

## 4. La version minimaliste (MVP) - Fin de semaine 1

À la fin de la première semaine, l'application doit permettre :

1. D'afficher une liste de carpes Koï issues de la DB.
2. De consulter une fiche produit individuelle.
3. D'avoir un bouton WhatsApp fonctionnel (lien statique vers le vendeur).
4. Une interface Admin basique permettant de créer ou supprimer un poisson.  
   L'objectif est de valider le cycle "Donnée -> Affichage -> Contact".

## 5. La version pour le jury - Fin de semaine 2

Pour la présentation finale, nous ajouterons les fonctionnalités suivantes :

* Filtres dynamiques (en temps réel via Stimulus) pour une navigation fluide.
* Galeries photos/vidéos avancées avec zoom et carrousels.
* Système de tags complet pour une recherche granulaire.
* Dashboard Admin avec un suivi simple de l'état du stock.
* Identité visuelle léchée respectant les codes du luxe et de l'élevage Konishi.