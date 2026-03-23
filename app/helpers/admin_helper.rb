module AdminHelper
  def admin_current_page
    case controller_path
    when "admin/dashboard"
      :dashboard
    when "admin/kois"
      :kois
    when "admin/messages"
      :messages
    when "admin/products"
      :products
    when "admin/orders"
      :orders
    when "admin/payments"
      :payments
    when "admin/clients"
      :clients
    when "admin/newsletter"
      :newsletter
    else
      :dashboard
    end
  end

  def admin_page_title
    case admin_current_page
    when :dashboard
      "Tableau de bord"
    when :kois
      action_name.in?(%w[ new create edit update ]) ? "Edition des kois" : "Gestion des kois"
    when :messages
      action_name == "show" ? "Message client" : "Messages"
    when :products
      action_name.in?(%w[ new create edit update ]) ? "Catalogue produits" : "Materiels & produits"
    when :orders
      action_name.in?(%w[ edit update ]) ? "Edition commande" : (action_name == "show" ? "Detail commande" : "Commandes")
    when :payments
      action_name.in?(%w[ edit update ]) ? "Edition paiement" : (action_name == "show" ? "Detail paiement" : "Paiements")
    when :clients
      action_name.in?(%w[ edit update ]) ? "Edition client" : (action_name == "show" ? "Fiche client" : "Clients")
    when :newsletter
      "Newsletter"
    else
      "Administration"
    end
  end

  def admin_breadcrumb_items
    items = [ { label: "Admin", url: admin_root_path } ]
    case admin_current_page
    when :dashboard
      items
    when :kois
      items << { label: "Kois", url: admin_kois_path }
      items << { label: action_name == "new" ? "Nouveau" : "Edition", url: nil } if action_name.in?(%w[ new edit ])
      items << { label: @koi.name, url: nil } if action_name == "show" && defined?(@koi) && @koi.present?
    when :messages
      items << { label: "Messages", url: admin_messages_path }
      items << { label: @message.sender_name, url: nil } if action_name == "show" && defined?(@message) && @message.present?
    when :products
      items << { label: "Produits", url: admin_products_path }
      items << { label: action_name == "new" ? "Nouveau" : "Edition", url: nil } if action_name.in?(%w[ new edit ])
      items << { label: @product.name, url: nil } if action_name == "show" && defined?(@product) && @product.present?
    when :orders
      items << { label: "Commandes", url: admin_orders_path }
      items << { label: "Edition", url: nil } if action_name == "edit"
      items << { label: "Commande ##{@order.id}", url: nil } if action_name == "show" && defined?(@order) && @order.present?
    when :payments
      items << { label: "Paiements", url: admin_payments_path }
      items << { label: "Edition", url: nil } if action_name == "edit"
      items << { label: "Paiement ##{@payment.id}", url: nil } if action_name == "show" && defined?(@payment) && @payment.present?
    when :clients
      items << { label: "Clients", url: admin_clients_path }
      items << { label: "Edition", url: nil } if action_name == "edit"
      items << { label: @client.name, url: nil } if action_name == "show" && defined?(@client) && @client.present?
    when :newsletter
      items << { label: "Newsletter", url: nil }
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
