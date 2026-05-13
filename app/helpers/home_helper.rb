module HomeHelper
  def koi_image_source(koi)
    first_image = koi.images.order(:position).first
    resolved_image_source(first_image)
  end

  def showcase_meta(koi)
    parts = [ koi.variety, koi.size_cm.present? ? "#{koi.size_cm} cm" : nil, age_class_label(koi.age_class) ]
    parts.compact.join(" · ")
  end

  def showcase_price(koi)
    number_to_currency(koi.price, unit: "", precision: 0, delimiter: " ").strip
  end
end
