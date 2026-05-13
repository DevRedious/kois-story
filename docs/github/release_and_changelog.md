# Release and changelog automation

This document describes the expected automation for the Koi's Story GitHub
release flow.

## Goals

- Keep `DEV` as the integration branch.
- Keep `main` as the production release branch.
- Generate changelog updates from commit messages.
- Create immutable production tags only from `main`.
- Send a Discord embed when a production release is published.

## DEV changelog flow

The `Update CHANGELOG` workflow runs after pushes to `DEV`, except when only
`CHANGELOG.md` changed.

It creates or updates a pull request named:

```text
docs: auto-update CHANGELOG
```

The workflow updates the `Unreleased` section from commits since the latest
production tag matching `v*`. It does not create tags and does not force-push
tags.

Required repository secret:

```text
CHANGELOG_BOT_TOKEN
```

Use a fine-grained GitHub token or GitHub App token that can write contents and
pull requests for this repository. This is needed because pull requests created
with the built-in `GITHUB_TOKEN` may not trigger required checks under branch
protection.

If this secret is absent, the workflow still generates the changelog locally in
the runner, but it skips pull request creation to avoid opening a blocked bot PR.

## Production release flow

The `Create Release` workflow runs when `main` receives a push, or manually via
`workflow_dispatch`.

It resolves a production tag:

- reuses an existing `v*` tag if `HEAD` is already tagged;
- otherwise creates `vYYYY.MM.DD`;
- if that tag already exists, creates `vYYYY.MM.DD.<run_number>`.

Release notes are generated with `git-cliff` from the previous production tag
to `HEAD`. Date-only staging tags are ignored because the workflow only looks
for tags matching `v*`.

## Discord notification

Production release notifications are sent after the GitHub Release is created.

Required repository secret:

```text
DISCORD_RELEASE_WEBHOOK_URL
```

Create the webhook in the target Discord channel, then store the full webhook
URL as a GitHub Actions secret. If the secret is absent, the release still
succeeds and the Discord step is skipped.

The workflow sends a Discord embed containing:

- release tag;
- `main` branch;
- commit SHA;
- previous production tag;
- GitHub Release link;
- generated release notes.

## Commit message contract

The changelog groups commits by conventional prefixes:

- `feat:` and `add:` -> Added
- `fix:` and `revert:` -> Fixed
- `remove:` -> Removed
- `refactor:`, `style:`, `perf:`, `chore:`, `docs:`, `test:`, `build:`, `ci:` -> Changed

Merge commits and automatic changelog commits are skipped to avoid duplicated
noise in release notes.

## Human checklist

1. Keep feature work in branches targeting `DEV`.
2. Merge validated feature PRs into `DEV`.
3. Let the automatic changelog PR update `CHANGELOG.md`.
4. Promote `DEV` to `main` only when production is ready.
5. Confirm the GitHub Release exists.
6. Confirm the Discord release embed arrived in the expected channel.
