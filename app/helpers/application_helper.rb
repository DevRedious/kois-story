module ApplicationHelper
  def docs_asset_path(filename)
    "/docs/assets/#{ERB::Util.url_encode(filename)}"
  end

  def resolved_image_source(image)
    return unless image&.url.present?

    raw = image[:url].to_s
    return raw if raw.start_with?("http://", "https://", "/")

    image.url.url.presence
  rescue StandardError
    nil
  end

  def whatsapp_link(phone, message)
    return "#" if phone.blank?

    "https://wa.me/#{phone}?text=#{ERB::Util.url_encode(message)}"
  end

  def whatsapp_phone_number
    ENV["WHATSAPP_PHONE"].presence
  end

  def customer_contact_email
    ENV.fetch("CONTACT_EMAIL", "contact@kois-story.com")
  end

  def whatsapp_icon(size: 24, extra_classes: nil)
    classes = [ "icon-wa", "icon-wa--#{size}", extra_classes ].compact.join(" ")
    content_tag(:span, class: classes, aria: { hidden: true }) do
      image_tag docs_asset_path("icon-whatsapps.svg"), alt: "", class: "icon-wa__img"
    end
  end

  def turnstile_enabled?
    ENV["TURNSTILE_SITE_KEY"].present? && ENV["TURNSTILE_SECRET_KEY"].present?
  end

  def turnstile_site_key
    ENV["TURNSTILE_SITE_KEY"].presence
  end

  AGE_CLASS_LABELS = {
    "tosai" => "Tosai",
    "jumbo_tosai_femelle" => "Jumbo Tosai femelle",
    "jumbo_tosai_hq" => "Jumbo Tosai HQ",
    "nisai" => "Nisai",
    "sansai" => "Sansai",
    "yonsai" => "Yonsai",
    "gosai" => "Gosai"
  }.freeze

  def age_class_label(age_class)
    return "" if age_class.blank?

    AGE_CLASS_LABELS[age_class.to_s] || age_class.to_s.tr("_", " ").humanize
  end

  def age_class_options
    AGE_CLASS_LABELS.map { |value, label| [ label, value ] }
  end

  def contact_form_value(field)
    flash.to_hash.fetch("contact_form", {}).fetch(field.to_s, "")
  end
end
