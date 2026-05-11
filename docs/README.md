# Documentation Index

This directory keeps project documentation that supports the Rails app. The
Rails application is the active source of truth; standalone HTML prototypes and
THP audit material are archived references.

## Active Documents

- [`../README.md`](../README.md): current project overview and official local
  Docker setup for `public`, `admin`, and `db` services.
- [`stack.md`](stack.md): current technical stack and deployment targets.
- [`roadmap.md`](roadmap.md): current delivery path toward `DEV` staging.
- [`agent.md`](agent.md): agent-facing project notes.
- [`github/branching_and_protection.md`](github/branching_and_protection.md):
  branch model and repository protection notes.
- [`development/local-docker.md`](development/local-docker.md): official local
  Docker Desktop workflow for the team.

## Setup And Infrastructure

- Local setup is documented in the root [`README.md`](../README.md) and in the
  dedicated [`development/local-docker.md`](development/local-docker.md) guide.
- [`deployment/coolify.md`](deployment/coolify.md) and
  [`deployment/coolify-https.md`](deployment/coolify-https.md) contain Coolify
  and HTTPS deployment notes. Re-check them against `compose.yaml`, PostgreSQL,
  and the planned public/admin split before using them for staging or prod.
- A consolidated `docs/infra/environments.md` page is planned to describe local,
  staging on `DEV`, and production responsibilities.

## Design References

- Current live design decisions are reflected first in Rails views/assets and in
  the root [`README.md`](../README.md), including Palette V4 and Logo V2 notes.
- [`design/brand/charte_graphique.md`](design/brand/charte_graphique.md)
  documents the current Palette V4 and Logo V2 direction.
- [`design/brand/charte_graphique.html`](design/brand/charte_graphique.html)
  is a historical exported reference.
- [`design/wireframes/`](design/wireframes/) stores archived March 2026
  wireframes. Use them for intent, not as implementation screenshots.
- `public/docs/assets/palette_V4.svg` and the `public/logo_bg_circle_dark_v2.*`
  files are the current visual assets referenced by the Rails app.

## Archives

- [`prototypes/ADMIN/`](prototypes/ADMIN/): archived standalone back-office
  prototype.
- [`prototypes/VISITORS/`](prototypes/VISITORS/): archived standalone public
  prototype.
- [`audit/`](audit/): historical THP, migration, security, and refactor audits.
- [`Audit-check-and-mvp-plan.md`](Audit-check-and-mvp-plan.md): historical MVP
  audit/planning note.

## Other Reference Areas

- `assets/`: legacy/reference design assets kept under docs.
- `business/`: client brief, positioning, and executive framing.
- `fonts/`: local font files used by historical design documents.
- `planning/`: project planning notes that may predate the current Rails state.
- `sources/`: raw source notes and input material.
- `ux/`: user journeys and experience notes.
