require "test_helper"

class Admin::ClientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_clients_url
    assert_response :success
  end

  test "should filter clients with orders only" do
    profile = ClientProfile.create!(name: "Sans commande", user: users(:visitor))

    get admin_clients_url, params: { has_orders: "1" }

    assert_response :success
    assert_no_match profile.name, response.body
  end

  test "should get show" do
    get admin_client_url(client_profiles(:one))
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_client_url(client_profiles(:one))
    assert_response :success
  end

  test "should update client" do
    patch admin_client_url(client_profiles(:one)), params: { client_profile: { phone: "0601020304", notes: "Relance newsletter OK" } }

    assert_redirected_to admin_client_url(client_profiles(:one))
    assert_equal "0601020304", client_profiles(:one).reload.phone
    assert_equal "Relance newsletter OK", client_profiles(:one).reload.notes
  end
end
