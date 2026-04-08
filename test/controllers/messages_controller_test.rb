require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  test "should create message" do
    assert_difference("Message.count", 1) do
      post messages_url, params: {
        message: { sender_name: "Test", sender_email: "test@example.com", body: "Hello" },
        contact_human_check: "1"
      }
    end
    assert_redirected_to root_url(anchor: "contact")
  end

  test "should not create invalid message" do
    assert_no_difference("Message.count") do
      post messages_url, params: {
        message: { sender_name: "", sender_email: "invalid", body: "" },
        contact_human_check: "1"
      }
    end

    assert_redirected_to root_url(anchor: "contact")
  end

  test "should not create message without human verification" do
    assert_no_difference("Message.count") do
      post messages_url, params: {
        message: { sender_name: "Test", sender_email: "test@example.com", body: "Hello" }
      }
    end

    assert_redirected_to root_url(anchor: "contact")
  end

  test "should ignore honeypot spam submission" do
    assert_no_difference("Message.count") do
      post messages_url, params: {
        message: { sender_name: "Bot", sender_email: "bot@example.com", body: "Spam" },
        contact_human_check: "1",
        contact_website: "https://spam.example"
      }
    end

    assert_redirected_to root_url(anchor: "contact")
  end
end
