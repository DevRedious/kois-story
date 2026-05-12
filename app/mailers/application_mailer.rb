class ApplicationMailer < ActionMailer::Base
  default from: -> { ENV.fetch("MAILER_FROM", "Koi's Story <no-reply@kois-story.fr>") }
  layout "mailer"
  helper_method :app_base_url, :docs_asset_url, :public_asset_url

  def app_base_url
    host = ENV.fetch("APP_HOST", "").strip
    return "" if host.blank?
    return host if host.start_with?("http://", "https://")

    scheme = ENV["FORCE_SSL"] == "true" ? "https" : "http"
    "#{scheme}://#{host}"
  end

  def docs_asset_url(filename)
    return "" if app_base_url.blank?

    "#{app_base_url}/docs/assets/#{ERB::Util.url_encode(filename)}"
  end

  def public_asset_url(filename)
    return "" if app_base_url.blank?

    "#{app_base_url}/#{ERB::Util.url_encode(filename)}"
  end

  private

  def admin_recipient
    ENV["ADMIN_EMAIL"].presence
  end
end
