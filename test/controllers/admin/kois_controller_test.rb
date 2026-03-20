require "test_helper"

class Admin::KoisControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_kois_url
    assert_response :success
  end

  test "should get show" do
    get admin_koi_url(kois(:one))
    assert_response :success
  end

  test "should get new" do
    get new_admin_koi_url
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_koi_url(kois(:one))
    assert_response :success
  end
end
