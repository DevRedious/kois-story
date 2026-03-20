# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_20_143856) do
  create_table "client_profiles", force: :cascade do |t|
    t.string "address"
    t.datetime "created_at", null: false
    t.string "name"
    t.text "notes"
    t.string "phone"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_client_profiles_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "alt"
    t.datetime "created_at", null: false
    t.integer "imageable_id", null: false
    t.string "imageable_type", null: false
    t.integer "position"
    t.datetime "updated_at", null: false
    t.string "url"
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable"
  end

  create_table "koi_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "koi_id", null: false
    t.integer "tag_id", null: false
    t.datetime "updated_at", null: false
    t.index ["koi_id"], name: "index_koi_tags_on_koi_id"
    t.index ["tag_id"], name: "index_koi_tags_on_tag_id"
  end

  create_table "kois", force: :cascade do |t|
    t.integer "age"
    t.integer "age_class"
    t.datetime "created_at", null: false
    t.text "description"
    t.boolean "konishi_lineage"
    t.string "name"
    t.decimal "price"
    t.integer "sex"
    t.integer "size_cm"
    t.integer "status"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.string "variety"
    t.index ["user_id"], name: "index_kois_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.boolean "read", default: false, null: false
    t.string "sender_email"
    t.string "sender_name"
    t.datetime "updated_at", null: false
  end

  create_table "order_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "koi_id", null: false
    t.integer "order_id", null: false
    t.integer "product_id", null: false
    t.integer "quantity"
    t.decimal "unit_price"
    t.datetime "updated_at", null: false
    t.index ["koi_id"], name: "index_order_items_on_koi_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "client_profile_id", null: false
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "status"
    t.decimal "total_amount"
    t.datetime "updated_at", null: false
    t.index ["client_profile_id"], name: "index_orders_on_client_profile_id"
  end

  create_table "payments", force: :cascade do |t|
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "due_at"
    t.integer "order_id", null: false
    t.datetime "paid_at"
    t.integer "payment_type"
    t.integer "status"
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_payments_on_order_id"
  end

  create_table "products", force: :cascade do |t|
    t.integer "category"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name"
    t.decimal "price"
    t.string "reference"
    t.integer "status"
    t.integer "stock_quantity"
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.integer "category"
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer "consumed_timestep"
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.boolean "otp_required_for_login", default: false, null: false
    t.string "otp_secret"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.integer "role", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "client_profiles", "users"
  add_foreign_key "koi_tags", "kois"
  add_foreign_key "koi_tags", "tags"
  add_foreign_key "kois", "users"
  add_foreign_key "order_items", "kois"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "client_profiles"
  add_foreign_key "payments", "orders"
end
