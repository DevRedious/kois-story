# Risks & Blockers — Koi's Story

> Document de risques à destination de l'équipe et du jury THP.
> Mis à jour le 19/03/2026 — Deadline Beta : **23/03/2026**

---

## Résumé Exécutif

**4 jours restants avant la deadline beta.** Le backend Rails est à 0%. Le risque de ne pas livrer les critères éliminatoires THP est élevé. Ce document liste tous les bloquants connus et propose des mitigations concrètes.

---

## 🔴 Bloquants Éliminatoires THP

Ces points, s'ils ne sont pas livrés, entraînent l'échec du projet devant le jury.

### BLOQUANT 1 — Auth Devise non implémentée

| Dimension | Détail |
|-----------|--------|
| **Impact** | ÉLIMINATOIRE |
| **Statut** | Non démarré |
| **Délai estimé** | 1 jour |
| **Dépendances** | Rails initialisé, modèle User |
| **Mitigation** | Prioriser Devise avant toute autre feature. Le modèle User est simple (email + password + role). Les 5 vues custom peuvent réutiliser le style de `ADMIN/pages/login.html`. |

### BLOQUANT 2 — ActionMailer non fonctionnel en production

| Dimension | Détail |
|-----------|--------|
| **Impact** | ÉLIMINATOIRE |
| **Statut** | Non démarré |
| **Délai estimé** | 0.5 jour |
| **Dépendances** | SMTP credentials VPS, Message model |
| **Mitigation** | Utiliser **Mailjet** (SMTP gratuit, 1000 mails/mois). Tester IMPÉRATIVEMENT en production avant le jury — le mailer en dev avec letter_opener ne compte pas. |

### BLOQUANT 3 — API externe (Cloudinary) non intégrée

| Dimension | Détail |
|-----------|--------|
| **Impact** | ÉLIMINATOIRE |
| **Statut** | Non démarré |
| **Délai estimé** | 1 jour |
| **Dépendances** | Compte Cloudinary, credentials, modèle Image |
| **Mitigation** | Créer compte Cloudinary (plan gratuit sufficient). Si Cloudinary non dispo avant jury : utiliser Active Storage + stockage local en dev, migrer vers Cloudinary en prod. Ce n'est pas idéal mais évite le bloquant. |

### BLOQUANT 4 — Aucun test (`rails test`)

| Dimension | Détail |
|-----------|--------|
| **Impact** | ÉLIMINATOIRE |
| **Statut** | Non démarré |
| **Délai estimé** | 0.5 jour |
| **Dépendances** | Models et controllers implémentés |
| **Mitigation** | Écrire a minima : tests model Koi (validations + scopes filtres), test model Message (validation email), test controller kois#index (accès public). 5-10 tests minimum suffisent pour THP. |

---

## 🟠 Bloquants Rails

Ces points ne sont pas éliminatoires mais bloquent la fonctionnalité principale.

### BLOQUANT 5 — Backend à 0%, deadline J+4

| Dimension | Détail |
|-----------|--------|
| **Impact** | Très élevé |
| **Délai restant** | 4 jours |
| **Risque** | Impossible de livrer 11 phases de migration en 4 jours seul |
| **Mitigation** | **Réduire le scope.** V1 strict : Kois (CRUD admin + listing public), Messages (contact + mailer), Devise. Tout le reste (Orders, Payments, Products, ClientProfiles) → V2. Le jury attend une application fonctionnelle, pas complète. |

### BLOQUANT 6 — WhatsApp numéros manquants

| Dimension | Détail |
|-----------|--------|
| **Impact** | Élevé — CTA principal non fonctionnel |
| **Statut** | En attente client |
| **Mitigation** | Relancer immédiatement le client (Manu/Mathilde). En attendant : utiliser un numéro placeholder visible comme `XXXXXX` avec une note en dev. Ne pas bloquer le dev pour attendre ce numéro. |

### BLOQUANT 7 — Google Business non créé

| Dimension | Détail |
|-----------|--------|
| **Impact** | Moyen — pas d'adresse Maps |
| **Statut** | À créer avec le client |
| **Mitigation** | Afficher l'adresse textuelle en attendant la validation Google Business : "Parc d'activités des Chênes, Lieu-dit Grange des Échets, 01700 Miribel". Intégrer une iframe Google Maps statique si le compte est validé avant le jury. |

### BLOQUANT 8 — Domaine non communiqué

| Dimension | Détail |
|-----------|--------|
| **Impact** | Moyen — pas d'URL production |
| **Mitigation** | Déployer sur le VPS avec IP ou sous-domaine temporaire pour la démo jury. Migrer vers le vrai domaine après le jury. |

---

## 🟡 Risques Techniques

### RISQUE 1 — Turbo + JS existant incompatibles

**Description :** Tous les fichiers JS de VISITORS utilisent `DOMContentLoaded`. Après navigation Turbo, cet event ne re-fire pas. Les filtres, la galerie, et les animations ne fonctionneront pas sur les pages naviguées via Turbo.

**Probabilité :** Certaine si non corrigé
**Impact :** Moyen — UX dégradée sur navigation interne
**Correction :**
```js
// Remplacer dans chaque fichier JS :
document.addEventListener("DOMContentLoaded", init);
// Par :
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("turbo:load", init);
```
Ou migrer vers Stimulus (solution pérenne).

---

### RISQUE 2 — SQLite en production VPS

**Description :** SQLite sur VPS multi-process (Puma) peut causer des erreurs de lock de base de données sous charge.

**Probabilité :** Faible (démo jury = trafic minimal)
**Impact :** Faible en démo, moyen en production réelle
**Correction :**
```yaml
# config/database.yml — production
production:
  adapter: sqlite3
  database: db/production.sqlite3
  pool: 5
  timeout: 5000
  # Activer WAL mode pour réduire les locks
```

```ruby
# config/initializers/sqlite_wal.rb
ActiveRecord::Base.connection.execute("PRAGMA journal_mode=WAL") if Rails.env.production?
```

---

### RISQUE 3 — `order-form.js` incompatible Stimulus

**Description :** `order-form.js` génère du HTML avec `onclick=""` inline. En Rails avec Stimulus, ces handlers ne fonctionnent plus après un render Turbo Streams.

**Probabilité :** Certaine si Orders scope V1
**Impact :** Moyen si Orders dans V1, nul si repoussé en V2
**Correction :** Refactorer selon `FRONTEND_REFACTOR_PLAN.md` §4 avant d'intégrer dans Rails.

---

### RISQUE 4 — Chemins assets fragiles

**Description :** Les composants référencent les fonts et images via des chemins relatifs (`../../docs/fonts/`, `../../docs/assets/`). Ces chemins seront cassés lors de la migration Rails (Asset Pipeline utilise des chemins différents).

**Probabilité :** Certaine
**Impact :** Faible — facile à corriger
**Correction :**
- Polices → `app/assets/fonts/`
- Images → `app/assets/images/` ou Cloudinary
- Mettre à jour les `@font-face` et `image_tag` helpers

---

### RISQUE 5 — Seeds incomplets avant démo jury

**Description :** La démo jury nécessite des koïs réels (photos, variétés, prix). Sans images Cloudinary et données seed complètes, le catalogue apparaît vide.

**Probabilité :** Haute (assets photos non encore reçus du client)
**Impact :** Élevé — première impression jury négative
**Mitigation :**
- Utiliser des photos de koïs libres de droits (Unsplash) pour les seeds de démo
- Seeds au minimum 12 koïs couvrant les variétés principales
- Placeholder `https://placehold.co/800x600?text=Koï+Konishi` si Cloudinary non configuré

---

### RISQUE 6 — Contrainte 200 lignes non respectée

**Description :** 18 fichiers CSS dépassent la limite de 200 lignes. Lors de l'intégration Rails, si le jury vérifie les fichiers CSS, cela peut être signalé comme violation du CLAUDE.md.

**Probabilité :** Moyenne (jury ne vérifie pas toujours les fichiers CSS)
**Impact :** Faible
**Mitigation :** Refactorer selon `FRONTEND_REFACTOR_PLAN.md` §2 et §3 lors de l'intégration dans `app/assets/stylesheets/`.

---

## 🟢 Risques Faibles / Acceptables

| Risque | Probabilité | Impact | Décision |
|--------|-------------|--------|----------|
| Performance mobile (backdrop-filter) | Faible | Faible | Accepter — cible smartphones récents |
| Contraste ratio WCAG (non mesuré) | Faible | Faible | Mesurer avec Axe avant jury |
| Tokens CSS dupliqués ADMIN/VISITORS | Certaine | Faible | Corriger lors migration Rails |
| Newsletter V2 non implémentée | Certaine | Nul | Dormant V2 — explicitement documenté |
| Orders/Payments admin non implémentés | À décider | Moyen | Pousser en V2 si temps insuffisant |

---

## Plan de Contingence — 4 Jours

### Si l'équipe est de 2+ personnes

**Développeur A (Backend)** :
- J1 : Rails init + migrations + models (Phase 1-2)
- J2 : Devise + routes + controllers kois/messages (Phase 3 + 5 partiel)
- J3 : Mailer + Cloudinary (Phase 7-8)
- J4 : Seeds + tests + deploy prod (Phase 10-11)

**Développeur B (Frontend/Rails)** :
- J1 : Layouts (application.html.erb + admin.html.erb) + partials header/footer/sidebar (Phase 4)
- J2 : Views public (home, kois index/show) (Phase 5)
- J3 : Views admin (dashboard, kois CRUD) (Phase 6)
- J4 : Stimulus controllers + polish + debug (Phase 9)

### Si développeur seul

Scope V1 minimal (jury-survivable) :
1. ✅ Rails init + models User, Koi, Message, Image, Tag, KoiTag
2. ✅ Devise (auth obligatoire)
3. ✅ Public : Home, Kois index/show, Contact (mailer)
4. ✅ Admin : Dashboard, Kois CRUD, Messages index/update
5. ❌ Orders/Payments/Products → V2 post-jury
6. ✅ 10+ seeds kois, 1 admin user
7. ✅ 5 tests minimum
8. ✅ Deploy VPS

---

## Matrice de Priorité Finale

```
                    IMPACT
                 Faible    Moyen    Élevé
PROBABILITÉ
Certaine    |   Tokens  | Turbo  | Backend 0% |
Haute       |           | WA Nums| Mailer     |
Moyenne     |  200 lines| Tests  |            |
Faible      |  SQLite   |        | SMTP VPS   |
```

**Action immédiate priorité 1** : Démarrer Rails aujourd'hui. Backend bloqué = projet THP échoué.
