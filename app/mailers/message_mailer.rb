class MessageMailer < ApplicationMailer
  def new_message(message)
    @message = message
    mail(to: admin_recipient, subject: "[Koi's Story] New message from #{message.sender_name}")
  end
end
