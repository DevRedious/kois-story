# Client Mission Tasks - 2026-04-10

## Mission Goal

Align the public site with Mathilde's feedback from WhatsApp messages and audio transcripts.

This document is the execution brief for AI agents and teammates. It maps client requests to concrete code areas and expected deliverables.

## High-Level Priorities

1. Clean up all misleading wording.
2. Rework the homepage so it feels more premium, simpler, and less koi-catalog-heavy.
3. Clarify the Konishi link without using inaccurate legal/commercial claims.
4. Simplify `Nous decouvrir` around Manu + Mathilde.
5. Remove redundant Konishi filtering in the public catalog.
6. Prepare a homepage news/progress section based on worksite photos.
7. Keep the domain/site hidden until launch readiness is confirmed.

## Hard Constraints

- Do not use `elevage` or `eleveur` in public-facing copy.
- Do not use wording like `officiellement certifies`.
- Do not overstate the Konishi relationship if the client herself flagged the wording as risky.
- Prefer `Manu` over `Emmanuel` in public-facing copy.
- Prefer `selectionnees avec soin` over `selectionnees avec passion`.
- Do not leave the public homepage as a duplicate of the catalog.

## Available Inputs

- Client written feedback and audio transcripts in `docs/audio/transcripts/`
- Existing visitor views in `app/views/pages/`, `app/views/home/`, `app/views/kois/`
- Existing public styles in `app/assets/stylesheets/visitors/`
- Worksite photos sorted locally in `C:\Users\momoz\Downloads\kois-story`

## Workstream 1 - Homepage Hero

**Status: PARTIAL — wording done, visuals blocked on assets**

### Objectives

- Replace the current showa-oriented direction.
- Make the hero more sober and less visually aggressive.
- Make the logo less imposing and more blended into the visual.
- Consider static hero imagery if it looks better than the current motion approach.

### Main Files

- `app/views/pages/_home_hero.html.erb`
- `app/assets/stylesheets/visitors/hero.css`
- `app/assets/stylesheets/visitors/hero-section-1.css`
- `app/assets/stylesheets/visitors/hero-section-2.css`
- `app/javascript/visitors/animations.js`

### Tasks

- [x] Remove current showa-centric wording and visual assumptions.
- [x] Replace CTA `Notre elevage` with a clearer CTA path. → now "Nous découvrir"
- [ ] Explore simpler logo entrance behavior or a static hero fallback. *(blocked: waiting for hero asset choice from client)*
- [ ] Prepare the surface to accept new hero assets when provided. *(blocked: waiting for client photos)*

### Done (2026-04-10)

- "Emmanuel" → "Manu"
- "avec passion" → "avec soin"
- "Notre élevage" → "Nous découvrir"

### Validation

- Hero no longer feels dominated by the current logo animation.
- [x] No wording implies breeding activity.
- [x] The page leads to the catalog cleanly.

## Workstream 2 - Homepage Structure and News

### Objectives

- Reduce homepage emphasis on koi cards.
- Add a progress/news section for worksite updates.

### Main Files

- `app/views/home/index.html.erb`
- `app/views/pages/_home_showcase.html.erb`
- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_konishi_band.html.erb`
- `app/assets/stylesheets/visitors/features.css`
- `app/assets/stylesheets/visitors/shop.css`

### Tasks

- Reassess whether `_home_showcase.html.erb` stays on the homepage in its current form.
- Add a new editorial section for site/project progress.
- Use worksite imagery instead of duplicating catalog emphasis.
- Keep homepage as an entry point, not a second catalog page.

### Validation

- Homepage has a clear `actualites` or `avancement` section.
- Homepage koi density is reduced versus today.

## Workstream 3 - Navigation and Header

### Objectives

- Make navigation more visible, readable, and intuitive.
- Keep desktop and mobile navigation easy for a novice audience.

### Main Files

- `app/views/pages/_home_header.html.erb`
- `app/assets/stylesheets/visitors/header.css`
- `app/assets/stylesheets/visitors/header-section-1.css`
- `app/assets/stylesheets/visitors/header-section-2.css`
- `app/assets/stylesheets/visitors/header-section-3.css`
- `app/javascript/visitors/header.js`

### Tasks

- Increase legibility of navigation items.
- Revisit spacing, visual presence, and active state.
- Re-evaluate whether the current layout is the best desktop/mobile compromise.

### Validation

- Navigation is easier to spot immediately.
- Items feel clearer than the current header.

## Workstream 4 - Konishi Messaging

**Status: DONE — wording cleaned, pending final client wording approval**

### Objectives

- Make the Konishi relationship understandable early.
- Avoid inaccurate claims.

### Main Files

- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_konishi_band.html.erb`
- `app/assets/stylesheets/visitors/konishi.css`

### Tasks

- [x] Remove risky wording:
  - [x] `officiellement certifies` → removed
  - [x] `partenaire officiel` → replaced with "Lignée Konishi"
- [x] Replace with neutral but strong positioning pending client approval. → "seuls représentants français de cette lignée"
- [ ] Decide whether the separate partnership CTA should stay, be softened, or be removed temporarily. *(kept as-is, pending client review)*
- [x] Ensure visual hierarchy around Konishi is cleaner and more credible.

### Done (2026-04-10)

- "Seul élevage français partenaire Konishi" → "Seuls représentants français de la lignée Konishi"
- "éleveurs français officiellement certifiés" → "représentants français de cette lignée"
- "Partenaire officiel" label → "Lignée Konishi"
- Alt text nettoyé (suppression "partenaire officiel")
- "Emmanuel" → "Manu" dans les deux blocs

### Validation

- [x] Konishi is visible but not legally overclaimed.
- [x] Messaging can be shown to client without red flags.

## Workstream 5 - Discover Page Rewrite

**Status: PARTIAL — wording done, structure rewrite blocked on assets**

### Objectives

- Make `Nous decouvrir` about Manu + Mathilde, not about koi imagery.

### Main Files

- `app/views/pages/_decouvrir_hero.html.erb`
- `app/views/pages/_decouvrir_story.html.erb`
- `app/views/pages/_decouvrir_gallery.html.erb`
- `app/views/pages/decouvrir.html.erb`
- `app/assets/stylesheets/visitors/farm.css`
- `app/assets/stylesheets/visitors/farm-section-1.css`
- `app/assets/stylesheets/visitors/farm-section-2.css`
- `app/assets/stylesheets/visitors/farm-section-3.css`

### Tasks

- [ ] Remove koi-photo-led storytelling from this page. *(blocked: needs founder photos to replace)*
- [x] Remove `L'elevage` wording in the hero. → "Notre histoire"
- [ ] Reframe the page around Manu + Mathilde, the project, the approach. *(blocked: needs founder photos/content)*
- [ ] Replace gallery with founder imagery when assets arrive. *(blocked: waiting for Manu+Mathilde photo)*

### Done (2026-04-10)

- "L'élevage" → "Notre histoire"
- "Notre élevage en images" → "Notre univers en images"

### Validation

- [ ] `Nous decouvrir` feels founder-centered. *(partial — wording ok, structure still koi-photo-heavy)*
- [x] No breeding wording remains.

## Workstream 6 - Catalog Cleanup

**Status: DONE**

### Objectives

- Remove redundant Konishi filtering.

### Main Files

- `app/views/pages/_kois_filter_bar.html.erb`
- `app/javascript/visitors/filter.js`

### Tasks

- [x] Remove the `Konishi uniquement` toggle from UI and behavior.
- [x] Remove or refactor any JS logic tied to that toggle. → 7 references removed from filter.js
- [x] Adjust any supporting copy so the catalog remains clear without it.

### Done (2026-04-10)

- Toggle HTML supprimé de `_kois_filter_bar.html.erb`
- Logique `konishiToggle`, `konishiOnly`, `cardKonishi` supprimée de `filter.js`

### Validation

- [x] No Konishi-only filter remains on the public catalog.

## Workstream 7 - Contact and Support Wording

**Status: DONE**

### Objectives

- Make support/contact language reflect Manu + Mathilde together.

### Main Files

- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_contact_quick.html.erb`
- `app/views/pages/_home_footer.html.erb`
- `app/views/pages/_kois_product_detail.html.erb`
- `app/views/pages/cgv.html.erb`

### Tasks

- [x] Replace wording such as `Contactez l'elevage`. → "Contacter Mathilde ou Manu"
- [x] Use `Koi's Story`, `Manu et Mathilde`, or equivalent wording approved by client.
- [x] Update support copy around advice:
  - [x] tests d'eau
  - [x] alimentation
  - [x] sante des kois

### Done (2026-04-10)

- Footer WhatsApp flottant : "Contacter l'élevage" → "Contacter Mathilde ou Manu"
- Contact quick : "Contacter Emmanuel" → "Contacter Manu"
- WhatsApp pre-filled messages updated
- Features : "Emmanuel répond via WhatsApp" → "Manu et Mathilde répondent via WhatsApp"
- Section contact : ajout des thèmes de conseil (tests d'eau, alimentation, santé des koïs)
- Product detail fallback : "notre élevage" → "chez Koi's Story"
- CGV : "l'elevage" → "Koi's Story"

### Validation

- [x] Public support wording mentions both Manu and Mathilde when relevant.

## Workstream 8 - Product Naming Corrections

**Status: DONE for filtration — other categories pending client review**

### Objectives

- Correct product taxonomy, starting with filtration.

### Main Files

- `app/views/pages/materiel.html.erb`
- `app/views/pages/soins.html.erb`

### Tasks

- [x] Replace incorrect filtration labels with client-approved terms:
  - [x] filtre à tambour
  - [x] filtre à grille
  - [x] filtre multi-chambre
  - [x] filtre à douche
- [ ] Flag other category labels that need client review. *(pending: nourriture, pompes, soins labels not yet reviewed by client)*

### Done (2026-04-10)

- 3 anciens filtres (Filtre biologique, Filtre japonais, Brosserie de filtration) remplacés par les 4 termes validés par Mathilde
- `soins.html.erb` : "élevage sérieux" → "bassin bien entretenu"
- `materiel.html.erb` : "élevages japonais" → "bassins japonais"

### Validation

- [x] Filtration vocabulary matches the client's domain language.

## Workstream 9 - Privacy and Domain Readiness

### Objectives

- Ensure the site can remain hidden until launch.

### Main Files

- no direct code surface yet; mainly deployment/domain process
- related docs:
  - `docs/deployment/coolify.md`
  - domain-access messaging already prepared outside this file

### Tasks

- Clarify registrar, DNS owner, and domain management access.
- Prepare a temporary hiding/protection approach once access is available.
- Do not assume the current public visibility is acceptable.

### Validation

- Team knows how the domain will be hidden or protected before launch.

## Pending Client Dependencies

- Final hero asset choice
- Manu + Mathilde photo(s)
- Final approved Konishi wording
- Full product naming review beyond filtration
- Domain access details

## Acceptance Criteria

- [x] No public-facing `elevage` / `eleveur` wording remains.
- [ ] Homepage no longer relies on current showa-centric hero visuals. *(blocked: client assets)*
- [ ] Homepage clearly introduces Koi's Story + Konishi link + news/progress. *(blocked: workstream 2)*
- [ ] `Nous decouvrir` is founder-centered and visually simpler. *(partial: wording done, photos pending)*
- [x] `Nos Kois` no longer shows an unnecessary Konishi-only filter.
- [x] Contact/support wording reflects Manu + Mathilde together.
- [x] Product naming corrections begin with filtration.
- [x] Team has a clear list of client dependencies still pending.

## Recommended Execution Order

1. ~~wording cleanup~~ — **DONE** (2026-04-10)
2. homepage structure — NOT STARTED (blocked on client assets)
3. ~~discover page rewrite~~ — **PARTIAL** (wording done, structure blocked on founder photos)
4. ~~catalog cleanup~~ — **DONE** (2026-04-10)
5. ~~product naming fixes~~ — **DONE for filtration** (2026-04-10), other categories pending
6. domain/privacy handling — NOT STARTED

## Deliverable Expectation For Agents

Each agent should report:

- files changed
- wording decisions made
- client assumptions introduced
- remaining dependencies blocking final polish
