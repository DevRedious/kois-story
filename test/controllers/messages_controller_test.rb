require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  test "should create message" do
    assert_difference("Message.count", 1) do
      post messages_url, params: {
        message: { sender_name: "Test", sender_email: "test@example.com", body: "Hello" }
      }
    end
    assert_redirected_to root_url
  end
end
