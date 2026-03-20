class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to root_path, notice: "Your message has been sent."
    else
      redirect_to root_path, alert: "Please fill in all fields."
    end
  end

  private

  def message_params
    params.require(:message).permit(:sender_name, :sender_email, :body)
  end
end
