# Rails MVP - Implementation Plan

> Oral blanc THP - 2026-03-20
> Target: working MVP in ~5h from scratch
> This document is the single source of truth. Follow it in order. Do not skip steps.

---

## Architecture Overview — How VISITORS and ADMIN communicate

They do not communicate directly. **They share the same database through the same models.**

```
┌─────────────────────────────────────┐
│           DATABASE                  │
│    kois, messages, users, images... │
└──────────────┬──────────────────────┘
               │ same models
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────┐
│  VISITORS   │  │    ADMIN    │
│  /kois      │  │ /admin/kois │
│  /kois/:id  │  │ /admin/...  │
│             │  │             │
│  layout:    │  │  layout:    │
│  application│  │  admin      │
│  .html.erb  │  │  .html.erb  │
│             │  │             │
│  visitors/  │  │  admin/     │
│  CSS + JS   │  │  CSS + JS   │
└─────────────┘  └─────────────┘
```

Mathilde creates a koi in ADMIN → it immediately appears in the VISITORS catalogue. Same `kois` table, same `Koi` model.

**Separation is enforced at three levels:**

1. **Routes** — `namespace :admin` isolates all admin URLs under `/admin/`
2. **Controllers** — `Admin::BaseController` blocks access with `before_action :require_admin!`
3. **Layouts** — `layouts/application.html.erb` (visitors CSS/JS) vs `layouts/admin.html.erb` (admin CSS/JS)

VISITORS controllers are read-only (index, show). ADMIN controllers have full CRUD.
The `Admin::BaseController` is the single security gate — all admin controllers inherit from it.

---

## Detailed Reference Docs — Read These Too

These docs in `docs/audit/` and `docs/implementation/` contain information that complements this plan. Read them at the relevant step:

| Doc | When to read | What it contains |
|-----|-------------|-----------------|
| `docs/audit/COMPONENT_MAPPING.md` | Step 10 (Views) | Exhaustive HTML → ERB partial mapping with full code examples for every component |
| `docs/implementation/partials_structure.md` | Step 10 (Views) | Complete `app/views/` directory tree with source file for every partial |
| `docs/implementation/asset_pipeline_setup.md` | Step 1 (Rails new) | Exact Sprockets + Importmap config for this project |
| `docs/implementation/stimulus_controller_examples.js` | After MVP | Stimulus controllers for post-MVP JS migration |
| `docs/audit/THP_COMPLIANCE_CHECKLIST.md` | Step 12 (Verification) | Full THP requirements checklist — run through it before demo |
| `docs/audit/RISKS_AND_BLOCKERS.md` | Now | All known blockers and mitigations |

---

## CRITICAL - Files to Never Touch

These exist already and must not be modified or deleted:

```
ADMIN/              - back-office HTML/CSS/JS prototype (reference)
VISITORS/           - public site HTML/CSS/JS prototype (reference)
docs/               - project documentation
.github/            - CI/CD workflows
CHANGELOG.md
CONTRIBUTORS.md
CONTRIBUTING.md
cliff.toml
biome.json
.gitattributes
```

---

## THP Eliminatory Requirements - Checklist

Every item below is eliminatory at the oral. Verify each one before presenting.

- [ ] RESTful routes ONLY - no custom POST routes outside standard CRUD
- [ ] All code and README.md in English - no French in code
- [ ] Rails helpers for all links and images - no hardcoded `<a href>` or `<img src>`
- [ ] Devise with 5 views generated and functional
- [ ] ActionMailer working in production (contact form sends email to admin)
- [ ] At least 1 external API integrated (Cloudinary for images)
- [ ] Fat model / skinny controller - business logic in models only
- [ ] No isolated model - every model must relate to at least one other
- [ ] has_many :through only for N-N - no has_and_belongs_to_many
- [ ] db/seeds.rb with demo data (all 26 koi varieties covered)

---

## Step 1 - Rails Scaffold (15 min)

Run from inside `kois-story/`:

```bash
rails new . --skip-git --database=sqlite3 --asset-pipeline=sprockets --javascript=importmap
```

When prompted for conflicts:
- `README.md` - answer `n` (keep existing)
- `.gitignore` - answer `Y` (let Rails overwrite, we will add back our entries)

Then:

```bash
bundle install
rails db:create
```

After `.gitignore` is overwritten, add these lines at the bottom:

```
# Project specific
.env
.env.*
!.env.example
```

---

## Step 2 - Gems to Add in Gemfile (5 min)

Add to Gemfile:

```ruby
# Auth
gem 'devise'
gem 'devise-two-factor'  # 2FA infrastructure — dormant in MVP
gem 'rotp'               # TOTP code generation
gem 'rqrcode'            # QR code for 2FA setup

# Images
gem 'cloudinary'
gem 'carrierwave'
gem 'carrierwave-cloudinary'

# Env
gem 'dotenv-rails'
```

Development/test group:

```ruby
group :development do
  gem 'letter_opener'  # Preview emails in browser instead of sending
end
```

Then:

```bash
bundle install
```

---

## Step 3 - Environment Variables (5 min)

Create `.env` at root:

```
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailer (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=contact.koistory@gmail.com
APP_HOST=votredomaine.com

# 2FA (generate with: rails secret | head -c 32)
OTP_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Admin seed password
ADMIN_PASSWORD=changeme
```

Create `.env.example` at root (same keys, empty values):

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
ADMIN_EMAIL=
APP_HOST=
OTP_SECRET_KEY=
ADMIN_PASSWORD=
```

---

## Step 4 - Devise Setup (20 min)

```bash
rails generate devise:install
rails generate devise User
rails generate devise:views
```

Edit the generated migration to add all extra columns:

```ruby
# db/migrate/TIMESTAMP_devise_create_users.rb
# Add inside create_table :users block:
t.integer :role, default: 0, null: false

# devise-two-factor columns (dormant for MVP)
t.string  :otp_secret
t.integer :consumed_timestep
t.boolean :otp_required_for_login, default: false, null: false
```

Edit `app/models/user.rb`:

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :two_factor_authenticatable,
         otp_secret_encryption_key: ENV['OTP_SECRET_KEY']

  enum role: { visitor: 0, admin: 1 }
  # admin? is auto-generated by the enum above — do NOT redefine it manually

  # 2FA is built but NOT enforced in MVP.
  # To activate: set otp_required_for_login: true on the admin user
  # and add before_action :authenticate_with_otp! in Admin::BaseController.
end
```

**IMPORTANT — disable public registration.** Visitors do not need accounts in V1. Mathilde and Manu are created via seeds only. The Devise views still exist in `app/views/devise/` (THP requires 5 views — they just need to exist).

In `config/routes.rb`, replace the generated `devise_for :users` with:

```ruby
devise_for :users, skip: [:registrations]
```

This removes `/users/sign_up` entirely. Accounts are managed only via `rails console` or `seeds.rb`.

Access summary:
- `/users/sign_in` — admin login (Mathilde/Manu, by direct URL only — no link in public navbar)
- `/users/sign_up` — disabled, route does not exist
- `/users/password/new` — password reset (Devise default, keep it)
- `/admin` — redirects to sign_in if not authenticated, then to dashboard

Edit `config/environments/development.rb` - add at the bottom inside the block:

```ruby
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Edit `config/routes.rb` - add root route:

```ruby
root 'home#index'
```

---

## Step 5 - Models (45 min)

Generate in this exact order:

```bash
rails generate model Koi name:string variety:string age_class:integer age:integer sex:integer size_cm:integer price:decimal konishi_lineage:boolean description:text status:integer user:references

rails generate model Image url:string alt:string position:integer imageable:references{polymorphic}

rails generate model Tag name:string category:integer

rails generate model KoiTag koi:references tag:references

rails generate model Message sender_name:string sender_email:string body:text read:boolean

# After generating Message, manually add default to read column in the migration:
# t.boolean :read, default: false, null: false
```

### Edit app/models/koi.rb

```ruby
class Koi < ApplicationRecord
  belongs_to :user
  has_many :koi_tags, dependent: :destroy
  has_many :tags, through: :koi_tags
  has_many :images, as: :imageable, dependent: :destroy

  enum status: { available: 0, sold_out: 1, incoming: 2 }
  enum sex: { unknown: 0, male: 1, female: 2 }
  enum age_class: { tosai: 0, jumbo_tosai: 1, nisai: 2, sansai: 3, yonsai: 4, gosai: 5 }

  validates :name, :variety, :price, :status, presence: true
  validates :price, numericality: { greater_than: 0 }

  # NOTE: do NOT add `scope :available` — the enum above auto-generates Koi.available
  # Adding it manually causes ArgumentError at boot.
  scope :konishi, -> { where(konishi_lineage: true) }

  def self.filter(params)
    kois = all
    kois = kois.where(variety: params[:variety]) if params[:variety].present?
    kois = kois.where(age_class: params[:age_class]) if params[:age_class].present?
    kois = kois.where(sex: params[:sex]) if params[:sex].present?
    kois = kois.where('size_cm <= ?', params[:max_size]) if params[:max_size].present?
    kois = kois.where('price <= ?', params[:max_price]) if params[:max_price].present?
    kois = kois.where(status: :available) if params[:available].present?
    kois
  end
end
```

### Edit app/models/image.rb

```ruby
class Image < ApplicationRecord
  mount_uploader :url, ImageUploader

  belongs_to :imageable, polymorphic: true
  validates :url, presence: true
end
```

### Edit app/models/tag.rb

```ruby
class Tag < ApplicationRecord
  has_many :koi_tags, dependent: :destroy
  has_many :kois, through: :koi_tags

  enum category: { variety: 0, age_class: 1, size_range: 2 }

  validates :name, :category, presence: true
end
```

### Edit app/models/koi_tag.rb

```ruby
class KoiTag < ApplicationRecord
  belongs_to :koi
  belongs_to :tag
end
```

### Edit app/models/message.rb

```ruby
class Message < ApplicationRecord
  validates :sender_name, :sender_email, :body, presence: true
  validates :sender_email, format: { with: URI::MailTo::EMAIL_REGEXP }

  after_create :notify_admin

  def mark_as_read!
    update!(read: true)
  end

  private

  def notify_admin
    MessageMailer.new_message(self).deliver_now
  end
end
```

Run migrations:

```bash
rails db:migrate
```

---

## Step 6 - Cloudinary Setup (15 min)

Create `config/initializers/cloudinary.rb`:

```ruby
Cloudinary.config do |config|
  config.cloud_name = ENV['CLOUDINARY_CLOUD_NAME']
  config.api_key    = ENV['CLOUDINARY_API_KEY']
  config.api_secret = ENV['CLOUDINARY_API_SECRET']
  config.secure     = true
end
```

Create `app/uploaders/image_uploader.rb`:

```ruby
class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def public_id
    "kois-story/#{model.class.name.downcase}/#{model.id}"
  end
end
```

---

## Step 7 - ActionMailer (20 min)

### SMTP provider: Resend

- Create account at https://resend.com (free tier: 3000 emails/month)
- Add a verified domain or use the sandbox for dev
- Get the API key from the Resend dashboard
- No gem needed — standard Rails SMTP config

### config/environments/development.rb

```ruby
config.action_mailer.delivery_method = :letter_opener
config.action_mailer.perform_deliveries = true
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

### config/environments/production.rb

```ruby
config.action_mailer.delivery_method = :smtp
config.action_mailer.perform_deliveries = true
config.action_mailer.default_url_options = { host: ENV['APP_HOST'] }
config.action_mailer.smtp_settings = {
  address:              'smtp.resend.com',
  port:                 587,
  domain:               ENV['APP_HOST'],
  user_name:            'resend',
  password:             ENV['RESEND_API_KEY'],
  authentication:       :plain,
  enable_starttls_auto: true
}
```

### Generate mailer

```bash
rails generate mailer MessageMailer
```

Edit `app/mailers/message_mailer.rb`:

```ruby
class MessageMailer < ApplicationMailer
  default to: -> { ENV['ADMIN_EMAIL'] },
          from: "Koi's Story <contact.koistory@gmail.com>"

  def new_message(message)
    @message = message
    mail(subject: "[Koi's Story] New message from #{message.sender_name}")
  end
end
```

Create `app/views/message_mailer/new_message.html.erb`:

```erb
<h2>New message from <%= @message.sender_name %></h2>
<p><strong>Email:</strong> <%= @message.sender_email %></p>
<p><strong>Message:</strong></p>
<p><%= @message.body %></p>
```

Create `app/views/message_mailer/new_message.text.erb`:

```
New message from <%= @message.sender_name %>
Email: <%= @message.sender_email %>

<%= @message.body %>
```

---

## Step 8 - Controllers (30 min)

```bash
rails generate controller Home index
rails generate controller Pages decouvrir materiel soins nourriture azukari
rails generate controller Kois index show
rails generate controller Messages create
rails generate controller Admin::Kois index show new create edit update destroy
rails generate controller Admin::Messages index show update
```

### app/controllers/home_controller.rb

```ruby
class HomeController < ApplicationController
  def index
    @featured_kois = Koi.available.includes(:images).limit(6)
  end
end
```

### app/controllers/pages_controller.rb

```ruby
class PagesController < ApplicationController
  def decouvrir; end
  def materiel; end
  def soins; end
  def nourriture; end
  def azukari; end
end
```

### app/controllers/kois_controller.rb

```ruby
class KoisController < ApplicationController
  def index
    @kois = Koi.filter(params).includes(:images).order(created_at: :desc)
    @varieties = Koi.distinct.pluck(:variety).sort
  end

  def show
    @koi = Koi.find(params[:id])
    @images = @koi.images
  end
end
```

### app/controllers/messages_controller.rb

```ruby
class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to root_path, notice: 'Your message has been sent.'
    else
      redirect_to root_path, alert: 'Please fill in all fields.'
    end
  end

  private

  def message_params
    params.require(:message).permit(:sender_name, :sender_email, :body)
  end
end
```

### app/controllers/admin/base_controller.rb

Create this file manually:

```ruby
module Admin
  class BaseController < ApplicationController
    before_action :authenticate_user!
    before_action :require_admin!

    private

    def require_admin!
      redirect_to root_path, alert: 'Access denied.' unless current_user.admin?
    end
  end
end
```

### app/controllers/admin/kois_controller.rb

```ruby
module Admin
  class KoisController < Admin::BaseController
    before_action :set_koi, only: [:show, :edit, :update, :destroy]

    def index
      @kois = Koi.includes(:images).order(created_at: :desc)
    end

    def show; end

    def new
      @koi = Koi.new
    end

    def create
      @koi = Koi.new(koi_params)
      @koi.user = current_user
      if @koi.save
        redirect_to admin_kois_path, notice: 'Koi created successfully.'
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit; end

    def update
      if @koi.update(koi_params)
        redirect_to admin_kois_path, notice: 'Koi updated successfully.'
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @koi.destroy
      redirect_to admin_kois_path, notice: 'Koi deleted.'
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
end
```

### app/controllers/admin/messages_controller.rb

```ruby
module Admin
  class MessagesController < Admin::BaseController
    def index
      @messages = Message.order(created_at: :desc)
    end

    def show
      @message = Message.find(params[:id])
      @message.mark_as_read!
    end

    def update
      @message = Message.find(params[:id])
      @message.mark_as_read!
      redirect_to admin_messages_path, notice: 'Message marked as read.'
    end
  end
end
```

---

## Step 9 - Routes (10 min)

Replace `config/routes.rb` entirely:

```ruby
Rails.application.routes.draw do
  # Devise — registration disabled, admin login only
  devise_for :users, skip: [:registrations]

  # Public — read only, no account required
  root 'home#index'
  get '/decouvrir',  to: 'pages#decouvrir'
  get '/materiel',   to: 'pages#materiel'
  get '/soins',      to: 'pages#soins'
  get '/nourriture', to: 'pages#nourriture'
  get '/azukari',    to: 'pages#azukari'
  resources :kois, only: [:index, :show]
  resources :messages, only: [:create]

  # Admin — protected by Admin::BaseController
  namespace :admin do
    root 'kois#index'
    resources :kois
    resources :messages, only: [:index, :show, :update]
  end
end
```

---

## Step 10 - Views (60 min)

### Layout - app/views/layouts/application.html.erb (VISITORS)

Public layout. Must include:
- `stylesheet_link_tag 'application'` (loads visitors CSS)
- `javascript_importmap_tags` (NOT `javascript_include_tag` — incompatible with Importmap)
- Flash messages
- Footer partial with contact form

### Layout - app/views/layouts/admin.html.erb (ADMIN)

Create this file manually — Rails does not generate it. All `Admin::` controllers use it automatically when named `admin.html.erb`.

```erb
<!DOCTYPE html>
<html>
  <head>
    <title>Admin — Koi's Story</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag 'admin_application', media: 'all' %>
    <%= javascript_importmap_tags "admin_application" %>
  </head>
  <body>
    <%= render 'admin/shared/sidebar' %>
    <main class="main-content">
      <%= render 'admin/shared/topbar' %>
      <% if notice %><div class="alert alert-success"><%= notice %></div><% end %>
      <% if alert %><div class="alert alert-danger"><%= alert %></div><% end %>
      <%= yield %>
    </main>
  </body>
</html>
```

To tell admin controllers to use this layout, add to `Admin::BaseController`:
```ruby
layout 'admin'
```

### CRITICAL — CSS variable naming conflict

ADMIN and VISITORS use different variable names for the same palette V3 colors:

| ADMIN token | VISITORS token | Value |
|---|---|---|
| `--rouge-vif` | `--c-red` | `#e60000` |
| `--rouge-sombre` | `--c-wine` | `#630f0f` |
| `--noir` | `--c-black` | `#000000` |
| `--blanc-casse` | `--c-cream` | `#f5f5f2` |
| `--blanc-pur` | `--c-white` | `#ffffff` |

When both CSS sets are loaded in Rails, components referencing the wrong tokens will break silently.

**Fix:** Create `app/assets/stylesheets/shared/variables.css` with unified tokens (both names pointing to the same value), and import it first in both `application.css` and `admin_application.css`:

```css
/* app/assets/stylesheets/shared/variables.css */
:root {
  --color-red:    #e60000;
  --rouge-vif:    #e60000;  /* ADMIN alias */
  --c-red:        #e60000;  /* VISITORS alias */

  --color-wine:   #630f0f;
  --rouge-sombre: #630f0f;
  --c-wine:       #630f0f;

  --color-black:  #000000;
  --noir:         #000000;
  --c-black:      #000000;

  --color-cream:  #f5f5f2;
  --blanc-casse:  #f5f5f2;
  --c-cream:      #f5f5f2;

  --color-white:  #ffffff;
  --blanc-pur:    #ffffff;
  --c-white:      #ffffff;

  --color-whatsapp: #25d366; /* Never change */
}
```

### Asset migration — run this script once from the Rails root

Do not copy files manually. Run this script from `app/` root to copy everything at once:

```bash
# From the repo root (where VISITORS/ and ADMIN/ directories are)

# CSS
mkdir -p app/assets/stylesheets/visitors
mkdir -p app/assets/stylesheets/admin/atoms
mkdir -p app/assets/stylesheets/admin/molecules
mkdir -p app/assets/stylesheets/admin/templates
cp VISITORS/assets/css/*.css app/assets/stylesheets/visitors/
# Remove prototype-only files that must not enter the Rails pipeline:
rm -f app/assets/stylesheets/visitors/visitor.css  # manifest with @import (prototype only)
rm -f app/assets/stylesheets/visitors/demo.css     # preview page (prototype only)
cp ADMIN/assets/css/*.css app/assets/stylesheets/admin/
cp ADMIN/assets/css/atoms/*.css app/assets/stylesheets/admin/atoms/
cp ADMIN/assets/css/molecules/*.css app/assets/stylesheets/admin/molecules/
cp ADMIN/assets/css/templates/*.css app/assets/stylesheets/admin/templates/

# JS
mkdir -p app/javascript/visitors
mkdir -p app/javascript/admin
cp VISITORS/assets/js/*.js app/javascript/visitors/
cp ADMIN/assets/js/*.js app/javascript/admin/

# Fonts
mkdir -p app/assets/fonts
cp -r docs/fonts/inter/* app/assets/fonts/
cp -r docs/fonts/playfair-display/* app/assets/fonts/
```

**Verify the copy worked** (expected counts):
```bash
ls app/assets/stylesheets/visitors/ | wc -l   # should be 24
ls app/assets/stylesheets/admin/ | wc -l       # should be 11 (9 files + 3 dirs)
ls app/javascript/visitors/ | wc -l            # should be 4
ls app/javascript/admin/ | wc -l              # should be 10
```

### CSS — application.css

Replace the generated `app/assets/stylesheets/application.css` with:
```css
/*
 *= require visitors/variables
 *= require visitors/fonts
 *= require visitors/base
 *= require_tree ./visitors
 *= require_self
 */
```

For admin layout, use a separate `app/assets/stylesheets/admin_application.css`:
```css
/*
 *= require admin/variables
 *= require_tree ./admin
 *= require_self
 */
```

After copying, update font paths in `app/assets/stylesheets/visitors/fonts.css` — change all `url('../../docs/fonts/...')` to `url('/assets/...')`.

### JavaScript — CRITICAL: Turbo breaks `DOMContentLoaded`

With Hotwire, Turbo replaces `<body>` on navigation without a full page reload. `DOMContentLoaded` only fires once on initial load — all subsequent pages get no JS.

**In every copied JS file**, replace:
```js
document.addEventListener('DOMContentLoaded', () => { ... })
```
with:
```js
document.addEventListener('turbo:load', () => { ... })
```

Files to update (14 total):
- `app/javascript/visitors/header.js`
- `app/javascript/visitors/filter.js`
- `app/javascript/visitors/gallery.js`
- `app/javascript/visitors/animations.js`
- `app/javascript/admin/admin.js`
- `app/javascript/admin/koi-form.js`
- `app/javascript/admin/kois.js`
- `app/javascript/admin/messages.js`
- `app/javascript/admin/modal.js`
- `app/javascript/admin/notifications.js`
- `app/javascript/admin/order-form.js`
- `app/javascript/admin/orders.js`
- `app/javascript/admin/payments.js`
- `app/javascript/admin/theme.js`

In `app/javascript/application.js`, add after existing imports:
```js
import "./visitors/header"
import "./visitors/filter"
import "./visitors/gallery"
import "./visitors/animations"
```

**Pin `admin_application` in `config/importmap.rb`** (add this line):
```ruby
pin "admin_application", to: "admin_application.js"
```

Without this pin, Importmap cannot find `admin_application.js` and the admin JS will not load.

**Precompile `admin_application.css`** — create `config/initializers/assets.rb`:
```ruby
Rails.application.config.assets.precompile += %w[admin_application.css]
```

Without this, `admin_application.css` will not be found in production after `assets:precompile`.

Create `app/javascript/admin_application.js`:
```js
import "@hotwired/turbo-rails"
import "controllers"
import "./admin/admin"
import "./admin/modal"
import "./admin/notifications"
import "./admin/theme"
import "./admin/kois"
import "./admin/koi-form"
import "./admin/messages"
import "./admin/orders"
import "./admin/order-form"
import "./admin/payments"
```

### Minimum views required for MVP

**Public:**
- `app/views/home/index.html.erb` - hero, pitch, CTAs, featured kois
- `app/views/pages/decouvrir.html.erb` - breeder biography
- `app/views/pages/materiel.html.erb` - equipment static page
- `app/views/pages/soins.html.erb` - care static page
- `app/views/pages/nourriture.html.erb` - food static page
- `app/views/pages/azukari.html.erb` - boarding service page
- `app/views/kois/index.html.erb` - catalogue with filter form
- `app/views/kois/show.html.erb` - product page with WhatsApp button
- `app/views/layouts/_footer.html.erb` - footer with contact form

**Admin:**
- `app/views/admin/kois/index.html.erb` - koi list table
- `app/views/admin/kois/new.html.erb` and `edit.html.erb` - forms
- `app/views/admin/messages/index.html.erb` - messages list
- `app/views/admin/messages/show.html.erb` - message detail

### Login page — app/views/devise/sessions/new.html.erb

The login page serves two audiences: visitors who land here by accident, and admins (Mathilde/Manu).
Do NOT use the default Devise generated view. Replace it entirely with:

```erb
<div class="login-page">
  <div class="login-logo">
    <%= image_tag 'logo.png', alt: "Koi's Story" %>
  </div>

  <%# --- VISITOR SECTION --- %>
  <div class="login-visitor">
    <h2>Discover our koi</h2>
    <p class="login-hint">Member area coming soon</p>
    <%= link_to 'Enter the catalogue', root_path, class: 'btn btn-primary' %>
  </div>

  <div class="login-divider">or</div>

  <%# --- ADMIN SECTION --- %>
  <div class="login-admin">
    <h2>Administration</h2>
    <%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
      <div class="form-group">
        <%= f.label :email %>
        <%= f.email_field :email, autofocus: true, class: 'form-control' %>
      </div>
      <div class="form-group">
        <%= f.label :password %>
        <%= f.password_field :password, class: 'form-control' %>
      </div>
      <%= f.submit 'Sign in', class: 'btn btn-secondary' %>
    <% end %>
    <%= link_to 'Forgot your password?', new_password_path(resource_name), class: 'login-forgot' %>
  </div>
</div>
```

This page uses the **public `application` layout** (not admin) so it loads visitors CSS.
Style it using the existing `ADMIN/pages/login.html` as visual reference — the CSS is already in `login.css`.

### WhatsApp button (on koi show page)

```erb
<%
  wa_number = "33XXXXXXXXX"
  wa_text = URI.encode_www_form_component("Hello, I'm interested in #{@koi.name} (#{@koi.variety}, #{@koi.size_cm}cm).")
%>
<%= link_to "Order via WhatsApp", "https://wa.me/#{wa_number}?text=#{wa_text}",
    class: "btn btn-wa", target: "_blank", rel: "noopener" %>
```

### Konishi badge (on koi card/show)

```erb
<% if @koi.konishi_lineage? %>
  <span class="badge badge-konishi">Konishi Lineage</span>
<% end %>
```

---

## Step 11 - Seeds (20 min)

`db/seeds.rb` must cover all 26 koi varieties. Create admin user first.

```ruby
# Clear existing data
Message.destroy_all
KoiTag.destroy_all
Tag.destroy_all
Koi.destroy_all
User.destroy_all

# Admin users
admin = User.create!(
  email: 'contact.koistory@gmail.com',
  password: ENV['ADMIN_PASSWORD'],
  password_confirmation: ENV['ADMIN_PASSWORD'],
  role: :admin
)

User.create!(
  email: 'emmanuel.koistory@gmail.com',
  password: ENV['ADMIN_PASSWORD'],
  password_confirmation: ENV['ADMIN_PASSWORD'],
  role: :admin
)

# Koi varieties (all 26)
varieties = [
  'Kohaku', 'Taisho Sanke', 'Showa Sanshoku', 'Utsuri', 'Bekko',
  'Asagi', 'Shusui', 'Koromo', 'Kawarimono', 'Hikari Muji',
  'Hikari Utsurimono', 'Hikari Moyo', 'Kinginrin', 'Tancho',
  'Goshiki', 'Doitsu', 'Ghost Koi', 'Butterfly Koi', 'Chagoi',
  'Soragoi', 'Ochiba Shigure', 'Kujaku', 'Benigoi', 'Shiro Muji',
  'Ki Utsuri', 'Midorigoi'
]

varieties.each_with_index do |variety, i|
  Koi.create!(
    name: "#{variety} #{i + 1}",
    variety: variety,
    age_class: [:tosai, :nisai, :sansai].sample,
    age: rand(1..3),
    sex: [:male, :female].sample,
    size_cm: rand(30..70),
    price: [500, 800, 1200, 1500, 2000, 3000].sample,
    status: i < 20 ? :available : :sold_out,
    konishi_lineage: i < 10,
    description: "Exceptional specimen from the Konishi lineage. " \
                 "Raised in our basins in Miribel.",
    user: admin
  )
end

puts "Created #{User.count} users"
puts "Created #{Koi.count} kois"
```

Run:

```bash
rails db:seed
```

---

## Step 12 - Final Verification (15 min)

```bash
rails server
```

Check each item:

- [ ] `http://localhost:3000` - home page hero loads (NOT catalogue — must show hero/pitch)
- [ ] `/decouvrir`, `/materiel`, `/soins`, `/nourriture`, `/azukari` - all 5 navbar pages render without error
- [ ] Filters work on catalogue
- [ ] Koi product page shows WhatsApp button
- [ ] Konishi badge displays on eligible kois
- [ ] `http://localhost:3000/users/sign_in` - Devise login works
- [ ] Login with `contact.koistory@gmail.com` / value of `ADMIN_PASSWORD` in `.env`
- [ ] `http://localhost:3000/admin` - admin dashboard accessible
- [ ] Admin can create/edit/delete a koi
- [ ] Admin can view messages
- [ ] Contact form in footer submits without error
- [ ] Check logs for ActionMailer delivery
- [ ] `rails routes` - verify all routes are RESTful

---

## Step 13 - Tests (20 min)

**THP requires tests. This is an eliminatory criterion. Zero test files = fail.**

Run after Step 12 to verify nothing is broken.

### Model tests

```bash
# Rails generates test stubs automatically — fill in the content:
```

Edit `test/models/koi_test.rb`:

```ruby
require 'test_helper'

class KoiTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(email: 'test@example.com', password: 'password', role: :admin)
    @koi = Koi.new(
      name: 'Test Koi', variety: 'Kohaku', price: 500,
      status: :available, user: @user
    )
  end

  test 'valid koi' do
    assert @koi.valid?
  end

  test 'invalid without name' do
    @koi.name = nil
    assert_not @koi.valid?
  end

  test 'invalid without variety' do
    @koi.variety = nil
    assert_not @koi.valid?
  end

  test 'invalid with negative price' do
    @koi.price = -1
    assert_not @koi.valid?
  end

  test 'available scope returns only available kois' do
    @koi.save!
    sold = Koi.create!(name: 'Sold', variety: 'Tancho', price: 100,
                       status: :sold_out, user: @user)
    assert_includes Koi.available, @koi
    assert_not_includes Koi.available, sold
  end
end
```

Edit `test/models/message_test.rb`:

```ruby
require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  def setup
    @message = Message.new(
      sender_name: 'Alice', sender_email: 'alice@example.com', body: 'Hello'
    )
  end

  test 'valid message' do
    assert @message.valid?
  end

  test 'invalid without sender name' do
    @message.sender_name = nil
    assert_not @message.valid?
  end

  test 'invalid with bad email' do
    @message.sender_email = 'not-an-email'
    assert_not @message.valid?
  end

  test 'read defaults to false' do
    @message.save!
    assert_equal false, @message.reload.read
  end

  test 'mark_as_read! sets read to true' do
    @message.save!
    @message.mark_as_read!
    assert @message.reload.read
  end
end
```

### Controller tests

Edit `test/controllers/kois_controller_test.rb`:

```ruby
require 'test_helper'

class KoisControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(email: 'admin@test.com', password: 'password', role: :admin)
    @koi = Koi.create!(name: 'Test', variety: 'Kohaku', price: 500,
                       status: :available, user: @user)
  end

  test 'should get index' do
    get kois_url
    assert_response :success
  end

  test 'should get show' do
    get koi_url(@koi)
    assert_response :success
  end
end
```

### Run tests

```bash
rails test
```

All tests must pass before the oral. Fix any failures before moving on.

---

## Branch Strategy

The `MVP` branch already exists and is ready. Switch to it:

```bash
git checkout MVP
git pull
```

Commit frequently after each step. When done:

```bash
git push origin MVP
gh pr create --base DEV --title "feat: Rails MVP scaffold"
```

---

## Known Risks

| Risk | Mitigation |
|---|---|
| Cloudinary credentials not available | Use local file storage for MVP demo, wire Cloudinary after |
| ActionMailer not configured for prod | Resend SMTP — see Step 7 for full config |
| CSS integration takes too long | Copy prototype CSS files to `app/assets/stylesheets/` — no Bootstrap/Tailwind needed |
| CSS variables broken (ADMIN vs VISITORS naming) | Create `shared/variables.css` with both alias names — see CSS section above |
| JS stops working after navigation | Replace `DOMContentLoaded` with `turbo:load` in every JS file |
| SQLite lock errors in production (Puma multi-process) | Add `config/initializers/sqlite_wal.rb`: `ActiveRecord::Base.connection.execute("PRAGMA journal_mode=WAL")` |
| Catalogue appears empty at demo | Use placeholder images in seeds: `https://placehold.co/800x600/000/fff?text=Koi` |
| Time runs out | Prioritize: Devise > Koi CRUD > Contact form > CSS > JS |
| OTP_SECRET_KEY missing in .env | devise-two-factor reads it at boot — if missing, app won't start. Always set it (even a dummy value in dev) |
| WHATSAPP_PHONE not yet received from client | Use placeholder `33600000000` in seeds/views — replace before launch |
| noreply@koistory.fr domain not verified in Resend | Using `contact.koistory@gmail.com` as sender — switch to domain email once DNS is configured |
