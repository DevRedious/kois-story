# Component Mapping — HTML Prototype → Rails Partials

> Mapping exhaustif de chaque composant HTML statique vers son équivalent Rails.
> Format : `Source HTML` → `app/views/.../_partial.html.erb`

---

## VISITORS — Atoms

| HTML Source | Rails Partial | Notes |
|-------------|---------------|-------|
| `VISITORS/atoms/badge.html` | `app/views/shared/_badge.html.erb` | Passer `type:` et `label:` en locals |
| `VISITORS/atoms/button.html` | `app/views/shared/_button.html.erb` | Ou utiliser `link_to` avec classes CSS |
| `VISITORS/atoms/price.html` | `app/views/shared/_price.html.erb` | `number_to_currency` Rails helper |
| `VISITORS/atoms/koi-thumb.html` | `app/views/kois/_thumb.html.erb` | `image_tag` + `loading: "lazy"` |
| `VISITORS/atoms/logo.html` | `app/views/shared/_logo.html.erb` | `image_tag` depuis assets |
| `VISITORS/atoms/icon-wa.html` | Intégré dans `_whatsapp_cta.html.erb` | SVG inline ou icon helper |
| `VISITORS/atoms/input.html` | Géré par `form_with` | Utiliser `f.text_field`, `f.select`, etc. |
| `VISITORS/atoms/wave-divider.html` | `app/views/shared/_wave_divider.html.erb` | SVG statique, toujours identique |

### Exemple : `_badge.html.erb`

```erb
<%# app/views/shared/_badge.html.erb %>
<%# Locals: type (string), label (string) %>
<span class="badge badge--<%= type %>"><%= label %></span>
```

### Exemple : `_price.html.erb`

```erb
<%# app/views/shared/_price.html.erb %>
<%# Locals: amount (decimal), currency (string, default "€") %>
<span class="price">
  <span class="price__amount"><%= number_to_currency(amount, unit: "€", separator: ",", delimiter: " ", format: "%n %u") %></span>
  <span class="price__vat">TTC</span>
</span>
```

### Exemple : `_thumb.html.erb`

```erb
<%# app/views/kois/_thumb.html.erb %>
<%# Locals: koi (Koi model instance) %>
<div class="koi-thumb">
  <% if koi.images.any? %>
    <%= image_tag koi.images.order(:position).first.url,
        alt: koi.name,
        loading: "lazy",
        class: "koi-thumb__img" %>
  <% else %>
    <%= image_tag "koi-placeholder.jpg",
        alt: "Koï sans photo",
        class: "koi-thumb__img koi-thumb__img--placeholder" %>
  <% end %>
  <% if koi.konishi_lineage? %>
    <%= render "shared/badge", type: "konishi", label: "Konishi" %>
  <% end %>
</div>
```

---

## VISITORS — Molecules

| HTML Source | Rails Partial | Notes |
|-------------|---------------|-------|
| `VISITORS/molecules/koi-card.html` | `app/views/kois/_card.html.erb` | Reçoit `koi` en local |
| `VISITORS/molecules/koi-card--editorial.html` | `app/views/kois/_card_editorial.html.erb` | Variante homepage showcase |
| `VISITORS/molecules/cta-whatsapp.html` | `app/views/shared/_whatsapp_cta.html.erb` | Helper pour construire l'URL wa.me |
| `VISITORS/molecules/filter-bar.html` | `app/views/kois/_filters.html.erb` | `form_with url: kois_path, method: :get` |
| `VISITORS/molecules/nav-header.html` | Intégré dans `shared/_header.html.erb` | Trop couplé au header pour être isolé |
| `VISITORS/molecules/contact-form.html` | `app/views/messages/_form.html.erb` | `form_with model: @message` |
| `VISITORS/molecules/shop-card.html` | `app/views/products/_card.html.erb` | Reçoit `product` en local |

### Exemple : `kois/_card.html.erb`

```erb
<%# app/views/kois/_card.html.erb %>
<%# Locals: koi (Koi model instance) %>
<article class="koi-card" data-koi-id="<%= koi.id %>">
  <%= render "kois/thumb", koi: koi %>

  <div class="koi-card__body">
    <div class="koi-card__badges">
      <%= render "shared/badge", type: "variety", label: koi.variety %>
      <%= render "shared/badge", type: "age", label: koi.human_attribute_name(:age_class) %>
      <% if koi.konishi_lineage? %>
        <%= render "shared/badge", type: "konishi", label: "Konishi" %>
      <% end %>
    </div>

    <h3 class="koi-card__name"><%= koi.name %></h3>

    <dl class="koi-card__meta">
      <dt>Taille</dt>
      <dd><%= koi.size_cm %> cm</dd>
      <% if koi.sex != "unknown" %>
        <dt>Sexe</dt>
        <dd><%= koi.sex.capitalize %></dd>
      <% end %>
    </dl>

    <div class="koi-card__footer">
      <%= render "shared/price", amount: koi.price %>
      <%= render "shared/whatsapp_cta", koi: koi, size: "sm" %>
    </div>
  </div>
</article>
```

### Exemple : `kois/_filters.html.erb`

```erb
<%# app/views/kois/_filters.html.erb %>
<div class="filter-bar" data-controller="filter">
  <%= form_with url: kois_path, method: :get, data: { turbo_frame: "kois_list" } do |f| %>
    <div class="filter-bar__group">
      <%= f.label :variety, "Variété" %>
      <%= f.select :variety,
          Koi.distinct.pluck(:variety).sort,
          { include_blank: "Toutes" },
          class: "filter-select" %>
    </div>

    <div class="filter-bar__group">
      <%= f.label :age_class, "Âge" %>
      <%= f.select :age_class,
          Koi.age_classes.keys.map { |k| [k.humanize, k] },
          { include_blank: "Tous" },
          class: "filter-select" %>
    </div>

    <div class="filter-bar__group">
      <%= f.label :price_max, "Prix max" %>
      <%= f.number_field :price_max, placeholder: "€", class: "filter-input" %>
    </div>

    <div class="filter-bar__group">
      <%= f.check_box :konishi, class: "filter-toggle" %>
      <%= f.label :konishi, "Lignée Konishi uniquement" %>
    </div>

    <div class="filter-bar__group">
      <%= f.submit "Filtrer", class: "btn btn-primary" %>
      <%= link_to "Réinitialiser", kois_path, class: "btn btn-ghost" %>
    </div>
  <% end %>
</div>
```

### Exemple : `messages/_form.html.erb`

```erb
<%# app/views/messages/_form.html.erb %>
<%= form_with model: @message, class: "contact-form" do |f| %>
  <% if @message.errors.any? %>
    <div class="form-errors" role="alert">
      <ul>
        <% @message.errors.full_messages.each do |msg| %>
          <li><%= msg %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <div class="form-group">
    <%= f.label :sender_name, "Nom" %>
    <%= f.text_field :sender_name, required: true, class: "form-input" %>
  </div>

  <div class="form-group">
    <%= f.label :sender_email, "Email" %>
    <%= f.email_field :sender_email, required: true, class: "form-input" %>
  </div>

  <div class="form-group">
    <%= f.label :body, "Message" %>
    <%= f.text_area :body, required: true, rows: 5, class: "form-textarea" %>
  </div>

  <div class="form-group">
    <%= f.submit "Envoyer", class: "btn btn-primary" %>
  </div>
<% end %>
```

---

## VISITORS — Organisms

| HTML Source | Rails Partial | Notes |
|-------------|---------------|-------|
| `VISITORS/organisms/header.html` | `app/views/shared/_header.html.erb` | Inclus dans `application.html.erb` |
| `VISITORS/organisms/footer.html` | `app/views/shared/_footer.html.erb` | Inclus dans `application.html.erb` |
| `VISITORS/organisms/hero.html` | `app/views/shared/_hero.html.erb` | Locals: `title:`, `subtitle:`, `cta_text:`, `cta_path:` |
| `VISITORS/organisms/koi-showcase.html` | `app/views/kois/_showcase.html.erb` | Reçoit collection `kois` |
| `VISITORS/organisms/koi-detail.html` | `app/views/kois/_detail.html.erb` | Reçoit `koi` — utilisé dans `kois/show` |
| `VISITORS/organisms/farm-gallery.html` | `app/views/shared/_farm_gallery.html.erb` | Collection d'images statiques |
| `VISITORS/organisms/features.html` | `app/views/shared/_features.html.erb` | Features section homepage |
| `VISITORS/organisms/konishi-band.html` | `app/views/shared/_konishi_band.html.erb` | Bannière statique |
| `VISITORS/organisms/shop-section.html` | `app/views/products/_section.html.erb` | Reçoit collection `products` |

### Exemple : `shared/_header.html.erb`

```erb
<%# app/views/shared/_header.html.erb %>
<header class="site-header" data-controller="header" id="site-header">
  <div class="site-header__inner">
    <div class="site-logo">
      <%= link_to root_path, class: "site-logo__link", aria: { label: "Koi's Story — Accueil" } do %>
        <%= image_tag "kois-story-logo.svg", alt: "Koi's Story", class: "site-logo__img" %>
      <% end %>
    </div>

    <nav class="nav-pill" aria-label="Navigation principale">
      <ul class="nav-pill__list">
        <li class="nav-pill__item">
          <%= link_to "Catalogue", kois_path,
              class: "nav-pill__link #{"nav-pill__link--active" if current_page?(kois_path)}" %>
        </li>
        <li class="nav-pill__item">
          <%= link_to "Découvrir", decouvrir_path,
              class: "nav-pill__link #{"nav-pill__link--active" if current_page?(decouvrir_path)}" %>
        </li>
        <%# ... autres items ... %>
      </ul>
      <span class="nav-pill__indicator" aria-hidden="true"></span>
    </nav>

    <button class="nav-burger" aria-label="Ouvrir le menu" aria-expanded="false"
            data-action="click->header#toggleMenu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <%# Mobile dropdown %>
  <div class="nav-dropdown" data-header-target="dropdown">
    <%# ... même liens ... %>
  </div>
</header>
```

---

## VISITORS — Templates → Layouts

| HTML Source | Rails Layout |
|-------------|--------------|
| `VISITORS/templates/visitor-layout.html` | `app/views/layouts/application.html.erb` |

### Exemple : `layouts/application.html.erb`

```erb
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= content_for?(:title) ? yield(:title) + " — Koi's Story" : "Koi's Story" %></title>
    <meta name="description" content="<%= content_for?(:description) ? yield(:description) : "Koi's Story — Koïs de lignée Konishi, breeder Manu & Mathilde, Miribel." %>">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body class="<%= controller_name %> <%= action_name %>">
    <%= render "shared/header" %>

    <main id="main-content" tabindex="-1">
      <% if notice %>
        <div class="flash flash--notice" role="status"><%= notice %></div>
      <% end %>
      <% if alert %>
        <div class="flash flash--alert" role="alert"><%= alert %></div>
      <% end %>

      <%= yield %>
    </main>

    <%= render "shared/footer" %>

    <%= render "shared/whatsapp_cta" %>
  </body>
</html>
```

---

## ADMIN — Atoms

| HTML Source | Rails Partial |
|-------------|---------------|
| `ADMIN/atoms/badge.html` | `app/views/admin/shared/_badge.html.erb` |
| `ADMIN/atoms/button.html` | Via Rails `link_to` + classes CSS |
| `ADMIN/atoms/input-atom.html` | Via `f.text_field`, `f.select`, etc. |
| `ADMIN/atoms/stat-card.html` | `app/views/admin/dashboard/_stat_card.html.erb` |
| `ADMIN/atoms/avatar.html` | `app/views/admin/shared/_avatar.html.erb` |
| `ADMIN/atoms/toggle.html` | `app/views/admin/shared/_toggle.html.erb` |

---

## ADMIN — Molecules

| HTML Source | Rails Partial |
|-------------|---------------|
| `ADMIN/molecules/koi-admin.html` (row) | `app/views/admin/kois/_row.html.erb` |
| `ADMIN/molecules/messages-ui.html` | `app/views/admin/messages/_row.html.erb` |
| `ADMIN/molecules/filter-bar.html` | `app/views/admin/shared/_filter_bar.html.erb` |
| `ADMIN/molecules/client-row.html` | `app/views/admin/client_profiles/_row.html.erb` |

### Exemple : `admin/kois/_row.html.erb`

```erb
<%# app/views/admin/kois/_row.html.erb %>
<tr class="table-row">
  <td><%= koi.id %></td>
  <td>
    <div class="koi-admin-thumb">
      <% if koi.images.any? %>
        <%= image_tag koi.images.first.url, alt: koi.name, class: "thumb-sm" %>
      <% end %>
      <span><%= koi.name %></span>
    </div>
  </td>
  <td><%= koi.variety %></td>
  <td><%= koi.human_attribute_name(:age_class) %></td>
  <td><%= koi.size_cm %> cm</td>
  <td><%= number_to_currency(koi.price, unit: "€", separator: ",") %></td>
  <td>
    <%= render "admin/shared/badge",
        type: koi.status,
        label: koi.status.humanize %>
  </td>
  <td class="table-actions">
    <%= link_to "Voir", admin_koi_path(koi), class: "btn btn-sm btn-ghost" %>
    <%= link_to "Éditer", edit_admin_koi_path(koi), class: "btn btn-sm btn-outline" %>
    <%= link_to "Supprimer", admin_koi_path(koi),
        method: :delete,
        data: { turbo_method: :delete, turbo_confirm: "Supprimer ce koï ?" },
        class: "btn btn-sm btn-danger" %>
  </td>
</tr>
```

---

## ADMIN — Organisms

| HTML Source | Rails Partial |
|-------------|---------------|
| `ADMIN/organisms/sidebar.html` | `app/views/admin/shared/_sidebar.html.erb` |
| `ADMIN/organisms/topbar.html` | `app/views/admin/shared/_topbar.html.erb` |
| `ADMIN/organisms/kois-table.html` | `app/views/admin/kois/index.html.erb` (vue complète) |
| `ADMIN/organisms/messages-table.html` | `app/views/admin/messages/index.html.erb` |

### Exemple : `admin/shared/_sidebar.html.erb`

```erb
<%# app/views/admin/shared/_sidebar.html.erb %>
<aside class="sidebar" id="sidebar" data-controller="sidebar">
  <div class="sidebar__header">
    <%= image_tag "kois-story-logo.svg", alt: "Koi's Story", class: "sidebar__logo" %>
  </div>

  <nav class="sidebar__nav" aria-label="Navigation admin">
    <ul class="nav-list">
      <li class="nav-item <%= "active" if controller_name == "dashboard" %>">
        <%= link_to admin_root_path, class: "nav-item__link" do %>
          <span class="nav-item__icon">&#9632;</span>
          <span class="nav-item__label">Dashboard</span>
        <% end %>
      </li>
      <li class="nav-item <%= "active" if controller_name == "kois" %>">
        <%= link_to admin_kois_path, class: "nav-item__link" do %>
          <span class="nav-item__icon">&#9632;</span>
          <span class="nav-item__label">Koïs</span>
        <% end %>
      </li>
      <li class="nav-item <%= "active" if controller_name == "messages" %>">
        <%= link_to admin_messages_path, class: "nav-item__link" do %>
          <span class="nav-item__icon">&#9632;</span>
          <span class="nav-item__label">Messages</span>
          <% unread_count = Message.unread.count %>
          <% if unread_count > 0 %>
            <span class="badge badge--count"><%= unread_count %></span>
          <% end %>
        <% end %>
      </li>
      <%# ... autres items ... %>
    </ul>
  </nav>

  <div class="sidebar__footer">
    <%= link_to "Déconnexion", destroy_user_session_path,
        data: { turbo_method: :delete },
        class: "btn btn-outline btn-sm logout-btn" %>
  </div>
</aside>
```

---

## ADMIN — Templates → Layouts

| HTML Source | Rails Layout |
|-------------|--------------|
| `ADMIN/templates/admin-layout.html` | `app/views/layouts/admin.html.erb` |

### Exemple : `layouts/admin.html.erb`

```erb
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= content_for?(:title) ? yield(:title) + " — Admin Koi's Story" : "Admin — Koi's Story" %></title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "admin", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body class="admin-layout">
    <%= render "admin/shared/sidebar" %>

    <div class="admin-main" id="admin-main">
      <%= render "admin/shared/topbar" %>

      <main class="admin-content" id="main-content">
        <% if notice %>
          <div class="flash flash--notice" role="status"><%= notice %></div>
        <% end %>
        <% if alert %>
          <div class="flash flash--alert" role="alert"><%= alert %></div>
        <% end %>

        <%= yield %>
      </main>
    </div>

    <div class="overlay" id="overlay" data-sidebar-target="overlay"></div>
  </body>
</html>
```

---

## Pages Publiques → Vues

| Page HTML | Vue Rails | Controller |
|-----------|-----------|------------|
| `VISITORS/pages/home.html` | `app/views/home/index.html.erb` | `Home::IndexController` |
| `VISITORS/pages/kois.html` | `app/views/kois/index.html.erb` | `KoisController#index` |
| `VISITORS/pages/product.html` | `app/views/kois/show.html.erb` | `KoisController#show` |
| `VISITORS/pages/decouvrir.html` | `app/views/pages/decouvrir.html.erb` | `PagesController#decouvrir` |
| `VISITORS/pages/azukari.html` | `app/views/pages/azukari.html.erb` | `PagesController#azukari` |
| `VISITORS/pages/materiel.html` | `app/views/pages/materiel.html.erb` | `PagesController#materiel` |
| `VISITORS/pages/soins.html` | `app/views/pages/soins.html.erb` | `PagesController#soins` |
| `VISITORS/pages/nourriture.html` | `app/views/pages/nourriture.html.erb` | `PagesController#nourriture` |
| `VISITORS/pages/contact.html` | `app/views/messages/new.html.erb` | `MessagesController#new` |

## Pages Admin → Vues

| Page HTML | Vue Rails | Controller |
|-----------|-----------|------------|
| `ADMIN/pages/dashboard.html` | `app/views/admin/dashboard/index.html.erb` | `Admin::DashboardController#index` |
| `ADMIN/pages/kois.html` | `app/views/admin/kois/index.html.erb` | `Admin::KoisController#index` |
| `ADMIN/pages/koi-form.html` | `app/views/admin/kois/new.html.erb` / `edit.html.erb` | `Admin::KoisController` |
| `ADMIN/pages/messages.html` | `app/views/admin/messages/index.html.erb` | `Admin::MessagesController#index` |
| `ADMIN/pages/clients.html` | `app/views/admin/client_profiles/index.html.erb` | `Admin::ClientProfilesController#index` |
| `ADMIN/pages/orders.html` | `app/views/admin/orders/index.html.erb` | `Admin::OrdersController#index` |
| `ADMIN/pages/payments.html` | `app/views/admin/payments/index.html.erb` | `Admin::PaymentsController#index` |
| `ADMIN/pages/products.html` | `app/views/admin/products/index.html.erb` | `Admin::ProductsController#index` |
| `ADMIN/pages/accounting.html` | `app/views/admin/accounting/index.html.erb` | `Admin::AccountingController#index` |
| `ADMIN/pages/login.html` | `app/views/devise/sessions/new.html.erb` | Devise |
