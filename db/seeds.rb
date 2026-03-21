Message.destroy_all
KoiTag.destroy_all
Tag.destroy_all
Koi.destroy_all
User.destroy_all

admin_password = ENV.fetch("ADMIN_PASSWORD", "changeme")

admin = User.create!(
  email: "contact.koistory@gmail.com",
  password: admin_password,
  password_confirmation: admin_password,
  role: :admin
)

User.create!(
  email: "emmanuel.koistory@gmail.com",
  password: admin_password,
  password_confirmation: admin_password,
  role: :admin
)

varieties = [
  "Kohaku", "Taisho Sanke", "Showa Sanshoku", "Utsuri", "Bekko",
  "Asagi", "Shusui", "Koromo", "Kawarimono", "Hikari Muji",
  "Hikari Utsurimono", "Hikari Moyo", "Kinginrin", "Tancho",
  "Goshiki", "Doitsu", "Ghost Koi", "Butterfly Koi", "Chagoi",
  "Soragoi", "Ochiba Shigure", "Kujaku", "Benigoi", "Shiro Muji",
  "Ki Utsuri", "Midorigoi"
]

varieties.each_with_index do |variety, index|
  Koi.create!(
    name: "Koi #{index + 1}",
    variety: variety,
    age_class: Koi.age_classes.keys[index % Koi.age_classes.size],
    age: 1 + (index % 5),
    sex: Koi.sexes.keys[index % Koi.sexes.size],
    size_cm: 25 + index,
    price: 250 + (index * 30),
    status: :available,
    konishi_lineage: index.even?,
    description: "Healthy #{variety} koi selected for the MVP catalogue.",
    user: admin
  )
end

puts "Seed completed: #{User.count} users, #{Koi.count} kois."
