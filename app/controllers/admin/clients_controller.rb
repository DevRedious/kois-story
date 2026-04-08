module Admin
  class ClientsController < Admin::BaseController
    before_action :set_client, only: [ :show, :edit, :update ]

    def index
      scope = filtered_clients
      @clients, @pagination = paginate_scope(scope, per_page: 12)
    end

    def show
      @orders = @client.orders.includes(:payments, order_items: [ :koi, :product ]).order(created_at: :desc)
    end

    def edit; end

    def update
      if @client.update(client_params)
        redirect_to admin_client_path(@client), notice: "Fiche client mise a jour."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_client
      @client = ClientProfile.includes(:user, :orders).find(params[:id])
    end

    def client_params
      params.require(:client_profile).permit(:name, :phone, :address, :notes)
    end

    def filtered_clients
      scope = ClientProfile.includes(:user, :orders).order(created_at: :desc)
      scope = scope.joins(:orders).distinct if params[:has_orders] == "1"
      return scope if params[:q].blank?

      query = "%#{params[:q].strip.downcase}%"
      scope.left_joins(:user).where(
        "LOWER(client_profiles.name) LIKE :query OR LOWER(client_profiles.phone) LIKE :query OR LOWER(client_profiles.address) LIKE :query OR LOWER(users.email) LIKE :query",
        query:
      )
    end
  end
end
