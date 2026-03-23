module Admin
  class PaymentsController < Admin::BaseController
    before_action :set_payment, only: [ :show, :edit, :update ]

    def index
      @payments = Payment.includes(order: :client_profile).order(created_at: :desc)
    end

    def show; end

    def edit; end

    def update
      if @payment.update(payment_params)
        redirect_to admin_payment_path(@payment), notice: "Paiement mis a jour."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_payment
      @payment = Payment.includes(order: :client_profile).find(params[:id])
    end

    def payment_params
      params.require(:payment).permit(:amount, :payment_type, :status, :due_at, :paid_at)
    end
  end
end
