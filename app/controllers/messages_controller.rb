class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to root_path, notice: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais."
    else
      redirect_to root_path, alert: "Veuillez remplir tous les champs avant d'envoyer votre message."
    end
  end

  private

  def message_params
    params.require(:message).permit(:sender_name, :sender_email, :body)
  end
end
