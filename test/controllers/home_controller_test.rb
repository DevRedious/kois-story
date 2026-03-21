require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_url
    assert_response :success
  end

  test "should not expose kois without images on homepage" do
    Koi.create!(
      name: "Invisible koi",
      variety: "Showa",
      price: 1000,
      status: :available,
      user: users(:one)
    )

    get root_url

    assert_response :success
    assert_no_match "Invisible koi", response.body
  end
end
