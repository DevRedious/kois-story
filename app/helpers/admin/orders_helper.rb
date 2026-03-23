module Admin::OrdersHelper
  def admin_order_status_badge_class(order)
    case order.status
    when "completed"
      "badge-dispo"
    when "confirmed"
      "badge-arrivage"
    when "cancelled"
      "badge-rupture"
    else
      "badge-nonlu"
    end
  end

  def admin_order_status_label(order)
    order.status&.humanize || "En attente"
  end

  def admin_order_reference(order)
    "CMD-#{order.id.to_s.rjust(4, "0")}"
  end

  def admin_order_client_name(order)
    order.client_profile&.name.presence || order.client_profile&.user&.email || "Client inconnu"
  end

  def admin_order_item_label(item)
    item.koi&.name || item.product&.name || "Element supprime"
  end
end
