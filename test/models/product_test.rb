require "test_helper"

class ProductTest < ActiveSupport::TestCase
  test "requires a unique reference" do
    product = Product.new(
      name: "Reference double",
      reference: products(:one).reference,
      price: 12.50,
      category: :materiel,
      status: :active
    )

    assert_not product.valid?
    assert_includes product.errors[:reference], "has already been taken"
  end

  test "enforces unique references at database level" do
    assert_raises ActiveRecord::RecordNotUnique do
      Product.insert_all!([
        {
          name: "Duplicate reference",
          reference: products(:one).reference,
          description: "Should be rejected by the unique index",
          price: 12.50,
          stock_quantity: 1,
          category: Product.categories[:materiel],
          status: Product.statuses[:active],
          created_at: Time.current,
          updated_at: Time.current
        }
      ])
    end
  end
end
