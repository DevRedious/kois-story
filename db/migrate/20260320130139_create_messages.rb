class CreateMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :messages do |t|
      t.string :sender_name
      t.string :sender_email
      t.text :body
      t.boolean :read, default: false, null: false

      t.timestamps
    end
  end
end
