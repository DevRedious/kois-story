module AdminHelper
  def admin_current_page
    case controller_path
    when "admin/dashboard"
      :dashboard
    when "admin/kois"
      :kois
    when "admin/messages"
      :messages
    else
      :dashboard
    end
  end

  def admin_page_title
    case admin_current_page
    when :dashboard
      "Tableau de bord"
    when :kois
      action_name.in?(%w[new create edit update]) ? "Edition des kois" : "Gestion des kois"
    when :messages
      action_name == "show" ? "Message client" : "Messages"
    else
      "Administration"
    end
  end

  def admin_breadcrumb_items
    items = [{ label: "Admin", url: admin_root_path }]
    case admin_current_page
    when :dashboard
      items
    when :kois
      items << { label: "Kois", url: admin_kois_path }
      items << { label: action_name == "new" ? "Nouveau" : "Edition", url: nil } if action_name.in?(%w[new edit])
      items << { label: @koi.name, url: nil } if action_name == "show" && defined?(@koi) && @koi.present?
    when :messages
      items << { label: "Messages", url: admin_messages_path }
      items << { label: @message.sender_name, url: nil } if action_name == "show" && defined?(@message) && @message.present?
    end
    items
  end

  def admin_user_name
    return current_user.email if current_user.respond_to?(:email) && current_user.email.present?

    "Administrateur"
  end

  def admin_user_initials
    admin_user_name.split(/\s+/).first(2).map { |part| part[0] }.join.upcase
  end

  def admin_unread_messages_count
    @admin_unread_messages_count ||= Message.unread.count
  end
end
