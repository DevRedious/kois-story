require "test_helper"

class MessageTest < ActiveSupport::TestCase
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
end
