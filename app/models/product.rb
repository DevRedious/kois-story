class Product < ApplicationRecord
  has_many :order_items, dependent: :nullify

  enum :category, { materiel: 0, soins: 1, nourriture: 2 }
  enum :status, { inactive: 0, active: 1 }

  validates :name, :reference, :price, :category, :status, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
