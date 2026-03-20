# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project follows a pre-production workflow until the first production deployment.

---

## [2026-03-20]

### Changed
- resolve CHANGELOG conflict — keep curated version from admin-and-back
- remove duplicate Team section from README, point to CONTRIBUTORS.md
- normalize line endings to LF across VISITORS and todo.md
- update .gitattributes for consistent line endings
- update CHANGELOG, CONTRIBUTORS and README with project tracking
- standardize branch naming from `dev` to `DEV` across documentation
- update changelog format and commit parser rules


### Fixed
- **ci**: restrict changelog workflow to DEV branch only


### Integration
- Merge pull request #40 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
- Merge pull request #39 from DevRedious/admin-and-back

docs: CHANGELOG history, CONTRIBUTORS avatars, README progress tracker
- Merge pull request #18 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
- Merge pull request #15 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
- Merge pull request #17 from DevRedious/admin-and-back

chore: update changelog format and commit parser rules
- Merge branch 'main' into admin-and-back


---
## [Unreleased]

### Added
- Unification des fichiers TODO en un seul `TODO.md` structuré par thème

---


## [2026-03-19] — Morgan · Valentin · Romain

### Added
- Modal system implemented and wired to all non-functional buttons in ADMIN *(Morgan)*
- Wave clip-path and story background added to `decouvrir` page *(Romain)*
- CHANGELOG automation setup with git-cliff and commit message guidelines *(Morgan)*
- Missing files restored from `Maquette` branch (assets, design tokens, docs) *(Morgan)*
- VISITORS fully restored after accidental deletion in commit `e00ff38` *(Morgan)*
- THP/Rails full audit and implementation guides added to `docs/` *(Morgan)*
- GEMINI.md guidance file added for Gemini CLI *(Morgan)*
- Biome, HTML validation, release and stale GitHub Actions workflows added *(Morgan)*
- PowerShell setup script added for Windows users *(Morgan)*
- Action plan added to `docs/` *(Romain)*

### Changed
- Admin components refactored (badge, button, input, avatar) — V3 palette and new CSS variables applied *(Morgan)*
- Filter bar and koi row structures improved for better usability *(Morgan)*
- README updated with new badge statuses and theme switcher functionality *(Morgan)*
- `docs/todo.md` synced with Maquette — client ChatGPT feedback section added *(Morgan)*
- CODEOWNERS updated with real GitHub usernames *(Morgan)*
- Old todo files removed, superseded by `TODO.md` *(Morgan)*
- Shell scripts converted to LF line endings, `.gitattributes` added *(Morgan)*
- Admin wired to VISITORS buttons, inline styles dropped from HTML *(Morgan)*
- Biome auto-format applied across ADMIN scripts *(Morgan)*
- Contact section reworked on home page *(Valentin)*
- `refactoring-media-queries.md` doc improved *(Romain)*
- Azukari page layout, text contrast and hero-intro centering improved *(Romain)*
- `btn--wa` text color, footer social icons and hero video fade corrected *(Valentin)*

### Fixed
- Merge conflicts with DEV resolved — admin-and-back version kept for VISITORS *(Morgan)*
- Biome and html-validate rules relaxed for prototype files *(Morgan)*
- CI: git-cliff install migrated from Docker to `taiki-e/install-action` *(Morgan)*
- HTML/CSS accessibility and compatibility lint issues resolved *(Morgan)*
- Biome lint issues fixed in modal system and config files *(Morgan)*
- Navbar and footer structure repaired across all visitor pages *(Valentin)*
- Responsive wave clip-path compensation fixed on mobile *(Romain)*
- Euro sign moved after price amount (`number€` instead of `€number`) *(Valentin)*
- Biome lint issue fixed *(Romain)*

### Integration
- Merge pull request #14 from DevRedious/admin-and-back *(Morgan)*
- Merge pull request #13 from DevRedious/DEV *(Romain)*
- Merge pull request #12 from DevRedious/Maquette *(Morgan)*
- Merge pull request #11 from DevRedious/Maquette *(Morgan)*
- Merge pull request #10 from DevRedious/admin-and-back *(Romain)*
- Merge pull request #9 from DevRedious/admin-and-back *(Romain)*
- Merge pull request #8 from DevRedious/Maquette *(Romain)*
- Merge pull request #7 from DevRedious/Maquette *(Valentin)*
- Merge pull request #6 from DevRedious/admin-and-back *(Morgan)*
- Merge pull request #5 from DevRedious/admin-and-back *(Romain)*
- Merge pull request #4 from DevRedious/admin-and-back *(Romain)*

---

## [2026-03-18] — Valentin · Romain · Morgan

### Added
- CSS architecture modularized for `VISITORS/assets/css/`: 20 specialized files (`variables`, `base`, `header`, `hero`, `catalogue`, `product`, `farm`, `shop`, `konishi`, `badge`, `button`, `price`, `forms`, `atoms-media`, `footer`, `features`, `koi-card`, `koi-card-pages`, `product-pages`, `azukari`, `demo`, `visitor`) *(Romain)*
- Wave separators (`wave-divider`) added to inner pages *(Romain)*
- Scroll animations added to all visitor pages *(Romain)*
- New navbar and footer deployed on all visitor pages *(Valentin)*
- JavaScript modularization: `header.js`, `filter.js`, `gallery.js`, `animations.js` (all under 200 lines) *(Romain)*
- WCAG AAA accessibility compliance — contrast fixed across VISITORS *(Romain)*
- DEV branch integrated into Maquette via pull request #2 *(Morgan)*

### Changed
- Hero color changed to black for better text readability *(Valentin)*
- Button liquid variant removed *(Valentin)*
- Featured koi on home page updated, euro symbol display corrected *(Valentin)*
- Border radius harmonized across all buttons *(Valentin)*
- Wave clip-path approach improved, documentation added *(Romain)*
- Card information display updated *(Romain)*

### Fixed
- Navbar issue on kois page fixed, border-radius and footer readability improved *(Valentin)*
- Merge conflict in `hero.css` resolved — Maquette wave clip-path approach kept *(Valentin)*
- Merge conflict in `catalogue.css` resolved — `top: 0` and `backdrop-filter` kept *(Valentin)*
- Font issue on Hanabi koi fixed *(Valentin)*
- Multiple card and product page issues fixed *(Romain)*
- CSS and atomic design features fixed *(Romain)*

### Removed
- Circular gallery (`CircularGallery`) removed — client feedback *(Romain)*
- Video loop removed from hero *(Romain)*
- `wave.svg` removed *(Romain)*
- `main.js` (405 lines, over 200-line limit) replaced by dedicated JS modules *(Romain)*

### Integration
- Merge pull request #2 from DevRedious/Maquette *(Morgan)*

---

## [2026-03-17] — Valentin · Romain

### Added
- Client files received: text content, visual assets and notes from the call *(Valentin)*
- Maquette V2 created after client call *(Valentin)*
- Maquette V3: animations and circular gallery added (later removed per client feedback) *(Romain)*
- New navbar and footer added to all pages *(Valentin)*
- Scroll animations added to all pages *(Romain)*

### Removed
- Circular gallery removed following client feedback *(Romain)*

---

## [2026-03-16] — Valentin · Romain

### Added
- GitHub Pages configuration for `Maquette` branch (`.nojekyll`, redirect `index.html`) *(Valentin)*
- Video added to hero section on home page *(Romain)*

### Fixed
- Incorrect image ratios (4/3 and 3/4) fixed across all pages *(Valentin)*
- Broken link on home page fixed *(Valentin)*
- Fish picture display issue on koi cards fixed *(Valentin)*

### Removed
- Second catalogue button on home page removed *(Valentin)*
- Photo gallery on home page removed *(Valentin)*
- Video loop in hero removed *(Romain)*

---

## [2026-03-13] — Morgan

### Changed
- `CONTRIBUTING.md` updated: branch model and workflow clarified, branch names lowercased, PR directions adjusted *(Morgan)*
- `biome.json` updated: ignored file patterns expanded to all HTML files and specific directories *(Morgan)*

---

## [2026-03-12] — Morgan

### Added
- Atomic Design structure documented for `ADMIN/` and `VISITORS/` in `docs/` *(Morgan)*
- Admin implementation plan added (`docs/planning/admin_implementation.md`) *(Morgan)*
- Wireframes and design files reorganized under `docs/design/` *(Morgan)*

### Changed
- `README.md` enriched with repository status and collaboration standards *(Morgan)*
- `docs/todo.md` updated to use `ADMIN/` and `VISITORS/` as UI workspaces *(Morgan)*

---

## [2026-03-11] — Valentin · Morgan

### Changed
- `README.md` updated (two iterations) *(Valentin)*

### Integration
- DEV merged into `main` via pull request #1 *(Morgan)*

---

## [2026-03-10] — Morgan

### Added
- Repository initialized *(Morgan)*
- Base structure created: `docs/`, `ADMIN/`, `VISITORS/` *(Morgan)*
- Governance files added: GitHub templates (issues, PRs), `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md` *(Morgan)*
- `docs/todo.md`, `docs/roadmap.md`, `docs/stack.md`, `docs/agent.md` *(Morgan)*
- `docs/design/atomic_design.md` — UI architecture strategy *(Morgan)*
