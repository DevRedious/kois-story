class MessageMailer < ApplicationMailer
  def new_message(message)
    @message = message
    mail(
      to: admin_recipient,
      reply_to: message.sender_email,
      subject: "[Koi's Story] Nouveau message de #{message.sender_name} - #{message.contact_reference}"
    )
  end

  def acknowledgement(message)
    @message = message
    options = {
      to: message.sender_email,
      subject: "Votre message a bien ete recu - #{message.contact_reference} - Koi's Story"
    }
    options[:reply_to] = admin_recipient if admin_recipient.present?

    mail(options)
  end
end
