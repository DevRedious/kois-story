class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  helper_method :contact_verification_required?

  private

  def contact_verification_required?
    !(respond_to?(:user_signed_in?, true) && user_signed_in?)
  end
end
