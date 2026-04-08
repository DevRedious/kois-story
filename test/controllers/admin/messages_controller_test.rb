require "test_helper"

class Admin::MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_messages_url
    assert_response :success
  end

  test "should filter messages by status" do
    messages(:one).mark_as_processed!

    get admin_messages_url, params: { status: :processed }

    assert_response :success
    assert_match messages(:one).sender_name, response.body
  end

  test "should get show" do
    get admin_message_url(messages(:one))
    assert_response :success
  end

  test "should update read status" do
    patch admin_message_url(messages(:one))
    assert_redirected_to admin_messages_url
    assert messages(:one).reload.read?
  end

  test "should mark message as processed" do
    patch admin_message_url(messages(:one)), params: { status: :processed }

    assert_redirected_to admin_messages_url
    assert_equal :processed, messages(:one).reload.status
  end

  test "should reset message to unread" do
    messages(:one).mark_as_processed!

    patch admin_message_url(messages(:one)), params: { status: :unread }

    assert_redirected_to admin_messages_url
    assert_equal :unread, messages(:one).reload.status
  end

  test "should keep show redirect when updating from show page" do
    patch admin_message_url(messages(:one)), params: { status: :processed, redirect_to: :show }

    assert_redirected_to admin_message_url(messages(:one))
  end

  test "should not mark message as read when showing it" do
    get admin_message_url(messages(:one))

    assert_response :success
    assert_not messages(:one).reload.read?
  end
end
