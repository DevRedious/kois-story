# Todo  Koi's Story V3

Palette autorisée : `#e60000` · `#630f0f` · `#000000` · `#f5f5f2` · `#ffffff` · `#25d366` (WhatsApp uniquement)
Logo : `docs/assets/LOGO MANU FINI.png`
Fonts : `docs/fonts/inter/` + `docs/fonts/playfair-display/` (aucune dépendance Google Fonts)
Stack : HTML + CSS + JS vanilla uniquement  Atomic Design  aucun fichier > ~200 lignes

---

## Fondations

- [x] `docs/design/tokens.css`  variables CSS globales : palette V3, fonts locales, espacements, border-radius, transitions
- [x] `docs/design/fonts.css`  déclarations `@font-face` Inter + Playfair Display depuis `docs/fonts/`  chemins `../fonts/` corrigés (ÉTAPE 0)
- [x] `docs/design/reset.css`  reset minimal (box-sizing, margin, padding, img, a)
- [x] `docs/design/wave.svg`  séparateur SVG ondulé aquatique réutilisable entre sections

---

## Atoms  `VISITORS/atoms/`

- [x] `logo.html`  `LOGO MANU FINI.png` + variante texte seul (header transparent / footer)
- [x] `button.html`  4 variantes : primary (rouge), ghost (bordeaux outline), dark (noir), whatsapp (vert)
- [x] `badge.html`  3 variantes : Konishi (bordeaux), Nouveau (rouge), statut (noir/crème)
- [x] `price.html`  affichage prix Playfair Display, symbole € en exposant
- [x] `input.html`  text, textarea, select  focus rouge, pas d'autres couleurs
- [x] `koi-thumb.html`  image ratio 3/4, overflow hidden, hover scale léger
- [x] `wave-divider.html`  intégration du SVG `docs/design/wave.svg` comme séparateur de section
- [x] `icon-wa.html`  icône WhatsApp SVG inline (pas emoji)

---

## Molecules  `VISITORS/molecules/`

- [x] `nav-header.html`  logo à gauche, liens centrés, CTA WhatsApp à droite  transparent au chargement
- [x] `koi-card.html`  ratio 3/4, photo dominante, nom + variété + prix + bouton Voir  max 3 colonnes
- [x] `koi-card--editorial.html`  variante large (hero card) pour mettre un spécimen en avant
- [x] `filter-bar.html`  filtres variété / taille / prix / Konishi  sticky sous le header
- [x] `cta-whatsapp.html`  bouton flottant avec label texte visible "Contacter l'élevage" (pas juste un rond)
- [x] `contact-form.html`  nom + email + message + submit rouge
- [x] `shop-card.html`  card matériel/nourriture/soins  image + nom + catégorie + lien

---

## Organisms  `VISITORS/organisms/`

- [x] `header.html`  transparent sur hero, fond noir au scroll  JS dans `VISITORS/assets/js/header.js`
- [x] `hero.html`  photo plein écran, texte superposé centré ou bas-gauche, titre clamp grand, badge Konishi proéminent, un seul CTA principal
- [x] `features.html`  layout asymétrique : 1 grande carte gauche + 2 petites droite (pas 3 colonnes égales)
- [x] `koi-showcase.html`  grille éditoriale 3 colonnes + 1 card éditoriale en vedette (remplace koi-grid 4 colonnes)
- [x] `konishi-band.html`  section sombre avec éléments graphiques japonais subtils (lignes, motif ondulé)
- [x] `farm-gallery.html`  galerie photos élevage, layout masonry ou alternance portrait/paysage
- [x] `koi-detail.html`  fiche produit : galerie gauche + infos droite + bouton WhatsApp très visible
- [x] `footer.html`  liens #ffffff + hover #e60000, logo, mentions légales
- [x] `shop-section.html`  section produits matériel/nourriture avec wave-divider au dessus

---

## Templates  `VISITORS/templates/`

- [x] `visitor-layout.html`  inclut tokens.css + fonts.css + reset.css, header + footer + slot contenu

---

## Pages  `VISITORS/pages/`

- [x] `home.html`  hero immersif → features asymétriques → koi-showcase → konishi-band → contact rapide
- [x] `kois.html`  filter-bar sticky + grille 3 colonnes + card éditoriale en tête
- [x] `product.html`  galerie photo + fiche technique + CTA WhatsApp pleine largeur
- [x] `decouvrir.html`  storytelling Mathilde & Emmanuel, farm-gallery
- [x] `materiel.html`  shop-section filtration / pompes / UV
- [x] `nourriture.html`  shop-section gamme Konishi
- [x] `soins.html`  shop-section microscope / tests / traitements
- [x] `azukari.html`  page service, wave-divider, CTA WhatsApp
- [x] `contact.html`  formulaire + infos + carte placeholder

---

## Identité graphique & JS

- [x] `VISITORS/assets/js/header.js`  header transparent → noir au scroll (IntersectionObserver)
- [x] `VISITORS/assets/js/filter.js`  filtres catalogue (show/hide cards) sans rechargement
- [x] `VISITORS/assets/js/gallery.js`  lightbox simple pour galerie fiche produit
- [ ] Remplacer tous les emojis utilisés comme icônes par des SVG inline ou `docs/assets/`  voir `docs/todo_emojis.md`
- [x] Vérifier que `docs/assets/LOGO MANU FINI.png` est utilisé partout (header + footer) à la place du cercle texte placeholder
- [x] Vérifier qu'aucune couleur hors palette ne subsiste après chaque modification
- [x] `main.js` (405 lignes, hors limite) supprimé  fonctions déjà dans `header.js`, `filter.js`, `gallery.js`
- [x] Fichiers V2 obsolètes supprimés : `pages/catalogue.html` → `pages/kois.html`, `pages/farm.html` → `pages/decouvrir.html`, `organisms/catalogue-grid.html` → `organisms/koi-showcase.html`

---

## Vérifications finales  ✅ Complété le 2026-03-17

- [x] Palette propre  aucune couleur hors `#e60000 · #630f0f · #000000 · #f5f5f2 · #ffffff · #25d366` + rgba()
- [x] Aucune référence Google Fonts dans les fichiers V3
- [x] `docs/design/fonts.css`  13 `@font-face` avec chemins `../fonts/` corrects
- [x] Liens inter-pages cohérents : home / kois / product / decouvrir / materiel / nourriture / soins / azukari / contact
- [x] Scripts JS : `header.js` + `filter.js` + `gallery.js`  tous < 200 lignes, chemins corrects
- [x] Logo `../../docs/assets/LOGO MANU FINI.png`  présent dans tous les headers V3
- [x] Toutes les références à `main.js` supprimées des pages

---

## Chantier CSS  `VISITORS/assets/css/` ✅ Complété le 2026-03-18

> Architecture CSS modulaire créée. Tout CSS migré depuis les HTML inline.

- [x] `variables.css`  tokens palette V3, fonts, espacements, border-radius, transitions
- [x] `fonts.css`  @font-face Inter + Playfair Display depuis `docs/fonts/`
- [x] `base.css`  reset + body
- [x] `badge.css`  atom badge + variantes
- [x] `button.css`  atom btn + variantes + `.cta-wa`
- [x] `price.css`  atom price + tailles + variantes
- [x] `forms.css`  atom field + molecule contact-form
- [x] `atoms-media.css`  logo, koi-thumb, wave-divider, icon-wa
- [x] `header.css`  navigation pill, menu mobile, dropdown, burger
- [x] `footer.css`  deux variantes footer A et B
- [x] `hero.css`  section hero homepage
- [x] `features.css`  section features asymétrique
- [x] `konishi.css`  organism konishi-band
- [x] `koi-card.css`  molecule koi-card + variante éditoriale
- [x] `catalogue.css`  grille koi + filter-bar
- [x] `product.css`  fiche produit koi, galerie, lightbox, CTA WhatsApp
- [x] `farm.css`  page decouvrir + galerie farm
- [x] `shop.css`  shop-section matériel / nourriture / soins
- [x] `demo.css`  styles de prévisualisation standalone (atoms/molecules/organisms)
- [x] `visitor.css`  manifest d'import
- [x] Tous les `<style>` inline supprimés des 34 fichiers HTML (0 restant)
- [x] Aucun attribut `style=""` dans les pages de production

---

## Option B  Alignement CSS sur les pages ✅ Complété le 2026-03-18

> ~110 classes manquantes ajoutées. 3 nouveaux fichiers créés (koi-card-pages.css, product-pages.css, azukari.css).
> Tous les fichiers CSS restent sous 200 lignes. Manifest visitor.css mis à jour.

### `features.css`  aliaser la convention page

- [x] Ajouter `.features__inner` (max-width wrapper, absent du module)
- [x] Ajouter `.feature-main` = alias de `.feature-card--main` (grid-row, bg noir, padding, min-height, position)
- [x] Ajouter `.feature-main__icon`, `.feature-main__badge`, `.feature-main__title`, `.feature-main__text`
- [x] Ajouter `.feature-small` = alias de `.feature-card--small` (bg blanc, shadow, padding, flex)
- [x] Ajouter `.feature-small__icon`, `.feature-small__title`, `.feature-small__text`

### `hero.css`  ajouter le hero compact (pages intérieures)

- [x] Ajouter `.hero-compact`  hero réduit ~50vh, bg image, overlay, align-items flex-end
- [x] Ajouter `.hero-compact__inner`  max-width, padding, z-index
- [x] Ajouter `.hero-compact__label`  label rouge uppercase (= `.hero__badge`)
- [x] Ajouter `.hero-compact__title`  titre serif blanc
- [x] Ajouter `.hero-compact__sub`  sous-titre blanc/70

### `koi-card.css`  aliaser l'ancienne convention plate

- [x] Ajouter `.koi-card-image` = `.koi-card__thumb` (ratio 3/4, overflow hidden, bg gris)
- [x] Ajouter `.koi-card-image-overlay`  overlay gradient sombre sur l'image
- [x] Ajouter `.koi-card-image-caption`  bloc prix/badges positionné sur l'image
- [x] Ajouter `.koi-card-caption-left`  alignement gauche dans caption
- [x] Ajouter `.koi-card-badges` = `.koi-card__badges` (flex, gap, position absolute)
- [x] Ajouter `.koi-card-badge` = `.badge` (alias direct)
- [x] Ajouter `.koi-card-badge--konishi` = `.badge--konishi`
- [x] Ajouter `.koi-card-badge--status` = `.badge--status`
- [x] Ajouter `.koi-card-content` = `.koi-card__body` (padding, flex col, gap)
- [x] Ajouter `.koi-card-name` = `.koi-card__name` (serif, xl, 700)
- [x] Ajouter `.koi-card-meta` = `.koi-card__meta` (flex wrap, gap)
- [x] Ajouter `.koi-card-price-block`  bloc prix positionné sur l'image (bg sombre, padding)
- [x] Ajouter `.koi-card-price` = `.koi-card__price` (serif, rouge, 2xl)
- [x] Ajouter `.koi-card-price-label`  label "À partir de" petit texte
- [x] Ajouter `.koi-card-price-currency` = `.price__currency` (exposant €)
- [x] Ajouter `.koi-card-actions` = `.koi-card__footer` (padding, border-top)
- [x] Ajouter `.koi-card-cta` = `.koi-card__btn` (block, 100%, padding, text-center)
- [x] Ajouter `.koi-card-cta--primary` (bg rouge, blanc)
- [x] Ajouter `.koi-card-cta--secondary` (ghost bordeaux)
- [x] Ajouter `.koi-card-cert`  bloc certificat en bas de card (bg wine-10, border, flex)
- [x] Ajouter `.koi-card-cert-icon`  icône certificat (font-size)
- [x] Ajouter `.editorial` = `.koi-card-editorial` (position relative, border-radius, overflow, bg noir)
- [x] Ajouter `.editorial__overlay` = `.koi-card-editorial__overlay` (gradient bottom)
- [x] Ajouter `.editorial__content` = `.koi-card-editorial__content` (position absolute, bottom, flex)
- [x] Ajouter `.editorial__badge` = `.koi-card-editorial__badges` (flex, gap)
- [x] Ajouter `.editorial__title` = `.koi-card-editorial__name` (serif, clamp, blanc)
- [x] Ajouter `.editorial__sub` = `.koi-card-editorial__sub` (base, blanc/70)
- [x] Ajouter `.editorial__cta` = `.koi-card-editorial__cta` (flex col, align-end)
- [x] Ajouter `.editorial__price` = `.koi-card-editorial__price` (serif, 3xl, rouge)
- [x] Ajouter `.koi-showcase`, `.koi-showcase__inner`, `.koi-showcase__header`, `.koi-showcase__footer`, `.koi-showcase__link`
- [x] Ajouter `.title-line`  ligne décorative sous titre (border-bottom rouge, width fixe)

### `product.css`  aliaser la convention page produit

- [x] Ajouter `.product`  wrapper page (max-width, margin auto)
- [x] Ajouter `.product-grid` = `.koi-detail` (grid 2 col, gap, padding)
- [x] Ajouter `.breadcrumb`, `.breadcrumb-inner`  fil d'Ariane (padding, font-sm, couleur n-55)
- [x] Ajouter `.gallery` = `.koi-detail__gallery` (flex col, gap)
- [x] Ajouter `.gallery-main` = `.koi-detail__main-img` (ratio 3/4, border-radius, overflow)
- [x] Ajouter `.gallery-thumbs` = `.koi-detail__thumbs` (grid 3 col, gap)
- [x] Ajouter `.gallery-thumb` = `.koi-detail__thumb` (ratio 1/1, border, cursor, transition)
- [x] Ajouter `.gallery-track`  wrapper interne de défilement
- [x] Ajouter `.info` = `.koi-detail__info` (flex col, gap)
- [x] Ajouter `.info-header`  zone titre + badges en haut de la colonne info
- [x] Ajouter `.info-meta`, `.info-meta-badge`  rangée de badges sous le titre
- [x] Ajouter `.specs` = `.koi-detail__specs` (grid 2 col)
- [x] Ajouter `.specs-grid`  alias ou wrapper de `.specs`
- [x] Ajouter `.spec` = `.spec-item` (flex col, gap)
- [x] Ajouter `.spec-label` = `.spec-item__label` (xs, 700, uppercase, n-55)
- [x] Ajouter `.spec-value` = `.spec-item__value` (base, 600, noir)
- [x] Ajouter `.description` = `.koi-detail__description` (base, n-75, line-height)
- [x] Ajouter `.price-block`  bloc prix (flex col, gap)
- [x] Ajouter `.price-block-header`  label + prix sur même ligne
- [x] Ajouter `.price-label`  "Prix" ou "À partir de" (xs, n-55)
- [x] Ajouter `.price-currency`  symbole € en exposant dans contexte produit
- [x] Ajouter `.price-availability`  mention disponibilité sous le prix (sm, n-55)
- [x] Ajouter `.cta-whatsapp` = `.koi-detail__wa` (flex, bg vert, blanc, border-radius, transition)
- [x] Ajouter `.cta-note` = `.koi-detail__price-note` (sm, n-55, margin-top)
- [x] Ajouter `.certifications`  section certificats (flex col, gap)
- [x] Ajouter `.cert-header`  ligne titre + icône en tête du bloc
- [x] Ajouter `.cert-icon` = `.koi-detail__cert-icon` (font-size 1.8rem, flex-shrink 0)
- [x] Ajouter `.cert-text` = `.koi-detail__cert-text` (flex col)
- [x] Ajouter `.cert-title`  titre h4 dans bloc cert (sm, 700, wine)
- [x] Ajouter `.konishi` (contexte produit)  variante cert ou badge partenariat Konishi
- [x] Ajouter `.related`, `.related-inner`  section "Koïs similaires" (padding, max-width)
- [x] Ajouter `.related-grid` = `.koi-grid` (grid 3 col, gap)

### `catalogue.css`  aliaser la convention page

- [x] Ajouter `.catalogue` = `.catalogue-section` (padding, max-width, margin auto)
- [x] Ajouter `.catalogue__inner`  wrapper interne
- [x] Ajouter `.filter-count` = `.filter-bar__count` (margin-left auto, sm, n-55)

### `forms.css`  aliaser les noms page

- [x] Ajouter `.form-submit` = `.contact-form__submit` (btn primary, full-width, margin-top)
- [x] Ajouter `.form-note` = `.contact-form__note` (sm, n-55, text-center, margin-top)
- [x] Ajouter `.contact-section`, `.contact-section__inner`  layout page contact (grid 2 col, padding)
- [x] Ajouter `.contact-info`  colonne infos droite page contact (flex col, gap)
- [x] Ajouter `.info-item`  ligne icône + texte (flex, align-center, gap)
- [x] Ajouter `.info-item__icon`  icône (font-size 1.5rem, flex-shrink 0, couleur wine)
- [x] Ajouter `.info-item__text`  texte à droite de l'icône (sm, n-75)
- [x] Ajouter `.info-list`  liste d'items (flex col, gap)
- [x] Ajouter `.map-placeholder`  bloc carte placeholder (bg n-08, border-radius, aspect 4/3, flex center)
- [x] Ajouter `.contact-quick`  section contact rapide home (bg noir, padding)
- [x] Ajouter `.contact-quick__inner`  grid 2 col (texte + formulaire)
- [x] Ajouter `.contact-quick__left`  colonne gauche titres + infos
- [x] Ajouter `.contact-quick__info`  bloc infos de contact (flex col, gap)

### `farm.css`  aliaser la convention page decouvrir

- [x] Ajouter `.story`, `.story__inner`  section storytelling (max-width, padding)
- [x] Ajouter `.story-block`  bloc texte + image (grid 2 col, gap, align-items center)
- [x] Ajouter `.story-block--reverse`  variante inversée (image à gauche)
- [x] Ajouter `.story-block__img`  image du bloc story (border-radius, overflow, aspect 4/3)
- [x] Ajouter `.story-block__body`  colonne texte (flex col, gap)
- [x] Ajouter `.story-block__label` = `.decouvrir-story__label` (xs, rouge, uppercase)
- [x] Ajouter `.story-block__title` = `.decouvrir-story__title` (serif, 3xl, noir)
- [x] Ajouter `.story-block__text` = `.decouvrir-story__body` (base, n-75, line-height)
- [x] Ajouter `.gallery__inner` = `.farm-gallery__inner` (max-width, margin auto)
- [x] Ajouter `.gallery__title` = `.farm-gallery__title` (serif, 3xl, noir)
- [x] Ajouter `.gallery-grid` = `.gallery-row-1` (grid 2fr 1fr, gap)
- [x] Ajouter `.gallery-row2` = `.gallery-row-2` (grid 3 col, gap)
- [x] Ajouter `.gallery-cell--right` = `.gallery-cell--wide` (aspect 4/3)

### `konishi.css`  aliaser nom image

- [x] Ajouter `.konishi-band__img` = `.konishi-band__img-wrap` (position relative, border-radius, aspect 4/3)

### `shop.css`  aliaser la convention page

- [x] Ajouter `.shop-category` = `.shop-group` (margin-bottom)
- [x] Ajouter `.shop-category__title` = `.shop-group__title` (serif, 2xl, border-bottom)
- [x] Ajouter `.konishi-info`, `.konishi-info__inner`, `.konishi-info__logo`, `.konishi-info__text`, `.konishi-info__title`  bloc info Konishi page nourriture

### `atoms-media.css`  aliaser wave

- [x] Ajouter `.wave` = `.wave-divider` (display block, width 100%, line-height 0, overflow hidden)

### Nouveau fichier `azukari.css` (styles entièrement uniques)

- [x] Créer `VISITORS/assets/css/azukari.css`
- [x] Ajouter `.azukari-desc`, `.azukari-desc__inner`, `.azukari-desc__text`  section descriptive
- [x] Ajouter `.azukari-features`  grille de features (grid 3 col ou flex wrap)
- [x] Ajouter `.azukari-feature`, `.azukari-feature__icon`, `.azukari-feature__text`  card feature azukari
- [x] Ajouter `.cta-full`, `.cta-full__inner`, `.cta-full__btn`, `.cta-full__note`  CTA pleine largeur
- [x] Ajouter `azukari.css` dans le manifest `visitor.css`

---

## Violations 200 lignes  `VISITORS/` (non-exceptions)

- [x] `organisms/header.html` (121 lignes après refactor  commit 358e337)
- [x] `molecules/nav-header.html` (118 lignes après refactor  commit 358e337)
- [x] `organisms/koi-showcase.html` (87 lignes après refactor  commit 358e337)
- [x] `organisms/koi-detail.html` (108 lignes après refactor  commit 358e337)

---

## Icônes  voir `docs/todo_emojis.md` pour l'inventaire complet

- [ ] Remplacer les 19 emojis dans `pages/materiel.html`, `pages/nourriture.html`, `pages/soins.html`, `pages/azukari.html` (shop-cards)
- [ ] Remplacer les icônes d'info : 📍 📋 🚚 💬 dans `pages/contact.html`, `pages/home.html`, `organisms/features.html`
- [ ] Remplacer 📷 placeholder photo dans `organisms/farm-gallery.html`
- [ ] Remplacer 📜 certificat dans `organisms/koi-detail.html`
- [ ] Dupliquer les SVG ajoutés dans `molecules/shop-card.html` et `organisms/shop-section.html` (icônes ⚙️ 💧 ☀️ partagées)
