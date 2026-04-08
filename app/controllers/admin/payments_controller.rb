module Admin
  class PaymentsController < Admin::BaseController
    before_action :set_payment, only: [ :show, :edit, :update ]

    def index
      scope = filtered_payments
      @payments, @pagination = paginate_scope(scope, per_page: 12)
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

    def filtered_payments
      scope = Payment.includes(order: :client_profile).order(created_at: :desc)
      scope = scope.where(status: params[:status]) if params[:status].present?
      scope = scope.where(payment_type: params[:payment_type]) if params[:payment_type].present?
      scope = scope.select { |payment| payment.overdue? } if params[:overdue] == "1"
      return scope if params[:q].blank?

      query = params[:q].strip.downcase
      scope.select do |payment|
        [
          payment.order.id.to_s,
          payment.order.client_profile&.name,
          payment.order.client_profile&.user&.email,
          payment.payment_type,
          payment.status
        ].compact.any? { |value| value.downcase.include?(query) }
      end
    end
  end
end
