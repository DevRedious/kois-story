module ApplicationHelper
  def docs_asset_path(filename)
    "/docs/assets/#{ERB::Util.url_encode(filename)}"
  end

  def whatsapp_link(phone, message)
    "https://wa.me/#{phone}?text=#{ERB::Util.url_encode(message)}"
  end

  def whatsapp_icon(size: 24, extra_classes: nil)
    classes = [ "icon-wa", "icon-wa--#{size}", extra_classes ].compact.join(" ")
    content_tag(:span, class: classes, aria: { hidden: true }) do
      image_tag docs_asset_path("icon-whatsapps.svg"), alt: "", class: "icon-wa__img"
    end
  end
end
