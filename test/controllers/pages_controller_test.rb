require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get decouvrir" do
    get decouvrir_url
    assert_response :success
  end

  test "should get materiel" do
    get materiel_url
    assert_response :success
  end

  test "should get soins" do
    get soins_url
    assert_response :success
  end

  test "should get nourriture" do
    get nourriture_url
    assert_response :success
  end

  test "should get azukari" do
    get azukari_url
    assert_response :success
  end
end
