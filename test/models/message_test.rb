require "test_helper"

class MessageTest < ActiveSupport::TestCase
  test "requires valid sender email" do
    message = Message.new(sender_name: "A", sender_email: "invalid", body: "Hi")
    assert_not message.valid?
  end
end
