module Admin
  class BaseController < ApplicationController
    include Paginatable

    before_action :authenticate_user!
    before_action :require_admin!
    layout "admin"

    private

    def require_admin!
      return if current_user.admin?

      redirect_to public_site_url,
                  alert: "Access denied.",
                  allow_other_host: ENV["PUBLIC_SITE_URL"].present?
    end
  end
end
