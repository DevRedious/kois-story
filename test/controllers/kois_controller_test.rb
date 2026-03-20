require "test_helper"

class KoisControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get kois_url
    assert_response :success
  end

  test "should get show" do
    get koi_url(kois(:one))
    assert_response :success
  end
end
