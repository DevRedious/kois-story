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

- Remove current showa-centric wording and visual assumptions.
- Replace CTA `Notre elevage` with a clearer CTA path.
- Explore simpler logo entrance behavior or a static hero fallback.
- Prepare the surface to accept new hero assets when provided.

### Validation

- Hero no longer feels dominated by the current logo animation.
- No wording implies breeding activity.
- The page leads to the catalog cleanly.

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

### Objectives

- Make the Konishi relationship understandable early.
- Avoid inaccurate claims.

### Main Files

- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_konishi_band.html.erb`
- `app/assets/stylesheets/visitors/konishi.css`

### Tasks

- Remove risky wording:
  - `officiellement certifies`
  - `partenaire officiel` if not validated
- Replace with neutral but strong positioning pending client approval.
- Decide whether the separate partnership CTA should stay, be softened, or be removed temporarily.
- Ensure visual hierarchy around Konishi is cleaner and more credible.

### Validation

- Konishi is visible but not legally overclaimed.
- Messaging can be shown to client without red flags.

## Workstream 5 - Discover Page Rewrite

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

- Remove koi-photo-led storytelling from this page.
- Remove `L'elevage` wording in the hero.
- Reframe the page around:
  - who Manu + Mathilde are
  - the project
  - the approach
- Replace gallery with founder imagery when assets arrive.

### Validation

- `Nous decouvrir` feels founder-centered.
- No koi gallery remains as the main narrative.

## Workstream 6 - Catalog Cleanup

### Objectives

- Remove redundant Konishi filtering.

### Main Files

- `app/views/pages/_kois_filter_bar.html.erb`
- `app/views/kois/index.html.erb`
- `app/javascript/visitors/filter.js`
- `app/assets/stylesheets/visitors/catalogue.css`

### Tasks

- Remove the `Konishi uniquement` toggle from UI and behavior.
- Remove or refactor any JS logic tied to that toggle.
- Adjust any supporting copy so the catalog remains clear without it.

### Validation

- No Konishi-only filter remains on the public catalog.

## Workstream 7 - Contact and Support Wording

### Objectives

- Make support/contact language reflect Manu + Mathilde together.

### Main Files

- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_contact_quick.html.erb`
- any partial containing WhatsApp CTA wording

### Tasks

- Replace wording such as `Contactez l'elevage`.
- Use `Koi's Story`, `Manu et Mathilde`, or equivalent wording approved by client.
- Update support copy around advice:
  - tests d'eau
  - alimentation
  - sante des kois

### Validation

- Public support wording mentions both Manu and Mathilde when relevant.

## Workstream 8 - Product Naming Corrections

### Objectives

- Correct product taxonomy, starting with filtration.

### Main Files

- `app/views/pages/materiel.html.erb`
- `app/views/pages/nourriture.html.erb`
- `app/views/pages/soins.html.erb`
- any product/category partials used there

### Tasks

- Replace incorrect filtration labels with client-approved terms:
  - filtre a tambour
  - filtre a grille
  - filtre multi-chambre
  - filtre a douche
- Flag other category labels that need client review.

### Validation

- Filtration vocabulary matches the client's domain language.

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

## Recommended Execution Order

1. wording cleanup
2. homepage structure
3. discover page rewrite
4. catalog cleanup
5. product naming fixes
6. domain/privacy handling

## Deliverable Expectation For Agents

Each agent should report:

- files changed
- wording decisions made
- client assumptions introduced
- remaining dependencies blocking final polish
