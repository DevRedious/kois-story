require "test_helper"

class DevisePagesControllerTest < ActionDispatch::IntegrationTest
  test "password reset page renders without disabled registration links" do
    skip "Admin routes disabled for this app role" unless respond_to?(:new_user_password_path)

    get new_user_password_path

    assert_response :success
    assert_select "a[href='/users/sign_up']", count: 0
  end
end
