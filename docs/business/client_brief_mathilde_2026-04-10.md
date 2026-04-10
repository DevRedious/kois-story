# Client Brief - Mathilde - 2026-04-10

## Purpose

This document turns Mathilde's WhatsApp feedback into an actionable mission brief for AI agents and teammates.

Goal: align the public-facing site with the client's positioning before new rounds of implementation.

## Source Material

- Written client feedback received in chat on 2026-04-10.
- WhatsApp voice notes transcribed locally on 2026-04-10.
- Current Rails implementation reviewed in `app/views/pages/`, `app/views/home/`, `app/views/kois/`, and visitor styles/scripts.

## Core Direction

The client wants a site that feels:

- more premium and more sober
- more accurate for ornamental koi
- less "effect for effect"
- more centered on Manu + Mathilde
- more clearly linked to Konishi from the start

The site must not present the activity as a generic breeder website.

## Priority Outcomes

1. Rework the homepage hero and top-level messaging.
2. Remove incorrect wording such as `elevage` / `eleveur`.
3. Make the Konishi link clear without using legally risky wording.
4. Replace homepage koi-heavy content with a news/progress approach.
5. Simplify `Nous decouvrir` around the founders, not around koi photos.
6. Remove unnecessary Konishi filtering from `Nos Kois`.
7. Prepare the site to stay hidden/private until launch is approved.

## Client Requests - Confirmed

### Homepage / Hero

- Replace current hero fish choices; the current showa visuals are not representative.
- Prefer a Karashi and a Chagoi for the main visual direction.
- The animated/logo treatment is too strong.
- Make the logo appear in a softer fade, more blended into the hero visual.
- A static hero image is acceptable if it looks better than the current animation.
- Keep the page more elegant and less busy.

### Branding / Konishi

- Make the Konishi relationship understandable from the top of the page.
- A wording such as `by Konishi` or an equivalent marker can be explored.
- Do **not** use wording like `officiellement certifies`.
- A stronger Konishi statement is needed, but it must remain commercially and legally accurate.

### Navigation

- The current navigation is not visible enough or instinctive enough.
- Increase legibility, presence, and clarity.
- The client is open to layout changes if navigation becomes easier to understand.

### Wording

- Remove all uses of `elevage` and `eleveur`.
- Use `Manu` instead of `Emmanuel` in public-facing copy.
- Prefer `selectionnees avec soin` over `selectionnees avec passion`.
- Keep `Sur rendez-vous uniquement`.

### Homepage Content

- Remove koi-card emphasis from the homepage.
- Add a news/progress section instead.
- First editorial topic: progress of the works / construction / setup.
- The homepage should guide visitors toward the catalog rather than duplicating it.

### Discover Page

- `Nous decouvrir` should become simpler.
- Remove koi photos from this page.
- Replace them with a photo of Manu and Mathilde, or one shared photo.
- This page should present the people and project, not act like a frequently changing gallery.

### Catalog Page

- Remove the `Konishi uniquement` filter.
- If all koi presented are already Konishi, the extra toggle is redundant and confusing.

### Contact / WhatsApp Messaging

- Replace wording like `Contactez l'elevage avec WhatsApp`.
- Prefer wording centered on `Koi's Story` or `Manu et Mathilde`.
- Public-facing support copy should make clear that both Manu and Mathilde answer.
- Advice/support themes to highlight:
  - tests d'eau
  - alimentation
  - sante des kois

### Product Taxonomy

- Some current labels in filtration are wrong and must be replaced.
- Terms the client explicitly wants:
  - filtre a tambour
  - filtre a grille
  - filtre multi-chambre
  - filtre a douche

## Constraints and Red Lines

- Do not describe the business as a traditional breeding operation.
- Do not overstate the Konishi relationship with unverifiable/legal wording.
- Do not publish the site broadly before the client approves.
- Avoid visual clutter and over-animation.
- Do not keep homepage sections that duplicate the catalog.

## Current UI Surfaces Most Likely Impacted

- `app/views/pages/_home_hero.html.erb`
- `app/views/pages/_home_header.html.erb`
- `app/views/pages/_home_showcase.html.erb`
- `app/views/pages/_home_features.html.erb`
- `app/views/pages/_home_konishi_band.html.erb`
- `app/views/pages/_decouvrir_hero.html.erb`
- `app/views/pages/_decouvrir_story.html.erb`
- `app/views/pages/_decouvrir_gallery.html.erb`
- `app/views/pages/_kois_filter_bar.html.erb`
- `app/views/kois/index.html.erb`
- `app/views/home/index.html.erb`

Likely style/behavior surfaces:

- `app/assets/stylesheets/visitors/header*.css`
- `app/assets/stylesheets/visitors/hero*.css`
- `app/assets/stylesheets/visitors/features*.css`
- `app/assets/stylesheets/visitors/farm*.css`
- `app/assets/stylesheets/visitors/catalogue*.css`
- `app/javascript/visitors/header.js`
- `app/javascript/visitors/filter.js`
- `app/javascript/visitors/animations.js`

## Available Assets

- Existing repo assets still include current showa-oriented visuals in `docs/assets/`.
- Work/progress photos have been organized locally outside the repo in:
  - `C:\Users\momoz\Downloads\kois-story`
- That folder has already been sorted into phases and can feed the future homepage news section.

## Information Still Needed From Client

- Final photo(s) for Manu + Mathilde / shared portrait.
- Preferred Konishi wording once legally/commercially validated.
- Final hero image choice:
  - static photo
  - or reduced motion visual
- Confirmation of the exact ornamental koi varieties to feature first.
- Confirmation of the first product/category label corrections beyond filtration.

## Domain / Privacy Requirement

- The client does not want the public site discoverable before launch readiness.
- Domain ownership / DNS access must be clarified so the site can be hidden, protected, or redirected temporarily.
- This is a delivery constraint, not just a technical preference.

## Recommended Work Order For Agents

1. Copy and wording cleanup:
   remove forbidden vocabulary, update names, simplify contact/support wording.
2. Homepage restructuring:
   hero, Konishi positioning, remove duplicate koi emphasis, add progress/news section.
3. Discover page rewrite:
   founder-focused structure, no koi gallery.
4. Catalog cleanup:
   remove Konishi toggle, adjust intro copy.
5. Product wording corrections:
   especially filtration taxonomy.
6. Privacy/domain handling:
   ensure pre-launch protection path is documented and actionable.

## Acceptance Criteria

- No public-facing `elevage` / `eleveur` wording remains.
- Homepage no longer relies on current showa-centric hero visuals.
- Homepage clearly introduces Koi's Story + Konishi link + news/progress.
- `Nous decouvrir` is founder-centered and visually simpler.
- `Nos Kois` no longer shows an unnecessary Konishi-only filter.
- Contact/support wording reflects Manu + Mathilde together.
- Product naming corrections begin with filtration.
- Team has a clear list of client dependencies still pending.

## Notes For AI Agents

- Do not implement legal/brand claims that the client herself flagged as inaccurate.
- Prefer reversible changes and staged delivery.
- When a requested asset is missing, prepare the structure and placeholders first.
- Keep every proposal easy for a novice client to review and validate.
