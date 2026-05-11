class RestrictOrderItemProductForeignKey < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :order_items, :products
    add_foreign_key :order_items, :products
  end
end
