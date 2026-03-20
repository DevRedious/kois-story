# Branching model and GitHub protection

This document describes how branches are used in this repository and how **GitHub branch protection** is expected to align with the workflow. It is derived from `CONTRIBUTING.md`, `CONTRIBUTORS.md`, `README.md`, and `.github/workflows/`. **Live GitHub settings cannot be read from a local clone**; owners must verify the items under [Verification on GitHub](#verification-on-github).

## Canonical branches

| Branch | Role | Direct commits |
|--------|------|----------------|
| `DEV` | Integration and testing; default target for feature PRs | No (changes via PR) |
| `main` / `Main` | Production | No |

**Casing:** `README.md` uses `Main` / `DEV` for display; the Git branch names on the remote are `DEV` and `main` (verify exact casing in GitHub).

## Contributor branches

Personal work branches (see `CONTRIBUTORS.md`):

| Branch   | Contributor |
|----------|-------------|
| `Morgan` | Morgan |
| `Romain` | Romain |
| `Valentin` | Valentin |

Feature branches may also use other names; they still merge into `DEV` via PR per `CONTRIBUTING.md`.

## Historical or auxiliary branches (changelog / docs)

These names appear in project history; they are not part of the canonical two-branch model:

| Name | Context (examples) |
|------|---------------------|
| `Maquette` | Prototype / GitHub Pages experiments |
| `admin-and-back` | Former integration branch name |

## Branch protection (policy)

The following rules match the documented workflow and THP expectations:

- **No direct push** to `main` or to the integration branch (`DEV`).
- Changes land via **pull requests** from feature or contributor branches.
- **Merge `DEV` into `main`** only when a release is ready (`CONTRIBUTING.md`).
- Optional but recommended: **required status checks** (CI) before merge; **required reviews** for `main` (and optionally `DEV`).

## Automation tied to branches

| Workflow | Trigger | Effect |
|----------|---------|--------|
| `changelog.yml` | Push to `DEV`, `main` | Regenerates `CHANGELOG.md` via **PR** (no direct push to protected branches). |
| `release.yml` | Push to `main` | Creates a GitHub Release with notes from `git-cliff`. |
| `biome.yml`, `html-validation.yml`, `stale.yml` | Per workflow file | CI / maintenance as configured. |

## Verification on GitHub

Repository owners should confirm in **Settings → Branches** (or **Rulesets**):

1. **Protected branches:** `main` and `DEV` match the names actually used on the remote.
2. **Restrict who can push** or **require a pull request** before merging.
3. **Require approvals** if the team uses code review.
4. **Require status checks** to pass if CI is mandatory.

## Related files

- `CONTRIBUTING.md` — workflow and branch rules
- `CONTRIBUTORS.md` — people, tooling, branch names
- `.github/workflows/` — automation
