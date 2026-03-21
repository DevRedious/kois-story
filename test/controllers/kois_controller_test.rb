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

  test "should not get show for koi without image" do
    koi = Koi.create!(
      name: "Cache",
      variety: "Asagi",
      price: 400,
      status: :available,
      user: users(:one)
    )

    get koi_url(koi)
    assert_response :not_found
  end

  test "index ignores sql-like payload in price filter" do
    get kois_url, params: { max_price: "0 OR 1=1" }

    assert_response :success
    assert_select ".koi-card", 0
  end

  test "index ignores sql-like payload in size filter" do
    get kois_url, params: { max_size: "0 OR 1=1" }

    assert_response :success
    assert_select ".koi-card", 0
  end
end
