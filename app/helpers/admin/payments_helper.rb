module Admin::PaymentsHelper
  def admin_payment_status_badge_class(payment)
    case payment.status
    when "paid"
      "badge-dispo"
    when "partial"
      "badge-arrivage"
    else
      "badge-nonlu"
    end
  end

  def admin_payment_status_label(payment)
    payment.status&.humanize || "En attente"
  end

  def admin_payment_type_label(payment)
    payment.payment_type&.humanize || "Non defini"
  end
end
