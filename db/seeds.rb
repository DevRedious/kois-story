def upsert_user(email:, role:, password:)
  user = User.find_or_initialize_by(email: email)
  user.role = role
  if user.new_record? || ENV["ADMIN_PASSWORD"].present?
    user.password = password
    user.password_confirmation = password
  end
  user.save!
  user
end

def sync_image(record, asset, alt)
  record.images.where(position: 0).delete_all
  image = record.images.build(alt: alt, position: 0)
  image.save!(validate: false)
  image.update_column(:url, "/docs/assets/#{asset}")
end

def create_order(client, status, notes, lines, payments)
  total = lines.sum { |line| BigDecimal(line[:unit_price].to_s) * line[:quantity] }
  order = Order.create!(client_profile: client, status: status, notes: notes, total_amount: total)
  lines.each { |line| OrderItem.create!(line.merge(order: order)) }
  payments.each { |payment| Payment.create!(payment.merge(order: order)) }
  order
end

def remove_fixture_rows
  fixture_koi_ids = Koi.where(name: "MyString").pluck(:id)
  fixture_product_ids = Product.where(reference: "MyString").pluck(:id)
  fixture_client_ids = ClientProfile.where(name: "MyString").pluck(:id)

  Order.where(client_profile_id: fixture_client_ids).destroy_all
  OrderItem.where(koi_id: fixture_koi_ids).delete_all
  OrderItem.where(product_id: fixture_product_ids).delete_all
  KoiTag.where(koi_id: fixture_koi_ids).delete_all
  Image.where(imageable_type: "Koi", imageable_id: fixture_koi_ids).delete_all
  Koi.where(id: fixture_koi_ids).delete_all
  Product.where(id: fixture_product_ids).delete_all
  ClientProfile.where(id: fixture_client_ids).delete_all
  Message.where(sender_email: %w[alice@example.com bob@example.com]).delete_all
  User.where(email: %w[admin1@example.com admin2@example.com visitor@example.com]).delete_all
end

remove_fixture_rows

admin_password = ENV.fetch("ADMIN_PASSWORD", "changeme")
admin = upsert_user(email: "contact.koistory@gmail.com", role: :admin, password: admin_password)
upsert_user(email: "emmanuel.koistory@gmail.com", role: :admin, password: admin_password)

demo_password = ENV.fetch("DEMO_CLIENT_PASSWORD", "demo1234")
client_rows = [
  [ "camille.martin@example.com", "Camille Martin", "06 11 22 33 44", "12 rue des Bassins, Lyon", "Cherche des kois Konishi calmes pour bassin familial." ],
  [ "julien.moreau@example.com", "Julien Moreau", "06 22 33 44 55", "8 allee Sakura, Nantes", "Prefere les Showa et materiel premium." ],
  [ "amelie.bernard@example.com", "Amelie Bernard", "06 33 44 55 66", "4 chemin du Jardin, Lille", "Commande boutique avec suivi paiement." ]
]

clients = client_rows.to_h do |email, name, phone, address, notes|
  user = upsert_user(email: email, role: :visitor, password: demo_password)
  profile = ClientProfile.find_or_initialize_by(user: user)
  profile.update!(name: name, phone: phone, address: address, notes: notes)
  [ name, profile ]
end

Order.where(client_profile_id: clients.values.map(&:id)).destroy_all

product_rows = [
  [ "MAT-BASSIN-80", "Filtre bassin compact 80L", :materiel, :active, 149.90, 8, "Filtration compacte pour bassin de jardin." ],
  [ "SOI-SEL-5", "Sel mineral bassin 5kg", :soins, :active, 18.50, 24, "Aide au confort osmotique apres transport." ],
  [ "NOU-KONISHI-MIX", "Nourriture Konishi mix 10kg", :nourriture, :active, 89.00, 14, "Granules saison toutes tailles." ],
  [ "MAT-EPUISETTE-60", "Epuisette japonaise 60cm", :materiel, :inactive, 59.00, 0, "Modele reserve aux prochaines livraisons." ],
  [ "SOI-BACTERIES-START", "Bacteries starter bassin", :soins, :active, 26.90, 18, "Demarrage biologique du filtre." ],
  [ "NOU-WHEATGERM-3", "Wheat germ hiver 3kg", :nourriture, :inactive, 32.00, 0, "Reference saisonniere en pause." ]
]

products = product_rows.to_h do |reference, name, category, status, price, stock, description|
  product = Product.find_or_initialize_by(reference: reference)
  product.update!(
    name: name,
    category: category,
    status: status,
    price: price,
    stock_quantity: stock,
    description: description
  )
  [ reference, product ]
end

Image.where("url LIKE ?", "%placehold.co%").delete_all
Koi.where("name LIKE ?", "Koi %").find_each(&:destroy)

koi_rows = [
  [ "Sakura Grand Voile", "Butterfly Koi", :yonsai, 4, :female, 62, 2400, :sold_out, true, "24148-Sakura-Grand-Voile-Suda-600x800.jpg" ],
  [ "Akane Showa", "Showa Sanshoku", :nisai, 2, :female, 42, 1450, :available, true, "carpe-koi-showa-scaled.jpg" ],
  [ "Hikari Tancho", "Tancho", :jumbo_tosai_femelle, 1, :unknown, 34, 850, :available, true, "butterfly-tancho-kujaku.jpg" ],
  [ "Gin Rin Sanke", "Taisho Sanke", :sansai, 3, :male, 55, 1900, :incoming, false, "carpe-koi-showa-scaled-hero.jpg" ],
  [ "Chagoi Miel", "Chagoi", :nisai, 2, :female, 48, 1250, :available, false, "butterfly-tancho-kujaku.jpg" ],
  [ "Kujaku Argent", "Kujaku", :tosai, 1, :unknown, 28, 520, :available, false, "24148-Sakura-Grand-Voile-Suda-600x800.jpg" ],
  [ "Shiro Utsuri", "Utsuri", :sansai, 3, :male, 53, 1700, :sold_out, true, "carpe-koi-showa-scaled.jpg" ],
  [ "Goshiki Benika", "Goshiki", :nisai, 2, :unknown, 39, 980, :available, false, "carpe-koi-showa-scaled-hero.jpg" ]
]

kois = koi_rows.to_h do |name, variety, age_class, age, sex, size, price, status, lineage, asset|
  koi = Koi.find_or_initialize_by(name: name)
  koi.update!(
    variety: variety,
    age_class: age_class,
    age: age,
    sex: sex,
    size_cm: size,
    price: price,
    status: status,
    konishi_lineage: lineage,
    user: admin,
    description: "#{variety} selectionne pour une demo locale complete."
  )
  sync_image(koi, asset, "#{name} - #{variety}")
  [ name, koi ]
end

create_order(clients["Camille Martin"], :completed, "Vente salon avec accessoires de demarrage.", [
  { koi: kois["Sakura Grand Voile"], quantity: 1, unit_price: 2400 },
  { product: products["NOU-KONISHI-MIX"], quantity: 1, unit_price: 89 },
  { product: products["SOI-SEL-5"], quantity: 2, unit_price: 18.50 }
], [
  { amount: 2526, payment_type: :full, status: :paid, paid_at: 4.days.ago, due_at: 4.days.ago }
])

create_order(clients["Julien Moreau"], :confirmed, "Reservation Showa avec acompte et solde a venir.", [
  { koi: kois["Akane Showa"], quantity: 1, unit_price: 1450 },
  { product: products["MAT-BASSIN-80"], quantity: 1, unit_price: 149.90 },
  { product: products["SOI-BACTERIES-START"], quantity: 1, unit_price: 26.90 }
], [
  { amount: 500, payment_type: :deposit, status: :paid, paid_at: 2.days.ago, due_at: 2.days.ago },
  { amount: 400, payment_type: :installment, status: :partial, due_at: 10.days.from_now }
])

create_order(clients["Amelie Bernard"], :pending, "Commande boutique en attente de regularisation.", [
  { product: products["SOI-SEL-5"], quantity: 1, unit_price: 18.50 },
  { product: products["NOU-KONISHI-MIX"], quantity: 1, unit_price: 89 }
], [
  { amount: 107.50, payment_type: :full, status: :pending, due_at: 3.days.ago }
])

demo_messages = [
  { sender_name: "Nora Petit", sender_email: "nora.petit@example.com", body: "Bonjour, le Tancho est-il visible ce week-end ?", read: false, processed_at: nil },
  { sender_name: "Marc Lefevre", sender_email: "marc.lefevre@example.com", body: "Merci pour les conseils sur le filtre.", read: true, processed_at: nil },
  { sender_name: "Ines Robert", sender_email: "ines.robert@example.com", body: "Je confirme mon interet pour une selection Konishi.", read: true, processed_at: 1.day.ago }
]

Message.where(sender_email: demo_messages.map { |message| message[:sender_email] }).delete_all
now = Time.current
Message.insert_all(demo_messages.map { |message| message.merge(created_at: now, updated_at: now) })

puts "Seed completed: #{User.count} users, #{Koi.count} kois, #{Product.count} products, #{Order.count} orders, #{Payment.count} payments, #{Message.count} messages."
