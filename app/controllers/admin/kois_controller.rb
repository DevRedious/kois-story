module Admin
  class KoisController < Admin::BaseController
    before_action :set_koi, only: [ :show, :edit, :update, :destroy ]

    def index
      @kois = Koi.includes(:images).order(created_at: :desc)
      @varieties = @kois.map(&:variety).compact_blank.uniq.sort
    end

    def show; end

    def new
      @koi = Koi.new
    end

    def create
      @koi = Koi.new(koi_params)
      @koi.user = current_user

      if persist_koi_with_images(@koi)
        redirect_to admin_kois_path, notice: "Koi created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit; end

    def update
      @koi.assign_attributes(koi_params)

      if persist_koi_with_images(@koi)
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

    def persist_koi_with_images(koi)
      ActiveRecord::Base.transaction do
        koi.save!
        attach_uploaded_images!(koi)
      end
      true
    rescue ActiveRecord::RecordInvalid
      false
    end

    def attach_uploaded_images!(koi)
      return unless params.dig(:koi, :uploaded_images).present?

      base_position = koi.images.count
      params[:koi][:uploaded_images].reject(&:blank?).each_with_index do |uploaded_image, index|
        koi.images.create!(url: uploaded_image, position: base_position + index)
      end
    end
  end
end
