# Analyse — Barème Fullstack (xlsx) et Grille projets finaux (PDF)

Synthèse des deux documents d'évaluation THP pour aligner Koi's Story.

---

## 1. Grille projets finaux (PDF — Version Mouss')

Document : **Grille d'évaluation du projet final** — 3 jurys (Produit, Technique, Cursus).

### Règle globale
- **Projet valide** = aucun critère éliminatoire franchi.
- Points bonus possibles (ex. peer review).

---

### Jury Produit

**Éliminatoires**
1. **Page d'accueil** : ne explique pas clairement la proposition de l'application (valeur, contenu, clarté).
2. **Fonctionnalité principale** : non utilisable (ex. erreur au clic, réponses en clair).
3. **Navigation** : compliquée (navbar inutilisable, pas de liens, retour obligatoire).
4. **Signup** : demande autre chose qu'email + mot de passe (ex. photo, date de naissance, bio) — **même en optionnel** → toute l'équipe pirate. Prénom/nom tolérés si justifiés.

**UX** — Intelligibilité, utilisabilité, pas de friction, pas de liens morts, parcours fluide.

**UI** — Lisibilité (max 3 polices, tailles cohérentes), couleurs (max 5, harmonie, contraste), organisation (navbar stable, aéré, sobre, logo + slogan + proposition de valeur sous le slogan), photos/vidéos de qualité et qui ne cassent pas le chargement.

**Besoin** — Problème identifié, réponse (même partielle) apportée.

**Proposition de valeur** — Déclarée, claire, unique, réaliste, atteinte.

---

### Jury Technique

**Éliminatoires**
1. **Mélanges de langages** : HTML dans les controllers, messages de conflit git visibles → toute l'équipe pirate.
2. **Models sans relations** : plusieurs models sans lien entre eux.
3. **Architecture non REST** : une route POST en dehors du CRUD standard → toute l'équipe pirate. GET autorisés pour pages statiques.
4. **Clefs API en clair** dans le code.
5. **Français dans le code** : noms de classes, models, variables en français → toute l'équipe pirate.
6. **Liens hardcodés** : pas de helpers (`<a href="...">`, `<img src="...">` au lieu de `link_to`, `image_tag`).

**Backend** — Fat Model Skinny Controllers, services, nommage orienté produit, mailer présent, routes propres / nested resources, validations dans les models, APIs dans des services.

**BDD** — Bons types (ex. string pour zipcode), migrations propres + reproductibles, seed, N-N en `has_many :through` (pas `has_and_belongs_to_many`).

**Frontend** — Responsive, DRY + partials, composants, framework CSS, helpers Rails (link_to, image, etc.), assets en prod (pas d’icônes/images manquantes), Hotwire, assets bien rangés.

---

### Jury Cursus

**Éliminatoires**
- Pas d’app fonctionnelle en production.
- Pas d’auth complète : **5 vues Devise** (inscription, connexion, édition profil, mot de passe oublié, réinitialisation).
- Pas de mailer fonctionnel en production.
- **Pas d’API externe** (hors mailer et Google Maps) — au moins une requise.
- Moins de 2 models (dont users) avec associations.
- Pas de front orienté composants.
- Les 5 vues Devise sans CSS.
- Front irrecevable / site illisible.

**Concepts clefs** — Dashboard admin, Hotwire + Stimulus.

**Travail en équipe — Éliminatoires**
- Personnes qui n’ont pas ou peu codé (vérif commits).
- Pas de Trello (ou Asana / Atlassian).
- Code pas sur GitHub/GitLab.
- Pas d’utilisation des branches Git.

**Bonnes pratiques** — Code commenté, indenté, pas de commit sur Master, commits fréquents et explicites en anglais, pipeline dev/prod, branche par fonctionnalité, agilité, stand-ups, répartition équitable (commits).

---

## 2. Barème Fullstack — version élève (xlsx)

Référentiel en 2 colonnes : **Référentiel d'activité** | **Critères d'évaluation**.

Extrait des libellés (sharedStrings) — ordre logique par blocs :

### Données & BDD (C 3.a à C 3.d)
- C 3.a : Synthétiser les données utiles (cahier des charges, modèle de données). Critères : données identifiées, schéma tables/relations, données externes via API.
- C 3.b : Construire la BDD. Critères : nommage cohérent, types adaptés (varchar, boolean, integer…), relations correctes.
- C 3.c : Interroger la BDD (SQL). Critères : CRUD, tri/filtres, requêtes optimisées (clés étrangères, jointures).
- C 3.d : RGPD. Critères : données sensibles identifiées avec le client, information utilisateur (stockage, usage, partage), droit consultation/modification/suppression, données sensibles protégées.

### Conception & backend (C 4.a à C 4.g)
- C 4.a : Conceptualiser l’application (schéma fonctionnel). Critères : bonnes questions au client, force de proposition, fonctionnalités listées et détaillées, enchaînement des vues/actions.
- C 4.b : Développer (langage adapté). Critères : syntaxe et fonctions maîtrisées, code indenté et commenté, dossiers/fichiers organisés, conventions de nommage, limites du code connues, erreurs traitées.
- C 4.c : POO et héritage. Critères : portée attributs/méthodes cohérente, classes génériques et héritage, namespaces + autoloader ou chargement manuel.
- C 4.d : MVC. Critères : modèle = BDD, contrôleurs = logique + variables pour la vue, vue = affichage des données.
- C 4.e : Sécurité et rôles. Critères : protection contre les injections, authentification (identifiant + mot de passe, session/token), rôles et permissions (admin, auteur…).
- C 4.f : Travail en équipe (outils, versions). Critères : mobilisation et transmission, maîtrise de l’outil collaboratif (ex. GitLab), auto-évaluation avant contribution, compte rendu de participation.
- C 4.g : Livraison. Critères : conformité cahier des charges / déployé, tests unitaires réalisés et validés, app en ligne sans bugs et fonctionnelle, tests en production sans erreurs ni effets de bord.

---

## 3. Correspondance avec Koi's Story (CLAUDE.md / todo)

| Exigence (grille PDF / barème) | Statut projet |
|--------------------------------|---------------|
| REST uniquement, pas de POST hors CRUD | Rappelé CLAUDE.md |
| Code et README en anglais | Rappelé CLAUDE.md |
| Helpers pour liens/images, pas de HTML hardcodé | Rappelé CLAUDE.md |
| Fat Model, skinny controllers | Rappelé CLAUDE.md |
| Models reliés, has_many :through pour N-N | Modèle 12 tables, ordre migrations défini |
| Devise 5 vues | Stack |
| Mailer en prod + contact footer | Key features |
| Au moins 1 API (ex. Cloudinary) | Stack |
| Dashboard admin | Key features, back-office en cours |
| Hotwire (Turbo + Stimulus) | Stack |
| Branches DEV / Main, pas de commit sur Main | Versioning |
| CONTRIBUTORS.md, suivi tâches | Contribution Tracking |
| Signup minimal (email + mot de passe) | À respecter pour Devise |
| Page d’accueil : proposition de valeur claire | Personas, design Option B |
| RGPD (info utilisateur, droits) | À prévoir (C 3.d barème) |
| Tests unitaires, app testée en prod | C 4.g barème |

---

*Document généré à partir de : Grille projets finaux _ Version mouss'.pdf et Barème Fullstack - version élève.xlsx.*
