# Branching model and GitHub protection

This document describes how branches are expected to map to staging,
production, and current infrastructure work. Live GitHub protection settings
cannot be trusted from the local clone; repository owners must re-check them in
GitHub after any workflow change.

## Canonical branches

| Branch | Role | Direct pushes |
|---|---|---|
| `DEV` | Staging integration branch; target for feature PRs and staging deploys | No |
| `main` | Production branch; deploys only after validated release work | No |

`DEV` is the staging target. `main` is production. Do not push directly to
either branch; use pull requests.

## Current work branch

| Branch | Role |
|---|---|
| `setup/local-docker-stack` | Current infrastructure work branch for local Docker/Coolify deployment preparation |

Open PRs from this branch, or from future feature branches, into `DEV` first.
Production promotion happens later from `DEV` to `main` when the release is
validated.

## Pull request policy

- Feature and infrastructure work starts from an up-to-date `DEV`.
- Pull requests target `DEV` by default.
- `main` receives only validated release changes from `DEV`.
- No direct push to `DEV` or `main`.
- Keep branch names descriptive; use scoped prefixes when useful.

## Deployment mapping

| Environment | Branch | Expected host |
|---|---|---|
| Staging | `DEV` | `dev.kois-story.com` |
| Admin validation | `DEV` or release candidate from `DEV` | `admin.kois-story.com` |
| Production public | `main` | main public domain |

The current public site must not change until staging and admin are validated.

## Branch protection policy

Expected protections for `DEV` and `main`:

- Require pull requests before merge.
- Block direct pushes.
- Require CI/status checks when the workflows are stable enough to gate merges.
- Require review for `main`; review for `DEV` is recommended.
- Keep force pushes and branch deletion disabled.

## Verification on GitHub

Re-verify the live settings in **Settings -> Branches** or **Rulesets**:

1. `DEV` and `main` are protected with the exact remote casing.
2. Direct pushes are blocked for both branches.
3. Pull requests are required before merge.
4. Required checks match the workflows that actually run.
5. Admin bypass rules are intentional and documented.

## Related files

- `CONTRIBUTING.md` - workflow and branch rules.
- `.github/workflows/` - CI and release automation.
- `docs/github/release_and_changelog.md` - changelog, release, and Discord notification flow.
- `docs/deployment/coolify.md` - Coolify deployment target.
