# Contributing

## Branch model

This project follows a fixed branch policy:

- `Morgan`
- `Romain`
- `Valentin`
- `DEV` for integration and testing
- `Main` for production

Do not commit directly to `Main`.

## Workflow

1. Start from your dedicated contributor branch.
2. Keep commits focused and easy to review.
3. Open a pull request toward `DEV`.
4. Validate documentation and repository consistency before merge.
5. Merge `DEV` into `Main` only when the release is ready.

## Commit messages

Use clear, imperative commit messages in English.

Examples:

- `docs: add roadmap and contribution guidelines`
- `feat: add koi catalogue page`
- `fix: correct WhatsApp link generation`

## Pull requests

Each pull request should include:

- a short summary
- the reason for the change
- testing notes
- screenshots when UI changes are involved

## Documentation

Keep repository-level documentation up to date when changing:

- workflow
- project structure
- onboarding steps
- architecture assumptions

## Code standards

- Use English in code and in `README.md`
- Keep controllers thin and business logic in models
- Use RESTful routes only
- Prefer small and reviewable pull requests
