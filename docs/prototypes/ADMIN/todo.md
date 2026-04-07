# TODO — Back-office Admin

> Statut : CRUD partiel. Koïs et Produits OK. Orders/Payments/Clients **incomplets** (pas de création).
> Objectif = **livrer un back-office utilisable à Mathilde** (cliente, non technique).
> THP terminé et validé — les contraintes éliminatoires ne s'appliquent plus.

---

## 🔥 BLOQUANTS LIVRAISON (à finir avant tout)

- [ ] **Orders — actions `new` + `create` :** `Admin::OrdersController` n'expose actuellement qu'`index`/`show`/`edit`/`update`. Mathilde ne peut PAS créer une commande. Ajouter `new`, `create`, vue `new.html.erb` et partial `_form.html.erb`.
- [ ] **Payments — actions `new` + `create` :** Idem `Admin::PaymentsController`. La saisie manuelle (complet/acompte/échelonné) annoncée n'est pas réellement opérationnelle car pas de point d'entrée création.
- [ ] **Clients — actions `new` + `create` :** Idem `Admin::ClientsController`. Mathilde ne peut pas enregistrer un nouveau client (uniquement consulter/éditer).
- [ ] **Routes RESTful** : vérifier que `resources :orders/payments/clients` exposent bien `new` et `create` après ajout des actions.
- [ ] **Vues admin — finalisation** : remplir les CSS modules encore stubs, vérifier le rendu mobile (cartes au lieu de scroll horizontal sur tableaux).
- [ ] **Déploiement VPS** + ActionMailer en prod (commun avec todo VISITORS).

## ✅ Acquis

- [x] **Koïs** : `Admin::KoisController` complet (CRUD intégral) avec upload Cloudinary, partial `_form_images.html.erb`.
- [x] **Produits** : `Admin::ProductsController` complet (matériel, soins, nourriture) — `new` + `_form` + `edit` présents.
- [x] **Messages** : `Admin::MessagesController` (index, show, update, flag de lecture).
- [x] **Orders / Payments / Clients** : actions `index`, `show`, `edit`, `update` opérationnelles (création manquante, voir bloquants).
- [x] **Dashboard** : espace admin protégé par rôle Devise.
- [x] **Fondations UI** :
  - Sidebar synchronisée sur toutes les pages.
  - Fils d'Ariane sur les formulaires.
  - Système de notifications (toast) Palette V3.
  - CSS mobile-first (`min-width` uniquement).
- [x] **Fat Model / Skinny Controller** : validations dans les modèles, contrôleurs minces (max 79 lignes).
- [x] **Relations N-N** : `has_many :through` (KoiTags, OrderItems).
- [x] **Helpers Rails** pour liens et images dans les vues admin.
- [x] **Secrets** : Cloudinary et Mailer dans `.env`.

## 🚧 P2 — Fonctionnalités complémentaires (post-bloquants)

- [ ] **Archive Comptable :** Vue consolidée commandes + paiements pour le suivi fiscal de Mathilde.
- [ ] **Vue Tableaux Mobile :** Affichage en "cartes" sur mobile (au lieu du scroll horizontal actuel).
- [ ] **Liens actifs sidebar :** Remplacer la logique manuelle `.nav-item.active` par `active_link_to` ou helper custom.
- [ ] **Interface Newsletter :** UI prête mais logique d'envoi dormante (V2 — peut rester dormant pour la livraison).

## 🧹 P3 — Nice-to-have (post-livraison)

- [ ] **Nettoyage CSS Admin :** Continuer le splitting des fichiers > 200 lignes (déjà entamé : `layout-section-1/2/3.css`, `forms-section-1/2.css`, etc.).
- [ ] **Pipeline d'Assets :** Déplacer polices et icônes dans `app/assets/` plutôt que des chemins relatifs vers `docs/`.
- [ ] **Stripe** : statut "en cours d'évaluation" — pas de payment online prévu pour la V1 (transactions WhatsApp/virement).

## ✅ Audit historique (Phase Prototype → Rails)

- [x] **Palette V3** appliquée aux composants `app/views/admin/`.
- [x] **Pas de JS inline** : zéro `onclick`/`onchange` dans les vues Rails.
- [x] **A11y** : `aria-label` sur boutons d'action de tableaux.
- [x] **Tableaux responsives** : `.table-responsive` partout.
- [x] **26 variétés de Koïs** : liste exacte client respectée et synchronisée entre `kois/index` et `admin/kois`.

---

## 📌 Note langue (post-THP)

Le bootcamp est terminé et validé. Le critère "tout en anglais" ne s'applique plus.
- L'interface admin **doit rester en français** : Mathilde n'est pas technique.
- Anglais conservé uniquement par hygiène code : noms de variables, méthodes, classes, routes, tables DB, commits Git.

---
*Dernière mise à jour : 7 Avril 2026 — repriorisation orientée livraison cliente, correction du faux "CRUD complet" Orders/Payments/Clients*
