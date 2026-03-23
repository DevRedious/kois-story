require "test_helper"

class Admin::NewsletterControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_newsletter_url
    assert_response :success
  end
end
