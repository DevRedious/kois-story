# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project follows a pre-production workflow until the first production deployment.

---

## [Unreleased]


### Integration
- Merge pull request #17 from DevRedious/admin-and-back

chore: update changelog format and commit parser rules
- Merge branch 'main' into admin-and-back

## [2026-03-19]

### Added
- feat: add wave clip-path and story background to decouvrir page
- implement modal system and wire all non-functional buttons in ADMIN
- automatiser le CHANGELOG et guider les messages de commit
- restore missing files from Maquette (assets, design tokens, docs)
- restore VISITORS from Maquette — fix accidental deletion in e00ff38


### Changed
- improve refactoring-media-queries.md
- add action plan
- fix: fix btn--wa text color, footer social icons, hero video fade
- update changelog format and commit parser rules
- update changelog workflow to create pull requests
- fix Biome issues in stimulus_controller_examples.js
- fix Biome lint and format issues in modal system files
- add GEMINI.md guidance file for Gemini CLI
- add THP/Rails full audit and implementation guides
- auto-format all scripts in ADMIN/scripts with Biome
- auto-format strip-inline-styles-pass2.mjs with Biome
- wire admin to VISITORS buttons and drop inline styles from HTML
- fix: improve azukari page layout, text contrast and hero-intro centering
- Update print statement from 'Hello' to 'Goodbye'
- auto-format with Biome and fix 4 lint errors
- trigger PR checks
- add PowerShell setup script for Windows users
- remove old todo files superseded by TODO.md
- update CODEOWNERS with real GitHub usernames
- add Biome, HTML validation, release, stale workflows and CODEOWNERS
- switch CHANGELOG to English (headers, groups, workflow)
- ajouter build, ci et revert aux types de commit autorisés
- sync docs/todo.md with Maquette — add client ChatGPT feedback section
- Refactor admin styles and components for consistency; update badge, button, input, and avatar atoms with new color variables and improved layout. Enhance filter bar and koi row structures for better usability. Update README with new badge statuses and theme switcher functionality.
- feat: rework contact section on home page
- add fixes
- enforce WCAG AAA contrast and fix non-contrast violations across VISITORS
- trying to save my work
- update the koi vedette in home page and fixing € issue
- delete the liquid option in our button
- changing hero color to black
- stilll need to work on hero cuz it's unreadable
- add waves for other heros
- change card informations and fix wave clip path and add doc for this
- make some change in the hero
- make some change on the button style + working on the bg + working on the vedette pictures
- Add video to hero for koï's site improve
- add some motion for all pages
- add the new navbar and the new footer in all pages
- V3 model : try to some motion and add circulargallery
- maquette v2 after our call. Need to fix many things (logo, colors, fonts, etc) but it's a basics
- add client files + make somes changes on the todo
- add GitHub Pages config for Maquette branch
- Fixed all the 4/3 | 3/4 ratio images issues / remove the gallery / remove the second catalogue button
- Update CONTRIBUTING.md to clarify branch model and workflow, changing branch names to lowercase and adjusting pull request directions.
- Update biome.json to expand ignored file patterns, including all HTML files and specific directories
- Enhance documentation with new admin and visitors atomic design structures; update todo and README for clarity
- Update documentation structure and paths; reorganize wireframes and design files
- Readme updated again
- Readme updated
- first commit


### Fixed
- fix biome issue
- fix: repair navbar and footer structure across all visitor pages
- fix(responsive): fix wave clip-path compensation and mobile layout across VISITORS
- resolve HTML/CSS accessibility and compatibility lint issues
- fix biome issues
- chore: apply Biome auto-format and lint fixes
- **ci**: replace broken curl/tar git-cliff install with taiki-e/install-action
- **ci**: replace git-cliff Docker action with direct binary install
- relax Biome and html-validate rules for prototype files
- resolve merge conflicts with DEV — keep admin-and-back version for VISITORS
- convert shell scripts to LF line endings, add .gitattributes
- fix rebase for pull branch
- :bug: move euro sign after price amount (number€ instead of €number)
- fixing font issue on Hanabi
- resolve merge conflict in hero.css — keep Maquette wave clip-path approach
- resolve merge conflict in catalogue.css — keep top: 0 and backdrop-filter
- fixing the navbar issue on kois's page + make some changes on the border radius in all button + working on lisibility on part of cards + fixing footer
- fix css and add atomic design feature
- fix some things for all pages / cards / products. remove circulargallery
- fixed link issue in home page
- fixing card issue about the fish picture


### Integration
- Merge pull request #13 from DevRedious/DEV

Merge Dev to main
- Merge pull request #14 from DevRedious/admin-and-back

chore: update changelog workflow to create pull requests
- Merge branch 'main' into DEV
- Merge pull request #1 from DevRedious/DEV

Dev
- Merge pull request #12 from DevRedious/Maquette

docs: improve refactoring-media-queries.md
- Merge pull request #11 from DevRedious/Maquette

Maquette
- Merge pull request #10 from DevRedious/admin-and-back

Admin and back
- Merge pull request #9 from DevRedious/admin-and-back

style: wire admin to VISITORS buttons and drop inline styles from HTML
- Merge pull request #8 from DevRedious/Maquette

Maquette
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette
- Merge pull request #7 from DevRedious/Maquette

Refactor CSS styles and enhance atomic design features
- Merge origin/DEV into
  Maquette — resolve conflicts PR #7
- Merge pull request #6 from DevRedious/admin-and-back

fix(ci): replace broken curl/tar git-cliff install with taiki-e/insta…
- Merge pull request #5 from DevRedious/admin-and-back

fix(ci): replace git-cliff Docker action with direct binary install
- Merge pull request #4 from DevRedious/admin-and-back

Admin and back
- Merge pull request #2 from DevRedious/Maquette

Maquette
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette
- Merge branch 'DEV' into Maquette
- Merge branch 'Maquette' of github.com:DevRedious/kois-story into Maquette


### Removed
- remove video loop
- remove wave.svg. did almost all todo. rest svg.
- remove loop for video in the hero
- remove circular gallery — client feedback


