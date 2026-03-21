# Rails Migration Plan — Koi's Story

> Deadline Beta : **23/03/2026**
> Point de départ : prototypes HTML/CSS/JS (ADMIN + VISITORS)
> Objectif : application Rails fonctionnelle conforme aux critères THP

---

## Vue d'Ensemble

```
Phase 1 — Rails Init & Database     (J1–J2)
Phase 2 — Models & Migrations       (J2–J3)
Phase 3 — Auth Devise               (J3–J4)
Phase 4 — Layout & Assets           (J4–J5)
Phase 5 — Public Pages              (J5–J7)
Phase 6 — Admin CRUD                (J7–J10)
Phase 7 — Contact & Mailer          (J10–J11)
Phase 8 — Cloudinary API            (J11–J13)
Phase 9 — JS → Stimulus             (J13–J15)
Phase 10 — Seeds & Tests            (J15–J17)
Phase 11 — Production Deploy        (J17–J18)
```

---

## Phase 1 — Rails Init & Database Setup

### Actions

```bash
# Dans le dossier parent (pas dans kois-story/)
rails new kois-story \
  --database=sqlite3 \
  --asset-pipeline=sprockets \
  --javascript=importmap
# NOTE: pas de --css= flag — on utilise le CSS custom du prototype (VISITORS + ADMIN)

cd kois-story
bundle install
rails db:create
```

### Configuration Initiale

```ruby
# config/application.rb
config.time_zone = "Paris"
config.i18n.default_locale = :fr

# Gemfile — ajouter
gem 'devise'
gem 'cloudinary'
gem 'carrierwave'         # ou Active Storage
gem 'pagy'                # pagination catalogue kois
gem 'image_processing'    # si Active Storage

group :development do
  gem 'letter_opener'     # preview mailer en dev
  gem 'annotate'          # annotations models
end
```

---

## Phase 2 — Models & Migrations

### Ordre de Migration (RESPECTER CET ORDRE)

```bash
# 1. Users (avant tout — Devise)
rails generate devise User
# Ajouter dans la migration générée :
# t.integer :role, default: 0, null: false

# 2. Kois
rails generate model Koi \
  name:string \
  variety:string \
  age_class:integer \
  age:integer \
  sex:integer \
  size_cm:integer \
  price:decimal \
  status:integer \
  konishi_lineage:boolean \
  description:text \
  user:references

# 3. Images (polymorphic)
rails generate model Image \
  url:string \
  alt:string \
  position:integer \
  imageable:references{polymorphic}

# 4. Tags
rails generate model Tag \
  name:string \
  category:integer

# 5. KoiTags (join table)
rails generate model KoiTag \
  koi:references \
  tag:references

# 6. Messages
rails generate model Message \
  sender_name:string \
  sender_email:string \
  body:text \
  read:boolean

# 7. Products
rails generate model Product \
  name:string \
  reference:string \
  description:text \
  price:decimal \
  stock_quantity:integer \
  category:integer \
  status:integer

# 8. ClientProfiles
rails generate model ClientProfile \
  name:string \
  phone:string \
  address:string \
  notes:text \
  user:references

# 9. Orders
rails generate model Order \
  status:integer \
  total_amount:decimal \
  notes:text \
  client_profile:references

# 10. OrderItems
rails generate model OrderItem \
  quantity:integer \
  unit_price:decimal \
  order:references

# Ajouter manuellement dans la migration OrderItem :
# t.references :koi, null: true, foreign_key: true
# t.references :product, null: true, foreign_key: true

# 11. Payments
rails generate model Payment \
  amount:decimal \
  payment_type:integer \
  status:integer \
  paid_at:datetime \
  due_at:datetime \
  order:references

# 12. NewsletterSubscribers (dormant V2)
rails generate model NewsletterSubscriber \
  email:string \
  name:string \
  active:boolean \
  subscribed_at:datetime

rails db:migrate
```

### Models — Code à Écrire

```ruby
# app/models/user.rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { visitor: 0, client: 1, admin: 2 }

  has_one :client_profile, dependent: :destroy
  has_many :kois, foreign_key: :user_id  # kois créés par l'admin
end

# app/models/koi.rb
class Koi < ApplicationRecord
  belongs_to :user

  has_many :koi_tags, dependent: :destroy
  has_many :tags, through: :koi_tags
  has_many :images, as: :imageable, dependent: :destroy
  has_many :order_items

  enum age_class: { tosai: 0, jumbo_tosai: 1, nisai: 2, sansai: 3, yonsai: 4, gosai: 5 }
  enum sex:       { unknown: 0, male: 1, female: 2 }
  enum status:    { available: 0, sold_out: 1, incoming: 2 }

  validates :name, presence: true
  validates :variety, presence: true
  validates :price, numericality: { greater_than: 0 }, allow_nil: true

  scope :available,        -> { where(status: :available) }
  scope :by_variety,       ->(v) { where(variety: v) if v.present? }
  scope :by_age_class,     ->(a) { where(age_class: a) if a.present? }
  scope :by_sex,           ->(s) { where(sex: s) if s.present? }
  scope :price_lte,        ->(p) { where("price <= ?", p) if p.present? }
  scope :konishi,          -> { where(konishi_lineage: true) }
  scope :by_size_range,    ->(min, max) { where(size_cm: min..max) if min.present? && max.present? }
end

# app/models/message.rb
class Message < ApplicationRecord
  validates :sender_name,  presence: true
  validates :sender_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :body,         presence: true

  scope :unread, -> { where(read: false) }

  after_create :send_admin_notification

  private

  def send_admin_notification
    ContactMailer.new_message(self).deliver_later
  end
end
```

---

## Phase 3 — Auth Devise

### Vues Custom (5 Obligatoires)

```bash
rails generate devise:views
```

Personnaliser dans `app/views/devise/` :
1. `sessions/new.html.erb` — page login
2. `registrations/new.html.erb` — register (désactivé pour visiteurs)
3. `registrations/edit.html.erb` — edit profile
4. `passwords/new.html.erb` — forgot password
5. `passwords/edit.html.erb` — reset password

Style : reprendre `ADMIN/pages/login.html` pour la vue login.

### ApplicationController

```ruby
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def require_admin
    redirect_to root_path, alert: "Accès non autorisé" unless current_user&.admin?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
  end
end
```

---

## Phase 4 — Layout & Assets

### Layouts

```bash
# Créer les deux layouts
touch app/views/layouts/application.html.erb
touch app/views/layouts/admin.html.erb
```

Reprendre `VISITORS/templates/visitor-layout.html` → `application.html.erb`
Reprendre `ADMIN/templates/admin-layout.html` → `admin.html.erb`

### CSS — Asset Pipeline

```
app/assets/stylesheets/
├── application.css          ← manifest public
├── admin.css                ← manifest admin
├── shared/
│   ├── variables.css        ← tokens unifiés (ADMIN + VISITORS)
│   ├── base.css
│   ├── fonts.css
│   └── badge.css
├── visitors/
│   ├── header.css
│   ├── footer.css
│   ├── hero.css
│   ├── koi-card.css
│   ├── catalogue.css
│   ├── product.css
│   └── ...
└── admin/
    ├── layout.css
    ├── components.css
    ├── forms.css
    ├── tables.css
    └── ...
```

**Action critique** : fusionner `--rouge-vif` (ADMIN) et `--c-red` (VISITORS) en un seul token dans `shared/variables.css`.

### Fonts

```bash
cp -r docs/fonts/inter app/assets/fonts/inter
cp -r docs/fonts/playfair-display app/assets/fonts/playfair-display
```

Mettre à jour les `@font-face` dans `shared/fonts.css` :
```css
src: url('<%= asset_path("inter/Inter-Regular.woff2") %>') format('woff2');
```

### Importmap & JS

```ruby
# config/importmap.rb
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
```

---

## Phase 5 — Pages Publiques

### Ordre d'Implémentation

1. **`home#index`** — page la plus visible, hero + koi-showcase
2. **`kois#index`** — catalogue avec filtres (fonctionnalité principale)
3. **`kois#show`** — fiche produit koi
4. **`pages#decouvrir`** — contenu statique (biographie client)
5. **`pages#azukari`** — contenu statique
6. **`pages#materiel`** — contenu statique
7. **`pages#soins`** — contenu statique
8. **`pages#nourriture`** — contenu statique

### Routes

```ruby
# config/routes.rb
Rails.application.routes.draw do
  devise_for :users

  root "home#index"

  resources :kois, only: [:index, :show]
  resources :messages, only: [:new, :create]

  get "/decouvrir",  to: "pages#decouvrir",  as: :decouvrir
  get "/azukari",    to: "pages#azukari",    as: :azukari
  get "/materiel",   to: "pages#materiel",   as: :materiel
  get "/soins",      to: "pages#soins",      as: :soins
  get "/nourriture", to: "pages#nourriture", as: :nourriture

  namespace :admin do
    root "dashboard#index"
    resources :kois
    resources :messages, only: [:index, :show, :update, :destroy]
    resources :products
    resources :orders
    resources :clients, controller: "client_profiles"
    resources :payments, only: [:index, :show, :update]
  end
end
```

### Controller Kois

```ruby
# app/controllers/kois_controller.rb
class KoisController < ApplicationController
  def index
    @kois = Koi.available
    @kois = @kois.by_variety(params[:variety])
    @kois = @kois.by_age_class(params[:age_class])
    @kois = @kois.by_sex(params[:sex])
    @kois = @kois.price_lte(params[:price_max])
    @kois = @kois.konishi if params[:konishi] == "1"
    @kois = @kois.order(:variety, :price)
  end

  def show
    @koi = Koi.find(params[:id])
  end
end
```

---

## Phase 6 — Admin CRUD

### Namespace Admin

```ruby
# app/controllers/admin/base_controller.rb
class Admin::BaseController < ApplicationController
  layout "admin"
  before_action :authenticate_user!
  before_action :require_admin
end

# app/controllers/admin/kois_controller.rb
class Admin::KoisController < Admin::BaseController
  before_action :set_koi, only: [:show, :edit, :update, :destroy]

  def index
    @kois = Koi.includes(:images, :tags).order(:variety, :name)
  end

  def new
    @koi = Koi.new
  end

  def create
    @koi = Koi.new(koi_params)
    @koi.user = current_user
    if @koi.save
      redirect_to admin_kois_path, notice: "Koï créé avec succès"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @koi.update(koi_params)
      redirect_to admin_kois_path, notice: "Koï mis à jour"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @koi.destroy
    redirect_to admin_kois_path, notice: "Koï supprimé"
  end

  private

  def set_koi
    @koi = Koi.find(params[:id])
  end

  def koi_params
    params.require(:koi).permit(
      :name, :variety, :age_class, :age, :sex,
      :size_cm, :price, :status, :konishi_lineage, :description
    )
  end
end
```

---

## Phase 7 — Contact & Mailer

```bash
rails generate mailer ContactMailer
```

```ruby
# app/mailers/contact_mailer.rb
class ContactMailer < ApplicationMailer
  default to: "contact.koistory@gmail.com"

  def new_message(message)
    @message = message
    mail(
      from:    message.sender_email,
      subject: "[Koi's Story] Nouveau message de #{message.sender_name}"
    )
  end
end
```

```erb
<!-- app/views/contact_mailer/new_message.html.erb -->
<h2>Nouveau message reçu</h2>
<p><strong>De :</strong> <%= @message.sender_name %> (<%= @message.sender_email %>)</p>
<p><strong>Message :</strong></p>
<p><%= simple_format @message.body %></p>
```

```ruby
# config/environments/production.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address:              ENV["SMTP_HOST"],
  port:                 587,
  user_name:            ENV["SMTP_USER"],
  password:             ENV["SMTP_PASSWORD"],
  authentication:       "plain",
  enable_starttls_auto: true
}
```

---

## Phase 8 — Cloudinary API

```ruby
# Gemfile
gem 'cloudinary'
gem 'carrierwave'

# config/initializers/cloudinary.rb
Cloudinary.config do |config|
  config.cloud_name = ENV["CLOUDINARY_CLOUD_NAME"]
  config.api_key    = ENV["CLOUDINARY_API_KEY"]
  config.api_secret = ENV["CLOUDINARY_API_SECRET"]
  config.secure     = true
end

# app/uploaders/koi_image_uploader.rb
class KoiImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  version :thumb do
    process resize_to_fill: [400, 300]
  end

  version :card do
    process resize_to_fill: [800, 600]
  end
end
```

---

## Phase 9 — JS → Stimulus

Voir `docs/implementation/stimulus_controller_examples.js` pour le code détaillé.

### Mapping Complet

```bash
rails generate stimulus header
rails generate stimulus filter
rails generate stimulus gallery
rails generate stimulus animation
rails generate stimulus sidebar
rails generate stimulus koi-form
rails generate stimulus order-form
```

### HTML Data Attributes

```erb
<!-- Avant (HTML statique) -->
<div id="filter-bar" class="filter-bar">

<!-- Après (Stimulus) -->
<div data-controller="filter"
     data-filter-count-value="0"
     class="filter-bar">
```

---

## Phase 10 — Seeds & Tests

### Seeds

```ruby
# db/seeds.rb
puts "Creating admin user..."
admin = User.find_or_create_by!(email: "contact.koistory@gmail.com") do |u|
  u.password = "admin123456"
  u.role     = :admin
end

puts "Creating koi varieties tags..."
varieties = [
  "Kohaku", "Sanke", "Showa", "Bekko", "Utsuri",
  "Asagi", "Shusui", "Koromo", "Goshiki", "Kinginrin",
  "Kawarimono", "Hikari Muji", "Hikari Utsurimono",
  "Hikari Moyo", "Tancho", "Kumonryu", "Benigoi",
  "Chagoi", "Soragoi", "Ochiba", "Goromo", "Kujaku",
  "Hariwake", "Yamabuki", "Doitsu", "Butterfly"
]

varieties.each do |v|
  Tag.find_or_create_by!(name: v, category: :variety)
end

puts "Creating sample kois..."
# ... (voir seeds.rb complet dans docs/implementation/)
```

---

## Phase 11 — Production Deploy

### Checklist Déploiement

```bash
# Sur le VPS
RAILS_ENV=production rails db:migrate
RAILS_ENV=production rails db:seed
RAILS_ENV=production rails assets:precompile

# Variables d'environnement requises
RAILS_MASTER_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASSWORD=...
```

---

## Dépendances entre Phases

```
Phase 1 (Init)
    └── Phase 2 (Models)
            ├── Phase 3 (Auth)
            │       └── Phase 6 (Admin CRUD)
            ├── Phase 4 (Layout/Assets)
            │       └── Phase 5 (Public Pages)
            │               └── Phase 7 (Mailer)
            └── Phase 8 (Cloudinary)
                    └── Phase 9 (Stimulus)
                            └── Phase 10 (Seeds + Tests)
                                    └── Phase 11 (Deploy)
```

## Risques

| Risque | Phase | Mitigation |
|--------|-------|------------|
| Cloudinary credentials non reçus | 8 | Utiliser images placeholder (picsum.photos) en dev |
| SMTP VPS bloqué | 7 | Tester Mailjet (1000 mails/mois gratuit) |
| SQLite locks en production | 11 | Configurer `database.yml` avec WAL mode |
| Seeds 26 variétés lourds | 10 | Loader en batch, pas de fixtures |
| Stimulus + Turbo conflicts | 9 | Utiliser `connect()` au lieu de DOMContentLoaded |
