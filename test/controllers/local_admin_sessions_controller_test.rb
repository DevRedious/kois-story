require "test_helper"

class LocalAdminSessionsControllerTest < ActionDispatch::IntegrationTest
  test "local admin shortcut is disabled outside development" do
    post local_admin_session_path

    assert_response :not_found
  end
end
