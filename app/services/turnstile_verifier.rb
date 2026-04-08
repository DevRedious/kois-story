require "json"
require "net/http"

class TurnstileVerifier
  VERIFY_URI = URI("https://challenges.cloudflare.com/turnstile/v0/siteverify")

  def self.verify(token:, remote_ip:)
    secret = ENV["TURNSTILE_SECRET_KEY"].to_s
    return false if secret.blank? || token.blank?

    response = Net::HTTP.post_form(
      VERIFY_URI,
      {
        "secret" => secret,
        "response" => token,
        "remoteip" => remote_ip
      }
    )

    JSON.parse(response.body).fetch("success", false)
  rescue StandardError
    false
  end
end
