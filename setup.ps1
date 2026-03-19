# setup.ps1 — Configuration locale du depot (a lancer une seule fois)
# Usage : .\setup.ps1

Write-Host "Configuration du depot Koi's Story..."

git config core.hooksPath .githooks
Write-Host "  Hooks git actives (.githooks/)"

git config commit.template .gitmessage
Write-Host "  Template de commit active (.gitmessage)"

Write-Host ""
Write-Host "Termine. Tes prochains commits seront guides automatiquement."
Write-Host ""
Write-Host "Pour commiter, utilise :"
Write-Host "  git commit          -> ouvre l'editeur avec le template"
Write-Host "  git commit -m '...' -> message direct (le hook verifie quand meme le format)"
