module KoisHelper
  def koi_card_image_source(koi)
    first_image = koi.images.order(:position).first
    resolved_image_source(first_image)
  end

  def koi_gallery_images(koi)
    koi.images.order(:position).filter_map { |image| resolved_image_source(image) }
  end

  def koi_meta(koi)
    [ koi.variety, koi.size_cm.present? ? "#{koi.size_cm} cm" : nil, koi.age_class&.humanize ].compact.join(" · ")
  end

  def koi_price(koi)
    number_to_currency(koi.price, unit: "", precision: 0, delimiter: " ").strip
  end

  def koi_status_label(koi)
    koi.status == "sold_out" ? "Vendu" : "Disponible"
  end

  def koi_whatsapp_link(koi)
    whatsapp_link("33600000000", "Bonjour, je suis intéressé(e) par #{koi.name} (#{koi_meta(koi)}).")
  end

  def koi_sex_label(koi)
    return "Inconnu" if koi.sex.blank? || koi.sex == "unknown"

    koi.sex == "female" ? "Femelle" : "Mâle"
  end
end
