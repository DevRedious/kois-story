# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project follows a pre-production workflow until the first production deployment.

---


## [Unreleased]



### Changed

- stabilize changelog and release automation


## [2026-05-13]

### Integration
- Merge pull request #52 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG


---## [2026-05-12]

### Changed
- adjust README formatting and improve tech stack table layout
- sync DEV into local docker stack


### Fixed
- satisfy PR quality gates
- resolve PR quality checks


### Integration
- Merge pull request #57 from DevRedious/setup/local-docker-stack

style: adjust README formatting and improve tech stack table layout
- Merge pull request #56 from DevRedious/setup/local-docker-stack

feat: prepare local Docker stack and DEV staging


---## [2026-03-23]

### Added
- add local admin access shortcut
- add hero discover cue
- enhance Docker stack configuration for improved stability
- stabilize local Docker stack
- add local Docker public admin stack
- replace home hero video with Kois-story-aissai image
- feat: enhance navbar with exclusive Konishi branding
- add admin bulk actions and sorting
- add admin server-side filters
- paginate admin index pages
- improve admin oversight workflows
- improve message workflow and contact UX
- add turnstile support to contact form
- protect contact form from bots
- add message contact references
- style admin contact email
- style contact acknowledgement email
- send contact acknowledgement email
- feat: implement Nike-style mobile navbar with sticky filter bar
- add product, order, payment, and client management features


### Changed
- restore active nav gradient hover
- animate public nav indicator
- animate brand gradient variants
- restore brand gradients on color variants
- simplify button color variants
- apply color palette v4
- update project documentation
- refresh readme brand references
- update project readme status
- replace heavy public images with avif
- New palette
- add public brand svg assets
- simplify hero copy and rename "spécimen" to "koï" sitewide
- refactor: update client-facing wording and Konishi branding across all pages
- test: add full Playwright coverage for public and admin flows
- refactor: clean up client-facing wording per Mathilde brief
- add client mission brief
- remove duplicate admin identity from sidebar
- polish admin sidebar navigation
- document Coolify HTTPS setup
- test Coolify auto deploy webhook
- prepare Coolify deployment
- update todo
- style: mobile UX polish — hero, wave spacing, shop badges
- Fix nothing. Trying to resolve the navbar but still got issues
- streamline image preview removal in koi-form.js
- enhance CSS for admin resources and responsive tables; improve JavaScript file handling
- fix biome formatting in toast.js
- refactor: complete mobile-first CSS conversion and accessibility pass


### Fixed
- smooth Turbo public navigation
- prevent double nav indicator animation
- animate nav indicator only after navigation
- use V2 circle logo
- use dark circle logo in chrome
- use koi pond hero image
- use circle logo assets
- restore new logo assets
- replace Lignée Konishi with 100% Konishi across all views
- replace Lignée Konishi with 100% Konishi across all views
- fix image not visible in the hero
- fix badge overlap, show Konishi badge on mobile
- responsive navbar — mobile logo alignment + desktop breakpoint
- add libffi-dev to Dockerfile build stage for fiddle gem
- add fiddle gem for Ruby 3.4+ compatibility
- remove dashboard horizontal overflow
- use compact turnstile on narrow screens
- tighten mobile turnstile spacing
- keep turnstile widget inside mobile form
- fix: filter bar no longer leaves gap when header hides on scroll
- restore mobile contact form layout
- prevent horizontal overflow scroll on all viewports
- reveal full sidebar section labels
- fix badge and underline size
- remove admin theme switching
- soften email hero background
- set contact email reply-to
- prevent burger menu from being cropped on mobile devices
- vertically center navbar pill within sticky filter bar on desktop
- hide grid item wrapper on filter, not the card itself
- resolve filter bar and first-load rendering issues
- resolve blank first-load caused by invalid CSP nonce
- resolve production font assets
- prepare persistent storage permissions
- reduce Coolify build load
- allow Coolify build args
- fix: stub CarrierWave in tests and guard koi destroy against linked orders
- fix: restore logo hide-on-scroll across all pages
- fix biome issue


### Integration
- Merge pull request #55 from DevRedious/MVP

feat: add product, order, payment, and client management features
- Merge pull request #54 from DevRedious/MVP

fix: fix: restore logo hide-on-scroll across all pages
- Merge pull request #53 from DevRedious/MVP

refactor: refactor: complete mobile-first CSS conversion and accessib…


---## [2026-03-21]

### Added
- unify image source retrieval across helpers
- improve koi deletion handling and refactor image source methods
- enhance koi image validation and improve admin functionality
- enhance koi image handling and admin email configuration
- enhance koi management interface and functionality
- migrate visitors pages to rails


### Changed
- streamline image URL retrieval in application helper
- remove trailing whitespace in devise initializer
- clean up CSS files and improve code consistency
- standardize spacing in controller and helper files
- update file permissions for executable scripts
- improve CSS specificity and JavaScript formatting
- enhance visitor pages with improved layout and styling
- refactor Gemfile and remove unused files
- remove outdated admin documentation and CSS files
- migrate CSS from require to @import for modularity and maintainability
- update .env.example and .gitignore, refine rails_mvp_plan.md
- update rails_mvp_plan.md with gem version specifications
- update rails_mvp_plan.md with environment details and Biome integration notes
- update MVP plans with critical corrections and enhancements
- add Audit for plan
- expand check_mvp_plan.md with validation insights and additional corrections
- refine check_mvp_plan.md with critical issues and minor corrections
- add check mvp plan
- complete and fix rails_mvp_plan.md
- enhance CLAUDE.md and rails_mvp_plan.md with architecture overview and critical notes
- update CLAUDE.md to reflect MVP branch and dual-phase structure
- add Rails MVP implementation plan for oral blanc


### Integration
- Merge pull request #49 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
- Merge pull request #51 from DevRedious/MVP

Mvp


---## [2026-03-20]

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
- Merge pull request #48 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
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


---## [2026-05-12]

### Changed
- adjust README formatting and improve tech stack table layout
- sync DEV into local docker stack


### Fixed
- satisfy PR quality gates
- resolve PR quality checks


### Integration
- Merge pull request #57 from DevRedious/setup/local-docker-stack

style: adjust README formatting and improve tech stack table layout
- Merge pull request #56 from DevRedious/setup/local-docker-stack

feat: prepare local Docker stack and DEV staging


---## [2026-03-23]

### Added
- add local admin access shortcut
- add hero discover cue
- enhance Docker stack configuration for improved stability
- stabilize local Docker stack
- add local Docker public admin stack
- replace home hero video with Kois-story-aissai image
- feat: enhance navbar with exclusive Konishi branding
- add admin bulk actions and sorting
- add admin server-side filters
- paginate admin index pages
- improve admin oversight workflows
- improve message workflow and contact UX
- add turnstile support to contact form
- protect contact form from bots
- add message contact references
- style admin contact email
- style contact acknowledgement email
- send contact acknowledgement email
- feat: implement Nike-style mobile navbar with sticky filter bar
- add product, order, payment, and client management features


### Changed
- restore active nav gradient hover
- animate public nav indicator
- animate brand gradient variants
- restore brand gradients on color variants
- simplify button color variants
- apply color palette v4
- update project documentation
- refresh readme brand references
- update project readme status
- replace heavy public images with avif
- New palette
- add public brand svg assets
- simplify hero copy and rename "spécimen" to "koï" sitewide
- refactor: update client-facing wording and Konishi branding across all pages
- test: add full Playwright coverage for public and admin flows
- refactor: clean up client-facing wording per Mathilde brief
- add client mission brief
- remove duplicate admin identity from sidebar
- polish admin sidebar navigation
- document Coolify HTTPS setup
- test Coolify auto deploy webhook
- prepare Coolify deployment
- update todo
- style: mobile UX polish — hero, wave spacing, shop badges
- Fix nothing. Trying to resolve the navbar but still got issues
- streamline image preview removal in koi-form.js
- enhance CSS for admin resources and responsive tables; improve JavaScript file handling
- fix biome formatting in toast.js
- refactor: complete mobile-first CSS conversion and accessibility pass


### Fixed
- smooth Turbo public navigation
- prevent double nav indicator animation
- animate nav indicator only after navigation
- use V2 circle logo
- use dark circle logo in chrome
- use koi pond hero image
- use circle logo assets
- restore new logo assets
- replace Lignée Konishi with 100% Konishi across all views
- replace Lignée Konishi with 100% Konishi across all views
- fix image not visible in the hero
- fix badge overlap, show Konishi badge on mobile
- responsive navbar — mobile logo alignment + desktop breakpoint
- add libffi-dev to Dockerfile build stage for fiddle gem
- add fiddle gem for Ruby 3.4+ compatibility
- remove dashboard horizontal overflow
- use compact turnstile on narrow screens
- tighten mobile turnstile spacing
- keep turnstile widget inside mobile form
- fix: filter bar no longer leaves gap when header hides on scroll
- restore mobile contact form layout
- prevent horizontal overflow scroll on all viewports
- reveal full sidebar section labels
- fix badge and underline size
- remove admin theme switching
- soften email hero background
- set contact email reply-to
- prevent burger menu from being cropped on mobile devices
- vertically center navbar pill within sticky filter bar on desktop
- hide grid item wrapper on filter, not the card itself
- resolve filter bar and first-load rendering issues
- resolve blank first-load caused by invalid CSP nonce
- resolve production font assets
- prepare persistent storage permissions
- reduce Coolify build load
- allow Coolify build args
- fix: stub CarrierWave in tests and guard koi destroy against linked orders
- fix: restore logo hide-on-scroll across all pages
- fix biome issue


### Integration
- Merge pull request #55 from DevRedious/MVP

feat: add product, order, payment, and client management features
- Merge pull request #54 from DevRedious/MVP

fix: fix: restore logo hide-on-scroll across all pages
- Merge pull request #53 from DevRedious/MVP

refactor: refactor: complete mobile-first CSS conversion and accessib…


---## [2026-03-21]

### Added
- unify image source retrieval across helpers
- improve koi deletion handling and refactor image source methods
- enhance koi image validation and improve admin functionality
- enhance koi image handling and admin email configuration
- enhance koi management interface and functionality
- migrate visitors pages to rails


### Changed
- streamline image URL retrieval in application helper
- remove trailing whitespace in devise initializer
- clean up CSS files and improve code consistency
- standardize spacing in controller and helper files
- update file permissions for executable scripts
- improve CSS specificity and JavaScript formatting
- enhance visitor pages with improved layout and styling
- refactor Gemfile and remove unused files
- remove outdated admin documentation and CSS files
- migrate CSS from require to @import for modularity and maintainability
- update .env.example and .gitignore, refine rails_mvp_plan.md
- update rails_mvp_plan.md with gem version specifications
- update rails_mvp_plan.md with environment details and Biome integration notes
- update MVP plans with critical corrections and enhancements
- add Audit for plan
- expand check_mvp_plan.md with validation insights and additional corrections
- refine check_mvp_plan.md with critical issues and minor corrections
- add check mvp plan
- complete and fix rails_mvp_plan.md
- enhance CLAUDE.md and rails_mvp_plan.md with architecture overview and critical notes
- update CLAUDE.md to reflect MVP branch and dual-phase structure
- add Rails MVP implementation plan for oral blanc


### Integration
- Merge pull request #49 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
- Merge pull request #51 from DevRedious/MVP

Mvp


---## [2026-03-20]

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
- Merge pull request #48 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
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


---## [2026-03-21]

### Added
- unify image source retrieval across helpers
- improve koi deletion handling and refactor image source methods
- enhance koi image validation and improve admin functionality
- enhance koi image handling and admin email configuration
- enhance koi management interface and functionality
- migrate visitors pages to rails


### Changed
- streamline image URL retrieval in application helper
- remove trailing whitespace in devise initializer
- clean up CSS files and improve code consistency
- standardize spacing in controller and helper files
- update file permissions for executable scripts
- improve CSS specificity and JavaScript formatting
- enhance visitor pages with improved layout and styling
- refactor Gemfile and remove unused files
- remove outdated admin documentation and CSS files
- migrate CSS from require to @import for modularity and maintainability
- update .env.example and .gitignore, refine rails_mvp_plan.md
- update rails_mvp_plan.md with gem version specifications
- update rails_mvp_plan.md with environment details and Biome integration notes
- update MVP plans with critical corrections and enhancements
- add Audit for plan
- expand check_mvp_plan.md with validation insights and additional corrections
- refine check_mvp_plan.md with critical issues and minor corrections
- add check mvp plan
- complete and fix rails_mvp_plan.md
- enhance CLAUDE.md and rails_mvp_plan.md with architecture overview and critical notes
- update CLAUDE.md to reflect MVP branch and dual-phase structure
- add Rails MVP implementation plan for oral blanc


### Integration
- Merge pull request #51 from DevRedious/MVP

Mvp


---## [2026-03-20]

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
- Merge pull request #48 from DevRedious/chore/auto-update-changelog

docs: auto-update CHANGELOG
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


---## [2026-03-20]

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
