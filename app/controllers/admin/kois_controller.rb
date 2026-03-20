module Admin
  class KoisController < Admin::BaseController
    before_action :set_koi, only: [ :show, :edit, :update, :destroy ]

    def index
      @kois = Koi.includes(:images).order(created_at: :desc)
    end

    def show; end

    def new
      @koi = Koi.new
    end

    def create
      @koi = Koi.new(koi_params)
      @koi.user = current_user
      if @koi.save
        redirect_to admin_kois_path, notice: "Koi created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit; end

    def update
      if @koi.update(koi_params)
        redirect_to admin_kois_path, notice: "Koi updated successfully."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @koi.destroy
      redirect_to admin_kois_path, notice: "Koi deleted."
    end

    private

    def set_koi
      @koi = Koi.find(params[:id])
    end

    def koi_params
      params.require(:koi).permit(
        :name, :variety, :age_class, :age, :sex,
        :size_cm, :price, :status, :konishi_lineage, :description
      )
    end
  end
end
