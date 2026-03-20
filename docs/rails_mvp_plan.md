# Rails MVP - Implementation Plan

> Oral blanc THP - 2026-03-20
> Target: working MVP in ~5h from scratch
> This document is the single source of truth. Follow it in order. Do not skip steps.

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
rails new . --skip-git --database=sqlite3
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

Add inside the main group (not development/test):

```ruby
gem 'devise'
gem 'cloudinary'
gem 'carrierwave'
gem 'carrierwave-cloudinary'
gem 'dotenv-rails'
```

Then:

```bash
bundle install
```

---

## Step 3 - Environment Variables (5 min)

Create `.env` at root:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=contact.koistory@gmail.com
```

Create `.env.example` at root (same keys, empty values):

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=
```

---

## Step 4 - Devise Setup (20 min)

```bash
rails generate devise:install
rails generate devise User
rails generate devise:views
```

Edit the generated migration to add the `role` column:

```ruby
# db/migrate/TIMESTAMP_devise_create_users.rb
# Add inside create_table :users block:
t.integer :role, default: 0, null: false
```

Edit `app/models/user.rb`:

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { visitor: 0, admin: 1 }

  def admin?
    role == 'admin'
  end
end
```

Edit `config/environments/development.rb` - add at the bottom inside the block:

```ruby
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Edit `config/routes.rb` - add root route:

```ruby
root 'kois#index'
```

---

## Step 5 - Models (45 min)

Generate in this exact order:

```bash
rails generate model Koi name:string variety:string age_class:integer age:integer sex:integer size_cm:integer price:decimal available:boolean konishi_lineage:boolean description:text status:integer user:references

rails generate model Image url:string alt:string position:integer imageable:references{polymorphic}

rails generate model Tag name:string category:integer

rails generate model KoiTag koi:references tag:references

rails generate model Message sender_name:string sender_email:string body:text read:boolean
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

  scope :available, -> { where(status: :available) }
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
    MessageMailer.new_message(self).deliver_later
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

```bash
rails generate mailer MessageMailer
```

Edit `app/mailers/message_mailer.rb`:

```ruby
class MessageMailer < ApplicationMailer
  default to: -> { ENV['ADMIN_EMAIL'] }

  def new_message(message)
    @message = message
    mail(
      from: message.sender_email,
      subject: "[Koi's Story] New message from #{message.sender_name}"
    )
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
rails generate controller Kois index show
rails generate controller Messages create
rails generate controller Admin::Kois index show new create edit update destroy
rails generate controller Admin::Messages index show
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
  end
end
```

---

## Step 9 - Routes (10 min)

Replace `config/routes.rb` entirely:

```ruby
Rails.application.routes.draw do
  devise_for :users

  root 'kois#index'

  resources :kois, only: [:index, :show]
  resources :messages, only: [:create]

  namespace :admin do
    root 'kois#index'
    resources :kois
    resources :messages, only: [:index, :show]
  end
end
```

---

## Step 10 - Views (60 min)

### Layout - app/views/layouts/application.html.erb

Keep the Rails generated one but add the CSS link and basic structure. Reference the VISITORS prototype for CSS classes.

Key things to include:
- Link to `VISITORS/assets/css/visitor.css` OR copy the CSS to `app/assets/stylesheets/`
- Flash messages display
- Contact form in footer (partial)

### Recommended approach for CSS

Copy these files from `VISITORS/assets/css/` to `app/assets/stylesheets/`:
- `variables.css`
- `base.css`
- `header.css`
- `hero.css`
- `catalogue.css`
- `product.css`
- `koi-card.css`
- `footer.css`

Copy fonts from `docs/fonts/` to `app/assets/fonts/`.

### Minimum views required for MVP

**Public:**
- `app/views/kois/index.html.erb` - catalogue with filter form
- `app/views/kois/show.html.erb` - product page with WhatsApp button
- `app/views/layouts/_footer.html.erb` - footer with contact form

**Admin:**
- `app/views/admin/kois/index.html.erb` - koi list table
- `app/views/admin/kois/new.html.erb` and `edit.html.erb` - forms
- `app/views/admin/messages/index.html.erb` - messages list
- `app/views/admin/messages/show.html.erb` - message detail

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

# Admin user
admin = User.create!(
  email: 'contact.koistory@gmail.com',
  password: 'password123',
  password_confirmation: 'password123',
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

- [ ] `http://localhost:3000` - home page loads (koi catalogue)
- [ ] Filters work on catalogue
- [ ] Koi product page shows WhatsApp button
- [ ] Konishi badge displays on eligible kois
- [ ] `http://localhost:3000/users/sign_in` - Devise login works
- [ ] Login with `contact.koistory@gmail.com` / `password123`
- [ ] `http://localhost:3000/admin` - admin dashboard accessible
- [ ] Admin can create/edit/delete a koi
- [ ] Admin can view messages
- [ ] Contact form in footer submits without error
- [ ] Check logs for ActionMailer delivery
- [ ] `rails routes` - verify all routes are RESTful

---

## Branch Strategy

Work on a new branch from DEV:

```bash
git checkout DEV
git pull
git checkout -b feat/rails-scaffold
```

Commit frequently after each step. When done:

```bash
git push origin feat/rails-scaffold
gh pr create --base DEV --title "feat: Rails MVP scaffold"
```

---

## Known Risks

| Risk | Mitigation |
|---|---|
| Cloudinary credentials not available | Use local file storage for MVP demo, wire Cloudinary after |
| ActionMailer not configured for prod | Use Letter Opener gem in dev to preview emails |
| CSS integration takes too long | Use Bootstrap CDN as fallback, prototype CSS as visual reference |
| Time runs out | Prioritize: Devise > Koi CRUD > Contact form > CSS |
