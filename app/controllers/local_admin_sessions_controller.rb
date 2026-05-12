class LocalAdminSessionsController < ApplicationController
  LOCAL_ADMIN_EMAIL = "admin.local@kois-story.test"
  LOCAL_ADMIN_PASSWORD = "KoisStoryAdminLocal!2026"

  def create
    return head :not_found unless Rails.env.development?

    user = local_admin_user
    sign_in(:user, user)
    redirect_to admin_root_path, notice: "Acces admin local active."
  end

  private

  def local_admin_user
    User.find_or_initialize_by(email: local_admin_email).tap do |user|
      user.assign_attributes(
        role: :admin,
        password: local_admin_password,
        password_confirmation: local_admin_password,
        otp_required_for_login: false
      )
      user.otp_secret = nil if user.respond_to?(:otp_secret=)
      user.save!
    end
  end

  def local_admin_email
    ENV.fetch("LOCAL_ADMIN_EMAIL", LOCAL_ADMIN_EMAIL)
  end

  def local_admin_password
    ENV.fetch("LOCAL_ADMIN_PASSWORD", LOCAL_ADMIN_PASSWORD)
  end
end
