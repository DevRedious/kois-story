module Admin
  class MessagesController < Admin::BaseController
    def index
      scope = filtered_messages
      @messages, @pagination = paginate_scope(scope, per_page: 12)
      @message_metrics = {
        unread: Message.where(read: false).count,
        read: Message.where(read: true, processed_at: nil).count,
        processed: Message.processed.count
      }
    end

    def show
      @message = Message.find(params[:id])
    end

    def update
      @message = Message.find(params[:id])
      case params[:status]
      when "processed"
        @message.mark_as_processed!
        notice = "Message marque comme traite."
      when "unread"
        @message.mark_as_unread!
        notice = "Message reinitialise en nouveau."
      else
        @message.mark_as_read!
        notice = "Message marque comme lu."
      end

      redirect_to after_update_path, notice: notice
    end

    private

    def after_update_path
      params[:redirect_to] == "show" ? admin_message_path(@message) : admin_messages_path
    end

    def filtered_messages
      scope = Message.order(created_at: :desc)
      scope = case params[:status]
      when "unread" then scope.where(read: false)
      when "read" then scope.where(read: true, processed_at: nil)
      when "processed" then scope.processed
      else scope
      end
      return scope if params[:q].blank?

      query = "%#{params[:q].strip.downcase}%"
      scope.where("LOWER(sender_name) LIKE :query OR LOWER(sender_email) LIKE :query OR LOWER(body) LIKE :query", query:)
    end
  end
end
