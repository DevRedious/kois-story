class Tag < ApplicationRecord
  has_many :koi_tags, dependent: :destroy
  has_many :kois, through: :koi_tags

  enum :category, { variety: 0, age_class: 1, size_range: 2 }

  validates :name, :category, presence: true
end
