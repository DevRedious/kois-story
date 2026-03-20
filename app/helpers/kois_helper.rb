module KoisHelper
  KOI_FALLBACKS = [
    "carpe-koi-showa-scaled-hero.jpg",
    "24148-Sakura-Grand-Voile-Suda-600x800.jpg",
    "butterfly-tancho-kujaku.jpg",
    "carpe-koi-showa-scaled.jpg"
  ].freeze

  def koi_card_image_source(koi, index = 0)
    uploaded = koi.images.first&.url
    return uploaded.url if uploaded.present?

    docs_asset_path(KOI_FALLBACKS[index % KOI_FALLBACKS.size])
  end

  def koi_gallery_images(koi)
    uploaded = koi.images.sort_by { |image| image.position || 999 }.filter_map { |image| image.url.url if image.url.present? }
    return uploaded if uploaded.any?

    KOI_FALLBACKS.first(3).map { |filename| docs_asset_path(filename) }
  end

  def koi_meta(koi)
    [koi.variety, koi.size_cm.present? ? "#{koi.size_cm} cm" : nil, koi.age_class&.humanize].compact.join(" · ")
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
