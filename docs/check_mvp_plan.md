Voici mon analyse complète. 24 fichiers CSS VISITORS confirmés (le plan est juste sur ce point). Passons aux incohérences.

---

## Analyse du rails_mvp_plan.md — Problèmes identifiés

## CRITIQUES (bloquants le jour J)

### 1. root 'kois#index' — page d'accueil incorrecte

CLAUDE.md est explicite : / = "Home — hero, pitch, CTAs". La page catalogue koi est /kois. Le plan définit le root comme le catalogue, ce qui supprime la homepage hero (visible dans VISITORS/pages/home.html). Il manque un HomeController ou PagesController#home pour le root, et une vue reprenant le hero.

### 2. 5 routes manquantes dans la navbar

CLAUDE.md liste ces routes dans la navbar :
- /decouvrir — biographie Mathilde & Manu
- /materiel — pages statiques équipement
- /soins — pages statiques soins
- /nourriture — page statique nourriture Konishi
- /azukari — service de pension

Aucune n'est dans le plan (Step 9 ni Step 8). Au demo, cliquer sur la navbar casse tout.

### 3. Conflit scope :available vs enum

Dans koi.rb, enum status: { available: 0, ... } génère automatiquement un scope .available. Puis le plan redéfinit scope :available, -> { where(status: :available) }. Rails lève une ArgumentError au démarrage. L'un des deux doit être supprimé.

### 4. Colonne available:boolean orpheline

La commande rails generate model Koi inclut available:boolean. Mais la logique de disponibilité passe entièrement par l'enum status. La colonne available atterrit en base, n'est jamais utilisée, et crée une confusion avec l'enum.

### 5. ImageUploader jamais monté

Step 6 crée app/uploaders/image_uploader.rb, mais mount_uploader n'est jamais ajouté à aucun modèle. Le modèle Image a un champ url:string brut — CarrierWave n'est pas branché. L'upload Cloudinary ne fonctionnera pas.

---

## RISQUES THP (éliminatoires potentiels)

### 6. Contenu mailer en français

THP exige "all code in English". Le plan a :
- Sujet : "[Koi's Story] Nouveau message de #{message.sender_name}"
- Template : "Nouveau message de", "Email :", "Message :"

C'est borderline — le contenu email destiné au client peut légitimement être en français, mais dans le doute il vaut mieux angliciser.

### 7. User#admin? redéfini manuellement

enum role: { visitor: 0, admin: 1 } génère admin? automatiquement. Le plan redéfinit def admin?; role == 'admin'; end — c'est redondant et override le prédicat enum. À supprimer.

### 8. deliver_later sans backend de queue

MessageMailer.new_message(self).deliver_later requiert Active Job configuré. En dev SQLite le backend :async peut rater silencieusement. Pour un MVP de demo, deliver_now est plus sûr.

### 9. Admin::MessagesController#update absent

Step 9 routes : resources :messages, only: [:index, :show, :update]. Step 8 génère : rails generate controller Admin::Messages index show — l'action update (pour marquer comme lu) n'est pas générée.

### 10. Vues Devise "fonctionnelles" avec registrations skippées

THP exige "5 views generated and functional". Les views registrations/ sont générées mais la route /users/sign_up est désactivée — elles retournent 404. Si THP interprète "functional" comme "accessible", c'est un risque. À vérifier avec les formateurs, ou ajouter une note dans le plan.

---

## MINEURS (propres à corriger)

### 11. visitor.css et demo.css copiés dans Rails

Le cp VISITORS/assets/css/*.css copie aussi visitor.css (manifest prototype avec @import) et demo.css (page preview prototype). Ces deux fichiers ne doivent pas être dans le pipeline Rails — le plan ne les exclut pas.

### 12. Un seul admin en seeds

CLAUDE.md mentionne "Mathilde & Emmanuel" — le plan ne crée qu'un compte admin. Emmanuel devrait probablement aussi avoir un compte.

### 13. Pas d'admin dashboard dédié

admin root 'kois#index' est fonctionnel mais CLAUDE.md mentionne un dashboard. Pour le MVP c'est acceptable, mais à noter.

### 14. devise_for déclaré deux fois

Step 4 dit d'ajouter devise_for :users, skip: [:registrations] dans routes.rb, et Step 9 le remet dans le bloc routes complet. Pas un bug car Step 9 remplace entièrement routes.rb, mais la note de Step 4 peut induire en erreur si on suit le plan séquentiellement.

---

## Résumé — Ce qui doit être corrigé dans le plan

| Priorité | Problème | Correction |
| --- | --- | --- |
| 🔴 Critique | Root route = catalogue au lieu de hero | Ajouter HomeController + root route + vue |
| 🔴 Critique | 5 pages navbar absentes | Ajouter Step 8 controllers + Step 9 routes + Step 10 vues statiques |
| 🔴 Critique | scope :available conflit enum | Supprimer le scope manuel dans koi.rb |
| 🔴 Critique | available:boolean orphelin | Retirer de la commande generate model |
| 🔴 Critique | ImageUploader jamais monté | Préciser où/comment monter CarrierWave |
| 🟡 THP | Mailer en français | Angliciser subject + template |
| 🟡 THP | admin? redondant | Supprimer la méthode manuelle |
| 🟡 THP | deliver_later sans queue | Remplacer par deliver_now |
| 🟡 THP | update manquant Admin::Messages | Ajouter l'action au generate |
| 🟠 Mineur | visitor.css + demo.css copiés | Exclure du cp ou les supprimer après |
| 🟠 Mineur | 1 seul admin en seeds | Ajouter Emmanuel |

Le plan est solide dans son architecture globale — la séparation VISITORS/ADMIN, la gestion des namespaces, les tokens CSS partagés et les 10 modules JS sont bien pensés. Les corrections ci-dessus concernent principalement des omissions (pages statiques, root route) et quelques bugs de code (scope conflict, CarrierWave non monté) qui bloqueraient le démarrage.

---

## Point de vue Claude — Validation et compléments

### Ce qui est confirmé

Tous les points 1 à 13 sont valides. Priorités 1, 2, 3, 4, 5 bloqueraient effectivement le démarrage ou la demo.

**Point 14 (devise_for dupliqué)** : déjà corrigé dans le dernier commit — Step 9 ne contient plus qu'un seul `devise_for`.

### Points manquants dans cette analyse

**A. `read:boolean` sans valeur par défaut**

La commande `rails generate model Message ... read:boolean` crée la colonne sans default. En base, les nouveaux messages auront `read: nil` et non `read: false`. Le scope `Message.unread` (utilisé dans la sidebar admin pour le badge) retournera des résultats incorrects. Correction : ajouter `default: false` dans la migration manuellement.

**B. `noreply@koistory.fr` non vérifié dans Resend**

Le mailer utilise `from: "Koi's Story <noreply@koistory.fr>"`. Resend exige que le domaine `koistory.fr` soit vérifié (DNS TXT record). Pour l'oral blanc, si le domaine n'est pas encore configuré, cet expéditeur sera rejeté silencieusement. Solution pour le MVP : utiliser l'adresse sandbox Resend `onboarding@resend.dev` ou l'adresse Gmail vérifiée `contact.koistory@gmail.com`.

**C. `available:boolean` toujours dans la commande `rails generate`**

Le point 4 signale correctement la colonne orpheline. Mais la commande `rails generate model Koi` dans le plan inclut encore `available:boolean` — si on suit le plan sans corriger la commande, la colonne sera créée quand même. La correction doit être dans la commande, pas seulement dans le modèle.

**D. CarrierWave non branché sur le formulaire admin**

Le point 5 note que `mount_uploader` est absent du modèle. Mais même en l'ajoutant, `koi_params` dans `Admin::KoisController` ne permet pas les fichiers image — il faudra ajouter le champ dans le `permit()` et le formulaire ERB. Ce n'est pas documenté.

### Accord global

L'analyse est rigoureuse et les priorités sont correctement classées. Les 5 critiques sont tous des bugs de démarrage réels. Les corriger en amont dans le plan évitera à Cursor de produire du code qui ne boot pas.