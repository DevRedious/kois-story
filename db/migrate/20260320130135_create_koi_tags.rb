class CreateKoiTags < ActiveRecord::Migration[8.1]
  def change
    create_table :koi_tags do |t|
      t.references :koi, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
