module Admin::NewsletterHelper
  def admin_newsletter_source_badge_class(contact)
    contact[:source] == "Client" ? "badge-dispo" : "badge-arrivage"
  end
end
