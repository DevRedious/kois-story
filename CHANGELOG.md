# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project follows a pre-production workflow until the first production deployment.
Each entry keeps its human author and short commit SHA for traceability.

---

## [2026-05-13]

### Added
- nav-pill header, navy-gold WA CTAs, H1 sumi underline — Romain (`8c663e5`)
- add navigation pill reuse implementation plan — Romain (`4041e54`)
- add navigation pill reuse design spec — Romain (`9c6c64c`)
- add Cursor session preflight skill — Romain (`a3c8634`)

### Changed
- format nav-pill-link selectors for Biome — Romain (`af4b713`)
- format Discord changelog mentions — Morgan (`76f1f00`)
- clean dev changelog history — Morgan (`6f1089a`)
- clean dev changelog history — Morgan (`20dacb8`)
- stabilize changelog and release automation — Morgan (`7f6c3a0`)

### Fixed
- satisfy Biome specificity and format rules — Romain (`3e6c760`)
- remove trailing commas in hashes for RuboCop — Romain (`157f021`)
- use Brevo SMTP for production mailer — Morgan (`c147674`)

### Integration
- Merge pull request #69: Setup/local docker stack — Romain (`f90796c`)
- Merge branch 'DEV' into setup/local-docker-stack — Romain (`aaf18ff`)
- Merge pull request #68: docs: auto-update CHANGELOG — Automation (`1accfa1`)
- auto-update CHANGELOG — Automation (`ef90fe2`)
- Merge pull request #67: docs: format Discord changelog mentions — Morgan (`63b4bbe`)
- Merge pull request #66: docs: auto-update CHANGELOG — Automation (`a520191`)
- auto-update CHANGELOG — Automation (`85dd003`)
- Merge pull request #65: docs: clean changelog and add Discord digest — Morgan (`ca894ce`)
- Merge pull request #64: docs: auto-update CHANGELOG — Automation (`ca04704`)
- auto-update CHANGELOG — Automation (`5560f63`)
- Merge pull request #63: docs: clean DEV changelog history — Morgan (`1cf3b02`)
- Merge pull request #62: docs: auto-update CHANGELOG — Automation (`acc0f79`)
- auto-update CHANGELOG — Automation (`c842a3f`)
- Merge pull request #61: ci: stabilize changelog and production release automation — Morgan (`afc6c9d`)
- Merge pull request #58: fix: use Brevo SMTP for staging mailer — Morgan (`2f4f843`)
- Merge branch 'DEV' into fix/brevo-smtp-staging — Morgan (`ca5707c`)
- Merge pull request #59: docs: auto-update CHANGELOG — Automation (`5648a67`)
- auto-update CHANGELOG — Automation (`5741c07`)
- Merge pull request #52: docs: auto-update CHANGELOG — Automation (`f4ff572`)

---

## [2026-05-12]

### Added
- add local admin access shortcut — Morgan (`c5aaea8`)

### Changed
- adjust README formatting and improve tech stack table layout — Romain (`b948f98`)
- sync DEV into local docker stack — Morgan (`942b327`)
- animate public nav indicator — Morgan (`25e487e`)
- animate brand gradient variants — Morgan (`f979753`)
- simplify button color variants — Morgan (`318293c`)
- apply color palette v4 — Morgan (`46a6b42`)

### Fixed
- satisfy PR quality gates — Morgan (`779783a`)
- resolve PR quality checks — Morgan (`700e8e7`)
- smooth Turbo public navigation — Morgan (`3293999`)
- prevent double nav indicator animation — Morgan (`071544f`)
- restore active nav gradient hover — Morgan (`5d49507`)
- animate nav indicator only after navigation — Morgan (`4814b62`)
- restore brand gradients on color variants — Morgan (`0e46228`)

### Integration
- auto-update CHANGELOG — Automation (`5f5788c`)
- Merge pull request #57: style: adjust README formatting and improve tech stack table layout — Romain (`dcb5d6f`)
- Merge pull request #56: feat: prepare local Docker stack and DEV staging — Morgan (`fd579cb`)

---

## [2026-05-11]

### Added
- add hero discover cue — Morgan (`4db76e1`)
- enhance Docker stack configuration for improved stability — Morgan (`11d56a0`)
- stabilize local Docker stack — Morgan (`418c752`)
- new palette — Romain (`661b993`)
- add public brand svg assets — Morgan (`97b004e`)
- add local Docker public admin stack — Morgan (`8ed836d`)

### Changed
- update project documentation — Morgan (`2fd6c6a`)
- refresh readme brand references — Morgan (`32ce55a`)
- update project readme status — Morgan (`1c17fd8`)
- replace heavy public images with avif — Morgan (`1b81f59`)

### Fixed
- use V2 circle logo — Morgan (`3f6d701`)
- use dark circle logo in chrome — Morgan (`e48defe`)
- use koi pond hero image — Morgan (`e79fa82`)
- use circle logo assets — Morgan (`4c7f817`)
- restore new logo assets — Morgan (`e6229f4`)

---

## [2026-04-20]

### Fixed
- replace Lignée Konishi with 100% Konishi across all views — Valentin (`34bc32e`)
- replace Lignée Konishi with 100% Konishi across all views — Valentin (`7268dd8`)

---

## [2026-04-17]

### Changed
- simplify hero copy and rename "spécimen" to "koï" sitewide — Romain (`365c34c`)

---

## [2026-04-14]

### Added
- replace home hero video with Kois-story-aissai image — Romain (`5048ae3`)

### Fixed
- fix image not visible in the hero — Romain (`9690278`)

---

## [2026-04-13]

### Changed
- update client-facing wording and Konishi branding across all pages — Romain (`f09f33a`)

### Fixed
- fix badge overlap, show Konishi badge on mobile — Valentin (`cbedf3d`)
- responsive navbar — mobile logo alignment + desktop breakpoint — Valentin (`a1d7a0d`)

---

## [2026-04-12]

### Added
- enhance navbar with exclusive Konishi branding — Romain (`6b916e5`)

---

## [2026-04-11]

### Added
- add full Playwright coverage for public and admin flows — Romain (`567888a`)

---

## [2026-04-10]

### Added
- add libffi-dev to Dockerfile build stage for fiddle gem — Romain (`286136d`)
- add fiddle gem for Ruby 3.4+ compatibility — Romain (`bef38d5`)
- add client mission brief — Morgan (`64348c6`)

### Changed
- clean up client-facing wording per Mathilde brief — Romain (`4e84ce3`)

---

## [2026-04-08]

### Added
- add admin bulk actions and sorting — Morgan (`12e3f68`)
- add admin server-side filters — Morgan (`994db42`)
- paginate admin index pages — Morgan (`dfcf403`)
- improve admin oversight workflows — Morgan (`8666d07`)
- improve message workflow and contact UX — Morgan (`8cf0c81`)
- add turnstile support to contact form — Morgan (`8611932`)
- protect contact form from bots — Morgan (`de42049`)
- add message contact references — Morgan (`f34b1c4`)
- style admin contact email — Morgan (`14963cb`)
- style contact acknowledgement email — Morgan (`d5aa46e`)
- send contact acknowledgement email — Morgan (`4368978`)

### Changed
- polish admin sidebar navigation — Morgan (`eb87b6e`)
- document Coolify HTTPS setup — Morgan (`fbdfb12`)
- test Coolify auto deploy webhook — Morgan (`b5718a0`)
- prepare Coolify deployment — Morgan (`8fff4f5`)

### Fixed
- remove dashboard horizontal overflow — Morgan (`d8f58a9`)
- use compact turnstile on narrow screens — Morgan (`3bb5321`)
- tighten mobile turnstile spacing — Morgan (`56aae0a`)
- keep turnstile widget inside mobile form — Morgan (`b0cce1e`)
- filter bar no longer leaves gap when header hides on scroll — Valentin (`513aff4`)
- restore mobile contact form layout — Morgan (`d762d65`)
- prevent horizontal overflow scroll on all viewports — Valentin (`e290d44`)
- reveal full sidebar section labels — Morgan (`c726d6d`)
- fix badge and underline size — Romain (`a8a9153`)
- remove admin theme switching — Morgan (`f701739`)
- soften email hero background — Morgan (`7b19149`)
- set contact email reply-to — Morgan (`5f79557`)
- prevent burger menu from being cropped on mobile devices — Valentin (`45db8e3`)
- vertically center navbar pill within sticky filter bar on desktop — Valentin (`8f4bb1b`)
- hide grid item wrapper on filter, not the card itself — Valentin (`58f1a36`)
- resolve filter bar and first-load rendering issues — Valentin (`6da0b6c`)
- resolve blank first-load caused by invalid CSP nonce — Valentin (`6f52e9f`)
- resolve production font assets — Morgan (`9b00c86`)
- prepare persistent storage permissions — Morgan (`44a4857`)
- reduce Coolify build load — Morgan (`3614e11`)
- allow Coolify build args — Morgan (`cb04ae8`)

### Removed
- remove duplicate admin identity from sidebar — Morgan (`db967c9`)

---

## [2026-04-07]

### Changed
- update todo — Romain (`74cac91`)

---

## [2026-03-26]

### Added
- implement Nike-style mobile navbar with sticky filter bar — Romain (`a3bec16`)

### Changed
- mobile UX polish — hero, wave spacing, shop badges — Romain (`c9742fd`)

---

## [2026-03-25]

### Fixed
- Fix nothing. Trying to resolve the navbar but still got issues — Valentin (`5f9afb3`)

---

## [2026-03-23]

### Added
- add product, order, payment, and client management features — Morgan (`4faa1b7`)

### Changed
- streamline image preview removal in koi-form.js — Morgan (`95cf2fc`)
- enhance CSS for admin resources and responsive tables; improve JavaScript file handling — Morgan (`9c7d06a`)

### Fixed
- fix biome formatting in toast.js — Valentin (`66ce536`)
- stub CarrierWave in tests and guard koi destroy against linked orders — Valentin (`4059547`)
- restore logo hide-on-scroll across all pages — Valentin (`16c0665`)
- fix biome issue — Romain (`9012392`)

### Integration
- Merge pull request #55: feat: add product, order, payment, and client management features — Morgan (`4bdf45e`)
- Merge pull request #54: fix: fix: restore logo hide-on-scroll across all pages — Valentin (`9490e8f`)
- Merge pull request #53: refactor: refactor: complete mobile-first CSS conversion and accessib… — Romain (`723f8ba`)

---

## [2026-03-22]

### Changed
- complete mobile-first CSS conversion and accessibility pass — Romain (`2f2ac0f`)

---

## [2026-03-21]

### Added
- unify image source retrieval across helpers — Morgan (`14129e3`)
- improve koi deletion handling and refactor image source methods — Morgan (`62d2a07`)
- enhance koi image validation and improve admin functionality — Morgan (`c6bfa35`)
- enhance koi image handling and admin email configuration — Morgan (`f24caa5`)

### Changed
- streamline image URL retrieval in application helper — Morgan (`d4898cf`)

### Integration
- Merge pull request #49: docs: auto-update CHANGELOG — Automation (`9b78b54`)
- auto-update CHANGELOG — Automation (`f39c2af`)
- Merge pull request #51: Mvp — Morgan (`42a12eb`)

---

## [2026-03-20]

### Added
- enhance koi management interface and functionality — Morgan (`db421de`)
- migrate visitors pages to rails — Morgan (`2d1ea0e`)
- add Audit for plan — Romain (`b922fe1`)
- add check mvp plan — Romain (`322c927`)
- add Rails MVP implementation plan for oral blanc — Morgan (`f9e76ab`)

### Changed
- clean up CSS files and improve code consistency — Morgan (`db470ea`)
- standardize spacing in controller and helper files — Morgan (`4018d7e`)
- update file permissions for executable scripts — Morgan (`6c42ef1`)
- improve CSS specificity and JavaScript formatting — Morgan (`2d8dd7a`)
- enhance visitor pages with improved layout and styling — Morgan (`790a4c4`)
- refactor Gemfile and remove unused files — Morgan (`f29172b`)
- migrate CSS from require to @import for modularity and maintainability — Morgan (`9dc9b95`)
- update .env.example and .gitignore, refine rails_mvp_plan.md — Morgan (`7ad8c79`)
- update rails_mvp_plan.md with gem version specifications — Morgan (`24e9026`)
- update rails_mvp_plan.md with environment details and Biome integration notes — Morgan (`96ced76`)
- update MVP plans with critical corrections and enhancements — Morgan (`3b07886`)
- expand check_mvp_plan.md with validation insights and additional corrections — Morgan (`d908623`)
- refine check_mvp_plan.md with critical issues and minor corrections — Morgan (`75eaa39`)
- complete and fix rails_mvp_plan.md — Morgan (`e194a1d`)
- enhance CLAUDE.md and rails_mvp_plan.md with architecture overview and critical notes — Morgan (`50f3f7d`)
- update CLAUDE.md to reflect MVP branch and dual-phase structure — Morgan (`14b43d1`)
- normalize line endings to LF across VISITORS and todo.md — Morgan (`00452f0`)
- update .gitattributes for consistent line endings — Morgan (`ac0f2a7`)
- update CHANGELOG, CONTRIBUTORS and README with project tracking — Morgan (`1a91445`)
- standardize branch naming from `dev` to `DEV` across documentation — Morgan (`68fa3e8`)

### Fixed
- restrict changelog workflow to DEV branch only — Morgan (`31fbb10`)
- resolve CHANGELOG conflict — keep curated version from admin-and-back — Morgan (`86e0c1a`)

### Removed
- remove trailing whitespace in devise initializer — Morgan (`23118a8`)
- remove outdated admin documentation and CSS files — Morgan (`8e30463`)
- remove duplicate Team section from README, point to CONTRIBUTORS.md — Morgan (`0513531`)

### Integration
- Merge pull request #48: docs: auto-update CHANGELOG — Automation (`669300f`)
- auto-update CHANGELOG — Automation (`4ad2830`)
- Merge pull request #40: docs: auto-update CHANGELOG — Automation (`8347a75`)
- auto-update CHANGELOG — Automation (`ef26781`)
- Merge pull request #39: docs: CHANGELOG history, CONTRIBUTORS avatars, README progress tracker — Morgan (`990c36e`)

---

## [2026-03-19]

### Added
- add action plan — Romain (`4573e77`)
- add GEMINI.md guidance file for Gemini CLI — Morgan (`06062b2`)
- add THP/Rails full audit and implementation guides — Morgan (`6fd0192`)
- implement modal system and wire all non-functional buttons in ADMIN — Morgan (`c87ff3c`)
- add wave clip-path and story background to decouvrir page — Romain (`85140f8`)
- add PowerShell setup script for Windows users — Morgan (`bd10a95`)
- add Biome, HTML validation, release, stale workflows and CODEOWNERS — Morgan (`d85d142`)
- automatiser le CHANGELOG et guider les messages de commit — Morgan (`dbeb07f`)
- restore missing files from Maquette (assets, design tokens, docs) — Morgan (`f8aaec3`)
- restore VISITORS from Maquette — fix accidental deletion in e00ff38 — Morgan (`483ff04`)

### Changed
- update changelog format and commit parser rules — Morgan (`d169a4d`)
- update changelog workflow to create pull requests — Morgan (`79f2672`)
- improve refactoring-media-queries.md — Romain (`c029235`)
- auto-format all scripts in ADMIN/scripts with Biome — Morgan (`446e756`)
- auto-format strip-inline-styles-pass2.mjs with Biome — Morgan (`a11d8f3`)
- wire admin to VISITORS buttons and drop inline styles from HTML — Morgan (`765c653`)
- improve azukari page layout, text contrast and hero-intro centering — Romain (`b973013`)
- update print statement from 'Hello' to 'Goodbye' — Morgan (`cd1d0d9`)
- rework contact section on home page — Valentin (`101a920`)
- auto-format with Biome and fix 4 lint errors — Morgan (`225eb4a`)
- trigger PR checks — Morgan (`46b51d0`)
- update CODEOWNERS with real GitHub usernames — Morgan (`ff22824`)
- switch CHANGELOG to English (headers, groups, workflow) — Morgan (`afde724`)
- ajouter build, ci et revert aux types de commit autorisés — Morgan (`9f304ae`)
- sync docs/todo.md with Maquette — add client ChatGPT feedback section — Morgan (`a4f9616`)
- Refactor admin styles and components for consistency; update badge, button, input, and avatar atoms with new color variables and improved layout. Enhance filter bar and koi row structures for better usability. Update README with new badge statuses and theme switcher functionality — Morgan (`29ca6c9`)

### Fixed
- fix biome issue — Romain (`2f6211a`)
- fix Biome issues in stimulus_controller_examples.js — Morgan (`cc8ea1d`)
- fix Biome lint and format issues in modal system files — Morgan (`f8c75ad`)
- repair navbar and footer structure across all visitor pages — Valentin (`45e625d`)
- fix btn--wa text color, footer social icons, hero video fade — Valentin (`8bb5cee`)
- fix wave clip-path compensation and mobile layout across VISITORS — Romain (`661495c`)
- resolve HTML/CSS accessibility and compatibility lint issues — Morgan (`a25d991`)
- fix biome issues — Romain (`ff8163d`)
- apply Biome auto-format and lint fixes — Valentin (`eb9a62b`)
- replace broken curl/tar git-cliff install with taiki-e/install-action — Morgan (`f3d7192`)
- replace git-cliff Docker action with direct binary install — Morgan (`5142647`)
- relax Biome and html-validate rules for prototype files — Morgan (`0479743`)
- resolve merge conflicts with DEV — keep admin-and-back version for VISITORS — Morgan (`0c4b603`)
- convert shell scripts to LF line endings, add .gitattributes — Morgan (`624f01a`)
- move euro sign after price amount (number€ instead of €number) — Valentin (`1309eda`)
- fix rebase for pull branch — Morgan (`e00ff38`)

### Removed
- remove old todo files superseded by TODO.md — Morgan (`aeeed50`)

### Integration
- Merge pull request #18: docs: auto-update CHANGELOG — Automation (`9008542`)
- auto-update CHANGELOG — Automation (`b3223c7`)
- Merge pull request #15: docs: auto-update CHANGELOG — Automation (`904d000`)
- auto-update CHANGELOG — Automation (`47b3ba6`)
- Merge pull request #17: chore: update changelog format and commit parser rules — Morgan (`295aa2a`)
- Merge branch 'main' into admin-and-back — Morgan (`85c9948`)
- Merge pull request #13: Merge Dev to main — Romain (`275104b`)
- Merge pull request #14: chore: update changelog workflow to create pull requests — Morgan (`c6e1d0b`)
- Merge branch 'main' into DEV — Morgan (`fb37d21`)
- Merge pull request #12: docs: improve refactoring-media-queries.md — Romain (`0c1555d`)
- Merge pull request #11: Maquette — Romain (`b21b889`)
- Merge pull request #10: Admin and back — Morgan (`7905eca`)
- Merge pull request #9: style: wire admin to VISITORS buttons and drop inline styles from HTML — Morgan (`eb8ac5f`)
- Merge pull request #8: Maquette — Romain (`cc0706c`)
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette — Romain (`af8d308`)
- Merge pull request #7: Refactor CSS styles and enhance atomic design features — Valentin (`04778de`)
- Merge origin/DEV into   Maquette — resolve conflicts PR #7 — Valentin (`9b319e4`)
- Merge pull request #6: fix(ci): replace broken curl/tar git-cliff install with taiki-e/insta… — Morgan (`10f5e92`)
- Merge pull request #5: fix(ci): replace git-cliff Docker action with direct binary install — Morgan (`490a9d2`)
- Merge pull request #4: Admin and back — Morgan (`5f893c1`)

---

## [2026-03-18]

### Added
- add fixes — Romain (`67ff5e0`)
- add waves for other heros — Romain (`e2f6518`)

### Changed
- trying to save my work — Valentin (`04f37e4`)
- accessibility: enforce WCAG AAA contrast and fix non-contrast violations across VISITORS — Romain (`a8a38dd`)
- update the koi vedette in home page and fixing € issue — Valentin (`cf7f964`)
- changing hero color to black — Valentin (`54f1201`)
- stilll need to work on hero cuz it's unreadable — Valentin (`aa912b9`)
- make some change in the hero — Valentin (`75857f2`)
- change card informations and fix wave clip path and add doc for this — Romain (`bc91b43`)
- make some change on the button style + working on the bg + working on the vedette pictures — Valentin (`a525a99`)

### Fixed
- fixing font issue on Hanabi — Valentin (`59ba173`)
- resolve merge conflict in hero.css — keep Maquette wave clip-path approach — Valentin (`437ca58`)
- resolve merge conflict in catalogue.css — keep top: 0 and backdrop-filter — Valentin (`1589635`)
- fixing the navbar issue on kois's page + make some changes on the border radius in all button + working on lisibility on part of cards + fixing footer — Valentin (`6973893`)
- fix css and add atomic design feature — Romain (`358e337`)
- fix some things for all pages / cards / products. remove circulargallery — Romain (`8950101`)

### Removed
- delete the liquid option in our button — Valentin (`7b709cd`)
- remove video loop — Romain (`182a619`)
- remove wave.svg. did almost all todo. rest svg — Romain (`f5f2d6b`)

### Integration
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette — Valentin (`d4d62b8`)
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette — Romain (`eb36fa1`)
- Merge pull request #2: Maquette — Morgan (`fef4fb3`)
- Merge branch 'DEV' into Maquette — Morgan (`df6b17c`)

---

## [2026-03-17]

### Added
- add the new navbar and the new footer in all pages — Valentin (`1b3830e`)
- add some motion for all pages — Romain (`996475d`)
- add client files + make somes changes on the todo — Valentin (`301efd9`)

### Changed
- V3 model : try to some motion and add circulargallery — Romain (`0280b6a`)
- maquette v2 after our call. Need to fix many things (logo, colors, fonts, etc) but it's a basics — Valentin (`2747d68`)

### Removed
- remove circular gallery — client feedback — Romain (`1b82f22`)

### Integration
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette — Valentin (`5f3f4fd`)

---

## [2026-03-16]

### Added
- add GitHub Pages config for Maquette branch — Valentin (`0c2b5de`)
- add video to hero for koï's site improve — Romain (`108e541`)

### Fixed
- fixed link issue in home page — Valentin (`41a1a81`)
- fixed all the 4/3 | 3/4 ratio images issues / remove the gallery / remove the second catalogue button — Valentin (`9fe0eed`)
- fixing card issue about the fish picture — Valentin (`92f06da`)

### Removed
- remove loop for video in the hero — Romain (`29a9ec1`)

---

## [2026-03-13]

### Changed
- update CONTRIBUTING.md to clarify branch model and workflow, changing branch names to lowercase and adjusting pull request directions — Morgan (`0fee216`)
- update biome.json to expand ignored file patterns, including all HTML files and specific directories — Morgan (`49cf4e7`)

---

## [2026-03-12]

### Changed
- enhance documentation with new admin and visitors atomic design structures; update todo and README for clarity — Morgan (`d9bd2be`)
- update documentation structure and paths; reorganize wireframes and design files — Morgan (`4ba74c5`)

---

## [2026-03-11]

### Changed
- README updated again — Valentin (`38490a5`)
- README updated — Valentin (`8f01e59`)

### Integration
- Merge pull request #1: Dev — Morgan (`7864c7f`)

---

## [2026-03-10]

### Added
- first commit — Morgan (`8c9e1fa`)

---
