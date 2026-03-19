#!/bin/sh
# setup.sh — Configuration locale du dépôt (à lancer une seule fois par membre de l'équipe)

echo "Configuration du dépôt Koi's Story..."

# Activer les hooks git du dépôt
git config core.hooksPath .githooks
chmod +x .githooks/commit-msg
echo "  Hooks git activés (.githooks/)"

# Activer le template de message de commit
git config commit.template .gitmessage
echo "  Template de commit activé (.gitmessage)"

echo ""
echo "Terminé. Tes prochains commits seront guidés automatiquement."
echo ""
echo "Pour commiter, utilise :"
echo "  git commit          → ouvre l'éditeur avec le template"
echo "  git commit -m '...' → message direct (le hook vérifie quand même le format)"
