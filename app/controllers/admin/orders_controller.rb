module Admin
  class OrdersController < Admin::BaseController
    before_action :set_order, only: [ :show, :edit, :update ]

    def index
      @orders = Order.includes(client_profile: :user, order_items: [ :koi, :product ]).order(created_at: :desc)
    end

    def show
      @payments = @order.payments.order(created_at: :desc)
      @items = @order.order_items.includes(:koi, :product)
    end

    def edit; end

    def update
      if @order.update(order_params)
        redirect_to admin_order_path(@order), notice: "Commande mise a jour."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_order
      @order = Order.includes(client_profile: :user, order_items: [ :koi, :product ], payments: []).find(params[:id])
    end

    def order_params
      params.require(:order).permit(:status, :notes)
    end
  end
end
