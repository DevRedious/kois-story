require_relative "../config/environment"

admin = User.find_by!(email: "contact.koistory@gmail.com")

visitor = User.find_or_initialize_by(email: "e2e.visitor@example.com")
if visitor.new_record?
  visitor.password = "changeme"
  visitor.password_confirmation = "changeme"
  visitor.role = :visitor
  visitor.save!
end

client = ClientProfile.find_or_create_by!(user: visitor) do |profile|
  profile.name = "Client E2E"
  profile.phone = "0601020304"
  profile.address = "1 rue des tests, 01700 Miribel"
  profile.notes = "Profil genere pour les checks Playwright."
end

[
  {
    name: "Pompe E2E",
    reference: "E2E-PUMP-001",
    category: :materiel,
    status: :active,
    price: 129.90,
    stock_quantity: 4,
    description: "Pompe de bassin dediee aux tests E2E."
  },
  {
    name: "Soin E2E",
    reference: "E2E-CARE-001",
    category: :soins,
    status: :active,
    price: 24.50,
    stock_quantity: 9,
    description: "Traitement de maintenance pour les scenarios E2E."
  },
  {
    name: "Nourriture E2E",
    reference: "E2E-FOOD-001",
    category: :nourriture,
    status: :active,
    price: 39.90,
    stock_quantity: 12,
    description: "Aliment premium utilise pour les checks Playwright."
  }
].each do |attributes|
  product = Product.find_or_initialize_by(reference: attributes[:reference])
  product.assign_attributes(attributes)
  product.save!
end

koi = Koi.order(:id).first || Koi.create!(
  name: "Koi E2E",
  variety: "Kohaku",
  age_class: :nisai,
  age: 2,
  sex: :female,
  size_cm: 38,
  price: 890,
  status: :available,
  konishi_lineage: true,
  description: "Koi de demonstration pour les tests end-to-end.",
  user: admin,
)

order = Order.find_or_initialize_by(client_profile: client, notes: "Commande E2E Playwright")
order.status = :pending
order.total_amount = 1019.90
order.save!

product = Product.find_by!(reference: "E2E-PUMP-001")
order_item = OrderItem.find_or_initialize_by(order:, product:, koi:)
order_item.quantity = 1
order_item.unit_price = order.total_amount
order_item.save!

payment = Payment.find_or_initialize_by(order:, payment_type: :deposit)
payment.amount = 250
payment.status = :pending
payment.due_at = 3.days.ago
payment.save!

now = Time.current
messages = [
  {
    sender_name: "Alice E2E",
    sender_email: "alice.e2e@example.com",
    body: "Bonjour, je souhaite des informations sur une koi disponible.",
    read: false,
    processed_at: nil
  },
  {
    sender_name: "Bruno E2E",
    sender_email: "bruno.e2e@example.com",
    body: "Merci pour votre retour, je confirme mon passage ce week-end.",
    read: true,
    processed_at: nil
  },
  {
    sender_name: "Claire E2E",
    sender_email: "claire.e2e@example.com",
    body: "Demande traitee, merci pour votre aide concernant le bassin.",
    read: true,
    processed_at: 2.days.ago
  }
]

messages.each do |attributes|
  existing = Message.find_by(sender_email: attributes[:sender_email])
  payload = attributes.merge(updated_at: now)

  if existing
    existing.update_columns(payload)
  else
    Message.insert_all!([ payload.merge(created_at: now) ])
  end
end

puts "E2E seed ready: #{Product.where("reference LIKE 'E2E-%'").count} products, #{Order.where(notes: 'Commande E2E Playwright').count} order, #{Payment.joins(:order).where(orders: { notes: 'Commande E2E Playwright' }).count} payment, #{Message.where("sender_email LIKE ?", "%.e2e@example.com").count} messages."
