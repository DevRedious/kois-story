class CreateClientProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :client_profiles do |t|
      t.string :name
      t.string :phone
      t.string :address
      t.text :notes
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
