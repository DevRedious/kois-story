module Admin::KoisHelper
  def admin_koi_image_source(koi)
    first_image = koi.images.order(:position).first
    resolved_image_source(first_image)
  end

  def admin_koi_status_label(koi)
    case koi.status
    when "available"
      "Disponible"
    when "incoming"
      "Arrivage"
    when "sold_out"
      "Vendu"
    else
      "Brouillon"
    end
  end

  def admin_koi_status_badge_class(koi)
    case koi.status
    when "available"
      "badge-dispo"
    when "incoming"
      "badge-arrivage"
    when "sold_out"
      "badge-vendu"
    else
      "badge-rupture"
    end
  end

  def admin_koi_lineage_value(koi)
    koi.konishi_lineage? ? "konishi" : "standard"
  end

  def admin_koi_age_label(koi)
    koi.age_class.present? ? koi.age_class.humanize : "Non renseigne"
  end

  def variety_options
    [
      "Aragoke", "Asagi", "Benigoi", "Chagoi", "GinrinShowa", "Golden Korn",
      "Goromo", "Goshiki", "Hariwake", "Karashigoi", "Kikokuryu", "Kohaku",
      "Kujaku", "Kumonryu", "Matsubakawabate", "Ochiba", "Sanke", "ShiroUtsuri",
      "Showa", "Soragoi", "Sushui", "Tancho", "TanchoKohaku", "Utsuri",
      "Yamabuki", "Yellow Monkey"
    ]
  end

  def age_class_options
    [
      [ "Tosai (1 an)", "tosai" ],
      [ "Jumbo Tosai (1 an, grande taille)", "jumbo_tosai" ],
      [ "Nisai (2 ans)", "nisai" ],
      [ "Sansai (3 ans)", "sansai" ],
      [ "Yonsai (4 ans)", "yonsai" ],
      [ "Gosai (5 ans et +)", "gosai" ]
    ]
  end

  def sex_options
    [
      [ "Non determine", "unknown" ],
      [ "Male", "male" ],
      [ "Femelle", "female" ]
    ]
  end

  def status_options
    [
      [ "Disponible a la vente", "available" ],
      [ "Arrivage prochain", "incoming" ],
      [ "Vendu", "sold_out" ]
    ]
  end
end
