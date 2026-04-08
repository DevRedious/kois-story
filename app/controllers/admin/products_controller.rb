module Admin
  class ProductsController < Admin::BaseController
    before_action :set_product, only: [ :show, :edit, :update, :destroy ]

    def index
      @products, @pagination = paginate_scope(Product.order(created_at: :desc), per_page: 12)
    end

    def show; end

    def new
      @product = Product.new(status: :active)
    end

    def create
      @product = Product.new(product_params)

      if @product.save
        redirect_to admin_products_path, notice: "Product created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit; end

    def update
      if @product.update(product_params)
        redirect_to admin_products_path, notice: "Product updated successfully."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @product.destroy
      redirect_to admin_products_path, notice: "Product deleted."
    rescue ActiveRecord::InvalidForeignKey
      redirect_to admin_products_path, alert: "This product is linked to an order and cannot be deleted."
    end

    private

    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(
        :name, :reference, :description, :price, :stock_quantity, :category, :status
      )
    end
  end
end
