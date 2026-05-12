# GEMINI.md - Koi's Story Project Context

## Project Overview
**Koi's Story** is a digital showcase platform for a koi carp breeding farm affiliated with the prestigious **Konishi** lineage. It was originally started as a "The Hacking Project" (THP) bootcamp project, but the active codebase is now the Rails application.

- **Objective:** Premium catalog of high-quality specimens with direct WhatsApp ordering.
- **Current Phase:** Rails MVP in active development.
- **Workspaces:** 
  - `app/`, `config/`, `db/`, `test/`: active Rails implementation.
  - `docs/prototypes/ADMIN/`: archived HTML/CSS/JS back-office prototype.
  - `docs/prototypes/VISITORS/`: archived HTML/CSS/JS public-facing prototype.
  - `docs/`: Extensive documentation, design tokens, and assets.

## Core Mandates (THP & Internal)
1. **Language:** All code (classes, variables, comments) and `README.md` must be in **English**.
2. **RESTful Architecture:** Strictly follow Rails REST conventions.
3. **File Length Limit:** **STRICT 200-line limit** for ALL files (CSS, JS, components). Exceptions: Generated files, layout templates, and final assembled pages in `pages/`.
4. **Atomic Design:** Components must be organized into `atoms/`, `molecules/`, `organisms/`, `templates/`, and `pages/`.
5. **Styling:** 
   - Use **Palette V3** (Red: `#e60000`, Dark Red: `#630f0f`, Black: `#000000`, Off-white: `#f5f5f2`, White: `#ffffff`). 
   - WhatsApp Green (`#25d366`) is mandatory for WhatsApp elements.
   - Modular CSS: One file per responsibility in `assets/css/`. **NO inline styles.**
6. **JavaScript:** Modular JS in `assets/js/`. **NO `onclick=""`** in HTML; use event listeners/delegation.
7. **Quality:** Use **Biome** for linting and formatting.

## Technical Stack (Planned)
- **Backend:** Ruby on Rails 7+ (MVC).
- **Frontend:** Hotwire (Turbo + Stimulus).
- **Database:** SQLite.
- **Authentication:** Devise (roles: `visitor`, `admin`).
- **Media:** Cloudinary for image hosting.
- **Communication:** ActionMailer (emails) and WhatsApp (wa.me) for sales.
- **Hosting:** VPS.

## Key Commands
- **Environment Setup:** `sh setup.sh` (Linux/Mac) or `./setup.ps1` (Windows) to configure Git hooks.
- **Linting/Formatting:**
  ```bash
  npx biome check .         # Audit JS, CSS, JSON
  npx biome format --write .  # Auto-format
  ```
- **Rails:** `bundle install`, `bin/rails db:prepare`, `bin/rails test`
- **Archived prototypes:** open `.html` files in `docs/prototypes/ADMIN/pages/` or `docs/prototypes/VISITORS/pages/` only when intentionally reviewing historical reference.

## Directory Structure Highlights
- `CLAUDE.md`: Critical technical guidelines and constraints.
- `todo.md`: Root-level master task list.
- `docs/`: 
  - `design/`: Design tokens, branding, and wireframes.
  - `roadmap.md`: Project milestones (Beta target: 2026-03-23).
  - `stack.md`: Detailed tech stack breakdown.
- `docs/prototypes/ADMIN/` & `docs/prototypes/VISITORS/`: archived Atomic Design prototyping structures.

## Development Workflow
- **Branching:** `DEV` (integration) -> `main` (production). Feature branches (e.g., `Morgan`, `Romain`, `Valentin`) target `DEV`.
- **Commits:** Conventional Commits in **French** (e.g., `feat: ...`, `fix: ...`).
- **Historical THP Compliance:** kept as project memory only. Do not maintain Rails and archived prototypes in parallel unless explicitly asked.

## Contextual Precedence
The instructions in `CLAUDE.md` and the root `todo.md` represent the most up-to-date technical and functional requirements. Always refer to them before starting a task.
