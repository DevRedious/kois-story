# Contributing

## Branch model

This project follows a two-branch policy:

- `dev`  integration and testing
- `main`  production

Do not commit directly to `main`.

## Workflow

1. Create a feature branch from `dev`.
2. Keep commits focused and easy to review.
3. Open a pull request toward `dev`.
4. Validate documentation and repository consistency before merge.
5. Merge `dev` into `main` only when the release is ready.

## Installation locale (une seule fois)

Après avoir cloné le dépôt, lance ce script pour activer les hooks et le template de commit :

```bash
sh setup.sh
```

Cela configure automatiquement :
- Le hook `commit-msg` qui vérifie le format de tes messages
- Le template de commit qui s'affiche dans ton éditeur

## Messages de commit

Utilise le format Conventional Commits en français :

```
<type>: <description courte>
```

Types disponibles :

| Type       | Usage                                              |
|------------|----------------------------------------------------|
| `feat`     | Nouvelle fonctionnalité                            |
| `fix`      | Correction de bug                                  |
| `docs`     | Documentation, README                              |
| `style`    | CSS, mise en forme (pas de logique)                |
| `refactor` | Réorganisation du code sans changement de comportement |
| `chore`    | Maintenance, config, dépendances                   |
| `test`     | Ajout ou correction de tests                       |
| `perf`     | Amélioration des performances                      |

Exemples :

- `feat: ajouter le bouton WhatsApp sur la fiche produit`
- `fix: corriger l'affichage du prix sur mobile`
- `style: harmoniser les couleurs du footer`
- `chore: mettre à jour biome.json`

Le hook local bloquera tout commit ne respectant pas ce format et affichera un message d'aide.

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
