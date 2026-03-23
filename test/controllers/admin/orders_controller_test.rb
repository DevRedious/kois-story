require "test_helper"

class Admin::OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_orders_url
    assert_response :success
  end

  test "should get show" do
    get admin_order_url(orders(:one))
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_order_url(orders(:one))
    assert_response :success
  end

  test "should update order" do
    patch admin_order_url(orders(:one)), params: { order: { status: :confirmed, notes: "Client rappele" } }

    assert_redirected_to admin_order_url(orders(:one))
    assert_equal "confirmed", orders(:one).reload.status
    assert_equal "Client rappele", orders(:one).reload.notes
  end
end
