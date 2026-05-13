require "test_helper"

class ProductionMailerConfigTest < ActiveSupport::TestCase
  test "production smtp configuration uses Brevo env vars instead of Resend" do
    source = Rails.root.join("config/environments/production.rb").read

    assert_includes source, "smtp-relay.brevo.com"
    assert_includes source, 'ENV["SMTP_USERNAME"]'
    assert_includes source, 'ENV["SMTP_PASSWORD"]'
    refute_includes source, "smtp.resend.com"
    refute_includes source, "RESEND_API_KEY"
  end
end
