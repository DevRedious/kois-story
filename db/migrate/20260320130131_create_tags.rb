class CreateTags < ActiveRecord::Migration[8.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :category

      t.timestamps
    end
  end
end
