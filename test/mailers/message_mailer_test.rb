require "test_helper"

class MessageMailerTest < ActionMailer::TestCase
  test "new_message builds the expected email" do
    original_admin_email = ENV["ADMIN_EMAIL"]
    original_mailer_from = ENV["MAILER_FROM"]
    original_app_host = ENV["APP_HOST"]
    original_force_ssl = ENV["FORCE_SSL"]
    ENV["ADMIN_EMAIL"] = "admin@example.com"
    ENV["MAILER_FROM"] = "no-reply@redious.fr"
    ENV["APP_HOST"] = "kois-story.test"
    ENV["FORCE_SSL"] = "true"

    mail = MessageMailer.new_message(messages(:one))

    assert_equal [ "admin@example.com" ], mail.to
    assert_equal [ "no-reply@redious.fr" ], mail.from
    assert_equal [ messages(:one).sender_email ], mail.reply_to
    assert_match "Nouveau message de Alice - KS-", mail.subject
    assert_includes mail.text_part.body.to_s, messages(:one).contact_reference
    assert_includes mail.html_part.body.to_s, "Koi's Story"
    assert_includes mail.html_part.body.to_s, "Répondre au client"
    assert_includes mail.html_part.body.to_s, ERB::Util.url_encode(messages(:one).reply_subject)
  ensure
    ENV["ADMIN_EMAIL"] = original_admin_email
    ENV["MAILER_FROM"] = original_mailer_from
    ENV["APP_HOST"] = original_app_host
    ENV["FORCE_SSL"] = original_force_ssl
  end

  test "acknowledgement builds a visitor confirmation email" do
    original_admin_email = ENV["ADMIN_EMAIL"]
    original_mailer_from = ENV["MAILER_FROM"]
    original_app_host = ENV["APP_HOST"]
    original_force_ssl = ENV["FORCE_SSL"]
    ENV["ADMIN_EMAIL"] = "admin@example.com"
    ENV["MAILER_FROM"] = "no-reply@redious.fr"
    ENV["APP_HOST"] = "kois-story.test"
    ENV["FORCE_SSL"] = "true"

    mail = MessageMailer.acknowledgement(messages(:one))

    assert_equal [ messages(:one).sender_email ], mail.to
    assert_equal [ "no-reply@redious.fr" ], mail.from
    assert_equal [ "admin@example.com" ], mail.reply_to
    assert_match messages(:one).contact_reference, mail.subject
    assert_match "spams", mail.text_part.body.to_s
    assert_includes mail.text_part.body.to_s, messages(:one).contact_reference
    assert_includes mail.html_part.body.to_s, "Koi's Story"
    assert_includes mail.html_part.body.to_s, "https://kois-story.test/logo_bg_circle_dark_v2.png"
  ensure
    ENV["ADMIN_EMAIL"] = original_admin_email
    ENV["MAILER_FROM"] = original_mailer_from
    ENV["APP_HOST"] = original_app_host
    ENV["FORCE_SSL"] = original_force_ssl
  end
end
