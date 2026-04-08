module Admin
  class DashboardController < Admin::BaseController
    def index
      @available_kois_count = Koi.available.count
      @incoming_kois_count = Koi.incoming.count
      @sold_kois_count = Koi.sold_out.count
      @messages_count = Message.count
      @unread_messages_count = Message.unread.count
      @processed_messages_count = Message.processed.count
      @products_count = Product.count
      @orders_count = Order.count
      @pending_orders_count = Order.pending.count
      @confirmed_orders_count = Order.confirmed.count
      @completed_orders_count = Order.completed.count
      @payments_count = Payment.count
      @pending_payments_count = Payment.pending.count
      @partial_payments_count = Payment.partial.count
      @paid_payments_count = Payment.paid.count
      @overdue_payments_count = Payment.all.count(&:overdue?)
      @clients_count = ClientProfile.count
      @confirmed_revenue_amount = Order.where(status: [ :confirmed, :completed ]).sum(:total_amount)
      @recent_messages = Message.order(created_at: :desc).limit(5)
      @recent_orders = Order.includes(client_profile: :user, payments: []).order(created_at: :desc).limit(5)
      @recent_payments = Payment.includes(order: :client_profile).order(created_at: :desc).limit(5)
    end
  end
end
