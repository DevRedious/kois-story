# Partials Structure — Rails App

> Structure cible complète du dossier `app/views/` après migration.

---

## Arborescence Complète

```
app/views/
│
├── layouts/
│   ├── application.html.erb       ← Layout public (header + footer + whatsapp CTA)
│   ├── admin.html.erb             ← Layout admin (sidebar + topbar)
│   └── mailer/
│       ├── html.html.erb          ← Layout emails HTML
│       └── text.text.erb          ← Layout emails texte
│
├── shared/                        ← Partials communs (public + layout)
│   ├── _header.html.erb           ← Header navigation (VISITORS/organisms/header.html)
│   ├── _footer.html.erb           ← Footer (VISITORS/organisms/footer.html)
│   ├── _hero.html.erb             ← Section hero (VISITORS/organisms/hero.html)
│   ├── _badge.html.erb            ← Badge générique (VISITORS/atoms/badge.html)
│   ├── _price.html.erb            ← Affichage prix TTC (VISITORS/atoms/price.html)
│   ├── _whatsapp_cta.html.erb     ← CTA WhatsApp flottant (VISITORS/molecules/cta-whatsapp.html)
│   ├── _konishi_band.html.erb     ← Bandeau Konishi (VISITORS/organisms/konishi-band.html)
│   ├── _features.html.erb         ← Section features (VISITORS/organisms/features.html)
│   ├── _farm_gallery.html.erb     ← Galerie ferme (VISITORS/organisms/farm-gallery.html)
│   ├── _wave_divider.html.erb     ← Séparateur SVG (VISITORS/atoms/wave-divider.html)
│   └── _flash.html.erb            ← Messages flash (notice / alert)
│
├── home/
│   └── index.html.erb             ← Page d'accueil (VISITORS/pages/home.html)
│
├── kois/
│   ├── index.html.erb             ← Catalogue kois (VISITORS/pages/kois.html)
│   ├── show.html.erb              ← Fiche produit (VISITORS/pages/product.html)
│   ├── _card.html.erb             ← Carte koi (VISITORS/molecules/koi-card.html)
│   ├── _card_editorial.html.erb   ← Carte éditoriale homepage (koi-card--editorial.html)
│   ├── _thumb.html.erb            ← Miniature koi (VISITORS/atoms/koi-thumb.html)
│   ├── _filters.html.erb          ← Barre de filtres (VISITORS/molecules/filter-bar.html)
│   ├── _showcase.html.erb         ← Section showcase (VISITORS/organisms/koi-showcase.html)
│   └── _detail.html.erb           ← Detail bloc (VISITORS/organisms/koi-detail.html)
│
├── messages/
│   ├── new.html.erb               ← Page contact (VISITORS/pages/contact.html)
│   └── _form.html.erb             ← Formulaire contact (VISITORS/molecules/contact-form.html)
│
├── pages/
│   ├── decouvrir.html.erb         ← Page découvrir (VISITORS/pages/decouvrir.html)
│   ├── azukari.html.erb           ← Page azukari (VISITORS/pages/azukari.html)
│   ├── materiel.html.erb          ← Page matériel (VISITORS/pages/materiel.html)
│   ├── soins.html.erb             ← Page soins (VISITORS/pages/soins.html)
│   └── nourriture.html.erb        ← Page nourriture (VISITORS/pages/nourriture.html)
│
├── products/
│   ├── _card.html.erb             ← Carte produit (VISITORS/molecules/shop-card.html)
│   └── _section.html.erb          ← Section boutique (VISITORS/organisms/shop-section.html)
│
├── admin/
│   ├── shared/
│   │   ├── _sidebar.html.erb      ← Sidebar admin (ADMIN/organisms/sidebar.html)
│   │   ├── _topbar.html.erb       ← Topbar admin (ADMIN/organisms/topbar.html)
│   │   ├── _badge.html.erb        ← Badge admin (ADMIN/atoms/badge.html)
│   │   ├── _avatar.html.erb       ← Avatar utilisateur (ADMIN/atoms/avatar.html)
│   │   ├── _stat_card.html.erb    ← Carte statistique (ADMIN/atoms/stat-card.html)
│   │   ├── _filter_bar.html.erb   ← Barre recherche (ADMIN/molecules/filter-bar.html)
│   │   └── _toggle.html.erb       ← Toggle switch (ADMIN/atoms/toggle.html)
│   │
│   ├── dashboard/
│   │   └── index.html.erb         ← Dashboard (ADMIN/pages/dashboard.html)
│   │
│   ├── kois/
│   │   ├── index.html.erb         ← Liste kois admin (ADMIN/pages/kois.html)
│   │   ├── show.html.erb          ← Détail koi admin
│   │   ├── new.html.erb           ← Formulaire nouveau koi (ADMIN/pages/koi-form.html)
│   │   ├── edit.html.erb          ← Formulaire édition koi
│   │   ├── _form.html.erb         ← Partial formulaire partagé new/edit
│   │   └── _row.html.erb          ← Ligne tableau (ADMIN/molecules/koi-admin.html)
│   │
│   ├── messages/
│   │   ├── index.html.erb         ← Liste messages (ADMIN/pages/messages.html)
│   │   ├── show.html.erb          ← Détail message
│   │   └── _row.html.erb          ← Ligne tableau (ADMIN/molecules/messages-ui.html)
│   │
│   ├── client_profiles/
│   │   ├── index.html.erb         ← Liste clients (ADMIN/pages/clients.html)
│   │   ├── show.html.erb
│   │   ├── new.html.erb
│   │   ├── edit.html.erb
│   │   ├── _form.html.erb
│   │   └── _row.html.erb          ← (ADMIN/molecules/client-row.html)
│   │
│   ├── orders/
│   │   ├── index.html.erb         ← Liste commandes (ADMIN/pages/orders.html)
│   │   ├── show.html.erb
│   │   ├── new.html.erb
│   │   ├── edit.html.erb
│   │   └── _form.html.erb         ← Formulaire dynamique (ADMIN/pages/order-form.html)
│   │
│   ├── products/
│   │   ├── index.html.erb         ← Liste produits (ADMIN/pages/products.html)
│   │   ├── new.html.erb
│   │   ├── edit.html.erb
│   │   └── _form.html.erb
│   │
│   └── payments/
│       ├── index.html.erb         ← Liste paiements (ADMIN/pages/payments.html)
│       └── show.html.erb
│
├── devise/                        ← Vues Devise customisées (5 obligatoires THP)
│   ├── sessions/
│   │   └── new.html.erb           ← Login (ADMIN/pages/login.html)
│   ├── registrations/
│   │   ├── new.html.erb           ← Register
│   │   └── edit.html.erb          ← Edit profile
│   └── passwords/
│       ├── new.html.erb           ← Forgot password
│       └── edit.html.erb          ← Reset password
│
├── contact_mailer/
│   ├── new_message.html.erb       ← Email HTML (nouveau message contact)
│   └── new_message.text.erb       ← Email texte
│
└── order_mailer/                  ← Si OrderMailer implémenté (optionnel V1)
    ├── confirmation.html.erb
    └── confirmation.text.erb
```

---

## Règles de Nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Partial | Préfixe `_` | `_card.html.erb` |
| Collection | `render @kois` utilise `_koi.html.erb` | Automatique Rails |
| Locals | Nommage explicite | `render "kois/card", koi: koi` |
| Namespace | Sous-dossier | `admin/kois/_row.html.erb` |

---

## Partials avec Locals — Convention

Tous les partials documentent leurs locals en commentaire ERB en première ligne :

```erb
<%# Locals: koi (Koi), show_price: (boolean, default true) %>
```

---

## Partials Réutilisés — Usage

### `shared/_badge.html.erb`

```erb
<%# Utilisé dans : koi-card, koi show, admin koi row %>
<%= render "shared/badge", type: "konishi", label: "Konishi" %>
<%= render "shared/badge", type: "variety", label: koi.variety %>
<%= render "shared/badge", type: koi.status, label: koi.status.humanize %>
```

### `shared/_price.html.erb`

```erb
<%# Utilisé dans : koi-card, koi show, admin koi row %>
<%= render "shared/price", amount: koi.price %>
```

### `shared/_whatsapp_cta.html.erb`

```erb
<%# Utilisé dans : layout application (flottant), koi show (bouton fixe) %>
<%= render "shared/whatsapp_cta" %>
<%= render "shared/whatsapp_cta", koi: @koi, variant: "product" %>
```

### `kois/_card.html.erb`

```erb
<%# Collection rendering — Rails génère automatiquement l'itération %>
<%= render @kois %>
<%# Équivalent à : %>
<% @kois.each do |koi| %>
  <%= render "kois/card", koi: koi %>
<% end %>
```

---

## ApplicationHelper — Helpers de Vue

```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  # Construit l'URL WhatsApp pré-remplie pour un koï
  def whatsapp_koi_url(koi, phone:)
    message = "Bonjour, je suis intéressé(e) par le koï #{koi.name} " \
              "(#{koi.variety}, #{koi.size_cm} cm). Pourriez-vous me donner plus d'infos ?"
    "https://wa.me/#{phone}?text=#{CGI.escape(message)}"
  end

  # Affiche le statut d'un koï avec la classe CSS correspondante
  def koi_status_badge(koi)
    label = case koi.status
            when "available" then "Disponible"
            when "sold_out"  then "Vendu"
            when "incoming"  then "À venir"
            end
    render "shared/badge", type: koi.status, label: label
  end

  # Chemin de l'image principale d'un koï (ou placeholder)
  def koi_main_image_url(koi)
    if koi.images.any?
      koi.images.order(:position).first.url
    else
      "https://placehold.co/800x600/000/fff?text=#{CGI.escape(koi.name)}"
    end
  end

  # Classe active pour le lien de navigation courant
  def nav_link_class(path)
    current_page?(path) ? "nav-pill__link nav-pill__link--active" : "nav-pill__link"
  end
end
```
