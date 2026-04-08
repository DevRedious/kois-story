require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @original_turnstile_site_key = ENV["TURNSTILE_SITE_KEY"]
    @original_turnstile_secret_key = ENV["TURNSTILE_SECRET_KEY"]
    ENV.delete("TURNSTILE_SITE_KEY")
    ENV.delete("TURNSTILE_SECRET_KEY")
  end

  teardown do
    ENV["TURNSTILE_SITE_KEY"] = @original_turnstile_site_key
    ENV["TURNSTILE_SECRET_KEY"] = @original_turnstile_secret_key
  end

  def with_turnstile_result(result)
    original_verify = TurnstileVerifier.method(:verify)
    TurnstileVerifier.define_singleton_method(:verify) { |token:, remote_ip:| result }
    yield
  ensure
    TurnstileVerifier.define_singleton_method(:verify, original_verify)
  end

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

  test "should create message with turnstile verification" do
    ENV["TURNSTILE_SITE_KEY"] = "site-key"
    ENV["TURNSTILE_SECRET_KEY"] = "secret-key"

    with_turnstile_result(true) do
      assert_difference("Message.count", 1) do
        post messages_url, params: {
          message: { sender_name: "Turnstile", sender_email: "ok@example.com", body: "Hello" },
          "cf-turnstile-response" => "valid-token"
        }
      end
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

  test "should not create message with invalid turnstile token" do
    ENV["TURNSTILE_SITE_KEY"] = "site-key"
    ENV["TURNSTILE_SECRET_KEY"] = "secret-key"

    with_turnstile_result(false) do
      assert_no_difference("Message.count") do
        post messages_url, params: {
          message: { sender_name: "Test", sender_email: "test@example.com", body: "Hello" },
          "cf-turnstile-response" => "bad-token"
        }
      end
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
