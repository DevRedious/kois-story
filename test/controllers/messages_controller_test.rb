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

  test "should not create invalid message" do
    assert_no_difference("Message.count") do
      post messages_url, params: {
        message: { sender_name: "", sender_email: "invalid", body: "" }
      }
    end

    assert_redirected_to root_url
  end
end
