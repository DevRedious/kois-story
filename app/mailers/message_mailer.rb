class MessageMailer < ApplicationMailer
  default to: -> { ENV["ADMIN_EMAIL"] },
          from: "Koi's Story <contact.koistory@gmail.com>"

  def new_message(message)
    @message = message
    mail(subject: "[Koi's Story] New message from #{message.sender_name}")
  end
end
