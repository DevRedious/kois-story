require "test_helper"

class Admin::DashboardControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_root_url
    assert_response :success
    assert_select "h2", "Vue d'ensemble Koi's Story"
    assert_select "a[href='#{admin_messages_path}']", text: /Voir les messages|Priorite messages/
    assert_select "a[href='#{admin_orders_path}']", text: "Voir les commandes"
  end
end
