require "test_helper"

class Admin::OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_orders_url
    assert_response :success
    assert_select "#order-search"
    assert_select "#status-filter"
  end

  test "should filter orders by status" do
    orders(:one).update!(status: :pending)
    orders(:two).update!(status: :completed)

    get admin_orders_url, params: { status: :pending }

    assert_response :success
    assert_match "CMD-#{orders(:one).id.to_s.rjust(4, '0')}", response.body
    assert_no_match "CMD-#{orders(:two).id.to_s.rjust(4, '0')}", response.body
  end

  test "should get show" do
    get admin_order_url(orders(:one))
    assert_response :success
    assert_select "a[href='#{admin_client_path(client_profiles(:one))}']", text: /Client|MyString/
    assert_select "a[href='#{admin_payment_path(payments(:one))}']", text: "Voir"
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
