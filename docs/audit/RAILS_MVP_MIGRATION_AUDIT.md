# Audit Migration Rails MVP

> Audit réalisé le 21/03/2026 — Périmètre : branch `MVP`, code Rails scaffoldé
> Tous les points ont été vérifiés fichier par fichier avant d'être documentés.

---

## Résumé

La migration Rails est globalement solide : schéma complet en ordre de dépendance, routes RESTful propres, Devise correctement restreint, admin protégé par double vérification, Cloudinary/CarrierWave fonctionnel avec allowlists. Quatre problèmes ont été confirmés et sont documentés ci-dessous.

---

## Bug 1 — `order_items` : contrainte `NOT NULL` en DB incompatible avec le modèle

**Statut : bloquant — crash à la création d'un order_item**

### Preuve

`db/migrate/20260320143851_create_order_items.rb` lignes 7-8 :
```ruby
t.references :koi, null: false, foreign_key: true
t.references :product, null: false, foreign_key: true
```

`db/schema.rb` lignes 73-75 confirme ce qui est en base :
```
t.integer "koi_id", null: false
t.integer "product_id", null: false
```

`app/models/order_item.rb` lignes 3-4 :
```ruby
belongs_to :koi, optional: true
belongs_to :product, optional: true
```

Spec (`../CLAUDE.md`) :
> `order_items` — `koi_id` (nullable), `product_id` (nullable)

### Effet concret

- Impossible de créer un `OrderItem` avec seulement un koi ou seulement un produit — la DB rejette la contrainte.
- `app/models/product.rb` ligne 2 déclare `has_many :order_items, dependent: :nullify`. Si un produit est supprimé, Rails tente de passer `product_id = NULL` sur les order_items liés, ce que la DB rejette avec une `NotNullViolation`.

### Correction

Créer une migration :
```ruby
change_column_null :order_items, :koi_id, true
change_column_null :order_items, :product_id, true
```

---

## Bug 2 — Seeds sans images : catalogue public vide après `db:seed`

**Statut : bloquant — toutes les pages kois retournent 0 résultats ou 404**

### Preuve

`db/seeds.rb` crée 26 kois sans aucun enregistrement `Image` associé.

`app/models/koi.rb` ligne 15 :
```ruby
scope :with_images, -> { joins(:images).where(images: { imageable_type: name }).distinct }
```
`joins` produit un `INNER JOIN` — tout koi sans image est exclu du résultat.

`app/models/koi.rb` ligne 18 :
```ruby
def self.filter(params)
  kois = with_images   # ← point d'entrée du catalogue public
  ...
end
```

`app/controllers/kois_controller.rb` ligne 8 :
```ruby
@koi = Koi.with_images.find(params[:id])
```

### Effet concret

- `GET /kois` → liste vide (0 koi affiché) malgré les 26 kois en base.
- `GET /kois/:id` pour n'importe quel koi seedé → `ActiveRecord::RecordNotFound` (404).
- La homepage et le showcase sont également impactés s'ils appellent `Koi.filter` ou `Koi.with_images`.

### Correction

Deux options :
1. **Ajouter des images dans les seeds** — URLs Cloudinary placeholder ou images locales, un `Image.create!` par koi.
2. **Rendre `with_images` optionnel dans `filter`** — commencer par `all` et appliquer `with_images` seulement si le filtre image est demandé. Cette option change le comportement de la page publique (affiche des kois sans photo).

L'option 1 est recommandée : un koi sans photo ne devrait pas être visible dans le catalogue.

---

## Bug 3 — Liste de variétés incohérente entre seeds et formulaire admin

**Statut : important — les variétés seedées ne correspondent pas au dropdown admin**

### Preuve

`db/seeds.rb` lignes 23-30 utilise ces 26 variétés :
```
Kohaku, Taisho Sanke, Showa Sanshoku, Utsuri, Bekko, Asagi, Shusui,
Koromo, Kawarimono, Hikari Muji, Hikari Utsurimono, Hikari Moyo,
Kinginrin, Tancho, Goshiki, Doitsu, Ghost Koi, Butterfly Koi,
Chagoi, Soragoi, Ochiba Shigure, Kujaku, Benigoi, Shiro Muji,
Ki Utsuri, Midorigoi
```

`app/helpers/admin/kois_helper.rb` lignes 42-48 expose ces 26 variétés :
```
Aragoke, Asagi, Benigoi, Chagoi, GinrinShowa, Golden Korn, Goromo,
Goshiki, Hariwake, Karashigoi, Kikokuryu, Kohaku, Kujaku, Kumonryu,
Matsubakawabate, Ochiba, Sanke, ShiroUtsuri, Showa, Soragoi, Sushui,
Tancho, TanchoKohaku, Utsuri, Yamabuki, Yellow Monkey
```

Seules 9 variétés sont communes aux deux listes. Des kois seedés avec "Taisho Sanke" ne correspondent pas à "Sanke" dans le dropdown, et vice versa pour une vingtaine d'entrées.

### Effet concret

- Les kois seedés ont des valeurs `variety` qui n'apparaissent pas dans le dropdown du formulaire admin — Mathilde voit des incohérences dès la première connexion.
- Les filtres de catalogue côté public fonctionnent sur la valeur exacte : un filtre "Showa" ne retournera pas les kois "Showa Sanshoku".
- La liste canonique attendue par le client n'est définie nulle part dans le code.

### Correction

Définir une seule liste canonique (à valider avec le client) dans `app/helpers/admin/kois_helper.rb#variety_options`, et aligner `db/seeds.rb` sur cette même liste.

---

## Risque 4 — 2FA installé mais non implémenté : dépendance env var silencieuse

**Statut : risque de démarrage en production si `OTP_SECRET_KEY` absent**

### Preuve

`Gemfile` lignes 20-22 :
```ruby
gem "devise-two-factor", ">= 6.4.0"
gem "rotp"
gem "rqrcode"
```

`app/models/user.rb` lignes 2-5 :
```ruby
devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :validatable,
       :two_factor_authenticatable,
       otp_secret_encryption_key: ENV["OTP_SECRET_KEY"]
```

Aucune vue 2FA n'existe dans `app/views/` (pas de `two_factor_authentications/`, pas de route `totp_*`).

### Effet concret

- La 2FA est configurée au niveau du modèle et de la DB (`otp_secret`, `otp_required_for_login`, `consumed_timestep`) mais aucun utilisateur ne peut l'activer faute d'interface.
- En production, si `OTP_SECRET_KEY` n'est pas défini, `devise-two-factor >= 6.x` lève une erreur à l'initialisation et l'app ne démarre pas.
- La fonctionnalité est donc à la fois inutilisable côté UX et risquée côté déploiement.

### Options

1. **Retirer la 2FA** — supprimer `devise-two-factor`, `rotp`, `rqrcode` du Gemfile, retirer `:two_factor_authenticatable` du model User, créer une migration pour supprimer les 3 colonnes OTP. Solution la plus propre pour le MVP.
2. **Compléter la 2FA** — ajouter les vues et routes nécessaires, documenter `OTP_SECRET_KEY` comme variable obligatoire. Hors périmètre MVP selon le spec.

---

## Points vérifiés et écartés

Les éléments suivants ont été examinés et ne constituent pas des bugs :

| Point | Verdict |
|---|---|
| Rôle `client` absent de l'enum `User` | Non-bug : rôle explicitement "dormant V2" dans le spec, l'ajouter ultérieurement est non-bloquant |
| `MessageMailer` avec `to: admin_recipient` potentiellement nil | Non-bug : `Message#notify_admin` retourne si `ADMIN_EMAIL` est blank avant d'appeler le mailer |
| `KoisController#show` → 404 pour kois sans image | Comportement intentionnel : un koi non photographié n'est pas commercialisable |
| Seeds créant 2 admins (Mathilde + Emmanuel) | Ambiguïté spec, non confirmé comme erreur : les deux sont co-gérants de l'élevage |
| `ImageUploader#public_id` utilisant `model.id` | Non-bug en pratique : CarrierWave appelle l'uploader après save, `model.id` est disponible |
