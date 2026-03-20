class CreateImages < ActiveRecord::Migration[8.1]
  def change
    create_table :images do |t|
      t.string :url
      t.string :alt
      t.integer :position
      t.references :imageable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
