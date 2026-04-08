module Admin::MessagesHelper
  def admin_message_row_class(message)
    classes = [ "msg-row", "msg-row--#{message.status}" ]
    classes << "unread" if message.status == :unread
    classes.join(" ")
  end

  def admin_message_status_badge_class(message)
    {
      unread: "badge-nonlu",
      read: "badge-lu",
      processed: "badge-traite"
    }.fetch(message.status)
  end

  def admin_message_status_label(message)
    {
      unread: "Nouveau",
      read: "Lu",
      processed: "Traite"
    }.fetch(message.status)
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

  def admin_message_status_options
    [
      [ "Tous les messages", "" ],
      [ "Nouveaux", "unread" ],
      [ "Lus", "read" ],
      [ "Traites", "processed" ]
    ]
  end
end
