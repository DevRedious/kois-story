class ClientProfile < ApplicationRecord
  belongs_to :user
  has_many :orders, dependent: :destroy

  validates :name, presence: true
end
