class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  helper_method :contact_verification_required?, :public_site_url

  private

  def contact_verification_required?
    !(respond_to?(:user_signed_in?, true) && user_signed_in?)
  end

  def public_site_url(path = "/")
    base_url = ENV["PUBLIC_SITE_URL"].presence
    return root_path unless base_url

    normalized_path = path.to_s.start_with?("/") ? path.to_s : "/#{path}"
    "#{base_url.chomp('/')}#{normalized_path}"
  end
end
