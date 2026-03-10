# Documentation détaillée : workflow de log des contributions

Ce document décrit étape par étape le fonctionnement du workflow GitHub Actions **Log Contributions** (fichier `.github/workflows/log_contributions.yml`), qui enregistre automatiquement les contributions dans `CONTRIBUTORS.md` lorsque du code est fusionné dans la branche `DEV`.

---

## 1. Vue d’ensemble

- **Objectif** : Ajouter une ligne dans la section « Activity Log » de `CONTRIBUTORS.md` à chaque merge d’une branche contributeur (`Morgan`, `Romain`, `Valentin`) vers `DEV`.
- **Déclencheur** : Uniquement les **push** sur la branche `DEV`.
- **Comportement** : Le workflow lit le message du dernier commit (souvent un merge). S’il reconnaît un motif du type « merge from …/NomBranche », il extrait la branche source, le contributeur, la date et le message, puis insère une nouvelle ligne dans le tableau et pousse un commit dédié.

---

## 2. Déclenchement du workflow

```yaml
on:
  push:
    branches:
      - DEV
```

- Le job ne s’exécute **que** lorsqu’un push est effectué sur la branche `DEV`.
- Les pushes sur `Morgan`, `Romain`, `Valentin` ou `Main` ne déclenchent **pas** ce workflow.
- Conséquence : seules les contributions qui arrivent sur `DEV` (en général via merge) sont prises en compte.

---

## 3. Condition d’exécution du job

```yaml
if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

- Si le message du commit qui a déclenché le push contient la chaîne `[skip ci]`, le job **ne s’exécute pas**.
- Cela évite des boucles : le commit créé par le workflow contient `[skip ci]`, donc un nouveau run ne sera pas relancé par ce commit.

---

## 4. Environnement d’exécution

- **Runner** : `ubuntu-latest`.
- **Permissions** : `contents: write` pour pouvoir faire `git commit` et `git push` dans le dépôt.

---

## 5. Étapes du job (détail)

### 5.1 Checkout du code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

- Récupère le dépôt sur le runner.
- `fetch-depth: 0` : clone l’historique complet (nécessaire pour `git log -1` et pour pousser ensuite).

---

### 5.2 Configuration Git

```yaml
- name: Configure Git
  run: |
    git config --global user.name "GitHub Action"
    git config --global user.email "action@github.com"
```

- Définit l’identité Git utilisée pour le commit que le workflow va créer.
- Sans cela, `git commit` pourrait refuser de committer ou utiliser une identité par défaut indésirable.

---

### 5.3 Extraction des données de contribution (étape centrale)

**Identifiant de l’étape** : `vars` (pour réutiliser les sorties dans les étapes suivantes).

#### 5.3.1 Récupération du message du dernier commit

```bash
COMMIT_MSG="$(git log -1 --pretty=format:'%s')"
```

- `git log -1` : uniquement le dernier commit (celui qui a déclenché le push sur `DEV`).
- `--pretty=format:'%s'` : seulement la ligne de sujet du message (titre du commit).
- Exemple typique après un merge :  
  `Merge pull request #2 from kois-story/Morgan from Morgan/Morgan`  
  ou variantes selon l’interface (merge via PR ou merge local).

#### 5.3.2 Date et heure

```bash
DATE="$(date +'%Y-%m-%d %H:%M')"
```

- Format : `AAAA-MM-JJ HH:MM` (ex. `2026-03-10 14:30`).
- Utilisé comme première colonne « Date & time » dans le tableau.

#### 5.3.3 Extraction du nom de la branche source

```bash
BRANCH_NAME="$(echo "$COMMIT_MSG" | sed -n 's/.*from [^/]*\/\([^ ]*\).*/\1/p')"
```

- **Séd** : cherche dans `COMMIT_MSG` un motif de la forme `from quelquechose/NomBranche` (avec éventuellement du texte avant ou après).
  - `[^/]*\/` : tout ce qui précède le dernier `/` avant le nom de branche (ex. nom du repo ou du remote).
  - `\([^ ]*\)` : le nom de branche (jusqu’au prochain espace), capturé.
  - `.*` : le reste du message.
- **Résultat** : `NomBranche` (ex. `Morgan`, `Romain`, `Valentin`). Si le motif n’est pas trouvé, `BRANCH_NAME` est vide.

**Exemples de messages et résultat :**

| Message (sujet) | `BRANCH_NAME` |
|-----------------|---------------|
| `Merge branch 'Morgan' from Morgan/Morgan` | `Morgan` |
| `Merge pull request #3 from kois-story/Romain from Romain/Romain` | `Romain` (selon la forme exacte du message) |
| `feat: add koi model` (commit direct sur DEV) | vide → pas de log |

#### 5.3.4 Décision : faut-il enregistrer ?

```bash
if [ -z "$BRANCH_NAME" ]; then
  echo "should_log=false" >> "$GITHUB_OUTPUT"
  exit 0
fi
```

- Si `BRANCH_NAME` est vide (commit direct sur `DEV` ou message de merge non reconnu), le workflow écrit `should_log=false` et termine l’étape sans erreur.
- Les deux étapes suivantes (mise à jour de `CONTRIBUTORS.md` et commit/push) ne s’exécutent que si `should_log == 'true'`.

#### 5.3.5 Attribution du contributeur

```bash
case "$BRANCH_NAME" in
  Morgan)   CONTRIBUTOR="Morgan" ;;
  Romain)   CONTRIBUTOR="Romain" ;;
  Valentin) CONTRIBUTOR="Valentin" ;;
  *)        CONTRIBUTOR="$BRANCH_NAME" ;;
esac
```

- Pour les branches connues, le nom affiché dans la colonne « Contributor » est normalisé.
- Toute autre branche fusionnée (si le motif `from …/NomBranche` la détecte) est affichée telle quelle.

#### 5.3.6 Écriture des sorties du step

```bash
{
  echo "should_log=true"
  echo "branch=$BRANCH_NAME"
  echo "contributor=$CONTRIBUTOR"
  echo "date=$DATE"
  echo "msg<<EOF"
  echo "$COMMIT_MSG"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
```

- Toutes ces lignes sont écrites dans `GITHUB_OUTPUT` pour être lues par les étapes suivantes via `steps.vars.outputs.*`.
- `msg<<EOF` utilise le délimiteur multiligne de GitHub Actions pour que le message de commit (potentiellement long ou avec retours à la ligne) soit correctement passé.

---

### 5.4 Mise à jour de CONTRIBUTORS.md

**Condition** : `steps.vars.outputs.should_log == 'true'`.

```yaml
- name: Update CONTRIBUTORS.md
  if: steps.vars.outputs.should_log == 'true'
  run: |
    NEW_LINE="| ${{ steps.vars.outputs.date }} | ${{ steps.vars.outputs.contributor }} | ${{ steps.vars.outputs.branch }} | ${{ steps.vars.outputs.msg }} |"
    awk -v line="$NEW_LINE" '
      /<!-- LOG_START -->/ { print; print line; next }
      { print }
    ' CONTRIBUTORS.md > CONTRIBUTORS.tmp && mv CONTRIBUTORS.tmp CONTRIBUTORS.md
```

#### 5.4.1 Construction de la nouvelle ligne

- `NEW_LINE` est une ligne de tableau Markdown :  
  `| date | contributeur | branche | message |`
- Les cellules doivent rester sur une seule ligne ; si le message contient des `|`, ils peuvent casser le tableau (à éviter dans les messages de commit ou à échapper si on améliore le script plus tard).

#### 5.4.2 Structure attendue de CONTRIBUTORS.md

Le fichier doit contenir un marqueur HTML en commentaire :

```markdown
| <!-- LOG_START --> |  |  |  |
```

- **awk** :
  - Quand il voit une ligne contenant `<!-- LOG_START -->`, il imprime cette ligne, puis **immédiatement** la nouvelle ligne (`print line`), puis passe à la suivante (`next`).
  - Toutes les autres lignes sont recopiées à l’identique.
- Résultat : la nouvelle contribution est insérée **juste après** la ligne du marqueur, donc en tête du tableau « Activity Log ».

#### 5.4.3 Fichier temporaire

- Écriture dans `CONTRIBUTORS.tmp` puis `mv ... CONTRIBUTORS.md` pour éviter d’écraser le fichier en cas d’erreur au milieu du script.

---

### 5.5 Commit et push des changements

**Condition** : `steps.vars.outputs.should_log == 'true'`.

```yaml
- name: Commit and push changes
  if: steps.vars.outputs.should_log == 'true'
  run: |
    git add CONTRIBUTORS.md
    git diff --cached --quiet && exit 0
    git commit -m "chore: log contribution from ${{ steps.vars.outputs.branch }} [skip ci]"
    git push
```

- `git add CONTRIBUTORS.md` : seules les modifications de ce fichier sont stagées.
- `git diff --cached --quiet && exit 0` : s’il n’y a aucun changement (cas théorique ou fichier déjà à jour), on quitte sans erreur et **sans** faire de commit.
- `git commit -m "..."` : message fixe avec la branche concernée et **`[skip ci]`** pour ne pas redéclencher le workflow sur ce commit.
- `git push` : pousse le commit sur la branche `DEV` (c’est la branche courante après le checkout).

---

## 6. Résumé du flux

1. Un développeur pousse des commits sur sa branche (`Morgan`, `Romain` ou `Valentin`).
2. Un merge (PR ou merge local) est effectué vers `DEV`.
3. Le push sur `DEV` déclenche le workflow (sauf si le message contient `[skip ci]`).
4. Le workflow lit le message du dernier commit (merge).
5. Si le message contient un motif `from …/NomBranche`, il extrait la branche, le contributeur, la date et le message.
6. Une nouvelle ligne est insérée dans le tableau « Activity Log » juste après `<!-- LOG_START -->`.
7. Le workflow commit cette modification avec `[skip ci]` et pousse sur `DEV`.

---

## 7. Format des messages de merge attendus

Pour qu’une entrée soit enregistrée, le **sujet** du commit de merge doit contenir une chaîne du type :

- `from <quelquechose>/Morgan`
- `from <quelquechose>/Romain`
- `from <quelquechose>/Valentin`

Les merges effectués via l’interface GitHub (Pull Request ou « Merge branch ») génèrent en général des messages de ce type. Les commits directs sur `DEV` (sans merge depuis une branche nommée ainsi) ne sont pas loggés.

---

## 8. Marqueurs dans CONTRIBUTORS.md

- **`<!-- LOG_START -->`** : point d’insertion des nouvelles lignes (obligatoire pour que le workflow fonctionne).
- **`<!-- LOG_END -->`** : optionnel, utile pour repérer visuellement la fin du bloc log dans le fichier ; il n’est pas utilisé par le script.

Ne pas supprimer ni déplacer `<!-- LOG_START -->` sans adapter le script `awk` en conséquence.
