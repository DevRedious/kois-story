module Admin
  class DashboardController < Admin::BaseController
    def index
      @available_kois_count = Koi.where.not(status: "sold_out").count
      @sold_kois_count = Koi.where(status: "sold_out").count
      @messages_count = Message.count
      @unread_messages_count = Message.unread.count
      @recent_messages = Message.order(created_at: :desc).limit(5)
      @recent_kois = Koi.order(created_at: :desc).limit(4)
    end
  end
end
