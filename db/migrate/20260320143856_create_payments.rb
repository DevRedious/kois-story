class CreatePayments < ActiveRecord::Migration[8.1]
  def change
    create_table :payments do |t|
      t.decimal :amount
      t.integer :payment_type
      t.integer :status
      t.datetime :paid_at
      t.datetime :due_at
      t.references :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
