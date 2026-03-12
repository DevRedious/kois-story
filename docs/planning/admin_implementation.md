# Implémentation de la partie admin

## Objectif

Cette documentation définit comment intégrer la partie administration du site sans perturber l'expérience des visiteurs.

L'espace public doit rester simple, rapide et orienté conversion.  
L'espace admin doit être isolé, sécurisé et réservé à la gestion interne.

## Principe de séparation

La partie admin ne doit jamais se mélanger à l'interface publique.

Séparation attendue :

- espace public pour les visiteurs
- espace admin pour l'éleveuse
- navigation, layout et contrôleurs distincts
- accès protégé par authentification et rôle

## Règles fonctionnelles

- un visiteur ne voit jamais les écrans d'administration
- un visiteur ne voit jamais les actions CRUD
- un visiteur ne doit pas être ralenti par des scripts admin inutiles
- l'admin ne doit pas casser le parcours catalogue ou contact
- l'URL admin doit être clairement séparée du front public

## Architecture recommandée

## Routes

Utiliser un namespace dédié :

```ruby
namespace :admin do
  root "dashboard#index"
  resources :kois
  resources :messages, only: [:index, :show, :update]
  resources :images, only: [:create, :destroy]
end
```

Exemples :

- `/catalogue` pour les visiteurs
- `/contact` pour les visiteurs
- `/admin` pour le tableau de bord
- `/admin/kois` pour la gestion du stock
- `/admin/messages` pour les messages reçus

## Contrôleurs

Créer des contrôleurs séparés :

- `KoisController` pour le front public
- `Admin::DashboardController`
- `Admin::KoisController`
- `Admin::MessagesController`

Les contrôleurs admin doivent hériter d'une base commune :

```ruby
class Admin::BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin!

  layout "admin"

  private

  def require_admin!
    redirect_to root_path, alert: "Access denied." unless current_user&.admin?
  end
end
```

## Authentification et autorisation

L'accès admin doit reposer sur Devise et sur un rôle `admin`.

Attendus :

- `authenticate_user!` pour toute route admin
- vérification stricte du rôle
- aucun lien admin affiché sans session admin
- redirection vers la home si accès non autorisé

## Isolation visuelle

L'interface admin doit avoir :

- un layout dédié `admin.html.erb`
- une navigation dédiée
- un style distinct de l'espace public
- aucune CTA commerciale publique dans l'admin

L'interface publique doit garder :

- son hero
- son catalogue
- sa fiche produit
- ses CTA WhatsApp
- sa galerie

## Isolation technique

Pour ne pas déranger les visiteurs :

- ne charger les composants admin que dans le layout admin
- ne pas embarquer de Stimulus admin sur les pages publiques
- ne pas exposer de liens CRUD dans les partials publiques
- séparer les partials public et admin
- limiter les requêtes admin aux pages admin

## Organisation UI en Atomic Design

Structure recommandée :

```text
app/components/
  atoms/
  molecules/
  organisms/
  templates/
  pages/
    admin/
    public/
```

Exemples :

- `atoms/button`
- `atoms/input`
- `molecules/koi_meta`
- `organisms/admin_sidebar`
- `organisms/koi_form`
- `templates/admin_dashboard`
- `templates/public_catalogue`

## Périmètre admin

## Dashboard

Le dashboard admin doit afficher :

- nombre de koïs disponibles
- nombre de koïs vendus
- derniers messages reçus
- accès rapide aux actions principales

## Gestion des koïs

L'admin doit pouvoir :

- créer une fiche koï
- modifier une fiche
- changer le statut disponible ou vendu
- gérer le badge Konishi
- gérer les tags
- gérer les images

## Gestion des messages

L'admin doit pouvoir :

- consulter la liste des messages
- lire un message
- marquer un message comme lu

## Gestion des images

Les images doivent être gérées via Cloudinary ou Active Storage selon l'implémentation retenue.

Points importants :

- upload réservé à l'admin
- suppression réservée à l'admin
- ordre d'affichage maîtrisé
- aucune interface d'upload côté visiteur

## Sécurité minimale

- protéger toutes les routes admin
- filtrer les paramètres forts
- empêcher l'accès direct aux actions sensibles
- journaliser proprement les erreurs
- ne jamais exposer d'informations d'administration dans le front

## Checklist d'implémentation

- créer le rôle `admin`
- sécuriser l'accès avec Devise
- créer `Admin::BaseController`
- créer le layout `admin`
- créer le namespace `admin`
- séparer les contrôleurs front et admin
- séparer les partials front et admin
- créer le dashboard admin
- créer le CRUD koïs
- créer la gestion des messages
- tester les redirections non autorisées

## Critère de réussite

Le projet est correctement implémenté si :

- un visiteur ne perçoit jamais l'admin
- l'admin a un back-office complet et isolé
- les routes publiques restent propres
- les performances publiques ne sont pas dégradées
- la maintenance front et admin reste simple
