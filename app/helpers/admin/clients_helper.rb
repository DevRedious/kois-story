module Admin::ClientsHelper
  def admin_client_name(client)
    client.name.presence || client.user&.email || "Client"
  end

  def admin_client_orders_total(client)
    client.orders.sum(:total_amount)
  end
end
