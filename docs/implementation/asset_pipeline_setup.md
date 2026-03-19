# Asset Pipeline Setup — Rails 8 + Sprockets

> Configuration exacte pour migrer les assets depuis `ADMIN/` et `VISITORS/`
> vers le pipeline Rails standard.

---

## Rails 8 Default Stack

```
JS  : Importmap (pas de bundler)
CSS : Sprockets (require_tree)
```

Pour ce projet, nous utilisons **Sprockets** pour le CSS (simple, compatible avec l'architecture existante) et **Importmap** pour le JS (pas de Node.js requis).

---

## 1. Gemfile

```ruby
# Gemfile
gem "sprockets-rails"          # Pipeline CSS (inclus par défaut dans Rails 8)
gem "importmap-rails"          # Importmap pour JS (inclus par défaut)
gem "stimulus-rails"           # Stimulus (Hotwire)
gem "turbo-rails"              # Turbo (Hotwire)

# Images
gem "image_processing", "~> 1.2"   # Si Active Storage
# gem "cloudinary"                  # Alternative si Cloudinary direct

# Dev tools
gem "dartsass-rails"           # OPTIONNEL : si on veut Sass (pas nécessaire ici)
```

---

## 2. Structure des Assets

```
app/assets/
├── stylesheets/
│   ├── application.css        ← Manifest CSS public
│   ├── admin.css              ← Manifest CSS admin
│   ├── shared/
│   │   ├── variables.css      ← Tokens V3 unifiés (source de vérité)
│   │   ├── base.css           ← Reset, body, ::selection
│   │   ├── fonts.css          ← @font-face declarations
│   │   ├── badge.css          ← Badge composant partagé
│   │   ├── price.css          ← Prix composant partagé
│   │   ├── button.css         ← Boutons partagés
│   │   └── whatsapp.css       ← CTA WhatsApp flottant
│   ├── visitors/
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── hero.css
│   │   ├── koi-card.css
│   │   ├── catalogue.css
│   │   ├── product.css
│   │   ├── shop.css
│   │   ├── farm.css
│   │   ├── features.css
│   │   ├── konishi.css
│   │   ├── forms.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── decouvrir.css
│   │       ├── azukari.css
│   │       ├── materiel.css
│   │       ├── soins.css
│   │       └── nourriture.css
│   └── admin/
│       ├── layout.css         ← Sidebar + topbar + grid
│       ├── components.css     ← Boutons, stat-cards, badges
│       ├── forms.css          ← Formulaires admin
│       ├── tables.css         ← Tables
│       ├── utilities.css      ← Utilitaires
│       ├── login.css          ← Page de connexion
│       └── pages/
│           ├── dashboard.css
│           ├── koi-form.css
│           ├── order-form.css
│           ├── client-form.css
│           └── accounting.css
├── images/
│   ├── kois-story-logo.svg
│   ├── kois-story-logo-white.svg
│   ├── koi-placeholder.jpg
│   └── ...
└── fonts/
    ├── inter/
    │   ├── Inter-Regular.woff2
    │   ├── Inter-Medium.woff2
    │   ├── Inter-SemiBold.woff2
    │   └── Inter-Bold.woff2
    └── playfair-display/
        ├── PlayfairDisplay-Regular.woff2
        └── PlayfairDisplay-Bold.woff2

app/javascript/
├── application.js             ← Importmap entry point
├── controllers/
│   ├── index.js               ← Enregistrement Stimulus
│   ├── application.js         ← Stimulus Application instance
│   ├── header_controller.js
│   ├── filter_controller.js
│   ├── gallery_controller.js
│   ├── sidebar_controller.js
│   ├── order_form_controller.js
│   ├── animation_controller.js
│   └── table_controller.js
```

---

## 3. Manifests CSS

### `app/assets/stylesheets/application.css` (Public)

```css
/*
 * Koi's Story — Public CSS Manifest
 * ===================================
 *= require shared/variables
 *= require shared/fonts
 *= require shared/base
 *= require shared/badge
 *= require shared/price
 *= require shared/button
 *= require shared/whatsapp
 *= require visitors/header
 *= require visitors/footer
 *= require visitors/hero
 *= require visitors/koi-card
 *= require visitors/catalogue
 *= require visitors/product
 *= require visitors/shop
 *= require visitors/farm
 *= require visitors/features
 *= require visitors/konishi
 *= require visitors/forms
 *= require_self
 */
```

### `app/assets/stylesheets/admin.css` (Admin)

```css
/*
 * Koi's Story — Admin CSS Manifest
 * ===================================
 *= require shared/variables
 *= require shared/fonts
 *= require shared/base
 *= require shared/badge
 *= require shared/button
 *= require admin/layout
 *= require admin/components
 *= require admin/forms
 *= require admin/tables
 *= require admin/utilities
 *= require admin/login
 *= require_self
 */
```

---

## 4. Layouts — Sélection du CSS

```erb
<!-- app/views/layouts/application.html.erb -->
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>

<!-- app/views/layouts/admin.html.erb -->
<%= stylesheet_link_tag "admin", "data-turbo-track": "reload" %>
```

Pour les CSS spécifiques à une page (taille trop lourde pour inclure partout) :
```erb
<!-- Dans une vue individuelle -->
<% content_for :head_css do %>
  <%= stylesheet_link_tag "visitors/pages/koi-form-specific" %>
<% end %>
```

---

## 5. Polices (@font-face)

### Migration des polices

```bash
# Copier depuis docs/fonts/ vers app/assets/fonts/
cp -r docs/fonts/inter app/assets/fonts/inter
cp -r docs/fonts/playfair-display app/assets/fonts/playfair-display
```

### `app/assets/stylesheets/shared/fonts.css`

```css
/* Inter — Corps */
@font-face {
  font-family: 'Inter';
  src: url('<%= asset_path("inter/Inter-Regular.woff2") %>') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('<%= asset_path("inter/Inter-Medium.woff2") %>') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('<%= asset_path("inter/Inter-SemiBold.woff2") %>') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('<%= asset_path("inter/Inter-Bold.woff2") %>') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Playfair Display — Titres */
@font-face {
  font-family: 'Playfair Display';
  src: url('<%= asset_path("playfair-display/PlayfairDisplay-Regular.woff2") %>') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Playfair Display';
  src: url('<%= asset_path("playfair-display/PlayfairDisplay-Bold.woff2") %>') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Note :** Les fichiers CSS dans `app/assets/stylesheets/` sont traités par ERB si renommés `.css.erb`. Utiliser `asset_path` uniquement dans les fichiers `.css.erb`. Pour CSS pur (`.css`), utiliser des chemins relatifs Sprockets :

```css
/* Alternative sans ERB (CSS pur) */
@font-face {
  font-family: 'Inter';
  src: font-url('inter/Inter-Regular.woff2') format('woff2');
  /* font-url() est un helper Sprockets */
}
```

---

## 6. Images

### Dans les vues ERB

```erb
<%# Logo %>
<%= image_tag "kois-story-logo.svg", alt: "Koi's Story", class: "site-logo__img" %>

<%# Image koi avec Cloudinary %>
<%= image_tag koi.images.first.url,
    alt: koi.name,
    loading: "lazy",
    width: 800,
    height: 600,
    class: "koi-thumb__img" %>

<%# Placeholder si pas d'image %>
<%= image_tag "koi-placeholder.jpg", alt: "Koï sans photo" %>
```

### Dans le CSS

```css
/* Ne pas référencer des images dans le CSS — utiliser des backgrounds inline dans les vues */
/* Si nécessaire pour des éléments décoratifs (patterns, textures) : */
.body-texture {
  background-image: image-url('texture-sakura.png'); /* Sprockets helper */
}
```

---

## 7. Importmap JS

### `config/importmap.rb`

```ruby
# config/importmap.rb
pin "application"
pin "@hotwired/turbo-rails",      to: "turbo.min.js",              preload: true
pin "@hotwired/stimulus",          to: "stimulus.min.js"
pin "@hotwired/stimulus-loading",  to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
```

### `app/javascript/application.js`

```js
// app/javascript/application.js
import "@hotwired/turbo-rails"
import "controllers"
```

### `app/javascript/controllers/application.js`

```js
// app/javascript/controllers/application.js
import { Application } from "@hotwired/stimulus"
const application = Application.start()
application.debug = false
window.Stimulus   = application
export { application }
```

### `app/javascript/controllers/index.js`

```js
// app/javascript/controllers/index.js
import { application } from "controllers/application"

import { HeaderController }     from "controllers/header_controller"
import { FilterController }     from "controllers/filter_controller"
import { GalleryController }    from "controllers/gallery_controller"
import { SidebarController }    from "controllers/sidebar_controller"
import { OrderFormController }  from "controllers/order_form_controller"
import { AnimationController }  from "controllers/animation_controller"
import { TableController }      from "controllers/table_controller"

application.register("header",      HeaderController)
application.register("filter",      FilterController)
application.register("gallery",     GalleryController)
application.register("sidebar",     SidebarController)
application.register("order-form",  OrderFormController)
application.register("animation",   AnimationController)
application.register("table",       TableController)
```

---

## 8. config/initializers/assets.rb

```ruby
# config/initializers/assets.rb
# Ajouter les dossiers de fonts et d'assets spéciaux au pipeline
Rails.application.config.assets.paths << Rails.root.join("app/assets/fonts")

# Précompiler les manifests CSS non-standard (admin.css)
Rails.application.config.assets.precompile += %w[admin.css]
```

---

## 9. Precompilation Production

```bash
# Sur le VPS
RAILS_ENV=production bundle exec rails assets:precompile

# Vérifier les fichiers générés
ls -la public/assets/
```

Les fichiers générés auront un fingerprint (digest) :
```
application-abc123.css
admin-def456.css
inter/Inter-Regular-ghi789.woff2
```

Les helpers `stylesheet_link_tag` et `asset_path` gèrent le fingerprint automatiquement.

---

## 10. Biome — Maintien en Rails

Le fichier `biome.json` à la racine reste valide pour les fichiers JS Stimulus :

```json
{
  "files": {
    "includes": [
      "app/javascript/**",
      "app/assets/stylesheets/**",
      "!**/*.html",
      "!**/*.erb",
      "!public/**"
    ]
  },
  "linter": {
    "rules": {
      "complexity": {
        "noImportantStyles": "warn"
      }
    }
  }
}
```

```bash
# Linter les assets Rails
npx biome check app/javascript app/assets/stylesheets

# Formatter
npx biome format --write app/javascript app/assets/stylesheets
```

---

## 11. Checklist Finale Assets

- [ ] Polices copiées dans `app/assets/fonts/`
- [ ] `@font-face` mis à jour avec `font-url()` ou `asset_path` (ERB)
- [ ] Images copiées dans `app/assets/images/`
- [ ] `application.css` manifest correct (tous les modules listés)
- [ ] `admin.css` manifest correct
- [ ] `config/initializers/assets.rb` configuré (admin.css précompilé)
- [ ] `config/importmap.rb` configuré (tous les controllers pinned)
- [ ] `RAILS_ENV=production rails assets:precompile` testé ✅
- [ ] Tokens unifiés dans `shared/variables.css` (ADMIN + VISITORS)
- [ ] Biome configuré pour les nouveaux chemins Rails
- [ ] Aucun `<style>` inline dans les layouts ou vues
- [ ] Aucune police Google Fonts (tout est en local)
