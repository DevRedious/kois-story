require "test_helper"

class Admin::MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_messages_url
    assert_response :success
  end

  test "should get show" do
    get admin_message_url(messages(:one))
    assert_response :success
  end

  test "should update read status" do
    patch admin_message_url(messages(:one))
    assert_redirected_to admin_messages_url
  end
end
