require "test_helper"

class MessageTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  test "requires valid sender email" do
    message = Message.new(sender_name: "A", sender_email: "invalid", body: "Hi")
    assert_not message.valid?
  end

  test "requires sender name and body" do
    message = Message.new(sender_email: "valid@example.com")

    assert_not message.valid?
    assert_includes message.errors[:sender_name], "can't be blank"
    assert_includes message.errors[:body], "can't be blank"
  end

  test "mark_as_read updates read flag" do
    message = messages(:one)

    assert_not message.read?
    message.mark_as_read!

    assert message.reload.read?
  end

  test "mark_as_processed updates processed status" do
    message = messages(:one)

    message.mark_as_processed!

    assert_predicate message.reload, :read?
    assert_equal :processed, message.status
    assert_not_nil message.processed_at
  end

  test "mark_as_unread resets processed message" do
    message = messages(:one)
    message.mark_as_processed!

    message.mark_as_unread!

    assert_not message.reload.read?
    assert_nil message.processed_at
    assert_equal :unread, message.status
  end

  test "sends admin and visitor emails after creation" do
    original_admin_email = ENV["ADMIN_EMAIL"]
    ENV["ADMIN_EMAIL"] = "admin@example.com"

    assert_emails 2 do
      Message.create!(
        sender_name: "Camille",
        sender_email: "camille@example.com",
        body: "Bonjour"
      )
    end
  ensure
    ENV["ADMIN_EMAIL"] = original_admin_email
  end
end
