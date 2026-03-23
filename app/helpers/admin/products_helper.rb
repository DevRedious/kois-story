module Admin::ProductsHelper
  def admin_product_category_label(product)
    product.category&.humanize || "Non classe"
  end

  def admin_product_status_badge_class(product)
    product.active? ? "badge-dispo" : "badge-rupture"
  end

  def admin_product_status_label(product)
    product.active? ? "Actif" : "Inactif"
  end
end
