class CreateOrders < ActiveRecord::Migration[8.1]
  def change
    create_table :orders do |t|
      t.integer :status
      t.decimal :total_amount
      t.text :notes
      t.references :client_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
