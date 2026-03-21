module Admin::MessagesHelper
  def admin_message_row_class(message)
    message.read? ? "msg-row" : "msg-row unread"
  end

  def admin_message_status_badge_class(message)
    message.read? ? "badge-lu" : "badge-nonlu"
  end

  def admin_message_status_label(message)
    message.read? ? "Lu" : "Non lu"
  end

  def admin_message_preview(message, length: 90)
    truncate(message.body, length:)
  end

  def admin_message_datetime(message)
    l(message.created_at, format: :short)
  rescue I18n::ArgumentError
    message.created_at.strftime("%d/%m/%Y")
  end

  def admin_message_time(message)
    message.created_at.strftime("%H:%M")
  end
end
