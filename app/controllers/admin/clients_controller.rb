module Admin
  class ClientsController < Admin::BaseController
    before_action :set_client, only: [ :show, :edit, :update ]

    def index
      scope = ClientProfile.includes(:user, :orders).order(created_at: :desc)
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
  end
end
