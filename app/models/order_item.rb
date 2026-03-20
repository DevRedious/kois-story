class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :koi, optional: true
  belongs_to :product, optional: true

  validates :quantity, numericality: { greater_than: 0 }
  validates :unit_price, numericality: { greater_than_or_equal_to: 0 }
end
