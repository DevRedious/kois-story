module Admin::PaymentsHelper
  def admin_payment_status_badge_class(payment)
    return "badge-rupture" if payment.overdue?

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
    return "En retard" if payment.overdue?

    payment.status&.humanize || "En attente"
  end

  def admin_payment_type_label(payment)
    payment.payment_type&.humanize || "Non defini"
  end

  def admin_payment_due_label(payment)
    return "Sans echeance" if payment.due_at.blank?

    prefix = payment.overdue? ? "En retard depuis" : "Echeance"
    "#{prefix} #{l(payment.due_at.to_date)}"
  end
end
