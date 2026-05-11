require "test_helper"

class Admin::AccessControlTest < ActionDispatch::IntegrationTest
  test "redirects unauthenticated users to sign in" do
    get admin_root_url

    assert_redirected_to new_user_session_path
  end

  test "rejects non admin users from dashboard" do
    sign_in users(:visitor)

    get admin_root_url

    assert_redirected_to public_redirect_target
  end

  test "rejects non admin users from koi management" do
    sign_in users(:visitor)

    get admin_kois_url

    assert_redirected_to public_redirect_target
  end

  test "rejects non admin users from messages" do
    sign_in users(:visitor)

    get admin_messages_url

    assert_redirected_to public_redirect_target
  end

  private

  def public_redirect_target
    base_url = ENV["PUBLIC_SITE_URL"].presence
    base_url ? "#{base_url.chomp('/')}/" : root_path
  end
end
