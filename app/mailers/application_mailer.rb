class ApplicationMailer < ActionMailer::Base
  default from: -> { ENV.fetch("MAILER_FROM", "Koi's Story <no-reply@kois-story.fr>") }
  layout "mailer"

  private

  def admin_recipient
    ENV["ADMIN_EMAIL"].presence
  end
end
