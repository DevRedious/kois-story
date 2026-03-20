module HomeHelper
  SHOWCASE_FALLBACKS = [
    "24148-Sakura-Grand-Voile-Suda-600x800.jpg",
    "butterfly-tancho-kujaku.jpg",
    "carpe-koi-showa-scaled.jpg"
  ].freeze

  def koi_image_source(koi, index = 0)
    first_image = koi.images.order(:position).first
    return first_image.url.url if first_image&.url.present?

    docs_asset_path(SHOWCASE_FALLBACKS[index % SHOWCASE_FALLBACKS.size])
  end

  def showcase_meta(koi)
    parts = [koi.variety, koi.size_cm.present? ? "#{koi.size_cm} cm" : nil, koi.age_class&.humanize]
    parts.compact.join(" · ")
  end

  def showcase_price(koi)
    number_to_currency(koi.price, unit: "", precision: 0, delimiter: " ").strip
  end
end
