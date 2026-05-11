require "test_helper"

class OrderItemTest < ActiveSupport::TestCase
  test "is valid with a koi and no product" do
    item = OrderItem.new(order: orders(:one), koi: kois(:one), quantity: 1, unit_price: 9.99)

    assert item.valid?
  end

  test "is valid with a product and no koi" do
    item = OrderItem.new(order: orders(:one), product: products(:one), quantity: 2, unit_price: 9.99)

    assert item.valid?
  end

  test "is invalid without a koi or product" do
    item = OrderItem.new(order: orders(:one), quantity: 1, unit_price: 9.99)

    assert_not item.valid?
    assert_includes item.errors[:base], "must reference exactly one koi or product"
  end

  test "is invalid with both a koi and product" do
    item = OrderItem.new(
      order: orders(:one),
      koi: kois(:one),
      product: products(:one),
      quantity: 1,
      unit_price: 9.99
    )

    assert_not item.valid?
    assert_includes item.errors[:base], "must reference exactly one koi or product"
  end
end
