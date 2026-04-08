require "test_helper"

class PaymentTest < ActiveSupport::TestCase
  test "overdue when due date has passed and payment is not paid" do
    assert_predicate payments(:one), :overdue?
  end

  test "not overdue when payment is marked as paid" do
    payment = payments(:one)
    payment.update!(status: :paid)

    assert_not payment.overdue?
  end
end
