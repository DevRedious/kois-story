module Admin
  class OrdersController < Admin::BaseController
    before_action :set_order, only: [ :show, :edit, :update ]

    def index
      scope = sorted_orders(filtered_orders)
      @orders, @pagination = paginate_scope(scope, per_page: 12)
    end

    def show
      @payments = @order.payments.order(created_at: :desc)
      @items = @order.order_items.includes(:koi, :product)
    end

    def bulk_update
      selected_orders = Order.where(id: params[:order_ids])
      return redirect_to(admin_orders_path(order_index_params), alert: "Selectionnez au moins une commande.") if selected_orders.empty?

      status = {
        "pending" => :pending,
        "confirmed" => :confirmed,
        "completed" => :completed,
        "cancelled" => :cancelled
      }[params[:bulk_action]]
      return redirect_to(admin_orders_path(order_index_params), alert: "Choisissez une action groupée valide.") unless status

      selected_orders.update_all(status: Order.statuses.fetch(status), updated_at: Time.current)
      redirect_to admin_orders_path(order_index_params), notice: "#{selected_orders.size} commande(s) mises a jour."
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

    def sorted_orders(scope)
      direction = params[:direction] == "asc" ? :asc : :desc
      case params[:sort]
      when "client" then scope.left_joins(client_profile: :user).order("client_profiles.name #{direction}, users.email #{direction}")
      when "total_amount" then scope.order(total_amount: direction)
      when "status" then scope.order(status: direction, created_at: :desc)
      else scope.order(created_at: direction)
      end
    end

    def order_index_params
      params.permit(:q, :status, :sort, :direction, :page).to_h
    end
  end
end
