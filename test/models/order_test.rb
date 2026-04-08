require "test_helper"

class OrderTest < ActiveSupport::TestCase
  test "paid amount sums associated payments" do
    assert_equal 9.99, orders(:one).paid_amount.to_f
  end

  test "outstanding amount never goes below zero" do
    order = orders(:one)
    order.update!(total_amount: 5.0)

    assert_equal 0.0, order.outstanding_amount.to_f
  end
end
