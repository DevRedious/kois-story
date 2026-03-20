class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :reference
      t.text :description
      t.decimal :price
      t.integer :stock_quantity
      t.integer :category
      t.integer :status

      t.timestamps
    end
  end
end
