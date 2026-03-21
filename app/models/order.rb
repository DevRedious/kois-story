class Order < ApplicationRecord
  belongs_to :client_profile
  has_many :order_items, dependent: :destroy
  has_many :payments, dependent: :destroy

  enum :status, { pending: 0, confirmed: 1, completed: 2, cancelled: 3 }

  validates :status, presence: true
end
