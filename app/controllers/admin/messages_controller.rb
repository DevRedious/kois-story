module Admin
  class MessagesController < Admin::BaseController
    def index
      @messages = Message.order(created_at: :desc)
    end

    def show
      @message = Message.find(params[:id])
      @message.mark_as_read!
    end

    def update
      @message = Message.find(params[:id])
      @message.mark_as_read!
      redirect_to admin_messages_path, notice: "Message marked as read."
    end
  end
end
