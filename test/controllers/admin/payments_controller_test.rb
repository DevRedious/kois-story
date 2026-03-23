require "test_helper"

class Admin::PaymentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_payments_url
    assert_response :success
  end

  test "should get show" do
    get admin_payment_url(payments(:one))
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_payment_url(payments(:one))
    assert_response :success
  end

  test "should update payment" do
    patch admin_payment_url(payments(:one)), params: { payment: { status: :paid, amount: 250.0 } }

    assert_redirected_to admin_payment_url(payments(:one))
    assert_equal "paid", payments(:one).reload.status
    assert_equal 250.0, payments(:one).reload.amount.to_f
  end
end
