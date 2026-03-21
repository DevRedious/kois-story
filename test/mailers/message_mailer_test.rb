require "test_helper"

class MessageMailerTest < ActionMailer::TestCase
  test "new_message builds the expected email" do
    original_admin_email = ENV["ADMIN_EMAIL"]
    original_mailer_from = ENV["MAILER_FROM"]
    ENV["ADMIN_EMAIL"] = "admin@example.com"
    ENV["MAILER_FROM"] = "Koi's Story <contact@kois-story.fr>"

    mail = MessageMailer.new_message(messages(:one))

    assert_equal [ "admin@example.com" ], mail.to
    assert_equal [ "contact@kois-story.fr" ], mail.from
    assert_match "Alice", mail.subject
  ensure
    ENV["ADMIN_EMAIL"] = original_admin_email
    ENV["MAILER_FROM"] = original_mailer_from
  end
end
