class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :koi, optional: true
  belongs_to :product, optional: true

  validates :quantity, numericality: { greater_than: 0 }
  validates :unit_price, numericality: { greater_than_or_equal_to: 0 }
  validate :single_item_reference

  private

  def single_item_reference
    return if koi.present? ^ product.present?

    errors.add(:base, "must reference exactly one koi or product")
  end
end
