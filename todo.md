# Todo — Koi's Story V3

Palette autorisée : `#e60000` · `#630f0f` · `#000000` · `#f5f5f2` · `#ffffff` · `#25d366` (WhatsApp uniquement)
Logo : `docs/assets/LOGO MANU FINI.png`
Fonts : `docs/fonts/inter/` + `docs/fonts/playfair-display/` (aucune dépendance Google Fonts)
Stack : HTML + CSS + JS vanilla uniquement — Atomic Design — aucun fichier > ~200 lignes

---

## Fondations

- [x] `docs/design/tokens.css` — variables CSS globales : palette V3, fonts locales, espacements, border-radius, transitions
- [x] `docs/design/fonts.css` — déclarations `@font-face` Inter + Playfair Display depuis `docs/fonts/` — chemins `../fonts/` corrigés (ÉTAPE 0)
- [x] `docs/design/reset.css` — reset minimal (box-sizing, margin, padding, img, a)
- [x] `docs/design/wave.svg` — séparateur SVG ondulé aquatique réutilisable entre sections

---

## Atoms — `VISITORS/atoms/`

- [x] `logo.html` — `LOGO MANU FINI.png` + variante texte seul (header transparent / footer)
- [x] `button.html` — 4 variantes : primary (rouge), ghost (bordeaux outline), dark (noir), whatsapp (vert)
- [x] `badge.html` — 3 variantes : Konishi (bordeaux), Nouveau (rouge), statut (noir/crème)
- [x] `price.html` — affichage prix Playfair Display, symbole € en exposant
- [x] `input.html` — text, textarea, select — focus rouge, pas d'autres couleurs
- [x] `koi-thumb.html` — image ratio 3/4, overflow hidden, hover scale léger
- [x] `wave-divider.html` — intégration du SVG `docs/design/wave.svg` comme séparateur de section
- [x] `icon-wa.html` — icône WhatsApp SVG inline (pas emoji)

---

## Molecules — `VISITORS/molecules/`

- [x] `nav-header.html` — logo à gauche, liens centrés, CTA WhatsApp à droite — transparent au chargement
- [x] `koi-card.html` — ratio 3/4, photo dominante, nom + variété + prix + bouton Voir — max 3 colonnes
- [x] `koi-card--editorial.html` — variante large (hero card) pour mettre un spécimen en avant
- [x] `filter-bar.html` — filtres variété / taille / prix / Konishi — sticky sous le header
- [x] `cta-whatsapp.html` — bouton flottant avec label texte visible "Contacter l'élevage" (pas juste un rond)
- [x] `contact-form.html` — nom + email + message + submit rouge
- [x] `shop-card.html` — card matériel/nourriture/soins — image + nom + catégorie + lien

---

## Organisms — `VISITORS/organisms/`

- [x] `header.html` — transparent sur hero, fond noir au scroll — JS dans `VISITORS/assets/js/header.js`
- [x] `hero.html` — photo plein écran, texte superposé centré ou bas-gauche, titre clamp grand, badge Konishi proéminent, un seul CTA principal
- [x] `features.html` — layout asymétrique : 1 grande carte gauche + 2 petites droite (pas 3 colonnes égales)
- [x] `koi-showcase.html` — grille éditoriale 3 colonnes + 1 card éditoriale en vedette (remplace koi-grid 4 colonnes)
- [x] `konishi-band.html` — section sombre avec éléments graphiques japonais subtils (lignes, motif ondulé)
- [x] `farm-gallery.html` — galerie photos élevage, layout masonry ou alternance portrait/paysage
- [x] `koi-detail.html` — fiche produit : galerie gauche + infos droite + bouton WhatsApp très visible
- [x] `footer.html` — liens #ffffff + hover #e60000, logo, mentions légales
- [x] `shop-section.html` — section produits matériel/nourriture avec wave-divider au dessus

---

## Templates — `VISITORS/templates/`

- [x] `visitor-layout.html` — inclut tokens.css + fonts.css + reset.css, header + footer + slot contenu

---

## Pages — `VISITORS/pages/`

- [x] `home.html` — hero immersif → features asymétriques → koi-showcase → konishi-band → contact rapide
- [x] `kois.html` — filter-bar sticky + grille 3 colonnes + card éditoriale en tête
- [x] `product.html` — galerie photo + fiche technique + CTA WhatsApp pleine largeur
- [x] `decouvrir.html` — storytelling Mathilde & Emmanuel, farm-gallery
- [x] `materiel.html` — shop-section filtration / pompes / UV
- [x] `nourriture.html` — shop-section gamme Konishi
- [x] `soins.html` — shop-section microscope / tests / traitements
- [x] `azukari.html` — page service, wave-divider, CTA WhatsApp
- [x] `contact.html` — formulaire + infos + carte placeholder

---

## Identité graphique & JS

- [x] `VISITORS/assets/js/header.js` — header transparent → noir au scroll (IntersectionObserver)
- [x] `VISITORS/assets/js/filter.js` — filtres catalogue (show/hide cards) sans rechargement
- [x] `VISITORS/assets/js/gallery.js` — lightbox simple pour galerie fiche produit
- [ ] Remplacer tous les emojis utilisés comme icônes par des SVG inline ou `docs/assets/`
- [x] Vérifier que `docs/assets/LOGO MANU FINI.png` est utilisé partout (header + footer) à la place du cercle texte placeholder
- [x] Vérifier qu'aucune couleur hors palette ne subsiste après chaque modification
- [x] `main.js` (405 lignes, hors limite) supprimé — fonctions déjà dans `header.js`, `filter.js`, `gallery.js`
- [x] Fichiers V2 obsolètes supprimés : `pages/catalogue.html` → `pages/kois.html`, `pages/farm.html` → `pages/decouvrir.html`, `organisms/catalogue-grid.html` → `organisms/koi-showcase.html`

---

## Vérifications finales — ✅ Complété le 2026-03-17

- [x] Palette propre — aucune couleur hors `#e60000 · #630f0f · #000000 · #f5f5f2 · #ffffff · #25d366` + rgba()
- [x] Aucune référence Google Fonts dans les fichiers V3
- [x] `docs/design/fonts.css` — 13 `@font-face` avec chemins `../fonts/` corrects
- [x] Liens inter-pages cohérents : home / kois / product / decouvrir / materiel / nourriture / soins / azukari / contact
- [x] Scripts JS : `header.js` + `filter.js` + `gallery.js` — tous < 200 lignes, chemins corrects
- [x] Logo `../../docs/assets/LOGO MANU FINI.png` — présent dans tous les headers V3
- [x] Toutes les références à `main.js` supprimées des pages
