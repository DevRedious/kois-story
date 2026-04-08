class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if spam_submission?
      redirect_to root_path(anchor: "contact"), notice: success_notice
    elsif contact_verification_failed?
      redirect_to root_path(anchor: "contact"), alert: "Veuillez confirmer que vous êtes bien un humain avant d'envoyer votre message."
    elsif @message.save
      redirect_to root_path(anchor: "contact"), notice: success_notice
    else
      redirect_to root_path(anchor: "contact"), alert: "Veuillez remplir tous les champs avant d'envoyer votre message."
    end
  end

  private

  def contact_verification_failed?
    contact_verification_required? && params[:contact_human_check] != "1"
  end

  def message_params
    params.require(:message).permit(:sender_name, :sender_email, :body)
  end

  def spam_submission?
    params[:contact_website].present?
  end

  def success_notice
    "Votre message a bien ete envoye. Nous vous repondrons dans les plus brefs delais."
  end
end
