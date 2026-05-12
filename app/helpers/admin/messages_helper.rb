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

  def admin_message_follow_up(message)
    return "Traite le #{l(message.processed_at, format: :short)}" if message.processed_at.present?
    return "Lu, en attente de reponse" if message.read?

    "Action rapide conseillee"
  rescue I18n::ArgumentError
    return "Traite le #{message.processed_at.strftime('%d/%m/%Y %H:%M')}" if message.processed_at.present?

    message.read? ? "Lu, en attente de reponse" : "Action rapide conseillee"
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
