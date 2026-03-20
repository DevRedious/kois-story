require "test_helper"

class KoiTest < ActiveSupport::TestCase
  test "is valid with required attributes" do
    koi = Koi.new(
      name: "Test Koi",
      variety: "Kohaku",
      price: 1000,
      status: :available,
      user: users(:one)
    )
    assert koi.valid?
  end
end
