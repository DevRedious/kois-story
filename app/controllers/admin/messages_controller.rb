module Admin
  class MessagesController < Admin::BaseController
    def index
      scope = sorted_messages(filtered_messages)
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

    def bulk_update
      selected_messages = Message.where(id: params[:message_ids])
      return redirect_to(admin_messages_path(message_index_params), alert: "Selectionnez au moins un message.") if selected_messages.empty?

      notice = case params[:bulk_action]
      when "read"
        selected_messages.update_all(read: true, updated_at: Time.current)
        "#{selected_messages.size} message(s) marques comme lus."
      when "processed"
        selected_messages.update_all(read: true, processed_at: Time.current, updated_at: Time.current)
        "#{selected_messages.size} message(s) marques comme traites."
      when "unread"
        selected_messages.update_all(read: false, processed_at: nil, updated_at: Time.current)
        "#{selected_messages.size} message(s) reinitialises."
      else
        return redirect_to(admin_messages_path(message_index_params), alert: "Choisissez une action groupée valide.")
      end

      redirect_to admin_messages_path(message_index_params), notice:
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

    def sorted_messages(scope)
      direction = params[:direction] == "asc" ? :asc : :desc
      case params[:sort]
      when "sender_name" then scope.order(sender_name: direction)
      when "sender_email" then scope.order(sender_email: direction)
      else scope.order(created_at: direction)
      end
    end

    def message_index_params
      params.permit(:q, :status, :sort, :direction, :page).to_h
    end
  end
end
