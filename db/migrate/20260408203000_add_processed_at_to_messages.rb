class AddProcessedAtToMessages < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :processed_at, :datetime
  end
end
