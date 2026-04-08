module Admin
  class OrdersController < Admin::BaseController
    before_action :set_order, only: [ :show, :edit, :update ]

    def index
      scope = filtered_orders
      @orders, @pagination = paginate_scope(scope, per_page: 12)
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

    def filtered_orders
      scope = Order.includes(client_profile: :user, order_items: [ :koi, :product ]).order(created_at: :desc)
      scope = scope.where(status: params[:status]) if params[:status].present?
      return scope if params[:q].blank?

      query = "%#{params[:q].strip.downcase}%"
      scope.left_joins(client_profile: :user).where(
        "CAST(orders.id AS TEXT) LIKE :query OR LOWER(client_profiles.name) LIKE :query OR LOWER(users.email) LIKE :query OR LOWER(orders.notes) LIKE :query",
        query:
      ).distinct
    end
  end
end
