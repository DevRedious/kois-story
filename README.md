<div align="center">
  <img src="docs/assets/LOGO MANU FINI 2.png" alt="Koi's Story Logo" width="200">

  <p align="center">
    <img src="https://img.shields.io/badge/Rails-8.1-CC0000?logo=rubyonrails&logoColor=white" alt="Ruby on Rails">
    <img src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white" alt="SQLite">
    <img src="https://img.shields.io/badge/Hotwire-Turbo%20%2B%20Stimulus-9B59B6" alt="Hotwire">
    <img src="https://img.shields.io/badge/Auth-Devise-orange" alt="Devise">
    <img src="https://img.shields.io/badge/Linter-Biome-60A5FA?logo=biome&logoColor=white" alt="Biome">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Palette_V3-%E2%80%94-lightgrey" alt="Palette V3">
    <img src="https://img.shields.io/badge/Rouge_Vif-%23e60000-e60000" alt="#e60000">
    <img src="https://img.shields.io/badge/Rouge_Sombre-%23630f0f-630f0f" alt="#630f0f">
    <img src="https://img.shields.io/badge/Noir-%23000000-000000" alt="#000000">
    <img src="https://img.shields.io/badge/Blanc_Cass%C3%A9-%23f5f5f2-f5f5f2?labelColor=999999" alt="#f5f5f2">
    <img src="https://img.shields.io/badge/Blanc_Pur-%23ffffff-ffffff?labelColor=999999" alt="#ffffff">
    <img src="https://img.shields.io/badge/WhatsApp-%2325d366-25d366?logo=whatsapp&logoColor=white" alt="#25d366">
  </p>

  <p align="center">
    <i>Digital showcase platform for a koi carp breeding farm affiliated with the Konishi lineage.</i><br>
    Independent Rails application, originally started as a THP final project<br>
   Trello Board  <a href="https://trello.com/b/u2kahNMY/kois-story">Koi's Story Trello</a>
  </p>
</div>

---

## About

**Koi's Story** is a digital showcase platform for browsing and ordering koi carp from the Konishi lineage. Visitors can explore the catalog, filter by variety, size or price, and contact the seller directly via WhatsApp in one click.

**Key features**

- Filterable catalog (variety / size / price)
- Product page with photo gallery and Konishi Lineage badge
- Pre-filled "Order via WhatsApp" button
- Photo & video gallery of the breeding farm
- Contact form with email notification
- Admin back-office (koi CRUD, message management)

## Project Progress

| Phase              | Status                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Planning & Design  | ![100%](https://geps.dev/progress/100?dangerColor=ef4444&warningColor=f59e0b&successColor=22c55e) |
| HTML/CSS Prototype | ![83%](https://geps.dev/progress/83?dangerColor=ef4444&warningColor=f59e0b&successColor=22c55e)   |
| Rails Integration  | ![70%](https://geps.dev/progress/70?dangerColor=ef4444&warningColor=f59e0b&successColor=22c55e)   |
| Tests & QA         | ![35%](https://geps.dev/progress/35?dangerColor=ef4444&warningColor=f59e0b&successColor=22c55e)   |
| Production Deploy  | ![20%](https://geps.dev/progress/20?dangerColor=ef4444&warningColor=f59e0b&successColor=22c55e)   |

## Repository Status

The Rails application is now the active source of truth.

- `app/`, `config/`, `db/`, and `test/` contain the Rails MVP.
- `docs/prototypes/ADMIN/` contains the archived standalone admin prototype.
- `docs/prototypes/VISITORS/` contains the archived standalone public prototype.

The Rails MVP includes public pages, a filterable koi catalog, koi detail pages, a contact form with mail notification, Devise admin authentication, admin CRUD for kois and products, and admin screens for messages, clients, orders, and payments.

The historical THP/prototype constraints are kept only as project memory. New work should target Rails first; archived prototypes are reference material, not parallel surfaces to maintain.

## Local Development

Docker Desktop is the official local runtime. Do not run the Rails app directly on native Windows for team development.

Create `.env.local` from `.env.example`, then start the complete local stack:

```bash
docker compose build
docker compose up -d
docker compose exec admin bin/rails db:migrate
docker compose exec admin bin/rails db:seed
ruby script/docker_smoke.rb
docker compose exec admin bash -lc 'unset DATABASE_URL; KOIS_APP_ROLE=all bin/rails test'
docker compose exec admin bin/rubocop
```

Local services:

- public site: `http://localhost:3000`
- admin site: `http://localhost:3001`
- PostgreSQL: `127.0.0.1:5433`

The Docker smoke script checks the public/admin route split, shared database, service health, and LF endings for Rails binstubs.

## Working Standards

- `main` is the production branch
- `DEV` is the integration branch
- local/staging work must target `DEV` through pull requests
- contributor branches are `Morgan`, `Romain`, and `Valentin`; **Cursor**, **Claude**, and **Gemini** are acknowledged as tooling contributors in `CONTRIBUTORS.md`
- all code and `README.md` content must stay in English
- routes must remain RESTful
- business logic belongs in models
- UI components should follow Atomic Design

## Repository Documents

- `docs/README.md` for the documentation index
- `docs/todo.md` for execution tracking
- `docs/roadmap.md` for milestones
- `docs/stack.md` for the planned stack
- `CONTRIBUTING.md` for collaboration rules
- `CONTRIBUTORS.md` for the contribution log
- `SECURITY.md` for vulnerability reporting

## Product Overview

Koi's Story is a premium digital showcase for Konishi koi carp. The public site helps visitors browse available koi and start a direct WhatsApp conversation. The admin app manages stock, products, clients, orders, payments, and contact messages.

The public and admin surfaces share one database but run as separate local services. In deployment, public traffic should stay on the main domain while admin traffic moves to `admin.kois-story.com`.

## Wireframes

### Home Page

![Home Page Wireframe](docs/design/wireframes/wireframe_accueil.svg)

### Product Page

![Product Page Wireframe](docs/design/wireframes/wireframe_produit.svg)

## Documentation

The project documentation index is available in `docs/README.md`.

## Changelog

Project history is tracked in `CHANGELOG.md`.

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Back-end         | Ruby on Rails 8.1 (RESTful, MVC)                |
| Front-end        | Hotwire Turbo + Stimulus + importmap            |
| CSS              | Propshaft assets from the Atomic Design modules |
| Database         | PostgreSQL in Docker local stack; SQLite legacy default |
| Authentication   | Devise + devise-two-factor                      |
| Linter/Formatter | RuboCop + Biome                                 |
| Image upload     | CarrierWave + Cloudinary                        |
| Emails           | ActionMailer + Resend SMTP                      |
| Hosting          | VPS via Kamal                                   |

## Team

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the full team.
