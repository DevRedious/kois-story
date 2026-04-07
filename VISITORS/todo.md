# TODO — Site Public (Visiteurs)

> Statut : MVP en finalisation. Objectif = **livrer le produit à la cliente** (Mathilde & Emmanuel).
> THP terminé et validé — les contraintes éliminatoires (anglais, etc.) ne s'appliquent plus.
> Priorité absolue : tout ce qui bloque la mise en ligne et l'usage réel par la cliente.

---

## 🔥 BLOQUANTS LIVRAISON (à finir avant tout)

- [ ] **Stimulus — Filtres Catalogue :** Créer `kois_filter_controller.js` pour rendre `_kois_filter_bar.html.erb` fonctionnel (Variété, Âge, Prix, Konishi). Sans ça, `/kois` n'est pas utilisable.
- [ ] **Fiche Produit — Carte contact sticky :** Ajouter "Nous contacter pour ce koï" sur `_kois_product_detail.html.erb`. C'est le tunnel de conversion WhatsApp principal.
- [ ] **Vues boutique :** Finaliser le contenu de `materiel.html.erb`, `nourriture.html.erb` et `soins.html.erb` (actuellement stubs/listes statiques) — sinon pages vides en prod.
- [ ] **Déploiement VPS :** Mise en ligne sur le VPS de production.
- [ ] **ActionMailer en prod :** Vérifier que l'envoi de mail fonctionne réellement (formulaire contact → admin).

## ✅ Fondations & Backend (acquis)

- [x] Rails 8.1.2 (Propshaft + Importmap), partials par vues, routes publiques complètes.
- [x] Modèles V1 opérationnels (`Koi`, `Tag`, `Product`, `Message`, `Image`).
- [x] Seeds : 26 variétés conformes et spécimens de démo.
- [x] Devise (Visiteurs & Admins), ActionMailer (Contact → Admin) en dev.
- [x] Upload Cloudinary (Koïs et Produits).
- [x] Badge Konishi, boutons WhatsApp dynamiques.
- [x] CSS 100% mobile-first, A11y (skip-link, aria-live), `loading="lazy"`, navbar Nike sticky.

## 🚧 P2 — Stimulus complémentaire (post-bloquants)

- [ ] **Menu Navigation :** Convertir `header.js` en `navigation_controller.js` (gestion propre dropdowns/menu mobile sous Turbo).
- [ ] **Galerie Produit :** Encapsuler `gallery.js` (déjà fonctionnel en vanilla) en `gallery_controller.js`.

## 🚧 P2 — UI & Retours Client (Maquettes ChatGPT)

- [ ] **Navbar :** Ajouter le numéro de téléphone (Manu/Mathilde) à côté du bouton de navigation.
- [ ] **Section À Propos :** Refondre `_decouvrir_story.html.erb` (Layout : texte à gauche / photo du couple à droite).
- [ ] **Page d'Accueil :**
  - [ ] Section "Parcourir par variété" (grille visuelle cliquable).
  - [ ] Section "Avis Clients" (témoignages statiques 5★).
  - [ ] Logos partenaires en footer (iKonShî, Konishi Europe).
- [ ] **Fiche Produit — Certificats Konishi :** Affichage du visuel final (placeholder déjà en place).

## 🧹 P3 — Nice-to-have (post-livraison)

- [ ] **Emoji → SVG :** Remplacer les derniers emojis par des SVGs (`_home_features`, `materiel`, `nourriture`, `soins`).
- [ ] **Tokens CSS :** Migration cosmétique `--c-*` vers `--color-*`.
- [ ] **Dette CSS prototype :** Splitter les fichiers > 200 lignes (`header.css` 387, `product-pages.css` 352, `farm.css` 334, `forms.css` 312…) si réintégrés depuis le proto.
- [ ] **Slogan home :** Affiner la proposition de valeur.

## 🎨 Référence — Migration SVG (emojis restants)

| Catégorie | Emojis à remplacer | Fichiers concernés |
|---|---|---|
| Excellence | ★ (Étoile), 鯉 (Kanji) | `_home_features`, `_kois_filter_bar`, `_home_showcase` |
| Boutique | ⚙️, 🔄, 🧹, 💧, ☀️, 🌡️ | `materiel.html.erb`, `soins.html.erb` |
| Nourriture | 🐟, 🎨, ⭐, 💊, 🍂, 🎯 | `nourriture.html.erb` |
| UI | ❮, ❯ (Flèches), ✕ (Fermer) | `_kois_product_detail.html.erb` |

---

## 📌 Note langue (post-THP)

Le bootcamp est terminé et validé. Le critère "tout en anglais" ne s'applique plus.
- **Anglais conservé** par hygiène : noms de variables/méthodes/classes, routes, tables DB, commits Git, README technique.
- **Français assumé** : contenus de vues, labels, placeholders, flash messages, locales I18n, doc interne, interface admin (Mathilde n'est pas technique).

---
*Dernière mise à jour : 7 Avril 2026 — repriorisation orientée livraison cliente*
