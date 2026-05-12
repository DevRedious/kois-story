require "test_helper"

class PaymentTest < ActiveSupport::TestCase
  test "requires a positive amount" do
    payment = Payment.new(order: orders(:one), amount: 0, payment_type: :deposit, status: :pending)

    assert_not payment.valid?
    assert_includes payment.errors[:amount], "must be greater than 0"
  end

  test "requires payment type and status" do
    payment = Payment.new(order: orders(:one), amount: 10)

    assert_not payment.valid?
    assert_includes payment.errors[:payment_type], "can't be blank"
    assert_includes payment.errors[:status], "can't be blank"
  end

  test "accepts existing enum values" do
    payment = Payment.new(order: orders(:one), amount: 10, payment_type: :deposit, status: :partial)

    assert payment.valid?
  end

  test "overdue when due date has passed and payment is not paid" do
    assert_predicate payments(:one), :overdue?
  end

  test "not overdue when payment is marked as paid" do
    payment = payments(:one)
    payment.update!(status: :paid)

    assert_not payment.overdue?
  end
end
