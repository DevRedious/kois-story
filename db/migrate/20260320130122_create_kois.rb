class CreateKois < ActiveRecord::Migration[8.1]
  def change
    create_table :kois do |t|
      t.string :name
      t.string :variety
      t.integer :age_class
      t.integer :age
      t.integer :sex
      t.integer :size_cm
      t.decimal :price
      t.boolean :konishi_lineage
      t.text :description
      t.integer :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
