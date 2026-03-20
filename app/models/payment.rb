class Payment < ApplicationRecord
  belongs_to :order

  enum :payment_type, { full: 0, deposit: 1, installment: 2 }
  enum :status, { pending: 0, partial: 1, paid: 2 }

  validates :amount, numericality: { greater_than: 0 }
end
