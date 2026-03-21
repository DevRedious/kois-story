class Koi < ApplicationRecord
  belongs_to :user
  has_many :koi_tags, dependent: :destroy
  has_many :tags, through: :koi_tags
  has_many :images, as: :imageable, dependent: :destroy

  enum :status, { available: 0, sold_out: 1, incoming: 2 }
  enum :sex, { unknown: 0, male: 1, female: 2 }
  enum :age_class, { tosai: 0, jumbo_tosai: 1, nisai: 2, sansai: 3, yonsai: 4, gosai: 5 }

  validates :name, :variety, :price, :status, presence: true
  validates :price, numericality: { greater_than: 0 }

  scope :konishi, -> { where(konishi_lineage: true) }
  scope :with_images, -> { joins(:images).where(images: { imageable_type: name }).distinct }

  def self.filter(params)
    kois = with_images
    kois = kois.where(variety: params[:variety]) if params[:variety].present?
    kois = kois.where(age_class: params[:age_class]) if params[:age_class].present?
    kois = kois.where(sex: params[:sex]) if params[:sex].present?
    kois = kois.where("size_cm <= ?", params[:max_size]) if params[:max_size].present?
    kois = kois.where("price <= ?", params[:max_price]) if params[:max_price].present?
    kois = kois.where(status: :available) if params[:available].present?
    kois
  end
end
