class AddUniqueIndexToProductsReference < ActiveRecord::Migration[8.1]
  def change
    add_index :products, :reference, unique: true
  end
end
