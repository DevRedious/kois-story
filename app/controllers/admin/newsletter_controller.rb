module Admin
  class NewsletterController < Admin::BaseController
    def index
      @contacts = newsletter_contacts
      @emails_blob = @contacts.map { |contact| contact[:email] }.join(", ")
      @mailto_link = @emails_blob.present? ? "mailto:?bcc=#{ERB::Util.url_encode(@emails_blob)}" : nil
    end

    private

    def newsletter_contacts
      contacts = []
      client_contacts = ClientProfile.includes(:user).filter_map do |client|
        next unless client.user&.email.present?

        build_contact(client.user.email, client.name.presence || client.user.email, "Client")
      end
      message_contacts = Message.order(created_at: :desc).filter_map do |message|
        next unless message.sender_email.present?

        build_contact(message.sender_email, message.sender_name.presence || message.sender_email, "Message")
      end
      contacts.concat(client_contacts)
      contacts.concat(message_contacts)
      contacts.uniq { |contact| contact[:email].downcase }.sort_by { |contact| contact[:email] }
    end

    def build_contact(email, name, source)
      { email:, name:, source: }
    end
  end
end
